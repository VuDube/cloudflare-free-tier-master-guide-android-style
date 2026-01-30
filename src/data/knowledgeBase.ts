export interface TopicDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  overview: string;
  limits: string[];
  setupSteps: string[];
}
export const KNOWLEDGE_BASE: Record<string, TopicDetail> = {
  pages: {
    id: 'pages',
    title: 'Cloudflare Pages',
    description: 'Blazing fast static site hosting with built-in CI/CD.',
    icon: 'Layers',
    color: '#F38020',
    overview: 'Pages is a JAMstack platform for frontend developers to collaborate and deploy websites. The free tier is incredibly generous, offering unlimited sites and bandwidth.',
    limits: [
      '500 monthly builds',
      '100 custom domains per project',
      'Unlimited requests & bandwidth',
      '25 MiB max file size',
      '1 concurrent build'
    ],
    setupSteps: [
      'Connect your Git provider (GitHub/GitLab).',
      'Select your repository.',
      'Configure build settings (npm run build, dist folder).',
      'Deploy!'
    ]
  },
  workers: {
    id: 'workers',
    title: 'Workers OS',
    description: 'Deploy serverless code instantly across the globe.',
    icon: 'Cpu',
    color: '#F38020',
    overview: 'Workers allows you to run JavaScript, Rust, and C++ on Cloudflare\'s edge network. It uses V8 isolates for near-zero cold starts.',
    limits: [
      '100,000 daily requests',
      '10ms CPU time per request',
      '1GB KV storage (Read-only)',
      '30 scripts maximum',
      'Standard subdomains (*.workers.dev)'
    ],
    setupSteps: [
      'Install Wrangler: npm install -g wrangler',
      'Run: wrangler init my-worker',
      'Develop in index.ts',
      'Run: wrangler deploy'
    ]
  },
  ai: {
    id: 'ai',
    title: 'Workers AI',
    description: 'Run machine learning models on the edge.',
    icon: 'Brain',
    color: '#F38020',
    overview: 'Cloudflare Workers AI allows you to run high-performance AI models (Llama, Whisper, etc.) directly on Cloudflare’s global network of GPUs.',
    limits: [
      'Daily usage limits apply (Tier-based)',
      'Varying neuron costs per model',
      'Access to Llama 3, Mistral, Whisper',
      'Limit on max input tokens'
    ],
    setupSteps: [
      'Create a Worker project.',
      'Add AI binding to wrangler.toml.',
      'Use env.AI.run(model, input).',
      'Deploy and start inferencing.'
    ]
  },
  d1: {
    id: 'd1',
    title: 'D1 Database',
    description: 'Serverless SQL database built on SQLite.',
    icon: 'Database',
    color: '#F38020',
    overview: 'D1 is Cloudflare’s first native serverless SQL database. It allows you to build data-rich applications without the complexity of managing a traditional database.',
    limits: [
      '500MB storage per database',
      '5 million rows per DB',
      'Unlimited read units',
      '100k write units/day'
    ],
    setupSteps: [
      'Create DB: wrangler d1 create my-db',
      'Bind in wrangler.toml.',
      'Define schemas in SQL files.',
      'Execute: wrangler d1 execute my-db --file=schema.sql'
    ]
  }
};