/* AI 配置：云端接口优先（电脑关机也能用），本机 Ollama 兜底。也可以不填，用户在应用内设置 */
window.ZSB_AI = {
  cloud: {
    base: '',   /* 例：https://api.siliconflow.cn/v1 */
    key: '',    /* 云端 API Key */
    model: ''   /* 例：Qwen/Qwen2.5-7B-Instruct */
  },
  local: {
    base: 'http://localhost:11434',
    model: 'qwen3-8b:latest'
  },
  system: '你是「升本教练」的 AI 助教，面向专升本考生。用简体中文、口语化地讲解，先给结论再给步骤；最多 6 行就要有一个小结论。数学公式写成纯文本（如 x^2、∫），不要输出 LaTeX。不要编造考点之外的事实。'
};
