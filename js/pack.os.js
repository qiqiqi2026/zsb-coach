/* 操作系统模块包：7 个考点 + 7 份完整讲义 + 28 道题 */
(function (Z) {
  Z.addKps([
    { id: 'os-process', subject: 'cs', chapter: '操作系统', title: '进程与线程', level: 2, examWeight: 0.03, prerequisites: ['cs-os'], examCount: 4, examPoints: 12, outcome: '能说清进程与线程的区别，会画状态转换，解释上下文切换与死锁', note: '进程是资源分配单位，线程是 CPU 调度单位' },
    { id: 'os-schedule', subject: 'cs', chapter: '操作系统', title: 'CPU 调度', level: 3, examWeight: 0.03, prerequisites: ['os-process'], examCount: 4, examPoints: 12, outcome: '能按 FCFS、SJF、RR、优先级算法画甘特图并算平均周转时间', note: '先画完成时刻，再减到达时刻' },
    { id: 'os-memory', subject: 'cs', chapter: '操作系统', title: '内存管理与虚拟内存', level: 3, examWeight: 0.03, prerequisites: ['cs-hardware'], examCount: 4, examPoints: 12, outcome: '能解释页表与地址转换，会算缺页次数与页面置换', note: '虚拟内存靠页表、缺页中断和局部性原理' },
    { id: 'os-file', subject: 'cs', chapter: '操作系统', title: '文件系统', level: 2, examWeight: 0.03, prerequisites: ['cs-os'], examCount: 4, examPoints: 12, outcome: '能说出 inode、目录、路径、硬链接与软链接的作用', note: '文件名在目录里，元数据在 inode 里' },
    { id: 'os-io', subject: 'cs', chapter: '操作系统', title: 'IO 与设备管理', level: 3, examWeight: 0.03, prerequisites: ['os-process'], examCount: 4, examPoints: 12, outcome: '能比较程序查询、中断、DMA 的 CPU 参与程度，解释缓冲与 SPOOLing', note: '越解放 CPU 的方式，控制越复杂' },
    { id: 'os-shell', subject: 'cs', chapter: '操作系统', title: '命令行与 Shell', level: 2, examWeight: 0.03, prerequisites: ['cs-os'], examCount: 4, examPoints: 12, outcome: '能用管道、重定向和常用命令完成文件过滤与统计', note: '管道传的是标准输出，不含标准错误' },
    { id: 'os-container', subject: 'cs', chapter: '操作系统', title: '虚拟机、容器与云', level: 3, examWeight: 0.03, prerequisites: ['os-process'], examCount: 4, examPoints: 12, outcome: '能区分虚拟机与容器的隔离层次，说出 namespace 与 cgroups 的作用', note: '虚拟机虚拟硬件，容器虚拟系统视图' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- os-process ---------- */
    { id: 'os-proc-1', kpIds: ['os-process'], subject: 'cs', type: 'single',
      stem: '进程与线程最本质的区别是？',
      options: ['进程比线程运行得更快', '进程是资源分配的基本单位，线程是 CPU 调度的基本单位', '线程拥有独立的地址空间', '一个进程只能包含一个线程'],
      answer: 'B',
      analysis: { ans: 'B', why: '进程拥有独立的地址空间和资源，线程共享进程的地址空间，只是进程内的一条执行流。', steps: '1. 进程有独立页表、打开文件表等资源。\n2. 同一进程的线程共享这些资源。\n3. 因此进程是资源分配单位，线程是调度单位。', pit: '不要说线程更快，线程只是切换开销更小。' } },
    { id: 'os-proc-2', kpIds: ['os-process'], subject: 'cs', type: 'single',
      stem: '进程的时间片用完，此时发生的状态转换是？',
      options: ['就绪 → 运行', '运行 → 就绪', '运行 → 阻塞', '阻塞 → 就绪'],
      answer: 'B',
      analysis: { ans: 'B', why: '时间片用完只说明 CPU 被收回，进程仍然具备运行条件，所以回到就绪队列。', steps: '1. 进程正在运行。\n2. 时间片耗尽，调度器夺回 CPU。\n3. 进程不缺资源只缺 CPU，进入就绪态。', pit: '等待 IO 才进阻塞态；时间片用完不是阻塞。' } },
    { id: 'os-proc-3', kpIds: ['os-process'], subject: 'cs', type: 'fill',
      stem: '一个进程至少包含一个______，它是进程内真正被 CPU 执行的执行流。',
      answer: '线程', accept: ['线程', 'thread'],
      analysis: { ans: '线程', why: '进程是资源容器，实际执行指令的是线程，每个进程至少有一个主线程。', steps: '1. 创建进程时会同时创建一个主线程。\n2. CPU 调度的是线程。\n3. 所以进程至少有一个线程。', pit: '不要把进程当成执行流，进程更偏「容器」。' } },
    { id: 'os-proc-4', kpIds: ['os-process'], subject: 'cs', type: 'fill',
      stem: '进程切换时需要保存当前执行的现场，这个现场通常称为______。',
      answer: '上下文', accept: ['上下文', '现场', 'context'],
      analysis: { ans: '上下文', why: '上下文包括寄存器值、程序计数器、栈指针等，切换时保存到 PCB，恢复时再装载。', steps: '1. 切换前把寄存器、PC 等写入 PCB。\n2. 调度器选择新进程。\n3. 从新进程的 PCB 恢复现场。', pit: '进程切换还要换页表，开销比线程切换大得多。' } },

    /* ---------- os-schedule ---------- */
    { id: 'os-sched-1', kpIds: ['os-schedule'], subject: 'cs', type: 'single',
      stem: '时间片轮转（RR）最适合下面哪类系统？',
      options: ['无人值守的批处理系统', '要求响应快的分时交互系统', '只需运行一个作业的单道系统', '不允许抢占的实时系统'],
      answer: 'B',
      analysis: { ans: 'B', why: 'RR 让每个进程轮流获得一个时间片，等待时间有上界，适合交互式分时系统。', steps: '1. RR 按时间片轮流执行。\n2. 每个进程都能较快得到下一次 CPU。\n3. 所以响应时间短，适合分时交互。', pit: 'RR 不保证截止时间，硬实时系统要用优先级或实时调度。' } },
    { id: 'os-sched-2', kpIds: ['os-schedule'], subject: 'cs', type: 'single',
      stem: '三个进程同时到达，运行时间分别为 3、6、9，按 FCFS 调度，平均周转时间是？',
      options: ['6', '9', '10', '18'],
      answer: 'C',
      analysis: { ans: '10', why: '完成时刻分别是 3、9、18，周转时间也是 3、9、18，平均为 30 除以 3 等于 10。', steps: '1. P1 完成于 3，周转 3。\n2. P2 完成于 9，周转 9。\n3. P3 完成于 18，周转 18。\n4. 平均 = (3+9+18)/3 = 10。', pit: '平均周转时间不是平均运行时间，别把 6 当答案。' } },
    { id: 'os-sched-3', kpIds: ['os-schedule'], subject: 'cs', type: 'fill',
      stem: '在非抢占、作业同时可用的条件下，短作业优先（SJF）的平均等待时间是所有算法中______的。',
      answer: '最优', accept: ['最优', '最短', '最少', '最小'],
      analysis: { ans: '最优', why: '短作业先做能减少排在其后的作业等待时间，SJF 在非抢占条件下可使平均等待时间最小。', steps: '1. 作业按运行时间从短到长排列。\n2. 短作业不被长作业堵住。\n3. 总等待时间最小。', pit: 'SJF 需要预知运行时间，且可能让长作业饿死。' } },
    { id: 'os-sched-4', kpIds: ['os-schedule'], subject: 'cs', type: 'fill',
      stem: '时间片轮转中，如果时间片设置得过大，算法会退化为______调度。',
      answer: '先来先服务', accept: ['先来先服务', 'FCFS', 'FIFO', '先来先服务算法'],
      analysis: { ans: '先来先服务', why: '时间片大到每个进程都能一次跑完时，轮流执行就变成了按到达顺序一次执行完。', steps: '1. RR 的进程用完时间片就排到队尾。\n2. 时间片大于所有进程的运行时间。\n3. 没有进程被中途打断，等价于 FCFS。', pit: '时间片过小则切换开销占比过高，吞吐量下降。' } },

    /* ---------- os-memory ---------- */
    { id: 'os-mem-1', kpIds: ['os-memory'], subject: 'cs', type: 'single',
      stem: '虚拟内存能够成立，主要依赖程序的什么特性？',
      options: ['局部性原理', 'CPU 主频足够高', '磁盘容量足够大', 'CPU 核心数足够多'],
      answer: 'A',
      analysis: { ans: 'A', why: '程序在一段时间内只访问少量页面，才能把其余页面放在磁盘而不明显拖慢执行。', steps: '1. 时间局部性：刚用过的还会用。\n2. 空间局部性：相邻地址常一起用。\n3. 因此只需把当前活跃页面放进内存。', pit: '磁盘大只是必要条件，没有局部性会不停换页，反而抖动。' } },
    { id: 'os-mem-2', kpIds: ['os-memory'], subject: 'cs', type: 'single',
      stem: '下面哪种页面置换算法可能出现 Belady 异常？',
      options: ['LRU', 'FIFO', 'OPT', 'LFU'],
      answer: 'B',
      analysis: { ans: 'FIFO', why: 'Belady 异常指增加页框数后缺页次数反而变多，FIFO 是典型会出现该异常的算法。', steps: '1. FIFO 只按进入内存的先后淘汰。\n2. 淘汰顺序与访问模式无关。\n3. 增加页框会改变队列内容，可能出现更多缺页。', pit: 'LRU 与 OPT 属于栈式算法，不会出现 Belady 异常。' } },
    { id: 'os-mem-3', kpIds: ['os-memory'], subject: 'cs', type: 'fill',
      stem: '负责把逻辑地址翻译成物理地址的硬件部件是______。',
      answer: 'MMU', accept: ['MMU', '内存管理单元', 'Memory Management Unit'],
      analysis: { ans: 'MMU', why: 'MMU 依据页表完成地址翻译，并检查访问权限，通常集成在 CPU 内部。', steps: '1. CPU 发出逻辑地址。\n2. MMU 拆分页号与页内偏移。\n3. 查页表得到物理页框号，拼出物理地址。', pit: '页表放在内存里，MMU 里还有 TLB 缓存最近用过的映射。' } },
    { id: 'os-mem-4', kpIds: ['os-memory'], subject: 'cs', type: 'fill',
      stem: '进程访问的页面不在内存中，会触发______中断，由操作系统把页面调入。',
      answer: '缺页', accept: ['缺页', '缺页中断', 'page fault', 'Page Fault'],
      analysis: { ans: '缺页', why: '页表项的有效位为 0 时硬件产生缺页中断，操作系统负责调入页面并更新页表。', steps: '1. MMU 查页表发现有效位为 0。\n2. 触发缺页中断，进入内核。\n3. 内核分配页框、读入页面、更新页表。\n4. 重新执行引起缺页的指令。', pit: '缺页不一定是错误，虚拟内存中它是正常机制。' } },

    /* ---------- os-file ---------- */
    { id: 'os-file-1', kpIds: ['os-file'], subject: 'cs', type: 'single',
      stem: '在 Linux 文件系统中，记录文件权限、大小和数据块位置的是？',
      options: ['页表', 'inode（索引节点）', 'PCB', 'MBR'],
      answer: 'B',
      analysis: { ans: 'inode', why: 'inode 保存文件除文件名外的全部元数据，目录项则负责把文件名映射到 inode 号。', steps: '1. 文件名存在目录项中。\n2. 目录项指向一个 inode 号。\n3. inode 记录权限、大小、数据块指针。', pit: 'inode 里没有文件名，这是硬链接能存在的原因。' } },
    { id: 'os-file-2', kpIds: ['os-file'], subject: 'cs', type: 'single',
      stem: '以斜杠 / 开头、从根目录出发的路径称为？',
      options: ['相对路径', '绝对路径', '符号链接', '硬链接'],
      answer: 'B',
      analysis: { ans: '绝对路径', why: '绝对路径从根目录开始，与当前工作目录无关；相对路径从当前目录开始。', steps: '1. / 表示根目录。\n2. 从根开始逐级向下就是绝对路径。\n3. 例如 /home/user/a.txt。', pit: '相对路径里的 .. 表示上一级，. 表示当前目录。' } },
    { id: 'os-file-3', kpIds: ['os-file'], subject: 'cs', type: 'fill',
      stem: 'Linux 的设计原则之一是「一切皆文件」，连目录本身也被当作一种______。',
      answer: '文件', accept: ['文件', 'file'],
      analysis: { ans: '文件', why: '目录在 Linux 中是特殊文件，内容是文件名与 inode 号的映射，同样可以用系统调用打开读取。', steps: '1. 普通文件存数据。\n2. 目录存目录项。\n3. 设备也通过文件接口访问。', pit: '目录不能像普通文件那样随意写入，必须用 mkdir、unlink 等操作。' } },
    { id: 'os-file-4', kpIds: ['os-file'], subject: 'cs', type: 'fill',
      stem: '一个文件有两个硬链接，删除其中一个链接后，文件数据______被立即删除。',
      answer: '不会', accept: ['不会', '不会立即', '否', '不'],
      analysis: { ans: '不会', why: '硬链接共享同一个 inode，删除一个名字只是把链接计数减一，计数归零时数据块才释放。', steps: '1. 创建硬链接时链接计数加一。\n2. 删除一个名字，计数减一。\n3. 计数仍大于零，inode 与数据块保留。', pit: '软链接不是链接计数，目标删除后软链接就失效。' } },

    /* ---------- os-io ---------- */
    { id: 'os-io-1', kpIds: ['os-io'], subject: 'cs', type: 'single',
      stem: '不需要 CPU 逐字节搬运、由控制器直接在设备与内存之间传送数据的技术是？',
      options: ['程序查询', '中断驱动', 'DMA', '忙等待'],
      answer: 'C',
      analysis: { ans: 'DMA', why: 'DMA 控制器接管总线，成块搬运数据，传输结束后才向 CPU 发一次中断。', steps: '1. CPU 设置内存地址、设备地址和传送长度。\n2. DMA 控制器直接搬运数据。\n3. 完成后中断 CPU。', pit: '中断驱动仍然要 CPU 参与每次中断处理，数据量大时开销明显。' } },
    { id: 'os-io-2', kpIds: ['os-io'], subject: 'cs', type: 'single',
      stem: '操作系统引入缓冲技术的主要目的是？',
      options: ['提高 CPU 主频', '缓和 CPU 与 IO 设备之间的速度差异', '增加内存总容量', '减少磁盘的物理容量'],
      answer: 'B',
      analysis: { ans: 'B', why: '缓冲让快的一方先把数据放进缓冲区，减少互相等待，从而提升整体效率。', steps: '1. CPU 与设备速度差距大。\n2. 用内存做中转缓冲区。\n3. 快的一方不必等慢的一方完成。', pit: '缓冲不能提高设备本身的传输速率。' } },
    { id: 'os-io-3', kpIds: ['os-io'], subject: 'cs', type: 'fill',
      stem: 'CPU 发出 IO 请求后继续执行其他任务，设备完成时通过______通知 CPU。',
      answer: '中断', accept: ['中断', '中断请求', 'interrupt', 'IRQ'],
      analysis: { ans: '中断', why: '设备完成 IO 后发出中断信号，CPU 保存现场并转入中断处理程序。', steps: '1. CPU 启动设备后返回执行其他进程。\n2. 设备完成，发出中断请求。\n3. CPU 响应中断，处理数据。', pit: '程序查询方式下 CPU 只能循环检查状态，不能做别的事。' } },
    { id: 'os-io-4', kpIds: ['os-io'], subject: 'cs', type: 'fill',
      stem: '把一台独占设备虚拟成多台逻辑设备、典型用于打印队列的技术简称______。',
      answer: 'SPOOLing', accept: ['SPOOLing', 'SPOOL', '假脱机', '假脱机技术'],
      analysis: { ans: 'SPOOLing', why: 'SPOOLing 用磁盘上的输入井、输出井把独占设备改造成可共享的逻辑设备。', steps: '1. 作业输出先写入磁盘输出井。\n2. 打印进程按队列依次取出。\n3. 用户感觉各自拥有打印机。', pit: 'SPOOLing 并没有让物理打印机真正并行，只是排队复用。' } },

    /* ---------- os-shell ---------- */
    { id: 'os-shell-1', kpIds: ['os-shell'], subject: 'cs', type: 'single',
      stem: '命令 `ls | grep txt` 中竖线的作用是？',
      options: ['把前一个命令的标准输出作为后一个命令的标准输入', '让两个命令并行执行', '把结果重定向到文件', '表示注释'],
      answer: 'A',
      analysis: { ans: 'A', why: '管道把左侧命令的 stdout 接到右侧命令的 stdin，两个进程同时运行。', steps: '1. ls 列出文件名，写到 stdout。\n2. 管道把 stdout 接到 grep 的 stdin。\n3. grep 从中筛选包含 txt 的行。', pit: '管道只传标准输出，标准错误仍直接打到终端。' } },
    { id: 'os-shell-2', kpIds: ['os-shell'], subject: 'cs', type: 'single',
      stem: '输出重定向中 `>` 与 `>>` 的区别是？',
      options: ['没有区别', '> 覆盖原内容，>> 追加到末尾', '> 追加，>> 覆盖', '两者都只能读文件'],
      answer: 'B',
      analysis: { ans: 'B', why: '> 在打开文件时截断，>> 以追加模式打开，保留原有内容。', steps: '1. cmd > a.txt 会先清空 a.txt。\n2. cmd >> a.txt 从文件末尾写。\n3. 需要保留历史日志时用 >>。', pit: 'sort a.txt > a.txt 会先清空 a.txt，结果为空。' } },
    { id: 'os-shell-3', kpIds: ['os-shell'], subject: 'cs', type: 'fill',
      stem: '显示当前工作目录的 Linux 命令是______。',
      answer: 'pwd', accept: ['pwd'],
      analysis: { ans: 'pwd', why: 'pwd 是 print working directory 的缩写，输出当前所在目录的绝对路径。', steps: '1. 打开终端。\n2. 输入 pwd 回车。\n3. 终端显示类似 /home/user 的路径。', pit: 'cd 是切换目录，pwd 才是查看当前目录。' } },
    { id: 'os-shell-4', kpIds: ['os-shell'], subject: 'cs', type: 'fill',
      stem: '把命令的标准输出写入 out.txt 并覆盖原内容，使用的重定向符号是______。',
      answer: '>', accept: ['>', '> out.txt', '1>', '1> out.txt'],
      analysis: { ans: '>', why: '大于号把 stdout 重定向到文件，文件已存在时先截断再写入。', steps: '1. 命令默认把结果输出到终端。\n2. 加上 > out.txt 后输出改到文件。\n3. 原内容被清空。', pit: '想追加要写 >>，想连错误一起写入要写 2>&1。' } },

    /* ---------- os-container ---------- */
    { id: 'os-cont-1', kpIds: ['os-container'], subject: 'cs', type: 'single',
      stem: '容器与虚拟机最核心的区别是？',
      options: ['容器共享宿主内核，虚拟机每台都有独立内核', '容器一定比虚拟机安全', '虚拟机不能联网', '容器只能运行在 Windows 上'],
      answer: 'A',
      analysis: { ans: 'A', why: '虚拟机由 Hypervisor 虚拟出完整硬件并安装独立操作系统；容器直接复用宿主内核，只隔离进程视图。', steps: '1. 虚拟机包含完整 OS 与内核。\n2. 容器镜像只含应用和依赖。\n3. 容器共享宿主内核，因此更轻量。', pit: '共享内核意味着内核漏洞可能影响所有容器，隔离性弱于虚拟机。' } },
    { id: 'os-cont-2', kpIds: ['os-container'], subject: 'cs', type: 'single',
      stem: 'Docker 镜像与容器的关系是？',
      options: ['镜像是正在运行的容器', '容器是镜像的运行实例', '两者完全没有关系', '容器是镜像的压缩包'],
      answer: 'B',
      analysis: { ans: 'B', why: '镜像是只读模板，容器在镜像之上加一层可写层后运行起来。', steps: '1. 镜像由多层只读文件系统组成。\n2. docker run 创建容器并加可写层。\n3. 同一个镜像可以启动多个容器。', pit: '容器删除后可写层数据丢失，除非挂载数据卷。' } },
    { id: 'os-cont-3', kpIds: ['os-container'], subject: 'cs', type: 'fill',
      stem: '容器实现进程、网络、文件系统视图隔离，主要依赖 Linux 的______技术。',
      answer: 'namespace', accept: ['namespace', '命名空间', 'namespaces', 'Namespace'],
      analysis: { ans: 'namespace', why: 'namespace 让进程看到独立的 PID、网络、挂载点、主机名等视图，配合 cgroups 限制资源。', steps: '1. 创建新的 namespace。\n2. 容器进程在其中看到独立的进程号与网卡。\n3. cgroups 再限制 CPU 与内存用量。', pit: 'namespace 负责「看不见」，cgroups 负责「用不多」，两者分工不同。' } },
    { id: 'os-cont-4', kpIds: ['os-container'], subject: 'cs', type: 'fill',
      stem: '把一台物理机切分成多台虚拟机、负责虚拟化 CPU 与内存的软件层叫______。',
      answer: 'Hypervisor', accept: ['Hypervisor', '虚拟机监控器', 'VMM', 'hypervisor'],
      analysis: { ans: 'Hypervisor', why: 'Hypervisor 也称 VMM，负责创建并管理虚拟机，分配虚拟 CPU、内存与设备。', steps: '1. Hypervisor 运行在硬件或宿主 OS 上。\n2. 为每台 VM 虚拟出 CPU、内存、磁盘。\n3. VM 内安装自己的操作系统。', pit: 'Type 1 直接跑在硬件上，Type 2 跑在宿主操作系统上。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'os-proc-L2', kpIds: ['os-process'], subject: 'cs', level: 2,
      title: '进程与线程：资源容器与执行流',
      estMinutes: 40,
      hookTitle: '为什么同时开几十个程序，电脑还能响应？',
      hookBody: '因为操作系统把每个任务包装成进程，再把进程里的工作拆成线程，CPU 在它们之间快速切换。理解进程与线程，才知道卡顿、崩溃和内存占用到底发生在哪一层。',
      idea: '进程是程序的一次运行实例，拥有独立地址空间；线程是进程内的执行流，同一进程的线程共享地址空间。进程是**资源分配**的基本单位，线程是 **CPU 调度**的基本单位。',
      diagramId: 'os-layer', diagramCaption: '操作系统在硬件与应用之间调度进程、管理内存与文件',
      analogy: { title: '公司与员工', md: '进程像一家公司，有独立的办公室和账户；线程像公司里的员工，共享同一间办公室。员工之间沟通快，但一个人把办公室弄乱，其他人也会受影响。' },
      points: [
        { title: '一、程序不等于进程', md: '程序是磁盘上的静态文件，进程是程序被加载到内存后的一次运行。同一个程序可以启动多个进程，各自有独立的 PCB、地址空间和至少一个线程。' },
        { title: '二、进程的五种状态', md: '新建、就绪、运行、阻塞、终止。就绪只差 CPU，阻塞在等 IO 或事件。运行态时间片用完回就绪，等待事件时进阻塞，事件完成再从阻塞回就绪。' },
        { title: '三、线程共享什么、独占什么', md: '同一进程的线程共享代码段、数据段、堆和已打开的文件，但各自拥有独立的栈、寄存器和程序计数器。共享带来高效，也带来数据竞争。' },
        { title: '四、切换代价不同', md: '进程切换要更换页表并刷新 TLB，开销大；线程切换只需更换栈和寄存器，开销小。所以浏览器用多进程做隔离，服务器常用多线程扛并发。' },
        { title: '五、通信方式', md: '进程间通信有管道、消息队列、共享内存和 socket；线程之间直接读写共享变量，但必须用锁、信号量或原子操作保证互斥。' },
        { title: '六、死锁的四个必要条件', md: '互斥、占有并等待、不可剥夺、循环等待。破坏其中任意一个就能避免死锁，工程上常用「所有锁按固定顺序申请」来破坏循环等待。' },
        { title: '七、PCB 是进程的身份证', md: '进程控制块保存 PID、状态、寄存器现场、页表指针等信息，是操作系统感知和管理进程的唯一依据。PCB 被回收，进程也就不存在了。' }
      ],
      table: {
        headers: ['维度', '进程', '线程'],
        rows: [
          ['地址空间', '独立', '同进程内共享'],
          ['切换开销', '大，需要换页表', '小，只换栈和寄存器'],
          ['通信', '管道、共享内存、socket', '共享变量加同步'],
          ['崩溃影响', '互不干扰', '整个进程一起退出'],
          ['地位', '资源分配单位', 'CPU 调度单位']
        ]
      },
      code: '# 查看所有进程\nps -ef | grep python\n\n# 查看某进程下的线程\ntop -H -p 1234\n\n# 结束进程\nkill -9 1234',
      warning: '不要以为线程越多越快。线程切换、锁竞争和内存占用都会随线程数上升，线程数远超 CPU 核心数时，吞吐量反而下降。',
      tip: '背状态转换抓住一句话：就绪缺 CPU，阻塞缺事件；只有就绪能上 CPU，只有运行能进阻塞。',
      quizIds: ['os-proc-1', 'os-proc-2', 'os-proc-3', 'os-proc-4'],
      example: {
        title: '判断四次状态转换',
        steps: [
          { md: '时间片用完：进程还在就绪队列里等 CPU，转换是运行 → 就绪。' },
          { md: '请求读磁盘：进程等 IO 事件，转换是运行 → 阻塞。' },
          { md: '磁盘读完：事件到齐但还没拿到 CPU，转换是阻塞 → 就绪。' },
          { md: '被调度器选中：转换是就绪 → 运行。' }
        ],
        takeaway: '判断状态转换只看两件事：缺 CPU 还是缺事件。'
      },
      example2: {
        title: '两个线程各加一万次为什么少了',
        steps: [
          { md: '两个线程对共享变量 count 各执行 10000 次 `count += 1`。' },
          { md: '`count += 1` 实际分成读取、加一、写回三步，不是原子操作。' },
          { md: '两线程交错时可能读到同一个旧值，各自写回相同结果，丢失一次更新。' },
          { md: '用互斥锁或原子操作包住三步，结果才是 20000。' }
        ],
        takeaway: '共享可变数据必须同步，否则结果依赖执行顺序。'
      },
      guided: [{ questionId: 'os-proc-2', hint: '时间片用完只失去 CPU，并没有等待任何事件。' }],
      solo: ['os-proc-1', 'os-proc-3'],
      challenge: ['os-proc-4'],
      summary: {
        essence: '进程是资源容器，线程是执行流；线程共享地址空间但切换更轻，共享数据必须同步。',
        formulas: ['进程 = 资源分配单位；线程 = CPU 调度单位', '运行 → 就绪（时间片用完）', '切换开销：进程 > 线程'],
        pitfalls: ['把程序当进程', '时间片用完误判为阻塞', '以为多线程一定更快', '忽略共享变量的原子性'],
        checklist: ['我能说出进程与线程的区别', '我会画五种状态及转换', '我理解 PCB 的作用', '我知道死锁的四个条件']
      },
      feynman: '请用公司与员工的比喻，讲清楚同一进程里的线程为什么通信快、又为什么容易互相影响。'
    }),

    Z.makeLesson({
      id: 'os-sched-L3', kpIds: ['os-schedule'], subject: 'cs', level: 3,
      title: 'CPU 调度：谁先上 CPU',
      estMinutes: 45,
      hookTitle: '三个任务同时到达，先做长的还是先做短的？',
      hookBody: '不同的调度顺序会直接改变平均等待时间。考试给你一张到达时间与运行时间表，本质是在考你会不会按算法画出甘特图并算清指标。',
      idea: 'CPU 调度是在就绪队列里选下一个进程。常用指标有 CPU 利用率、吞吐量、周转时间、等待时间和响应时间。批处理重吞吐，分时重响应，实时重截止时间。',
      diagramId: 'os-layer', diagramCaption: '调度器在就绪进程之间分配 CPU',
      analogy: { title: '银行取号与窗口', md: 'FCFS 像排队取号，先来先办；SJF 像让业务简单的人先办，队伍整体等待最短；RR 像每人最多办两分钟，办不完重新取号，保证大家都能轮上。' },
      points: [
        { title: '一、周转时间与等待时间', md: '周转时间等于完成时刻减到达时刻；等待时间等于周转时间减运行时间。平均周转时间越小，用户感觉等待越短。' },
        { title: '二、先来先服务 FCFS', md: '按到达顺序执行，非抢占，实现最简单。长作业排在前面会产生护航效应，让后面的短作业被迫长时间等待。' },
        { title: '三、短作业优先 SJF', md: '优先选运行时间最短的作业。非抢占条件下平均等待时间最优，但必须预知运行时间，且长作业可能一直排不上而饿死。' },
        { title: '四、时间片轮转 RR', md: '每个进程最多运行一个时间片，用完排到队尾。时间片过大退化为 FCFS，过小则切换开销占比过高，通常取几十毫秒。' },
        { title: '五、优先级调度', md: '按优先级选择进程，可分为抢占式和非抢占式。低优先级进程可能饿死，解决办法是老化：随着等待时间增加逐步提高其优先级。' },
        { title: '六、多级反馈队列', md: '设置多个优先级队列，新进程进最高级，用完时间片就降一级。短作业在高优先级快速完成，长作业逐步下移，兼顾响应与吞吐。' },
        { title: '七、抢占与非抢占', md: '抢占式允许内核随时夺回 CPU，响应好但同步复杂；非抢占式等进程主动让出，实现简单但可能被一个长任务卡住。' }
      ],
      table: {
        headers: ['算法', '是否抢占', '优点', '缺点'],
        rows: [
          ['FCFS', '非抢占', '简单公平', '护航效应，平均等待长'],
          ['SJF', '非抢占', '平均等待最优', '需预知运行时间，可能饿死'],
          ['RR', '抢占', '响应快', '时间片难选，切换有开销'],
          ['优先级', '两者皆可', '重要任务先做', '低优先级可能饿死'],
          ['多级反馈', '抢占', '兼顾短作业与长作业', '参数多，实现复杂']
        ]
      },
      code: 'jobs = [("P1", 0, 3), ("P2", 0, 6), ("P3", 0, 9)]\nt = 0\nfor name, arrive, burst in jobs:\n    t += burst\n    print(name, "完成", t, "周转", t - arrive)',
      warning: '算平均周转时间别只拿运行时间平均。必须先画甘特图确定每个进程的完成时刻，再减到达时刻，最后除以进程数。',
      tip: 'SJF 的最优性只针对非抢占且作业同时可用的情形；抢占式下对应的是最短剩余时间优先。',
      quizIds: ['os-sched-1', 'os-sched-2', 'os-sched-3', 'os-sched-4'],
      example: {
        title: 'FCFS 的平均周转时间',
        steps: [
          { md: 'P1 到达 0、运行 3；P2 到达 2、运行 6；P3 到达 4、运行 4，按到达顺序执行。' },
          { md: 'P1 运行 0 到 3，完成时刻 3，周转 3 − 0 = 3。' },
          { md: 'P2 运行 3 到 9，完成 9，周转 9 − 2 = 7。' },
          { md: 'P3 运行 9 到 13，完成 13，周转 13 − 4 = 9；平均 = (3+7+9)/3 ≈ 6.33。' }
        ],
        takeaway: '先画时间轴，再逐项算「完成减到达」。'
      },
      example2: {
        title: 'RR 时间片为 2 的完成时刻',
        steps: [
          { md: 'P1、P2、P3 都在 0 时刻到达，运行时间分别为 3、6、4，时间片 2。' },
          { md: '第一轮：P1 跑 0 到 2，P2 跑 2 到 4，P3 跑 4 到 6。' },
          { md: '第二轮：P1 跑 6 到 7 结束；P2 跑 7 到 9；P3 跑 9 到 11 结束。' },
          { md: '第三轮：P2 跑 11 到 13 结束；完成时刻 P1=7、P2=13、P3=11，平均周转 = 31/3 ≈ 10.33。' }
        ],
        takeaway: 'RR 的画法就是轮流分配长度不超过时间片的区间。'
      },
      guided: [{ questionId: 'os-sched-2', hint: '三个进程的完成时刻依次是 3、9、18。' }],
      solo: ['os-sched-1', 'os-sched-3'],
      challenge: ['os-sched-4'],
      summary: {
        essence: '调度就是选下一个进程；周转 = 完成 − 到达，等待 = 周转 − 运行；没有一种算法全面最优。',
        formulas: ['周转时间 = 完成时刻 − 到达时刻', '等待时间 = 周转时间 − 运行时间', '平均周转 = 各周转之和 ÷ 进程数'],
        pitfalls: ['把平均运行时间当平均周转', '忘记到达时刻不为 0', 'RR 时间片当成总运行时间', '认为 SJF 在任何情况都最优'],
        checklist: ['我能画 FCFS 与 RR 的甘特图', '我会算周转与等待时间', '我能说出 SJF 的优缺点', '我知道老化能缓解饿死']
      },
      feynman: '请用银行窗口的比喻，讲清楚 FCFS、SJF、RR 三种排队方式的差别。'
    }),

    Z.makeLesson({
      id: 'os-mem-L3', kpIds: ['os-memory'], subject: 'cs', level: 3,
      title: '内存管理与虚拟内存',
      estMinutes: 45,
      hookTitle: '只有 8 GB 内存，为什么能开几十个程序？',
      hookBody: '因为每个进程都以为自己独占一整块连续地址，实际由页表映射到物理内存；暂时不用的页面被换到磁盘，用到时再换回来。这就是虚拟内存。',
      idea: '虚拟内存给每个进程一套独立的逻辑地址空间，通过页表映射到物理页框。缺页时由操作系统调入，空间不足时按置换算法淘汰。程序局部性是它能工作的前提。',
      diagramId: 'os-layer', diagramCaption: '操作系统管理物理内存，并为每个进程维护独立地址空间',
      analogy: { title: '酒店房间与房卡', md: '物理内存像酒店的房间，页框是真实房号；进程拿到的逻辑地址像房卡上的编号。前台（页表）负责把房卡编号翻译成真实房号，客人不需要知道房间在几楼。' },
      points: [
        { title: '一、逻辑地址与物理地址', md: '程序里看到的是逻辑地址，CPU 发出后由 MMU 查页表翻译成物理地址。进程本身看不到其他进程的真实内存布局，这是隔离的基础。' },
        { title: '二、分页与页框', md: '内存切成固定大小的页和页框，常见 4 KB。逻辑地址被拆成页号和页内偏移，页表只负责把页号映射成框号，偏移原样保留。' },
        { title: '三、页表太大怎么办', md: '多级页表只为实际用到的地址区间建表，节省空间；TLB 缓存最近用过的页表项，命中时不必访问内存中的页表。' },
        { title: '四、缺页中断', md: '访问的页不在内存时页表有效位为 0，触发缺页中断。操作系统找空闲页框或淘汰一页，从磁盘读入后更新页表并重新执行指令。' },
        { title: '五、页面置换算法', md: 'OPT 理论最优但无法预知未来；FIFO 简单却可能出现 Belady 异常；LRU 按最近使用时间淘汰，接近最优但需要维护访问顺序。' },
        { title: '六、局部性原理', md: '时间局部性是刚用过的数据还会再用，空间局部性是相邻地址常被一起访问。没有局部性，程序会不停缺页，虚拟内存反而拖慢系统。' },
        { title: '七、抖动与工作集', md: '进程多、内存少时页面刚换入又被换出，CPU 大量时间在等磁盘，称为抖动。工作集用最近一段时间的访问页集合来控制并发度。' }
      ],
      table: {
        headers: ['概念', '作用', '常见考点'],
        rows: [
          ['页表', '记录页号到页框号的映射', '多级页表省空间'],
          ['MMU', '硬件完成地址翻译', '拆分页号与偏移'],
          ['TLB', '缓存页表项', '命中则跳过访存'],
          ['缺页中断', '把不在内存的页调入', '有效位为 0 触发'],
          ['置换算法', '内存满时选淘汰页', 'FIFO 有 Belady 异常']
        ]
      },
      code: '# 查看系统页面大小\ngetconf PAGESIZE\n\n# 查看内存与交换分区\nfree -h\n\n# 查看进程的内存映射\ncat /proc/1234/maps',
      warning: '虚拟内存不是简单把硬盘当内存用。访问不在内存的页会产生毫秒级磁盘 IO，比访问内存慢几个数量级，所以抖动时系统会明显卡死。',
      tip: '地址转换题先分解：页号 = 逻辑地址 ÷ 页大小，偏移 = 逻辑地址 % 页大小；物理地址 = 框号 × 页大小 + 偏移。',
      quizIds: ['os-mem-1', 'os-mem-2', 'os-mem-3', 'os-mem-4'],
      example: {
        title: '把逻辑地址翻译成物理地址',
        steps: [
          { md: '页大小 1024 字节，逻辑地址 5000，页号 = 5000 ÷ 1024 = 4，偏移 = 5000 % 1024 = 904。' },
          { md: '查页表得知第 4 页映射到第 8 号页框。' },
          { md: '物理地址 = 8 × 1024 + 904 = 9096。' },
          { md: '若第 4 页有效位为 0，则先触发缺页中断，调入后再算。' }
        ],
        takeaway: '页号查表、偏移照搬，两步就能算完。'
      },
      example2: {
        title: 'FIFO 的 Belady 异常',
        steps: [
          { md: '访问序列 1、2、3、4、1、2、5、1、2、3、4、5。' },
          { md: '3 个页框时按 FIFO 淘汰，缺页 9 次。' },
          { md: '4 个页框时同样按 FIFO，缺页反而变成 10 次。' },
          { md: '页框变多缺页却变多，这就是 Belady 异常，LRU 不会出现。' }
        ],
        takeaway: 'FIFO 的淘汰顺序与访问历史无关，所以可能越给内存越差。'
      },
      guided: [{ questionId: 'os-mem-2', hint: 'Belady 异常是「页框增加、缺页反增」，只发生在不看访问历史的算法上。' }],
      solo: ['os-mem-1', 'os-mem-3'],
      challenge: ['os-mem-4'],
      summary: {
        essence: '虚拟内存用页表把逻辑地址映射到物理页框；缺页时调入，内存满时置换，局部性是前提。',
        formulas: ['页号 = 逻辑地址 ÷ 页大小', '偏移 = 逻辑地址 % 页大小', '物理地址 = 框号 × 页大小 + 偏移'],
        pitfalls: ['把逻辑地址当物理地址', '忘记页内偏移不变', '认为 FIFO 总是更好', '把缺页当成程序错误'],
        checklist: ['我会拆分页号与偏移', '我能解释 MMU 和 TLB', '我知道缺页中断的处理流程', '我能说出 Belady 异常']
      },
      feynman: '请用酒店房卡的比喻，讲清楚虚拟地址、页表和物理地址之间的关系。'
    }),

    Z.makeLesson({
      id: 'os-file-L2', kpIds: ['os-file'], subject: 'cs', level: 2,
      title: '文件系统：给数据建一棵目录树',
      estMinutes: 40,
      hookTitle: '文件删了为什么还可能恢复？',
      hookBody: '因为删除通常只是把目录项和 inode 的链接计数清掉，数据块本身还躺在磁盘上。理解 inode 与目录的关系，路径、硬链接、数据恢复这些题就都不难。',
      idea: '文件系统把磁盘块组织成文件与目录。文件由 inode 描述权限、大小和数据块位置；目录是「文件名 → inode 号」的映射表；路径就是从根沿目录树走到目标。',
      diagramId: 'os-layer', diagramCaption: '文件系统是操作系统管理外存的子系统',
      analogy: { title: '图书馆的索引卡', md: 'inode 像一本书的馆藏记录，写着位置、页数、入库时间，但不写书名；目录像索引卡片，写着书名和对应的记录编号。书改名只需要换卡片，不用重印整本书。' },
      points: [
        { title: '一、文件与目录', md: '文件是命名的数据集合，目录本身也是文件，内容是文件名与 inode 号的对应关系。Linux 中设备、管道也被抽象成文件统一管理。' },
        { title: '二、inode 记录什么', md: 'inode 保存权限、属主、大小、时间戳和数据块指针，唯独不保存文件名。文件名放在目录项里，所以同一个 inode 可以有多个名字。' },
        { title: '三、绝对路径与相对路径', md: '以 / 开头的是绝对路径，从根目录出发；不以 / 开头的是相对路径，从当前工作目录出发。点表示当前目录，两个点表示上一级目录。' },
        { title: '四、硬链接与软链接', md: '硬链接指向同一 inode，链接计数加一，删除任一名字数据仍在；软链接是独立文件，内容是目标路径，目标删除后链接就失效。' },
        { title: '五、常见文件系统', md: 'ext4 是 Linux 常用格式，NTFS 支持权限与日志，FAT32 不支持超过 4 GB 的单文件。跨操作系统拷贝大文件时要注意格式限制。' },
        { title: '六、inode 也会用尽', md: 'inode 数量在格式化时确定，可能出现磁盘还有空间却提示 inode 用尽。存放海量小文件时要关注 inode 数量，而不是只看剩余容量。' },
        { title: '七、挂载与容量查看', md: 'Linux 用挂载点把分区接到目录树上，一棵目录树可以跨多个磁盘。df 查看分区用量，du 查看目录占用，两者统计口径不同。' }
      ],
      table: {
        headers: ['概念', '保存内容', '易错点'],
        rows: [
          ['文件名', '目录项中的名字', '不在 inode 里'],
          ['inode', '权限、大小、数据块指针', '不含文件名'],
          ['硬链接', '同一 inode 的另一个名字', '不能跨文件系统'],
          ['软链接', '目标路径字符串', '目标删除后失效'],
          ['目录', '文件名到 inode 号的映射', '本身也是文件']
        ]
      },
      code: 'ls -li\n# 第一列是 inode 号，第三列是硬链接计数\nln a.txt b.txt      # 硬链接\nln -s a.txt c.txt   # 软链接\nreadlink c.txt      # 查看软链接指向',
      warning: 'rm 默认只删除目录项并减少链接计数，数据块可能仍可恢复；但继续写入新数据后旧块会被覆盖，恢复难度大增。重要数据先备份。',
      tip: '看到「同一文件多个名字」想 inode；看到「跨分区链接」想软链接，因为硬链接不能跨文件系统。',
      quizIds: ['os-file-1', 'os-file-2', 'os-file-3', 'os-file-4'],
      example: {
        title: '删除原文件后两个链接的命运',
        steps: [
          { md: '先执行 `ln a.txt b.txt` 建硬链接，再执行 `ln -s a.txt c.txt` 建软链接。' },
          { md: '此时 a.txt 与 b.txt 指向同一 inode，c.txt 里存的是字符串 a.txt。' },
          { md: '执行 `rm a.txt`，链接计数从 2 减到 1，b.txt 仍能正常读取。' },
          { md: 'c.txt 指向的路径已不存在，打开会提示文件不存在。' }
        ],
        takeaway: '硬链接是多个名字共用一个 inode，软链接只是一个存路径的小文件。'
      },
      example2: {
        title: '化简一个相对路径',
        steps: [
          { md: '当前位于 /home/user，路径写成 `../user/notes.txt`。' },
          { md: '两个点表示上一级，先回到 /home。' },
          { md: '再进入 user，又回到 /home/user。' },
          { md: '最终等价于 /home/user/notes.txt。' }
        ],
        takeaway: '路径里的点与两个点先展开，再消去相邻的进退。'
      },
      guided: [{ questionId: 'os-file-4', hint: '硬链接共享 inode，删除名字只是减少链接计数。' }],
      solo: ['os-file-1', 'os-file-3'],
      challenge: ['os-file-2'],
      summary: {
        essence: 'inode 存元数据不存文件名；目录把名字映射到 inode；硬链接共享 inode，软链接存路径。',
        formulas: ['硬链接：ln 源 目标', '软链接：ln -s 源 目标', '查看 inode：ls -li'],
        pitfalls: ['以为 inode 里有文件名', '硬链接跨分区', '把软链接当硬链接', '只看容量不看 inode 数'],
        checklist: ['我能说出 inode 的内容', '我分得清绝对与相对路径', '我会解释硬链接计数', '我知道软链接何时失效']
      },
      feynman: '请用图书馆索引卡的比喻，解释为什么给文件改名不需要移动数据块。'
    }),

    Z.makeLesson({
      id: 'os-io-L3', kpIds: ['os-io'], subject: 'cs', level: 3,
      title: 'IO 与设备管理：CPU 不想等慢设备',
      estMinutes: 45,
      hookTitle: '复制大文件时，为什么电脑还能干别的？',
      hookBody: '因为 CPU 不会傻等磁盘。它发出 IO 请求后去做别的事，设备完成后用中断通知它；大批量数据还可以交给 DMA 直接搬进内存。',
      idea: 'IO 管理负责在 CPU 与速度差异巨大的设备之间协调。主要手段有中断、DMA、缓冲、缓存、SPOOLing 和设备驱动抽象。',
      diagramId: 'os-layer', diagramCaption: '操作系统通过驱动、中断与缓冲管理各类设备',
      analogy: { title: '快递与驿站', md: 'CPU 像你自己，设备像远处的仓库。程序查询是你一直打电话问发货没；中断是仓库发短信通知你；DMA 是直接叫快递整车送到门口，只在签收时叫你一次。' },
      points: [
        { title: '一、程序查询方式', md: 'CPU 循环检查设备状态位，期间不能做别的事，CPU 利用率最低。只适合极简单、速度很快的小设备，考试中常作为最差方案出现。' },
        { title: '二、中断驱动方式', md: 'CPU 发出命令后继续执行其他进程，设备完成时发中断，CPU 保存现场后处理。比轮询好，但每个字节都中断一次，数据量大时开销仍高。' },
        { title: '三、DMA 方式', md: 'DMA 控制器直接在设备与内存之间成块搬运，结束时才中断一次。CPU 只在开始设置参数和结束时处理，适合磁盘、网卡这类高速设备。' },
        { title: '四、缓冲与缓存', md: '缓冲用来缓和 CPU 与设备的速度差，减少互相等待；缓存保存最近使用的数据，提高命中率。两者都是用内存空间换时间。' },
        { title: '五、SPOOLing 假脱机', md: '用磁盘上的输入井、输出井把独占设备虚拟成共享设备，典型是打印队列。作业先落到磁盘队列，打印机逐个取走，用户感觉各自拥有设备。' },
        { title: '六、设备驱动与统一接口', md: '操作系统用打开、读、写、关闭等统一接口屏蔽硬件差异，驱动负责把通用请求翻译成具体设备指令，上层程序不必关心型号。' },
        { title: '七、磁盘 IO 调度', md: '机械磁盘访问时间由寻道、旋转延迟和传输三部分组成，电梯算法按方向扫描减少寻道；SSD 没有机械寻道，调度策略要避免无谓写入。' }
      ],
      table: {
        headers: ['方式', 'CPU 参与程度', '适用场景'],
        rows: [
          ['程序查询', '最高，一直忙等', '极简单的小设备'],
          ['中断驱动', '较高，每次中断都要处理', '低速字符设备'],
          ['DMA', '低，只在开始和结束参与', '磁盘、网卡等块设备'],
          ['通道', '更低，由通道程序独立控制', '大型机多设备']
        ]
      },
      code: 'dd if=/dev/zero of=test.bin bs=1M count=100\nsync\ncat /proc/interrupts | head',
      warning: '缓冲不是越多越好。缓冲区占用内存，过大还会让数据延迟落盘，突然断电时丢失的数据更多，要根据可靠性要求权衡。',
      tip: '按 CPU 参与从多到少排序：程序查询 > 中断 > DMA > 通道；考试常问哪种方式最解放 CPU。',
      quizIds: ['os-io-1', 'os-io-2', 'os-io-3', 'os-io-4'],
      example: {
        title: '一次 100 MB 读盘要中断多少次',
        steps: [
          { md: '文件 100 MB，块大小 4 KB，共 100 × 1024 ÷ 4 = 25600 个块。' },
          { md: '若每读一块就中断一次，中断次数约为 25600 次。' },
          { md: '改用 DMA，整批传送只在结束时中断一次，次数约为 1 次。' },
          { md: '所以大数据量传输必须用 DMA，否则 CPU 时间全耗在中断处理上。' }
        ],
        takeaway: '中断次数与块数成正比时，数据量一大就会压垮 CPU。'
      },
      example2: {
        title: '算一次磁盘访问的平均旋转延迟',
        steps: [
          { md: '磁盘转速 7200 转每分钟，一圈耗时 60 ÷ 7200 ≈ 8.33 毫秒。' },
          { md: '平均旋转延迟取半圈，约 8.33 ÷ 2 ≈ 4.17 毫秒。' },
          { md: '若平均寻道 9 毫秒、传输 1 毫秒，总访问时间约为 9 + 4.17 + 1 ≈ 14.17 毫秒。' },
          { md: '可见机械磁盘的瓶颈主要在寻道和旋转，不在传输本身。' }
        ],
        takeaway: '磁盘访问时间 = 寻道 + 旋转延迟 + 传输时间。'
      },
      guided: [{ questionId: 'os-io-1', hint: '题目关键词是「控制器直接在设备与内存之间搬运」。' }],
      solo: ['os-io-2', 'os-io-3'],
      challenge: ['os-io-4'],
      summary: {
        essence: 'IO 管理的核心是让 CPU 少等待；中断通知、DMA 搬运、缓冲削峰、SPOOLing 复用独占设备。',
        formulas: ['磁盘访问时间 = 寻道 + 旋转延迟 + 传输', '平均旋转延迟 = 一圈时间 ÷ 2', '一圈时间 = 60 ÷ 转速（秒）'],
        pitfalls: ['把中断当DMA', '认为缓冲能提高设备速率', '忽略旋转延迟', 'SPOOLing 当成真并行'],
        checklist: ['我能排序四种 IO 方式', '我知道 DMA 何时中断', '我能算平均旋转延迟', '我理解 SPOOLing 的队列']
      },
      feynman: '请用仓库发货的比喻，讲清楚程序查询、中断和 DMA 三种方式的区别。'
    }),

    Z.makeLesson({
      id: 'os-shell-L2', kpIds: ['os-shell'], subject: 'cs', level: 2,
      title: '命令行与 Shell：用管道把命令接起来',
      estMinutes: 40,
      hookTitle: '一条命令只有几十个字符，为什么能完成复杂任务？',
      hookBody: '因为 Shell 能把许多小命令用管道、重定向、通配符组合起来。每个命令只做一件事，组合起来就能完成过滤、统计和批量处理。',
      idea: 'Shell 是命令解释器，负责读入命令行、展开变量与通配符、创建子进程执行命令。标准输入、标准输出、标准错误是三个默认打开的流，管道和重定向都在操作它们。',
      diagramId: 'os-layer', diagramCaption: 'Shell 是用户与操作系统内核之间的命令接口',
      analogy: { title: '流水线工人', md: '每个命令像流水线上的一名工人，只负责一道工序。管道是把上一位的成品直接递给下一位，不用先堆到仓库；重定向是把成品改送到指定的箱子。' },
      points: [
        { title: '一、命令的结构', md: '命令由命令名、选项和参数组成，例如 `ls -l /home`。短选项以单个减号开头并可合并，长选项以两个减号开头，参数通常是文件或目录。' },
        { title: '二、三个标准流', md: '标准输入是 0，标准输出是 1，标准错误是 2，默认都连接终端。重定向的本质就是把这几个流改接到文件或另一个命令。' },
        { title: '三、重定向符号', md: '大于号覆盖写，两个大于号追加，小于号从文件读入，2> 重定向错误输出，2>&1 把错误并到标准输出。符号顺序会影响力结果。' },
        { title: '四、管道', md: '`cmd1 | cmd2` 把 cmd1 的标准输出接到 cmd2 的标准输入。管道两侧是并发运行的进程，数据边产生边消费，不会先完整写入磁盘。' },
        { title: '五、常用命令', md: 'ls 列目录，cd 切目录，pwd 显示路径，cp 复制，mv 移动或改名，rm 删除，grep 过滤，wc 统计，find 按条件查找文件。' },
        { title: '六、通配符与变量', md: '星号匹配任意多个字符，问号匹配一个字符。变量用美元符号取值，赋值时等号两边不能有空格，否则 Shell 会把它当成命令名。' },
        { title: '七、权限与执行', md: 'chmod +x 给脚本加执行权限，`./run.sh` 表示在当前目录执行。PATH 环境变量决定直接输入命令名时去哪些目录查找可执行文件。' }
      ],
      table: {
        headers: ['符号', '作用', '例子'],
        rows: [
          ['>', '标准输出覆盖写入文件', 'ls > out.txt'],
          ['>>', '标准输出追加到文件', 'ls >> out.txt'],
          ['2>', '标准错误写入文件', 'cmd 2> err.txt'],
          ['|', '把输出接到下一个命令输入', 'ls | grep txt'],
          ['<', '从文件读入标准输入', 'wc -l < a.txt']
        ]
      },
      code: 'cd /var/log\nls -lh *.log\ncat app.log | grep "ERROR" | wc -l\ngrep "ERROR" app.log > errors.txt 2>&1',
      warning: '大于号会在命令执行前就清空目标文件。写 `sort a.txt > a.txt` 会先把 a.txt 清空，排序结果为空，正确做法是先写临时文件再替换。',
      tip: '管道只传标准输出，不传标准错误；要让错误信息也进入管道，先写 `2>&1` 把它并到标准输出。',
      quizIds: ['os-shell-1', 'os-shell-2', 'os-shell-3', 'os-shell-4'],
      example: {
        title: '统计日志中 404 的次数',
        steps: [
          { md: '访问日志每行一条请求，状态码在行中。' },
          { md: '用 `grep " 404 " access.log` 筛出包含 404 的行。' },
          { md: '把结果通过管道交给 `wc -l` 数行数。' },
          { md: '完整命令：`grep " 404 " access.log | wc -l`。' }
        ],
        takeaway: '筛选加计数是管道最常用的组合，一行就能完成。'
      },
      example2: {
        title: '找出当前目录最大的三个文件',
        steps: [
          { md: '`du -ah .` 列出当前目录下所有文件与目录的占用。' },
          { md: '通过管道交给 `sort -rh`，按人类可读的大小从大到小排序。' },
          { md: '再交给 `head -n 3` 只取前三行。' },
          { md: '完整命令：`du -ah . | sort -rh | head -n 3`。' }
        ],
        takeaway: '一个命令只做一件事，三件事用两个管道串起来。'
      },
      guided: [{ questionId: 'os-shell-2', hint: '两个大于号表示追加，一个大于号表示覆盖。' }],
      solo: ['os-shell-1', 'os-shell-3'],
      challenge: ['os-shell-4'],
      summary: {
        essence: 'Shell 解释命令；三个标准流可重定向；管道把小命令组合成流水线。',
        formulas: ['cmd > file 覆盖写', 'cmd >> file 追加', 'cmd1 | cmd2 管道', 'cmd 2>&1 合并错误'],
        pitfalls: ['把 > 当追加', '认为管道能传错误输出', '赋值等号两边加空格', '用 > 覆盖正在读取的文件'],
        checklist: ['我能解释三个标准流', '我会用覆盖与追加重定向', '我能用管道做筛选统计', '我知道 PATH 与执行权限']
      },
      feynman: '请用流水线的比喻，解释管道为什么不是「先存文件再读文件」。'
    }),

    Z.makeLesson({
      id: 'os-cont-L3', kpIds: ['os-container'], subject: 'cs', level: 3,
      title: '虚拟机、容器与云',
      estMinutes: 45,
      hookTitle: '一台服务器怎么跑几百个互不干扰的应用？',
      hookBody: '早期靠虚拟机，每个虚拟机带一套完整操作系统；后来靠容器，共享宿主内核，只隔离进程、网络和文件系统。轻量带来了密度，也带来了新的安全边界问题。',
      idea: '虚拟机通过 Hypervisor 虚拟出硬件，每台 VM 有独立内核；容器通过 namespace 隔离视图、cgroups 限制资源，共享宿主内核。云把计算、存储、网络做成可弹性申请的服务。',
      diagramId: 'os-layer', diagramCaption: '虚拟机与容器都位于应用与硬件之间，但隔离层次不同',
      analogy: { title: '独栋别墅与合租公寓', md: '虚拟机像独栋别墅，每户有独立水电总表，互不影响但占地大；容器像合租公寓，大家共享同一套水电系统，只隔出各自房间，便宜高效但一户漏水可能影响全屋。' },
      points: [
        { title: '一、Hypervisor 是什么', md: 'Hypervisor 也称 VMM，负责创建和管理虚拟机、虚拟化 CPU 与内存。Type 1 直接跑在硬件上，性能好；Type 2 跑在宿主操作系统上，安装方便。' },
        { title: '二、虚拟机的特点', md: '每台 VM 有完整操作系统和独立内核，隔离性强，可以运行不同系统。代价是启动慢、镜像大、内存占用高，密度低于容器。' },
        { title: '三、容器的特点', md: '容器共享宿主内核，镜像只打包应用与依赖，启动秒级、体积小。适合微服务、快速扩缩容和持续交付，但不能运行与宿主内核不同的系统。' },
        { title: '四、namespace 与 cgroups', md: 'namespace 隔离 PID、网络、挂载点、主机名等视图，让容器以为自己是独立机器；cgroups 限制 CPU、内存、IO 配额，防止一个容器拖垮整机。' },
        { title: '五、镜像分层', md: '镜像由多层只读文件系统叠加而成，容器启动时在最上面加一个可写层。分层让多个镜像共享基础层，节省磁盘与网络传输。' },
        { title: '六、容器编排', md: '单机用 Docker Compose 组织多个容器，集群用 Kubernetes。编排负责调度、健康检查、滚动更新和服务发现，是容器大规模落地的前提。' },
        { title: '七、云服务三层', md: 'IaaS 提供虚拟机、存储与网络；PaaS 提供运行环境与中间件；SaaS 直接提供软件。按需付费和弹性伸缩是云计算最核心的价值。' }
      ],
      table: {
        headers: ['维度', '虚拟机', '容器'],
        rows: [
          ['内核', '每台独立内核', '共享宿主内核'],
          ['启动速度', '分钟级', '秒级'],
          ['镜像体积', 'GB 级', 'MB 级'],
          ['隔离强度', '强，硬件级隔离', '较弱，依赖内核特性'],
          ['密度', '低', '高']
        ]
      },
      code: 'docker build -t demo:1.0 .\ndocker run -d -p 8080:80 --memory=256m demo:1.0\ndocker ps\ndocker logs demo',
      warning: '容器共享宿主内核，内核漏洞可能突破隔离。不要把容器当成强安全边界，多租户场景要配合用户命名空间、seccomp，或改用虚拟机。',
      tip: '一句话区分：虚拟机虚拟硬件，容器虚拟操作系统视图；VM 隔离强，容器启动快。',
      quizIds: ['os-cont-1', 'os-cont-2', 'os-cont-3', 'os-cont-4'],
      example: {
        title: '估算一台宿主能放多少实例',
        steps: [
          { md: '宿主 16 核、64 GB 内存。' },
          { md: '虚拟机每台 2 核、8 GB：按 CPU 可放 8 台，按内存可放 8 台，取较小值 8 台。' },
          { md: '容器每实例 0.5 核、512 MB：按 CPU 可放 32 个，按内存可放 128 个，取较小值 32 个。' },
          { md: '再扣除系统预留与突发负载，实际部署要留出余量。' }
        ],
        takeaway: '容量估算永远取 CPU 与内存两个约束中更紧的那个。'
      },
      example2: {
        title: '容器启动后立刻退出怎么排查',
        steps: [
          { md: '执行 `docker run demo:1.0` 后容器马上变成 Exited。' },
          { md: '原因通常是容器里的主进程执行完就结束了，容器随主进程退出。' },
          { md: '用 `docker logs demo` 查看进程输出，确认是否报错或正常结束。' },
          { md: '需要交互调试就用 `docker run -it demo:1.0 sh`，需要常驻就运行前台服务进程。' }
        ],
        takeaway: '容器的生命周期绑定主进程，主进程结束容器就结束。'
      },
      guided: [{ questionId: 'os-cont-1', hint: '抓住「是否拥有独立内核」这一个关键差异。' }],
      solo: ['os-cont-2', 'os-cont-3'],
      challenge: ['os-cont-4'],
      summary: {
        essence: '虚拟机虚拟硬件、每台独立内核；容器共享内核，用 namespace 隔离视图、cgroups 限制资源。',
        formulas: ['容器隔离 = namespace + cgroups', '镜像 = 只读层叠加；容器 = 镜像 + 可写层', '云三层 = IaaS / PaaS / SaaS'],
        pitfalls: ['把容器当强安全边界', '认为容器能跑不同内核', '镜像与容器混为一谈', '容量估算只看内存'],
        checklist: ['我能区分 VM 与容器', '我知道 namespace 与 cgroups 分工', '我理解镜像分层', '我能说出 IaaS/PaaS/SaaS']
      },
      feynman: '请用独栋别墅与合租公寓的比喻，讲清楚虚拟机与容器在隔离和开销上的差别。'
    })
  );
})(window.ZSB = window.ZSB || {});
