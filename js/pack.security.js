/* 网络安全模块：8 考点 × 4 题 + 8 份完整讲义 */
(function (Z) {
  Z.addKps([
    { id: 'sec-intro', subject: 'cs', chapter: '网络安全', title: '网络安全概述', level: 2, examWeight: 0.03, prerequisites: [], examCount: 3, examPoints: 8, outcome: '能解释 CIA 三元组的含义，区分威胁、脆弱性与风险', note: 'CIA 是安全世界的「黄金三角」，先建立整体框架再学攻防' },
    { id: 'sec-attack', subject: 'cs', chapter: '网络安全', title: '常见网络攻击', level: 2, examWeight: 0.04, prerequisites: ['sec-intro'], examCount: 4, examPoints: 12, outcome: '能说出 XSS、CSRF、SQL 注入、DDoS、钓鱼的原理和基本防御', note: '攻击和防御是硬币的两面，先懂怎么打才能懂怎么防' },
    { id: 'sec-crypto', subject: 'cs', chapter: '网络安全', title: '密码学基础', level: 2, examWeight: 0.04, prerequisites: ['sec-intro'], examCount: 4, examPoints: 12, outcome: '能区分对称/非对称/哈希，解释数字签名的作用', note: '密码学是安全的数学底座，不需要会推导，但要会选型' },
    { id: 'sec-auth', subject: 'cs', chapter: '网络安全', title: '认证与授权', level: 3, examWeight: 0.04, prerequisites: ['sec-crypto'], examCount: 4, examPoints: 14, outcome: '能比较 Cookie/Session/Token/JWT，画出 OAuth2 授权码流程', note: '认证是「你是谁」，授权是「你能做什么」，不要混为一谈' },
    { id: 'sec-https', subject: 'cs', chapter: '网络安全', title: 'HTTPS 与证书', level: 3, examWeight: 0.04, prerequisites: ['sec-crypto'], examCount: 4, examPoints: 14, outcome: '能说明 TLS 握手和证书链验证如何防御中间人攻击', note: '地址栏的小锁背后是一套完整的信任链条' },
    { id: 'sec-vuln', subject: 'cs', chapter: '网络安全', title: '漏洞与防护', level: 2, examWeight: 0.03, prerequisites: ['sec-attack'], examCount: 3, examPoints: 10, outcome: '能列举 OWASP Top 10 核心概念，说明输入验证和最小权限原则', note: '绝大多数漏洞都始于「过于相信用户的输入」' },
    { id: 'sec-legal', subject: 'cs', chapter: '网络安全', title: '网络安全法律与合规', level: 2, examWeight: 0.02, prerequisites: [], examCount: 3, examPoints: 8, outcome: '能说出三部法律的核心要求，理解等保五级划分', note: '合规是安全的底线，技术再强也不能触碰法律红线' },
    { id: 'sec-practice', subject: 'cs', chapter: '网络安全', title: '安全实践', level: 3, examWeight: 0.03, prerequisites: ['sec-auth','sec-https','sec-vuln'], examCount: 3, examPoints: 10, outcome: '能设计密码策略、说明 MFA 价值、描述应急响应流程', note: '安全是持续运营，不是一次性项目' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- sec-intro ---------- */
    { id: 'sec-intro-1', kpIds: ['sec-intro'], subject: 'cs', type: 'single',
      stem: 'CIA 三元组中的 "C" 代表什么？',
      options: ['Confidentiality 机密性', 'Integrity 完整性', 'Availability 可用性', 'Authentication 认证'],
      answer: 'A',
      analysis: { ans: 'A', why: 'CIA 三元组是机密性（Confidentiality）、完整性（Integrity）、可用性（Availability），C 对应 Confidentiality。', steps: '1. 记清三个英文首字母。\n2. C=Confidentiality=机密性，防止未授权访问。\n3. I=Integrity=完整性，防止未授权篡改。\n4. A=Availability=可用性，保证授权用户随时可用。', pit: '不要把 Authentication（认证）当成 CIA 的一员。' } },
    { id: 'sec-intro-2', kpIds: ['sec-intro'], subject: 'cs', type: 'single',
      stem: '下列哪项攻击主要破坏的是可用性（Availability）？',
      options: ['窃听通信内容', 'DDoS 攻击', '篡改数据库记录', '伪造数字签名'],
      answer: 'B',
      analysis: { ans: 'B', why: 'DDoS（分布式拒绝服务）通过耗尽目标资源使其无法提供服务，直接破坏可用性。', steps: '1. 窃听破坏机密性。\n2. DDoS 使服务瘫痪，破坏可用性。\n3. 篡改破坏完整性。\n4. 伪造签名破坏完整性与不可否认性。', pit: 'DDoS 不偷数据也不改数据，只是让服务「不可用」。' } },
    { id: 'sec-intro-3', kpIds: ['sec-intro'], subject: 'cs', type: 'fill',
      stem: 'CIA 三元组包括机密性（Confidentiality）、完整性（Integrity）和 ______。',
      answer: '可用性', accept: ['可用性','Availability'],
      analysis: { ans: '可用性', why: 'CIA 三元组的三个角分别是机密性、完整性、可用性。', steps: '1. C=机密性。\n2. I=完整性。\n3. A=可用性（Availability）。', pit: ' Availability 的英文首字母是 A，不是 U。' } },
    { id: 'sec-intro-4', kpIds: ['sec-intro'], subject: 'cs', type: 'fill',
      stem: '威胁（Threat）是可能造成损害的潜在原因，而 ______ 是威胁利用脆弱性实际发生的可能性与影响的综合度量。',
      answer: '风险', accept: ['风险','Risk'],
      analysis: { ans: '风险', why: '风险 = 威胁 × 脆弱性 × 影响，是安全评估的核心指标。', steps: '1. 威胁：可能发起攻击的来源。\n2. 脆弱性：系统本身存在的弱点。\n3. 风险：威胁利用脆弱性后造成损失的综合度量。', pit: '不要把威胁和风险混为一谈：威胁是「可能来打你」，风险是「被打后损失有多大」。' } },

    /* ---------- sec-attack ---------- */
    { id: 'sec-attack-1', kpIds: ['sec-attack'], subject: 'cs', type: 'single',
      stem: 'XSS（跨站脚本）攻击主要通过什么方式实施？',
      options: ['在目标网页中注入恶意脚本', '伪造已登录用户的请求', '向服务器发送大量垃圾流量', '暴力破解管理员密码'],
      answer: 'A',
      analysis: { ans: 'A', why: 'XSS 通过在页面中注入并执行恶意 JavaScript，窃取 Cookie 或冒充用户操作。', steps: '1. 攻击者在输入框、评论区等注入脚本。\n2. 其他用户浏览该页面时，浏览器执行恶意脚本。\n3. 脚本可窃取 Cookie、键盘记录或伪造请求。\n4. 防御核心：输入过滤 + 输出编码。', pit: 'XSS 的「跨站」不是指跨域名请求，而是脚本注入到目标站点执行。' } },
    { id: 'sec-attack-2', kpIds: ['sec-attack'], subject: 'cs', type: 'single',
      stem: 'CSRF（跨站请求伪造）攻击的核心原理是？',
      options: ['利用用户已认证的会话在后台伪造请求', '在页面中注入脚本窃取 Cookie', '拦截并篡改网络通信数据', '向数据库注入恶意 SQL'],
      answer: 'A',
      analysis: { ans: 'A', why: 'CSRF 利用浏览器自动携带 Cookie 的机制，诱导已登录用户访问恶意链接，从而在用户不知情的情况下执行操作。', steps: '1. 用户已登录银行网站，Cookie 有效。\n2. 用户访问攻击者构造的恶意页面。\n3. 恶意页面自动向银行发起转账请求。\n4. 浏览器自动带上 Cookie，银行误以为是用户本人操作。\n5. 防御：CSRF Token、SameSite Cookie、二次确认。', pit: 'CSRF 不需要知道 Cookie 内容，只需要让用户浏览器自动带上 Cookie。' } },
    { id: 'sec-attack-3', kpIds: ['sec-attack'], subject: 'cs', type: 'fill',
      stem: 'SQL 注入攻击通过在用户输入中插入恶意的 ______ 语句，绕过认证或窃取数据库数据。',
      answer: 'SQL', accept: ['SQL','sql'],
      analysis: { ans: 'SQL', why: 'SQL 注入把用户输入拼接到 SQL 查询中，改变原本语义。', steps: '1. 应用程序直接把用户输入拼进 SQL。\n2. 攻击者输入类似 \' OR \'1\'=\'1 的片段。\n3. SQL 语义改变，返回全部数据或绕过登录。\n4. 防御：参数化查询/预编译语句。', pit: '拼接 SQL 是最危险的习惯，参数化查询是标准做法。' } },
    { id: 'sec-attack-4', kpIds: ['sec-attack'], subject: 'cs', type: 'fill',
      stem: 'DDoS 攻击的中文名称是 ______ 拒绝服务攻击。',
      answer: '分布式', accept: ['分布式'],
      analysis: { ans: '分布式', why: 'DDoS = Distributed Denial of Service，利用大量分布式主机同时攻击目标。', steps: '1. 控制大量僵尸主机（肉鸡）。\n2. 同时向目标发送海量请求。\n3. 目标资源耗尽，无法响应正常用户。\n4. 防御：流量清洗、CDN、限流、WAF。', pit: 'DDoS 与 DoS 的区别在于「分布式」，前者是多对一，后者是一对一。' } },

    /* ---------- sec-crypto ---------- */
    { id: 'sec-crypto-1', kpIds: ['sec-crypto'], subject: 'cs', type: 'single',
      stem: '下列哪项属于对称加密算法？',
      options: ['RSA', 'AES', 'ECC', 'SHA-256'],
      answer: 'B',
      analysis: { ans: 'B', why: 'AES（高级加密标准）是对称加密，加密和解密使用同一密钥；RSA、ECC 是非对称加密；SHA-256 是哈希算法。', steps: '1. 对称加密：AES、DES、3DES、SM4。\n2. 非对称加密：RSA、ECC、SM2。\n3. 哈希：SHA 系列、MD5。\n4. 记住典型代表即可区分。', pit: 'SHA-256 不是加密算法，是哈希算法，它没有密钥，也不能解密。' } },
    { id: 'sec-crypto-2', kpIds: ['sec-crypto'], subject: 'cs', type: 'single',
      stem: '数字签名的主要作用是保证消息的完整性和 ______。',
      options: ['机密性', '不可否认性', '可用性', '压缩率'],
      answer: 'B',
      analysis: { ans: 'B', why: '数字签名用私钥签名、公钥验证，能证明消息确实来自签名者且未被篡改，签名者无法否认。', steps: '1. 发送者对消息哈希值用私钥加密（签名）。\n2. 接收者用公钥解密验证。\n3. 哈希值匹配 → 完整性得到保证。\n4. 只有私钥持有者能生成有效签名 → 不可否认。', pit: '数字签名不提供机密性，明文消息仍然可见；要机密性需配合加密。' } },
    { id: 'sec-crypto-3', kpIds: ['sec-crypto'], subject: 'cs', type: 'fill',
      stem: '非对称加密算法使用一对密钥：公钥（Public Key）和 ______。',
      answer: '私钥', accept: ['私钥','Private Key'],
      analysis: { ans: '私钥', why: '非对称加密有公钥和私钥两个密钥：公钥公开用于加密或验签，私钥保密用于解密或签名。', steps: '1. 公钥：公开分发，用于加密数据或验证签名。\n2. 私钥：严格保密，用于解密数据或生成签名。\n3. 由私钥可推公钥，反之不可。', pit: '不要把私钥泄露或上传到代码仓库。' } },
    { id: 'sec-crypto-4', kpIds: ['sec-crypto'], subject: 'cs', type: 'fill',
      stem: 'SHA-256 是一种常用的 ______ 函数，能把任意长度的输入转换为固定长度的摘要。',
      answer: '哈希', accept: ['哈希','hash','散列'],
      analysis: { ans: '哈希', why: '哈希函数是单向函数，输入任意长度，输出固定长度摘要，且无法从摘要反推原文。', steps: '1. 哈希特性：定长、单向、抗碰撞。\n2. SHA-256 输出 256 位（32 字节）摘要。\n3. 用途：校验完整性、数字签名、密码存储（加盐）。', pit: '哈希不是加密，因为它不可逆；不要用哈希代替加密保护数据机密性。' } },

    /* ---------- sec-auth ---------- */
    { id: 'sec-auth-1', kpIds: ['sec-auth'], subject: 'cs', type: 'single',
      stem: 'JWT（JSON Web Token）的三个组成部分用点号分隔，依次是 Header、Payload 和 ______。',
      options: ['Secret', 'Signature', 'Session', 'Token'],
      answer: 'B',
      analysis: { ans: 'B', why: 'JWT 格式为 Header.Payload.Signature，Signature 是对前两部分加密的签名，用于防篡改。', steps: '1. Header：声明类型和签名算法。\n2. Payload：携带用户数据与过期时间。\n3. Signature：用密钥对前两部分签名。\n4. 三部分 Base64Url 编码后用点号连接。', pit: 'JWT 的 Payload 只是编码不是加密，不要在里面放敏感信息。' } },
    { id: 'sec-auth-2', kpIds: ['sec-auth'], subject: 'cs', type: 'single',
      stem: '在 OAuth2 授权码流程中，用户同意授权后，客户端首先获得的是？',
      options: ['Access Token', 'Authorization Code', 'Refresh Token', 'ID Token'],
      answer: 'B',
      analysis: { ans: 'B', why: '授权码流程先给 Authorization Code，客户端再用 Code 加 Client Secret 向授权服务器换取 Access Token，避免 Token 直接暴露在浏览器端。', steps: '1. 用户点击登录，重定向到授权服务器。\n2. 用户授权后，授权服务器返回 Authorization Code。\n3. 客户端后台用 Code + Client Secret 换取 Access Token。\n4. 后续用 Access Token 访问资源服务器。', pit: 'Authorization Code 是一次性的，且通常绑定客户端，不能直接当 Access Token 用。' } },
    { id: 'sec-auth-3', kpIds: ['sec-auth'], subject: 'cs', type: 'fill',
      stem: '服务器端保存用户会话状态信息的方式通常称为 ______。',
      answer: 'Session', accept: ['Session','session','会话'],
      analysis: { ans: 'Session', why: 'Session 把用户状态存储在服务器端，通过 Session ID（通常存在 Cookie 中）关联到具体用户。', steps: '1. 用户登录成功，服务器创建 Session。\n2. 把 Session ID 通过 Set-Cookie 发给浏览器。\n3. 浏览器后续请求自动带上 Cookie。\n4. 服务器用 Session ID 查找对应的会话数据。', pit: 'Session 存在服务器端，会增加服务器存储压力；多服务器时需共享 Session（如 Redis）。' } },
    { id: 'sec-auth-4', kpIds: ['sec-auth'], subject: 'cs', type: 'fill',
      stem: 'Cookie 中用于限制第三方网站携带 Cookie，从而防御 CSRF 的常见属性是 ______。',
      answer: 'SameSite', accept: ['SameSite','samesite'],
      analysis: { ans: 'SameSite', why: 'SameSite 属性控制 Cookie 在跨站请求时是否发送：Strict 完全禁止跨站携带，Lax 允许安全方法（如 GET 跳转），None 则必须配合 Secure。', steps: '1. SameSite=Strict：仅同站请求携带。\n2. SameSite=Lax：部分跨站场景允许（如链接跳转）。\n3. SameSite=None：允许跨站，但必须标记 Secure（HTTPS）。\n4. 现代浏览器默认行为已趋向 Lax。', pit: 'SameSite=None 时如果没有 Secure 标志，浏览器会拒绝发送该 Cookie。' } },

    /* ---------- sec-https ---------- */
    { id: 'sec-https-1', kpIds: ['sec-https'], subject: 'cs', type: 'single',
      stem: 'HTTPS 在 HTTP 之下加入的安全协议层是？',
      options: ['SSL/TLS', 'TCP', 'IPsec', 'FTP'],
      answer: 'A',
      analysis: { ans: 'A', why: 'HTTPS = HTTP + SSL/TLS，TLS（传输层安全协议）为 HTTP 提供加密、完整性校验和身份认证。', steps: '1. HTTP 是明文传输。\n2. TLS 位于传输层之上、应用层之下。\n3. TLS 提供加密 + 证书验证。\n4. 组合成 HTTPS。', pit: 'SSL 是 TLS 的前身，现普遍使用 TLS 1.2 / TLS 1.3。' } },
    { id: 'sec-https-2', kpIds: ['sec-https'], subject: 'cs', type: 'single',
      stem: 'HTTPS 防御中间人攻击的核心机制是？',
      options: ['仅加密传输内容', '证书验证与受信任的 CA 体系', '使用更长的 URL', '关闭服务器防火墙'],
      answer: 'B',
      analysis: { ans: 'B', why: '中间人攻击者可以拦截流量，但无法伪造由受信任 CA 签发的证书；浏览器校验证书链和域名匹配，从而识别伪造。', steps: '1. 服务器向 CA 申请证书（含公钥和域名）。\n2. 客户端收到证书后，验证签发者是否在信任列表。\n3. 验证证书链完整性和域名匹配。\n4. 校验通过后才进行密钥协商。', pit: '如果用户忽略浏览器证书警告继续访问，中间人攻击仍然可能成功。' } },
    { id: 'sec-https-3', kpIds: ['sec-https'], subject: 'cs', type: 'fill',
      stem: 'TLS 握手过程中，客户端与服务器协商产生一个用于后续对称加密的 ______。',
      answer: '会话密钥', accept: ['会话密钥','session key','对称密钥'],
      analysis: { ans: '会话密钥', why: 'TLS 握手使用非对称加密交换或协商出会话密钥（对称密钥），之后的数据传输全部使用该对称密钥加密，兼顾安全性与性能。', steps: '1. 握手阶段：用非对称加密协商出会话密钥。\n2. 传输阶段：双方用同一会话密钥进行对称加密通信。\n3. 会话结束或超时会话密钥销毁。\n4. 对称加密速度远快于非对称。', pit: '会话密钥是临时的，即使某次会话密钥泄露，也不会影响其他会话。' } },
    { id: 'sec-https-4', kpIds: ['sec-https'], subject: 'cs', type: 'fill',
      stem: '验证服务器证书时，浏览器需要检查证书是否由受信任的 ______ 签发。',
      answer: 'CA', accept: ['CA','证书颁发机构'],
      analysis: { ans: 'CA', why: 'CA（Certificate Authority，证书颁发机构）是可信第三方，负责审核域名归属并签发数字证书；浏览器内置了受信任 CA 列表。', steps: '1. 服务器提交域名和公钥给 CA。\n2. CA 验证域名所有权后签发证书。\n3. 浏览器收到证书，检查签发者 CA 是否可信。\n4. 同时验证证书有效期和域名匹配。', pit: '自签名证书没有受信任 CA 背书，浏览器会报警告，不适合生产环境。' } },

    /* ---------- sec-vuln ---------- */
    { id: 'sec-vuln-1', kpIds: ['sec-vuln'], subject: 'cs', type: 'single',
      stem: 'OWASP Top 10 主要列出的内容是？',
      options: ['最流行的编程语言排行榜', 'Web 应用最常见的安全风险', '网络安全法律法规汇总', '加密算法性能排名'],
      answer: 'B',
      analysis: { ans: 'B', why: 'OWASP Top 10 是由开放 Web 应用安全项目定期发布的十大 Web 安全风险列表，是行业安全基线。', steps: '1. OWASP 是一个非营利安全社区。\n2. Top 10 按威胁性和普遍性排序。\n3. 常见项包括：注入、失效访问控制、敏感数据泄露、XSS 等。\n4. 开发和安全测试都应参考该清单。', pit: 'OWASP 是安全风险列表，不是编程语言或法律排名。' } },
    { id: 'sec-vuln-2', kpIds: ['sec-vuln'], subject: 'cs', type: 'single',
      stem: '防御 XSS 攻击的最佳实践之一是？',
      options: ['完全禁用浏览器 JavaScript', '对用户输入进行输出编码', '关闭数据库外键约束', '只使用 HTTP 不使用 HTTPS'],
      answer: 'B',
      analysis: { ans: 'B', why: 'XSS 的本质是恶意脚本被浏览器执行；在输出到页面之前对数据进行 HTML 编码，可以让脚本变成纯文本展示。', steps: '1. 输入验证：过滤危险字符。\n2. 输出编码：把 < > " 等转成实体字符。\n3. 使用现代框架的自动转义机制。\n4. 对必须插入 HTML 的场景使用 CSP（内容安全策略）。', pit: '仅靠前端过滤不可靠，攻击者可以绕过前端直接请求后端；输出编码才是真正的最后一道防线。' } },
    { id: 'sec-vuln-3', kpIds: ['sec-vuln'], subject: 'cs', type: 'fill',
      stem: '最小权限原则要求只给用户和程序分配完成工作所 ______ 的权限。',
      answer: '必需', accept: ['必需','必要','最小'],
      analysis: { ans: '必需', why: '最小权限原则（Principle of Least Privilege）要求每个实体仅拥有完成其任务所必需的最小权限集合。', steps: '1. 用户账户只给需要的功能权限。\n2. 服务进程不以 root / admin 运行。\n3. 数据库账户只开放必要的表和权限。\n4. 定期审计权限分配，及时回收多余权限。', pit: '为了方便而给所有人管理员权限，是内部威胁和数据泄露的重要原因。' } },
    { id: 'sec-vuln-4', kpIds: ['sec-vuln'], subject: 'cs', type: 'fill',
      stem: '对用户输入进行严格的 ______ 是防止注入类漏洞的第一道防线。',
      answer: '输入验证', accept: ['输入验证','校验','验证'],
      analysis: { ans: '输入验证', why: '注入攻击（SQL 注入、命令注入、LDAP 注入等）都源于未验证的用户输入被当作代码执行。', steps: '1. 定义合法输入的白名单规则（类型、长度、格式）。\n2. 在服务端进行校验，不要信任前端。\n3. 对不合法的输入拒绝或清洗。\n4. 结合参数化查询形成纵深防御。', pit: '黑名单过滤（只禁用几个字符）容易被绕过，白名单策略更可靠。' } },

    /* ---------- sec-legal ---------- */
    { id: 'sec-legal-1', kpIds: ['sec-legal'], subject: 'cs', type: 'single',
      stem: '《中华人民共和国网络安全法》正式施行的日期是？',
      options: ['2015年6月1日', '2016年6月1日', '2017年6月1日', '2018年6月1日'],
      answer: 'C',
      analysis: { ans: 'C', why: '《网络安全法》由全国人大常委会于2016年11月7日通过，自2017年6月1日起施行。', steps: '1. 2016年11月7日通过。\n2. 2017年6月1日起施行。\n3. 是中国网络安全领域的基础性法律。', pit: '不要把通过日期和实施日期混淆。' } },
    { id: 'sec-legal-2', kpIds: ['sec-legal'], subject: 'cs', type: 'single',
      stem: '等保（等级保护）制度将信息系统安全等级划分为多少个级别？',
      options: ['三级', '四级', '五级', '六级'],
      answer: 'C',
      analysis: { ans: 'C', why: '等保 2.0 将信息系统安全保护等级划分为五个级别，从第一级（用户自主保护）到第五级（专控保护）。', steps: '1. 第一级：用户自主保护。\n2. 第二级：指导保护。\n3. 第三级：监督保护（最常见）。\n4. 第四级：强制保护。\n5. 第五级：专控保护。', pit: '日常企业系统通常做到第三级即可，第五级涉及国家机密。' } },
    { id: 'sec-legal-3', kpIds: ['sec-legal'], subject: 'cs', type: 'fill',
      stem: '《个人信息保护法》规定，处理个人信息应当遵循合法、正当、______ 和诚信原则。',
      answer: '必要', accept: ['必要'],
      analysis: { ans: '必要', why: '「最小必要」原则要求处理个人信息应当有明确合理目的，并限于实现处理目的的最小范围。', steps: '1. 合法：有法律依据或用户同意。\n2. 正当：目的正当，不滥用数据。\n3. 必要：范围最小、时间最短。\n4. 诚信：公开透明，不欺骗用户。', pit: '过度收集个人信息（如 flashlight App 要通讯录）违反必要性原则。' } },
    { id: 'sec-legal-4', kpIds: ['sec-legal'], subject: 'cs', type: 'fill',
      stem: '数据安全的核心目标是在数据全生命周期内保证其 ______、完整性和可用性。',
      answer: '机密性', accept: ['机密性','保密性'],
      analysis: { ans: '机密性', why: '数据安全同样遵循 CIA 三元组：确保数据不被未授权访问（机密性）、不被篡改（完整性）、需要时可用（可用性）。', steps: '1. 机密性：加密、访问控制、脱敏。\n2. 完整性：校验、数字签名、版本控制。\n3. 可用性：备份、容灾、高可用架构。', pit: '数据安全与网络安全是交叉领域，CIA 是共同基础。' } },

    /* ---------- sec-practice ---------- */
    { id: 'sec-practice-1', kpIds: ['sec-practice'], subject: 'cs', type: 'single',
      stem: '多因素认证（MFA）通常不包括以下哪种因素？',
      options: ['你知道的东西（密码）', '你拥有的东西（手机/令牌）', '你住的地方（家庭住址）', '你本身的东西（指纹/人脸）'],
      answer: 'C',
      analysis: { ans: 'C', why: 'MFA 的三个经典因素是：所知（密码）、所有（设备/令牌）、所是（生物特征）。家庭住址不属于认证因素。', steps: '1. 所知因素：密码、PIN。\n2. 所有因素：手机、硬件令牌、U盾。\n3. 所是因素：指纹、人脸、虹膜。\n4. 多因素组合能显著提高安全性。', pit: '短信验证码属于「所有因素」（拥有手机），但 SIM  swap 攻击会降低其安全性。' } },
    { id: 'sec-practice-2', kpIds: ['sec-practice'], subject: 'cs', type: 'single',
      stem: '安全审计的主要目的是？',
      options: ['提高系统运行速度', '检查并记录安全相关事件，发现违规和漏洞', '替换老旧硬件设备', '编写用户使用手册'],
      answer: 'B',
      analysis: { ans: 'B', why: '安全审计通过记录和分析系统操作日志，发现异常行为、违规操作和安全漏洞，为追责和改进提供依据。', steps: '1. 收集日志：访问日志、操作日志、系统日志。\n2. 制定审计策略：关注登录、权限变更、敏感操作。\n3. 定期分析：发现异常模式。\n4. 留存证据：满足合规和溯源需求。', pit: '没有日志就无法溯源，安全事件发生后「两眼一抹黑」是最糟糕的情况。' } },
    { id: 'sec-practice-3', kpIds: ['sec-practice'], subject: 'cs', type: 'fill',
      stem: '强密码策略通常要求足够的密码长度与复杂度，并定期进行 ______。',
      answer: '更换', accept: ['更换','更新','修改','轮换'],
      analysis: { ans: '更换', why: '定期更换密码可以降低密码泄露后的暴露窗口；即使旧密码被窃取，有效期过后也会失效。', steps: '1. 设置最小长度（如 8-12 位以上）。\n2. 要求大小写字母、数字、特殊字符组合。\n3. 禁止常见弱口令和与前密码相似。\n4. 设定有效期，到期强制更换。', pit: '过于频繁的更换（如每周）会导致用户把密码写在便签上，反而降低安全性。' } },
    { id: 'sec-practice-4', kpIds: ['sec-practice'], subject: 'cs', type: 'fill',
      stem: '应急响应流程通常包括检测、遏制、根除、恢复和 ______ 五个阶段。',
      answer: '总结', accept: ['总结','事后总结','复盘','跟踪'],
      analysis: { ans: '总结', why: 'PDCER 模型或类似应急响应模型通常包含：检测（Detection）、遏制（Containment）、根除（Eradication）、恢复（Recovery）、总结（Lessons Learned/事后复盘）。', steps: '1. 检测：发现异常和确认事件。\n2. 遏制：隔离受影响系统，防止扩散。\n3. 根除：清除威胁根因（如清除木马、修补漏洞）。\n4. 恢复：恢复业务和验证完整性。\n5. 总结：复盘改进，更新预案和防御措施。', pit: '很多企业只做到「恢复」，忽略了「总结」，导致同类事件反复发生。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'sec-intro-L2', kpIds: ['sec-intro'], subject: 'cs', level: 2,
      title: '网络安全概述：CIA 三元组与风险',
      estMinutes: 30,
      hookTitle: '为什么银行既要防偷看，又要防篡改，还要保证随时能取钱？',
      hookBody: '因为安全不是一个单点问题，而是三个目标的平衡：信息不能泄露给不该看的人（机密性），不能被偷偷改掉（完整性），服务必须在需要时可用（可用性）。这就是 CIA 三元组。',
      idea: '网络安全的核心目标是保护信息的**机密性（Confidentiality）、完整性（Integrity）和可用性（Availability）**，简称 CIA 三元组。在此基础上，还需要识别威胁、脆弱性和风险，形成整体安全观。',
      diagramId: 'sec-triad', diagramCaption: 'CIA 三元组：机密性、完整性、可用性',
      analogy: { title: '房子安全模型', md: '机密性就像门锁，防止外人偷看家里的东西；完整性就像监控，防止有人进屋把东西换掉；可用性就像大门不能堵死，主人随时能正常进出。三者缺一不可。' },
      points: [
        { title: '一、机密性：不让未授权的人看到', md: '通过加密、访问控制、身份认证等手段，确保敏感信息只能被授权用户访问。泄露机密性会导致隐私曝光、商业机密流失。' },
        { title: '二、完整性：不被未授权地篡改', md: '通过哈希校验、数字签名、版本控制等手段，确保数据在存储和传输过程中保持一致，防止被恶意或意外修改。' },
        { title: '三、可用性：授权用户随时可用', md: '通过冗余、备份、容灾、DDoS 防护等手段，确保系统和数据在需要时能够正常访问。宕机、勒索加密都会破坏可用性。' },
        { title: '四、威胁：潜在的攻击来源', md: '威胁是可能利用脆弱性对系统造成损害的任何因素，包括黑客、恶意软件、内部人员、自然灾害等。' },
        { title: '五、脆弱性：系统自身的弱点', md: '脆弱性是系统配置、代码、流程中存在的缺陷，如未修补的漏洞、弱密码、错误的权限配置。' },
        { title: '六、风险：威胁利用脆弱性的后果', md: '风险 = 威胁 × 脆弱性 × 影响。安全管理的目标不是消灭所有威胁，而是把风险降到可接受水平。' }
      ],
      table: {
        headers: ['概念', '含义', '例子'],
        rows: [
          ['机密性', '防止未授权泄露', '加密文件、权限分级'],
          ['完整性', '防止未授权篡改', '数字签名、哈希校验'],
          ['可用性', '保证授权访问', '备份、负载均衡、CDN'],
          ['风险', '损失的可能性', '未打补丁的服务器暴露在公网']
        ]
      },
      code: '# 风险 = 威胁 × 脆弱性 × 影响\n# 降低风险的三条路径：\n# 1. 减少威胁（部署防火墙、WAF）\n# 2. 消除脆弱性（打补丁、代码审计）\n# 3. 降低影响（备份、购买保险）',
      warning: 'CIA 三者之间可能存在冲突。例如过度加密可能影响可用性（性能下降），过度限权也可能影响业务效率。安全永远是「够用就好」的平衡艺术。',
      quizIds: ['sec-intro-1','sec-intro-2','sec-intro-3','sec-intro-4'],
      example: {
        title: '分析一次数据泄露事件的 CIA 影响',
        steps: [
          { md: '事件：某电商数据库被拖库，百万用户手机号和地址泄露。' },
          { md: '机密性：用户隐私信息被未授权获取，直接破坏机密性。' },
          { md: '完整性：如果攻击者同时篡改了订单状态，完整性也受损。' },
          { md: '可用性：若数据库被加密勒索，则业务停摆，可用性受损。' }
        ],
        takeaway: '一次事件可能同时破坏多个安全属性，分析时要逐一检查 CIA。'
      },
      example2: {
        title: '评估一个系统的风险等级',
        steps: [
          { md: '资产：用户支付数据库。' },
          { md: '威胁：外部 SQL 注入攻击。' },
          { md: '脆弱性：应用使用字符串拼接 SQL，且无 WAF。' },
          { md: '影响：支付信息泄露，公司面临法律诉讼和品牌损失。' },
          { md: '结论：风险极高，需立即整改为参数化查询。' }
        ],
        takeaway: '风险评估先列资产，再找威胁和脆弱性，最后定级。'
      },
      guided: [{ questionId: 'sec-intro-1', hint: 'CIA 三个英文单词的首字母分别是什么？' }],
      solo: ['sec-intro-2','sec-intro-3'],
      challenge: ['sec-intro-4'],
      summary: {
        essence: 'CIA 三元组是网络安全的基石：机密性防泄露、完整性防篡改、可用性保服务；风险由威胁、脆弱性和影响共同决定。',
        formulas: ['风险 = 威胁 × 脆弱性 × 影响', 'CIA = 机密性 + 完整性 + 可用性'],
        pitfalls: ['把认证当成 CIA 之一', '把威胁和风险混为一谈', '忽视可用性导致过度限权'],
        checklist: ['我能说出 CIA 三个单词', '我能区分威胁、脆弱性和风险', '我能用 CIA 分析安全事件']
      },
      feynman: '请用「房子安全」的比喻，给一个完全不懂技术的人讲清楚 CIA 三元组。'
    }),

    Z.makeLesson({
      id: 'sec-attack-L2', kpIds: ['sec-attack'], subject: 'cs', level: 2,
      title: '常见网络攻击：XSS、CSRF、SQL 注入与 DDoS',
      estMinutes: 40,
      hookTitle: '为什么点了一个陌生链接，你的社交账号就「帮」别人发了广告？',
      hookBody: '因为攻击者利用了 Web 应用的漏洞或浏览器的信任机制。理解常见攻击的原理和防御，是开发者和用户都必须具备的安全常识。',
      idea: '攻击者利用 Web 应用漏洞实施攻击。本讲聚焦 XSS（跨站脚本）、CSRF（跨站请求伪造）、SQL 注入、DDoS（分布式拒绝服务）和钓鱼攻击的原理与防御措施。',
      analogy: { title: '快递与入侵', md: 'XSS = 在快递单备注里写恐吓信，快递员（浏览器）念给收件人听；CSRF = 假冒你的签名去代收快递；SQL 注入 = 在订单备注里写暗号，让仓库发错整批货；DDoS = 雇人堵门，让正常顾客进不来；钓鱼 = 假扮快递员打电话骗你开门。' },
      points: [
        { title: '一、XSS：在页面里注入恶意脚本', md: '攻击者把 JavaScript 注入到目标网页中，其他用户浏览时脚本在其浏览器执行，可窃取 Cookie、伪造请求或键盘记录。防御：输入过滤 + 输出编码 + CSP。' },
        { title: '二、CSRF：伪造用户已认证的请求', md: '利用浏览器自动携带 Cookie 的特性，诱导已登录用户访问恶意链接，在用户不知情下执行转账、改密等操作。防御：CSRF Token、SameSite Cookie、二次确认。' },
        { title: '三、SQL 注入：把输入拼进 SQL', md: '应用程序未对用户输入做处理，直接把输入拼接到 SQL 语句中，导致攻击者可以改变查询逻辑。防御：参数化查询/预编译语句。' },
        { title: '四、DDoS：用海量请求压垮服务', md: '控制大量僵尸主机同时向目标发送请求，耗尽带宽或计算资源，导致正常用户无法访问。防御：流量清洗、CDN、限流、扩容。' },
        { title: '五、钓鱼：伪造身份骗取信任', md: '通过伪造邮件、网站或短信，诱导受害者泄露密码、转账或下载木马。防御：安全意识教育、邮件过滤、域名监测。' },
        { title: '六、防御的核心思想：纵深防御', md: '没有单一措施能防住所有攻击。要在网络层、应用层、数据层、人员层分别设防，形成多层屏障。' },
        { title: '七、开发者的责任：默认不信任输入', md: '所有来自用户、第三方接口、文件上传的数据都应被视为不可信，必须经过校验和消毒才能使用。' }
      ],
      table: {
        headers: ['攻击类型', '目标', '核心防御'],
        rows: [
          ['XSS', '用户浏览器', '输出编码、CSP'],
          ['CSRF', '已认证用户会话', 'CSRF Token、SameSite'],
          ['SQL 注入', '数据库', '参数化查询'],
          ['DDoS', '服务可用性', 'CDN、限流、WAF'],
          ['钓鱼', '人的信任', '安全教育、域名监测']
        ]
      },
      code: '// 防御 SQL 注入的正确做法（参数化查询示例）\nconst sql = "SELECT * FROM users WHERE id = ?";\ndb.query(sql, [userId]); // 用户输入不会成为代码',
      warning: '黑名单过滤（如只替换几个关键字）非常容易被绕过，安全防御应使用白名单和框架自带机制。',
      quizIds: ['sec-attack-1','sec-attack-2','sec-attack-3','sec-attack-4'],
      example: {
        title: '防御 XSS 的输出编码',
        steps: [
          { md: '场景：用户在评论区输入 `<script>alert(1)</script>`。' },
          { md: '错误做法：直接插入 HTML，脚本会被执行。' },
          { md: '正确做法：输出前把 `<` 编码为 `&lt;`，`>` 编码为 `&gt;`。' },
          { md: '浏览器展示为纯文本，不会执行脚本。' }
        ],
        takeaway: '输出编码是防御 XSS 的最后一道防线，不要信任任何用户输入。'
      },
      example2: {
        title: '用参数化查询防御 SQL 注入',
        steps: [
          { md: '错误写法：`"SELECT * FROM users WHERE name = \'" + name + "\'"`。' },
          { md: '攻击者输入 `\' OR \'1\'=\'1`，导致返回全部用户。' },
          { md: '正确写法：使用占位符 `?`，数据库把输入当数据而不是代码。' },
          { md: '即使输入包含 SQL 关键字，也不会改变查询逻辑。' }
        ],
        takeaway: '永远不要拼接 SQL，参数化查询是唯一的标准做法。'
      },
      guided: [{ questionId: 'sec-attack-1', hint: 'XSS 的关键词是「脚本」和「注入」。' }],
      solo: ['sec-attack-2','sec-attack-3'],
      challenge: ['sec-attack-4'],
      summary: {
        essence: '常见攻击利用的是信任边界漏洞：XSS 信任了用户脚本、CSRF 信任了浏览器自动带 Cookie、SQL 注入信任了用户输入为代码。',
        formulas: ['XSS 防御 = 输入过滤 + 输出编码 + CSP', 'CSRF 防御 = Token + SameSite + 二次确认', 'SQL 注入防御 = 参数化查询'],
        pitfalls: ['用黑名单过滤代替输出编码', '把 CSRF 和 XSS 混为一谈', '前端验证代替后端验证'],
        checklist: ['我能区分 XSS 和 CSRF', '我能写出参数化查询思路', '我能说出 DDoS 的防御手段']
      },
      feynman: '请用「快递与入侵」的比喻，分别解释 XSS、CSRF 和 SQL 注入。'
    }),

    Z.makeLesson({
      id: 'sec-crypto-L2', kpIds: ['sec-crypto'], subject: 'cs', level: 2,
      title: '密码学基础：加密、哈希与数字签名',
      estMinutes: 40,
      hookTitle: '如何把一封信放进全世界都能看到的邮箱，却只有指定的人能读懂？',
      hookBody: '靠的就是密码学。对称加密像一把锁配一把钥匙；非对称加密像信箱，大家都能投信，但只有收件人有钥匙打开；哈希像指纹，能验明正身。',
      idea: '密码学提供机密性、完整性、认证和不可否认性的数学保障。**对称加密（AES）**速度快，适合大数据；**非对称加密（RSA）**解决密钥分发问题；**哈希（SHA）**做数据指纹；**数字签名**验证身份和完整性。',
      analogy: { title: '锁、信箱与身份证', md: '对称加密 = 同一把锁和钥匙，锁门开门都用它；非对称加密 = 公共信箱（公钥）大家都能投信，但只有你有私人钥匙（私钥）开；哈希 = 文件的身份证号，改一个字身份证号全变；数字签名 = 用私钥盖的章，公钥能验真假。' },
      points: [
        { title: '一、对称加密：一把钥匙开一把锁', md: '加密和解密使用同一密钥，速度快，适合大量数据加密。典型算法：AES、SM4。问题是密钥如何安全传输给对方。' },
        { title: '二、非对称加密：公钥加密，私钥解密', md: '使用密钥对：公钥公开，用于加密或验签；私钥保密，用于解密或签名。典型算法：RSA、ECC、SM2。速度较慢，通常不直接加密大数据。' },
        { title: '三、混合加密：各取所长', md: '实际场景中（如 HTTPS），先用非对称加密协商出对称密钥，再用对称加密传输数据，兼顾安全与性能。' },
        { title: '四、哈希：数据的指纹', md: '哈希函数把任意长度输入转成固定长度摘要，具有单向性（无法反推）和抗碰撞性（难以找到两个不同输入产生相同输出）。典型：SHA-256、SM3。' },
        { title: '五、数字签名：验身份 + 防篡改', md: '发送者对消息哈希值用私钥加密生成签名，接收者用公钥解密验证。能证明消息确实来自发送者且未被篡改，发送者无法否认。' },
        { title: '六、密码学的应用场景', md: '文件加密、密码存储（加盐哈希）、软件签名、HTTPS、区块链、数字证书等。' },
        { title: '七、不要自己造密码算法', md: '密码算法的安全性需要全球数学家长期检验。工程上应使用成熟库（OpenSSL、libsodium）和标准算法，绝不要自研加密算法。' }
      ],
      table: {
        headers: ['技术', '作用', '典型算法', '是否可逆'],
        rows: [
          ['对称加密', '保密数据', 'AES, SM4', '可逆（需密钥）'],
          ['非对称加密', '密钥交换、签名', 'RSA, ECC, SM2', '可逆（需私钥）'],
          ['哈希', '校验完整性', 'SHA-256, SM3', '不可逆'],
          ['数字签名', '认证 + 不可否认', 'RSA+SHA', '可验证']
        ]
      },
      code: '# 用哈希校验文件完整性（概念示例）\nimport hashlib\nwith open("file.zip", "rb") as f:\n    digest = hashlib.sha256(f.read()).hexdigest()\n# 对比官方公布的哈希值，一致则文件未被篡改',
      warning: 'MD5 和 SHA-1 已被证明存在碰撞风险，不再推荐用于安全场景；密码存储不要用简单哈希，应使用 bcrypt、Argon2 等专用慢哈希算法并加盐。',
      quizIds: ['sec-crypto-1','sec-crypto-2','sec-crypto-3','sec-crypto-4'],
      example: {
        title: '用哈希校验下载文件的完整性',
        steps: [
          { md: '从官网下载软件安装包。' },
          { md: '官网同时提供 SHA-256 哈希值。' },
          { md: '下载完成后，本地计算文件的 SHA-256。' },
          { md: '对比两个哈希值，一致说明文件未被篡改。' }
        ],
        takeaway: '哈希是校验文件完整性的最简单方法。'
      },
      example2: {
        title: '非对称加密保护对称密钥',
        steps: [
          { md: '客户端生成一个随机的对称密钥（会话密钥）。' },
          { md: '用服务器的公钥加密这个会话密钥，发送给服务器。' },
          { md: '服务器用私钥解密，获得会话密钥。' },
          { md: '之后双方用该对称密钥加密通信，速度快且安全。' }
        ],
        takeaway: '这就是 HTTPS 握手阶段的核心思路：非对称加密传密钥，对称加密传数据。'
      },
      guided: [{ questionId: 'sec-crypto-1', hint: 'AES 是对称加密的代表，RSA 是非对称的代表。' }],
      solo: ['sec-crypto-2','sec-crypto-3'],
      challenge: ['sec-crypto-4'],
      summary: {
        essence: '对称加密快、非对称加密解决密钥分发、哈希做指纹、数字签名验身份；工程上永远使用成熟标准算法和库。',
        formulas: ['HTTPS = 非对称协商密钥 + 对称加密通信', '数字签名 = 私钥加密(哈希(消息))', '哈希 ≠ 加密'],
        pitfalls: ['把哈希当加密用', '自己造加密算法', '用 MD5/SHA-1 做安全校验', '把私钥上传到代码仓库'],
        checklist: ['我能区分对称与非对称加密', '我能解释数字签名的作用', '我能说出 SHA-256 的用途', '我知道 HTTPS 为什么快又安全']
      },
      feynman: '请解释为什么 HTTPS 同时需要非对称加密和对称加密，只用一种不行吗？'
    }),

    Z.makeLesson({
      id: 'sec-auth-L3', kpIds: ['sec-auth'], subject: 'cs', level: 3,
      title: '认证与授权：Cookie、Session、Token 与 JWT',
      estMinutes: 45,
      hookTitle: '为什么你登录一次网站，之后几天都不用再输密码？',
      hookBody: '因为服务器给你发了一张「会员卡」（Session ID 或 Token），浏览器每次请求都自动带上它，服务器一看就知道「是你」。但不同的「会员卡」技术各有优劣，选错场景会出大问题。',
      idea: '**认证**确认「你是谁」，**授权**决定「你能做什么」。从传统的 Cookie/Session 到无状态的 JWT，再到第三方 OAuth2 授权，每种方案都有适用场景和潜在风险。',
      analogy: { title: '游乐园的三种入园方式', md: 'Cookie/Session = 进门发手环，园区门口查手环背后的系统记录；JWT = 门票本身印了你的全部信息和有效期，园区直接看票就行；OAuth2 = 用微信扫码登录第三方 App，微信替你证明身份，你不需要把微信密码告诉第三方。' },
      points: [
        { title: '一、Cookie：浏览器的小纸条', md: '服务器通过 Set-Cookie 把数据存在浏览器，后续请求浏览器自动带上。可设置 HttpOnly（防脚本读取）、Secure（仅 HTTPS 传输）、SameSite（防 CSRF）。' },
        { title: '二、Session：服务器端的记忆', md: 'Session 把用户状态存在服务器，通过 Session ID（存在 Cookie 里）关联。优点是安全、可即时注销；缺点是多服务器需要共享存储（如 Redis）。' },
        { title: '三、Token：服务器无状态的凭据', md: '服务器不保存会话，把所有信息放在 Token 里发给客户端，客户端每次请求带回来。优点是服务端无状态、易扩展；缺点是 Token 一旦签发，在过期前无法提前撤销。' },
        { title: '四、JWT：自包含的 Token', md: 'JWT 格式为 Header.Payload.Signature，Payload 携带用户数据和过期时间。服务端用密钥验证签名即可信任内容。适合微服务和跨域场景。' },
        { title: '五、OAuth2：委托授权的标准', md: '允许用户授权第三方应用访问其资源，而不暴露密码。最常见的「授权码模式」先给 Code，再用 Code 换 Access Token。' },
        { title: '六、认证 vs 授权', md: '认证是「证明你是你」（登录、验密）；授权是「决定你能做什么」（管理员能删帖，普通用户只能看）。不要混为一谈。' },
        { title: '七、安全要点', md: 'Token 设置合理过期时间；敏感接口二次验证；Refresh Token 比 Access Token 有效期更长但权限更小；密钥泄露则所有 Token 都危险。' }
      ],
      table: {
        headers: ['方案', '状态存储', '优点', '缺点'],
        rows: [
          ['Session', '服务端', '可即时注销、安全', '多机需共享存储'],
          ['JWT', '客户端', '无状态、易扩展', '过期前无法撤销'],
          ['OAuth2', '授权服务器', '不暴露密码', '流程复杂']
        ]
      },
      code: '// 带安全标志的 Cookie 设置示例\nSet-Cookie: sessionId=xxx; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600',
      warning: 'JWT 的 Payload 只是 Base64Url 编码，不是加密，不要在 Payload 中存放密码等敏感信息。密钥泄露后攻击者可伪造任意 JWT。',
      quizIds: ['sec-auth-1','sec-auth-2','sec-auth-3','sec-auth-4'],
      example: {
        title: '解析一个 JWT 的结构',
        steps: [
          { md: '拿到 JWT：`eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWEifQ.signature`' },
          { md: '第一部分 Header：Base64 解码后得到 `{alg:"HS256"}`，说明签名算法。' },
          { md: '第二部分 Payload：Base64 解码后得到 `{user:"aa",exp:...}`。' },
          { md: '第三部分 Signature：用密钥对前两部分签名，服务端用它验证是否被篡改。' }
        ],
        takeaway: 'JWT 是自包含的，但 Payload 任何人都能解码看到，不要放敏感数据。'
      },
      example2: {
        title: 'OAuth2 授权码流程',
        steps: [
          { md: '用户访问第三方应用，点击「用微信登录」。' },
          { md: '浏览器重定向到微信授权服务器，用户扫码同意。' },
          { md: '微信返回 Authorization Code 给第三方后端。' },
          { md: '第三方后端用 Code + Client Secret 向微信换取 Access Token。' },
          { md: '第三方用 Access Token 调用微信接口获取用户昵称和头像。' }
        ],
        takeaway: '授权码模式把最敏感的 Token 交换放在服务端完成，避免泄露到浏览器端。'
      },
      guided: [{ questionId: 'sec-auth-1', hint: 'JWT 三部分用点号分隔，最后一部分是签名。' }],
      solo: ['sec-auth-2','sec-auth-3'],
      challenge: ['sec-auth-4'],
      summary: {
        essence: 'Cookie/Session 把状态存服务端，JWT 把状态放客户端；OAuth2 是委托授权的标准；认证是验身份，授权是控权限。',
        formulas: ['JWT = Header.Payload.Signature', 'OAuth2 授权码 = Code → Access Token', 'Cookie 安全 = HttpOnly + Secure + SameSite'],
        pitfalls: ['把认证和授权混为一谈', '在 JWT Payload 里放密码', 'Session 不共享导致多机登录失效', 'OAuth2 把 Token 暴露在 URL'],
        checklist: ['我能比较 Session 和 JWT 的优劣', '我能画出 OAuth2 授权码流程', '我知道 Cookie 的三个安全属性', '我能解释认证与授权的区别']
      },
      feynman: '请解释 Session 和 JWT 的核心区别，以及在什么场景下应该选 JWT。'
    }),

    Z.makeLesson({
      id: 'sec-https-L3', kpIds: ['sec-https'], subject: 'cs', level: 3,
      title: 'HTTPS 与证书：TLS 握手与中间人攻击防御',
      estMinutes: 45,
      hookTitle: '为什么地址栏多了把小锁，就能安心输密码？',
      hookBody: '因为小锁背后是一套完整的加密和信任体系：TLS 握手协商出只有你和服务器知道的密钥，证书体系确保你对话的对象不是冒充者。',
      idea: '**HTTPS = HTTP + TLS**。TLS 握手协商出会话密钥，证书体系由受信任的 CA 背书。理解 TLS 握手、证书链验证和中间人攻击的防御机制，是排查 HTTPS 故障的基础。',
      analogy: { title: '透明房间里的暗号协商', md: 'TLS 握手就像两个人在透明房间里商量暗号：先用公开的密码盒子交换秘密（非对称加密），商量好后改用暗号说话（对称加密）。证书就像身份证，CA 是公安局，浏览器是酒店前台——只认公安局发的证。' },
      points: [
        { title: '一、TLS 握手的核心目标', md: '在不可信的网络上，协商出只有通信双方知道的对称会话密钥，并验证服务器身份。TLS 1.3 简化了握手过程，通常只需一次往返。' },
        { title: '二、握手的关键步骤', md: '1. 客户端发送支持的加密套件和随机数。2. 服务器返回证书、选定加密套件和随机数。3. 客户端验证证书，生成预主密钥并用公钥加密发送。4. 双方用随机数和预主密钥生成会话密钥。5. 之后用会话密钥对称加密通信。' },
        { title: '三、证书的作用', md: '证书包含服务器公钥、域名、有效期和签发者信息。浏览器用证书中的公钥加密预主密钥，确保证书持有者才能解密。' },
        { title: '四、证书链与 CA', md: '服务器证书由中间 CA 签发，中间 CA 由根 CA 签发。浏览器内置受信任的根 CA 列表，逐级验证签名直到根 CA。' },
        { title: '五、中间人攻击如何被防御', md: '中间人可拦截流量，但无法伪造受信任 CA 签发的证书。浏览器校验不通过会显示警告，阻止用户继续访问。' },
        { title: '六、证书常见问题', md: '证书过期、域名不匹配、自签名证书、中间证书缺失都会导致浏览器报警。生产环境应使用受信任 CA 签发的通配符或多域名证书。' },
        { title: '七、HTTP Strict Transport Security（HSTS）', md: '服务器通过 HSTS 头告诉浏览器：未来一段时间内只准用 HTTPS 访问，防止 SSL 剥离攻击（把 HTTPS 降级为 HTTP）。' }
      ],
      table: {
        headers: ['概念', '作用', '注意点'],
        rows: [
          ['TLS 握手', '协商会话密钥', 'TLS 1.3 更快更安全'],
          ['证书', '绑定公钥与域名', '必须由受信任 CA 签发'],
          ['证书链', '逐级验证信任', '不能缺少中间证书'],
          ['HSTS', '强制 HTTPS', '首次访问仍需小心剥离攻击']
        ]
      },
      code: '// 检查证书信息的命令行示例\nopenssl s_client -connect example.com:443 -servername example.com',
      warning: '如果用户手动点击「继续访问」绕过证书警告，中间人攻击仍然可能成功。安全教育和严格的证书策略缺一不可。',
      quizIds: ['sec-https-1','sec-https-2','sec-https-3','sec-https-4'],
      example: {
        title: 'TLS 握手中的密钥协商',
        steps: [
          { md: '客户端生成随机数 Client Random 发送给服务器。' },
          { md: '服务器生成随机数 Server Random，连同证书一起发回。' },
          { md: '客户端验证证书后，生成 Pre-Master Secret 并用服务器公钥加密发送。' },
          { md: '双方用三个随机数生成相同的会话密钥，后续通信全部用它加密。' }
        ],
        takeaway: '会话密钥由客户端和服务器共同推导，即使中间人截获了握手包，也无法算出密钥。'
      },
      example2: {
        title: '证书链验证过程',
        steps: [
          { md: '浏览器收到服务器证书，看到签发者是「中间 CA A」。' },
          { md: '浏览器用「中间 CA A」的公钥验证服务器证书签名。' },
          { md: '「中间 CA A」的证书由「根 CA R」签发，浏览器继续验证。' },
          { md: '「根 CA R」在浏览器内置信任列表中，验证通过，建立信任。' }
        ],
        takeaway: '证书链的终点必须是浏览器内置的根 CA，否则就会报不受信任。'
      },
      guided: [{ questionId: 'sec-https-1', hint: 'HTTPS 的 S 代表 Secure，实现安全的协议层是 SSL/TLS。' }],
      solo: ['sec-https-2','sec-https-3'],
      challenge: ['sec-https-4'],
      summary: {
        essence: 'HTTPS 通过 TLS 握手协商对称密钥，通过 CA 证书体系防止中间人；证书链必须完整且由受信任根 CA 背书。',
        formulas: ['HTTPS = HTTP + TLS', 'TLS 握手 = 非对称交换密钥 → 对称加密通信', '证书链 = 服务器证书 → 中间 CA → 根 CA'],
        pitfalls: ['忽略证书过期报警', '生产环境使用自签名证书', '缺少中间证书导致部分浏览器报错', '不启用 HSTS 导致 SSL 剥离'],
        checklist: ['我能描述 TLS 握手的核心步骤', '我能解释证书链如何建立信任', '我知道为什么 HTTPS 能防中间人', '我能排查常见证书错误']
      },
      feynman: '请解释 TLS 握手为什么要生成「会话密钥」，而不直接用非对称加密传所有数据。'
    }),

    Z.makeLesson({
      id: 'sec-vuln-L2', kpIds: ['sec-vuln'], subject: 'cs', level: 2,
      title: '漏洞与防护：OWASP Top 10 与安全编码',
      estMinutes: 35,
      hookTitle: '为什么同一个搜索框，有人用来查资料，有人却能「黑」进数据库？',
      hookBody: '因为开发者在写代码时「过于信任」了用户的输入。绝大多数安全漏洞都源于同一个错误：把用户的数据当成了代码执行。',
      idea: 'OWASP Top 10 列出了 Web 应用最常见的安全风险。安全编码的核心原则是：**不信任任何输入、最小权限、纵深防御**。掌握输入验证、输出编码和权限控制，能消除大部分常见漏洞。',
      analogy: { title: '城堡防御体系', md: 'OWASP Top 10 = 敌人最常用的十种攻城方式；输入验证 = 护城河前的安检门；输出编码 = 城墙上的防护网；最小权限 = 医生只能进诊室，不能进金库；纵深防御 = 即使敌人突破了一道防线，后面还有第二道、第三道。' },
      points: [
        { title: '一、OWASP Top 10 是什么', md: '由 OWASP 社区定期发布的十大 Web 安全风险排名，包括：注入、失效访问控制、敏感数据泄露、XML 外部实体、失效身份认证、安全配置错误、XSS、不安全反序列化、使用含有已知漏洞的组件、日志与监控不足。' },
        { title: '二、注入类漏洞的根源', md: '把用户输入直接拼接到 SQL、命令、LDAP、XPath 等语句中，导致输入被当作代码执行。参数化查询和 ORM 是根治方案。' },
        { title: '三、失效访问控制', md: '用户能通过篡改 URL、参数或隐藏字段访问未授权资源。防御：服务端校验权限，不要依赖前端隐藏按钮。' },
        { title: '四、敏感数据泄露', md: '明文传输或存储密码、信用卡号、身份证号。防御：传输用 TLS，存储用强加密，展示做脱敏。' },
        { title: '五、输入验证：白名单优于黑名单', md: '定义「允许什么」，而不是「禁止什么」。例如只允许数字和字母，比禁用几个特殊字符更可靠。' },
        { title: '六、最小权限原则', md: '程序运行账户、数据库账户、云服务权限都应只授予完成任务所需的最小权限。一旦某处被攻破，损失可被控制在最小范围。' },
        { title: '七、纵深防御：多层屏障', md: '不要依赖单一防御措施。网络层有防火墙，应用层有 WAF，代码层有输入验证，数据层有加密和审计日志。' }
      ],
      table: {
        headers: ['风险', '典型表现', '核心防御'],
        rows: [
          ['注入', 'SQL/命令注入', '参数化查询'],
          ['失效访问控制', '越权访问他人数据', '服务端权限校验'],
          ['敏感数据泄露', '明文存密码', '加密 + 脱敏'],
          ['安全配置错误', '默认密码未改', '安全基线检查'],
          ['日志不足', '被黑后无迹可寻', '集中日志与监控']
        ]
      },
      code: '// 安全编码示例：服务端权限校验（伪代码）\nfunction viewOrder(orderId, userId) {\n  const order = db.find(orderId);\n  if (order.userId !== userId) {\n    throw new Forbidden("无权查看他人订单");\n  }\n  return order;\n}',
      warning: '「前端隐藏删除按钮」不等于「后端禁止删除」。所有权限判断必须在服务端完成，前端只是交互展示。',
      quizIds: ['sec-vuln-1','sec-vuln-2','sec-vuln-3','sec-vuln-4'],
      example: {
        title: '用白名单做输入验证',
        steps: [
          { md: '需求：用户输入一个手机号。' },
          { md: '黑名单思路：禁用 < > " 等特殊字符——容易被绕过。' },
          { md: '白名单思路：正则匹配 `^1[3-9]\\d{9}$`，只允许 11 位数字且以 1 开头。' },
          { md: '不匹配则直接拒绝，而不是尝试清洗。' }
        ],
        takeaway: '白名单策略更清晰、更可靠，是输入验证的首选。'
      },
      example2: {
        title: '最小权限原则在数据库中的应用',
        steps: [
          { md: '错误做法：应用数据库账户使用 root，拥有所有权限。' },
          { md: '风险：一旦应用被注入，攻击者可删库、删表。' },
          { md: '正确做法：为应用创建专用账户，只授予需要的表和权限。' },
          { md: '例如：只读报表账户只有 SELECT 权限，不写、不删。' }
        ],
        takeaway: '权限越小，攻击者能造成的破坏就越有限。'
      },
      guided: [{ questionId: 'sec-vuln-2', hint: 'XSS 是脚本注入到页面被执行，防御重点在输出时把脚本变成纯文本。' }],
      solo: ['sec-vuln-1','sec-vuln-3'],
      challenge: ['sec-vuln-4'],
      summary: {
        essence: '绝大多数漏洞源于信任输入；OWASP Top 10 是攻防清单；白名单验证、最小权限和纵深防御是安全编码的三大支柱。',
        formulas: ['安全编码 = 输入验证 + 输出编码 + 权限控制', '最小权限 = 只给必需的访问范围'],
        pitfalls: ['前端隐藏代替后端校验', '黑名单过滤代替白名单', '使用默认配置和默认密码', '日志不足导致无法溯源'],
        checklist: ['我能说出 OWASP Top 10 中的至少 5 项', '我会用白名单做输入验证', '我能解释最小权限原则', '我知道纵深防御的含义']
      },
      feynman: '请解释为什么「前端隐藏删除按钮」不能防止越权删除，以及正确的做法是什么。'
    }),

    Z.makeLesson({
      id: 'sec-legal-L2', kpIds: ['sec-legal'], subject: 'cs', level: 2,
      title: '网络安全法律与合规：等保与个人信息保护',
      estMinutes: 30,
      hookTitle: '数据泄露后，公司除了赔钱，还可能面临什么？',
      hookBody: '技术修复只是第一步。如果违反《网络安全法》《数据安全法》《个人信息保护法》，企业可能面临高额罚款、停业整顿甚至刑事责任。合规是安全的底线。',
      idea: '中国网络安全合规的「三驾马车」是《网络安全法》《数据安全法》《个人信息保护法》，配合等保（等级保护）制度，构成了企业与组织必须遵守的安全合规框架。',
      analogy: { title: '交通规则与驾照考试', md: '网络安全法 = 道路交通安全法，规定谁该负责、出事了怎么罚；数据安全法 = 货车运输管理条例，规定重要货物怎么运；个人信息保护法 = 乘客隐私保护规定；等保 = 驾照分级考试，车越重（系统越重要），考试越严。' },
      points: [
        { title: '一、《网络安全法》：网络空间的基础法', md: '2017 年 6 月 1 日施行。要求网络运营者履行安全保护义务，实行网络安全等级保护制度，关键信息基础设施运营者需每年进行安全检测评估。' },
        { title: '二、《数据安全法》：数据分级分类保护', md: '2021 年 9 月 1 日施行。建立数据分类分级保护制度，对重要数据和国家核心数据实行更严格管理，规范数据出境安全评估。' },
        { title: '三、《个人信息保护法》：最小必要与知情同意', md: '2021 年 11 月 1 日施行。处理个人信息需遵循合法、正当、必要和诚信原则，获取用户知情同意，保障用户查询、更正、删除的权利。' },
        { title: '四、等保 2.0：五级安全保护', md: '等保将信息系统安全等级划分为五级。日常企业系统通常做到第三级（监督保护级）即可。等保测评需由具备资质的机构执行。' },
        { title: '五、合规与技术的结合', md: '合规不是「补材料」，而是要在系统设计、开发、运维全流程中落实。安全审计日志留存、数据加密、访问控制、应急响应都是等保和法律的共同要求。' },
        { title: '六、违法后果', md: '罚款、暂停业务、吊销执照、追究刑事责任。个人信息处理者违法最高可处 5000 万元或上一年度营业额 5% 以下罚款。' }
      ],
      table: {
        headers: ['法律/制度', '施行时间', '核心要点'],
        rows: [
          ['网络安全法', '2017-06-01', '等级保护、安全义务'],
          ['数据安全法', '2021-09-01', '分类分级、重要数据保护'],
          ['个人信息保护法', '2021-11-01', '知情同意、最小必要'],
          ['等保 2.0', '2019-12-01', '五级保护、测评合规']
        ]
      },
      code: '// 合规检查清单（示例）\n// 1. 是否对敏感数据进行了加密存储？\n// 2. 是否获取了用户的明确同意？\n// 3. 是否留存了 6 个月以上的安全审计日志？\n// 4. 是否通过了等保测评？',
      warning: '合规是底线而非上限。通过等保测评不代表系统绝对安全，后续仍需持续的安全运营和漏洞管理。',
      quizIds: ['sec-legal-1','sec-legal-2','sec-legal-3','sec-legal-4'],
      example: {
        title: '等保定级',
        steps: [
          { md: '系统 A：公司内部办公系统，泄露后影响较小。' },
          { md: '判定为等保第二级（指导保护级）。' },
          { md: '系统 B：城市电力调度系统，一旦瘫痪影响公共利益。' },
          { md: '判定为等保第四级（强制保护级），需更严格的安全措施。' }
        ],
        takeaway: '等保定级看的是「受侵害客体」和「损害程度」，不是公司规模。'
      },
      example2: {
        title: '个人信息处理合规检查',
        steps: [
          { md: '场景：App 注册时收集手机号、定位、通讯录。' },
          { md: '检查 1：收集通讯录是否超出业务必需？违反最小必要原则。' },
          { md: '检查 2：隐私政策是否以显著方式告知用户？' },
          { md: '检查 3：用户是否可撤回同意并删除数据？' }
        ],
        takeaway: '合规的核心是「合法、正当、必要」六字。'
      },
      guided: [{ questionId: 'sec-legal-1', hint: '《网络安全法》在 2017 年儿童节前后施行。' }],
      solo: ['sec-legal-2','sec-legal-3'],
      challenge: ['sec-legal-4'],
      summary: {
        essence: '三部法律 + 等保构成了中国网络安全合规框架；合规不是可选项，是法律底线。',
        formulas: ['三部法律 = 网络安全法 + 数据安全法 + 个人信息保护法', '等保五级 = 自主/指导/监督/强制/专控'],
        pitfalls: ['把等保当成一次性项目', '超范围收集个人信息', '忽视数据出境合规要求', '安全日志留存不足'],
        checklist: ['我能说出三部法律的名称和施行时间', '我能解释等保五级', '我知道最小必要原则', '我能列举违法的主要后果']
      },
      feynman: '请解释为什么一个手电筒 App 索要「通讯录权限」可能违反《个人信息保护法》。'
    }),

    Z.makeLesson({
      id: 'sec-practice-L3', kpIds: ['sec-practice'], subject: 'cs', level: 3,
      title: '安全实践：密码策略、多因素认证与应急响应',
      estMinutes: 40,
      hookTitle: '为什么「密码 + 短信验证码」比单纯的长密码更安全？',
      hookBody: '因为即使密码被泄露，攻击者没有你的手机就无法通过第二道验证。多因素认证（MFA）把安全从「单点」变成了「多点」，大幅提升账号安全性。',
      idea: '安全不是一次性设置，而是持续运营。**强密码策略**降低被猜解风险，**多因素认证**增加攻击成本，**安全审计**发现异常，**应急响应**在出事时止损并复盘。',
      analogy: { title: '家庭安全与火灾演练', md: '强密码 = 用坚固的防盗门；MFA = 防盗门 + 指纹锁；安全审计 = 定期请锁匠检查门窗；应急响应 = 火灾演练：发现火情 → 报警 → 灭火 → 疏散 → 复盘改进。' },
      points: [
        { title: '一、强密码策略', md: '要求足够长度（至少 8-12 位）、混合大小写字母/数字/特殊字符、不使用常见弱口令、定期更换。密码应使用密码管理器生成和保存。' },
        { title: '二、多因素认证（MFA）', md: '结合三种因素中的至少两种：所知（密码）、所有（手机/硬件令牌）、所是（指纹/人脸）。即使密码泄露，没有第二因素也无法登录。' },
        { title: '三、安全审计', md: '定期审查日志、权限配置、访问记录，发现异常登录、越权操作和潜在漏洞。审计不仅是技术行为，也是合规要求。' },
        { title: '四、应急响应流程', md: '检测（发现异常）→ 遏制（隔离受影响系统）→ 根除（清除威胁根因）→ 恢复（恢复业务并验证完整性）→ 总结（复盘改进）。' },
        { title: '五、备份策略', md: '3-2-1 原则：至少 3 份副本，使用 2 种不同介质，其中 1 份离线存放。定期演练恢复，确保备份可用。' },
        { title: '六、安全意识教育', md: '技术再强也防不住人犯错。钓鱼邮件、社工攻击往往利用的是人的疏忽。定期安全培训和模拟钓鱼测试是必要的。' },
        { title: '七、供应链与第三方安全', md: '使用开源组件时要关注 CVE 漏洞，及时升级；第三方服务接入要评估其安全能力，避免「短板效应」。' }
      ],
      table: {
        headers: ['实践', '目的', '关键动作'],
        rows: [
          ['强密码策略', '防止暴力破解', '长度、复杂度、定期更换'],
          ['MFA', '提高账号安全', '密码 + 手机/令牌/生物特征'],
          ['安全审计', '发现异常和漏洞', '日志分析、权限审查'],
          ['应急响应', '快速止损', '检测、遏制、根除、恢复、总结'],
          ['备份', '灾难恢复', '3-2-1 原则、定期演练']
        ]
      },
      code: '// 弱口令示例（绝对禁止）\n// 123456, password, admin, qwerty\n// 强口令示例（使用密码管理器生成）\n// xK9#mP2$vL5@nQ1!',
      warning: '过于频繁的密码更换（如每周一次）可能导致用户把密码写在便签上，反而降低安全性。应在安全性和可用性之间找到平衡。',
      quizIds: ['sec-practice-1','sec-practice-2','sec-practice-3','sec-practice-4'],
      example: {
        title: '设计一套合理的密码策略',
        steps: [
          { md: '最小长度 12 位，包含大小写、数字、特殊字符。' },
          { md: '禁止常见弱口令和前 5 次使用过的密码。' },
          { md: '每 90 天提醒更换，不强制打断业务。' },
          { md: '推荐员工使用公司批准的密码管理器。' }
        ],
        takeaway: '密码策略要足够强，但也要考虑用户可接受度。'
      },
      example2: {
        title: '一次应急响应演练',
        steps: [
          { md: '检测：IDS 告警发现异常外联行为。' },
          { md: '遏制：立即隔离受影响服务器，阻断外联 IP。' },
          { md: '根除：取证分析后发现是未打补丁的漏洞，清除后门并打补丁。' },
          { md: '恢复：从干净备份恢复业务，验证完整性。' },
          { md: '总结：更新漏洞管理流程，增加自动补丁机制。' }
        ],
        takeaway: '应急响应的核心是快：发现快、隔离快、恢复快。'
      },
      guided: [{ questionId: 'sec-practice-1', hint: 'MFA 的三个因素：所知、所有、所是。家庭住址不属于这三类。' }],
      solo: ['sec-practice-2','sec-practice-3'],
      challenge: ['sec-practice-4'],
      summary: {
        essence: '安全实践 = 强密码 + MFA + 审计 + 应急 + 备份 + 意识；安全是持续运营，不是一次性项目。',
        formulas: ['MFA = 所知 + 所有 + 所是（至少两种）', '应急响应 = 检测 → 遏制 → 根除 → 恢复 → 总结', '备份 = 3-2-1 原则'],
        pitfalls: ['密码策略过严导致用户写纸条', '只做备份从不演练恢复', '应急响应只到恢复就结束，不复盘', '忽视供应链安全'],
        checklist: ['我能说出 MFA 的三种因素', '我能描述应急响应五阶段', '我知道 3-2-1 备份原则', '我能设计一套合理的密码策略']
      },
      feynman: '请解释为什么「密码 + 短信验证码」比单独使用一个 20 位复杂密码更安全。'
    })
  );
})(window.ZSB = window.ZSB || {});
