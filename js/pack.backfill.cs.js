/* 存量CS考点回填：15考点 × 4题 + 15份完整讲义 */
(function (Z) {
  /* 补充注册：使「网络与数据库」章节达到 3 个考点 */
  Z.addKps([
    { id: 'cs-network-app', subject: 'cs', chapter: '网络与数据库', title: '网络应用与协议', level: 2, examWeight: 0.03, prerequisites: ['cs-network'], examCount: 3, examPoints: 10, outcome: '能说出 HTTP/HTTPS/FTP/SMTP/DNS 的作用与端口，理解 C/S 与 B/S 架构', note: '协议是网络世界的「语言规则」' }
  ]);

  /* 题目部分 */
  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- cs-number ---------- */
    { id: 'cbf-num-1', kpIds: ['cs-number'], subject: 'cs', type: 'single',
      stem: '二进制数 1011 对应的十进制数是？',
      options: ['9', '10', '11', '13'],
      answer: 'C',
      analysis: { ans: '11', why: '二进制转十进制用位权展开：1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8+0+2+1 = 11。', steps: '1. 从右往左依次是 2⁰、2¹、2²、2³。\n2. 对应位值：1×8 + 0×4 + 1×2 + 1×1。\n3. 相加得 11。', pit: '别把位权从 1 开始数，最右边是 2⁰=1。' } },
    { id: 'cbf-num-2', kpIds: ['cs-number'], subject: 'cs', type: 'single',
      stem: '十进制数 25 转换成二进制是？',
      options: ['11001', '10101', '11100', '10011'],
      answer: 'A',
      analysis: { ans: '11001', why: '短除法：25÷2 余1，12÷2 余0，6÷2 余0，3÷2 余1，1÷2 余1，从下往上读余数得 11001。', steps: '1. 25÷2=12 余 1。\n2. 12÷2=6 余 0。\n3. 6÷2=3 余 0。\n4. 3÷2=1 余 1。\n5. 1÷2=0 余 1。\n6. 余数倒序：11001。', pit: '余数要从下往上读，不是从上往下。' } },
    { id: 'cbf-num-3', kpIds: ['cs-number'], subject: 'cs', type: 'fill',
      stem: '十六进制数 2F 对应的十进制数是 ______。',
      answer: '47', accept: ['47'],
      analysis: { ans: '47', why: 'F 在十六进制中表示 15，2F = 2×16 + 15 = 47。', steps: '1. 十六进制位权：16¹ 和 16⁰。\n2. 2×16 = 32。\n3. F=15，32+15=47。', pit: 'A=10, B=11, C=12, D=13, E=14, F=15，别记混。' } },
    { id: 'cbf-num-4', kpIds: ['cs-number'], subject: 'cs', type: 'fill',
      stem: '1 字节（Byte）等于 ______ 位（bit）。',
      answer: '8', accept: ['8', '八'],
      analysis: { ans: '8', why: '计算机中 1 Byte = 8 bit，这是固定换算。', steps: '1. bit 是最小单位，表示 0 或 1。\n2. 8 个 bit 组成 1 个 Byte。\n3. 1 KB = 1024 Byte。', pit: '注意区分 bit 和 Byte，网速常用 bit/s，文件大小常用 Byte。' } },

    /* ---------- cs-encoding ---------- */
    { id: 'cbf-enc-1', kpIds: ['cs-encoding'], subject: 'cs', type: 'single',
      stem: 'ASCII 码用多少位表示一个字符？',
      options: ['4 位', '7 位', '8 位', '16 位'],
      answer: 'B',
      analysis: { ans: '7 位（通常说 8 位存储）', why: '标准 ASCII 用 7 位表示 128 个字符，但实际存储占 1 字节（8 位），最高位补 0。', steps: '1. ASCII 共 128 个字符。\n2. 2⁷=128，所以 7 位足够。\n3. 存储时占 8 位（1 字节）。', pit: '说「8 位」不算错，因为存储确实占 1 字节；但严格说编码只用了 7 位。' } },
    { id: 'cbf-enc-2', kpIds: ['cs-encoding'], subject: 'cs', type: 'single',
      stem: '下列编码中，能表示汉字的是？',
      options: ['ASCII', 'GB2312', 'Base64', 'MD5'],
      answer: 'B',
      analysis: { ans: 'GB2312', why: 'ASCII 只能表示英文和符号；GB2312 是汉字编码标准；Base64 是编码传输格式；MD5 是哈希算法，不是字符编码。', steps: '1. ASCII：128 个字符，无汉字。\n2. GB2312：收录 6763 个汉字。\n3. Base64：把二进制转成文本传输。\n4. MD5：生成摘要，不可逆。', pit: 'MD5 和 Base64 不是字符编码，是数据处理算法。' } },
    { id: 'cbf-enc-3', kpIds: ['cs-encoding'], subject: 'cs', type: 'fill',
      stem: 'UTF-8 编码中，一个汉字通常占 ______ 个字节。',
      answer: '3', accept: ['3', '三'],
      analysis: { ans: '3', why: 'UTF-8 中常用汉字占 3 字节，生僻字可能占 4 字节。', steps: '1. UTF-8 是变长编码。\n2. 英文字母占 1 字节。\n3. 常用汉字占 3 字节。', pit: 'GBK 中汉字占 2 字节，UTF-8 中占 3 字节，别混。' } },
    { id: 'cbf-enc-4', kpIds: ['cs-encoding'], subject: 'cs', type: 'fill',
      stem: '1 KB（千字节）等于 ______ 字节。',
      answer: '1024', accept: ['1024'],
      analysis: { ans: '1024', why: '计算机中 1 KB = 1024 B，1 MB = 1024 KB，1 GB = 1024 MB。', steps: '1. 二进制体系：2¹⁰=1024。\n2. 所以 1 KB = 1024 Byte，不是 1000。', pit: '硬盘厂商常用 1000 进制，操作系统显示 1024 进制，这是「缺斤短两」的原因。' } },

    /* ---------- cs-hardware ---------- */
    { id: 'cbf-hw-1', kpIds: ['cs-hardware'], subject: 'cs', type: 'single',
      stem: '冯·诺依曼体系结构的核心思想是？',
      options: ['二进制运算', '存储程序控制', '分布式处理', '并行计算'],
      answer: 'B',
      analysis: { ans: '存储程序控制', why: '冯·诺依曼提出「存储程序」：程序和数据一样存在存储器中，计算机按程序顺序自动执行。', steps: '1. 程序预先存入存储器。\n2. CPU 按地址逐条取出指令。\n3. 分析指令、执行指令。\n4. 自动进行，无需人工干预。', pit: '二进制是基础，但核心思想是「存储程序控制」。' } },
    { id: 'cbf-hw-2', kpIds: ['cs-hardware'], subject: 'cs', type: 'single',
      stem: 'CPU 中负责算术和逻辑运算的部件是？',
      options: ['控制器', '运算器', '寄存器', '缓存'],
      answer: 'B',
      analysis: { ans: '运算器', why: '运算器（ALU）专门做加减乘除和逻辑判断；控制器负责指挥协调。', steps: '1. 运算器：执行算术运算和逻辑判断。\n2. 控制器：从内存取指令、译码、发控制信号。\n3. 两者合称中央处理器 CPU。', pit: '控制器像交通警察，运算器像干活的工人。' } },
    { id: 'cbf-hw-3', kpIds: ['cs-hardware'], subject: 'cs', type: 'fill',
      stem: '计算机五大部件：运算器、控制器、存储器、输入设备和 ______。',
      answer: '输出设备', accept: ['输出设备', '输出'],
      analysis: { ans: '输出设备', why: '冯·诺依曼五大部件：运算器、控制器、存储器、输入设备、输出设备。', steps: '1. 运算器 + 控制器 = CPU。\n2. 存储器分内存和外存。\n3. 输入：键盘鼠标；输出：显示器打印机。', pit: '别漏了「设备」两个字，标准表述是「输出设备」。' } },
    { id: 'cbf-hw-4', kpIds: ['cs-hardware'], subject: 'cs', type: 'fill',
      stem: '内存（RAM）断电后数据会 ______（填「保留」或「丢失」）。',
      answer: '丢失', accept: ['丢失', '消失'],
      analysis: { ans: '丢失', why: 'RAM 是易失性存储器，断电后数据立即消失；ROM 和硬盘是非易失性的。', steps: '1. RAM：内存条，速度快，断电丢数据。\n2. ROM：只读存储器，断电不丢。\n3. 硬盘/SSD：外存，断电保留。', pit: '「内存」和「外存」不是按位置分的，是按是否易失和速度分的。' } },

    /* ---------- cs-os ---------- */
    { id: 'cbf-osb-1', kpIds: ['cs-os'], subject: 'cs', type: 'single',
      stem: '进程和线程最主要的区别是？',
      options: ['进程不能并发，线程可以并发', '进程是资源分配单位，线程是 CPU 调度单位', '进程在内存，线程在硬盘', '进程比线程运行快'],
      answer: 'B',
      analysis: { ans: '进程是资源分配单位，线程是 CPU 调度单位', why: '一个进程可以有多个线程。进程拥有独立的内存空间，线程共享所属进程的内存。', steps: '1. 打开一个程序，就启动了一个进程。\n2. 进程里可以创建多个线程同时干活。\n3. 线程之间共享进程的内存，通信快但容易互相干扰。', pit: '线程切换比进程切换快，因为不用换内存空间。' } },
    { id: 'cbf-osb-2', kpIds: ['cs-os'], subject: 'cs', type: 'single',
      stem: '下列哪个不是操作系统的功能？',
      options: ['进程管理', '内存管理', '编译源代码', '文件管理'],
      answer: 'C',
      analysis: { ans: '编译源代码', why: '编译源代码是编译器的工作，不是操作系统的功能。', steps: '1. 操作系统管理：进程、内存、文件、设备、用户接口。\n2. 编译是 gcc、javac 等编译器做的。', pit: 'IDE 提供编译功能，但底层调用的是编译器，不是操作系统。' } },
    { id: 'cbf-osb-3', kpIds: ['cs-os'], subject: 'cs', type: 'fill',
      stem: '操作系统中，正在运行的程序实例称为 ______。',
      answer: '进程', accept: ['进程', 'process'],
      analysis: { ans: '进程', why: '程序是静态的代码，进程是程序的一次执行过程，是动态的。', steps: '1. 双击 QQ.exe，启动一个进程。\n2. 再双击一次，又启动一个进程。\n3. 同一个程序可以有多个进程。', pit: '程序和进程是两回事，程序是文件，进程是运行中的实例。' } },
    { id: 'cbf-osb-4', kpIds: ['cs-os'], subject: 'cs', type: 'fill',
      stem: 'Windows 中用于查看和管理进程的快捷键组合是 Ctrl + Shift + ______。',
      answer: 'Esc', accept: ['Esc', 'esc'],
      analysis: { ans: 'Esc', why: 'Ctrl+Shift+Esc 直接打开任务管理器，可以查看进程、性能、启动项。', steps: '1. Ctrl+Shift+Esc 直接打开任务管理器。\n2. Ctrl+Alt+Del 是安全选项界面。', pit: 'Ctrl+Alt+Del 是间接打开，Ctrl+Shift+Esc 是一步到位。' } },

    /* ---------- cs-network ---------- */
    { id: 'cbf-net-1', kpIds: ['cs-network'], subject: 'cs', type: 'single',
      stem: 'TCP 和 UDP 最主要的区别是？',
      options: ['TCP 快，UDP 慢', 'TCP 面向连接可靠，UDP 无连接不可靠但快', 'TCP 用于网页，UDP 用于邮件', 'TCP 是无连接的'],
      answer: 'B',
      analysis: { ans: 'TCP 面向连接可靠，UDP 无连接不可靠但快', why: 'TCP 像打电话，先建立连接再通话，保证对方听到；UDP 像发短信，发出去就不管，速度快但可能丢。', steps: '1. TCP：三次握手建立连接，有确认和重传。\n2. UDP：直接发，不保证到达。\n3. TCP 用于网页、文件；UDP 用于视频、直播、游戏。', pit: '不是 TCP 一定比 UDP 好，看场景：要准确用 TCP，要快用 UDP。' } },
    { id: 'cbf-net-2', kpIds: ['cs-network'], subject: 'cs', type: 'single',
      stem: '在浏览器输入网址后，首先进行的操作是？',
      options: ['发送 HTTP 请求', 'DNS 域名解析', '建立 TCP 连接', '渲染页面'],
      answer: 'B',
      analysis: { ans: 'DNS 域名解析', why: '浏览器先要把 www.xxx.com 翻译成 IP 地址，才能找到服务器。', steps: '1. DNS 查询：域名 → IP。\n2. TCP 连接（三次握手）。\n3. 发送 HTTP 请求。\n4. 接收响应、渲染页面。', pit: 'DNS 是第一步，没有 IP 地址什么都做不了。' } },
    { id: 'cbf-net-3', kpIds: ['cs-network'], subject: 'cs', type: 'fill',
      stem: 'IPv4 地址由 ______ 位二进制数组成。',
      answer: '32', accept: ['32'],
      analysis: { ans: '32', why: 'IPv4 地址是 32 位，通常写成 4 个十进制数，如 192.168.1.1。', steps: '1. 32 位分成 4 组，每组 8 位。\n2. 每组转成十进制，用点分隔。\n3. 每个数范围 0-255。', pit: 'IPv6 是 128 位，别混。' } },
    { id: 'cbf-net-4', kpIds: ['cs-network'], subject: 'cs', type: 'fill',
      stem: 'HTTP 默认端口号是 ______。',
      answer: '80', accept: ['80'],
      analysis: { ans: '80', why: 'HTTP 用 80，HTTPS 用 443，FTP 用 21，SSH 用 22。', steps: '1. 端口是区分服务的编号。\n2. 访问网站时不写端口，浏览器默认用 80。', pit: 'HTTPS 是 443，不是 80。' } },

    /* ---------- cs-database ---------- */
    { id: 'cbf-dbc-1', kpIds: ['cs-database'], subject: 'cs', type: 'single',
      stem: 'SQL 中用于查询数据的关键字是？',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      answer: 'C',
      analysis: { ans: 'SELECT', why: 'SELECT 查，INSERT 增，UPDATE 改，DELETE 删。', steps: '1. SELECT：查询。\n2. INSERT INTO：插入。\n3. UPDATE：更新。\n4. DELETE FROM：删除。', pit: '增删改查 CRUD，查是最常用的。' } },
    { id: 'cbf-dbc-2', kpIds: ['cs-database'], subject: 'cs', type: 'single',
      stem: '关于主键（Primary Key），下列说法正确的是？',
      options: ['一个表可以有多个主键', '主键值可以重复', '主键用于唯一标识表中的每一行', '主键必须是数字'],
      answer: 'C',
      analysis: { ans: '主键用于唯一标识表中的每一行', why: '主键 = 唯一 + 非空。一个表只能有一个主键，值不能重复也不能为 NULL。', steps: '1. 主键唯一标识一行记录。\n2. 一个表只能有一个主键（可以是多列组合）。\n3. 主键值不能重复、不能为 NULL。', pit: '学号、身份证号适合做主键；姓名不适合，因为有重名。' } },
    { id: 'cbf-dbc-3', kpIds: ['cs-database'], subject: 'cs', type: 'fill',
      stem: 'SQL 中用于关联两张表查询的关键字是 ______。',
      answer: 'JOIN', accept: ['JOIN', 'join', 'inner join'],
      analysis: { ans: 'JOIN', why: 'JOIN 把两张表按条件拼在一起查，常用 INNER JOIN、LEFT JOIN。', steps: '1. SELECT * FROM 学生 JOIN 成绩 ON 学生.学号=成绩.学号。\n2. ON 后面写关联条件。', pit: '不写 ON 会产生笛卡尔积，结果爆炸。' } },
    { id: 'cbf-dbc-4', kpIds: ['cs-database'], subject: 'cs', type: 'fill',
      stem: '数据库三大范式中，第一范式（1NF）要求字段是 ______ 的。',
      answer: '原子', accept: ['原子', '不可再分', '不可分'],
      analysis: { ans: '原子（不可再分）', why: '1NF 要求每个字段都是最小单位，不能再拆。比如「地址」如果还能拆成省、市、区，就不满足 1NF。', steps: '1. 1NF：字段原子性。\n2. 2NF：非主键字段完全依赖主键。\n3. 3NF：非主键字段不依赖其他非主键字段。', pit: '范式是设计规范，实际开发有时会反范式以提升性能。' } },

    /* ---------- cs-var-type ---------- */
    { id: 'cbf-vt-1', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '在大多数编程语言中，声明变量时指定类型的主要作用是？',
      options: ['让代码更好看', '告诉编译器分配多少内存、能做什么操作', '防止变量被删除', '提高运行速度'],
      answer: 'B',
      analysis: { ans: '告诉编译器分配多少内存、能做什么操作', why: '类型决定了变量占多少字节、能进行什么运算。int 占 4 字节，double 占 8 字节，字符串操作和数字操作完全不同。', steps: '1. int a：分配 4 字节，能加减乘除。\n2. string s：分配字符数组空间，能拼接切片。\n3. 类型不匹配时编译器会报错。', pit: 'Python 等动态语言不用声明类型，但对象本身仍有类型。' } },
    { id: 'cbf-vt-2', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '下列哪个是「弱类型」语言的特点？',
      options: ['变量必须先声明类型', '"1" + 2 自动变成 12', '类型错误在编译期发现', '变量类型不能改变'],
      answer: 'B',
      analysis: { ans: '"1" + 2 自动变成 12（隐式类型转换）', why: '弱类型语言会偷偷帮你转换类型，JavaScript 中 "1"+2 得 "12"，这既是方便也是坑。', steps: '1. 强类型：类型不匹配直接报错（Java、Python）。\n2. 弱类型：尝试自动转换（JavaScript、PHP）。', pit: 'Python 是强类型动态语言，不是弱类型。' } },
    { id: 'cbf-vt-3', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: 'JavaScript 中，把字符串 "123" 转成数字，可以用 Number() 或 ______ 函数。',
      answer: 'parseInt', accept: ['parseInt', 'parseFloat', 'parseInt()'],
      analysis: { ans: 'parseInt', why: 'parseInt 转整数，parseFloat 转小数，Number 是最通用的转换。', steps: '1. parseInt("123") → 123。\n2. parseFloat("3.14") → 3.14。\n3. Number("123") → 123。', pit: 'parseInt("12px") 能得 12，但 Number("12px") 得 NaN。' } },
    { id: 'cbf-vt-4', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: 'Java 中，int 类型占 ______ 个字节。',
      answer: '4', accept: ['4', '四'],
      analysis: { ans: '4', why: 'Java 基本类型：byte 1 字节，short 2 字节，int 4 字节，long 8 字节。', steps: '1. byte：-128 ~ 127。\n2. int：约 ±21 亿。', pit: 'C 语言中 int 可能是 2 或 4 字节，Java 固定 4 字节。' } },

    /* ---------- cs-operator ---------- */
    { id: 'cbf-op-1', kpIds: ['cs-operator'], subject: 'cs', type: 'single',
      stem: '表达式 `3 + 4 * 5` 的结果是？',
      options: ['35', '23', '27', '报错'],
      answer: 'B',
      analysis: { ans: '23', why: '先乘除后加减，4*5=20，3+20=23。', steps: '1. 乘法优先级高于加法。\n2. 先算 4×5=20。\n3. 再算 3+20=23。', pit: '数学规则在编程里一样适用，想先加就加括号。' } },
    { id: 'cbf-op-2', kpIds: ['cs-operator'], subject: 'cs', type: 'single',
      stem: '关于 `i++` 和 `++i`，下列说法正确的是？',
      options: ['两者完全相同', 'i++ 先用后加，++i 先加后用', 'i++ 是加 2，++i 是加 1', '++i 只能在循环里用'],
      answer: 'B',
      analysis: { ans: 'i++ 先用后加，++i 先加后用', why: 'int i=5; int a=i++; a 是 5，i 变成 6。int b=++i; b 是 7，i 变成 7。', steps: '1. i++：先把 i 的值给别人，再自己加 1。\n2. ++i：先自己加 1，再把新值给别人。', pit: '单独写 i++; 和 ++i; 效果一样，区别只在赋值时体现。' } },
    { id: 'cbf-op-3', kpIds: ['cs-operator'], subject: 'cs', type: 'fill',
      stem: '逻辑运算符 `&&` 的特性是：左边为假时，右边 ______（填「执行」或「不执行」）。',
      answer: '不执行', accept: ['不执行', '不再执行'],
      analysis: { ans: '不执行', why: '这叫「短路求值」：左边为假，整个表达式必为假，右边算了也白算，所以直接跳过。', steps: '1. false && anything → false。\n2. true || anything → true。', pit: '利用短路可以写 `if (obj && obj.name)` 防止空指针。' } },
    { id: 'cbf-op-4', kpIds: ['cs-operator'], subject: 'cs', type: 'fill',
      stem: '位运算符中，`&` 表示按位 ______。',
      answer: '与', accept: ['与', 'AND', 'and'],
      analysis: { ans: '与', why: '& 是按位与，| 是按位或，^ 是按位异或，~ 是按位取反。', steps: '1. 5 & 3 = 101 & 011 = 001 = 1。\n2. 对应位都为 1，结果才是 1。', pit: '& 和 && 完全不同，一个是位运算，一个是逻辑运算。' } },

    /* ---------- cs-loop ---------- */
    { id: 'cbf-lp-1', kpIds: ['cs-loop'], subject: 'cs', type: 'single',
      stem: '下面哪个循环会执行 5 次？',
      options: ['for (i=0; i<5; i++)', 'for (i=1; i<=5; i++)', 'for (i=0; i<=5; i++)', 'A 和 B 都对'],
      answer: 'D',
      analysis: { ans: 'A 和 B 都对', why: 'A 从 0 到 4 共 5 次；B 从 1 到 5 共 5 次；C 从 0 到 5 共 6 次。', steps: '1. A：0,1,2,3,4 → 5 次。\n2. B：1,2,3,4,5 → 5 次。\n3. C：0,1,2,3,4,5 → 6 次。', pit: '循环次数 = 结束条件 - 起始条件，注意 < 和 <= 的区别。' } },
    { id: 'cbf-lp-2', kpIds: ['cs-loop'], subject: 'cs', type: 'single',
      stem: '在循环中，`break` 和 `continue` 的区别是？',
      options: ['完全等价', 'break 跳出整个循环，continue 跳过本次进入下一次', 'continue 跳出整个循环，break 进入下一次', 'break 只能用于 switch'],
      answer: 'B',
      analysis: { ans: 'break 跳出整个循环，continue 进入下一次迭代', why: 'break 直接结束循环体；continue 跳过本次剩余代码，进入下一轮循环条件判断。', steps: '1. for 循环里遇到 break：整个循环结束。\n2. 遇到 continue：跳过本次剩余代码，i++ 后继续判断条件。', pit: '嵌套循环里，break 只跳出内层，不会跳出外层。' } },
    { id: 'cbf-lp-3', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '遍历数组 `arr` 的 for 循环，常用写法是 `for (let i=0; i<arr.______; i++)`。',
      answer: 'length', accept: ['length'],
      analysis: { ans: 'length', why: '数组长度用 .length，循环条件是 i < arr.length，因为下标从 0 开始，到 length-1 结束。', steps: '1. 下标范围：0 ~ length-1。\n2. i < length 保证不会越界。', pit: '写成 i <= arr.length 会越界，最后一个元素下标是 length-1。' } },
    { id: 'cbf-lp-4', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: 'do-while 循环至少执行 ______ 次。',
      answer: '1', accept: ['1', '一'],
      analysis: { ans: '1', why: 'do-while 先执行循环体，再判断条件，所以无论条件是否满足，至少执行一次。', steps: '1. do { ... } while (条件)。\n2. 先执行 do 里的代码。\n3. 再判断条件，决定是否继续。', pit: 'while 是「先判断后执行」，do-while 是「先执行后判断」。' } },

    /* ---------- cs-oop ---------- */
    { id: 'cbf-oop-1', kpIds: ['cs-oop'], subject: 'cs', type: 'single',
      stem: '面向对象的三大特征是？',
      options: ['封装、继承、多态', '抽象、封装、继承', '封装、继承、接口', '类、对象、方法'],
      answer: 'A',
      analysis: { ans: '封装、继承、多态', why: '封装：隐藏内部细节；继承：复用父类代码；多态：同一方法不同表现。', steps: '1. 封装：private 属性 + public 方法。\n2. 继承：子类获得父类的属性和方法。\n3. 多态：父类引用指向子类对象，调用方法时执行子类的实现。', pit: '抽象是重要特性，但三大特征标准是封装、继承、多态。' } },
    { id: 'cbf-oop-2', kpIds: ['cs-oop'], subject: 'cs', type: 'single',
      stem: '关于类和对象，下列说法正确的是？',
      options: ['类是对象，对象是类', '类是模板/蓝图，对象是按模板造出的实例', '一个类只能有一个对象', '对象不能有自己的属性'],
      answer: 'B',
      analysis: { ans: '类是模板，对象是实例', why: '类像建筑设计图，对象是按图纸盖出来的房子。一张图纸可以盖很多房子，每栋房子有自己的门牌号（属性值）。', steps: '1. class Person：定义了姓名、年龄等属性模板。\n2. new Person("张三")：造出一个具体的对象。\n3. 可以 new 出很多个 Person 对象，各自独立。', pit: '类不占内存（静态），对象才占内存。' } },
    { id: 'cbf-oop-3', kpIds: ['cs-oop'], subject: 'cs', type: 'fill',
      stem: 'Java 中，创建对象使用的关键字是 ______。',
      answer: 'new', accept: ['new'],
      analysis: { ans: 'new', why: 'Person p = new Person(); new 在堆上分配内存，调用构造方法，返回对象引用。', steps: '1. new Person() 调用构造方法。\n2. 返回一个 Person 类型的引用。\n3. 引用 p 指向堆中的对象。', pit: 'Python 不用 new，直接 Person() 即可。' } },
    { id: 'cbf-oop-4', kpIds: ['cs-oop'], subject: 'cs', type: 'fill',
      stem: '子类重写父类的方法，这体现了 ______ 性。',
      answer: '多态', accept: ['多态', '多态性'],
      analysis: { ans: '多态', why: '重写（Override）是多态的基础：父类引用调用方法时，实际执行的是子类重写后的版本。', steps: '1. 父类有方法 eat()。\n2. 子类重写 eat()，实现自己的逻辑。\n3. 父类引用指向子类对象，调用 eat() 执行子类的版本。', pit: '重载（Overload）是同一个类里方法名相同参数不同；重写是子类覆盖父类方法。' } },

    /* ---------- cs-string ---------- */
    { id: 'cbf-str-1', kpIds: ['cs-string'], subject: 'cs', type: 'single',
      stem: '字符串 "hello" 在大多数语言中的长度是？',
      options: ['4', '5', '6', '不确定'],
      answer: 'B',
      analysis: { ans: '5', why: 'h-e-l-l-o 共 5 个字符，长度是 5。', steps: '1. 数一数：h, e, l, l, o。\n2. 共 5 个字符。', pit: '下标范围是 0-4，不是 0-5；长度是 5。' } },
    { id: 'cbf-str-2', kpIds: ['cs-string'], subject: 'cs', type: 'single',
      stem: '字符串和字符数组的关系，下列说法正确的是？',
      options: ['完全无关', '字符串本质上是字符数组，但通常不可变', '字符串可以直接修改任意字符', '字符数组不能转成字符串'],
      answer: 'B',
      analysis: { ans: '字符串本质上是字符数组，但通常不可变', why: '字符串底层就是字符数组，但 Java、Python 等语言中字符串是不可变的，修改会生成新字符串。', steps: '1. "abc" 底层是 [\'a\',\'b\',\'c\']。\n2. 不能 s[0]=\'x\'，会报错。\n3. 想修改要转成数组或 StringBuilder。', pit: 'C 语言中字符串可修改，Java/Python 中不可变，要看语言。' } },
    { id: 'cbf-str-3', kpIds: ['cs-string'], subject: 'cs', type: 'fill',
      stem: '判断字符串 "abcba" 是否为回文的思路是：比较第 i 个字符和第 ______ 个字符是否相等。',
      answer: 'n-1-i', accept: ['n-1-i', 'length-1-i', 'len-1-i'],
      analysis: { ans: 'n-1-i', why: '回文是正读反读都一样。第 0 个和第 n-1 个比，第 1 个和第 n-2 个比，即 i 和 n-1-i 比。', steps: '1. 设 n = 字符串长度。\n2. i 从 0 遍历到 n/2。\n3. 比较 s[i] 和 s[n-1-i]。', pit: '循环到 n/2 就够了，不用全部比完。' } },
    { id: 'cbf-str-4', kpIds: ['cs-string'], subject: 'cs', type: 'fill',
      stem: 'Java 中拼接大量字符串，推荐使用 ______ 类而不是 + 号。',
      answer: 'StringBuilder', accept: ['StringBuilder', 'StringBuffer'],
      analysis: { ans: 'StringBuilder', why: 'String 不可变，每次 + 都创建新对象，效率低；StringBuilder 是可变的，append 不创建新对象。', steps: '1. String s = ""; s += "a"; 每次新建对象。\n2. StringBuilder sb = new StringBuilder(); sb.append("a"); 原地修改。', pit: 'StringBuilder 线程不安全，多线程用 StringBuffer。' } },

    /* ---------- cs-tree ---------- */
    { id: 'cbf-tree-1', kpIds: ['cs-tree'], subject: 'cs', type: 'single',
      stem: '二叉树的前序遍历顺序是？',
      options: ['左-根-右', '根-左-右', '左-右-根', '右-根-左'],
      answer: 'B',
      analysis: { ans: '根-左-右', why: '前序：先访问根节点，再左子树，再右子树。中序：左-根-右。后序：左-右-根。', steps: '1. 前序（Preorder）：根左右。\n2. 中序（Inorder）：左根右。\n3. 后序（Postorder）：左右根。', pit: '前中后指的是「根」的位置。' } },
    { id: 'cbf-tree-2', kpIds: ['cs-tree'], subject: 'cs', type: 'single',
      stem: '一个深度为 h 的二叉树，最多有多少个节点？',
      options: ['2^h', '2^h - 1', '2^(h-1)', 'h^2'],
      answer: 'B',
      analysis: { ans: '2^h - 1', why: '满二叉树时节点最多：第 1 层 1 个，第 2 层 2 个，第 3 层 4 个……第 h 层 2^(h-1) 个。求和 = 2^h - 1。', steps: '1. 等比数列求和：1+2+4+...+2^(h-1)。\n2. 和 = 2^h - 1。', pit: '深度从 1 开始算，根在第 1 层。' } },
    { id: 'cbf-tree-3', kpIds: ['cs-tree'], subject: 'cs', type: 'fill',
      stem: '二叉搜索树（BST）的中序遍历结果是 ______ 序列。',
      answer: '有序', accept: ['有序', '升序', '从小到大'],
      analysis: { ans: '有序（升序）', why: 'BST 性质：左子树所有节点 < 根 < 右子树。中序遍历左-根-右，正好从小到大。', steps: '1. 中序：左子树 → 根 → 右子树。\n2. 左子树 < 根 < 右子树。\n3. 所以遍历结果是升序。', pit: '这是 BST 的重要性质，常用来验证一棵树是不是 BST。' } },
    { id: 'cbf-tree-4', kpIds: ['cs-tree'], subject: 'cs', type: 'fill',
      stem: '完全二叉树用数组存储时，若父节点下标为 i（从 0 开始），左孩子下标是 ______。',
      answer: '2i+1', accept: ['2i+1', '2*i+1', '2i + 1'],
      analysis: { ans: '2i+1', why: '数组表示完全二叉树：父节点 i，左孩子 2i+1，右孩子 2i+2。', steps: '1. 根节点下标 0。\n2. 左孩子 = 2×0+1 = 1。\n3. 右孩子 = 2×0+2 = 2。', pit: '若下标从 1 开始，左孩子是 2i，右孩子是 2i+1。' } },

    /* ---------- cs-graph ---------- */
    { id: 'cbf-graph-1', kpIds: ['cs-graph'], subject: 'cs', type: 'single',
      stem: '图的广度优先遍历（BFS）使用的数据结构是？',
      options: ['栈', '队列', '哈希表', '堆'],
      answer: 'B',
      analysis: { ans: '队列', why: 'BFS 是一层一层往外扩，先进先出，用队列。DFS 是一条路走到黑，用栈或递归。', steps: '1. 起点入队。\n2. 出队，访问它，把它的邻居入队。\n3. 重复直到队空。', pit: 'BFS 用队列，DFS 用栈；别记反。' } },
    { id: 'cbf-graph-2', kpIds: ['cs-graph'], subject: 'cs', type: 'single',
      stem: '有向图和无向图的区别是？',
      options: ['有向图有箭头，无向图没有', '有向图节点多', '无向图不能连通', '没有区别'],
      answer: 'A',
      analysis: { ans: '有向图的边有方向', why: '有向图的边是单向的（A→B 不等于 B→A）；无向图的边是双向的（A-B 等于 B-A）。', steps: '1. 有向图：微博关注，A 关注 B 不代表 B 关注 A。\n2. 无向图：微信好友，互为好友。', pit: '邻接矩阵中，无向图是对称的，有向图不一定。' } },
    { id: 'cbf-graph-3', kpIds: ['cs-graph'], subject: 'cs', type: 'fill',
      stem: '图的深度优先遍历（DFS）通常用 ______ 实现。',
      answer: '递归', accept: ['递归', '栈', '栈或递归'],
      analysis: { ans: '递归（或栈）', why: 'DFS 是「不撞南墙不回头」，递归天然适合：访问当前节点，然后递归访问每个未访问的邻居。', steps: '1. 标记当前节点已访问。\n2. 对每个未访问的邻居，递归调用 DFS。\n3. 返回时回溯。', pit: '一定要标记已访问，否则会死循环。' } },
    { id: 'cbf-graph-4', kpIds: ['cs-graph'], subject: 'cs', type: 'fill',
      stem: '用邻接表存储一个有 V 个顶点、E 条边的无向图，空间复杂度是 O(______)。',
      answer: 'V+E', accept: ['V+E', 'V + E', 'v+e'],
      analysis: { ans: 'V+E', why: '邻接表：每个顶点存一个链表，链表长度等于该顶点的度数。总空间 = V 个表头 + 2E 条边（无向图每条边存两次）。', steps: '1. 表头数组：V。\n2. 边节点：2E（无向）。\n3. 总：O(V+E)。', pit: '邻接矩阵是 O(V²)，邻接表是 O(V+E)。' } },

    /* ---------- cs-complexity ---------- */
    { id: 'cbf-bigo-1', kpIds: ['cs-complexity'], subject: 'cs', type: 'single',
      stem: '下列时间复杂度中，效率最高的是？',
      options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
      answer: 'D',
      analysis: { ans: 'O(log n)', why: 'O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(2^n) > O(n!)。log n 是二分查找的级别，效率很高。', steps: '1. O(1)：常数，最快。\n2. O(log n)：二分查找。\n3. O(n)：一次遍历。\n4. O(n log n)：快排/归并。\n5. O(n²)：双重循环。', pit: 'n=100 时，log n≈7，n=100，n²=10000，差距巨大。' } },
    { id: 'cbf-bigo-2', kpIds: ['cs-complexity'], subject: 'cs', type: 'single',
      stem: '下列代码的时间复杂度是？\n```\nfor (i=0; i<n; i++)\n  for (j=0; j<n; j++)\n    sum++;\n```',
      options: ['O(n)', 'O(n²)', 'O(2n)', 'O(log n)'],
      answer: 'B',
      analysis: { ans: 'O(n²)', why: '外层 n 次，内层 n 次，总共 n×n = n² 次。', steps: '1. 外层循环 n 次。\n2. 每次外层，内层跑 n 次。\n3. 总次数 = n × n = n²。', pit: '两层循环不一定都是 O(n²)，比如内层从 i 开始就是 O(n²/2) 仍记作 O(n²)。' } },
    { id: 'cbf-bigo-3', kpIds: ['cs-complexity'], subject: 'cs', type: 'fill',
      stem: '二分查找的时间复杂度是 O(______)。',
      answer: 'log n', accept: ['log n', 'logn', 'log(n)'],
      analysis: { ans: 'log n', why: '每次排除一半，n 变成 n/2，再 n/4……直到 1。2^k = n，k = log₂n。', steps: '1. 初始范围 n。\n2. 每次减半：n/2, n/4, ...\n3. 减 k 次后范围是 1：n/2^k = 1。\n4. k = log₂n。', pit: '前提是数组必须有序。' } },
    { id: 'cbf-bigo-4', kpIds: ['cs-complexity'], subject: 'cs', type: 'fill',
      stem: '空间复杂度为 O(1) 的算法，意味着它使用 ______ 的额外空间。',
      answer: '常数', accept: ['常数', '固定', 'constant'],
      analysis: { ans: '常数（固定）', why: 'O(1) 表示不管输入多大，额外空间都是固定的几个变量。比如交换两个数只用了一个临时变量。', steps: '1. O(1)：只用固定数量的变量。\n2. O(n)：用了和输入等长的数组。\n3. 递归的空间复杂度要看调用栈深度。', pit: '递归的空间复杂度不是 O(1)，因为调用栈会占空间。' } },

    /* ---------- cs-network-app ---------- */
    { id: 'cbf-napp-1', kpIds: ['cs-network-app'], subject: 'cs', type: 'single',
      stem: '发送电子邮件使用的协议是？',
      options: ['HTTP', 'FTP', 'SMTP', 'DNS'],
      answer: 'C',
      analysis: { ans: 'SMTP', why: 'SMTP（Simple Mail Transfer Protocol）是发送邮件的标准协议，端口 25。接收邮件用 POP3 或 IMAP。', steps: '1. SMTP：发送邮件。\n2. POP3/IMAP：接收邮件。\n3. HTTP：网页浏览。\n4. FTP：文件传输。', pit: 'SMTP 只管发，不管收；收邮件用 POP3 或 IMAP。' } },
    { id: 'cbf-napp-2', kpIds: ['cs-network-app'], subject: 'cs', type: 'single',
      stem: 'C/S 架构和 B/S 架构的主要区别是？',
      options: ['C/S 需要安装客户端，B/S 只需浏览器', 'C/S 更快，B/S 更慢', 'B/S 更安全', '没有区别'],
      answer: 'A',
      analysis: { ans: 'C/S 需要安装客户端，B/S 只需浏览器', why: 'C/S（Client/Server）如 QQ、微信，需要下载安装。B/S（Browser/Server）如网页版邮箱，打开浏览器就能用。', steps: '1. C/S：客户端 + 服务器，功能强，要安装。\n2. B/S：浏览器 + 服务器，免安装，跨平台。', pit: 'B/S 是 C/S 的一种特殊形式，浏览器就是通用客户端。' } },
    { id: 'cbf-napp-3', kpIds: ['cs-network-app'], subject: 'cs', type: 'fill',
      stem: 'HTTPS 默认端口号是 ______。',
      answer: '443', accept: ['443'],
      analysis: { ans: '443', why: 'HTTP 用 80，HTTPS 用 443，FTP 用 21，SSH 用 22，SMTP 用 25。', steps: '1. 端口是区分服务的编号。\n2. HTTPS 比 HTTP 多了一层 TLS/SSL 加密。', pit: 'HTTPS 不是独立协议，是 HTTP + TLS。' } },
    { id: 'cbf-napp-4', kpIds: ['cs-network-app'], subject: 'cs', type: 'fill',
      stem: 'DNS 协议默认使用 ______ 号端口。',
      answer: '53', accept: ['53'],
      analysis: { ans: '53', why: 'DNS 域名解析用 53 端口，UDP 为主，TCP 用于区域传输。', steps: '1. DNS 查询通常用 UDP 53。\n2. 数据量大或区域传输时用 TCP 53。', pit: 'DNS 是应用层协议，但用 UDP 传输，因为查询要快速。' } }
  ]));

  /* 讲义部分 */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'cs-number-L1', kpIds: ['cs-number'], subject: 'cs', level: 1,
      title: '数制与进制转换：计算机怎么数数',
      estMinutes: 35,
      hookTitle: '为什么计算机只懂 0 和 1？',
      hookBody: '因为电路只有两种稳定状态：通电和断电。就像电灯只有开和关，计算机用这两种状态表示所有信息。',
      idea: '进制就是「满几进一」。十进制满 10 进 1，二进制满 2 进 1。二进制是计算机的母语，八进制和十六进制是二进制的「速写」，方便人阅读。',
      analogy: { title: '数数的手指头', md: '人有 10 根手指，所以习惯十进制。计算机只有 2 根「手指」（高电平、低电平），所以用二进制。十六进制就像把 4 根手指绑在一起数，一次能数 16 个。' },
      points: [
        { title: '一、位权展开式', md: '任何进制转十进制，都用位权展开：每位数字 × 基数的位次方，再相加。二进制 1011 = 1×2³+0×2²+1×2¹+1×2⁰ = 11。' },
        { title: '二、短除法转二进制', md: '十进制转二进制：不断除以 2，记录余数，直到商为 0。余数从下往上读。25 → 11001。' },
        { title: '三、8421 法快速转换', md: '二进制 4 位对应十六进制 1 位。记住 8-4-2-1，二进制 1111 = 8+4+2+1 = 15 = F。' },
        { title: '四、字节与位', md: '1 Byte = 8 bit。1 KB = 1024 Byte，1 MB = 1024 KB。文件大小用字节，网速用位/秒。' },
        { title: '五、常见进制对照', md: '十进制 0-9；二进制 0-1；八进制 0-7；十六进制 0-9 加 A-F（A=10，F=15）。' },
        { title: '六、为什么用十六进制', md: '二进制太长，十六进制紧凑。1 位十六进制 = 4 位二进制，转换方便。内存地址、颜色值都用十六进制。' }
      ],
      table: {
        headers: ['进制', '基数', '数字范围', '例子'],
        rows: [
          ['十进制', '10', '0-9', '25'],
          ['二进制', '2', '0-1', '11001'],
          ['八进制', '8', '0-7', '31'],
          ['十六进制', '16', '0-9,A-F', '19']
        ]
      },
      code: '// 十进制 25 转二进制\n25 ÷ 2 = 12 余 1\n12 ÷ 2 = 6  余 0\n6  ÷ 2 = 3  余 0\n3  ÷ 2 = 1  余 1\n1  ÷ 2 = 0  余 1\n// 余数倒读：11001',
      quizIds: ['cbf-num-1', 'cbf-num-2', 'cbf-num-3', 'cbf-num-4'],
      example: {
        title: '把二进制 1011 转成十进制',
        steps: [
          { md: '从右往左，第 0 位是 1，第 1 位是 1，第 2 位是 0，第 3 位是 1。' },
          { md: '位权分别是 2⁰=1，2¹=2，2²=4，2³=8。' },
          { md: '对应相乘：1×8 + 0×4 + 1×2 + 1×1。' },
          { md: '相加：8 + 0 + 2 + 1 = 11。' }
        ],
        takeaway: '位权展开是万能方法，任何进制转十进制都能用。'
      },
      example2: {
        title: '把十进制 25 转成二进制',
        steps: [
          { md: '25 ÷ 2 = 12，余 1。' },
          { md: '12 ÷ 2 = 6，余 0。' },
          { md: '6 ÷ 2 = 3，余 0。' },
          { md: '3 ÷ 2 = 1，余 1。' },
          { md: '1 ÷ 2 = 0，余 1。' },
          { md: '余数从下往上读：11001。' }
        ],
        takeaway: '短除法记余数，从下往上读。'
      },
      guided: [{ questionId: 'cbf-num-2', hint: '用短除法，一步步来。' }],
      solo: ['cbf-num-1', 'cbf-num-3'],
      challenge: ['cbf-num-4'],
      summary: {
        essence: '进制转换的核心是位权展开和短除法。1 Byte = 8 bit，1 KB = 1024 Byte。',
        formulas: ['十进制→二进制：短除法', '二进制→十进制：位权展开', '1 Byte = 8 bit', '1 KB = 1024 Byte'],
        pitfalls: ['余数读反方向', '混淆 bit 和 Byte', '把 1024 当成 1000'],
        checklist: ['我能用位权展开转十进制', '我能用短除法转二进制', '我能区分 bit 和 Byte', '我知道 1 KB = 1024 Byte']
      },
      feynman: '请向一个完全不懂计算机的人解释：为什么计算机用二进制而不是十进制？'
    }),

    Z.makeLesson({
      id: 'cs-encoding-L2', kpIds: ['cs-encoding'], subject: 'cs', level: 2,
      title: '信息编码：文字怎么变成数字',
      estMinutes: 30,
      hookTitle: '电脑里存的不是字，是数字',
      hookBody: '你看到的每一个汉字、每一个字母，在电脑硬盘里都是一串 0 和 1。编码就是「文字和数字的对照表」。',
      idea: '编码解决「怎么用数字表示字符」的问题。ASCII 用 7 位表示 128 个英文字符；汉字需要 GB2312、GBK、UTF-8 等编码，UTF-8 最常用，一个汉字占 3 字节。',
      analogy: { title: '电报密码本', md: '编码就像电报密码本：每个汉字对应一个数字，发报时只发数字，收报员查密码本还原成文字。UTF-8 就是全球通用的超级密码本。' },
      points: [
        { title: '一、ASCII：英文的编码', md: '美国标准信息交换码，7 位表示 128 个字符（0-127）。包含大小写字母、数字、标点。存储占 1 字节。' },
        { title: '二、GB2312：汉字的编码', md: '中国国家标准，收录 6763 个常用汉字。一个汉字占 2 字节。' },
        { title: '三、UTF-8：全球统一编码', md: '变长编码：英文 1 字节，常用汉字 3 字节，生僻字 4 字节。兼容 ASCII，互联网通用。' },
        { title: '四、乱码是怎么产生的', md: '用 UTF-8 保存的文件，用 GBK 打开，解码方式不对，就出现乱码。保存和打开要用同一编码。' },
        { title: '五、位、字节、千字节', md: 'bit 是最小单位（0 或 1）；8 bit = 1 Byte；1024 Byte = 1 KB；1024 KB = 1 MB。' },
        { title: '六、Base64 不是加密', md: 'Base64 是把二进制转成文本的编码方式，用于邮件附件、图片传输。它不是加密，可以还原。' }
      ],
      table: {
        headers: ['编码', '字节/汉字', '特点', '用途'],
        rows: [
          ['ASCII', '无汉字', '1 字节，128 字符', '英文文档'],
          ['GB2312', '2 字节', '国家标准', '早期中文系统'],
          ['UTF-8', '3 字节', '变长，全球通用', '网页、现代系统'],
          ['UTF-16', '2 或 4 字节', '定长为主', 'Java 内部']
        ]
      },
      code: '// 编码转换示意\n"中" 的 UTF-8: E4 B8 AD（3字节）\n"中" 的 GBK:   D6 D0（2字节）\n"A" 的 ASCII:  41（1字节）',
      quizIds: ['cbf-enc-1', 'cbf-enc-2', 'cbf-enc-3', 'cbf-enc-4'],
      example: {
        title: '计算一个纯中文文件的大小',
        steps: [
          { md: '文件有 1000 个汉字，用 UTF-8 保存。' },
          { md: 'UTF-8 中一个汉字占 3 字节。' },
          { md: '1000 × 3 = 3000 Byte。' },
          { md: '3000 ÷ 1024 ≈ 2.93 KB。' }
        ],
        takeaway: '先确定编码，再算字节数。'
      },
      example2: {
        title: '为什么同一个文件，在不同电脑打开是乱码',
        steps: [
          { md: 'A 电脑用 UTF-8 保存文件。' },
          { md: 'B 电脑用记事本默认 GBK 打开。' },
          { md: 'UTF-8 的 3 字节被 GBK 按 2 字节+1 字节解读。' },
          { md: '解码错位，显示乱码。' },
          { md: '解决：统一编码，或另存为时选正确编码。' }
        ],
        takeaway: '保存和打开用同一编码，是避免乱码的根本。'
      },
      guided: [{ questionId: 'cbf-enc-3', hint: 'UTF-8 是变长编码，常用汉字占 3 字节。' }],
      solo: ['cbf-enc-1', 'cbf-enc-2'],
      challenge: ['cbf-enc-4'],
      summary: {
        essence: '编码是字符和数字的对照表。ASCII 管英文，UTF-8 管全球，乱码是因为保存和打开的编码不一致。',
        formulas: ['1 Byte = 8 bit', '1 KB = 1024 Byte', 'UTF-8 汉字 = 3 Byte'],
        pitfalls: ['混淆 UTF-8 和 GBK 的字节数', '把 Base64 当加密', '把 1000 当 1024'],
        checklist: ['我能说出 ASCII、GB2312、UTF-8 的区别', '我能计算文件大小', '我知道乱码的原因', '我区分 bit 和 Byte']
      },
      feynman: '请用「密码本」的比喻，向奶奶解释为什么她电脑上的文件到别人电脑上会乱码。'
    }),

    Z.makeLesson({
      id: 'cs-hardware-L2', kpIds: ['cs-hardware'], subject: 'cs', level: 2,
      title: '计算机组成：认识电脑的五大件',
      estMinutes: 35,
      hookTitle: '电脑不是黑盒子，是五大部件的协作',
      hookBody: '拆开电脑，你会看到主板、CPU、内存条、硬盘。它们不是随便堆在一起的，而是按冯·诺依曼的蓝图精密协作的。',
      idea: '冯·诺依曼体系把计算机分成五大部件：运算器、控制器、存储器、输入设备、输出设备。CPU 是大脑，内存是临时工作台，硬盘是长期仓库。',
      analogy: { title: '餐厅后厨', md: 'CPU 是厨师，内存是操作台，硬盘是食材仓库。厨师（CPU）从仓库（硬盘）拿食材到操作台（内存），切配烹饪（运算），装盘（输出设备）。操作台越大（内存越大），厨师干活越快。' },
      points: [
        { title: '一、运算器 + 控制器 = CPU', md: '运算器做算术和逻辑运算，控制器指挥协调。两者合称中央处理器，是计算机的「大脑」。' },
        { title: '二、存储器分内存和外存', md: '内存（RAM）：速度快，断电丢数据，是临时工作台。外存（硬盘、SSD）：速度慢，断电保留，是长期仓库。' },
        { title: '三、输入设备给信息', md: '键盘、鼠标、麦克风、摄像头，把外界信息变成电信号送进计算机。' },
        { title: '四、输出设备给结果', md: '显示器、打印机、音箱，把计算机处理的结果呈现给人。' },
        { title: '五、冯·诺依曼的核心：存储程序', md: '程序和数据一样存在存储器里，CPU 按顺序自动取出执行。这是现代计算机的基石。' },
        { title: '六、存储层次：越快越小越贵', md: '寄存器 → 缓存 → 内存 → 硬盘 → 网络。速度递减，容量递增，价格递减。' }
      ],
      table: {
        headers: ['部件', '类比', '特点', '例子'],
        rows: [
          ['CPU', '厨师', '运算和控制', 'Intel i7, AMD Ryzen'],
          ['内存', '操作台', '快、小、断电丢', 'DDR4 16GB'],
          ['硬盘', '仓库', '慢、大、断电留', 'SSD 512GB'],
          ['输入设备', '传菜口', '送入信息', '键盘、鼠标'],
          ['输出设备', '出菜口', '送出结果', '显示器、打印机']
        ]
      },
      code: '// 存储层次速度对比（大致）\n寄存器：0.3 ns\n缓存：  1-10 ns\n内存：  100 ns\nSSD：   100,000 ns\n机械硬盘：10,000,000 ns',
      quizIds: ['cbf-hw-1', 'cbf-hw-2', 'cbf-hw-3', 'cbf-hw-4'],
      example: {
        title: '为什么打开大型软件很慢，运行起来就快了',
        steps: [
          { md: '双击软件图标，程序从硬盘读入内存。' },
          { md: '硬盘慢，内存快，加载过程耗时。' },
          { md: '程序进入内存后，CPU 直接从内存取指令执行。' },
          { md: '内存速度快，所以运行流畅。' },
          { md: '关闭软件，内存释放，下次打开又要重新加载。' }
        ],
        takeaway: '硬盘到内存是「上菜」，内存到 CPU 是「炒菜」，速度差一个量级。'
      },
      example2: {
        title: '内存和硬盘的区别',
        steps: [
          { md: '你在写 Word 文档，没保存时突然断电。' },
          { md: '文档内容在内存里，断电丢失。' },
          { md: '如果点了保存，文档写入硬盘。' },
          { md: '硬盘断电保留，下次还能打开。' }
        ],
        takeaway: '内存是「草稿纸」，硬盘是「档案柜」，草稿要誊写到档案柜才保险。'
      },
      guided: [{ questionId: 'cbf-hw-2', hint: '运算器是 ALU，负责算术和逻辑运算。' }],
      solo: ['cbf-hw-1', 'cbf-hw-3'],
      challenge: ['cbf-hw-4'],
      summary: {
        essence: '冯·诺依曼五大部件：运算器、控制器、存储器、输入、输出。CPU 是大脑，内存是工作台，硬盘是仓库。',
        formulas: ['CPU = 运算器 + 控制器', '内存：快、小、断电丢', '硬盘：慢、大、断电留'],
        pitfalls: ['混淆内存和硬盘', '以为 CPU 只有一个部件', '不知道存储程序概念'],
        checklist: ['我能说出五大部件', '我能区分内存和外存', '我能解释存储程序', '我知道存储层次']
      },
      feynman: '请用「餐厅后厨」的比喻，向朋友解释为什么内存越大电脑越流畅。'
    }),

    Z.makeLesson({
      id: 'cs-os-L2', kpIds: ['cs-os'], subject: 'cs', level: 2,
      title: '操作系统基础：管理硬件的大管家',
      estMinutes: 35,
      hookTitle: '没有操作系统，电脑就是一堆废铁',
      hookBody: '你双击 QQ，它就能运行；你插上 U 盘，它就能识别。这些「理所当然」背后，是操作系统在默默调度一切。',
      idea: '操作系统是管理硬件和软件资源的程序。它让多个程序同时运行（进程管理）、合理分配内存（内存管理）、组织文件（文件管理）、控制设备（设备管理）。',
      analogy: { title: '大管家与多线程餐厅', md: '操作系统像餐厅大管家：同时接待多桌客人（多进程），安排厨师轮流做菜（CPU 调度），管理仓库食材（内存分配），记录每桌点了什么（文件系统）。' },
      points: [
        { title: '一、进程：正在运行的程序', md: '程序是静态的文件，进程是程序的一次执行。双击两次微信，就启动了两个进程。' },
        { title: '二、线程：进程里的执行单元', md: '一个进程可以有多个线程。进程是资源分配单位（有自己的内存），线程是 CPU 调度单位（共享进程内存）。' },
        { title: '三、内存管理：给每个进程分地盘', md: '操作系统给每个进程分配独立的内存空间，防止互相干扰。虚拟内存让程序以为有无限内存。' },
        { title: '四、文件系统：组织数据的目录树', md: '文件系统把数据组织成目录（文件夹）和文件。路径就是文件的地址，如 C:\\Users\\文档。' },
        { title: '五、设备管理：屏蔽硬件差异', md: '操作系统提供统一接口，让程序不用关心具体硬件。打印机、U 盘、键盘，都通过驱动程序管理。' },
        { title: '六、用户接口：图形界面和命令行', md: 'GUI（图形界面）直观易用，CLI（命令行）高效强大。程序员要会基本命令行操作。' }
      ],
      table: {
        headers: ['概念', '类比', '特点', '例子'],
        rows: [
          ['进程', '一桌客人', '资源分配单位', '微信、QQ、浏览器'],
          ['线程', '服务员', 'CPU 调度单位', '下载、播放、接收消息'],
          ['内存管理', '分桌', '隔离与保护', '每个进程独立内存空间'],
          ['文件系统', '菜单', '树形组织', 'NTFS、FAT32、ext4']
        ]
      },
      code: '// 查看进程（Windows 任务管理器）\n// Ctrl + Shift + Esc\n\n// 查看进程（Linux/Mac 终端）\nps aux\n\n// 查看线程\n// 任务管理器 → 详细信息 → 线程数',
      quizIds: ['cbf-osb-1', 'cbf-osb-2', 'cbf-osb-3', 'cbf-osb-4'],
      example: {
        title: '理解进程和线程的区别',
        steps: [
          { md: '打开 Chrome 浏览器，启动一个进程。' },
          { md: '每个标签页是一个线程（或进程，Chrome 是多进程架构）。' },
          { md: '标签页之间共享浏览器的书签、历史记录（共享内存）。' },
          { md: '一个标签页崩溃，不影响其他标签页（进程隔离）。' }
        ],
        takeaway: '进程是「独立的房子」，线程是「房子里的房间」。'
      },
      example2: {
        title: '为什么手机会卡',
        steps: [
          { md: '同时开了很多 App，每个 App 是一个进程。' },
          { md: '进程占用内存，内存快满了。' },
          { md: '操作系统开始频繁切换进程，或杀掉后台进程。' },
          { md: '切换开销大，或重新加载 App，导致卡顿。' },
          { md: '清理后台 App，释放内存，手机变流畅。' }
        ],
        takeaway: '内存有限，进程太多会互相挤占资源。'
      },
      guided: [{ questionId: 'cbf-osb-1', hint: '进程有独立内存，线程共享内存。' }],
      solo: ['cbf-osb-2', 'cbf-osb-3'],
      challenge: ['cbf-osb-4'],
      summary: {
        essence: '操作系统是资源大管家。进程是资源分配单位，线程是 CPU 调度单位。内存管理隔离进程，文件系统组织数据。',
        formulas: ['程序 ≠ 进程', '进程 = 资源分配单位', '线程 = CPU 调度单位', '线程共享进程内存'],
        pitfalls: ['混淆进程和程序', '以为线程有独立内存', '不知道虚拟内存'],
        checklist: ['我能区分进程和线程', '我能说出操作系统的功能', '我知道虚拟内存的作用', '我会用任务管理器']
      },
      feynman: '请用「餐厅大管家」的比喻，向同学解释为什么手机开太多 App 会变卡。'
    }),

    Z.makeLesson({
      id: 'cs-network-L2', kpIds: ['cs-network'], subject: 'cs', level: 2,
      title: '网络基础：从输入网址到看到网页',
      estMinutes: 40,
      hookTitle: '输入网址按下回车，发生了什么？',
      hookBody: '短短几百毫秒，你的请求穿越了千山万水，找到了地球另一端的服务器。这个过程就像寄一封加急快递，每个环节都有专人负责。',
      idea: '网络分层：应用层（HTTP）→ 传输层（TCP/UDP）→ 网络层（IP）→ 链路层。DNS 负责域名解析，TCP 保证可靠传输，IP 负责寻址路由。',
      analogy: { title: '寄快递', md: '寄快递：写收件人地址（DNS 解析）→ 打包（TCP 建立连接）→ 运输（IP 路由）→ 签收（HTTP 响应）。TCP 像顺丰，保证送到；UDP 像平邮，快但可能丢。' },
      points: [
        { title: '一、DNS：域名翻译成 IP', md: '域名 www.baidu.com 是给人看的，IP 180.101.50.242 是给机器看的。DNS 服务器负责把域名翻译成 IP。' },
        { title: '二、TCP 三次握手', md: '建立连接：客户端发 SYN → 服务器回 SYN+ACK → 客户端发 ACK。三次握手确保双方都能收发。' },
        { title: '三、HTTP：请求与响应', md: 'HTTP 是应用层协议，规定报文格式。GET 请求获取资源，POST 提交数据。状态码 200 成功，404 未找到。' },
        { title: '四、TCP vs UDP', md: 'TCP：面向连接、可靠、慢，用于网页、文件。UDP：无连接、不可靠、快，用于视频、直播、游戏。' },
        { title: '五、IP 地址与端口', md: 'IPv4 是 32 位，如 192.168.1.1。端口区分服务：HTTP 80，HTTPS 443，SSH 22。' },
        { title: '六、分层模型', md: 'OSI 七层或 TCP/IP 四层。每层只关心自己的任务，上层不用管下层细节，这是「封装」思想。' }
      ],
      table: {
        headers: ['协议', '层', '作用', '类比'],
        rows: [
          ['HTTP', '应用层', '网页数据传输', '浏览器和服务器对话'],
          ['TCP', '传输层', '可靠传输', '顺丰快递，保证送到'],
          ['UDP', '传输层', '快速传输', '平邮，快但可能丢'],
          ['IP', '网络层', '寻址路由', '快递分拣中心'],
          ['DNS', '应用层', '域名解析', '114 查号台']
        ]
      },
      code: '// 访问网页的完整过程\n1. DNS 查询：www.xxx.com → 93.184.216.34\n2. TCP 三次握手：建立连接\n3. 发送 HTTP 请求：GET /index.html\n4. 服务器处理，返回 HTTP 响应\n5. 浏览器解析 HTML，渲染页面\n6. TCP 四次挥手：断开连接',
      quizIds: ['cbf-net-1', 'cbf-net-2', 'cbf-net-3', 'cbf-net-4'],
      example: {
        title: '为什么视频软件用 UDP 而不是 TCP',
        steps: [
          { md: '视频直播要求实时性，不能等重传。' },
          { md: 'UDP 不保证可靠，丢包就丢了，不重发。' },
          { md: '画面偶尔花一下，但延迟低，体验流畅。' },
          { md: '如果用 TCP，重传会导致画面卡顿，不适合直播。' }
        ],
        takeaway: '要准确用 TCP，要快用 UDP。场景决定协议。'
      },
      example2: {
        title: 'DNS 劫持是怎么回事',
        steps: [
          { md: '正常：DNS 返回真实 IP，你访问真网站。' },
          { md: '被劫持：DNS 返回假 IP，你访问钓鱼网站。' },
          { md: '钓鱼网站界面和真网站一样，骗取账号密码。' },
          { md: '防御：用 HTTPS，检查证书，不连陌生 Wi-Fi。' }
        ],
        takeaway: 'DNS 是网络的第一道关口，必须保证它返回正确的 IP。'
      },
      guided: [{ questionId: 'cbf-net-1', hint: 'TCP 面向连接可靠，UDP 无连接快。' }],
      solo: ['cbf-net-2', 'cbf-net-3'],
      challenge: ['cbf-net-4'],
      summary: {
        essence: '访问网页：DNS 解析 → TCP 连接 → HTTP 请求 → 渲染。TCP 可靠，UDP 快，分层设计让网络可扩展。',
        formulas: ['TCP：三次握手，可靠', 'UDP：无连接，快速', 'HTTP：80 端口', 'HTTPS：443 端口'],
        pitfalls: ['混淆 TCP 和 UDP 特点', '忘记 DNS 是第一步', '不知道端口作用'],
        checklist: ['我能描述访问网页的过程', '我能区分 TCP 和 UDP', '我知道常见端口号', '我理解分层的好处']
      },
      feynman: '请用「寄快递」的比喻，向家人解释为什么输入网址后能看到网页。'
    }),

    Z.makeLesson({
      id: 'cs-database-L2', kpIds: ['cs-database'], subject: 'cs', level: 2,
      title: '数据库与 SQL：数据的仓库管理员',
      estMinutes: 35,
      hookTitle: '你的微信聊天记录存在哪里？',
      hookBody: '不在你的手机里，而在腾讯的服务器上，用数据库管理着。数据库就是数据的仓库，SQL 就是和仓库管理员对话的语言。',
      idea: '数据库按结构组织数据，SQL 是查询语言。表由行和列组成，主键唯一标识一行。SELECT 查，INSERT 增，UPDATE 改，DELETE 删。JOIN 关联多表。',
      analogy: { title: 'Excel 的升级版', md: '数据库像超级 Excel：表是工作表，行是记录，列是字段。但数据库能同时被几千人读写，还能保证数据不冲突、不丢失，这是 Excel 做不到的。' },
      points: [
        { title: '一、表、行、列', md: '表（Table）存一类数据；行（Row）是一条记录；列（Column）是字段。学生表：学号、姓名、年龄。' },
        { title: '二、主键：唯一标识', md: '主键唯一标识一行，不能重复、不能为 NULL。学号、身份证号适合做主键，姓名不适合。' },
        { title: '三、外键：表之间的关联', md: '外键指向另一张表的主键。成绩表的「学号」是外键，指向学生表的「学号」。' },
        { title: '四、SQL 四大操作', md: 'SELECT 查：SELECT * FROM 学生 WHERE 年龄>18。INSERT 增：INSERT INTO 学生 VALUES (...)。UPDATE 改：UPDATE 学生 SET 年龄=20 WHERE 学号=1。DELETE 删：DELETE FROM 学生 WHERE 学号=1。' },
        { title: '五、JOIN：多表查询', md: 'INNER JOIN 取交集，LEFT JOIN 保留左表全部。ON 后面写关联条件，不写会产生笛卡尔积。' },
        { title: '六、三大范式', md: '1NF：字段不可再分。2NF：非主键字段完全依赖主键。3NF：非主键字段不依赖其他非主键字段。' }
      ],
      table: {
        headers: ['操作', '关键字', '例子', '类比'],
        rows: [
          ['查询', 'SELECT', 'SELECT * FROM 学生', '从仓库找货'],
          ['插入', 'INSERT', 'INSERT INTO 学生 VALUES(...)', '入库登记'],
          ['更新', 'UPDATE', 'UPDATE 学生 SET 年龄=20', '改标签'],
          ['删除', 'DELETE', 'DELETE FROM 学生 WHERE...', '出库销毁']
        ]
      },
      code: '-- 查询年龄大于 18 的学生\nSELECT * FROM 学生 WHERE 年龄 > 18;\n\n-- 关联查询：学生和成绩\nSELECT 学生.姓名, 成绩.分数\nFROM 学生\nJOIN 成绩 ON 学生.学号 = 成绩.学号;',
      quizIds: ['cbf-dbc-1', 'cbf-dbc-2', 'cbf-dbc-3', 'cbf-dbc-4'],
      example: {
        title: '设计一个学生选课数据库',
        steps: [
          { md: '学生表：学号（主键）、姓名、年龄。' },
          { md: '课程表：课程号（主键）、课程名、学分。' },
          { md: '选课表：学号（外键）、课程号（外键）、成绩。' },
          { md: '一个学生可以选多门课，一门课可以被多个学生选。' },
          { md: '选课表是「多对多」关系的桥梁。' }
        ],
        takeaway: '多对多关系要用中间表，两个外键分别指向两张表。'
      },
      example2: {
        title: 'JOIN 查询实战',
        steps: [
          { md: '需求：查询每个学生的姓名和各科成绩。' },
          { md: '学生表有姓名，成绩表有分数，两表通过学号关联。' },
          { md: 'SELECT 学生.姓名, 成绩.分数 FROM 学生 JOIN 成绩 ON 学生.学号=成绩.学号。' },
          { md: '结果：每行是一个学生的一门成绩。' }
        ],
        takeaway: 'JOIN 是把两张表按条件「拼」成一张大表。'
      },
      guided: [{ questionId: 'cbf-dbc-3', hint: 'JOIN 需要 ON 指定关联条件。' }],
      solo: ['cbf-dbc-1', 'cbf-dbc-2'],
      challenge: ['cbf-dbc-4'],
      summary: {
        essence: '数据库用表组织数据，主键唯一标识一行，外键关联表。SQL 四大操作：增删改查，JOIN 关联多表。',
        formulas: ['SELECT 查', 'INSERT 增', 'UPDATE 改', 'DELETE 删', 'JOIN 关联'],
        pitfalls: ['不写 ON 条件', '用姓名做主键', '混淆 WHERE 和 HAVING'],
        checklist: ['我能写出基本 SQL', '我能说出主键和外键', '我会用 JOIN 关联表', '我知道三大范式']
      },
      feynman: '请用「Excel 升级版」的比喻，向同学解释数据库和 Excel 的区别。'
    }),

    Z.makeLesson({
      id: 'cs-var-type-L1', kpIds: ['cs-var-type'], subject: 'cs', level: 1,
      title: '变量与类型：给数据贴标签',
      estMinutes: 30,
      hookTitle: '变量不是盒子，是贴纸',
      hookBody: '很多人以为变量是一个盒子，把数据装进去。其实变量更像贴纸，贴在数据上。同一份数据可以贴好几张贴纸，一张贴纸也可以撕下来贴到别处。',
      idea: '变量是数据的引用（贴纸），类型决定数据能做什么。基本类型：整数、小数、字符串、布尔。类型转换要显式进行，避免隐式转换的坑。',
      analogy: { title: '行李箱和标签', md: '数据是行李箱，变量是标签。`x = 3` 是造一个装 3 的行李箱，贴上 x 标签。`y = x` 是又贴一张 y 标签，不是复制行李。如果行李箱可打开（可变对象），两张标签看到同一份变化。' },
      points: [
        { title: '一、变量是引用', md: 'Python 中 `x = 3` 不是把 3 放进 x，而是让 x 指向 3。`y = x` 让 y 也指向 3。`x = 5` 让 x 改指向 5，y 不变。' },
        { title: '二、类型决定操作', md: 'int 能加减乘除，str 能拼接切片，bool 只有 True/False。类型不匹配会报错，如 "1" + 2 在 Python 中报错。' },
        { title: '三、类型转换要显式', md: 'int("12") 转整数，str(12) 转字符串，float("3.14") 转小数。转换失败会报 ValueError。' },
        { title: '四、强类型 vs 弱类型', md: '强类型：类型不匹配报错（Java、Python）。弱类型：自动转换（JavaScript 中 "1"+2="12"）。强类型更安全。' },
        { title: '五、变量命名规则', md: '字母、数字、下划线组成，不能以数字开头，不能是关键字。习惯用小写下划线，如 user_name。' },
        { title: '六、常量与变量', md: '常量是不该变的值，如 PI = 3.14159。Python 中没有真正的常量，约定全大写表示「请别改」。' }
      ],
      table: {
        headers: ['类型', '例子', '能做什么', '占用空间'],
        rows: [
          ['int', '42, -7', '加减乘除', '4 字节（Java）'],
          ['float', '3.14, -0.5', '小数运算', '4 字节'],
          ['str', '"hello"', '拼接、切片', '可变'],
          ['bool', 'True, False', '逻辑判断', '1 字节']
        ]
      },
      code: '# Python 类型示例\nx = 3           # int\ny = 3.14        # float\nname = "小明"   # str\nflag = True     # bool\n\n# 类型转换\nage = int("18")   # 字符串转整数\npi = float("3.14") # 字符串转小数\ntext = str(42)    # 整数转字符串',
      quizIds: ['cbf-vt-1', 'cbf-vt-2', 'cbf-vt-3', 'cbf-vt-4'],
      example: {
        title: '变量交换的陷阱',
        steps: [
          { md: 'a = 1, b = 2，想交换。' },
          { md: '错误：a = b; b = a。结果 a 和 b 都是 2。' },
          { md: '因为 a = b 后，a 指向 2，原来的 1 丢了。' },
          { md: '正确：temp = a; a = b; b = temp。用临时变量保存。' }
        ],
        takeaway: '赋值是改指向，不是复制数据。交换要借助第三方。'
      },
      example2: {
        title: '类型转换的坑',
        steps: [
          { md: '用户输入 age = input("年龄：")，得到字符串 "18"。' },
          { md: '直接 age + 1，Python 报错：字符串不能加整数。' },
          { md: '必须 int(age) + 1，先转换再运算。' },
          { md: 'JavaScript 中 "18" + 1 = "181"，自动拼接，不报错但结果错。' }
        ],
        takeaway: '强类型语言会报错，弱类型语言会偷偷转换，都要小心。'
      },
      guided: [{ questionId: 'cbf-vt-1', hint: '类型决定内存分配和可用操作。' }],
      solo: ['cbf-vt-2', 'cbf-vt-3'],
      challenge: ['cbf-vt-4'],
      summary: {
        essence: '变量是数据的引用，类型决定能做什么。类型转换要显式，强类型语言更安全。',
        formulas: ['int("12") 转整数', 'str(12) 转字符串', 'float("3.14") 转小数'],
        pitfalls: ['以为变量是盒子', '隐式类型转换出错', '用关键字当变量名'],
        checklist: ['我能说出变量的本质', '我能做类型转换', '我能区分强弱类型', '我会规范命名变量']
      },
      feynman: '请用「贴纸和行李箱」的比喻，向朋友解释为什么 a = b 之后修改 a 会影响 b。'
    }),

    Z.makeLesson({
      id: 'cs-operator-L2', kpIds: ['cs-operator'], subject: 'cs', level: 2,
      title: '运算符与表达式：数据的加工厂',
      estMinutes: 30,
      hookTitle: 'i++ 和 ++i，真的不一样',
      hookBody: '看起来都是加 1，但一个先用后加，一个先加后用。这个差别在考试里能出一道大题，在代码里能藏一个隐蔽的 bug。',
      idea: '运算符是数据的加工厂。算术运算符做计算，逻辑运算符做判断，位运算符操作二进制。优先级决定先算谁，短路求值可以优化性能。',
      analogy: { title: '工厂流水线', md: '表达式像流水线：数据是原料，运算符是机器。优先级高的机器先加工，括号可以改变顺序。短路求值像质检员：前面不合格，后面直接跳过。' },
      points: [
        { title: '一、算术运算符', md: '+ 加，- 减，* 乘，/ 除，% 取余，** 幂。整数除法取整，如 7/2=3（Python2）或 3.5（Python3）。' },
        { title: '二、比较运算符', md: '== 等于，!= 不等于，> 大于，< 小于，>= 大于等于，<= 小于等于。结果是布尔值。' },
        { title: '三、逻辑运算符', md: '&& 与（都真才真），|| 或（一真就真），! 非（取反）。短路求值：&& 左边假，右边不算；|| 左边真，右边不算。' },
        { title: '四、位运算符', md: '& 按位与，| 按位或，^ 按位异或，~ 按位取反，<< 左移，>> 右移。操作的是二进制位。' },
        { title: '五、优先级与结合性', md: '先乘除后加减，先算术后比较再逻辑。括号最优先。记不住就加括号，清晰不出错。' },
        { title: '六、自增自减', md: 'i++：先用后加。++i：先加后用。单独写效果一样，赋值时区别明显。' }
      ],
      table: {
        headers: ['类别', '运算符', '例子', '结果'],
        rows: [
          ['算术', '+ - * / %', '7 % 3', '1'],
          ['比较', '== != > <', '5 > 3', 'True'],
          ['逻辑', '&& || !', 'True && False', 'False'],
          ['位', '& | ^ ~', '5 & 3', '1']
        ]
      },
      code: '// 短路求值示例\nif (obj != null && obj.name != null) {\n  // 安全访问 obj.name\n}\n\n// 位运算示例\n5 & 3  // 101 & 011 = 001 = 1\n5 | 3  // 101 | 011 = 111 = 7\n5 ^ 3  // 101 ^ 011 = 110 = 6',
      quizIds: ['cbf-op-1', 'cbf-op-2', 'cbf-op-3', 'cbf-op-4'],
      example: {
        title: '利用短路求值防止空指针',
        steps: [
          { md: '想访问 user.name，但 user 可能是 null。' },
          { md: '直接写 user.name 会报 NullPointerException。' },
          { md: '写成 user != null && user.name != null。' },
          { md: '如果 user 是 null，左边为假，右边不执行，不会报错。' }
        ],
        takeaway: '短路求值是「保护性编程」的利器。'
      },
      example2: {
        title: 'i++ 和 ++i 的区别',
        steps: [
          { md: 'int i = 5; int a = i++;' },
          { md: 'i++ 先用后加：先把 5 给 a，i 再变 6。' },
          { md: '结果：a = 5, i = 6。' },
          { md: 'int j = 5; int b = ++j;' },
          { md: '++j 先加后用：j 先变 6，再把 6 给 b。' },
          { md: '结果：b = 6, j = 6。' }
        ],
        takeaway: '看 ++ 在前还是后：在前先加，在后后加。'
      },
      guided: [{ questionId: 'cbf-op-2', hint: 'i++ 先用后加，++i 先加后用。' }],
      solo: ['cbf-op-1', 'cbf-op-3'],
      challenge: ['cbf-op-4'],
      summary: {
        essence: '运算符是数据的加工厂。优先级决定顺序，短路求值可以保护代码，位运算操作二进制。',
        formulas: ['先乘除后加减', '&& 左边假右边不算', '|| 左边真右边不算', 'i++ 先用后加，++i 先加后用'],
        pitfalls: ['混淆 i++ 和 ++i', '忘记短路特性', '位运算当逻辑运算'],
        checklist: ['我能按优先级算表达式', '我能用短路保护代码', '我能区分 i++ 和 ++i', '我会基本位运算']
      },
      feynman: '请用「流水线」的比喻，向同学解释运算符优先级和短路求值。'
    }),

    Z.makeLesson({
      id: 'cs-loop-L2', kpIds: ['cs-loop'], subject: 'cs', level: 2,
      title: '条件与循环：让代码重复和选择',
      estMinutes: 35,
      hookTitle: '差一错误：程序员的第一堂课',
      hookBody: 'for (i=0; i<=n; i++) 和 for (i=0; i<n; i++)，一个 < 号的差别，可能多循环一次，导致数组越界、程序崩溃。',
      idea: '条件语句让代码做选择，循环语句让代码重复。for 适合已知次数，while 适合未知次数。break 跳出整个循环，continue 跳过本次。',
      analogy: { title: '操场跑圈', md: 'for 循环像「跑 10 圈」，次数明确。while 循环像「跑直到累」，条件明确但次数不定。break 是「不跑了」，continue 是「这圈不算，下一圈继续」。' },
      points: [
        { title: '一、if-else：做选择', md: 'if (条件) { 真时执行 } else { 假时执行 }。多个条件用 else if。条件要有互斥性，覆盖所有情况。' },
        { title: '二、for 循环：已知次数', md: 'for (初始化; 条件; 更新) { 循环体 }。i=0; i<n; i++ 执行 n 次，下标 0 到 n-1。' },
        { title: '三、while 循环：未知次数', md: 'while (条件) { 循环体 }。先判断后执行，可能一次都不执行。do-while 先执行后判断，至少执行一次。' },
        { title: '四、break 与 continue', md: 'break 跳出整个循环，continue 跳过本次进入下一次。嵌套循环中，break 只跳出内层。' },
        { title: '五、循环边界', md: 'i < n 执行 n 次，i <= n 执行 n+1 次。数组下标 0 到 length-1，i < arr.length 不会越界。' },
        { title: '六、循环不变式', md: '每次循环开始和结束都成立的性质。比如累加器 sum 总是等于已遍历元素之和。用来验证循环正确性。' }
      ],
      table: {
        headers: ['循环', '适用场景', '执行次数', '例子'],
        rows: [
          ['for', '已知次数', '固定', '遍历数组'],
          ['while', '未知次数', '0 到多次', '读取文件直到结束'],
          ['do-while', '至少一次', '1 到多次', '菜单循环']
        ]
      },
      code: '// 计算 1 到 100 的和\nint sum = 0;\nfor (int i = 1; i <= 100; i++) {\n  sum += i;\n}\n\n// 找数组中的最大值\nint max = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n  if (arr[i] > max) max = arr[i];\n}',
      quizIds: ['cbf-lp-1', 'cbf-lp-2', 'cbf-lp-3', 'cbf-lp-4'],
      example: {
        title: '避免差一错误',
        steps: [
          { md: '需求：遍历数组前 5 个元素。' },
          { md: '错误：for (i=0; i<=5; i++)，会访问 a[0] 到 a[5]，共 6 个。' },
          { md: '如果数组只有 5 个元素，a[5] 越界。' },
          { md: '正确：for (i=0; i<5; i++)，访问 a[0] 到 a[4]，共 5 个。' },
          { md: '记忆：起始下标 0，结束下标 = 个数-1，条件用 < 个数。' }
        ],
        takeaway: '循环次数 = 结束值 - 起始值，注意 < 和 <=。'
      },
      example2: {
        title: '用 break 提前结束',
        steps: [
          { md: '需求：在数组中找目标值，找到就停。' },
          { md: '不用 break：找到后还继续循环，浪费时间。' },
          { md: '用 break：找到立即跳出循环，效率最高。' },
          { md: 'for (i=0; i<n; i++) { if (arr[i]==target) { found=true; break; } }' }
        ],
        takeaway: '找到就 break，不要做无用功。'
      },
      guided: [{ questionId: 'cbf-lp-2', hint: 'break 跳出整个循环，continue 进入下一次。' }],
      solo: ['cbf-lp-1', 'cbf-lp-3'],
      challenge: ['cbf-lp-4'],
      summary: {
        essence: 'if 做选择，循环做重复。for 已知次数，while 未知次数。break 跳出，continue 跳过。注意边界，避免差一。',
        formulas: ['for (i=0; i<n; i++) 执行 n 次', 'i < arr.length 不越界', 'break 跳出整个循环'],
        pitfalls: ['差一错误', '死循环', 'break 用错层'],
        checklist: ['我能写正确的循环边界', '我能区分 break 和 continue', '我会用循环不变式验证', '我知道 for 和 while 的区别']
      },
      feynman: '请用「操场跑圈」的比喻，向同学解释 for 循环和 while 循环的区别。'
    }),

    Z.makeLesson({
      id: 'cs-oop-L3', kpIds: ['cs-oop'], subject: 'cs', level: 3,
      title: '面向对象：把世界装进代码',
      estMinutes: 40,
      hookTitle: '类是图纸，对象是房子',
      hookBody: '你不需要知道发动机怎么造，就能开车。面向对象就是「隐藏细节，暴露接口」，让复杂系统变得可理解、可维护。',
      idea: '类是模板，定义了属性和方法；对象是实例，按模板造出。封装隐藏细节，继承复用代码，多态统一接口。三大特征让代码可扩展、可维护。',
      analogy: { title: '汽车生产线', md: '类是汽车设计图，规定了颜色、型号、发动机。对象是具体的车，每辆有独立车牌。封装是发动机盖，你不用看内部就能开车。继承是新款车基于老款改进。多态是「所有车都能开」，但每辆开起来感觉不同。' },
      points: [
        { title: '一、类与对象', md: '类是抽象模板，定义了有什么属性、能做什么方法。对象是具体实例，有自己的属性值。class Person { name, age }，new Person("张三") 造出对象。' },
        { title: '二、封装：隐藏细节', md: '把属性设为 private，提供 public 方法访问。外部不用知道内部怎么实现，只需要知道怎么用。保护数据不被乱改。' },
        { title: '三、继承：复用代码', md: '子类继承父类，获得父类的属性和方法。class Student extends Person。避免重复代码，便于统一修改。' },
        { title: '四、多态：同一接口不同实现', md: '父类引用指向子类对象，调用方法时执行子类的实现。Animal a = new Dog(); a.eat() 执行 Dog 的 eat。' },
        { title: '五、构造方法', md: '创建对象时自动调用，用于初始化属性。没有返回值，方法名和类名相同。可以重载多个构造方法。' },
        { title: '六、重写与重载', md: '重写（Override）：子类覆盖父类方法，体现多态。重载（Overload）：同一个类中方法名相同、参数不同，编译时确定。' }
      ],
      table: {
        headers: ['特征', '作用', '例子', '关键词'],
        rows: [
          ['封装', '隐藏细节', 'private 属性 + public 方法', 'private, public'],
          ['继承', '复用代码', 'Student extends Person', 'extends, super'],
          ['多态', '统一接口', 'Animal a = new Dog()', 'Override, 父类引用'],
          ['抽象', '提取共性', 'abstract class Shape', 'abstract, interface']
        ]
      },
      code: 'class Animal {\n  String name;\n  void eat() { System.out.println("吃东西"); }\n}\n\nclass Dog extends Animal {\n  void eat() { System.out.println("吃骨头"); }\n}\n\nAnimal a = new Dog();\na.eat();  // 输出：吃骨头（多态）',
      quizIds: ['cbf-oop-1', 'cbf-oop-2', 'cbf-oop-3', 'cbf-oop-4'],
      example: {
        title: '用继承设计图形类',
        steps: [
          { md: '父类 Shape：属性 color，方法 area()（抽象）。' },
          { md: '子类 Circle：属性 radius，重写 area() 返回 πr²。' },
          { md: '子类 Rectangle：属性 width, height，重写 area() 返回 w×h。' },
          { md: '使用时：Shape s = new Circle(); s.area() 自动调用 Circle 的实现。' }
        ],
        takeaway: '继承提取共性，多态统一接口，新增图形不用改旧代码。'
      },
      example2: {
        title: '封装保护数据',
        steps: [
          { md: '直接暴露属性：p.age = -5，数据非法。' },
          { md: '封装：private age，提供 setAge(int a) { if (a>0) this.age=a; }。' },
          { md: '外部只能通过 setAge 修改，非法值被拒绝。' },
          { md: '数据安全了，代码可维护了。' }
        ],
        takeaway: '封装不是麻烦，是保护。'
      },
      guided: [{ questionId: 'cbf-oop-2', hint: '类是模板，对象是实例。' }],
      solo: ['cbf-oop-1', 'cbf-oop-3'],
      challenge: ['cbf-oop-4'],
      summary: {
        essence: '类是模板，对象是实例。封装隐藏细节，继承复用代码，多态统一接口。构造方法初始化，重写体现多态。',
        formulas: ['class 类名 { 属性; 方法; }', 'new 类名() 创建对象', 'extends 继承', 'Override 重写'],
        pitfalls: ['混淆类和对象', '乱用继承', '混淆重写和重载'],
        checklist: ['我能设计简单的类', '我能用封装保护数据', '我会用继承复用代码', '我理解多态']
      },
      feynman: '请用「汽车生产线」的比喻，向同学解释类、对象、封装、继承、多态。'
    }),

    Z.makeLesson({
      id: 'cs-string-L2', kpIds: ['cs-string'], subject: 'cs', level: 2,
      title: '字符串处理：文本的雕刻刀',
      estMinutes: 30,
      hookTitle: '字符串是字符的数组，但不可变',
      hookBody: '你想把 "hello" 的第一个字母改成大写，发现 s[0]=\'H\' 报错。字符串的「不可变性」是新手的第一道坎。',
      idea: '字符串本质是字符数组，但 Java/Python 中不可变。常用操作：拼接、切片、查找、替换、分割。大量拼接用 StringBuilder，避免频繁创建新对象。',
      analogy: { title: '刻印章', md: '字符串像刻在石头上的印章，刻好了就不能改。想改一个字，只能重新刻一块（创建新字符串）。StringBuilder 像活字印刷，字模可以重复排列组合。' },
      points: [
        { title: '一、字符串不可变', md: 'Java、Python 中字符串一旦创建不能修改。s[0]=\'x\' 会报错。修改会生成新字符串，原字符串不变。' },
        { title: '二、常用操作', md: '拼接：+ 或 concat。切片：substring 或 [start:end]。查找：indexOf 或 find。替换：replace。分割：split。' },
        { title: '三、回文判断', md: '回文是正读反读一样。思路：第 i 个字符和第 n-1-i 个字符比较，全部相等则是回文。' },
        { title: '四、字符串反转', md: 'Python：s[::-1]。Java：转成字符数组倒序，或用 StringBuilder.reverse()。' },
        { title: '五、大量拼接用 StringBuilder', md: 'String 不可变，每次 + 都创建新对象，效率低。StringBuilder 可变，append 不创建新对象，循环拼接首选。' },
        { title: '六、格式化输出', md: 'Python：f-string，f"姓名：{name}"。Java：String.format 或 + 拼接。保持输出格式统一。' }
      ],
      table: {
        headers: ['操作', 'Python', 'Java', '说明'],
        rows: [
          ['拼接', '+ 或 join', '+ 或 concat', '字符串相连'],
          ['切片', 's[start:end]', 'substring', '取子串'],
          ['查找', 'find / index', 'indexOf', '找位置'],
          ['替换', 'replace', 'replace', '替换内容'],
          ['分割', 'split', 'split', '按分隔符切开']
        ]
      },
      code: '# Python 字符串操作\ns = "hello world"\nprint(s[0:5])        # hello\nprint(s.upper())     # HELLO WORLD\nprint(s.replace("world", "python"))  # hello python\nprint(s.split(" "))  # ["hello", "world"]\n\n# 回文判断\ndef is_palindrome(s):\n  return s == s[::-1]',
      quizIds: ['cbf-str-1', 'cbf-str-2', 'cbf-str-3', 'cbf-str-4'],
      example: {
        title: '高效拼接字符串',
        steps: [
          { md: '需求：把 1 到 10000 的数字拼成字符串。' },
          { md: '低效：result = ""; for i in range(10000): result += str(i)。每次创建新对象。' },
          { md: '高效：用列表收集，最后 "".join(list)。' },
          { md: 'Python："".join([str(i) for i in range(10000)])。' },
          { md: 'Java：StringBuilder sb = new StringBuilder(); for(...) sb.append(i);。' }
        ],
        takeaway: '频繁拼接用 StringBuilder 或 join，不要 + 号循环。'
      },
      example2: {
        title: '判断回文字符串',
        steps: [
          { md: '回文：正读反读一样，如 "abcba"、"上海自来水来自海上"。' },
          { md: '方法 1：反转后和原串比较，s == s[::-1]。' },
          { md: '方法 2：双指针，i 从 0 开始，j 从末尾开始，向中间移动。' },
          { md: '比较 s[i] 和 s[j]，不等则不是回文，相等则继续。' },
          { md: 'i >= j 时结束，是回文。' }
        ],
        takeaway: '回文判断用双指针，时间 O(n)，空间 O(1)。'
      },
      guided: [{ questionId: 'cbf-str-3', hint: '第 i 个和第 n-1-i 个比较。' }],
      solo: ['cbf-str-1', 'cbf-str-2'],
      challenge: ['cbf-str-4'],
      summary: {
        essence: '字符串不可变，修改会生成新对象。常用操作：拼接、切片、查找、替换、分割。大量拼接用 StringBuilder。',
        formulas: ['切片 s[start:end]', '反转 s[::-1]', '回文判断 s[i] vs s[n-1-i]'],
        pitfalls: ['试图修改字符串', '循环用 + 拼接', '混淆长度和下标'],
        checklist: ['我能做字符串基本操作', '我会判断回文', '我知道 StringBuilder 的作用', '我能格式化输出']
      },
      feynman: '请用「刻印章」的比喻，向同学解释为什么字符串不可变，以及 StringBuilder 的作用。'
    }),

    Z.makeLesson({
      id: 'cs-tree-L3', kpIds: ['cs-tree'], subject: 'cs', level: 3,
      title: '树与二叉树：层次分明的数据结构',
      estMinutes: 40,
      hookTitle: '文件夹为什么是树形结构？',
      hookBody: 'C 盘里有用户，用户里有文档，文档里有项目。一层套一层，像一棵倒过来的树。树结构让查找、组织数据变得高效。',
      idea: '树是层次结构，根节点在上，叶子在下。二叉树每个节点最多两个孩子。遍历：前序（根左右）、中序（左根右）、后序（左右根）。二叉搜索树中序遍历是有序的。',
      analogy: { title: '家族族谱', md: '树像族谱：最上面是祖先（根节点），下面分叉出各房（子节点），最底层是还没生孩子的人（叶子节点）。查找一个人，从祖先开始，一层层往下找。' },
      points: [
        { title: '一、树的术语', md: '根节点：最顶层。叶子节点：没有孩子。深度：从根到该节点的层数。高度：从该节点到最深叶子的层数。度：孩子个数。' },
        { title: '二、二叉树', md: '每个节点最多两个孩子，分左孩子和右孩子。满二叉树：每层都满。完全二叉树：除最后一层外都满，最后一层靠左。' },
        { title: '三、三种遍历', md: '前序（根左右）：先访问根，再左子树，再右子树。中序（左根右）。后序（左右根）。用递归实现最自然。' },
        { title: '四、层序遍历', md: '一层一层从左到右访问，用队列实现。BFS 在树上的应用。' },
        { title: '五、二叉搜索树（BST）', md: '左子树所有节点 < 根 < 右子树所有节点。中序遍历结果是升序。查找、插入、删除平均 O(log n)。' },
        { title: '六、堆', md: '完全二叉树，父节点 >= 孩子（大顶堆）或 <= 孩子（小顶堆）。堆顶是最大/最小值，插入删除 O(log n)。' }
      ],
      table: {
        headers: ['遍历', '顺序', '递归实现', '应用'],
        rows: [
          ['前序', '根左右', '先访问，再递归左右', '复制树'],
          ['中序', '左根右', '先左，访问，再右', 'BST 得有序序列'],
          ['后序', '左右根', '先左右，再访问', '删除树'],
          ['层序', '逐层', '队列辅助', '找最短路径']
        ]
      },
      code: '# 二叉树节点\nclass TreeNode:\n  def __init__(self, val):\n    self.val = val\n    self.left = None\n    self.right = None\n\n# 前序遍历（递归）\ndef preorder(root):\n  if not root: return\n  print(root.val)      # 根\n  preorder(root.left)  # 左\n  preorder(root.right) # 右',
      quizIds: ['cbf-tree-1', 'cbf-tree-2', 'cbf-tree-3', 'cbf-tree-4'],
      example: {
        title: '手算二叉树遍历',
        steps: [
          { md: '树结构：根 A，左孩子 B，右孩子 C；B 的左孩子 D，右孩子 E。' },
          { md: '前序（根左右）：A → B → D → E → C。' },
          { md: '中序（左根右）：D → B → E → A → C。' },
          { md: '后序（左右根）：D → E → B → C → A。' },
          { md: '画出示意图，按顺序走一遍。' }
        ],
        takeaway: '遍历顺序看「根」的位置：前序根在前，中序根在中，后序根在后。'
      },
      example2: {
        title: '用 BST 快速查找',
        steps: [
          { md: 'BST：左子树 < 根 < 右子树。' },
          { md: '查找 5：从根 8 开始，5 < 8，去左子树。' },
          { md: '左子树根是 3，5 > 3，去右子树。' },
          { md: '右子树根是 5，找到。' },
          { md: '只走了 3 步，比遍历所有节点快。' }
        ],
        takeaway: 'BST 每次排除一半，查找效率 O(log n)。'
      },
      guided: [{ questionId: 'cbf-tree-1', hint: '前序是根-左-右。' }],
      solo: ['cbf-tree-2', 'cbf-tree-3'],
      challenge: ['cbf-tree-4'],
      summary: {
        essence: '树是层次结构，二叉树最多两个孩子。三种遍历：前序根左右，中序左根右，后序左右根。BST 中序遍历有序。',
        formulas: ['前序：根左右', '中序：左根右', '后序：左右根', 'BST：左 < 根 < 右'],
        pitfalls: ['混淆三种遍历', '忘记 BST 性质', '把深度和高度搞混'],
        checklist: ['我能手算遍历序列', '我理解 BST 的性质', '我会用递归遍历树', '我知道堆的特点']
      },
      feynman: '请用「家族族谱」的比喻，向同学解释树结构和三种遍历方式。'
    }),

    Z.makeLesson({
      id: 'cs-graph-L3', kpIds: ['cs-graph'], subject: 'cs', level: 3,
      title: '图与遍历：关系网的数据结构',
      estMinutes: 35,
      hookTitle: '六度人脉：你和总统之间只隔 6 个人',
      hookBody: '社交网络是一个巨大的图，每个人是节点，好友关系是边。图论告诉我们，任何两个人之间的最短路径不超过 6 步。',
      idea: '图由顶点和边组成，有向图边有方向，无向图边双向。BFS 用队列，一层层扩；DFS 用栈或递归，一条路走到黑。邻接表省空间，邻接矩阵查边快。',
      analogy: { title: '地铁线路图', md: '图像地铁线路图：站点是顶点，线路是边。BFS 像「一站站往外扩」，找最短换乘路线。DFS 像「一条线坐到底」，适合遍历所有站点。' },
      points: [
        { title: '一、图的表示', md: '邻接矩阵：二维数组，matrix[i][j]=1 表示 i 和 j 有边。邻接表：每个顶点存一个链表，列出所有邻居。' },
        { title: '二、有向图 vs 无向图', md: '有向图：边有方向，A→B 不等于 B→A。无向图：边双向，A-B 等于 B-A。邻接矩阵中无向图对称。' },
        { title: '三、BFS 广度优先', md: '一层层往外扩，像水波纹。用队列实现。用于找最短路径、层序遍历。' },
        { title: '四、DFS 深度优先', md: '一条路走到黑，回溯再走下一条。用栈或递归实现。用于拓扑排序、检测环。' },
        { title: '五、连通性与环', md: '连通图：任意两点可达。环：起点能回到起点。DFS 可检测环，BFS 可判断连通性。' },
        { title: '六、最短路径', md: 'BFS 找无权图最短路径。Dijkstra 算法找带权图最短路径。Floyd 算法找所有点对最短路径。' }
      ],
      table: {
        headers: ['算法', '数据结构', '特点', '应用'],
        rows: [
          ['BFS', '队列', '一层层扩，最短路径', '无权图最短路径'],
          ['DFS', '栈/递归', '一条路到底，回溯', '拓扑排序、检测环'],
          ['Dijkstra', '优先队列', '贪心，单源最短', '导航软件'],
          ['Floyd', '动态规划', '所有点对最短', '小规模图']
        ]
      },
      code: '# BFS 模板\nfrom collections import deque\n\ndef bfs(graph, start):\n  visited = set()\n  queue = deque([start])\n  visited.add(start)\n  while queue:\n    node = queue.popleft()\n    print(node)\n    for neighbor in graph[node]:\n      if neighbor not in visited:\n        visited.add(neighbor)\n        queue.append(neighbor)',
      quizIds: ['cbf-graph-1', 'cbf-graph-2', 'cbf-graph-3', 'cbf-graph-4'],
      example: {
        title: '用 BFS 找最短路径',
        steps: [
          { md: '图：A 连 B、C；B 连 D；C 连 D。找 A 到 D 的最短路径。' },
          { md: 'BFS：访问 A，把 B、C 入队。' },
          { md: '出队 B，访问，把 D 入队（D 未访问）。' },
          { md: '出队 C，访问，D 已在队中，跳过。' },
          { md: '出队 D，访问，路径 A→B→D 或 A→C→D，长度 2。' }
        ],
        takeaway: 'BFS 按层扩展，第一次到达目标就是最短路径。'
      },
      example2: {
        title: '用 DFS 检测环',
        steps: [
          { md: 'DFS 遍历，记录访问状态：未访问、访问中、已完成。' },
          { md: '遇到「访问中」的节点，说明有环。' },
          { md: '因为「访问中」表示在当前递归栈里，又回到它说明有回路。' },
          { md: '有向图检测环常用此法。' }
        ],
        takeaway: 'DFS 的三色标记法：白（未访问）、灰（访问中）、黑（已完成），遇灰有环。'
      },
      guided: [{ questionId: 'cbf-graph-1', hint: 'BFS 用队列，DFS 用栈。' }],
      solo: ['cbf-graph-2', 'cbf-graph-3'],
      challenge: ['cbf-graph-4'],
      summary: {
        essence: '图用顶点和边表示关系。BFS 用队列找最短路径，DFS 用栈/递归遍历。邻接表省空间，邻接矩阵查边快。',
        formulas: ['BFS：队列', 'DFS：栈/递归', '邻接表：O(V+E)', '邻接矩阵：O(V²)'],
        pitfalls: ['BFS 和 DFS 用错数据结构', '忘记标记已访问', '混淆邻接表和邻接矩阵'],
        checklist: ['我能用邻接表/矩阵表示图', '我会写 BFS 和 DFS', '我知道最短路径算法', '我能检测环']
      },
      feynman: '请用「地铁线路图」的比喻，向同学解释 BFS 和 DFS 的区别。'
    }),

    Z.makeLesson({
      id: 'cs-complexity-L2', kpIds: ['cs-complexity'], subject: 'cs', level: 2,
      title: '时间复杂度：算法的速度表',
      estMinutes: 35,
      hookTitle: 'n=100 万时，O(n²) 和 O(n log n) 差多少？',
      hookBody: 'O(n²) 是 1 万亿次操作，按每秒 10 亿次计算要 1000 秒。O(n log n) 是 2000 万次，只要 0.02 秒。差 5 万倍。',
      idea: '大 O 表示算法随输入增长的速度。O(1) 最快，O(log n) 很快，O(n) 线性，O(n log n) 高效排序，O(n²) 双重循环，O(2^n) 指数爆炸。',
      analogy: { title: '找单词', md: '查字典：O(1) 是知道页码直接翻；O(log n) 是二分查找，每次排除一半；O(n) 是从第一页开始逐页找；O(n²) 是每个字都和其他字比较一遍。' },
      points: [
        { title: '一、大 O 表示法', md: '忽略常数和低阶项，只看最高阶。3n² + 5n + 2 是 O(n²)。n² 起主导作用，n 和常数可忽略。' },
        { title: '二、常见复杂度', md: 'O(1) 常数：数组访问。O(log n) 对数：二分查找。O(n) 线性：一次遍历。O(n log n)：快排、归并。O(n²) 平方：冒泡、选择。O(2^n) 指数：递归枚举子集。' },
        { title: '三、数循环次数', md: '一层循环 n 次是 O(n)。两层嵌套 n×n 是 O(n²)。每次减半是 O(log n)。循环内是 O(1)，总复杂度由循环层数决定。' },
        { title: '四、最好、最坏、平均', md: '快排最好 O(n log n)，最坏 O(n²)，平均 O(n log n)。二分查找最坏 O(log n)。通常关注最坏情况。' },
        { title: '五、空间复杂度', md: '额外空间随输入增长的速度。O(1) 只用固定变量，O(n) 用等长数组。递归的空间复杂度看调用栈深度。' },
        { title: '六、复杂度对比表', md: 'n=1000 时：log n≈10，n=1000，n log n≈1 万，n²=100 万。n 越大，复杂度差距越明显。' }
      ],
      table: {
        headers: ['复杂度', 'n=1000', '例子', '评价'],
        rows: [
          ['O(1)', '1', '数组访问', '极快'],
          ['O(log n)', '10', '二分查找', '很快'],
          ['O(n)', '1000', '一次遍历', '可接受'],
          ['O(n log n)', '1 万', '快排', '高效'],
          ['O(n²)', '100 万', '冒泡排序', '慢'],
          ['O(2^n)', '天文数字', '递归枚举', '不可用']
        ]
      },
      code: '// O(n)：一层循环\nfor (i=0; i<n; i++) sum++;\n\n// O(n²)：两层循环\nfor (i=0; i<n; i++)\n  for (j=0; j<n; j++) sum++;\n\n// O(log n)：每次减半\nwhile (n > 1) { n = n/2; count++; }',
      quizIds: ['cbf-bigo-1', 'cbf-bigo-2', 'cbf-bigo-3', 'cbf-bigo-4'],
      example: {
        title: '分析代码时间复杂度',
        steps: [
          { md: '代码：for (i=0; i<n; i++) for (j=0; j<m; j++) sum++;。' },
          { md: '外层 n 次，内层 m 次，总 n×m 次。' },
          { md: '时间复杂度 O(n×m)，不是 O(n²)，因为 m 和 n 可能不同。' },
          { md: '如果 m=n，才是 O(n²)。' }
        ],
        takeaway: '看循环层数和每层次数，不要看到两层就写 n²。'
      },
      example2: {
        title: '为什么二分查找是 O(log n)',
        steps: [
          { md: '初始范围 n，每次排除一半。' },
          { md: '第 1 次后范围 n/2，第 2 次后 n/4，第 k 次后 n/2^k。' },
          { md: '直到范围是 1：n/2^k = 1，解得 k = log₂n。' },
          { md: '所以最多比较 log₂n 次。' }
        ],
        takeaway: '每次排除一半，就是对数级别的来源。'
      },
      guided: [{ questionId: 'cbf-bigo-2', hint: '两层循环，每层 n 次，总 n² 次。' }],
      solo: ['cbf-bigo-1', 'cbf-bigo-3'],
      challenge: ['cbf-bigo-4'],
      summary: {
        essence: '大 O 表示增长速度。O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(2^n)。数循环次数，看最高阶。',
        formulas: ['一层循环 O(n)', '两层嵌套 O(n²)', '每次减半 O(log n)', '递归深度决定空间'],
        pitfalls: ['混淆 n 和 n²', '忘记空间复杂度', '把最好情况当平均'],
        checklist: ['我能分析代码复杂度', '我记得常见复杂度排序', '我知道最好最坏平均', '我会算空间复杂度']
      },
      feynman: '请用「查字典」的比喻，向同学解释 O(1)、O(log n)、O(n)、O(n²) 的区别。'
    }),

    Z.makeLesson({
      id: 'cs-network-app-L2', kpIds: ['cs-network-app'], subject: 'cs', level: 2,
      title: '网络应用与协议：网络世界的语言规则',
      estMinutes: 30,
      hookTitle: '为什么发邮件和看网页用不同的协议？',
      hookBody: '因为不同的应用有不同的需求：邮件要可靠送达，网页要快速加载，文件传输要完整。协议就是网络世界的「语言规则」，规定了怎么说话、怎么理解。',
      idea: '协议是网络通信的规则。HTTP 用于网页，SMTP 用于发邮件，FTP 用于传文件，DNS 用于域名解析。C/S 架构要安装客户端，B/S 架构只需浏览器。',
      analogy: { title: '不同的交通工具', md: 'HTTP 像公交车，按站停靠，适合日常通勤（网页浏览）。SMTP 像快递，保证送达，适合重要文件（邮件）。FTP 像搬家货车，专门运大件（文件传输）。DNS 像 114 查号台，帮你找到对方的电话号码（IP 地址）。' },
      points: [
        { title: '一、HTTP/HTTPS：网页协议', md: 'HTTP 用于浏览器和服务器之间的网页传输，端口 80。HTTPS 是 HTTP + TLS/SSL，加密传输，端口 443。现在网站基本都用 HTTPS。' },
        { title: '二、SMTP/POP3/IMAP：邮件协议', md: 'SMTP 负责发送邮件，端口 25。POP3 和 IMAP 负责接收邮件。POP3 下载到本地，IMAP 在服务器上同步。' },
        { title: '三、FTP：文件传输协议', md: 'FTP 用于上传下载文件，端口 21。需要账号密码登录，现在多用 SFTP（SSH 加密）或云盘替代。' },
        { title: '四、DNS：域名解析协议', md: '把域名翻译成 IP 地址，端口 53。没有 DNS，我们就要记一串数字访问网站。' },
        { title: '五、C/S 与 B/S 架构', md: 'C/S（Client/Server）：需要安装专用客户端，如 QQ、微信。B/S（Browser/Server）：只需浏览器，如网页版邮箱、在线文档。' },
        { title: '六、协议分层协作', md: '应用层协议（HTTP、SMTP）靠传输层协议（TCP、UDP）传输，传输层靠网络层（IP）寻址。每层各司其职，上层不用管下层细节。' }
      ],
      table: {
        headers: ['协议', '用途', '端口', '传输层'],
        rows: [
          ['HTTP', '网页浏览', '80', 'TCP'],
          ['HTTPS', '加密网页', '443', 'TCP'],
          ['SMTP', '发送邮件', '25', 'TCP'],
          ['FTP', '文件传输', '21', 'TCP'],
          ['DNS', '域名解析', '53', 'UDP 为主']
        ]
      },
      code: '// 常见端口速查\n80   HTTP\n443  HTTPS\n21   FTP\n22   SSH\n25   SMTP\n53   DNS\n110  POP3\n143  IMAP',
      quizIds: ['cbf-napp-1', 'cbf-napp-2', 'cbf-napp-3', 'cbf-napp-4'],
      example: {
        title: '为什么现在网站都用 HTTPS',
        steps: [
          { md: 'HTTP 传输是明文，可以被中间人窃取。' },
          { md: 'HTTPS 在 HTTP 外加了一层 TLS/SSL 加密。' },
          { md: '即使被截获，攻击者也看不懂内容。' },
          { md: '搜索引擎对 HTTPS 网站排名更靠前。' },
          { md: '浏览器对 HTTP 网站会标记「不安全」。' }
        ],
        takeaway: 'HTTPS = HTTP + 加密，保护隐私和完整性。'
      },
      example2: {
        title: 'C/S 和 B/S 的选择',
        steps: [
          { md: 'QQ、微信：功能复杂，需要高性能，选 C/S。' },
          { md: '在线文档：需要跨平台、免安装，选 B/S。' },
          { md: '企业管理系统：内部使用，功能固定，C/S 或 B/S 都可以。' },
          { md: '趋势：B/S 越来越流行，因为浏览器能力越来越强。' }
        ],
        takeaway: '要性能选 C/S，要便捷选 B/S。'
      },
      guided: [{ questionId: 'cbf-napp-2', hint: 'C/S 要装客户端，B/S 只需浏览器。' }],
      solo: ['cbf-napp-1', 'cbf-napp-3'],
      challenge: ['cbf-napp-4'],
      summary: {
        essence: '协议是网络通信的规则。HTTP 看网页，SMTP 发邮件，FTP 传文件，DNS 解析域名。C/S 要安装，B/S 免安装。',
        formulas: ['HTTP:80, HTTPS:443', 'SMTP:25, FTP:21, DNS:53', 'C/S：客户端+服务器', 'B/S：浏览器+服务器'],
        pitfalls: ['混淆 SMTP 和 POP3', '忘记 HTTPS 端口', '以为 DNS 用 TCP'],
        checklist: ['我能说出常见协议和端口', '我能区分 C/S 和 B/S', '我知道 HTTPS 的作用', '我理解协议分层']
      },
      feynman: '请用「交通工具」的比喻，向同学解释 HTTP、SMTP、FTP、DNS 的区别。'
    })
  );
})(window.ZSB = window.ZSB || {});
