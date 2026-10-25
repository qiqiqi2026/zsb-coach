/* 数据库模块包：6 个考点 + 6 份完整讲义 + 24 道题 */
(function (Z) {
  Z.addKps([
    { id: 'db-model', subject: 'cs', chapter: '数据库', title: '关系模型与表设计', level: 1, examWeight: 0.04, prerequisites: [], examCount: 5, examPoints: 16, outcome: '能画出实体关系，正确设置主键、外键与常用约束', note: '表结构定错了，后面写多少 SQL 都别扭' },
    { id: 'db-sql', subject: 'cs', chapter: '数据库', title: 'SQL 查询基础', level: 2, examWeight: 0.05, prerequisites: ['db-model'], examCount: 6, examPoints: 20, outcome: '能写出带过滤、分组、排序、分页的单表查询', note: '先想清楚行从哪来，再想列怎么算' },
    { id: 'db-join', subject: 'cs', chapter: '数据库', title: '多表连接与子查询', level: 3, examWeight: 0.05, prerequisites: ['db-sql'], examCount: 6, examPoints: 22, outcome: '能按业务选择内连接、左连接与子查询，避免行数翻倍', note: '左连接后又在 WHERE 里过滤右表，等于白写' },
    { id: 'db-index', subject: 'cs', chapter: '数据库', title: '索引与执行计划', level: 3, examWeight: 0.05, prerequisites: ['db-sql'], examCount: 5, examPoints: 20, outcome: '能解释 B+ 树索引，判断索引是否生效，会读 EXPLAIN', note: '索引是空间与写入换查询速度，不是越多越好' },
    { id: 'db-transaction', subject: 'cs', chapter: '数据库', title: '事务与 ACID', level: 3, examWeight: 0.05, prerequisites: ['db-sql'], examCount: 5, examPoints: 20, outcome: '能说出 ACID 与四种隔离级别，判断并发异常', note: '涉及多行多表的同生共死操作，必须放进事务' },
    { id: 'db-nosql', subject: 'cs', chapter: '数据库', title: 'NoSQL 与选型', level: 2, examWeight: 0.03, prerequisites: ['db-model'], examCount: 4, examPoints: 14, outcome: '能区分键值、文档、列族、图数据库并给出选型理由', note: 'NoSQL 是补位，不是把关系型一脚踢开' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- db-model ---------- */
    { id: 'db-model-1', kpIds: ['db-model'], subject: 'cs', type: 'single',
      stem: '关于主键（PRIMARY KEY），下列说法正确的是？',
      options: ['一张表可以有多个主键，只要它们都不重复', '主键用于唯一标识一行，且不能为 NULL', '主键必须是整数类型', '主键可以为 NULL，只要该列建了索引'],
      answer: 'B',
      analysis: { ans: 'B', why: '主键的作用是唯一标识一行，因此必须唯一且非空；一张表只能有一个主键，但可以是多列组成的复合主键。', steps: '1. 主键约束同时包含唯一与非空两条。\n2. 一张表只允许一个 PRIMARY KEY 定义。\n3. 主键可以是字符串、日期，也可以是复合键，不限定整数。', pit: '不要以为建了索引就可以为 NULL；UNIQUE 索引允许一个 NULL，主键不允许。' }, difficulty: 2, estSeconds: 40, skillTag: '主键与约束', source: '自建' },
    { id: 'db-model-2', kpIds: ['db-model'], subject: 'cs', type: 'single',
      stem: '学生与课程之间是多对多关系，转换成表结构时应该怎么做？',
      options: ['在学生表中加课程编号外键', '在课程表中加学号外键', '新建一张学生课程关联表，保存学号与课程编号', '把两门课合并成同一列'],
      answer: 'C',
      analysis: { ans: 'C', why: '多对多关系无法只在某一侧放外键，必须新建关联表，用两个外键组成复合主键，一行表示一次选课关系。', steps: '1. 一个学生可以选多门课，一门课也可以被多个学生选。\n2. 只在学生表放课程编号，只能记录一门课。\n3. 新建 score(student_id, course_id) 关联表，复合主键保证不重复选课。', pit: '关联表还可以带关系自身的属性，例如成绩、选课时间。' }, difficulty: 2, estSeconds: 50, skillTag: '表设计', source: '自建' },
    { id: 'db-model-3', kpIds: ['db-model'], subject: 'cs', type: 'fill',
      stem: '用来保证参照完整性、指向另一张表主键的字段叫 ______。',
      answer: '外键', accept: ['外键', 'foreign key', 'foreign_key', 'FK'],
      analysis: { ans: '外键', why: '外键的值必须在被引用表的主键中存在，或者为 NULL，从而保证两张表的数据不会对不上。', steps: '1. 外键定义在「多」的一侧或关联表中。\n2. 写法为 FOREIGN KEY (列) REFERENCES 另一张表(主键)。\n3. 插入非法值或删除被引用行时，数据库会阻止或按规则处理。', pit: '外键与主键不是一回事：主键标识本表行，外键指向别的表。' }, difficulty: 2, estSeconds: 35, skillTag: '外键', source: '自建' },
    { id: 'db-model-4', kpIds: ['db-model'], subject: 'cs', type: 'fill',
      stem: '第二范式要求表必须先满足 ______ 范式，并消除非主属性对主键的部分依赖。',
      answer: '第一', accept: ['第一', '1NF', '第一范式', '1'],
      analysis: { ans: '第一', why: '范式是逐级递进的：先满足 1NF（每格不可再分），才谈 2NF 的部分依赖，再谈 3NF 的传递依赖。', steps: '1. 1NF：每个字段都是不可再分的最小单位。\n2. 2NF：在 1NF 基础上，非主属性完全依赖于整个主键。\n3. 复合主键表要特别检查是否存在只依赖其中一列的情况。', pit: '只满足 1NF 不等于满足 2NF；范式是一层一层往上加的。' }, difficulty: 3, estSeconds: 45, skillTag: '范式', source: '自建' },

    /* ---------- db-sql ---------- */
    { id: 'db-sql-1', kpIds: ['db-sql'], subject: 'cs', type: 'single',
      stem: '想让查询结果按分数从高到低排列，应该使用哪个子句？',
      options: ['GROUP BY', 'WHERE', 'ORDER BY', 'HAVING'],
      answer: 'C',
      analysis: { ans: 'ORDER BY', why: 'ORDER BY 负责对最终结果排序，DESC 表示降序，ASC 表示升序（默认）。', steps: '1. WHERE 过滤原始行。\n2. GROUP BY 把行分组。\n3. ORDER BY 在最后对结果排序。', pit: 'ORDER BY 写在 GROUP BY 和 HAVING 之后；排序发生在 SELECT 之后。' }, difficulty: 2, estSeconds: 35, skillTag: 'SQL 子句', source: '自建' },
    { id: 'db-sql-2', kpIds: ['db-sql'], subject: 'cs', type: 'single',
      stem: '要统计每个班级的学生人数，下面哪条语句是正确的？',
      options: ['SELECT COUNT(*) FROM student GROUP BY class_id', 'SELECT COUNT(*) FROM student ORDER BY class_id', 'SELECT SUM(class_id) FROM student', 'SELECT * FROM student WHERE COUNT(*) > 1'],
      answer: 'A',
      analysis: { ans: 'A', why: '按班级统计人数，需要先按 class_id 分组，再对每组执行 COUNT(*)。', steps: '1. FROM student 取数据。\n2. GROUP BY class_id 把同班学生聚成一组。\n3. COUNT(*) 数每组的行数。', pit: '聚合函数不能写在 WHERE 里；过滤分组结果要用 HAVING。' }, difficulty: 2, estSeconds: 50, skillTag: '分组聚合', source: '自建' },
    { id: 'db-sql-3', kpIds: ['db-sql'], subject: 'cs', type: 'fill',
      stem: '只保留满足条件的原始行，需要在 FROM 之后使用 ______ 子句。',
      answer: 'WHERE', accept: ['WHERE', 'where', 'where 子句'],
      analysis: { ans: 'WHERE', why: 'WHERE 在分组之前执行，对每一行判断条件，不满足的行直接丢弃。', steps: '1. FROM 取出整张表。\n2. WHERE 逐行判断。\n3. 只有条件为真的行进入后续步骤。', pit: 'WHERE 里不能使用 COUNT、SUM 等聚合函数，那是 HAVING 的工作。' }, difficulty: 1, estSeconds: 30, skillTag: 'WHERE', source: '自建' },
    { id: 'db-sql-4', kpIds: ['db-sql'], subject: 'cs', type: 'fill',
      stem: '对 GROUP BY 之后的分组结果再做筛选，需要使用 ______ 子句。',
      answer: 'HAVING', accept: ['HAVING', 'having', 'having 子句'],
      analysis: { ans: 'HAVING', why: 'HAVING 作用于分组后的结果，可以直接写 COUNT(*) >= 3 这类聚合条件。', steps: '1. WHERE 先过滤原始行。\n2. GROUP BY 分组。\n3. HAVING 过滤不满足条件的组。', pit: 'HAVING 在 GROUP BY 之后、ORDER BY 之前；能放进 WHERE 的条件不要拖到 HAVING。' }, difficulty: 3, estSeconds: 45, skillTag: 'HAVING', source: '自建' },

    /* ---------- db-join ---------- */
    { id: 'db-join-1', kpIds: ['db-join'], subject: 'cs', type: 'single',
      stem: '关于内连接（INNER JOIN）与左连接（LEFT JOIN），下列说法正确的是？',
      options: ['内连接保留左表全部行，左连接只保留匹配行', '左连接保留左表全部行，右表没有匹配时用 NULL 补齐', '两者结果永远相同', '左连接不能配合 WHERE 使用'],
      answer: 'B',
      analysis: { ans: 'B', why: 'LEFT JOIN 以左表为主，左表的每一行都会出现在结果里；右表匹配不上时，右表列为 NULL。', steps: '1. ON 条件决定两张表的行如何配对。\n2. INNER JOIN 丢掉所有没配对上的行。\n3. LEFT JOIN 保留左表全部行，缺失的右表列补 NULL。', pit: 'RIGHT JOIN 与 LEFT JOIN 方向相反，把两表位置调换就能互相转换。' }, difficulty: 2, estSeconds: 45, skillTag: '连接类型', source: '自建' },
    { id: 'db-join-2', kpIds: ['db-join'], subject: 'cs', type: 'single',
      stem: '要查询「从来没有下过订单的用户」，下面哪种写法正确？',
      options: ['SELECT * FROM users INNER JOIN orders ON users.id = orders.uid', 'SELECT * FROM users LEFT JOIN orders ON users.id = orders.uid WHERE orders.uid IS NULL', 'SELECT * FROM users RIGHT JOIN orders ON users.id = orders.uid', 'SELECT * FROM orders WHERE uid = NULL'],
      answer: 'B',
      analysis: { ans: 'B', why: '先用左连接保留全部用户，再筛出右表列为 NULL 的行，这些正是没有订单的用户。', steps: '1. users LEFT JOIN orders，没订单的用户右表列全为 NULL。\n2. WHERE orders.uid IS NULL 只留下这些行。\n3. 内连接会直接丢掉没订单的用户，查不出来。', pit: '不能写 uid = NULL，NULL 的比较结果是 UNKNOWN；必须用 IS NULL。' }, difficulty: 3, estSeconds: 60, skillTag: '反连接', source: '自建' },
    { id: 'db-join-3', kpIds: ['db-join'], subject: 'cs', type: 'fill',
      stem: '只判断子查询是否返回至少一行，通常使用 ______ 关键字配合 SELECT 1。',
      answer: 'EXISTS', accept: ['EXISTS', 'exists', 'EXIST'],
      analysis: { ans: 'EXISTS', why: 'EXISTS 只关心子查询有没有结果，找到一行就可以停止，不需要把整列数据取回来。', steps: '1. 外层查询逐行取候选记录。\n2. 子查询用相关条件检查是否存在匹配行。\n3. 返回真则保留该行。', pit: 'NOT EXISTS 常用来做反连接；子查询里写 SELECT 1 就够了，不需要 SELECT *。' }, difficulty: 3, estSeconds: 45, skillTag: '子查询', source: '自建' },
    { id: 'db-join-4', kpIds: ['db-join'], subject: 'cs', type: 'fill',
      stem: '要列出每个用户及其订单数，即使用户一单也没有也要显示，应使用 users ______ JOIN orders。',
      answer: 'LEFT', accept: ['LEFT', 'left', 'LEFT OUTER', 'left outer'],
      analysis: { ans: 'LEFT', why: '左连接以 users 为主表，没有订单的用户仍然保留一行，订单数为 0。', steps: '1. users LEFT JOIN orders ON users.id = orders.uid。\n2. 用 COUNT(orders.id) 而不是 COUNT(*)，没有订单时结果为 0。\n3. 按用户分组输出。', pit: 'COUNT(*) 会把左连接补出的 NULL 行也数成 1，导致零订单用户显示为 1。' }, difficulty: 3, estSeconds: 50, skillTag: '左连接统计', source: '自建' },

    /* ---------- db-index ---------- */
    { id: 'db-index-1', kpIds: ['db-index'], subject: 'cs', type: 'single',
      stem: '给表建索引，最直接的作用是什么？',
      options: ['让所有查询都变成 O(1)', '加快条件定位与排序，但会增加写入与存储开销', '自动保证字段不重复', '减少表所占的磁盘空间'],
      answer: 'B',
      analysis: { ans: 'B', why: '索引把无序数据组织成有序结构，减少扫描行数；但每次写入都要维护索引，而且索引本身占空间。', steps: '1. 无索引时 WHERE 条件要全表扫描。\n2. 有索引可以按 B+ 树快速定位。\n3. INSERT、UPDATE、DELETE 需要同步维护索引。', pit: '索引不是越多越好；低区分度的列（如性别）单独建索引收益很小。' }, difficulty: 2, estSeconds: 40, skillTag: '索引作用', source: '自建' },
    { id: 'db-index-2', kpIds: ['db-index'], subject: 'cs', type: 'single',
      stem: '在 age 列建立 B+ 树索引后，WHERE age = 20 变快的主要原因是？',
      options: ['数据库把 age 列的数据复制到了内存里永久保存', 'B+ 树让数据按 age 有序组织，只需少量节点就能定位', '索引会自动改写查询语句', '索引会把 age 相同的行合并成一行'],
      answer: 'B',
      analysis: { ans: 'B', why: 'B+ 树非叶子节点只存键，层数低、扇出大，等值查询从根走到叶子只需几次读取，避免逐行扫描。', steps: '1. 无索引：逐行比较 age 是否等于 20。\n2. 有索引：从根节点按 20 比较，逐层缩小范围。\n3. 到达叶子节点取出对应行。', pit: '索引不会改变数据的逻辑结构，行还是那些行，只是多了一条快速定位的路径。' }, difficulty: 3, estSeconds: 50, skillTag: 'B+ 树', source: '自建' },
    { id: 'db-index-3', kpIds: ['db-index'], subject: 'cs', type: 'fill',
      stem: '在 student 表的 age 列上建索引，SQL 是 CREATE ______ idx_age ON student(age)。',
      answer: 'INDEX', accept: ['INDEX', 'index', 'UNIQUE INDEX'],
      analysis: { ans: 'INDEX', why: 'CREATE INDEX 是最基本的建索引语句，括号里写要索引的列。', steps: '1. 指定索引名 idx_age。\n2. ON student(age) 指明表与列。\n3. 执行后优化器可以在条件或排序中使用它。', pit: '主键会自动建索引，不需要再手动为主键列建普通索引。' }, difficulty: 2, estSeconds: 35, skillTag: '建索引', source: '自建' },
    { id: 'db-index-4', kpIds: ['db-index'], subject: 'cs', type: 'fill',
      stem: '查询时对索引列使用函数或前导通配符，可能导致索引 ______。',
      answer: '失效', accept: ['失效', '失效了', '无法使用', '用不上'],
      analysis: { ans: '失效', why: '索引里存的是列的原值，一旦在列上做函数运算或前置模糊匹配，数据库无法按索引顺序定位，只能回退到全表扫描。', steps: '1. 索引按列的原始值排序。\n2. WHERE YEAR(created_at) = 2026 需要先算函数，索引顺序被打乱。\n3. 优化器改为全表扫描。', pit: '把条件改写成范围：created_at >= 起点 AND created_at < 终点，索引才能生效。' }, difficulty: 3, estSeconds: 45, skillTag: '索引失效', source: '自建' },

    /* ---------- db-transaction ---------- */
    { id: 'db-transaction-1', kpIds: ['db-transaction'], subject: 'cs', type: 'single',
      stem: 'ACID 中的 I（隔离性）指的是什么？',
      options: ['事务中的操作要么全做要么全不做', '并发执行的事务之间互不干扰，中间状态不可见', '提交后的数据不会因断电丢失', '事务前后数据都满足约束'],
      answer: 'B',
      analysis: { ans: 'B', why: '隔离性解决并发问题：一个事务未提交的修改，不应该被其他事务看到或干扰。', steps: '1. A 原子性：全成或全不成。\n2. I 隔离性：并发事务彼此隔离。\n3. D 持久性：提交后永久生效。', pit: '隔离性不等于一致性；隔离性靠锁和 MVCC 实现，一致性靠约束与业务规则。' }, difficulty: 2, estSeconds: 40, skillTag: 'ACID', source: '自建' },
    { id: 'db-transaction-2', kpIds: ['db-transaction'], subject: 'cs', type: 'single',
      stem: '转账事务中，扣款语句执行成功、加款语句失败，此时正确的处理是？',
      options: ['直接提交，扣掉的钱算手续费', '执行 ROLLBACK，让扣款也撤销', '忽略错误继续执行后面的语句', '重新执行扣款语句'],
      answer: 'B',
      analysis: { ans: 'B', why: '转账的两步必须同生共死，加款失败就要回滚，把已做的扣款撤销，保证总额不变。', steps: '1. BEGIN 开启事务。\n2. 扣款成功、加款失败。\n3. 捕获错误后执行 ROLLBACK。\n4. 数据恢复到事务开始前的状态。', pit: '如果程序直接退出而没有提交，多数数据库会自动回滚，但显式回滚更清晰。' }, difficulty: 3, estSeconds: 50, skillTag: '事务回滚', source: '自建' },
    { id: 'db-transaction-3', kpIds: ['db-transaction'], subject: 'cs', type: 'fill',
      stem: '一组要么全部成功、要么全部撤销的数据库操作，称为 ______。',
      answer: '事务', accept: ['事务', 'transaction', '事务（transaction）'],
      analysis: { ans: '事务', why: '事务把多条语句打包成一个逻辑工作单元，由数据库保证原子性与持久性。', steps: '1. BEGIN 或 START TRANSACTION 开启。\n2. 执行多条读写语句。\n3. COMMIT 提交或 ROLLBACK 回滚。', pit: '不是所有存储引擎都支持事务，选型时要确认引擎能力。' }, difficulty: 1, estSeconds: 30, skillTag: '事务定义', source: '自建' },
    { id: 'db-transaction-4', kpIds: ['db-transaction'], subject: 'cs', type: 'fill',
      stem: '确认事务中的所有修改永久生效，需要执行 ______ 语句。',
      answer: 'COMMIT', accept: ['COMMIT', 'commit', '提交'],
      analysis: { ans: 'COMMIT', why: 'COMMIT 结束事务并把修改写入持久存储，其他事务此后才能看到这些改动。', steps: '1. 事务内多条语句执行完毕。\n2. 确认业务结果正确。\n3. 执行 COMMIT 提交。', pit: 'COMMIT 之后不能再 ROLLBACK；提交前要确认所有步骤都成功。' }, difficulty: 2, estSeconds: 30, skillTag: 'COMMIT', source: '自建' },

    /* ---------- db-nosql ---------- */
    { id: 'db-nosql-1', kpIds: ['db-nosql'], subject: 'cs', type: 'single',
      stem: '下列哪个产品是典型的键值型（Key-Value）NoSQL 数据库？',
      options: ['MySQL', 'Redis', 'Excel', 'SQLite'],
      answer: 'B',
      analysis: { ans: 'Redis', why: 'Redis 以键值对为核心存储单位，支持字符串、哈希、列表等结构，常用于缓存与计数。', steps: '1. MySQL、SQLite 是关系型数据库。\n2. Excel 是表格软件，不是数据库服务。\n3. Redis 通过键直接定位值，属于键值型。', pit: 'Redis 也能做持久化，但它的强项是内存级读写，不是复杂查询。' }, difficulty: 1, estSeconds: 30, skillTag: 'NoSQL 分类', source: '自建' },
    { id: 'db-nosql-2', kpIds: ['db-nosql'], subject: 'cs', type: 'single',
      stem: '一个社交产品需要存储用户动态（字段经常新增）和高频点赞计数，选型上更合理的思路是？',
      options: ['全部塞进一张大表，靠加列解决', '动态用文档型存储，计数用键值型缓存，按访问模式设计', '必须用关系型数据库，否则无法存储', '把动态保存成图片文件'],
      answer: 'B',
      analysis: { ans: 'B', why: '字段多变的半结构化数据适合文档型；点赞这种高频自增、按 key 读取的场景适合键值型，两者按访问模式分工。', steps: '1. 动态字段不固定，文档型允许同一集合内结构不同。\n2. 点赞只需要按文章 id 自增和读取，键值型 O(1)。\n3. 核心账务仍可留在关系型数据库。', pit: '不要为了统一而强行用一种库解决所有问题，也不要无脑多库并存增加复杂度。' }, difficulty: 3, estSeconds: 55, skillTag: 'NoSQL 选型', source: '自建' },
    { id: 'db-nosql-3', kpIds: ['db-nosql'], subject: 'cs', type: 'fill',
      stem: 'BASE 理论由 Basically Available、Soft state 和 ______ 三部分组成。',
      answer: '最终一致性', accept: ['最终一致性', '最终一致', 'eventual consistency', 'Eventual Consistency'],
      analysis: { ans: '最终一致性', why: 'BASE 用基本可用、软状态和最终一致性替代强一致，允许短时间不一致，但保证数据最终会收敛。', steps: '1. Basically Available：保证基本可用。\n2. Soft state：允许中间状态。\n3. Eventually consistent：经过同步后最终一致。', pit: '最终一致不等于一直不一致；它承诺的是「最终」，需要同步机制兜底。' }, difficulty: 3, estSeconds: 40, skillTag: 'BASE', source: '自建' },
    { id: 'db-nosql-4', kpIds: ['db-nosql'], subject: 'cs', type: 'fill',
      stem: '文档型数据库以 ______ 作为基本存储单位，一条记录可以嵌套多层字段。',
      answer: '文档', accept: ['文档', 'document', 'JSON 文档', 'JSON'],
      analysis: { ans: '文档', why: '文档型数据库把一条记录存成 JSON 或 BSON 文档，字段可以嵌套，结构灵活。', steps: '1. 一个用户就是一篇文档。\n2. 文档里可以有嵌套的对象和数组。\n3. 同一集合的文档字段可以不同。', pit: '灵活不等于随便；同一集合的字段命名仍要统一，否则查询会越来越难写。' }, difficulty: 2, estSeconds: 35, skillTag: '文档型', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'db-model-L1', kpIds: ['db-model'], subject: 'cs', level: 1,
      title: '关系模型：把世界装进二维表',
      estMinutes: 40,
      hookTitle: '为什么表设计错了，后面写 SQL 会一直别扭？',
      hookBody: '因为表结构决定了数据能怎么放、关系能怎么连。主键、外键、范式不是考试名词，而是防止重复、错乱和删不干净的护栏。',
      idea: '关系模型用**二维表**表示实体与联系：一行是一条记录，一列是一个属性。表与表之间通过**主键 / 外键**建立引用，配合完整性约束保证数据不自相矛盾。',
      diagramId: 'sql-join', diagramCaption: '外键把 users 与 orders 连起来：一个用户可以有多个订单',
      analogy: { title: '图书馆的书与借阅记录', md: '每本书有唯一编号，这就是主键；借阅记录只写编号，不抄整本书的书名和作者，这个编号就是外键。书的信息改了只需改一处，借阅记录不会跟着错。' },
      points: [
        { title: '一、表、行、列：关系模型的三件套', md: '一张表就是一个关系，行是记录，列是属性。列要先定类型，行可以不断追加；关系模型里行没有固定顺序，取数据要靠 WHERE 而不是靠第几行。' },
        { title: '二、主键：唯一标识一行', md: '主键的值唯一且非空。一张表只能有一个主键，但主键可以由多列组成，叫复合主键。没有主键，更新和删除就可能误伤多行。' },
        { title: '三、候选键、外键与参照完整性', md: '能唯一标识行的列都是候选键，从中选一个当主键。外键指向另一张表的主键，它的值必须在对方表中存在，或者为 NULL，否则就出现「孤儿记录」。' },
        { title: '四、三类完整性约束', md: '实体完整性要求主键非空唯一；参照完整性要求外键有效；用户定义完整性是业务规则，例如年龄 0 到 150、成绩 0 到 100，用 CHECK 或应用层保证。' },
        { title: '五、一对多与多对多怎么落地', md: '一对多把外键放在「多」的一侧，例如学生表里放班级编号。多对多必须新建关联表，把两个主键放进去组成复合主键，还能顺手记录成绩、时间这类关系属性。' },
        { title: '六、范式：先消除明显冗余', md: '1NF 要求每个格子不可再分；2NF 消除非主属性对主键的部分依赖；3NF 消除传递依赖。范式是为了减少更新异常，不是拆得越碎越好，查询频繁时可以适度反范式。' },
        { title: '七、字段设计与约束', md: '能加 NOT NULL 就别留空；业务上唯一的列加 UNIQUE；金额用 DECIMAL 而不是浮点数；状态用短整型或枚举；日期用日期类型，别用字符串硬存。' }
      ],
      table: {
        headers: ['关系', '落地方式', '例子'],
        rows: [
          ['一对一', '任一侧加唯一外键', '用户与实名信息'],
          ['一对多', '在「多」的一侧加外键', '班级与学生'],
          ['多对多', '新建关联表，两个外键组成复合主键', '学生与课程']
        ]
      },
      code: 'CREATE TABLE student (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(20) NOT NULL,\n  class_id INTEGER,\n  FOREIGN KEY (class_id) REFERENCES class_info(id)\n);\n\nCREATE TABLE score (\n  student_id INTEGER,\n  course_id INTEGER,\n  score DECIMAL(5,1),\n  PRIMARY KEY (student_id, course_id)\n);',
      warning: '外键不是装饰。删除被引用的主数据前，要么先处理引用行，要么设置 ON DELETE 规则，否则会留下指向不存在记录的外键值。',
      tip: '设计表时先写出「哪些列能唯一确定一行」，再问「哪些列指向别的表」，主键和外键自然就出来了。',
      quizIds: ['db-model-1', 'db-model-2', 'db-model-3', 'db-model-4'],
      example: {
        title: '把学生选课需求变成三张表',
        steps: [
          { md: '识别实体：学生、课程，各自建一张表，用 id 作主键。' },
          { md: '识别关系：一个学生选多门课，一门课被多个学生选，属于多对多。' },
          { md: '新建 score 表，放 student_id 与 course_id，两列组成复合主键。' },
          { md: '把成绩、选课时间等关系属性也放进 score 表，而不是塞进学生表。' }
        ],
        takeaway: '多对多先想中间表，再想中间表要带哪些属性。'
      },
      example2: {
        title: '判断一张成绩表是不是 2NF',
        steps: [
          { md: '成绩表主键是（学号，课程号），非主属性有学生姓名、课程名、分数。' },
          { md: '学生姓名只依赖学号，课程名只依赖课程号，都属于部分依赖。' },
          { md: '因此它满足 1NF，但不满足 2NF，会出现同一学生姓名重复存储。' },
          { md: '拆成学生表、课程表、成绩表后，各非主属性都完全依赖自己的主键。' }
        ],
        takeaway: '看复合主键表时，逐个检查非主属性是不是依赖了整个主键。'
      },
      guided: [{ questionId: 'db-model-2', hint: '多对多无法在某一侧只放一个外键，想一想中间表。' }],
      solo: ['db-model-1', 'db-model-3'],
      challenge: ['db-model-4'],
      summary: {
        essence: '关系模型用二维表存数据，主键标识行，外键连表，约束与范式防止数据自相矛盾。',
        formulas: ['主键：唯一且非空', '外键：FOREIGN KEY (列) REFERENCES 表(主键)', '多对多 = 两张实体表 + 一张关联表'],
        pitfalls: ['用允许 NULL 的列当主键', '多对多直接在一侧加外键', '为了范式把表拆到无法查询', '金额用浮点数存储'],
        checklist: ['我能为主键找到合适的列', '我知道一对多与多对多的落地方式', '我能说出三类完整性', '我能判断一张表是否满足 2NF']
      },
      feynman: '请用图书与借阅记录的比喻，讲清楚主键和外键各自解决什么问题。'
    }),

    Z.makeLesson({
      id: 'db-sql-L2', kpIds: ['db-sql'], subject: 'cs', level: 2,
      title: 'SELECT：从一张表里问出答案',
      estMinutes: 40,
      hookTitle: '为什么 WHERE 里不能用 SELECT 起的别名？',
      hookBody: '因为执行顺序里 WHERE 在 SELECT 之前。数据库还没算出别名，WHERE 自然不认识它。理解执行顺序，很多「莫名其妙报错」就解释得通了。',
      idea: 'SQL 是**声明式**语言：你描述想要什么结果，优化器决定怎么取。一条查询按 FROM、WHERE、GROUP BY、HAVING、SELECT、ORDER BY、LIMIT 的顺序生效。',
      diagramId: 'sql-join', diagramCaption: '查询的结果也是一张表：先定行从哪来，再定列怎么算',
      analogy: { title: '在食堂点菜', md: '你先说从哪个窗口取菜（FROM），不要辣的（WHERE），按荤素分盘（GROUP BY），每盘至少三样才要（HAVING），最后按价格排序（ORDER BY），只打前五份（LIMIT）。' },
      points: [
        { title: '一、SELECT 的骨架', md: 'SELECT 列 FROM 表 WHERE 条件 GROUP BY 分组 HAVING 组条件 ORDER BY 排序 LIMIT 条数。只有 SELECT 和 FROM 是必需的，其余按需要添加，顺序不能乱。' },
        { title: '二、逻辑执行顺序', md: '先 FROM 取表，WHERE 过滤行，GROUP BY 分组，HAVING 过滤组，SELECT 计算列并起别名，ORDER BY 排序，LIMIT 截断。别名在 WHERE 里通常不可见。' },
        { title: '三、WHERE 与 HAVING 的分工', md: 'WHERE 过滤原始行，不能用聚合函数；HAVING 过滤分组后的组，可以写 COUNT、SUM。能在 WHERE 过滤的条件尽量前置，减少参与分组的数据量。' },
        { title: '四、聚合与 NULL', md: 'COUNT(*) 数行数，COUNT(列) 跳过 NULL；SUM、AVG 也忽略 NULL。AVG 的分母是非 NULL 行数，容易和直觉不一致，必要时用 COALESCE 先补默认值。' },
        { title: '五、去重与分页', md: 'DISTINCT 对整行结果去重，作用在所有 SELECT 列上；LIMIT n OFFSET m 跳过 m 行取 n 行。深分页越往后越慢，因为要先把前面的行数出来。' },
        { title: '六、NULL 不是值', md: 'NULL 表示未知，任何与 NULL 的比较结果都是 UNKNOWN，所以 = NULL 永远不成立，要写 IS NULL 或 IS NOT NULL。COUNT 与 SUM 对 NULL 的处理也不同。' },
        { title: '七、写查询的顺序', md: '先写结果需要哪些列，再确定数据来自哪些表，然后写过滤条件，最后才考虑分组和排序。按这个顺序想，比背语法更不容易漏条件。' }
      ],
      table: {
        headers: ['子句', '作用', '执行阶段'],
        rows: [
          ['WHERE', '过滤原始行', '分组之前'],
          ['GROUP BY', '把行按列分组', '过滤之后'],
          ['HAVING', '过滤分组结果', '分组之后'],
          ['ORDER BY', '对最终结果排序', 'SELECT 之后']
        ]
      },
      code: 'SELECT class_id, COUNT(*) AS cnt, AVG(score) AS avg_score\nFROM student\nWHERE age >= 18\nGROUP BY class_id\nHAVING COUNT(*) >= 3\nORDER BY avg_score DESC\nLIMIT 5;',
      warning: 'WHERE 里写 COUNT(*) > 3 会报错：聚合函数不能出现在 WHERE。要过滤分组结果，改用 HAVING。',
      tip: '写完查询先读一遍：行从哪来、被谁过滤、按什么分组、最后按什么排序。四句话能说清，SQL 基本不会错。',
      quizIds: ['db-sql-1', 'db-sql-2', 'db-sql-3', 'db-sql-4'],
      example: {
        title: '统计每个班的平均分，只显示人数不少于 3 的班',
        steps: [
          { md: '结果需要 class_id、人数、平均分，所以 SELECT 写这三项。' },
          { md: '数据来自 student 表，用 GROUP BY class_id 分班。' },
          { md: '人数条件是聚合条件，写在 HAVING COUNT(*) >= 3。' },
          { md: '最后 ORDER BY avg_score DESC，让平均分高的班排在前面。' }
        ],
        takeaway: '聚合条件放 HAVING，普通行条件放 WHERE。'
      },
      example2: {
        title: '查询没有填写手机号的学生',
        steps: [
          { md: '错误写法：WHERE phone = NULL，结果永远为空。' },
          { md: '原因：NULL 与任何值比较都返回 UNKNOWN，不是真。' },
          { md: '正确写法：WHERE phone IS NULL。' },
          { md: '如果要排除空值，写 WHERE phone IS NOT NULL。' }
        ],
        takeaway: '见到 NULL 就想到 IS NULL，不要用等号。'
      },
      guided: [{ questionId: 'db-sql-2', hint: '「每个班」意味着要先按班级分组，再用 COUNT 统计。' }],
      solo: ['db-sql-1', 'db-sql-3'],
      challenge: ['db-sql-4'],
      summary: {
        essence: 'SQL 声明结果，执行按 FROM、WHERE、GROUP BY、HAVING、SELECT、ORDER BY、LIMIT 推进。',
        formulas: ['SELECT 列 FROM 表 WHERE 条件', 'GROUP BY 列 HAVING 聚合条件', 'ORDER BY 列 DESC LIMIT n'],
        pitfalls: ['在 WHERE 里用聚合函数', '用 = NULL 判断空值', '以为 SELECT 别名在 WHERE 可用', 'COUNT(*) 与 COUNT(列) 混用'],
        checklist: ['我能写出完整 SELECT 骨架', '我分得清 WHERE 与 HAVING', '我知道 NULL 的比较规则', '我能写出分组统计与分页']
      },
      feynman: '请按执行顺序讲一遍：一条带分组和排序的查询，数据库先后做了哪些事。'
    }),

    Z.makeLesson({
      id: 'db-join-L3', kpIds: ['db-join'], subject: 'cs', level: 3,
      title: '连接与子查询：把多张表拼成一个答案',
      estMinutes: 45,
      hookTitle: '为什么内连接会「少几行」？',
      hookBody: '因为匹配不上的行被丢掉了。左表有、右表没有对应记录时，内连接不会保留它；这不是数据丢了，而是连接方式选错了。',
      idea: 'JOIN 按 ON 条件把两张表的行配对。INNER JOIN 只保留配对成功的行，LEFT JOIN 保留左表全部行，右表缺失处补 NULL。子查询则把一次查询的结果当成另一个查询的输入。',
      diagramId: 'sql-join', diagramCaption: '以 users.id = orders.uid 配对；uid=3 的订单在内连接里会被丢掉',
      analogy: { title: '两张拼图', md: '两张表各是一半拼图，ON 是接口形状。接口对不上时，内连接直接把这块扔掉；左连接则把左半边留着，空缺处留白，这个留白就是 NULL。' },
      points: [
        { title: '一、连接的本质', md: 'FROM a JOIN b ON 条件：把 a 的每一行与 b 中满足条件的行组合。ON 描述的是「两张表的行怎么算匹配」，不是普通的行过滤。' },
        { title: '二、内连接只留匹配', md: 'INNER JOIN 的结果行数等于匹配对数。多对多关系会产生多行，忘记写 ON 会得到笛卡尔积，行数瞬间爆炸，查询也会变得极慢。' },
        { title: '三、左连接保留左表', md: 'LEFT JOIN 保留左表所有行，右表没有匹配时右侧列为 NULL。统计「每个用户多少订单」必须用它，否则零订单用户会从结果里消失。' },
        { title: '四、子查询的三种形态', md: '标量子查询返回一个值，可放在 WHERE 比较里；IN 子查询返回一列值；EXISTS 只判断有没有行，通常比 IN 更适合大表，因为它找到一行就能停。' },
        { title: '五、连接与子查询的取舍', md: '需要展示另一张表的列就用 JOIN；只做存在性判断用 EXISTS；相关子查询写起来直观，但可能对外层每一行都执行一次，要注意性能。' },
        { title: '六、去重与计数陷阱', md: '一对多连接后 COUNT(*) 会重复计算主表行，要 COUNT(DISTINCT 主表 id)，或先在子查询里按主键聚合再连接，否则统计数字会虚高。' },
        { title: '七、性能直觉', md: '连接列要有索引；小表驱动大表；尽量早过滤。执行计划里 rows 很大，通常意味着缺索引，或者条件写得不够有选择性。' }
      ],
      table: {
        headers: ['连接类型', '保留的行', '典型用途'],
        rows: [
          ['INNER JOIN', '两边都匹配上的行', '查询有订单的用户'],
          ['LEFT JOIN', '左表全部行', '查询所有用户及其订单数'],
          ['RIGHT JOIN', '右表全部行', '与左连接方向相反'],
          ['CROSS JOIN', '两表行的所有组合', '生成组合，慎用']
        ]
      },
      code: 'SELECT u.id, u.name, COUNT(o.id) AS order_cnt\nFROM users u\nLEFT JOIN orders o ON u.id = o.uid\nGROUP BY u.id, u.name\nORDER BY order_cnt DESC;',
      warning: 'LEFT JOIN 之后在 WHERE 里对右表列写 o.status = 1，会把补齐的 NULL 行过滤掉，效果等同于内连接。要保留左表全部行，把条件放进 ON。',
      tip: '写多表查询时先确定「哪张表是主表」，再决定用 LEFT 还是 INNER；主表选错，结果一定错。',
      quizIds: ['db-join-1', 'db-join-2', 'db-join-3', 'db-join-4'],
      example: {
        title: '找出没有下过订单的用户',
        steps: [
          { md: '主表选 users，用 LEFT JOIN orders ON users.id = orders.uid。' },
          { md: '有订单的用户，右表列有值；没订单的用户，右表列全为 NULL。' },
          { md: '加 WHERE orders.uid IS NULL，只留下没订单的用户。' },
          { md: '这种写法叫反连接，比 NOT IN 更不容易被 NULL 坑到。' }
        ],
        takeaway: '找「没有对应记录」的固定套路：左连接 + IS NULL。'
      },
      example2: {
        title: '统计每个用户的订单数（含零订单用户）',
        steps: [
          { md: 'users LEFT JOIN orders，保证每个用户至少出现一行。' },
          { md: '按 users.id 分组。' },
          { md: '计数用 COUNT(orders.id)，没有订单时它返回 0。' },
          { md: '若用 COUNT(*)，零订单用户会被数成 1，结果整体偏大。' }
        ],
        takeaway: '左连接统计时，数右表的列，不要数星号。'
      },
      guided: [{ questionId: 'db-join-2', hint: '想保留所有用户，又要筛掉有订单的人，需要左连接加 IS NULL。' }],
      solo: ['db-join-1', 'db-join-3'],
      challenge: ['db-join-4'],
      summary: {
        essence: 'JOIN 按 ON 配对：内连接只留匹配，左连接保留左表；子查询适合取值与存在性判断。',
        formulas: ['a INNER JOIN b ON a.id = b.aid', 'a LEFT JOIN b ON a.id = b.aid', 'WHERE EXISTS (SELECT 1 FROM ...)'],
        pitfalls: ['忘记 ON 产生笛卡尔积', '左连接后在 WHERE 过滤右表', 'COUNT(*) 虚高', '用 = NULL 判空'],
        checklist: ['我能区分内连接与左连接', '我会写反连接找缺失记录', '我能用 EXISTS 做存在性判断', '我知道连接后计数该数哪一列']
      },
      feynman: '请解释为什么「查所有用户的订单数」必须用左连接，以及 COUNT(*) 为什么会算错。'
    }),

    Z.makeLesson({
      id: 'db-index-L3', kpIds: ['db-index'], subject: 'cs', level: 3,
      title: '索引与执行计划：让查询少扫几行',
      estMinutes: 45,
      hookTitle: '为什么加了索引，查询反而可能更慢？',
      hookBody: '因为索引不是白拿的：每次写入都要维护它，索引太多还会让优化器挑错。更常见的是，SQL 写法让索引用不上，白建了一场。',
      idea: '索引是**额外维护的有序结构**，最常见是 B+ 树。它把「逐行扫描」变成「按树定位」，用少量空间和写入代价，换取查询时的定位速度。',
      diagramId: 'tree-structure', diagramCaption: 'B+ 树把有序键分层组织，查找只需从根走到叶子',
      analogy: { title: '字典的拼音索引', md: '正文按内容排，查字时先翻拼音索引定位页码，不用从第一页读起。索引本身也要维护：新增一个字，索引就得改一处，这就是写入的代价。' },
      points: [
        { title: '一、没有索引就是全表扫描', md: '数据库只能逐行判断 WHERE 条件，复杂度 O(n)。数据量大时，哪怕只差几行也要把整张表读一遍，磁盘 IO 成为瓶颈。' },
        { title: '二、B+ 树为什么快', md: '非叶子节点只存键，叶子节点存数据或指针并用链表相连；三层高度就能容纳千万级记录，等值查询只需几次节点读取，范围查询还能顺着叶子链表扫。' },
        { title: '三、聚簇索引与二级索引', md: 'InnoDB 的主键索引叶子存整行，二级索引叶子存主键值。用二级索引查到主键后还要回表取其他列，除非查询列都在索引里，这就是覆盖索引。' },
        { title: '四、联合索引与最左前缀', md: '索引 (a, b, c) 能支持 a、a+b、a+b+c 的条件；跳过 a 直接用 b，通常用不上这个索引。设计联合索引时，把等值条件多、区分度高的列放前面。' },
        { title: '五、索引失效的常见写法', md: '对索引列用函数、发生隐式类型转换、前导模糊 LIKE、OR 连接非索引列、范围条件之后的列失效，都可能让索引白建。写法比建索引更值得先检查。' },
        { title: '六、索引的代价', md: '占磁盘空间；每次 INSERT、UPDATE、DELETE 都要维护索引；索引过多会让优化器选择变难，写入吞吐下降。索引是权衡，不是越多越好。' },
        { title: '七、用 EXPLAIN 验证', md: '看 type（ALL 是全表扫描，ref 是索引查找）、key（实际使用的索引）、rows（预估扫描行数）、Extra（Using index 表示覆盖索引，Using filesort 表示额外排序）。' }
      ],
      table: {
        headers: ['写法', '能否走索引', '原因'],
        rows: [
          ['WHERE age = 20', '能', '直接匹配索引列'],
          ['WHERE YEAR(age) = 2000', '通常不能', '列上做了函数运算'],
          ['WHERE name LIKE 前缀%', '不能', '前导通配符无法定位起点'],
          ['WHERE a = 1 AND b = 2', '能（索引 a,b）', '符合最左前缀']
        ]
      },
      code: 'CREATE INDEX idx_student_age ON student(age);\n\nEXPLAIN SELECT id, name\nFROM student\nWHERE age >= 18\nORDER BY age;',
      warning: '索引列上做运算或函数，会让索引失效。把 WHERE YEAR(created_at) = 2026 改成范围条件 created_at >= 起点 AND created_at < 终点。',
      tip: '建索引前先看真实查询：WHERE 和 JOIN ON 用到的列、排序的列、区分度高的列，优先级最高。',
      quizIds: ['db-index-1', 'db-index-2', 'db-index-3', 'db-index-4'],
      example: {
        title: '为「按用户查最近订单」设计索引',
        steps: [
          { md: '查询是 WHERE user_id = ? ORDER BY created_at DESC LIMIT 20。' },
          { md: '建联合索引 (user_id, created_at)：先按用户定位，再在用户内部按时间有序。' },
          { md: '这样既能过滤 user_id，又能直接按索引顺序取最新记录，避免额外排序。' },
          { md: '如果只建 (user_id)，时间排序仍需 filesort，深分页会明显变慢。' }
        ],
        takeaway: '过滤列在前，排序列在后，联合索引才能同时服务 WHERE 和 ORDER BY。'
      },
      example2: {
        title: '读一条 EXPLAIN',
        steps: [
          { md: 'type 为 ALL、rows 为 100000，说明全表扫描十万行。' },
          { md: 'key 为 NULL，说明没有用上任何索引。' },
          { md: '给 WHERE 条件列建索引后重新 EXPLAIN。' },
          { md: 'type 变为 ref、rows 变为 3，Extra 出现 Using index 表示覆盖索引。' }
        ],
        takeaway: '看 type、key、rows、Extra 四项，就能判断索引有没有真正生效。'
      },
      guided: [{ questionId: 'db-index-4', hint: '索引存的是列的原始值，列上做函数后无法按顺序定位。' }],
      solo: ['db-index-1', 'db-index-3'],
      challenge: ['db-index-2'],
      summary: {
        essence: '索引用 B+ 树把无序变有序；联合索引遵循最左前缀；写法不对会让索引失效。',
        formulas: ['CREATE INDEX 索引名 ON 表(列)', 'EXPLAIN SELECT ...', '联合索引 (a, b) 支持 a、a+b'],
        pitfalls: ['在索引列上套函数', '前导模糊 LIKE', '索引建了但查询没用上', '以为索引越多越好'],
        checklist: ['我能解释 B+ 树为什么快', '我理解聚簇索引与回表', '我会设计联合索引', '我能用 EXPLAIN 判断索引是否生效']
      },
      feynman: '请用字典索引的比喻，解释为什么给列加函数之后索引就用不上了。'
    }),

    Z.makeLesson({
      id: 'db-transaction-L3', kpIds: ['db-transaction'], subject: 'cs', level: 3,
      title: '事务与 ACID：要么全成，要么全不成',
      estMinutes: 45,
      hookTitle: '转账转一半断电了，钱会凭空消失吗？',
      hookBody: '不会，因为扣款和加款在同一个事务里。数据库要么把两步都提交，要么把已做的部分全部撤销，不会留下「扣了没加」的中间状态。',
      idea: '事务是一组**不可分割**的数据库操作：要么全部提交，要么全部回滚。ACID 是它的四个保证：原子性、一致性、隔离性、持久性。',
      diagramId: 'loop-flow', diagramCaption: '事务从 BEGIN 开始，成功则 COMMIT，失败则 ROLLBACK',
      analogy: { title: '银行转账的打包信封', md: '扣款单和加款单装进同一个信封，要么两单一起生效，要么整袋作废。中间被别人偷看就是脏读，同一笔钱反复变化就是不可重复读，需要隔离级别来管。' },
      points: [
        { title: '一、为什么需要事务', md: '转账要扣一个账户、加另一个账户，只完成一半会让总额对不上。事务把多步操作绑成一个整体，成功一起生效，失败一起撤销。' },
        { title: '二、原子性 A 与一致性 C', md: '原子性靠 undo 日志保证：要么全做，要么全撤。一致性指事务前后数据都满足约束，例如总额不变、余额不为负、外键仍然有效。' },
        { title: '三、隔离性 I 与持久性 D', md: '隔离性让并发事务互不干扰，靠锁和 MVCC 实现；持久性靠 redo 日志，提交后即使断电也能恢复。四个字母各自解决不同的问题。' },
        { title: '四、并发三大异常', md: '脏读读到别的事务未提交的数据；不可重复读同一行两次读到的值不同；幻读同一范围两次查到不同的行数。级别越高，异常越少，并发越差。' },
        { title: '五、四种隔离级别', md: 'READ UNCOMMITTED 允许脏读；READ COMMITTED 避免脏读；REPEATABLE READ 避免不可重复读，是 MySQL 默认；SERIALIZABLE 全部避免，但并发最低。' },
        { title: '六、事务的写法', md: 'BEGIN 或 START TRANSACTION 开始，COMMIT 提交，ROLLBACK 回滚。DDL 往往会隐式提交，别把建表和业务操作混在一个事务里，否则回滚不彻底。' },
        { title: '七、长事务的代价', md: '持有锁时间长、undo 日志膨胀、影响其他事务。事务里不要做网络请求、不要等用户输入，尽量短小，把能提前算的放到事务外。' }
      ],
      table: {
        headers: ['隔离级别', '能避免', '仍然可能'],
        rows: [
          ['READ UNCOMMITTED', '无', '脏读、不可重复读、幻读'],
          ['READ COMMITTED', '脏读', '不可重复读、幻读'],
          ['REPEATABLE READ', '脏读、不可重复读', '幻读（MySQL 用间隙锁基本避免）'],
          ['SERIALIZABLE', '全部', '并发性能明显下降']
        ]
      },
      code: 'BEGIN;\nUPDATE account SET balance = balance - 100 WHERE id = 1;\nUPDATE account SET balance = balance + 100 WHERE id = 2;\nCOMMIT;',
      warning: '事务没有提交就断开连接，数据库通常会自动回滚。不要把 COMMIT 写在异常也能执行到的位置，否则失败的操作也会被提交。',
      tip: '判断要不要事务，看这组操作是否必须同生共死：涉及多行多表、金额、库存、状态流转，基本都需要。',
      quizIds: ['db-transaction-1', 'db-transaction-2', 'db-transaction-3', 'db-transaction-4'],
      example: {
        title: '转账成功与失败两条路径',
        steps: [
          { md: 'BEGIN 开启事务。' },
          { md: '第一条 UPDATE 扣款，第二条 UPDATE 加款。' },
          { md: '两条都成功，执行 COMMIT，修改一起生效。' },
          { md: '任一条失败，执行 ROLLBACK，已做的扣款被撤销。' }
        ],
        takeaway: '事务的提交必须放在所有步骤都成功之后。'
      },
      example2: {
        title: '判断三种并发异常',
        steps: [
          { md: '事务 A 改了余额但没提交，事务 B 读到了这个值，这是脏读。' },
          { md: '事务 B 先读余额 100，事务 A 提交改成 80，B 再读变成 80，这是不可重复读。' },
          { md: '事务 B 第一次查 3 行，事务 A 插入一行并提交，B 再查变成 4 行，这是幻读。' },
          { md: '把隔离级别从 READ COMMITTED 提到 REPEATABLE READ，可避免前两种和大部分幻读。' }
        ],
        takeaway: '脏读看未提交，不可重复读看同一行，幻读看行数变化。'
      },
      guided: [{ questionId: 'db-transaction-4', hint: '只有 COMMIT 才表示修改永久生效。' }],
      solo: ['db-transaction-1', 'db-transaction-3'],
      challenge: ['db-transaction-2'],
      summary: {
        essence: '事务保证一组操作同生共死；ACID 分别解决原子、一致、隔离与持久问题。',
        formulas: ['BEGIN / COMMIT / ROLLBACK', 'ACID = 原子性 + 一致性 + 隔离性 + 持久性'],
        pitfalls: ['把 COMMIT 放在异常路径上', '在长事务里做网络请求', '用低隔离级别却要求强一致', '以为 DDL 能跟着事务回滚'],
        checklist: ['我能解释 ACID 四项', '我会写 BEGIN / COMMIT / ROLLBACK', '我能区分脏读、不可重复读、幻读', '我知道四种隔离级别的取舍']
      },
      feynman: '请用转账例子讲清楚原子性和隔离性分别防住了什么问题。'
    }),

    Z.makeLesson({
      id: 'db-nosql-L2', kpIds: ['db-nosql'], subject: 'cs', level: 2,
      title: 'NoSQL：不是不要 SQL，而是换一种存法',
      estMinutes: 40,
      hookTitle: '为什么大厂的核心账务还在用关系型数据库？',
      hookBody: '因为强一致、复杂事务和多表查询仍是刚需。NoSQL 擅长的是缓存、海量写入、灵活结构和图关系，它是补位，不是把关系型一脚踢开。',
      idea: 'NoSQL 是一类**非关系型**数据库的统称，常见四类：键值、文档、列族、图。它们通常牺牲部分一致性或查询灵活性，换取横向扩展、灵活 schema 和高吞吐。',
      diagramId: 'hash-bucket', diagramCaption: '键值型数据库用哈希把键分到不同桶，按 key 直接定位',
      analogy: { title: '储物柜与档案室', md: '键值库像储物柜：给编号就能立刻取出整包东西；关系型像档案室：能按多个条件交叉检索，但找起来要翻目录。要什么取决于你以后怎么查。' },
      points: [
        { title: '一、NoSQL 出现的场景', md: '数据量超出单机、schema 频繁变化、写入吞吐要求高、访问模式简单且可预估时，关系型的约束和 JOIN 反而成为负担。' },
        { title: '二、四类 NoSQL', md: '键值（Redis、Memcached）适合缓存与计数；文档（MongoDB）适合结构灵活的对象；列族（HBase、Cassandra）适合海量写入；图（Neo4j）适合多跳关系。' },
        { title: '三、CAP 与 BASE', md: '分布式系统最多同时满足一致性、可用性、分区容忍中的两项；BASE 用基本可用、软状态、最终一致性换取可用性，是对 CAP 的工程折中。' },
        { title: '四、建模从实体转向访问模式', md: '关系型先想实体和范式，NoSQL 先想「页面要一次查出什么」，把数据按查询组织，允许冗余。同一份数据为不同查询存多份，是常见做法。' },
        { title: '五、一致性的取舍', md: '强一致适合账务、库存扣减；最终一致适合点赞数、粉丝数、搜索索引，短暂不一致可以接受。先问业务能不能忍，再决定数据库。' },
        { title: '六、什么时候仍该用关系型', md: '需要多表 JOIN、复杂事务、强约束、报表聚合时，关系型加索引往往更省事。别为了时髦硬上 NoSQL，最后在应用层重写一个数据库。' },
        { title: '七、选型清单', md: '先问数据形状、读写比例、一致性要求、扩展方式和团队熟悉度，再看具体产品。从访问模式出发，而不是从「用哪个数据库」出发。' }
      ],
      table: {
        headers: ['类型', '代表', '适合场景'],
        rows: [
          ['键值', 'Redis', '缓存、会话、计数'],
          ['文档', 'MongoDB', '字段多变的半结构化对象'],
          ['列族', 'HBase / Cassandra', '海量写入与按列查询'],
          ['图', 'Neo4j', '多跳关系与路径分析']
        ]
      },
      code: '# Redis：键值缓存与计数\nSET article:1:likes 0\nINCR article:1:likes\nGET article:1:likes\n\n# MongoDB：文档型，一条记录就是一个 JSON 对象\ndb.users.insertOne({ name: "张三", age: 18 })',
      warning: 'NoSQL 的「无 schema」不等于不用设计。字段随意增删会让同一集合里出现多种结构，查询和统计时到处要判空。',
      tip: '先用关系型把业务跑通，等出现明确的规模或访问模式瓶颈，再针对性地引入 NoSQL，而不是一开始就多库并存。',
      quizIds: ['db-nosql-1', 'db-nosql-2', 'db-nosql-3', 'db-nosql-4'],
      example: {
        title: '商品详情页的存储选型',
        steps: [
          { md: '商品字段经常新增，且一次要查出完整对象，适合文档型存储。' },
          { md: '价格、库存需要强一致与事务，留在关系型数据库。' },
          { md: '浏览量、点赞数写入频繁且可容忍短暂不一致，放键值型自增。' },
          { md: '详情页先读缓存，缓存未命中再回源文档库，避免每次都查主库。' }
        ],
        takeaway: '一份业务可以拆成多种存储，按一致性和访问模式分工。'
      },
      example2: {
        title: '点赞数为什么可以最终一致',
        steps: [
          { md: '点赞是高频写，强一致会带来大量锁竞争。' },
          { md: '先在缓存里自增，立即返回成功，用户体验好。' },
          { md: '异步把增量写回数据库，短时间数字可能略有偏差。' },
          { md: '只要最终收敛、不涉及金额，业务通常可以接受。' }
        ],
        takeaway: '能不能最终一致，取决于业务对短暂错误的容忍度。'
      },
      guided: [{ questionId: 'db-nosql-2', hint: '字段多变和按 key 高频读写，分别对应文档型与键值型。' }],
      solo: ['db-nosql-1', 'db-nosql-4'],
      challenge: ['db-nosql-3'],
      summary: {
        essence: 'NoSQL 用部分一致性和查询灵活性换扩展与吞吐；选型从访问模式和一致性要求出发。',
        formulas: ['键值：SET / GET / INCR', 'CAP：一致性、可用性、分区容忍三选二', 'BASE：基本可用 + 软状态 + 最终一致'],
        pitfalls: ['把 NoSQL 当成关系型替代品', '无 schema 就随便加字段', '用最终一致存账务金额', '一开始就多库并存'],
        checklist: ['我能说出四类 NoSQL 的典型场景', '我理解 CAP 与 BASE', '我能按访问模式做选型', '我知道什么时候仍该用关系型']
      },
      feynman: '请用储物柜和档案室的比喻，说明键值型与关系型各自擅长什么。'
    })
  );
})(window.ZSB = window.ZSB || {});
