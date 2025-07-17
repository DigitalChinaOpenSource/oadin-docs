# 社区与贡献

## 🤝 社区支持

### 📞 获取帮助

如果您在使用 Oadin 过程中遇到问题，可以通过以下方式获取帮助：

- 📖 **项目文档**: 查看 [README_zhCN.md](https://github.com/DigitalChinaOpenSource/oadin/blob/oadin/README_zhCN.md)
- 🐛 **问题反馈**: 通过 [GitHub Issues](https://github.com/DigitalChinaOpenSource/oadin/issues) 报告问题
- 💬 **讨论交流**: 使用 [GitHub Discussions](https://github.com/DigitalChinaOpenSource/oadin/discussions) 进行技术讨论
- 📚 **API 文档**: 参考 [接口与扩展能力章节](./api-and-extension-capabilities.md) 以便了解详情

### 🌟 社区指导原则

我们致力于构建一个开放、包容、友好的社区环境：

- **开放协作**: 欢迎所有人参与项目建设
- **相互尊重**: 尊重不同观点和技术选择
- **知识共享**: 积极分享经验和最佳实践
- **持续改进**: 不断完善项目和文档质量

## 🤝 贡献指南

### 🚀 如何贡献

我们欢迎各种形式的贡献，包括但不限于：

- 🐛 **Bug 报告**: 发现并报告项目中的问题
- 💡 **功能建议**: 提出新功能或改进建议
- 📝 **文档改进**: 完善文档内容和示例
- 🔧 **代码贡献**: 修复问题或实现新功能
- 🌐 **翻译工作**: 帮助翻译文档到其他语言
- 📦 **示例应用**: 创建基于 Oadin 的示例应用

### 📋 贡献流程

#### 1. 准备工作

```bash
# 克隆项目
git clone https://github.com/DigitalChinaOpenSource/oadin.git
cd oadin

# 创建功能分支
git checkout -b feature/your-feature-name
```

#### 2. 开发环境配置

确保您的开发环境满足以下要求：

```bash
# 安装 Go 语言环境 (1.19+)
go version

# Windows 用户需要安装 MSYS2
# 下载地址: https://www.msys2.org

# 构建项目
make build-all
```

#### 3. 代码规范

- **Go 代码**: 遵循 Go 官方代码规范，使用 `gofmt` 格式化代码
- **文档**: 使用 Markdown 格式，保持语言简洁清晰
- **API 设计**: 遵循 REST API 设计原则
- **测试**: 为新功能添加相应的测试用例

#### 4. 提交代码

```bash
# 添加修改
git add .

# 提交修改（使用有意义的提交信息）
git commit -m "feat: 添加新的AI服务支持"

# 推送到远程仓库
git push origin feature/your-feature-name
```

#### 5. 创建 Pull Request

1. 访问 [GitHub 项目页面](https://github.com/DigitalChinaOpenSource/oadin)
2. 点击 "New Pull Request"
3. 选择您的功能分支
4. 填写详细的 PR 描述
5. 等待维护者 Review

### 🐛 Issue 报告规范

在报告问题时，请提供以下信息：

```markdown
**问题描述**
简要描述遇到的问题

**复现步骤**

1. 执行命令 `oadin server start`
2. 访问 http://localhost:16688
3. 点击 ...
4. 出现错误

**期望行为**
描述您期望的正确行为

**实际行为**
描述实际发生的情况

**环境信息**

- 操作系统: [例如: Windows 11, Ubuntu 22.04]
- Oadin 版本: [例如: v0.2.0]
- Go 版本: [例如: 1.21.0]

**错误日志**
```

请粘贴相关的错误日志

```

**截图**
如果适用，请添加截图来帮助解释问题
```

### 💡 功能建议规范

提出功能建议时，请包含：

- **功能概述**: 简要描述建议的功能
- **使用场景**: 说明此功能的应用场景
- **实现思路**: 可选，提供实现的初步想法
- **优先级**: 您认为此功能的重要性
- **相关资料**: 提供相关的技术文档或参考资料

### 🔧 开发者指南

#### 项目结构

```
oadin/
├── cmd/                    # 命令行工具入口
├── internal/              # 内部核心逻辑
│   ├── api/               # API 接口层
│   ├── provider/          # AI 服务提供商
│   ├── server/            # 服务器实现
│   └── ...
├── config/                # 配置管理
├── docs/                  # 文档
├── example/               # 示例应用
└── extension/             # 扩展文档
```

#### 核心组件

- **[`internal/api/`](https://github.com/DigitalChinaOpenSource/oadin/tree/main/internal/api)**: REST API 接口实现
- **[`internal/provider/`](https://github.com/DigitalChinaOpenSource/oadin/tree/main/internal/provider/)**: AI 服务提供商接口
- **[`internal/server/`](https://github.com/DigitalChinaOpenSource/oadin/tree/main/internal/server/)**: 核心服务器逻辑
- **[`config/`](https://github.com/DigitalChinaOpenSource/oadin/tree/main/config/)**: 配置文件管理

#### 测试指南

```bash
# 运行单元测试
go test ./...

# 运行特定包的测试
go test ./internal/api/...

# 生成测试覆盖率报告
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

### 📚 文档贡献

#### 文档类型

- **用户文档**: 面向最终用户的使用指南
- **开发者文档**: 面向开发者的 API 文档和集成指南
- **架构文档**: 项目架构和设计文档
- **示例代码**: 各种使用场景的代码示例

#### 文档规范

- 使用 Markdown 格式
- 保持语言简洁清晰
- 提供完整的代码示例
- 包含必要的截图和图表
- 及时更新过时的内容

### 🏆 贡献者认可

我们重视每一个贡献者的努力：

- **贡献者列表**: 在 README 中展示主要贡献者
- **发布说明**: 在版本发布说明中感谢贡献者
- **社区荣誉**: 定期表彰活跃的社区成员

### 📄 许可证

本项目采用 [Apache 2.0 许可证](https://github.com/DigitalChinaOpenSource/oadin/blob/main/LICENSE)。通过贡献代码，您同意：

- 您的贡献将在 Apache 2.0 许可证下发布
- 您拥有贡献内容的合法权利
- 您的贡献不会侵犯第三方权利

## 🚀 社区活动

### 🎯 开发路线图

我们的发展规划：

**短期目标 (v0.3.0)**

- 完善文生图服务实现
- 增加音频处理服务支持
- 扩展更多 AI 引擎支持

**中期目标 (v0.4.0+)**

- 企业级部署支持
- 高可用性配置
- 性能优化和监控

**长期目标 (v1.0.0+)**

- 完整的生产环境支持
- 丰富的生态系统
- 标准化的 AI 服务接口

### 🤝 合作机会

我们欢迎各种形式的合作：

- **企业合作**: 与企业合作推广 AI PC 生态
- **学术合作**: 与高校和研究机构合作
- **开源协作**: 与其他开源项目协作
- **技术分享**: 参与技术会议和分享

---

## 📞 联系我们

- **项目主页**: https://github.com/DigitalChinaOpenSource/oadin
- **问题反馈**: https://github.com/DigitalChinaOpenSource/oadin/issues
- **技术讨论**: https://github.com/DigitalChinaOpenSource/oadin/discussions

---

**感谢所有为 Oadin 项目做出贡献的开发者和社区成员！**

**让 AI 触手可及，让创新无处不在**

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
