# 🚀 Oadin SDK 使用说明

> 📚 本文档介绍如何在 .NET（C#）和 Node.js 项目中集成和使用 Oadin（奥丁模型框架）SDK。

## 📑 目录

- [🟦 DotnetLib（C#）](#dotnetlibc)
  - [� 安装本地 NuGet 包](#安装本地-nuget-包)
  - [🛠️ 基本用法](#基本用法)
- [�🟩 NodeLib（Node.js）](#nodelibnodejs)
  - [📦 安装](#安装)
  - [🛠️ 基本用法](#基本用法-1)
- [🧩 进阶功能](#进阶功能)
- [🌟 常见 API 示例](#常见-api-示oadin.CancelInstallModel(cancelData).then(console.log);

// 卸载模型
oadin.DeleteModel(modelData).then(console.log);

// ============ 4. 服务提供商管理 ============

// 查看服务提供商[📚 更多示例与高级用法](#更多示例与高级用法)

# 🟦 DotnetLib（C#）

### 📦 安装本地 NuGet 包

1. 打包 NuGet 包
   ```bash
   dotnet pack --configuration Release  
   ```

2. 创建本地源目录并复制包
   ```bash
   mkdir local-nuget
   cp ./bin/Release/OadinClient.1.0.15.nupkg ./local-nuget
   ```

3. 添加本地 NuGet 源
   ```bash
   dotnet nuget add source ./local-nuget --name LocalOadin
   ```

4. 在项目中引用包
   ```bash
   dotnet add package OadinClient --version 1.0.15 --source LocalOadin
   ```

### 🛠️ 基本用法

以下示例展示了 Oadin C# SDK 的完整使用流程：

```csharp
using Oadin;

var client = new OadinClient();

// ============ 1. 服务管理 ============

// 获取服务列表
var services = await client.GetServicesAsync();
Console.WriteLine(services);

// 创建服务
var requestData = new {
    service_name = "chat/embed/generate/text-to-image",
    service_source = "remote/local",
    service_provider_name = "local_ollama_chat",
    api_flavor = "ollama/openai/...",
    auth_type = "none/apikey/token/credentials",
    method = "GET/POST",
    desc = "服务描述",
    url = "",
    auth_key = "your_api_key",
    skip_model = false,
    model_name = "llama2",
};
var result = await client.InstallServiceAsync(requestData);
Console.WriteLine(result);

// 更新服务
var updateServiceData = new {
    service_name = "chat/embed/generate/text-to-image",
    hybrid_policy = "default/always_local/always_remote",
    remote_provider = "remote_openai_chat",
    local_provider = "local_ollama_chat"
};
var updateResult = await client.UpdateServiceAsync(updateServiceData);
Console.WriteLine(updateResult);

// ============ 2. 模型管理 ============

// 获取模型列表
var models = await client.GetModelsAsync();
Console.WriteLine(models);

// 流式下载模型
var modelStreamRequest = new {
    model_name = "nomic-embed-text",
    service_name = "embed",
    service_source = "local",
    provider_name = "local_ollama_embed"
};
await client.InstallModelStreamAsync(
    modelStreamRequest,
    onData: (json) => Console.WriteLine("流数据: " + json),
    onError: (error) => Console.WriteLine("错误: " + error),
    onEnd: () => Console.WriteLine("流式安装完成")
);

// 取消流式下载模型
var cancelRequest = new {
    model_name = "nomic-embed-text"
};
await client.CancelInstallModelAsync(cancelRequest);

// 下载模型
var modelRequest = new {
    model_name = "llama2",
    service_name = "chat/embed/generate/text-to-image",
    service_source = "remote/local",
    provider_name = "local_ollama_chat/remote_openai_chat/..."
};
var installModelResult = await client.InstallModelAsync(modelRequest);
Console.WriteLine(installModelResult);

// 卸载模型
var uninstallModelResult = await client.DeleteModelAsync(modelRequest);
Console.WriteLine(uninstallModelResult);

// 获取模型列表（从引擎）
var modelsAvailable = await client.GetModelAvailiableAsync();
Console.WriteLine(modelsAvailable);

// 获取推荐模型列表
var modelsRecommended = await client.GetModelsRecommendedAsync();
Console.WriteLine(modelsRecommended);

// 获取支持模型列表
var modelsSupported = await client.GetModelsSupportedAsync();
Console.WriteLine(modelsSupported);

// ============ 3. 服务提供商管理 ============

// 查看服务提供商
var serviceProviders = await client.GetServiceProvidersAsync();
Console.WriteLine(serviceProviders);

// 新增服务提供商
var providerRequest = new {
    service_name = "chat/embed/generate/text-to-image",
    service_source = "remote/local",
    flavor_name = "ollama/openai/...",
    provider_name = "local_ollama_chat/remote_openai_chat/...",
    desc = "提供商描述",
    method = "POST",
    url = "https://api.example.com",
    auth_type = "none/apikey/token/credentials",
    auth_key = "your_api_key",
    models = new[] { "qwen3:8b", "deepseek-r1:8b" },
    extra_headers = new { },
    extra_json_body = new { },
    properties = new { }
};
var addProviderResult = await client.AddServiceProviderAsync(providerRequest);
Console.WriteLine(addProviderResult);

// 更新服务提供商
var updateProviderResult = await client.UpdateServiceProviderAsync(providerRequest);
Console.WriteLine(updateProviderResult);

// 删除服务提供商
var deleteProviderRequest = new {
    provider_name = "local_ollama_chat/remote_openai_chat/..."
};
var deleteProviderResult = await client.DeleteServiceProviderAsync(deleteProviderRequest);
Console.WriteLine(deleteProviderResult);

// ============ 4. 配置管理 ============

// 导入配置文件
var importResult = await client.ImportConfigAsync("path/to/.oadin");
Console.WriteLine(importResult);

// 导出配置文件
var exportRequest = new { };
var exportResult = await client.ExportConfigAsync(exportRequest);
Console.WriteLine(exportResult);

// ============ 5. AI 服务调用 ============

// 流式 Chat
var chatRequest = new {
    model = "deepseek-r1:7b",
    stream = true,
    messages = new[] {
        new { role = "user", content = "你是谁？" }
    }
};
await client.ChatAsync(
    chatRequest,
    isStream: true,
    onData: (data) => Console.WriteLine("流数据: " + data),
    onError: (error) => Console.WriteLine("错误: " + error),
    onEnd: () => Console.WriteLine("流式请求结束")
);

// 非流式 Chat
var chatRequest2 = new {
    model = "deepseek-r1:7b",
    stream = false,
    messages = new[] {
        new { role = "user", content = "你是谁？" }
    }
};
var chatResult = await client.ChatAsync(chatRequest2);
Console.WriteLine(chatResult);

// 流式 Generate
var generateRequest = new {
    model = "deepseek-r1:7b",
    stream = true,
    prompt = "请介绍一下人工智能"
};
await client.GenerateAsync(
    generateRequest,
    isStream: true,
    onData: (data) => Console.WriteLine("流数据: " + data),
    onError: (error) => Console.WriteLine("错误: " + error),
    onEnd: () => Console.WriteLine("生文流式请求结束")
);

// 非流式 Generate
var generateRequest2 = new {
    model = "deepseek-r1:7b",
    stream = false,
    prompt = "请介绍一下人工智能"
};
var generateResult = await client.GenerateAsync(generateRequest2);
Console.WriteLine(generateResult);

// embed
var embedRequest = new {
    model = "nomic-embed-text",
    input = new[] { "二彪子", "踹皮" }
};
var embedResult = await client.EmbedAsync(embedRequest);
Console.WriteLine(embedResult);

// text-to-image
var t2iRequest = new {
    model = "wanx2.1-t2i-turbo",
    prompt = "喜欢玩埃德加蹲草里攒大招的小学生"
};
var t2iResult = await client.TextToImageAsync(t2iRequest);
Console.WriteLine(t2iResult);

// ============ 6. 辅助功能 ============

// 检查 Oadin 服务状态
var isAvailable = await client.IsOadinAvailiableAsync();
Console.WriteLine($"Oadin 服务可用: {isAvailable}");

// 检查 Oadin 是否已下载
var isExisted = client.IsOadinExisted();
Console.WriteLine($"Oadin 已下载: {isExisted}");
```

---

# 🟩 NodeLib（Node.js）

### 📦 安装

在 Node 项目中安装本地 tgz 包：

```bash
npm install oadin-lib-1.2.67.tgz
```

### 🛠️ 基本用法

以下示例展示了 Oadin Node.js SDK 的完整使用流程，从初始化到各种 AI 服务的调用：

```javascript
const OadinLib = require('oadin-lib');
const oadin = new OadinLib();

// ============ 1. 环境检查与初始化 ============

// 检查 oadin 服务是否存在
oadin.IsOadinAvailiable().then(console.log);

// 检查 oadin.exe 是否下载
oadin.IsOadinExisted().then(console.log);

// 下载 oadin.exe
oadin.DownloadOadin().then(console.log);

// 启动 oadin 服务
oadin.InstallOadin().then(console.log);

// 安装 chat 服务
oadin.InstallChat().then(console.log);

// ============ 2. 服务管理 ============

// 获取服务列表
oadin.GetServices().then(console.log);

// 创建新服务
const data = {
    service_name: "chat/embed/generate/text-to-image",
    service_source: "remote/local",
    hybrid_policy: "default/always_local/always_remote",
    flavor_name: "ollama/openai/...",
    provider_name: "local_ollama_chat/remote_openai_chat/...",
    auth_type: "none/apikey",
    auth_key: "your_api_key",
};
oadin.CreateService(data).then(console.log);

// 更新服务
const updateData = {
    service_name: "chat/embed/generate/text-to-image",
    hybrid_policy: "default/always_local/always_remote",
    remote_provider: "remote_openai_chat",
    local_provider: "local_ollama_chat"
};
oadin.UpdateService(updateData).then(console.log);

// ============ 3. 模型管理 ============

// 获取模型列表
oadin.GetModels().then(console.log);

// 安装模型
const modelData = {
    model_name: "qwen3:8b",
    service_name: "chat/embed/generate/text-to-image",
    service_source: "remote/local",
    provider_name: "local_ollama_chat/remote_openai_chat/...",
};
oadin.InstallModel(modelData).then(console.log);

// 卸载模型
oadin.DeleteModel(modelData).then(console.log);

// 查看服务提供商
oadin.GetServiceProviders().then(console.log);

// 新增服务提供商
const providerData = {
    service_name: "chat/embed/generate/text-to-image",
    service_source: "remote/local",
    flavor_name: "ollama/openai/...",
    provider_name: "local_ollama_chat/remote_openai_chat/...",
    desc: "",
    method: "POST",
    auth_type: "none/apikey",
    auth_key: "your_api_key",
    models: ["qwen3:8b", "deepseek-r1:8b"],
    extra_headers: {},
    extra_json_body: {},
    properties: {}
};
oadin.InstallServiceProvider(providerData).then(console.log);

// 更新服务提供商
oadin.UpdateServiceProvider(providerData).then(console.log);

// 删除服务提供商
oadin.DeleteServiceProvider({ provider_name: "local_ollama_chat/remote_openai_chat/..." }).then(console.log);

// ============ 5. 配置管理 ============

// 导入配置文件
oadin.ImportConfig("path/to/.oadin").then(console.log);

// 导出配置文件
oadin.ExportConfig({ service_name: "chat/embed/generate/text-to-image" }).then(console.log);

// 获取模型列表（查看ollama的模型）
oadin.GetModelsAvailiable().then(console.log);

// 获取推荐模型列表
oadin.GetModelsRecommended().then(console.log);

// 获取支持模型列表
oadin.GetModelsSupported().then(console.log);

// ============ 6. AI 服务调用 ============

// Chat服务（流式）
const chatData = {
    model: "deepseek-r1:8b",
    stream: true,
    messages: [
        { role: "user", content: "你好" }
    ],
    temperature: 0.7,
    max_tokens: 100,
};
oadin.Chat(chatData).then((chatStream) => {
    chatStream.on('data', (data) => {
        console.log(data);
    });
    chatStream.on('error', (error) => {
        console.error(error);
    });
    chatStream.on('end', () => {
        console.log('Chat stream ended');
    });
});

// Chat服务（非流式）
const chatData2 = {
    model: "deepseek-r1:8b",
    stream: false,
    messages: [
        { role: "user", content: "你好" }
    ],
    temperature: 0.7,
    max_tokens: 100,
};
oadin.Chat(chatData2).then(console.log);

// 生文服务（流式）
const genData = {
    model: "deepseek-r1:8b",
    stream: true,
    prompt: "你好",
};
oadin.Generate(genData).then((generateStream) => {
    generateStream.on('data', (data) => {
        console.log(data);
    });
    generateStream.on('error', (error) => {
        console.error(error);
    });
    generateStream.on('end', () => {
        console.log('Generate stream ended');
    });
});

// 生文服务（非流式）
const genData2 = {
    model: "deepseek-r1:8b",
    stream: false,
    prompt: "你好",
};
oadin.Generate(genData2).then(console.log);

// 文生图服务
const t2iData = {
    model: "wanx2.1-t2i-turbo",
    prompt: "一间有着精致窗户的花店，漂亮的木质门，摆放着花朵",
};
oadin.TextToImage(t2iData).then(console.log);
```

---

# 🧩 进阶功能

Oadin SDK 支持丰富的进阶功能，帮助开发者灵活集成和扩展 AI 服务。以下为主要进阶能力及用法示例：

## 1. 服务/模型的安装、更新与删除

- **安装服务**：参考上文“安装服务”章节，可通过 `InstallServiceAsync` (C#) 或 `CreateService` (Node.js) 安装服务。
- **安装模型**：
  - C#：
    ```csharp
    var modelRequest = new {
        model_name = "llama2",
        service_name = "chat",
        service_source = "local",
        provider_name = "local_ollama_chat"
    };
    var result = await client.InstallModelAsync(modelRequest);
    ```
  - Node.js：
    ```javascript
    const modelData = {
        model_name: "llama2",
        service_name: "chat",
        service_source: "local",
        provider_name: "local_ollama_chat"
    };
    oadin.InstallModel(modelData).then(console.log);
    ```
- **删除模型/服务**：同理，调用 `DeleteModelAsync` 或 `DeleteServiceProviderAsync` 等接口。

## 2. 流式响应与回调

- **C# 流式 Chat**：
  ```csharp
  await client.ChatAsync(
      chatRequest,
      isStream: true,
      onData: (data) => Console.WriteLine("流数据: " + data),
      onError: (error) => Console.WriteLine("错误: " + error),
      onEnd: () => Console.WriteLine("流式请求结束")
  );
  ```
- **Node.js 流式 Chat**：
  ```javascript
  oadin.Chat(chatData).then((chatStream) => {
      chatStream.on('data', (data) => {
          console.log(data);
      });
      chatStream.on('error', (error) => {
          console.error(error);
      });
      chatStream.on('end', () => {
          console.log('Chat stream ended');
      });
  });
  ```

## 3. 配置导入/导出与一键部署

- **导入配置**：
  - C#：`ImportConfigAsync("path/to/.oadin")`
  - Node.js：`oadin.ImportConfig("path/to/.oadin")`
- **导出配置**：
  - C#：`ExportConfigAsync(new { })`
  - Node.js：`oadin.ExportConfig({ ... })`
- **一键部署**：将 `.oadin` 文件随应用分发，目标环境导入即可自动安装所有服务和模型。

## 4. 主要参数说明

| 参数名              | 说明                       | 示例值                      |
|---------------------|----------------------------|-----------------------------|
| service_name        | 服务名                     | chat/embed/text-to-image    |
| service_source      | 服务来源                   | local/remote                |
| provider_name       | 服务提供商名               | local_ollama_chat           |
| api_flavor          | API 风格                   | ollama/openai/...           |
| model_name          | 模型名称                   | llama2/deepseek-r1:8b       |
| auth_type           | 鉴权类型                   | none/apikey/token/credentials|
| auth_key            | 鉴权密钥                   | your_api_key                 | method              | HTTP 方法                    | POST/GET                     |
| url                 | 服务地址                   | http://localhost:11434/...   |
| stream              | 是否流式                   | true/false                   |
| messages            | 聊天消息数组               | [{role: "user", ...}]        |
| input/prompt        | 输入内容                   | "你好"/"一只猫"               |

## 5. 进阶用法与最佳实践

- 推荐将服务、模型、Provider 配置写入 `.oadin` 文件，便于团队协作和环境迁移。
- 流式接口建议配合前端事件流或后端回调处理，提升用户体验。
- 合理配置混合策略，实现本地和远程服务的自动切换。
- 定期备份配置文件，便于快速恢复服务环境。

---

# 🌟 常见 API 示例

### ⚡ 安装服务

#### 🟦 C# 示例
```csharp
var requestData = new {
    service_name = "chat",
    service_source = "local",
    service_provider_name = "local_ollama_chat",
    api_flavor = "ollama",
};
var result = await client.InstallServiceAsync(requestData);
```

#### 🟩 Node.js 示例
```javascript
const data = {
    service_name: "chat",
    service_source: "local",
    flavor_name: "ollama",
    provider_name: "local_ollama_chat",
};
oadin.CreateService(data).then(console.log);
```

### 💬 聊天服务调用

#### 🌐 HTTP API 示例
```http
POST http://127.0.0.1:16688/oadin/v0.2/services/chat
Content-Type: application/json

{
    "model": "deepseek-r1:8b",
    "stream": true,
    "messages": [
        { "role": "user", "content": "你好！" },
        { "role": "assistant", "content": "你好！很高兴见到你！" },
        { "role": "user", "content": "你是谁？" }
    ],
    "think": true
}
```

---

## 📚 更多示例与高级用法

### 1. 多轮对话与上下文管理
Oadin 支持多轮对话，`messages` 参数可传递历史消息，实现上下文连续。

### 2. 进阶 Chat/Embed/Generate 用法
- 支持 `stream: true` 流式响应，提升前端体验
- 支持 `think: true` 开启思考模式，当模型支持关闭深度思考时，可设置为 false 来关闭，提高回答速度。
- 支持自定义 `auth_type`、`auth_key`、`extra_headers`、`extra_json_body` 等高级参数
- 支持多 Provider、自动路由、混合策略

### 3. 常见问题排查 🔧

| 问题类型 | 症状 | 解决方案 |
|---------|------|---------|
| **服务未启动** | 连接被拒绝、超时 | 1. 确认 `oadin server start` 已运行<br>2. 检查进程：`ps aux \| grep oadin`<br>3. 重启服务：`oadin server restart` |
| **端口冲突** | Address already in use | 1. 检查 16688 端口占用：`netstat -tulpn \| grep 16688`<br>2. 修改配置文件端口<br>3. 终止冲突进程 |
| **模型下载失败** | 网络错误、下载中断 | 1. 检查网络连接<br>2. 验证 Provider 配置<br>3. 重试下载或使用流式下载 |
| **认证失败** | 401/403 错误 | 1. 检查 `auth_key` 配置<br>2. 验证 `auth_type` 设置<br>3. 确认 API 密钥有效性 |
| **模型不存在** | 404 错误 | 1. 检查模型名称拼写<br>2. 确认模型已安装<br>3. 查看可用模型列表 |

---

## 📞 技术支持

如需更详细的接口参数、进阶用法等，请参考本 SDK 文档前述章节，或通过以下方式联系技术支持：

- 📧 **邮箱支持**：提交详细问题描述和错误日志
- 💬 **在线文档**：查看最新API参考和示例  
- 🐛 **问题反馈**：报告 Bug 或提出功能建议

> 💡 **提示**：报告问题时，请提供 Oadin 版本号、操作系统、错误日志等信息，以便快速定位和解决问题。
