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
  },
  r2: {
    id: 'r2',
    title: 'R2 Storage',
    description: 'S3-compatible object storage with zero egress fees.',
    icon: 'HardDrive',
    color: '#F38020',
    overview: 'R2 gives you the freedom to create the multi-cloud architectures you desire with an S3-compatible object storage that eliminates egress fees.',
    limits: [
      '10 GB storage per month',
      '1 million Class A operations/month',
      '10 million Class B operations/month',
      'Zero egress (bandwidth) fees'
    ],
    setupSteps: [
      'Create bucket: wrangler r2 bucket create my-bucket',
      'Add binding in wrangler.toml.',
      'Access via env.MY_BUCKET.put() / .get().',
      'Run: wrangler deploy'
    ]
  },
  kv: {
    id: 'kv',
    title: 'Workers KV',
    description: 'Low-latency key-value data store.',
    icon: 'Table',
    color: '#F38020',
    overview: 'Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low latency, making it possible to build highly dynamic APIs.',
    limits: [
      '1 GB storage total',
      '100,000 read operations per day',
      '1,000 write operations per day',
      '1,000 delete operations per day'
    ],
    setupSteps: [
      'Create namespace: wrangler kv:namespace create MY_KV',
      'Copy the ID to your wrangler.toml.',
      'Use env.MY_KV.get("key") in code.',
      'Publish with wrangler deploy.'
    ]
  },
  do: {
    id: 'do',
    title: 'Durable Objects',
    description: 'Stateful serverless coordination with strong consistency.',
    icon: 'Zap',
    color: '#F38020',
    overview: 'Durable Objects provide low-latency storage and coordination for Cloudflare Workers. They are perfect for chat, collaborative editing, or game servers.',
    limits: [
      'Free tier includes 1M requests/month',
      'Free 400,000 GB-seconds of duration',
      'WebSocket support included',
      'Requires Paid Plan for higher quotas'
    ],
    setupSteps: [
      'Define a class extending DurableObject.',
      'Configure [durable_objects] in wrangler.toml.',
      'Define migrations for new classes.',
      'Deploy using wrangler deploy.'
    ]
  }
};