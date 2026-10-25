/* 软件工程模块包：6 个考点 + 6 份完整讲义 + 24 道题 */
(function (Z) {
  Z.addKps([
    { id: 'se-lifecycle', subject: 'cs', chapter: '软件工程', title: '软件生命周期与需求分析', level: 1, examWeight: 0.04, prerequisites: [], examCount: 5, examPoints: 16, outcome: '能说出各阶段产出，区分功能需求与非功能需求，写出验收标准', note: '需求没定清楚，写得越快错得越远' },
    { id: 'se-git', subject: 'cs', chapter: '软件工程', title: 'Git 与版本控制', level: 2, examWeight: 0.04, prerequisites: ['se-lifecycle'], examCount: 5, examPoints: 16, outcome: '能用暂存区、分支、远程仓库完成日常协作，会解冲突', note: '提交前先看 diff，能挡住大部分误提交' },
    { id: 'se-test', subject: 'cs', chapter: '软件工程', title: '测试与调试', level: 2, examWeight: 0.04, prerequisites: ['se-lifecycle'], examCount: 5, examPoints: 18, outcome: '能设计等价类与边界用例，按步骤复现并定位缺陷', note: '测试负责发现，调试负责解释，别混为一谈' },
    { id: 'se-design', subject: 'cs', chapter: '软件工程', title: '设计模式与架构', level: 3, examWeight: 0.05, prerequisites: ['se-lifecycle'], examCount: 5, examPoints: 20, outcome: '能说明常用模式解决什么问题，按 SOLID 判断耦合方向', note: '抽象应该由第二次真实变化驱动，而不是想象' },
    { id: 'se-agile', subject: 'cs', chapter: '软件工程', title: '敏捷开发与团队协作', level: 2, examWeight: 0.03, prerequisites: ['se-lifecycle'], examCount: 4, examPoints: 14, outcome: '能说出 Scrum 角色与会议，把需求拆成短周期可交付任务', note: '敏捷不是不写文档，而是缩短反馈周期' },
    { id: 'se-doc', subject: 'cs', chapter: '软件工程', title: '文档、注释与代码规范', level: 1, examWeight: 0.03, prerequisites: ['se-lifecycle'], examCount: 4, examPoints: 12, outcome: '能写出可用的 README、函数注释和清晰的命名', note: '代码读的时间远多于写的时间' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- se-lifecycle ---------- */
    { id: 'se-lifecycle-1', kpIds: ['se-lifecycle'], subject: 'cs', type: 'single',
      stem: '需求规格说明书（SRS）主要在哪个阶段产出？',
      options: ['可行性研究', '需求分析', '概要设计', '系统维护'],
      answer: 'B',
      analysis: { ans: 'B', why: '需求分析阶段把用户诉求整理成可评审、可验收的需求规格说明书，它是后续设计、开发和测试的依据。', steps: '1. 可行性研究判断「值不值得做」。\n2. 需求分析明确「做什么、做到什么程度」，产出 SRS。\n3. 设计阶段才回答「怎么做」。', pit: 'SRS 写的是需求，不是实现方案；不要把数据库表结构提前塞进去。' }, difficulty: 1, estSeconds: 35, skillTag: '生命周期', source: '自建' },
    { id: 'se-lifecycle-2', kpIds: ['se-lifecycle'], subject: 'cs', type: 'single',
      stem: '下列哪一项属于非功能需求？',
      options: ['用户可以按姓名搜索订单', '系统支持导出 PDF 报表', '首页在 2 秒内加载完成', '用户可以修改收货地址'],
      answer: 'C',
      analysis: { ans: 'C', why: '响应时间、并发量、可用性、安全性描述的是「做到什么程度」，属于非功能需求；其余三项描述系统能做什么。', steps: '1. 功能需求回答系统提供哪些能力。\n2. 非功能需求回答这些能力的质量指标。\n3. 2 秒内加载完成是性能指标，属于非功能需求。', pit: '非功能需求同样要写进验收标准，否则上线才发现性能不达标，改造成本很高。' }, difficulty: 2, estSeconds: 40, skillTag: '需求分类', source: '自建' },
    { id: 'se-lifecycle-3', kpIds: ['se-lifecycle'], subject: 'cs', type: 'fill',
      stem: '瀑布模型通常按「需求 → 设计 → 编码 → ______ → 维护」推进。',
      answer: '测试', accept: ['测试', '测试阶段', 'testing'],
      analysis: { ans: '测试', why: '编码之后要先验证功能与质量，再交付给用户进入长期维护，测试是瀑布模型中承上启下的阶段。', steps: '1. 需求与设计确定预期。\n2. 编码实现功能。\n3. 测试对照需求验证结果。\n4. 通过后交付并进入维护。', pit: '瀑布不是「写完就上线」，测试和评审是必经环节。' }, difficulty: 1, estSeconds: 30, skillTag: '瀑布模型', source: '自建' },
    { id: 'se-lifecycle-4', kpIds: ['se-lifecycle'], subject: 'cs', type: 'fill',
      stem: '描述系统「必须提供哪些能力」的需求，称为 ______ 需求。',
      answer: '功能', accept: ['功能', '功能需求', 'functional'],
      analysis: { ans: '功能', why: '功能需求描述系统应当提供的行为，如登录、下单、退款；它通常可以用用例或用户故事表达。', steps: '1. 找出角色。\n2. 描述角色要完成的目标。\n3. 写出系统应有的响应与结果。', pit: '功能需求要配验收标准，否则「做完了」没有共同定义。' }, difficulty: 1, estSeconds: 30, skillTag: '功能需求', source: '自建' },

    /* ---------- se-git ---------- */
    { id: 'se-git-1', kpIds: ['se-git'], subject: 'cs', type: 'single',
      stem: 'git add 的作用是什么？',
      options: ['把改动提交到本地仓库', '把工作区的改动放入暂存区', '把改动推送到远程仓库', '撤销上一次提交'],
      answer: 'B',
      analysis: { ans: 'B', why: 'git add 把选中的改动写入暂存区，下一次 git commit 只会提交暂存区里的内容。', steps: '1. 工作区修改文件。\n2. git add 选择本次要提交的改动。\n3. git commit 把暂存区内容存成一次提交。', pit: 'add 不等于 commit，更不等于 push；三步各自负责不同区域。' }, difficulty: 1, estSeconds: 30, skillTag: '暂存区', source: '自建' },
    { id: 'se-git-2', kpIds: ['se-git'], subject: 'cs', type: 'single',
      stem: '你已经 commit 了一次但还没 push，想撤销这次提交并保留改动在暂存区，应该用哪条命令？',
      options: ['git reset --soft HEAD~1', 'git reset --hard HEAD~1', 'git checkout -- .', 'git clean -fd'],
      answer: 'A',
      analysis: { ans: 'A', why: '--soft 只移动分支指针，不改工作区和暂存区，所以提交被撤销但改动仍然保留并处于暂存状态。', steps: '1. HEAD~1 表示上一次提交。\n2. --soft 保留暂存区内容。\n3. 重新修改后可以再次 commit。', pit: '--hard 会连工作区改动一起丢掉，除非确认不要了，否则不要用。' }, difficulty: 3, estSeconds: 50, skillTag: '撤销提交', source: '自建' },
    { id: 'se-git-3', kpIds: ['se-git'], subject: 'cs', type: 'fill',
      stem: '查看当前工作区与暂存区状态，使用 git ______。',
      answer: 'status', accept: ['status', 'git status'],
      analysis: { ans: 'status', why: 'git status 显示哪些文件被修改、哪些已暂存、当前在哪个分支，是提交前最该先看的命令。', steps: '1. 修改文件后执行 git status。\n2. 红色表示未暂存，绿色表示已暂存。\n3. 根据提示决定 add 或继续修改。', pit: 'status 只显示状态，不显示具体差异；看差异要用 git diff。' }, difficulty: 1, estSeconds: 25, skillTag: '状态查看', source: '自建' },
    { id: 'se-git-4', kpIds: ['se-git'], subject: 'cs', type: 'fill',
      stem: '把远程仓库的最新提交拉取并合并到当前分支，使用 git ______。',
      answer: 'pull', accept: ['pull', 'git pull'],
      analysis: { ans: 'pull', why: 'git pull 相当于 fetch 加 merge，先把远程更新下载到本地，再合并进当前分支。', steps: '1. git pull 从默认远程拉取。\n2. 下载新提交。\n3. 自动合并到当前分支。', pit: '本地有未提交改动时 pull 可能失败或产生冲突，先 commit 或 stash 更稳。' }, difficulty: 1, estSeconds: 25, skillTag: '远程协作', source: '自建' },

    /* ---------- se-test ---------- */
    { id: 'se-test-1', kpIds: ['se-test'], subject: 'cs', type: 'single',
      stem: '单元测试主要针对什么？',
      options: ['整个系统的端到端流程', '最小可测单元，如一个函数或类', '数据库的表结构', '用户界面的视觉效果'],
      answer: 'B',
      analysis: { ans: 'B', why: '单元测试把被测代码隔离出来，验证一个函数或类的输入输出是否符合预期，速度快、定位准。', steps: '1. 选定一个函数。\n2. 给定输入与预期输出。\n3. 执行并断言结果相等。', pit: '单元测试不应依赖真实网络和数据库，否则会变慢且不稳定。' }, difficulty: 1, estSeconds: 30, skillTag: '单元测试', source: '自建' },
    { id: 'se-test-2', kpIds: ['se-test'], subject: 'cs', type: 'single',
      stem: '只依据输入和输出设计用例、不关心内部实现，这种测试方法叫？',
      options: ['白盒测试', '黑盒测试', '回归测试', '压力测试'],
      answer: 'B',
      analysis: { ans: 'B', why: '黑盒测试把系统当作一个盒子，只通过输入和输出来验证行为，不依赖代码结构。', steps: '1. 从需求提取输入范围。\n2. 设计有代表性的输入。\n3. 对照预期输出判断通过与否。', pit: '白盒测试看内部逻辑与分支覆盖；两者互补，不是互相替代。' }, difficulty: 2, estSeconds: 35, skillTag: '黑盒测试', source: '自建' },
    { id: 'se-test-3', kpIds: ['se-test'], subject: 'cs', type: 'fill',
      stem: '修改代码后重新执行原有测试，确认没有破坏旧功能，这叫 ______ 测试。',
      answer: '回归', accept: ['回归', '回归测试', 'regression'],
      analysis: { ans: '回归', why: '回归测试用已有用例检查改动是否引入新问题，是持续集成里每次提交都会跑的那一批测试。', steps: '1. 代码改动完成。\n2. 重新运行原有测试集。\n3. 有失败就说明改动影响了旧行为。', pit: '修 bug 时先补一条能复现它的测试，修复后它就成为回归测试的一部分。' }, difficulty: 2, estSeconds: 35, skillTag: '回归测试', source: '自建' },
    { id: 'se-test-4', kpIds: ['se-test'], subject: 'cs', type: 'fill',
      stem: '定位缺陷根因并修复的过程，叫做 ______。',
      answer: '调试', accept: ['调试', 'debug', 'debugging'],
      analysis: { ans: '调试', why: '调试是在复现问题之后，通过日志、断点和假设验证找出根因，再针对根因修改代码。', steps: '1. 稳定复现问题。\n2. 缩小范围，定位到具体模块与输入。\n3. 验证假设并修复。\n4. 补回归测试。', pit: '调试不是随便改代码试；每次只改一个变量，才能知道是哪一步生效。' }, difficulty: 1, estSeconds: 30, skillTag: '调试', source: '自建' },

    /* ---------- se-design ---------- */
    { id: 'se-design-1', kpIds: ['se-design'], subject: 'cs', type: 'single',
      stem: '单例模式的核心目的是什么？',
      options: ['让一个类可以被多次继承', '保证一个类只有一个实例并提供统一访问点', '让对象之间自动通知', '把一种接口转换成另一种接口'],
      answer: 'B',
      analysis: { ans: 'B', why: '单例把构造过程藏起来，只暴露一个获取实例的方法，适合配置、连接池这类全局唯一的资源。', steps: '1. 私有化构造。\n2. 内部保存唯一实例。\n3. 提供静态方法返回该实例。', pit: '单例本质上是全局状态，会让依赖隐藏、测试难隔离，能传参就不要从单例取。' }, difficulty: 2, estSeconds: 40, skillTag: '单例模式', source: '自建' },
    { id: 'se-design-2', kpIds: ['se-design'], subject: 'cs', type: 'single',
      stem: '观察者模式最适合下列哪个场景？',
      options: ['一个对象的状态变化需要通知多个订阅者', '需要限制某个类只能创建一个对象', '需要在不修改原对象的情况下叠加功能', '需要把两个不兼容的接口接起来'],
      answer: 'A',
      analysis: { ans: 'A', why: '观察者模式建立一对多依赖：主题状态变化时，依次通知所有订阅者，订阅者可以自由增减。', steps: '1. 主题维护订阅者列表。\n2. 提供订阅与取消订阅方法。\n3. 状态变化时遍历列表通知。', pit: '观察者过多或通知链过长时，问题难排查，要注意避免循环通知。' }, difficulty: 3, estSeconds: 45, skillTag: '观察者模式', source: '自建' },
    { id: 'se-design-3', kpIds: ['se-design'], subject: 'cs', type: 'fill',
      stem: 'MVC 架构中的 M 指的是 ______。',
      answer: 'Model', accept: ['Model', '模型', 'model', '模型层'],
      analysis: { ans: 'Model', why: 'MVC 由 Model（数据与业务规则）、View（展示）、Controller（接收输入并协调）三部分组成。', steps: '1. Model 负责数据与业务逻辑。\n2. View 负责界面展示。\n3. Controller 接收用户操作，调用 Model 并更新 View。', pit: 'Model 不等于数据库表；它包含业务规则，不只是数据容器。' }, difficulty: 1, estSeconds: 30, skillTag: 'MVC', source: '自建' },
    { id: 'se-design-4', kpIds: ['se-design'], subject: 'cs', type: 'fill',
      stem: '依赖倒置原则要求高层模块和低层模块都依赖 ______，而不是互相依赖具体实现。',
      answer: '抽象', accept: ['抽象', '接口', 'abstraction'],
      analysis: { ans: '抽象', why: '高层定义接口，低层实现接口，依赖方向从「高层依赖低层」反转为「双方依赖抽象」，便于替换与测试。', steps: '1. 业务层定义所需能力的接口。\n2. 数据层实现该接口。\n3. 业务层只依赖接口，不关心具体实现。', pit: '依赖倒置不是让所有类都加接口；只有当实现可能变化、需要替换或隔离测试时才值得抽象。' }, difficulty: 3, estSeconds: 45, skillTag: 'SOLID', source: '自建' },

    /* ---------- se-agile ---------- */
    { id: 'se-agile-1', kpIds: ['se-agile'], subject: 'cs', type: 'single',
      stem: 'Scrum 中一个固定长度的迭代周期称为什么？',
      options: ['Milestone', 'Sprint', 'Release', 'Backlog'],
      answer: 'B',
      analysis: { ans: 'Sprint', why: 'Sprint 是 Scrum 的迭代容器，通常 1 到 4 周，每个 Sprint 结束时都应产出可演示的成果。', steps: '1. Sprint 计划会确定本轮目标。\n2. 团队在 Sprint 内完成选中的任务。\n3. Sprint 评审会演示成果。', pit: 'Sprint 长度一旦确定就应保持稳定，频繁变动会破坏节奏与估算。' }, difficulty: 1, estSeconds: 30, skillTag: 'Scrum', source: '自建' },
    { id: 'se-agile-2', kpIds: ['se-agile'], subject: 'cs', type: 'single',
      stem: '每日站会的主要目的是什么？',
      options: ['向领导详细汇报工作量', '同步进展、计划与阻塞，控制在 15 分钟内', '逐行评审代码', '制定下个季度的路线图'],
      answer: 'B',
      analysis: { ans: 'B', why: '站会是一次短同步：昨天做了什么、今天做什么、有什么阻塞，重点是暴露问题而不是汇报表演。', steps: '1. 围绕任务板逐个同步。\n2. 记录阻塞并会后处理。\n3. 控制在 15 分钟内，细节另开会。', pit: '站会变成领导训话或技术讨论，就会失去同步节奏的作用。' }, difficulty: 2, estSeconds: 35, skillTag: '站会', source: '自建' },
    { id: 'se-agile-3', kpIds: ['se-agile'], subject: 'cs', type: 'fill',
      stem: '敏捷宣言第一条：______ 和互动 高于 流程和工具。',
      answer: '个体', accept: ['个体', '个人', '个体和互动'],
      analysis: { ans: '个体', why: '敏捷认为真正交付价值的是人和人之间的协作，流程和工具只是辅助；右边仍有价值，只是左边优先。', steps: '1. 记住四条价值观。\n2. 个体和互动排在第一。\n3. 遇到冲突时优先保障沟通与协作。', pit: '敏捷不是不要流程，而是不让流程压过人和协作。' }, difficulty: 2, estSeconds: 35, skillTag: '敏捷价值观', source: '自建' },
    { id: 'se-agile-4', kpIds: ['se-agile'], subject: 'cs', type: 'fill',
      stem: 'Scrum 中负责维护产品待办列表并确定优先级的人，叫 ______。',
      answer: '产品负责人', accept: ['产品负责人', 'Product Owner', 'PO', '产品经理'],
      analysis: { ans: '产品负责人', why: '产品负责人（PO）代表客户与业务，管理产品待办列表的顺序，决定下一轮先做什么。', steps: '1. 收集需求形成产品待办列表。\n2. 按价值与成本排优先级。\n3. 在计划会上与团队确认本轮目标。', pit: 'PO 不是发号施令的老板，而是对「做什么最有价值」负责的人。' }, difficulty: 2, estSeconds: 35, skillTag: 'Scrum 角色', source: '自建' },

    /* ---------- se-doc ---------- */
    { id: 'se-doc-1', kpIds: ['se-doc'], subject: 'cs', type: 'single',
      stem: '好的代码注释最应该说明什么？',
      options: ['每一行代码的字面含义', '为什么这样写，以及有哪些约束和坑', '作者的姓名和编写日期', '变量占用的内存大小'],
      answer: 'B',
      analysis: { ans: 'B', why: '代码本身已经说明了「做了什么」，注释的价值在于补充代码看不出来的意图、约束、外部依赖和踩过的坑。', steps: '1. 先让命名和结构自解释。\n2. 只对看不出意图的地方写注释。\n3. 重点写为什么、限制条件和注意事项。', pit: '注释重复代码字面意思，会让读者多读一遍却没有新信息。' }, difficulty: 1, estSeconds: 30, skillTag: '注释', source: '自建' },
    { id: 'se-doc-2', kpIds: ['se-doc'], subject: 'cs', type: 'single',
      stem: '关于命名，下列做法更合适的是？',
      options: ['用 a1、b2 这类短名字，输入更快', '用业务含义清晰的词，如 orderTotal', '同一个含义在不同文件里用不同叫法', '名字越长越好，把所有信息都塞进去'],
      answer: 'B',
      analysis: { ans: 'B', why: '命名应让人不读实现就能猜到含义，统一用业务词，布尔值用 is 或 has 开头，避免无意义缩写。', steps: '1. 用业务概念命名。\n2. 同一概念全项目统一叫法。\n3. 长度与作用域匹配，短作用域可短，长作用域要清楚。', pit: '过度缩写和同义词混用，是团队沟通成本的主要来源。' }, difficulty: 1, estSeconds: 30, skillTag: '命名规范', source: '自建' },
    { id: 'se-doc-3', kpIds: ['se-doc'], subject: 'cs', type: 'fill',
      stem: '写在函数开头、说明参数与返回值的注释，通常称为 ______ 注释。',
      answer: '文档', accept: ['文档', '文档注释', 'docstring', 'JSDoc'],
      analysis: { ans: '文档', why: '文档注释按固定格式描述参数、返回值与异常，工具可以据此生成接口文档，调用方不必读实现。', steps: '1. 函数上方写注释块。\n2. 标注每个参数的含义。\n3. 说明返回值与可能的异常。', pit: '只写「这个函数用于计算」没有信息量，要写清参数范围和返回值含义。' }, difficulty: 2, estSeconds: 35, skillTag: '文档注释', source: '自建' },
    { id: 'se-doc-4', kpIds: ['se-doc'], subject: 'cs', type: 'fill',
      stem: '语义化版本 x.y.z 中，修复 bug 时递增的是 ______ 位（即 z）。',
      answer: '修订号', accept: ['修订号', '修订', '补丁号', '补丁', 'patch', 'z'],
      analysis: { ans: '修订号', why: '语义化版本约定：主版本改不兼容变更，次版本加功能，修订号只做向下兼容的 bug 修复。', steps: '1. 不兼容改动：x 加一，y 和 z 归零。\n2. 新增功能：y 加一，z 归零。\n3. 修复 bug：只加 z。', pit: '修 bug 却改了主版本号，会让依赖方误以为有破坏性变更。' }, difficulty: 2, estSeconds: 35, skillTag: '版本规范', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'se-lifecycle-L1', kpIds: ['se-lifecycle'], subject: 'cs', level: 1,
      title: '软件生命周期：从想法到能用的东西',
      estMinutes: 40,
      hookTitle: '为什么「先写代码再说」几乎一定会返工？',
      hookBody: '因为代码只是实现。需求、边界、验收标准没定清楚，写得越快错得越远。生命周期把「想清楚」和「做出来」拆成可检查的阶段。',
      idea: '软件生命周期是软件从**需求**到**退役**的全过程：需求分析、设计、编码、测试、维护。不同模型（瀑布、原型、迭代）只是把这些阶段排成不同的节奏。',
      diagramId: 'loop-flow', diagramCaption: '瀑布按阶段直线推进；迭代把一轮流程反复走，每轮都交付可用版本',
      analogy: { title: '盖房子', md: '先确认要几间房、谁住，这是需求；再画图纸，这是设计；然后施工、验收，住进去后还要维修。图纸没定就砌墙，返工最贵。' },
      points: [
        { title: '一、五个基本阶段', md: '需求分析确定做什么，设计确定怎么做，编码实现，测试验证，维护修正与演进。阶段可以重叠，但每件事都必须有人负责、有产出物。' },
        { title: '二、瀑布模型', md: '阶段严格顺序、文档驱动、每阶段评审后才进入下一阶段。适合需求稳定、变更少的项目，例如嵌入式设备、招投标类系统。' },
        { title: '三、迭代与原型', md: '需求不确定时，先做一个能跑的最小版本给用户看，再根据反馈修正。原型是为了澄清需求，不一定要直接变成最终产品。' },
        { title: '四、功能需求与非功能需求', md: '功能需求说系统能做什么，如下单、退款；非功能需求说做到什么程度，如响应时间、并发量、可用性、安全性。两类都要写进验收标准。' },
        { title: '五、用例与用户故事', md: '用例写「谁在什么场景下做什么、系统如何响应」；用户故事写「作为某角色，我想要某功能，以便获得某价值」，并配可验证的验收标准。' },
        { title: '六、需求规格说明书', md: '包含范围、功能列表、非功能指标、约束条件和验收标准。它的价值是让开发、测试、甲方对「做完了」有同一个定义，减少后期扯皮。' },
        { title: '七、需求变更与追溯', md: '每条需求有编号，设计、代码、测试用例都能追溯到它。变更要走评审，评估工作量和影响，而不是口头一句「顺便改一下」。' }
      ],
      table: {
        headers: ['模型', '适用场景', '主要风险'],
        rows: [
          ['瀑布', '需求稳定、变更少', '后期才发现需求理解错'],
          ['原型', '需求模糊、需要澄清', '原型被误当成成品'],
          ['迭代', '需求逐步明确', '节奏失控、每轮都想加需求']
        ]
      },
      code: '作为 学生\n我想要 按章节筛选题目\n以便 只练当前章节\n\n验收标准：\n1. 选择章节后，题目列表只剩该章节\n2. 清空筛选后恢复全部题目\n3. 无结果时显示空状态提示',
      warning: '「非功能需求」最容易被漏掉。等到上线才发现要支持 5000 并发、要过等保，改造成本远高于一开始就写进验收标准。',
      tip: '拿到一句话需求，先追问三件事：谁用、什么场景、怎样算做完。答案就是用例和验收标准的骨架。',
      quizIds: ['se-lifecycle-1', 'se-lifecycle-2', 'se-lifecycle-3', 'se-lifecycle-4'],
      example: {
        title: '把「做个题库搜索」拆成需求与验收标准',
        steps: [
          { md: '角色：备考学生；场景：只想练某一章。' },
          { md: '功能需求：按章节筛选，清空筛选恢复全部。' },
          { md: '非功能需求：输入关键词后 1 秒内出结果，移动端可用。' },
          { md: '验收标准写成可勾选的条目，测试照着逐条验证。' }
        ],
        takeaway: '需求写到能验收的程度，才算真的写完了。'
      },
      example2: {
        title: '判断功能需求与非功能需求',
        steps: [
          { md: '「用户可以修改密码」描述能力，是功能需求。' },
          { md: '「密码必须加密存储」描述安全约束，是非功能需求。' },
          { md: '「列表支持分页」是功能需求。' },
          { md: '「列表在 4G 网络下 2 秒内打开」是性能指标，属于非功能需求。' }
        ],
        takeaway: '能做什么是功能，做到什么程度是非功能。'
      },
      guided: [{ questionId: 'se-lifecycle-1', hint: 'SRS 是需求阶段的产出，不是设计文档。' }],
      solo: ['se-lifecycle-2', 'se-lifecycle-3'],
      challenge: ['se-lifecycle-4'],
      summary: {
        essence: '生命周期把需求、设计、编码、测试、维护排成节奏；需求要写成可验收的标准。',
        formulas: ['需求 → 设计 → 编码 → 测试 → 维护', '用户故事 = 角色 + 功能 + 价值 + 验收标准'],
        pitfalls: ['把非功能需求漏掉', '需求只写一句话没有验收标准', '原型直接当成品交付', '变更不走评审'],
        checklist: ['我能说出五个阶段的产出', '我能区分功能与非功能需求', '我会写用户故事和验收标准', '我知道瀑布与迭代的适用场景']
      },
      feynman: '请用盖房子的比喻，说明为什么需求阶段没定清楚会导致返工。'
    }),

    Z.makeLesson({
      id: 'se-git-L2', kpIds: ['se-git'], subject: 'cs', level: 2,
      title: 'Git：把每一次改动存成可回退的历史',
      estMinutes: 45,
      hookTitle: '为什么不能只用「最终版」「最终版2」来管代码？',
      hookBody: '因为你需要知道改了什么、为什么改、谁改的，还要能回到任意一个可用版本。Git 用提交快照和分支把这些事变成常规操作。',
      idea: 'Git 是**分布式**版本控制系统。每次 commit 都是一份完整快照，指向它的父提交；分支只是一个指向提交的轻量指针，所以创建和切换几乎零成本。',
      diagramId: 'git-flow', diagramCaption: '工作区改文件，git add 放进暂存区，git commit 写入本地仓库',
      analogy: { title: '游戏存档', md: '工作区是正在打的这一局，暂存区是你挑好要保存的进度，commit 是存档点，push 是把存档同步到云端。存错了可以读档，但已经推给别人再改写历史就会影响队友。' },
      points: [
        { title: '一、三个区域', md: '工作区是你能看到的文件；暂存区记录下一次提交要包含哪些改动；本地仓库保存提交历史。add 是从工作区到暂存区，commit 是从暂存区到仓库。' },
        { title: '二、第一次使用要配置身份', md: 'git config --global user.name 与 user.email 决定提交记录里的作者信息。配错了，历史里会留下错误的身份，后续很难干净地修正。' },
        { title: '三、日常五条命令', md: 'status 看状态，diff 看未暂存改动，add 选改动，commit -m 提交，log --oneline 看历史。先看再提交，能避免把调试代码和密钥带进去。' },
        { title: '四、分支与合并', md: 'branch 查看分支，checkout -b 功能名 新建并切换，merge 把另一条分支合进来。小步提交、单一职责的分支更容易审查和回滚。' },
        { title: '五、远程协作', md: 'clone 复制仓库，pull 拉取并合并，push 推送，fetch 只下载不合并。push 前先 pull，能减少冲突面，也能早点发现别人改了同一块。' },
        { title: '六、冲突的本质', md: '两个人改了同一文件的同一区域，Git 无法替你决定保留谁。打开冲突标记，理解两边意图，手工合成一个正确结果，再 add 和 commit。' },
        { title: '七、提交信息与原子提交', md: '一次提交只做一件事，信息写「为什么改」而不是「改了啥」。这样的历史才能用来定位问题和回滚，而不是变成流水账。' }
      ],
      table: {
        headers: ['命令', '作用', '注意'],
        rows: [
          ['git add 文件', '放入暂存区', '只选本次要提交的改动'],
          ['git commit -m', '写入本地仓库', '信息写为什么改'],
          ['git pull', '拉取并合并远程', '先处理本地未提交改动'],
          ['git push', '推送本地提交', '推送前先拉取']
        ]
      },
      code: 'git status\ngit add js/app.js\ngit commit -m "fix: 修复登录按钮无响应"\ngit checkout -b feature/export\ngit push -u origin feature/export',
      warning: '不要对已经推送并被他人使用的分支执行 git push --force 改写历史，会把别人的提交覆盖掉。确实需要时先沟通并改用 --force-with-lease。',
      tip: '提交前跑一遍 git diff --staged，确认暂存区里只有这次想提交的内容；这是防止误提交密钥和调试代码最有效的一步。',
      quizIds: ['se-git-1', 'se-git-2', 'se-git-3', 'se-git-4'],
      example: {
        title: '从新建分支到推送的完整流程',
        steps: [
          { md: '先 git pull，确保本地基于最新代码。' },
          { md: 'git checkout -b feature/export 新建功能分支。' },
          { md: '修改后 git add 相关文件，git commit -m 写清目的。' },
          { md: 'git push -u origin feature/export，把分支推到远程并发起评审。' }
        ],
        takeaway: '功能分支加小步提交，是协作中最稳的节奏。'
      },
      example2: {
        title: '解决一次合并冲突',
        steps: [
          { md: 'git pull 后提示冲突，git status 列出冲突文件。' },
          { md: '打开文件，找到冲突标记，分别看两边改了什么。' },
          { md: '结合业务意图手工合成最终代码，删掉冲突标记。' },
          { md: 'git add 冲突文件，git commit 完成合并。' }
        ],
        takeaway: '冲突不是选一边，而是理解两边后写出正确结果。'
      },
      guided: [{ questionId: 'se-git-3', hint: '看状态用 status，看差异用 diff。' }],
      solo: ['se-git-1', 'se-git-4'],
      challenge: ['se-git-2'],
      summary: {
        essence: 'Git 用三个区域和提交快照管理历史；分支是指针，冲突要理解两边后手工合成。',
        formulas: ['git add → git commit → git push', 'git checkout -b 分支名 / git merge 分支名'],
        pitfalls: ['add 之后以为已经提交', '用 --hard 丢掉未保存改动', '对公共分支强推', '提交信息只写「修改」'],
        checklist: ['我能说清三个区域', '我会用日常五条命令', '我能新建分支并推送', '我知道怎么正确处理冲突']
      },
      feynman: '请用游戏存档的比喻，讲清楚工作区、暂存区、本地仓库和远程仓库的关系。'
    }),

    Z.makeLesson({
      id: 'se-test-L2', kpIds: ['se-test'], subject: 'cs', level: 2,
      title: '测试与调试：先证明它错了，再让它对了',
      estMinutes: 40,
      hookTitle: '测试通过就能说明程序没 bug 吗？',
      hookBody: '不能。测试只能证明「这些用例下没问题」，不能证明所有情况都没问题。所以测试的价值在于用有限用例覆盖最可能出错的边界。',
      idea: '测试是**用输入和预期结果验证行为**，调试是**定位缺陷根因并修复**。前者负责发现，后者负责解释；两者都依赖可复现的步骤和清晰的日志。',
      diagramId: 'loop-flow', diagramCaption: '写用例 → 执行 → 发现失败 → 定位修复 → 回归，测试是一个闭环',
      analogy: { title: '体检与看病', md: '测试像体检：按项目逐项检查，异常项被标出来；调试像看病：根据指标追根因，而不是把异常指标直接改掉。把体检报告改正常，不等于病好了。' },
      points: [
        { title: '一、测试的目的是发现缺陷', md: '测试通过只说明当前用例没触发问题。好的测试主动构造极端输入、空值、重复操作，而不是只走一遍正常流程。' },
        { title: '二、测试金字塔', md: '底层是大量快速的单元测试，中层是集成测试，顶层是少量端到端测试。倒金字塔会又慢又脆弱，一改界面就大面积失败。' },
        { title: '三、黑盒与白盒', md: '黑盒只看输入输出，按需求设计用例；白盒看内部逻辑，覆盖语句、分支、条件。两者互补，不是二选一。' },
        { title: '四、等价类与边界值', md: '把输入分成有效和无效等价类，每类取代表值；边界最容易出错，如范围 1 到 100 要测 0、1、100、101。' },
        { title: '五、用例的要素', md: '前置条件、操作步骤、输入数据、预期结果。缺少预期结果就不是用例，只是操作记录，执行完也无法判断通过与否。' },
        { title: '六、调试的四步', md: '先稳定复现，再缩小范围（哪一层、哪个输入开始出错），然后提出假设并验证，最后修复并补一条回归测试。' },
        { title: '七、日志与断言优于猜', md: '在关键分支打印输入、状态和返回值；用断言把假设写进代码。不要一次改十行再猜是哪行生效，那样只会越调越乱。' }
      ],
      table: {
        headers: ['层次', '测什么', '特点'],
        rows: [
          ['单元测试', '单个函数或类', '快、定位准、数量最多'],
          ['集成测试', '模块之间的协作', '能发现接口与数据问题'],
          ['端到端测试', '完整用户流程', '贴近真实但慢且脆弱']
        ]
      },
      code: 'function add(a, b) {\n  return a + b;\n}\n\nconsole.assert(add(1, 2) === 3, "1 + 2 应该等于 3");\nconsole.assert(add(-1, 1) === 0, "相反数相加应该等于 0");\nconsole.assert(add(0, 0) === 0, "零加零应该等于 0");',
      warning: '「改到测试通过」不等于修好了。如果只改预期结果来迁就错误输出，测试就失去了发现问题的意义。',
      tip: '每修一个 bug，先补一条能复现它的测试，再改代码。这样修复有证据，未来也不会被同一个人再踩一次。',
      quizIds: ['se-test-1', 'se-test-2', 'se-test-3', 'se-test-4'],
      example: {
        title: '为年龄输入框设计测试用例',
        steps: [
          { md: '需求是年龄 1 到 100 的整数。' },
          { md: '有效等价类取 18，无效等价类取 −1、0、101、200。' },
          { md: '边界值取 1、2、99、100，重点测 0、1、100、101。' },
          { md: '再补空值、小数、非数字输入，检查提示是否清晰。' }
        ],
        takeaway: '等价类保证覆盖面，边界值抓最容易出错的点。'
      },
      example2: {
        title: '复现并定位「列表偶发空白」',
        steps: [
          { md: '先固定数据与操作步骤，确认每次都能复现。' },
          { md: '在请求返回处打印长度，判断是数据为空还是渲染失败。' },
          { md: '若数据正常，继续检查渲染分支与条件判断。' },
          { md: '定位到根因后修复，并补一条空列表的回归测试。' }
        ],
        takeaway: '先复现，再缩小范围，最后才改代码。'
      },
      guided: [{ questionId: 'se-test-2', hint: '不看内部实现，只按输入输出判断，这就是黑盒。' }],
      solo: ['se-test-1', 'se-test-4'],
      challenge: ['se-test-3'],
      summary: {
        essence: '测试负责发现缺陷，调试负责定位根因；用等价类与边界值覆盖最可能出错的地方。',
        formulas: ['用例 = 前置条件 + 步骤 + 输入 + 预期结果', '边界：min-1、min、max、max+1'],
        pitfalls: ['只测正常流程', '改预期结果迁就错误输出', '一次改十行再猜原因', '修完不补回归测试'],
        checklist: ['我能区分单元、集成、端到端测试', '我会用等价类与边界值设计用例', '我能按四步定位缺陷', '我知道测试与调试的区别']
      },
      feynman: '请用体检与看病的比喻，说明测试和调试各自负责什么。'
    }),

    Z.makeLesson({
      id: 'se-design-L3', kpIds: ['se-design'], subject: 'cs', level: 3,
      title: '设计模式与架构：把变化关进笼子',
      estMinutes: 45,
      hookTitle: '为什么「能跑」的代码，改一个需求就到处崩？',
      hookBody: '因为变化没有被隔离：业务逻辑、界面、数据访问缠在一起。设计模式和分层架构的作用，是把容易变的部分集中到一处。',
      idea: '设计模式是**可复用的对象协作套路**，解决局部设计问题；架构解决模块边界与依赖方向。两者共同目标：让变化只影响一小块代码。',
      diagramId: 'os-layer', diagramCaption: '分层架构：上层依赖下层，下层不反向依赖上层',
      analogy: { title: '插座与电器', md: '电器不关心发电厂怎么发电，只认插座标准。接口就是插座，实现可以随时更换；如果每个电器都直接接线到发电厂，换一次电就要拆整屋。' },
      points: [
        { title: '一、模式是套路不是银弹', md: '设计模式给常见问题一个共同语言，例如「这里用观察者」。强行套模式会增加层级和间接性，简单问题直接写反而更清楚。' },
        { title: '二、创建型：单例与工厂', md: '单例保证全局只有一个实例，适合配置、连接池；工厂把创建细节集中，调用方只依赖接口。单例要警惕全局状态和测试困难。' },
        { title: '三、结构型：适配器、装饰器、代理', md: '适配器转换接口，装饰器在不改原对象的前提下叠加功能，代理控制访问，例如缓存、权限、懒加载。' },
        { title: '四、行为型：观察者与策略', md: '观察者处理一对多通知，如数据变化刷新多个视图；策略把一组可替换算法抽成统一接口，替代越来越长的 if-else。' },
        { title: '五、SOLID 五原则', md: '单一职责、开闭、里氏替换、接口隔离、依赖倒置。核心是：类只为一个原因变化，扩展开放修改关闭，依赖抽象而非具体。' },
        { title: '六、分层与依赖方向', md: '界面层调业务层，业务层调数据层；数据层不反向依赖界面。依赖倒置让业务层定义接口、基础设施去实现，便于替换和测试。' },
        { title: '七、过度设计的信号', md: '为了「以后可能」加抽象、一个类只被调用一次却拆三层、配置比代码还长。抽象应该由第二次真实变化驱动，而不是想象。' }
      ],
      table: {
        headers: ['模式', '解决什么', '代价'],
        rows: [
          ['单例', '全局唯一实例', '隐藏依赖、测试难隔离'],
          ['观察者', '状态变化通知多方', '通知链复杂、难排查'],
          ['策略', '替换一组算法', '类数量增加'],
          ['适配器', '兼容不匹配接口', '多一层转换']
        ]
      },
      code: 'function Subject() {\n  this.listeners = [];\n}\n\nSubject.prototype.on = function (fn) {\n  this.listeners.push(fn);\n};\n\nSubject.prototype.emit = function (data) {\n  this.listeners.forEach(function (fn) { fn(data); });\n};',
      warning: '单例不是免费的全局变量。它让依赖关系隐藏起来，单元测试难以隔离；能用参数传入的依赖，就不要从单例里取。',
      tip: '判断要不要抽象，看「同样的修改是否已经发生过两次」。第一次可以直接写，第二次再提炼，比提前设计更可靠。',
      quizIds: ['se-design-1', 'se-design-2', 'se-design-3', 'se-design-4'],
      example: {
        title: '用策略模式替换 if-else 的运费计算',
        steps: [
          { md: '原代码按快递公司写多个 if 分支，新增一家就要改函数。' },
          { md: '抽出统一接口 calculate(weight)，每家实现一个策略。' },
          { md: '用映射表按公司名取策略，调用方只依赖接口。' },
          { md: '新增公司只需加一个实现并注册，不改原有代码，符合开闭原则。' }
        ],
        takeaway: '变化点用策略隔离，调用方只认接口。'
      },
      example2: {
        title: '判断一个「万能工具类」该拆成什么',
        steps: [
          { md: '列出类里的方法：日期格式化、金额计算、文件上传、权限校验。' },
          { md: '按变化原因分组：展示、业务规则、存储、安全。' },
          { md: '拆成四个独立模块，各自只为一个原因变化。' },
          { md: '公共依赖下沉，避免模块之间互相引用形成环。' }
        ],
        takeaway: '单一职责的判断标准是「是否只有一个变化原因」。'
      },
      guided: [{ questionId: 'se-design-2', hint: '一对多通知、订阅者可以自由增减，就是观察者。' }],
      solo: ['se-design-1', 'se-design-3'],
      challenge: ['se-design-4'],
      summary: {
        essence: '模式是局部协作套路，架构是模块边界；共同目标是隔离变化、依赖抽象。',
        formulas: ['SOLID = 单一职责 + 开闭 + 里氏替换 + 接口隔离 + 依赖倒置', '依赖方向：界面 → 业务 → 数据'],
        pitfalls: ['为未来过度抽象', '单例滥用隐藏依赖', '分层之间反向依赖', '把所有逻辑塞进工具类'],
        checklist: ['我能说出单例、观察者、策略的用途', '我理解 SOLID 五原则', '我知道依赖应该指向抽象', '我能识别过度设计的信号']
      },
      feynman: '请用插座与电器的比喻，解释依赖倒置为什么能让替换实现更容易。'
    }),

    Z.makeLesson({
      id: 'se-agile-L2', kpIds: ['se-agile'], subject: 'cs', level: 2,
      title: '敏捷与协作：小步交付，快速反馈',
      estMinutes: 40,
      hookTitle: '为什么「半年后给你看」的项目最危险？',
      hookBody: '因为方向错了半年才发现，改的成本已经不可承受。敏捷用短迭代把反馈周期压到一两周，让错误尽早暴露。',
      idea: '敏捷是一组**以可工作软件和快速反馈为核心**的实践与价值观，不是不写文档、不设计。Scrum 用固定长度的 Sprint、明确角色和会议，把协作变成可重复的节奏。',
      diagramId: 'loop-flow', diagramCaption: 'Sprint 循环：计划 → 开发 → 评审 → 回顾，再进入下一轮',
      analogy: { title: '划船比赛', md: '一个人拼命划不如全队同频。站会是抬头看方向，评审是装上零件让教练试用，回顾是调整节奏；三件事都不是追责，而是让船走直线。' },
      points: [
        { title: '一、敏捷的四条价值观', md: '个体和互动高于流程和工具；可工作的软件高于详尽文档；客户合作高于合同谈判；响应变化高于遵循计划。右边也有价值，只是左边优先。' },
        { title: '二、适用边界', md: '需求不确定、需要快速试错的项目适合敏捷；强合规、接口固定的项目仍需要阶段评审和完整文档，不能生搬硬套。' },
        { title: '三、Scrum 三个角色', md: '产品负责人管需求与优先级，Scrum Master 管流程与障碍，开发团队负责交付。角色可以兼任，但职责要清楚，否则问题没人兜底。' },
        { title: '四、四个会议', md: '计划会定目标与任务；每日站会同步进展和障碍；评审会演示成果并收集反馈；回顾会改进团队自己的工作方式。' },
        { title: '五、看板与 WIP 限制', md: '看板把任务分成待办、进行中、完成，限制同时进行的任务数，避免每个人都开很多头却没人收尾。' },
        { title: '六、用户故事与估算', md: '故事从用户价值出发，配验收标准；估算用故事点表示相对大小，不承诺精确工时，避免把估算当考核。' },
        { title: '七、协作的底线', md: '任务拆分到一天内可完成、进展公开可见、阻塞及时说出来、复盘只谈流程不追责。透明是敏捷能成立的前提。' }
      ],
      table: {
        headers: ['会议', '目的', '产出'],
        rows: [
          ['Sprint 计划会', '确定本轮目标', 'Sprint 待办列表'],
          ['每日站会', '同步进展与阻塞', '当天计划、障碍清单'],
          ['Sprint 评审会', '演示成果收集反馈', '需求调整意见'],
          ['回顾会', '改进团队工作方式', '下一轮改进行动']
        ]
      },
      code: '任务板（按列读）:\n\n待办：用户登录、导出报表\n进行中（WIP 上限 2）：订单列表\n完成：首页改版\n\n每日站会三问：\n1. 昨天完成了什么\n2. 今天准备做什么\n3. 有什么阻塞',
      warning: '站会不是汇报会。如果每人对着领导念进度，问题会被藏起来；站会应该面向任务板，重点是同步和暴露阻塞，控制在 15 分钟内。',
      tip: '判断一个团队是否真的敏捷，看两点：是否每轮都有可演示的成果，是否在回顾后真的改了一件事。',
      quizIds: ['se-agile-1', 'se-agile-2', 'se-agile-3', 'se-agile-4'],
      example: {
        title: '把一个「商品搜索」需求拆成一轮可交付任务',
        steps: [
          { md: '先写用户故事与验收标准，明确搜什么、结果怎么排。' },
          { md: '拆成接口、搜索框、结果列表、空状态四块，每块一天内可完成。' },
          { md: '标出依赖顺序：接口先定字段，前端才好接。' },
          { md: '只把本轮能做完的任务拉进 Sprint，其余留在待办。' }
        ],
        takeaway: '拆到一天内可完成，进度才看得见、风险才暴露得早。'
      },
      example2: {
        title: '站会上发现阻塞后怎么处理',
        steps: [
          { md: '成员说明「测试环境账号拿不到，无法联调」。' },
          { md: 'Scrum Master 记录阻塞，不在会上展开技术讨论。' },
          { md: '会后协调权限，明确负责人和解决时间。' },
          { md: '第二天站会先同步阻塞是否解除。' }
        ],
        takeaway: '站会负责暴露，会后负责解决。'
      },
      guided: [{ questionId: 'se-agile-1', hint: 'Scrum 的迭代容器叫 Sprint，不是 Release。' }],
      solo: ['se-agile-2', 'se-agile-3'],
      challenge: ['se-agile-4'],
      summary: {
        essence: '敏捷用短迭代换取快速反馈；Scrum 用角色、会议和看板把协作变成可重复的节奏。',
        formulas: ['Sprint = 计划 + 开发 + 评审 + 回顾', '用户故事 = 角色 + 功能 + 价值 + 验收标准'],
        pitfalls: ['把站会开成汇报会', 'Sprint 中途随意加需求', '估算当考核', '回顾只追责不改流程'],
        checklist: ['我能说出四条敏捷价值观', '我分得清 Scrum 三个角色', '我知道四个会议各自产出什么', '我能把需求拆到一天内可完成']
      },
      feynman: '请用划船比赛的比喻，解释站会、评审、回顾各自解决什么问题。'
    }),

    Z.makeLesson({
      id: 'se-doc-L1', kpIds: ['se-doc'], subject: 'cs', level: 1,
      title: '文档、注释与规范：让代码对下一个人友好',
      estMinutes: 40,
      hookTitle: '为什么「代码能跑就行」在团队里会变成灾难？',
      hookBody: '因为代码的生命周期里，读的时间远多于写的时间。命名、注释、文档决定了下一个人能否十分钟看懂，而不是花两天猜。',
      idea: '文档记录**系统怎么用、为什么这样设计**；注释解释**这段代码的意图与约束**；规范统一**命名、格式与提交习惯**。三者共同降低协作和交接成本。',
      diagramId: 'tree-structure', diagramCaption: '文档像一棵目录树：从总览到模块，再落到具体接口',
      analogy: { title: '说明书与路标', md: '说明书告诉你怎么用，路标告诉你在哪。注释不是把路标写满每条街，而是在容易走错的路口标一句「这里单行」。' },
      points: [
        { title: '一、三类文档', md: 'README 说明项目是什么、怎么装、怎么跑；接口文档说明参数、返回和错误码；设计文档说明为什么选这个方案、放弃了什么。' },
        { title: '二、注释写意图，不写字面', md: '「i 加一」没有信息量；「这里先排序，因为后面用二分」才解释了为什么。约束、坑、外部系统怪癖，都值得写进注释。' },
        { title: '三、函数级文档注释', md: '说明参数含义、返回值、可能抛出的异常和副作用。调用方不需要读实现就能正确使用，这是接口文档的最小单位。' },
        { title: '四、命名与格式规范', md: '变量名用业务词，布尔值用 is 或 has 开头，函数名用动词；缩进、引号、分号由团队工具统一。规范的目的是一致，不是争论谁更好。' },
        { title: '五、提交信息与变更记录', md: '提交信息写清为什么改，版本发布写变更记录，让排障时能对上「哪次改动引入了问题」。这是最便宜的可追溯性。' },
        { title: '六、文档与代码同步', md: '过期文档比没有文档更危险。接口一变就更新文档，或让文档从代码注释生成，减少两套事实互相矛盾。' },
        { title: '七、可维护性清单', md: '新人能否只看 README 跑起来？关键函数是否有参数说明？异常路径是否写清楚？命名是否能自解释？提交历史是否能看懂？' }
      ],
      table: {
        headers: ['文档', '写给谁', '必须包含'],
        rows: [
          ['README', '新加入的开发者', '项目用途、安装、运行、目录结构'],
          ['接口文档', '调用方与联调方', '参数、返回、错误码、示例'],
          ['设计文档', '团队与后来者', '目标、方案对比、取舍与风险']
        ]
      },
      code: '/**\n * 计算订单总价（含折扣）\n * @param {Array} items 商品列表，每项含 price 与 count\n * @param {number} discount 折扣率，0 到 1\n * @returns {number} 总价，保留两位小数\n */\nfunction total(items, discount) {\n  var sum = 0;\n  items.forEach(function (item) {\n    sum += item.price * item.count;\n  });\n  return Math.round(sum * discount * 100) / 100;\n}',
      warning: '注释不能代替命名。如果每行代码都要注释解释，说明变量名和函数划分有问题；先把名字改清楚，再补必要的意图说明。',
      tip: '写注释时问自己：三个月后的我，看到这段会不会问「为什么这么写」。会，就写下来；不会，就别重复代码。',
      quizIds: ['se-doc-1', 'se-doc-2', 'se-doc-3', 'se-doc-4'],
      example: {
        title: '给「金额计算」函数补文档注释',
        steps: [
          { md: '先写一句话说明函数做什么，不重复函数名。' },
          { md: '逐项标注参数类型与取值范围，例如折扣率 0 到 1。' },
          { md: '写清返回值含义与精度处理方式。' },
          { md: '补充可能抛出的异常或副作用，例如空列表返回 0。' }
        ],
        takeaway: '调用方只看注释就能正确使用，注释才算合格。'
      },
      example2: {
        title: '判断三条注释哪些有价值',
        steps: [
          { md: '「i 加一」：重复代码，没有价值，删掉。' },
          { md: '「这里先排序，后面用二分查找」：解释了意图，保留。' },
          { md: '「第三方接口在字段为空时返回空字符串而不是 null，这里需要兼容」：解释了外部约束，必须保留。' },
          { md: '结论：注释补充代码看不出来的信息，不重复代码字面。' }
        ],
        takeaway: '好注释回答「为什么」，坏注释复述「是什么」。'
      },
      guided: [{ questionId: 'se-doc-1', hint: '代码已经说明做了什么，注释应该补充为什么。' }],
      solo: ['se-doc-2', 'se-doc-3'],
      challenge: ['se-doc-4'],
      summary: {
        essence: '文档说明怎么用与为什么这样设计，注释补充意图与约束，规范保证团队一致。',
        formulas: ['README：用途 + 安装 + 运行 + 目录', '文档注释：参数 + 返回 + 异常 + 副作用'],
        pitfalls: ['注释重复代码字面', '文档过期不同步', '命名用无意义缩写', '修 bug 却改主版本号'],
        checklist: ['我能写出一份能跑起来的 README', '我会给关键函数补文档注释', '我的命名能让别人看懂', '我知道语义化版本怎么递增']
      },
      feynman: '请用说明书与路标的比喻，说明文档和注释各自应该在什么时候出现。'
    })
  );
})(window.ZSB = window.ZSB || {});
