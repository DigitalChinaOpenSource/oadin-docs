# Oadin 快速入门指南

本快速入门指南演示如何在 5 分钟内完成以下任务：
- 获取并安装 Oadin（通过下载或从源码构建）
- 安装 AI 服务（Chat、Embed、Text-to-Image）和模型
- 使用命令行或 REST API 快速调用 AI 能力
- 打包配置并进行应用部署

---

### 🎯 目标

完成本指南后，你将能够：  
- 下载/构建并启动 Oadin CLI  
- 安装 Chat、Embed、Text-to-Image 服务  
- 拉取、列出与删除模型  
- 通过 REST API 调用 AI 服务  
- 打包应用与 `.oadin` 声明文件，实现一键部署  

---

### 📋 前置条件

**支持的操作系统**
- Windows 10/11（64-bit）
- macOS 14+
- Linux

**安装要求**
- **方式一（直接使用）**：无特殊要求，直接下载预编译的可执行文件
- **方式二（从源码构建）**：
  - Go 1.20+ (需添加到系统 PATH)
  - Make 工具 (macOS/Linux 自带；Windows 推荐使用 MSYS2 )

---

### 🚀 1. 获取 Oadin CLI

#### 方式一：直接下载

```bash
# 下载 Oadin 可执行文件

# Windows 用户
curl -o oadin.exe http://10.3.70.145:32018/repository/raw-hosted/intel-ai-pc/oadin/releases/win/oadin-installer-latest.exe

# Mac 用户
curl -o oadin-installer-latest.pkg http://10.3.70.145:32018/repository/raw-hosted/intel-ai-pc/oadin/releases/mac/oadin-installer-latest.pkg

# 添加到环境变量 (可选但推荐)
# 将下载目录添加到系统 PATH 中
```

#### 方式二：从源码构建

```bash
# 克隆仓库并进入目录
git clone https://github.com/DigitalChinaOpenSource/oadin.git
cd oadin

# 构建所有平台二进制
make build-all
```

---

### ✅ 2. 启动／停止服务

```bash
# 前台启动 Oadin 服务
oadin start

# 后台启动（Daemon 模式）
oadin start -d
```

**服务默认配置**
- 默认监听地址：`http://localhost:16688`
- 配置文件位置：`~/.oadin/` 或 `%USERPROFILE%\.oadin\`

**停止服务的方法**
- 前台模式：按 `Ctrl+C` 停止
- 后台模式：使用进程管理工具终止
  ```bash
  # Linux/macOS
  pkill oadin
  
  # Windows
  taskkill /f /im oadin.exe
  ```

#### 验证服务状态

发送请求验证服务是否正常运行：

```bash
curl http://localhost:16688
```

正常响应应为：`Open Platform for AIPC`

> **初次启动提示**：首次启动 Oadin 服务时，它会自动检测本地环境。如果未安装必要的组件（如 Ollama），系统会提示下载并安装。

---

### 🔍 3. 核心概念

**服务架构**

Oadin 采用分层架构，主要包括以下核心概念：

- **服务（Service）**  
  特定 AI 功能的抽象层，如聊天(chat)、嵌入(embed)、文生图(text-to-image)等。
  每种服务通过标准化的 RESTful 接口提供给应用程序调用。

- **服务提供商（Service Provider）**  
  实现具体 Service 的实体，分为两类：
  - **本地提供商**：如 Ollama，在本地设备上运行模型
  - **远程提供商**：如 DeepSeek、云服务 API 等，通过网络调用

- **调度策略（hybrid_policy）**  
  决定服务请求如何路由的策略，可配置为：
  - `always_local`：总是使用本地提供商
  - `always_remote`：总是使用远程提供商
  - `default`：自动根据模型可用性、资源状态等智能选择提供商

---

### 📦 4. 安装常用 AI 服务

#### 方式一：CLI 命令行

```bash
# 安装 Chat 服务及其依赖（如 Ollama + 默认模型）
oadin install chat

# 安装 Embed 服务
oadin install embed

# 安装 Text-to-Image 服务
oadin install text-to-image
```

#### 方式二：REST API

也可以通过 API 快速安装服务：

```bash
# 安装 Chat 服务
curl -X POST http://127.0.0.1:16688/oadin/v0.2/service -H "Content-Type: application/json" -d '{
    "service_name": "chat",
    "service_source": "local",
    "service_provider_name": "local_ollama_chat",
    "api_flavor": "ollama"
}'
```

---

### 📦 5. 拉取与管理模型

#### 方式一：CLI 命令行

```bash
# 为 chat 服务拉取额外模型
oadin pull <model_name> --for chat --provider <provider_name>

# 列出 provider 下所有模型
oadin get models --provider <provider_name>

# 删除模型
oadin delete model <model_name> --provider <provider_name>
```

#### 方式二：REST API

```bash
# 拉取模型
curl -X POST http://127.0.0.1:16688/oadin/v0.2/model -H "Content-Type: application/json" -d '{
    "model_name": "llama2",
    "service_name": "chat",
    "service_source": "local",
    "provider_name": "local_ollama_chat"
}'
```

---

### ⚙️ 6. 配置与查询服务提供商

```bash
# 列出所有服务及其调度策略
oadin get services

# 列出所有已注册的服务提供商
oadin get service_providers

# 安装新的服务提供商（自动拉模型）
oadin install service_provider -f path/to/provider.json

# 修改已注册的 provider
oadin edit service_provider <provider_name> -f path/to/update.json

# 删除 provider
oadin delete service_provider <provider_name>
```

> **provider.json 示例**  
> ```json
> {
>   "provider_name": "local_ollama_chat",
>   "service_name":  "chat",
>   "service_source":"local",
>   "api_flavor":    "ollama",
>   "method":        "POST",
>   "url":           "http://localhost:11434/api/chat",
>   "auth_type":     "none",
>   "models":       ["qwen3:8b","qwen2:0.5b"]
> }
> ```

---

### 💬 7. 调用 AI 服务（REST API）

通过 REST API 可以轻松调用 Oadin 的 AI 服务。

> **提示**：实际的端点和参数可能随版本更新变化。使用 `oadin get services` 和 `oadin get service_providers` 命令获取当前可用的服务配置。

#### 通用 API 格式

```bash
curl -X POST "http://localhost:16688/oadin/v0.2/service/<service_name>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model_name>",
    "stream": true|false,
    ... 其他服务特定参数 ...
  }'
```

#### 常见服务调用示例

**Chat 服务**
```bash
curl -X POST "http://localhost:16688/oadin/v0.2/service/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1:7b",
    "messages": [{"role": "user", "content": "你好，请介绍一下自己"}],
    "stream": true
  }'
```

**Embed 服务**
```bash
curl -X POST "http://localhost:16688/oadin/v0.2/service/embed" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": ["这是一个需要嵌入的文本"]
  }'
```

**Text-to-Image 服务**
```bash
curl -X POST "http://localhost:16688/oadin/v0.2/service/text-to-image" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "stable-diffusion-1.5-int4",
    "prompt": "一只在阳光下的猫咪",
    "n": 1,
    "size": "1024x1024"
  }'
```

> **注意**：部分服务可能需要额外安装或配置。使用 `oadin get services` 查看当前可用的服务。

#### 应用代码集成

将 Oadin 集成到应用中只需将 API 端点从直接调用模型引擎改为调用 Oadin 网关，无需大幅修改现有代码：

**JavaScript 示例**

```javascript
async function chat(messages) {
    // 原先直接调用 Ollama
    // const response = await fetch('http://127.0.0.1:11434/api/chat', {...});
    
    // 修改为调用 Oadin（获得多模型支持和本地/远程智能调度）
    const response = await fetch('http://127.0.0.1:16688/oadin/v0.2/service/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "deepseek-r1:7b",  // 可以轻松切换不同模型
            stream: true,             // 支持流式输出
            messages: messages
        }),
    });
    
    // 处理流式响应（代码逻辑与原来相同）
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        // 处理返回的文本片段
        // ...
    }
}
```

**集成优势**
- 无需修改现有响应处理逻辑
- 轻松支持多种模型和服务提供商
- 自动的本地/远程调度，提高可靠性

---

### 📦 8. 应用配置管理：导入/导出

Oadin 支持通过 `.oadin` 配置文件来管理和迁移应用配置，简化部署和应用分发。

#### 配置文件结构

`.oadin` 文件使用 JSON 格式，定义了应用所需的服务和提供商：

```json
{
  "version": "v0.2",
  "services": {
    "chat": {
      "models": ["qwen3:8b", "deepseek-r1:8b"],
      "service_providers": {
        "local": "local_ollama_chat",
        "remote": "remote_smartvision_chat"
      },
      "hybrid_policy": "always_local"
    },
    "text-to-image": {
      "models": ["stable-diffusion-1.5-int4"],
      "service_providers": {
        "remote": "remote_aliyun_text_to_image"
      },
      "hybrid_policy": "always_remote"
    }
  },
  "service_providers": {
    "local_ollama_chat": {
      "service_name": "chat",
      "service_source": "local",
      "api_flavor": "ollama",
      "method": "POST",
      "auth_type": "none",
      "models": []
    },
    "remote_smartvision_chat": {
      "service_name": "chat",
      "service_source": "remote",
      "api_flavor": "smartvision",
      "method": "POST",
      "auth_type": "none",
      "models": []
    }
  }
}
```

**配置文件说明**

- `services`: 定义应用需要的服务
  - 每个服务指定所需模型和提供商
  - `hybrid_policy` 控制本地/远程调度策略
- `service_providers`: 定义具体的服务提供商
  - 指定服务类型、访问方式和认证信息
  - 可包含本地和远程多种提供商
```

#### 配置导出 (备份/分发)

**使用 CLI 命令**
```bash
# 导出当前配置到指定文件
oadin export to-file --file ./myapp.oadin

# 导出到标准输出（查看或重定向）
oadin export to-stdout > ./myapp.oadin
```

**使用 REST API**
```bash
# 导出当前配置
curl -X POST "http://127.0.0.1:16688/oadin/v0.2/service/export" \
  -H "Content-Type: application/json" > myapp.oadin
```

#### 配置导入 (恢复/部署)

**使用 CLI 命令**
```bash
# 导入配置文件
oadin import ./myapp.oadin
```

**使用 REST API**
```bash
# 导入配置
curl -X POST "http://127.0.0.1:16688/oadin/v0.2/service/import" \
  -H "Content-Type: application/json" \
  -d @myapp.oadin
```

---

### 🔄 9. 服务管理与清理

#### 停止服务

```bash
# 前台模式下停止
按 Ctrl+C 即可停止服务

# 后台模式下停止
## Linux/macOS
pkill oadin

## Windows
taskkill /f /im oadin.exe
```

#### 清理资源 (可选)

```bash
# 删除服务配置
rm -rf ~/.oadin      # macOS/Linux
rmdir /s /q %USERPROFILE%\.oadin  # Windows

# 删除下载的模型 (如果使用 Ollama 作为后端)
## 查看占用空间
oadin get models

## 删除不需要的模型
oadin delete model <model_name> --provider <provider_name>
```

---

### 🔍 10. 常见问题与解决方案

| 问题 | 可能的原因 | 解决方案 |
|------|-----------|---------|
| **无法连接 Oadin 服务** | - 服务未启动<br>- 端口被占用<br>- 防火墙阻止 | 1. 检查服务状态: `curl http://localhost:16688`<br>2. 检查端口占用: `netstat -ano \| findstr 16688`<br>3. 检查防火墙设置 |
| **模型下载失败** | - 网络问题<br>- 磁盘空间不足<br>- Ollama未运行 | 1. 检查网络连接<br>2. 确认磁盘空间充足<br>3. 确认 Ollama 运行状态<br>4. 尝试下载较小的模型 |
| **找不到 oadin 命令** | - 未添加到环境变量<br>- 安装路径错误 | 1. 确认安装路径<br>2. 将安装目录添加到 PATH<br>3. 使用完整路径执行: `C:\path\to\oadin.exe` |
| **命令与文档不符** | - 软件版本差异<br>- 文档更新滞后 | 1. 使用 `oadin --help` 查看当前可用命令<br>2. 使用 `oadin <command> --help` 查看详细用法<br>3. 使用 `oadin get services` 查看可用服务 |
| **服务调用失败** | - 服务未安装<br>- 模型未下载<br>- API格式错误 | 1. 检查服务安装状态: `oadin get services`<br>2. 检查模型是否可用: `oadin get models`<br>3. 检查API请求格式是否正确 |

> **提示**：如遇到其他问题，可使用 `--verbose` 或 `-v` 参数启动服务以获取详细日志，例如 `oadin start -v`。

---

### 📚 小结与下一步

恭喜！您现在已经掌握了 Oadin 的基本使用方法，包括：
- 安装和启动 Oadin 服务
- 配置各种 AI 服务和模型
- 通过 API 调用 AI 能力
- 管理和迁移应用配置

**推荐的后续步骤**：
- 尝试配置更多的模型和服务
- 探索混合调度策略的优势
- 将 Oadin 集成到您的应用中
- 参考完整的 [SDK 文档](./SDK.md) 了解更多高级功能

### 🔗 其他资源

- [Oadin SDK 指南](./SDK.md)
- [安全指南](./Security.md)
- [高级用法](./Usage.md)
- [GitHub 仓库](https://github.com/DigitalChinaOpenSource/oadin)

---

