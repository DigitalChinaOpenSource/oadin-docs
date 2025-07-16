# Oadin 常见问题与故障排查指南

## 快速诊断
*   **一键健康检查**
*   **手动检查各项状态**
    1.  **查看 Oadin 版本信息**
        ```bash
        oadin version
        ```
    2.  **查看 Oadin 各服务状态**
        ```bash
        oadin get services
        ```
    3.  **查看网络连通性**
        ```bash
        curl -s http://localhost:16688/health
        ```
    4.  **查看模型信息**
        ```bash
        oadin get models
        ```

## 常用诊断命令
1.  **检查 oadin 服务端口**
    *   **Linux/macOS**
        ```bash
        lsof -i:16688
        ```
    *   **Windows**
        ```bash
        netstat -ano | findstr :16688
        ```
2.  **检查 oadin 进程状态**
    *   **Linux/macOS**
        ```bash
        ps aux | grep -i "[o]adin"
        ```
    *   **Windows**
        ```bash
        tasklist | findstr "oadin"
        ```

## 服务启动问题

### Q1: 服务被关闭
*   **解决方案**：
    *   双击 `Oadin-installer` 安装并自启动服务。系统托盘区将展示 oadin 图标。
    *   如果上述服务被关闭，需要双击 `Oadin-installer` 再次触发启动。

### Q2: 服务启动失败 - 端口被占用
*   **症状**: `bind: address already in use` 或 `Port 16688 is already in use`
*   **解决方案**:
    *   查找占用端口的进程并杀死该进程
        *   **macOS**
            ```bash
            lsof -i :16688
            kill -9 <PID>
            ```
        *   **Windows**
            ```bash
            netstat -ano | findstr :16688
            taskkill /PID <PID> /F
            ```
    *   重启服务
        ```bash
        oadin server start -d
        ```

## 模型下载问题

### Q3: 模型下载后无法使用
*   **症状**: `model not found` 或 `failed to load model`
*   **解决方案**:
    1.  验证模型是否正确下载
        ```bash
        oadin get models
        ```
    2.  重新拉取模型
        ```bash
        oadin delete model qwen2.5:0.5b -f chat -p local_ollama_chat
        oadin pull qwen2.5:0.5b -for chat
        ```

### Q4: 模型下载失败 - ollama 存储路径 `.ollama` 文件夹缺失
*   **原因**:
    *   Oadin 请求 ollama 下载模型。ollama 下载模型的逻辑涉及其默认地址中的密钥文件。
    *   如果卸载了本机的 ollama 或者操作了 `.ollama` 文件夹导致无法找到，将导致模型下载失败。
*   **关键路径**:
    *   **macOS**: `/Users/用户名/.ollama`
    *   **Windows**: `C:\Users\用户名\.ollama`
*   **解决方案**:
    *   重启 ollama 进程使自动创建 `.ollama` 文件夹。

## 日志分析
*   去用户数据目录下找到名为 `server` 的 log 文件（可通过系统托盘区菜单项 **"View logs"** 访问）。

## 终极解决方案
*   若遇到实在解决不了的问题，请按照如下步骤操作：
    1.  停止服务：
        ```bash
        oadin server stop
        ```
    2.  打开任务管理器 (Windows) / 活动监视器 (macOS)。
    3.  搜索 `oadin` 及 `ollama` 进程并手动结束。
    4.  找到用户数据目录下的 `oadin.db` 文件并**删除**：
        *   **macOS**: `/Users/用户名/Library/Application Support/Oadin`
        *   **Windows**: `C:\Users\用户名\AppData\Roaming\Oadin`
    5.  新开命令行/终端，执行：
        ```bash
        oadin server start -d
        ```
*   **注意**:
    *   此操作后，用户之前已下载的模型状态会重置为“未下载”，但实际模型文件仍然存在。
    *   需要手动点击下载模型以在数据库中重新建立映射关系。

> **注意**: 本文档基于 Oadin v0.2.0 预览版，随版本更新可能有所变化。建议定期查看最新版本的故障排查指南。