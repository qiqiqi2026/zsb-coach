-- ============================================================
-- 升本教练 · 云端数据库初始化脚本
-- 用法：Supabase 控制台 -> SQL Editor -> 粘贴全文 -> Run
-- 执行完在最后一行把 ADMIN_KEY 改成你自己的口令（改完再跑那一条）
-- ============================================================

-- 1) 用户资料（注册时写入）
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "own_profile_select" on profiles;
drop policy if exists "own_profile_insert" on profiles;
drop policy if exists "own_profile_update" on profiles;

create policy "own_profile_select" on profiles for select using (auth.uid() = id);
create policy "own_profile_insert" on profiles for insert with check (auth.uid() = id);
create policy "own_profile_update" on profiles for update using (auth.uid() = id);

-- 2) 学习进度（按考点保存阶段与掌握度）
create table if not exists progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  kp_id text not null,
  stage int not null default 0,
  mastery numeric not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, kp_id)
);

alter table progress enable row level security;

drop policy if exists "own_progress_all" on progress;
create policy "own_progress_all" on progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3) 行为事件（答题、完成讲义、模考等）
create table if not exists events (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  kp_id text,
  ok boolean,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists events_created_idx on events (created_at desc);
create index if not exists events_user_idx on events (user_id);

alter table events enable row level security;

drop policy if exists "own_events_select" on events;
drop policy if exists "own_events_insert" on events;
create policy "own_events_select" on events for select using (auth.uid() = user_id);
create policy "own_events_insert" on events for insert with check (auth.uid() = user_id);

-- 4) 后台配置（存放开发者口令，仅函数可读）
create table if not exists app_config (
  key text primary key,
  value text not null
);

alter table app_config enable row level security;
-- 不建任何策略：普通客户端读不到，只有 security definer 函数能读

-- 5) 开发者统计接口（带口令校验，服务端执行）
create or replace function admin_stats(p_key text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key text;
  result jsonb;
begin
  select value into v_key from app_config where key = 'admin_key' limit 1;
  if v_key is null or p_key is null or p_key <> v_key then
    raise exception 'forbidden';
  end if;

  select jsonb_build_object(
    'users', (select count(*) from profiles),
    'active_24h', (select count(distinct user_id) from events where created_at > now() - interval '24 hours'),
    'events_24h', (select count(*) from events where created_at > now() - interval '24 hours'),
    'answered_total', (select count(*) from events where kind = 'answer'),
    'accuracy', (
      select case when count(*) = 0 then null
        else round((count(*) filter (where ok) * 100.0 / count(*))::numeric, 1) end
      from events where kind = 'answer'
    ),
    'kp_touched', (select count(distinct kp_id) from progress),
    'recent_events', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select e.created_at, e.kind, e.kp_id, e.ok, p.username
        from events e left join profiles p on p.id = e.user_id
        order by e.created_at desc
        limit 40
      ) t
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function admin_stats(text) from public;
grant execute on function admin_stats(text) to anon, authenticated;

-- 6) 用户明细（同样带口令校验）
create or replace function admin_users(p_key text, p_limit int default 200)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key text;
  result jsonb;
begin
  select value into v_key from app_config where key = 'admin_key' limit 1;
  if v_key is null or p_key is null or p_key <> v_key then
    raise exception 'forbidden';
  end if;

  select coalesce(jsonb_agg(row_to_json(t)), '[]'::jsonb)
  into result
  from (
    select
      p.username,
      p.created_at,
      p.last_seen,
      (select count(*) from progress pr where pr.user_id = p.id) as kp_count,
      (select count(*) from events e where e.user_id = p.id and e.kind = 'answer') as answered,
      (select case when count(*) = 0 then null
         else round((count(*) filter (where ok) * 100.0 / count(*))::numeric, 1) end
       from events e where e.user_id = p.id and e.kind = 'answer') as accuracy
    from profiles p
    order by p.created_at desc
    limit p_limit
  ) t;

  return result;
end;
$$;

revoke all on function admin_users(text, int) from public;
grant execute on function admin_users(text, int) to anon, authenticated;

-- ============================================================
-- 最后一步：设置后台口令（把 CHANGE_ME 换成你自己的，至少 12 位）
-- ============================================================
insert into app_config (key, value)
values ('admin_key', 'CHANGE_ME')
on conflict (key) do update set value = excluded.value;
