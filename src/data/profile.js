export const profile = {
  name: 'Ritesh Pawar',
  role: 'AI Engineer',
  company: 'Smiligners',
  location: 'Navi Mumbai',
  email: 'riteshhpawar23@gmail.com',

  links: {
    github: 'https://github.com/Riteshhpawar23',
    linkedin: 'https://www.linkedin.com/in/riteshhpawar23',
    leetcode: 'https://leetcode.com/u/riteshhpawar23/',
  },

  // The CV is public/resume.pdf. Replace that file to update it.
  // It opens in a new tab. Give download a file name to save it directly instead.
  resume: {
    href: `${import.meta.env.BASE_URL}resume.pdf`,
    download: null,
  },

  // The row under the hero stays hidden while this is empty.
  // Example shape: { value: '3', label: 'Projects shipped' }
  stats: [],

  capabilities: [
    {
      title: 'LLM apps and agents',
      text: 'I build applications on language models, with agents and multi-agent workflows that automate real tasks and business processes.',
      tools: ['LangChain', 'Gemini', 'OpenAI', 'Python'],
    },
    {
      title: 'RAG pipelines',
      text: 'I connect models to the documents and data they need, so answers come from the source material instead of guesswork.',
      tools: ['Haystack', 'LangChain', 'Hugging Face'],
    },
    {
      title: 'Fine-tuning',
      text: 'I fine-tune language models with QLoRA and use quantization to make them efficient enough to run locally.',
      tools: ['QLoRA', 'Quantization', 'PyTorch'],
    },
  ],
};
