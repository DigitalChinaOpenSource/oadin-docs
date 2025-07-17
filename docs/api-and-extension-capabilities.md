# 接口与扩展能力文档

---

## API 公共接口

### 查看 Oadin 服务状态
- **GET** `/health`
- **描述**：查看服务健康状态
- **响应示例**：
```json
{
  "status": "up"
}
```

### 查看 Oadin 版本
- **GET** `/version`
- **描述**：查看服务版本信息
- **响应示例**：
```json
{
  "version": "v0.2-20250519"
}
```

### 查看 Model Engine 服务状态（目前支持 ollama）
- **GET** `/engine/health`
- **描述**：查看模型引擎健康状态
- **响应示例**：
```json
{
  "status": "up"
}
```

### 查看 Model Engine 版本（目前支持 ollama）
- **GET** `/engine/version`
- **描述**：查看模型引擎版本
- **响应示例**：
```json
{
  "version": "0.6.2"
}
```

---

## 响应格式规范
- 所有接口统一前缀：`/oadin/{version}`
- 响应格式统一：
```json
{
  "business_code": 10000,
  "message": "",
  "data": { ... }
}
```

---

## 服务管理

### 查看服务信息
- **GET** `/service`
- **描述**：查看所有已安装的服务信息
- **响应示例**：
```json
{
  "business_code": 10000,
  "message": "service interface call success",
  "data": [
    {
      "service_name": "chat", // 服务名称
      "hybrid_policy": "default", // 服务调度策略
      "remote_provider": "remote_deepseek_chat", // 远程服务提供商
      "local_provider": "local_ollama_chat", // 本地服务提供商
      "status": 1, // 服务是否可用 （1-可用，0-不可用）
      "created_at": "2025-03-03T09:03:57Z", // 创建时间
      "updated_at": "2025-03-03T09:03:57Z" // 更新时间
    },
    // ... 其他服务
  ]
}
```

### 一键安装模型服务
- **POST** `/service`
- **描述**：一键安装一个模型服务
- **请求参数**：
  - `service_name` (String, 必填)：服务名称，当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务类型，local 本地 remote远端 默认local
  - `service_provider_name` (String, 必填)：服务提供商名称，remote_deepseek_chat /local_ollama_chat
  - `api_flavor` (String, 必填)：接口风格，ollama /tencent /deepseek /smartvision /aliyun /baidu
  - `auth_type` (String, 必填)：服务提供商的鉴权类型（apikey /token /credentials /none）
  - `method` (String, 选填)：HTTP方式，默认Post
  - `desc` (String, 选填)：相关描述
  - `url` (String, 选填)：服务提供商的URL
  - `auth_key` (String, 选填)：服务提供商的鉴权信息
  - `skip_model` (Boolean, 选填)：是否跳过模型下载,默认为true
  - `model_name` (String, 选填)：需要下载的模型
- **请求示例**：
```json
{
  "service_name": "chat",
  "service_source": "remote",
  "hybrid_policy": "default",
  "api_flavor": "ollama",
  "provider_name": "remote_deepseek_chat",
  "auth_type": "apikey",
  "auth_key": "sk-xxxxx",
  "skip_model": true,
  "model_name": ""
}
```
- **响应示例**：
```json
{
  "business_code": 10000,
  "message": "service interface call success"
}
```

### 更新服务
- **PUT** `/service`
- **描述**：更新指定的服务
- **请求参数**：
  - `service_name` (String, 必填)：服务名称，当前仅支持（chat/models/generate/embed/text-to-image）
  - `hybird_policy` (String, 选填)：动态调整策略，local 本地 remote远端
  - `remote_provider` (String, 选填)：远程服务提供商名称，名称唯一，服务提供商必须已存在
  - `local_provider` (String, 选填)：本地服务提供商名称，名称唯一，服务提供商必须已存在
- **响应示例**：
```json
{
  "business_code": 10000,
  "message": "service interface call success"
}
```

---

## 服务提供商管理

### 查看服务提供商信息
- **GET** `/service_provider`
- **描述**：查看所有服务提供商的信息
- **响应示例**：
```json
{
  "business_code": 20000,
  "message": "[Service]: service interface call success",
  "data": [
    {
      "provider_name": "local_ollama_chat", //服务提供商名称
      "service_name": "chat", // 服务名称
      "service_source": "local", // 服务来源
      "desc": "", // 描述
      "auth_type": "none",// 认证类型
      "auth_key": "", // 认证信息
      "flavor": "ollama", // 服务提供商厂商名称
      "properties": "{\"max_input_tokens\":2048,\"supported_response_mode\":[\"stream\",\"sync\"],\"mode_is_changeable\":true,\"xpu\":[\"GPU\"]}", // 属性
      "models": ["smollm2:135m", "deepseek-r1:7b"], // 支持的模型列表
      "status": 1, // 服务提供商状态（1-可用，0-不可用）
      "created_at": "2025-03-03T09:05:08Z", // 创建时间
      "updated_at": "2025-03-03T09:05:08Z" // 更新时间
    },
    {
      "provider_name": "remote_deepseek_chat",
      "service_name": "chat",
      "service_source": "remote",
      "desc": "",
      "auth_type": "apikey",
      "auth_key": "your-auth-key",
      "flavor": "ollama",
      "properties": "{}",
      "models": [
        "hunyuan-turbo"
      ],
      "status": 1,
      "created_at": "2025-03-07T06:25:51Z",
      "updated_at": "2025-03-07T06:25:51Z"
    }
  ]
}
```

### 查看服务提供商信息明细
- **GET** `/service_provider/detail`
- **描述**：查看指定服务提供商的信息，支持分页、环境参数（如 smartvision）
- **请求参数**：
  - `provider_name` (String, 必选)：服务提供商名称
  - `page` (Int, 非必选)：页码
  - `page_size` (Int, 非必选)：页容量
  - `env_type` (String, 非必选)：环境参数（dev-测试，product-生产，仅在provider_name包含smartvision时需要）
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success",
  "data": {
    "id": 7,
    "provider_name": "local_ollama_chat",
    "service_name": "chat",
    "service_source": "local",
    "desc": "Local ollama chat/completion",
    "method": "POST",
    "url": "http://127.0.0.1:16677/api/chat",
    "auth_type": "none",
    "auth_key": "",
    "flavor": "ollama",
    "extra_headers": "{}",
    "extra_json_body": "{}",
    "properties": "{\"max_input_tokens\":2048,\"supported_response_mode\":[\"stream\",\"sync\"],\"mode_is_changeable\":true,\"xpu\":[\"GPU\"]}",
    "status": 0,
    "created_at": "2025-05-16T10:52:31Z",
    "updated_at": "2025-05-16T10:52:31Z",
    "support_model_list": [
      {
        "name": "deepseek-r1:1.5b",
        "params_size": 1.5,
        "class": ["文本生成"],
        "flavor": "deepseek",
        "api_flavor": "",
        "input_length": 0,
        "output_length": 0,
        "is_downloaded": false
      }
    ],
    "page": 0,
    "page_size": 0,
    "total_count": 1,
    "total_page": 1
  }
}
```

### 新增服务提供商
- **POST** `/service_provider`
- **描述**：新增一个服务提供商
- **请求参数**：
  - `service_name` (String, 必填)：服务名称，当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务来源 (local, remote, 默认local)
  - `api_flavor` (String, 必填)：服务提供厂商名称 （ollama、deepseek、baidu等）
  - `provider_name` (String, 必填)：服务提供商名称 （local_ollama_chat）
  - `desc` (String)：相关描述
  - `method` (String, 选填)：请求方法（GET,POST）
  - `url` (String, 选填)：服务提供商的URL
  - `auth_type` (String, 选填)：服务提供商的鉴权类型（"token", "apikey", "credentials"，"None"）
  - `auth_key` (Json object, 选填)：服务提供商的鉴权信息
  - `models` (Array of strings, 选填)：模型名
  - `extra_headers` (Json object, 选填)：请求额外请求头部信息
  - `extra_json_body` (Json object, 选填)：请求额外请求体信息
  - `properties` (Json object, 选填)：属性，支持的请求类型、模型
- **响应示例**：
```json
{
  "business_code": 20000,
  "message": "[Service]: service interface call success"
}
```

### 删除服务提供商
- **DELETE** `/service_provider`
- **描述**：删除指定的服务提供商
- **请求参数**：
  - `provider_name` (String, 必填)：服务提供商名称
- **响应示例**：
```json
{
  "business_code": 20000,
  "message": "[Service]: service interface call success"
}
```

### 更新服务提供商
- **PUT** `/service_provider`
- **描述**：更新指定的服务提供商信息
- **请求参数**：
  - `service_name` (String, 必填)：服务名称，当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务来源 (local, remote, 默认local)
  - `api_flavor` (String, 必填)：服务提供厂商名称 （ollama、deepseek、baidu等）
  - `provider_name` (String, 必填)：服务提供商名称 （local_ollama_chat）
  - `desc` (String)：相关描述
  - `method` (String, 选填)：请求方法（GET,POST）
  - `url` (String, 选填)：服务提供商的URL
  - `auth_type` (String, 选填)：服务提供商的鉴权类型（"token", "apikey", "credentials"，"None"）
  - `auth_key` (Json object, 选填)：服务提供商的鉴权信息
  - `extra_headers` (Json object, 选填)：请求额外请求头部信息
  - `extra_json_body` (Json object, 选填)：请求额外请求体信息
  - `properties` (Json object, 选填)：属性，支持的请求类型、模型
- **响应示例**：
```json
{
  "business_code": 20000,
  "message": "[Service]: service interface call success"
}
```

---

## 模型管理

### 查看模型状态
- **GET** `/model`
- **描述**：查看所有已安装的模型状态
- **请求参数**：
  - `service_name` (String, 选填)：服务名称
  - `model_name` (String, 选填)：模型名称
  - `provider_name` (String, 选填)：提供商名称
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success",
  "data": [
    {
      "model_name": "smollm2:135m", // 模型名称
      "provider_name": "local_ollama_chat", // 服务提供商名称
      "status": "downloaded", // 状态（failed-失败，downloading-下载中，downloaded-已下载）
      "created_at": "2025-03-03T09:05:08Z", // 创建时间
      "updated_at": "2025-03-03T09:05:08Z" // 更新时间
    }
  ]
}
```

### 安装指定模型
- **POST** `/model`
- **描述**：安装指定的模型
- **请求参数**：
  - `model_name` (String, 必填)：模型名称
  - `service_name` (String, 必填)：服务名称,当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务类型
  - `provider_name` (String, 选填)：提供商名称
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success"
}
```

### 安装指定模型（流式）
- **POST** `/model/stream`
- **描述**：流式安装指定的模型
- **请求参数**：
  - `model_name` (String, 必填)：模型名称
  - `service_name` (String, 必填)：服务名称, 当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务来源, local-本地，remote-远程
  - `provider_name` (String, 选填)：提供商名称
- **响应示例**：
```json
{
  "status": "pulling c5396e06af29",
  "digest": "sha256:c5396e06af294bd101b30dce59131a76d2b773e76950acc870eda801d3ab0515",
  "total": 397807936,
  "completed": 387981376
}
  ...
{
  "status": "pulling 005f95c74751",
  "digest": "sha256:005f95c7475154a17e84b85cd497949d6dd2a4f9d77c096e3c66e4d9c32acaf5",
  "total": 490,
  "completed": 490
}
{
  "status": "success"
}
```

### 暂停安装指定模型
- **POST** `/model/stream/cancel`
- **描述**：暂停安装指定模型
- **请求参数**：
  - `model_name` (String, 必填)：模型名称
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success"
}
```

### 卸载指定模型
- **DELETE** `/model`
- **描述**：卸载指定模型
- **请求参数**：
  - `model_name` (String, 必填)：模型名称
  - `service_name` (String, 必填)：服务名称, 当前仅支持（chat/models/generate/embed/text-to-image）
  - `service_source` (String, 必填)：服务来源, local-本地，remote-远程
  - `provider_name` (String, 选填)：提供商名称
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success"
}
```

### 配置模型下载源
- **PUT** `/system/registry`
- **请求参数**：
```json
{
  "url": "http://xxx"
}
```
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success"
}
```

---

## 导入导出

### 导出指定服务配置
- **POST** `/service/export`
- **描述**：导出指定服务的配置文件
- **请求参数**：
  - `service_name` (String, 选填)：服务名称，当前仅支持（chat/models/generate/embed/text-to-image），不填导出所有服务配置
- **响应**：返回一个包含服务配置的json文件
- **响应示例**：
```json
{
  "status": "success",
  "err_msg": "",
  "data": {
    "chat": {
      "hybrid_policy": "default",
      "status": "health",
      "services": {
        "local": {
          "service_id": 1,
          "service_type": "local",
          "provider": {
            "name": "local_ollama_chat",
            "desc": "Local ollamma chat/completion",
            "method": "POST",
            "url": "http://127.0.0.1:11434/api/chat",
            "api_flavor": "ollama",
            "properties": {
              "supported_response_mode": ["sync", "stream"],
              "models": ["qwen2.5:0.5b"]
            },
            "status": "health"
          },
          "created_at": "2023-10-01T12:00:00Z",
          "updated_at": "2023-10-01T12:00:00Z"
        },
        "remote": {
          "service_id": 2,
          "service_type": "remote",
          "provider": {
            "name": "remote_openai_chat",
            "desc": "Remote openai chat/completion",
            "method": "POST",
            "url": "remote_openai_url",
            "api_flavor": "openai",
            "properties": {
              "supported_response_mode": ["sync", "stream"],
              "models": ["lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF"]
            },
            "status": "health"
          },
          "created_at": "2023-10-01T12:00:00Z",
          "updated_at": "2023-10-01T12:00:00Z"
        }
      }
    },
    "embed": {
      "hybrid_policy": "default",
      "status": "health",
      "services": {
        "local": {},
        "remote": {}
      }
    }
  }
}
```

### 根据配置导入安装服务
- **POST** `/service/import`
- **描述**：导入指定服务的配置文件，并自动安装相应的服务和模型
- **请求示例**：
```json
{
  "version": "v0.2",
  "services": {
    "chat": {
      "service_providers": {
        "local": "local_ollama_chat",
        "remote": "remote_smartvision_chat"
      },
      "hybrid_policy": "always_local"
    },
    "embed": {
      "service_providers": {
        "local": "local_ollama_embed",
        "remote": "remote_smartvision_embed"
      },
      "hybrid_policy": "always_local"
    },
    "text_to_image": {
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
      "desc": "Local ollama chat/completion",
      "api_flavor": "ollama",
      "method": "POST",
      "auth_type": "none",
      "auth_key": "",
      "models": []
    },
    "remote_smartvision_chat": {
      "desc": "Remote smartVision chat",
      "service_name": "chat",
      "service_source": "remote",
      "api_flavor": "smartvision",
      "method": "POST",
      "auth_type": "none",
      "auth_key": "{\"神州数码|DeepSeek-R1\":{\"provider\":\"dcmodel\",\"model_key\":\"DeepSeek-R1\",\"env_type\":\"production\",\"credentials\":{\"api_key\":\"your_api_key\",\"endpoint_url\":\"http://120.232.136.137:8100/v1\"}}}",
      "models": ["神州数码|DeepSeek-R1"]
    },
    "remote_smartvision_embed": {
      "desc": "Remote smartVision embed",
      "service_name": "embed",
      "service_source": "remote",
      "api_flavor": "smartvision",
      "method": "POST",
      "auth_type": "none",
      "auth_key": "",
      "models": []
    },
    "remote_aliyun_text_to_image": {
      "desc": "Remote aliyun tti",
      "service_name": "text_to_image",
      "service_source": "remote",
      "api_flavor": "aliyun",
      "method": "POST",
      "auth_type": "none",
      "auth_key": "",
      "models": []
    }
  }
}
```
- **响应示例**：
```json
{
  "business_code": 0,
  "message": ""
}
```

---

## 模型服务相关

### 模型列表（是否加上服务类型分类）
- **GET** `/services/models`
- **请求参数**：无
- **响应示例**：
```json
{
  "models": [
    {
      "digest": "f6daf2b25194025ae2d5288f2afd041997ce48116807a3b612c1a96b09bec03a",
      "family": "qwen2",
      "format": "gguf",
      "modified_at": "2025-04-01T15:19:52.952743+08:00",
      "name": "qwen2:1.5b",
      "parameter_size": "1.5B",
      "quantizatioin_level": "Q4_0",
      "size": 934964102
    }
    ...
    {
      "digest": "cd232613fa6f9d030c6d3c244c132bbab36e3f6d7bc75a03e9b71fd9299add0f",
      "family": "bert",
      "format": "gguf",
      "modified_at": "2024-08-19T20:11:48+08:00",
      "name": "quentinz/bge-base-zh-v1.5-npu:latest",
      "parameter_size": "101.68M",
      "quantizatioin_level": "F16",
      "size": 204755928
    }
  ]
}
```

### 推荐模型列表
- **GET** `/model/recommend`
- **请求参数**：无
- **响应示例**：
```json
{
  "business_code": 0,
  "message": "",
  "data": {
    "chat": [
      {
        "service_name": "",
        "api_flavor": "",
        "method": "",
        "desc": "",
        "url": "",
        "auth_type": "",
        "auth_apply_url": "",
        "auth_fields": null,
        "name": "Qwen2.5:1.5b",
        "service_provider_name": "",
        "size": "4.7G",
        "is_recommended": false
      },
      {
        "service_name": "",
        "api_flavor": "",
        "method": "",
        "desc": "",
        "url": "",
        "auth_type": "",
        "auth_apply_url": "",
        "auth_fields": null,
        "name": "Deepseek-r1:1.5b",
        "service_provider_name": "",
        "size": "4.7G",
        "is_recommended": false
      }
    ]
  }
}
```

### 支持模型列表
- **GET** `/model/support`
- **请求参数**：
  - `service_source` (必填)：服务来源（local：本地， remote：云端）
  - `flavor` (必填)：厂商（local默认为ollama）
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success",
  "data": {
    "chat": [
      {
        "service_name": "chat",
        "api_flavor": "ollama",
        "method": "POST",
        "desc": "",
        "url": "http://127.0.0.1:16677/api/chat",
        "auth_type": "none",
        "auth_apply_url": "",
        "auth_fields": null,
        "name": "Qwen2.5:1.5b",
        "service_provider_name": "local_ollama_chat",
        "size": "4.7G",
        "is_recommended": true,
        "status": "",
        "avatar": "",
        "can_select": false,
        "class": "",
        "ollama_id": "",
        "params_size": 1.5
      },
      ...
    ]
  }
}
```

### Smartvision 支持模型列表
- **GET** `/model/support/smartvision`
- **请求参数**：
  - `env_type` (必填)：环境信息（dev：开发， product：生产）
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success",
  "data": {
    "code": 0,
    "data": [
      {
        "id": 282,
        "name": "微软|Azure-GPT-3.5",
        "avatar": "avatar_url",
        "type": 2,
        "provider": "azure",
        "modelKey": "azure-openai",
        "credentialParamsId": "2,3",
        "introduce": "markdown_type_introduction",
        "tags": [
          "商用",
          "微软"
        ],
        "credentialParams": [
          {
            "id": 2,
            "name": "api_host",
            "label": "api-host",
            "type": "text",
            "placeholder": "请输入api-host",
            "required": 1,
            "value": null,
            "sort": 8,
            "createTime": 1712571378000,
            "updateTime": 1712741984000
          }
        ]
      }
    ]
  }
}
```

---

## Chat 服务

### 聊天服务
- **POST** `/services/chat`
- **请求参数**：
  - `model` (选填)：模型名称
  - `messages` (必填)：会话列表
  - `stream` (非必填)：是否流式输出（默认true）
- **请求示例**：
```json
{
  "model": "deepseek-r1:7b",
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "你好！"
    }
  ]
}
```
- **响应示例（流式）**：
```json
{
  "created_at": "2025-03-11T06:21:42.9169035Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "<think>",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:42.9812018Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "\n\n",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:43.0410692Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "</think>",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:43.1024812Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "\n\n",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:43.1659403Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "您好",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
  ...
{
  "created_at": "2025-03-11T06:21:45.2175653Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "帮助",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:45.2805193Z",
  "finished": false,
  "id": "130792025696700548788",
  "message": {
    "content": "。",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
{
  "created_at": "2025-03-11T06:21:45.3410387Z",
  "finish_reason": "stop",
  "finished": true,
  "id": "130792025696700548788",
  "message": {
    "content": "",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
```
- **请求示例（非流式）**：
```json
{
  "model": "deepseek-r1:7b",
  "messages": [
    {
      "role": "user",
      "content": "你是谁？"
    }
  ],
  "stream": false,
  "options": {
    "temperature": 0.7,
    "max_tokens": 2000
  }
}
```
- **响应示例（非流式）**：
```json
{
  "created_at": "2025-03-11T06:38:36.1349763Z",
  "finish_reason": "stop",
  "finished": true,
  "id": "49487566988534527779",
  "message": {
    "content": "<think>\n\n</think>\n\n您好！我是由中国的深度求索（DeepSeek）公司开发的智能助手DeepSeek-R1。如您有任何任何问题，我会尽我所能为您提供帮助。",
    "role": "assistant"
  },
  "model": "deepseek-r1:7b"
}
```

---

## 生文服务
- **POST** `/services/generate`
- **描述**：与生文服务进行交互
- **请求参数**：
  - `model` (String, 必填)：模型名称
  - `stream` (Boolean, 非必填)：是否流式输出（默认true）
  - `prompt` (String, 必填)：输入文本
- **请求示例（流式）**：
```json
{
  "model": "qwen2:0.5B",
  "stream": true,
  "prompt": "你好"
}
```
- **响应示例（流式）**：
```json
{
  "model": "qwen2:0.5B",
  "created_at": "2025-02-07T11:22:06.3111099Z",
  "response": "你好",
  "done": false
}
 ...
{
  "model": "qwen2:0.5B",
  "created_at": "2025-02-07T11:22:06.4399286Z",
  "response": "？",
  "done": false
}
{
  "model": "qwen2:0.5B",
  "created_at": "2025-02-07T11:22:06.4545163Z",
  "response": "",
  "done": true,
  "done_reason": "stop",
  "context": [
    151644,
    872,
    ...
    101037,
    11319
  ],
  "total_duration": 799359500,
  "load_duration": 595309700,
  "prompt_eval_count": 9,
  "prompt_eval_duration": 57709000,
  "eval_count": 11,
  "eval_duration": 143442000
}
```
- **请求示例（非流式）**：
```json
{
  "model": "qwen2:0.5B",
  "stream": false,
  "prompt": "你好"
}
```
- **响应示例（非流式）**：
```json
{
  "model": "qwen2:0.5B",
  "created_at": "2025-02-07T11:29:14.7077038Z",
  "message": {
    "role": "assistant",
    "content": "你好！很高兴见到你。你是来自哪里的？有什么特别的问题或需要帮助吗？"
  },
  "done_reason": "stop",
  "done": true,
  "total_duration": 825159300,
  "load_duration": 541051100,
  "prompt_eval_count": 10,
  "prompt_eval_duration": 54905000,
  "eval_count": 20,
  "eval_duration": 227076000
}
```

---

## 生图服务
- **POST** `/services/text_to_image`
- **描述**：与生图服务进行交互
- **请求参数**：
  - `model` (String, 选填)：模型名称
  - `input` (String, 必填)：输入信息
  - `size` (String, 选填)：图片尺寸（默认1024×1024）
  - `n` (Int, 选填)：图片数量
- **请求示例**：
```json
{
  "model": "wanx2.1-t2i-turbo",
  "prompt": "一间有着精致窗户的花店，漂亮的木质门，摆放着花朵",
  "size": "1024×1024",
  "n": 1
}
```
- **响应示例**：
```json
{
  "data": {
    "url": [
      "https://image_url"
    ]
  },
  "id": "ab967cd8-392f-90d9-a2b2-92bf1792cd7f"
}
```

---

## embedding 服务
- **POST** `/services/embed`
- **描述**：与 embedding 服务进行交互
- **请求参数**：
  - `model` (String, 选填)：模型名称
  - `input` (Array, 必填)：输入信息
- **请求示例**：
```json
{
  "model": "text-embedding-v3",
  "input": ["text"]
}
```
- **响应示例**：
```json
{
  "data": [
    {
      "embedding": [
        -0.0695386752486229,
        ...
        0.030681096017360687
      ],
      "index": 0,
      "object": "embedding"
    }
  ],
  "model": "text-embedding-v3",
  "id": "73591b79-d194-9bca-8bb5-xxxxxxxxxxxx"
}
```

---

## 各厂商 flavor
- **POST** `/api_flavors/{flavor_name}/{flavor_url}`

- **描述**：调用各厂商的 API 接口
- **请求参数**：
  - `model` (必填)：模型名称
  - `messages` (必填)：会话列表
  - `stream` (非必填)：是否流式输出（默认false）
- **请求示例（非流式）**：
```json
{
  "model": "deepseek-r1:7b",
  "messages": [
    {
      "role": "user",
      "content": "你是谁？"
    }
  ],
  "stream": false
}
```
- **响应示例（非流式）**：
```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "<think>\n\n</think>\n\n您好！我是由中国的深度求索（DeepSeek）公司开发的智能助手DeepSeek-R1。如您有任何任何问题，我会尽我所能为您提供帮助。",
        "role": "assistant"
      }
    }
  ],
  "created": "2025-03-11T06:42:56.9234537Z",
  "id": "905022416582550122210",
  "model": "deepseek-r1:7b",
  "object": "chat.completion"
}
```
- **请求示例（流式）**：
```json
{
  "model": "deepseek-r1:7b",
  "messages": [
    {
      "role": "user",
      "content": "你是谁？"
    }
  ],
  "stream": true,
  "options": {
    "temperature": 0.7,
    "max_tokens": 2000
  }
}
```
- **响应示例（流式）**：
```json
{
  "choices": [
    {
      "delta": {
        "content": "<think>",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created": "2025-03-11T06:45:48.9707841Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "\n\n",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created": "2025-03-11T06:45:49.0289935Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "</think>",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created": "2025-03-11T06:45:49.0879203Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "\n\n",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created": "2025-03-11T06:45:49.1458361Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "您好",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created": "2025-03-11T06:45:49.2059175Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
...
{
  "choices": [
    {
      "delta": {
        "content": "帮助",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created_at": "2025-03-11T06:45:51.2514652Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "。",
        "role": "assistant"
      },
      "index": 0
    }
  ],
  "created_at": "2025-03-11T06:45:51.312236Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}
{
  "choices": [
    {
      "delta": {
        "content": "",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0
    }
  ],
  "created_at": "2025-03-11T06:45:51.3747187Z",
  "id": "1602427967901133435012",
  "model": "deepseek-r1:7b",
  "object": "chat.completion.chunk"
}

---

## Control Panel

### 获取模型存储路径
- **GET** `/control_panel/model/filepath`
- **描述**：获取当前模型存储路径
- **响应示例**：
```json
{
  "business_code": 40000,
  "message": "control panel interface call success",
  "data": {
    "path": "D:\\your_model_path"
  }
}
```

### 获取对应路径下磁盘空间信息
- **GET** `/control_panel/path/space`
- **描述**：获取指定路径的磁盘空间信息
- **请求参数**：
  - `path` (String, 必选)：文件路径
- **响应示例**：
```json
{
  "business_code": 40000,
  "message": "control panel interface call success",
  "data": {
    "free_size": 7,
    "total_size": 117,
    "usage_size": 124
  }
}
```

### 修改模型存储路径
- **POST** `/control_panel/model/filepath`
- **描述**：修改模型存储路径
- **请求参数**：
  - `source_path` (String, 必选)：文件原路径
  - `target_path` (String, 必选)：文件目标路径
- **响应示例**：
```json
{
  "business_code": 40000,
  "message": "control panel interface call success",
  "data": { }
}
```

### 模型广场
- **GET** `/control_panel/model/square`
- **描述**：获取模型广场信息
- **请求参数**：
  - `flavor` (String, 非必选)：厂商
  - `env_type` (String, 非必选)：环境（dev-测试，product-生产）
  - `service_source` (String, 必选)：服务来源 （local-本地，remote-云端）
  - `page_size` (int, 非必选)：页容量（默认 10）
  - `page` (int, 非必选)：页码（默认1）
- **响应示例**：
```json
{
  "business_code": 30000,
  "message": "service interface call success",
  "data": {
    "data": [
      {
        "id": "93c6229213ab5b6891c17a2b9800a7cf",
        "service_name": "chat",
        "api_flavor": "ollama",
        "flavor": "Deepseek",
        "method": "",
        "desc": "Deepseek-r1-1.5B 是 Deepseek 团队研发的语言模型，约15亿参数，属于Deepseek-R1模型系列中的轻量级版本，适合基础任务和低资源环境。",
        "url": "",
        "auth_type": "",
        "auth_apply_url": "",
        "auth_fields": [
          ""
        ],
        "name": "deepseek-r1:1.5b",
        "service_provider_name": "local_ollama_chat",
        "size": "1.1GB",
        "is_recommended": false,
        "status": "",
        "avatar": "http://your_model_avatar/deepseek.png",
        "can_select": false,
        "class": [
          "文本生成"
        ],
        "ollama_id": "a42b25d8c10a",
        "params_size": 0,
        "input_length": 0,
        "output_length": 0,
        "source": "local",
        "smartvision_provider": "",
        "smartvision_model_key": ""
      }
    ],
    "page": 1,
    "page_size": 10,
    "total": 1,
    "total_page": 1
  }
}
```

## 🔧 扩展与集成

Oadin 通过标准化的 API 接口和配置机制，为开发者提供灵活的集成和定制能力。

## 📋 当前扩展方式

### 🔌 服务提供商扩展

通过配置接口动态添加新的 AI 服务提供商，无需修改代码：

- **支持厂商**: Ollama、OpenAI、DeepSeek、SmartVision、阿里云、百度等
- **配置方式**: 通过 `/service_provider` REST API 进行注册和管理
- **认证支持**: 支持 apikey、token、credentials 等多种认证方式
- **服务类型**: 支持 chat、generate、embed、text-to-image 等服务

```bash
# 示例：添加新的服务提供商
curl -X POST /service_provider \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "chat",
    "service_source": "remote", 
    "api_flavor": "custom_provider",
    "provider_name": "my_custom_chat",
    "url": "https://api.myprovider.com/chat",
    "auth_type": "apikey",
    "auth_key": "your-api-key"
  }'
```

### 配置驱动的扩展

支持通过配置文件批量部署和管理服务：

- **声明式配置**: JSON 格式的服务配置文件
- **批量导入**: 通过 `/service/import` 一次性部署多个服务
- **环境管理**: 支持开发、测试、生产环境配置分离
- **版本控制**: 配置文件可以进行版本化管理

###  API 集成

所有功能通过 RESTful API 暴露，便于第三方系统集成：

- **标准化接口**: 统一的请求/响应格式
- **完整文档**: 详细的 API 参数和示例
- **错误处理**: 统一的错误码和错误信息
- **健康检查**: 服务状态监控接口

## 当前限制

### 不支持的扩展方式

目前 Oadin **不支持**以下扩展机制：

- **插件系统**: 无法动态加载第三方插件
- **代码扩展**: 无法通过编写代码扩展核心功能
- **事件钩子**: 无系统级事件订阅机制
- **自定义协议**: 无法添加新的通信协议支持

### 替代方案

对于需要深度定制的场景，建议：

1. **Fork 项目**: 直接修改源代码进行定制
2. **API 代理**: 在 Oadin 前端添加代理层实现自定义逻辑
3. **配置适配**: 通过现有配置机制尽可能满足需求

## 未来规划

我们计划在后续版本中添加真正的扩展能力：

- [ ] **插件架构**: 支持动态加载的插件系统
- [ ] **事件机制**: 提供生命周期钩子和事件订阅
- [ ] **扩展 SDK**: 提供标准化的扩展开发工具包
- [ ] **自定义协议**: 支持添加新的 AI 服务协议适配器

## 集成指南

### 快速集成

1. **服务状态检查**
   ```bash
   curl -X GET /health
   ```

2. **获取支持的模型**
   ```bash
   curl -X GET /model/support?service_source=local&flavor=ollama
   ```

3. **调用 AI 服务**
   ```bash
   curl -X POST /services/chat \
     -H "Content-Type: application/json" \
     -d '{
       "model": "your-model",
       "messages": [{"role": "user", "content": "Hello"}]
     }'
   ```

### 最佳实践

- **渐进式集成**: 先集成核心功能，再逐步添加高级特性
- **错误处理**: 实现完善的错误重试和降级机制
- **监控告警**: 监控 API 调用成功率和响应时间
- **配置管理**: 使用配置文件管理不同环境的设置
