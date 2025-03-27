# HISE

# Introduction

 In this subject, we zoom into systems with software with fixed, well defined functionality — where correctness is paramount, and we  can engineer them from the start to meet strict requirements

**Methods for building large-scale  software that is fit for purpose**

![image-20250323102206360](C:\SWEN90010-HISE\assignment\assets\image-20250323102206360.png) 

 How are these different from ordinary software systems? **“must work right the first time”**

![image-20250323102321428](C:\SWEN90010-HISE\assignment\assets\image-20250323102321428.png) 

![image-20250323102458342](C:\SWEN90010-HISE\assignment\assets\image-20250323102458342.png) 

在形式化方法中，我们使用**形式化语言**描述系统应满足的属性（例如安全性、不变性）。

工具：**Alloy** —— 一种用于建模系统结构与约束的轻量级建模语言。



将系统设计形式化，建模其结构、行为和交互。

可以验证设计是否满足需求。

示例：状态机模型、系统行为图、架构模型。



使用形式语义检查代码行为是否符合预期。

工具与技术：

- **Hoare Logic（霍尔逻辑）**：推理代码是否符合规范，例如前置条件、后置条件。
- **SPARK**：一种用于写安全关键系统的语言（基于 Ada），内置支持形式验证。

# Safety Engineering

![image-20250323103225843](C:\SWEN90010-HISE\assignment\assets\image-20250323103225843.png) 

 Safety cannot be talked about  without considering the entire system

 e.g. a pilot might fail to notice a signal,  and be blamed (“pilot error”),  but blame is tricky to assign if the  signal was placed in the cockpit  at a location that was hard to see.

 We define safety as a system property or emergent attribute  such that when the system’s software and hardware are used  under correct operating conditions, they do not cause  unacceptable harm to people or the environment

![image-20250323103736048](C:\SWEN90010-HISE\assignment\assets\image-20250323103736048.png)  

 ![image-20250323104011336](C:\SWEN90010-HISE\assignment\assets\image-20250323104011336.png) 



## **Hazard and Operability Study (HAZOP)**

HAZOP Overview

![image-20250323104141766](C:\SWEN90010-HISE\assignment\assets\image-20250323104141766.png) 

**Hazard and Operability Study（HAZOP）** 是一种**系统化、结构化的方法**，用于识别系统中的 **潜在危险（Hazards）和 可操作性问题（Operability Issues）**，广泛应用于**安全关键系统设计**阶段。

它起源于化工行业，但同样适用于软件系统和高完整性系统中，例如铁路、航天、医疗设备和嵌入式系统。

HAZOP Process for each design item for each guideword interpret the guideword against the design item (ask “what could it mean?”) giving deviations from intended behaviour determine potential causes of each deviation potential consequences safeguards in place to mitigate it risk design recommendations

HAZOP Outcomes Big spreadsheet of hazards Lots of documentation Useful for building safety case And for analysing future safety incidents (But somebody has to manually analyse it all) Challenging, creative and interesting process Iterate by feeding recommendations back into design Since design recommendations will change  risk ratings

HAZOP Summary Overall Process 1. Identify design items 2. For each, do each guideword causes  consequences  safeguards  risk  (design) recommendations

HAZOP 是一种**结构化的团队分析方法**，用于识别系统设计中的潜在危险（Hazards）与可操作性问题（Operability Issues），并通过引导性问题寻找异常偏差的**原因（Cause）**、**后果（Consequence）**、**已有保护措施（Safeguard）\**以及\**改进建议（Design Recommendation）**，最终用于支持**安全论证（Safety Case）**。

| 中文术语 | 英文术语              | 含义描述                                               |
| -------- | --------------------- | ------------------------------------------------------ |
| 设计项   | Design Item           | 分析对象，如模块、接口、功能流程等                     |
| 指导词   | Guideword             | 用来引发偏差思考的词（如None, More, Less）             |
| 偏差     | Deviation             | 系统行为偏离预期的情况                                 |
| 原因     | Cause                 | 导致偏差出现的技术或人为原因                           |
| 后果     | Consequence           | 偏差可能造成的影响（如系统失败、安全隐患）             |
| 保护措施 | Safeguard             | 当前已有的机制，用于缓解或防止后果发生                 |
| 设计建议 | Design Recommendation | 对设计进行修改以消除或缓解风险的建议                   |
| 风险评估 | Risk Rating           | 评估偏差的严重程度、发生可能性、可检测性等综合风险等级 |
| 安全论证 | Safety Case           | 用于证明系统达到安全目标的文档和证据集合               |

HAZOP Summary

1. 识别设计项（Identify Design Items）

- 例如：登录模块、数据通信流程、加密模块等。

2. 对每个设计项，按每个指导词进行分析：

1. **解释指导词与该设计项的组合可能代表什么偏差**（What could it mean?）
2. **识别可能的偏差（Deviation）**
3. **分析偏差的潜在原因（Cause）**
4. **分析偏差的潜在后果（Consequence）**
5. **识别已有的保护措施（Safeguard）**
6. **评估风险等级（Risk Rating）**
7. **提出改进设计建议（Design Recommendation）**

每一个设计项 × 每一个指导词 → 一组完整分析记录

------

HAZOP 的产出（HAZOP Outcomes）

- 一张大型的 **风险分析表格**（Big Spreadsheet of Hazards）
- 系统性的 **文档记录**（Lots of Documentation）
- 可用于：
  - 构建 **安全论证（Safety Case）**
  - 分析未来出现的安全事故（Safety Incidents）
- 缺点：
  - 需要人工详细分析每个偏差
  - 分析过程具有挑战性但也很有创造性
  - **必须将设计建议回馈到原设计中**，迭代更新风险等级

**HAZOP 是一个迭代性、团队驱动、以偏差为中心的系统性安全分析方法，适用于早期发现设计缺陷，并为安全关键系统提供强有力的风险控制手段。**

## Fault Tree Analysis(FTA)

![image-20250323105041434](C:\SWEN90010-HISE\assignment\assets\image-20250323105041434.png) 

Uses of fault-tree analysis to work out whether/how to change design to guard  against causes. to determine causes that the design doesn’t guard against. documentation for safety case allow others to check our reasoning. calculate probabilities of hazards arising

## Threat Modelling (STRIDE)

## 安全属性（Canonical Security Properties）

![image-20250323110615331](C:\SWEN90010-HISE\assignment\assets\image-20250323110615331.png) 

### 1. 机密性（Confidentiality）

**中文解释：**
 确保信息或系统的数据只允许被授权的人看到，不允许未授权用户获取敏感数据。

**Web开发实际案例：**

- 案例：2019年Facebook泄露事件中，未做好访问权限控制（Access Control），导致超过5亿用户的信息被公开在网络上。
- 原理分析：黑客利用漏洞绕过了访问控制机制（Access Control），从而侵犯了机密性（Confidentiality），未经授权获取敏感信息。

**如何确保：**

- 通过HTTPS（TLS加密）保护数据传输。
- 正确的权限管理，确保敏感数据仅授权用户访问。

------

### 2. 完整性（Integrity）

**中文解释：**
 确保数据在存储和传输过程中不被篡改或破坏，保持数据准确性。

**Web开发实际案例：**

- 案例：2020年Twitter比特币诈骗事件，攻击者非法入侵了Twitter员工后台修改推文内容，从而导致数据完整性（Integrity）被破坏。
- 原理分析：攻击者获得管理员权限（Authentication失败导致），并篡改了系统数据，使得原始数据不再准确，误导公众。

**如何确保：**

- 使用消息认证码（HMAC）或数字签名确保数据未被篡改。
- 严格控制管理权限和日志记录，及时检测异常操作。

------

### 3. 可用性（Availability）

**中文解释：**
 确保系统和服务在需要时能正常运行，不会因为攻击、故障或其他因素而中断。

**Web开发实际案例：**

- 案例：2021年AWS大规模宕机事件，导致全球多个网站和服务（如Disney+和Netflix）长时间无法访问。
- 原理分析：由于基础设施故障，服务不可用（Availability问题），影响了用户的正常访问和使用。

**如何确保：**

- 部署负载均衡（Load Balancer）和冗余系统（Redundancy），避免单点故障（Single Point of Failure）。
- 使用CDN缓解DDoS攻击风险，提升服务可用性。

------

### 4. 认证（Authentication）

**中文解释：**
 确保某个用户、系统或进程确实是它所声称的身份，防止身份冒充。

**Web开发实际案例：**

- 案例：Yahoo在2013年发生严重的数据泄露事件，攻击者盗取了超过30亿个账户信息，原因之一是密码认证机制（Authentication）过于简单，易于被攻破。
- 原理分析：攻击者破解了用户的登录凭证（Credentials），获得了系统访问权限，从而窃取了敏感数据。

**如何确保：**

- 使用多因素认证（Multi-factor Authentication，MFA），如手机验证码、生物特征认证。
- 安全存储密码，例如使用bcrypt或Argon2等加密算法。

------

### 5. 访问控制（Access Control）

**中文解释：**
 确保认证后的实体只能执行被允许的操作，防止用户超出授权范围的操作。

**Web开发实际案例：**

- 案例：2022年微软Azure Cosmos DB暴露事件，攻击者利用权限漏洞访问其他用户的数据。
- 原理分析：由于权限管理（Access Control）设置不当，允许用户访问了未授权的数据区域，从而导致信息泄露。

**如何确保：**

- 明确定义基于角色的访问控制（RBAC，Role-Based Access Control）。
- 按最小权限原则（Least Privilege Principle）授予权限，仅授予完成任务所需的最少权限。

------

### 6. 不可否认性（Non-Repudiation）

**中文解释：**
 确保用户或系统无法事后否认自己执行过的操作或事务。

**Web开发实际案例：**

- 案例：2018年GitHub平台的一名员工删除了生产环境的数据库数据。此后，GitHub追溯日志记录，证实了操作的执行人及过程。
- 原理分析：完整的日志记录和审计机制（Audit Logging）保证了不可否认性（Non-Repudiation），防止当事人否认自己的行为。

**如何确保：**

- 在系统内使用数字签名（Digital Signature）和可靠的日志记录系统（Immutable Logs）。
- 使用区块链等技术提高记录的不可篡改性。



## **STRIDE**

![image-20250323110804641](C:\SWEN90010-HISE\assignment\assets\image-20250323110804641.png) 

STRIDE is a framework for modelling security  related threats in security critical systems STRIDE is an acronym where each of the letters refer  to different categories of threats the line up against  one or more of the canonical security properties

**Spoofing** pretending to be something  or someone you are not 

**Tampering** modifying something you  are not supposed to 

**Repudiation** claiming you didn’t do  something 

**Information Disclosure** revealing information to people  who are not supposed to see it 

**Denial of   Service** crashing a system, making it  too slow, exhausting its storage 

**Elevation of  Privilege** able to do something that,  technically, you not allowed to do



**STRIDE** 是一个用于在**系统设计早期阶段识别安全威胁**的结构化方法，适用于安全关键系统（security-critical systems）。
它的核心是将威胁分类，使开发者可以围绕系统的不同部分进行**系统性思考与防护设计**。STRIDE 的适用范围

- 特别适合建模**组件接口之间的威胁**（Trust Boundary Interfaces）
- 常用于设计阶段：例如 Web 系统中的用户、浏览器、服务器、数据库等各个模块间通信路径
- 可用于支持**安全设计**、**威胁建模图（Threat Modeling Diagrams）**、**攻击树（Attack Trees）** 等方法

### 1. 欺骗（Spoofing）

**中文解释：**
 伪装成其他人或系统，以假身份获取信任并访问敏感资源。

**对应安全属性：**

- 认证（Authentication）

**Web开发实际案例：**

- 案例：2020年Twitter名人账号被黑事件，攻击者成功欺骗管理员身份（Spoofing）进入后台系统，以名人账号发布虚假信息。
- 原理分析：攻击者冒充合法管理员，通过社交工程（Social Engineering）或窃取登录凭证，突破了身份认证机制，成功以管理员身份进入系统并发布虚假推文。

**如何防护：**

- 强化认证机制（多因素认证，MFA）。
- 限制登录尝试次数，防止暴力破解。

------

### 2. 篡改（Tampering）

**中文解释：**
 未经授权地修改数据或系统内容，破坏数据的完整性。

**对应安全属性：**

- 完整性（Integrity）

**Web开发实际案例：**

- 案例：2018年英国航空网站遭受攻击，攻击者在支付页面植入脚本代码篡改（Tampering）了网页，使客户支付信息被窃取。
- 原理分析：攻击者绕过权限控制后植入JavaScript恶意代码（Malicious JavaScript Injection），导致原本可信的网页内容被非法篡改，客户信用卡信息被盗取。

**如何防护：**

- 应用严格的权限访问控制。
- 使用数据校验机制（如HMAC、数字签名），保护网页资源不被篡改。

------

### 3. 抵赖（Repudiation）

**中文解释：**
 用户或系统在执行操作后，试图否认曾经执行过某项操作。

**对应安全属性：**

- 不可否认性（Non-Repudiation）

**Web开发实际案例：**

- 案例：GitLab在2017年意外删除大量用户数据的事件中，管理员最初可能抵赖（Repudiation）自身的错误操作。
- 原理分析：事件发生后，清晰完整的日志记录（Log Records）与审计轨迹（Audit Trail）证实了操作人的身份和操作内容，从而实现了不可抵赖性，确认了责任归属。

**如何防护：**

- 完善系统的审计日志机制。
- 使用数字签名技术，确立操作行为归属。

------

### 4. 信息泄露（Information Disclosure）

**中文解释：**
 敏感数据被未授权的人员或系统获得，破坏数据的机密性。

**对应安全属性：**

- 机密性（Confidentiality）

**Web开发实际案例：**

- 案例：2019年 Capital One 数据泄露事件，约1亿客户的信用卡申请信息因AWS配置不当而暴露给公众。
- 原理分析：由于云端服务器访问权限设置失误（Misconfiguration），敏感数据意外暴露（Information Disclosure），被外部未经授权的用户轻易访问。

**如何防护：**

- 合理设置权限与访问控制规则。
- 使用HTTPS、数据库加密、数据掩码等保护敏感信息。

------

### 5. 拒绝服务（Denial of Service, DoS）

**中文解释：**
 攻击者使系统无法正常提供服务，可能导致崩溃、速度缓慢或资源耗尽。

**对应安全属性：**

- 可用性（Availability）

**Web开发实际案例：**

- 案例：2016年大规模 DDoS 攻击 Mirai Botnet 攻击了 Dyn DNS 服务，导致 GitHub、Twitter、Spotify 等大型网站服务不可用数小时。
- 原理分析：攻击者使用大量设备同时发起访问请求，超过了目标服务器的处理能力，使正常用户无法访问（Denial of Service），严重影响了可用性（Availability）。

**如何防护：**

- 实施流量限制与速率控制。
- 使用负载均衡、冗余备份、内容分发网络（CDN）等技术抵抗 DDoS 攻击。

------

### 6. 权限提升（Elevation of Privilege, EoP）

**中文解释：**
 攻击者或用户获取了超出其原有授权范围的权限，执行未经授权的操作。

**对应安全属性：**

- 访问控制（Access Control）

**Web开发实际案例：**

- 案例：2021年 Microsoft Exchange Server 漏洞（ProxyLogon），攻击者利用漏洞从普通用户权限提升（EoP）到管理员权限，从而访问和操控邮件服务器。
- 原理分析：攻击者利用应用程序逻辑缺陷或漏洞，绕过权限控制机制，获得高于自己原本权限的操作能力，从而能控制系统或获取敏感数据。

**如何防护：**

- 实施严格的权限检查，限制用户权限在最小范围内（Least Privilege Principle）。
- 定期对应用进行安全审计和漏洞扫描，快速修复安全漏洞。

------

### 总结表格对照关系

| STRIDE威胁类别               | 中文含义 | 对应安全属性 (Canonical Security Property) |
| ---------------------------- | -------- | ------------------------------------------ |
| Spoofing                     | 欺骗     | Authentication（认证）                     |
| Tampering                    | 篡改     | Integrity（完整性）                        |
| Repudiation                  | 抵赖     | Non-Repudiation（不可否认性）              |
| Information Disclosure       | 信息泄露 | Confidentiality（机密性）                  |
| Denial of Service            | 拒绝服务 | Availability（可用性）                     |
| Elevation of Privilege (EoP) | 权限提升 | Access Control（访问控制）                 |



# A1

Security Threat Modelling and mitigation strategies.

PDF file:  **assignment_pair_64.pdf**

**deadline: Monday, March 31, 2025, at 11:59 PM**

![image-20250323101058934](C:\SWEN90010-HISE\assignment\assets\image-20250323101058934.png) 

知识点:

STRIDE methodology

## 系统架构概览（概述结构组件）

| component                               | controller                    |
| --------------------------------------- | ----------------------------- |
| **Web Interface**                       | User                          |
| **web server (CDN)**                    | VeriLens System Administrator |
| **Backend Server**                      | VeriLens System Administrator |
| **Database**                            | VeriLens System Administrator |
| **AI Processing Engine**                | VeriLens System Administrator |
| **Third-Party Identity Provider (IdP)** | Identity Provider (IdP)       |
| **Third-Party Billing Service**         | Billing Service Provider      |

**(a) 潜在攻击者是谁？**

- 谁可能会尝试利用该漏洞？是恶意黑客、内部人员、普通用户还是第三方服务？

**(b) 如果攻击成功，会违反哪一个或多个安全目标？**

- 例如：保密性（Confidentiality）、完整性（Integrity）、可用性（Availability）、认证（Authentication）、授权（Authorization）、不可否认性（Non-repudiation）等。

**(c) 攻击者是如何利用这个漏洞的？**

- 请尽可能具体，举出现实例或已知攻击技术来支持你的分析。
- 举例说明攻击者怎么做、利用什么工具或手段，以及他们的目的。

**(d) 哪些系统组件和信任边界会被影响？**

- 哪些模块会被攻破？攻击是否跨越信任边界？是否危及整个系统？



1, 2, 4, 5, 6, 18, 20, 23, 

**Spoofing（伪装）：伪造登录凭据访问他人账户**

**Spoofing：伪装为 VeriLens API 与第三方平台通信**

**Tampering：管理员误改 AI 模型文件**

**Repudiation（抵赖）：用户否认提交的验证内容**

**Repudiation：管理员删除或修改系统日志**

**Information Disclosure：浏览器缓存泄露敏感内容**

**Elevation of Privilege：通过 JWT 篡改获得管理员权限**



## 7 Spoofing: Forging login credentials to access someone else's account

- (a) **Attacker**: Cybercriminals, Hacking Groups
- (b) **Violation target**: Authentication, Access Control, Confidentiality
- (c) **Attack method**: By using Spear-Phishing Emails or Phishing Websites, tricking users to enter Login Credentials. For reference, in the Twitter celebrity account attack in July 2020, the attacker leveraged spear phishing to obtain the admin’s login credentials so that he got access to the backend and manipulate the account to post fake Bitcoin fraud tweets (Witman, Paul D, 2020)
- (d) **Component**: Third-party Identity Provider, Backend Server, Web Interface

Assumption: The users may lack cybersecurity awareness which makes it easy for them to expose their login credentials.

## 8 Spoofing: Impersonating VeriLens API to mislead third-party platforms

- (a) **Attacker**: Cybercriminals, Malicious Competitors
- (b) **Violation target**: Authentication, Confidentiality, Integrity
- (c) **Attack method**: By creating fake or spoofed API endpoints and mimicking the behaviors or VeriLens’s API endpoints, the attackers can trick third-party platforms to call fake interfaces to steal sensitive data like user credentials or provide false detection results. For reference, in the Cambridge Analytica incident in 2018. The third-party developers leveraged the loopholes of Facebook’s API and obtained a large amount of personal data without user consent, resulting in serious privacy leaks (Berghel, 2018).
- (d) **Component**: Third-party platforms, Backend Server, Web Interface

Assumption: The attacker may know what the real interface was like so that they can create realistic fake interfaces, and it is difficult for developers to immediately identify the fake interfaces. 

## 9 Tampering: Administrator unintentionally or maliciously modifies AI model files

- (a) **Attacker**: Internal Administrator or Developer, Malicious Insider
- (b) **Violation target**: Integrity, Availability
- (c) **Attack method**: An admin or developer with authorised access may unintentionally or maliciously modify AI model files during updates, maintenance, or deployment which may result in incorrect verification results. For instance, as reported by Jolly (2024), a ByteDance intern who was dissatisfied with resource allocation, maliciously injected code into shared AI models, disrupting model training and causing resource losses. It happened in June 2024. The intern was dismissed, and legal actions were pursued.
- (d) **Component**: Third-party platforms, Backend Server, Web Interface

Assumption: There was insufficient monitoring or version control to promptly detect and prevent accidental or malicious modifications.

## 10 Repudiation: Users denying their submitted verification content

- (a) **Attacker**: Malicious User
- (b) **Violation target**: Non-Repudiation, Integrity
- (c) **Attack method**: A user may submit media content and later claim their account was compromised and deny any involvement. This kind of repudiation threat is common in digital service platforms. As mentioned by Jacob (2023), a user can make a transaction on the platform and then denies having made it. Without proper audit traceability, the user's transaction was unable to be proved.
- (d) **Component**: Web Interface, Backend Server, Database

Assumption: There were insufficient system audit mechanisms to prove user submissions.

## 11 Repudiation: Administrator deletes or alters system logs

- (a) **Attacker**: Malicious system administrator, Insider threat
- (b) **Violation target**: Non-Repudiation, Integrity
- (c) **Attack method**: An admin may delete or alter logs to cover mistakes. For instance, in the GitLab incident in 2017, a system admin mistakenly deleted some production database data (Karageorgos et al., 2018). Due to incomplete backup procedures and insufficient log monitoring, recovery was severely hindered.
- (d) **Component**: Backend Server, Database

Assumption: There were insufficient system log protection mechanisms or external backup logs.

## 12 Information Disclosure: Browser cache leaking sensitive information

- (a) **Attacker**: Malicious web developer, Cybercriminal
- (b) **Violation target**: Confidentiality
- (c) **Attack method**: By inducing users to visit a specific malicious website, the attacker could exploit improper browser catching configurations. In this way, the attacker could steal sensitive data such as authentication tokens, login credentials and personal details. For reference, there is a type of attack named Web Cache Deception (WCD) that occurred in 2017. The attackers somehow deceived the caching mechanisms into storing private user information with public access, thereby exposing the unauthorised sensitive data (Mirheidari et al., 2020).
- (d) **Component**: Web Interface

Assumption: The web application was not configured correctly which leads to sensitive data being cached by browsers unintentionally.



# Alloy

java -jar org.alloytools.alloy.dist.jar

在 C:\SWEN90010-HISE 运行，注意不要关 console

