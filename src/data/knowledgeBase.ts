export type TopicCategory = 'Compute' | 'Storage' | 'AI' | 'Network' | 'Security' | 'Media' | 'DevOps';
export interface TopicDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: TopicCategory;
  overview: string;
  limits: string[];
  setupSteps: string[];
  specs?: Record<string, string>;
  related?: string[];
}
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
export interface CodeTemplate {
  id: string;
  title: string;
  stack: string[];
  codeSnippet: string;
}
export const KNOWLEDGE_BASE: Record<string, TopicDetail> = {
  pages: {
    id: 'pages',
    title: 'Cloudflare Pages',
    description: 'Static site hosting with built-in CI/CD.',
    icon: 'Layers',
    color: '#F38020',
    category: 'Compute',
    overview: 'Pages is a JAMstack platform for frontend developers. The free tier remains the industry standard for generous limits.',
    limits: [
      '500 monthly builds (2025 update)',
      'Unlimited requests & bandwidth',
      '25 MiB max file size',
      '1 concurrent build'
    ],
    setupSteps: [
      'Connect Git provider.',
      'Select repository.',
      'Configure build: npm run build.',
      'Deploy to *.pages.dev'
    ],
    specs: {
      'Build Limit': '500/mo',
      'Max Domains': '100',
      'SSL': 'Automatic',
      'Functions': 'Workers Integration'
    },
    related: ['workers', 'kv']
  },
  workers: {
    id: 'workers',
    title: 'Workers OS',
    description: 'Serverless code at the edge.',
    icon: 'Cpu',
    color: '#F38020',
    category: 'Compute',
    overview: 'Run JavaScript/Rust globally. 2025 standard for edge computing with 0ms cold starts.',
    limits: [
      '100,000 daily requests',
      '10ms CPU time per request',
      'Standard subdomains',
      '30 scripts max'
    ],
    setupSteps: [
      'npm install -g wrangler',
      'wrangler init my-worker',
      'wrangler deploy'
    ],
    specs: {
      'Daily Quota': '100k requests',
      'CPU Time': '10ms (Free)',
      'Memory': '128MB',
      'Payload': '100MB'
    },
    related: ['d1', 'r2', 'kv', 'durable-objects']
  },
  'durable-objects': {
    id: 'durable-objects',
    title: 'Durable Objects',
    description: 'Stateful compute with consistency.',
    icon: 'Database',
    color: '#F38020',
    category: 'Compute',
    overview: 'Durable Objects provide low-latency state and coordination for your Workers, enabling real-time features like chat, collaborative editing, and gaming.',
    limits: [
      '1,000,000 requests (Shared Free Quota)',
      '128MB memory per object',
      'Unlimited storage via State API',
      'Strict serialization for state'
    ],
    setupSteps: [
      'Define class in Worker script',
      'Add [durable_objects] to wrangler.toml',
      'Call env.DO_BINDING.get(id)'
    ],
    specs: {
      'Shared Quota': '1M reqs',
      'Isolation': 'Single-threaded per ID',
      'Consistency': 'Strongly Consistent',
      'Location': 'Sticky placement'
    },
    related: ['workers', 'workflows']
  },
  workflows: {
    id: 'workflows',
    title: 'Workflows',
    description: 'Stateful orchestration engine.',
    icon: 'GitBranch',
    color: '#F38020',
    category: 'DevOps',
    overview: 'Workflows (Beta 2025) allows you to build reliable, long-running processes with retries, sleeps, and state persistence across multiple steps.',
    limits: [
      'Standard usage (Beta Period)',
      '7-day max workflow duration',
      '50 steps per workflow',
      'Built-in observability'
    ],
    setupSteps: [
      'wrangler workflows create my-flow',
      'Define steps in workflow class',
      'Trigger via API or Trigger Binding'
    ],
    specs: {
      'Max Steps': '50',
      'State': 'Automatic Persistence',
      'Retries': 'Exponential Backoff',
      'Context': 'Full Worker Access'
    },
    related: ['workers', 'durable-objects', 'queues']
  },
  turnstile: {
    id: 'turnstile',
    title: 'Turnstile',
    description: 'Privacy-first smart CAPTCHA.',
    icon: 'Shield',
    color: '#F38020',
    category: 'Security',
    overview: 'Turnstile is Cloudflare’s smart CAPTCHA alternative. It can be embedded into any website without showing a CAPTCHA to users.',
    limits: [
      'Unlimited free for most cases',
      'Unlimited sitekeys',
      'Unlimited widgets',
      'Advanced analytics included'
    ],
    setupSteps: [
      'Generate Sitekey in Dashboard',
      'Embed JS snippet in frontend',
      'Verify token on backend API'
    ],
    specs: {
      'Cost': '$0 (Unlimited Free)',
      'Security': 'Managed Challenge',
      'Privacy': 'No tracking cookies',
      'Integrations': 'React, Vue, Plain JS'
    },
    related: ['workers', 'ai-gateway']
  },
  ai: {
    id: 'ai',
    title: 'Workers AI',
    description: 'Inference on global GPUs.',
    icon: 'Brain',
    color: '#F38020',
    category: 'AI',
    overview: 'Run Llama 3, Whisper, and SDXL directly on Cloudflare GPUs.',
    limits: [
      '10,000 neurons per day (Free)',
      'Llama 3.1 8B supported',
      'Rate limits on concurrent runs'
    ],
    setupSteps: [
      'Add [ai] binding to wrangler.toml',
      'env.AI.run("@cf/meta/llama-3-8b")',
      'Deploy'
    ],
    specs: {
      'Daily Neurons': '10k',
      'Model Access': 'Standard',
      'Hardware': 'NVIDIA GPUs'
    },
    related: ['vectorize', 'ai-gateway']
  },
  vectorize: {
    id: 'vectorize',
    title: 'Vectorize',
    description: 'Global vector database for AI.',
    icon: 'Hash',
    color: '#9C27B0',
    category: 'AI',
    overview: 'Scalable vector database built on top of Cloudflare network for fast semantic search and RAG.',
    limits: [
      '5,000,000 vector dimensions free',
      '1,000 metadata indexes',
      '30MB max index size'
    ],
    setupSteps: [
      'wrangler vectorize create my-index',
      'env.VECTORIZE.insert(vectors)',
      'env.VECTORIZE.query(queryVector)'
    ],
    specs: {
      'Free Dimensions': '5M',
      'Query Latency': '<10ms',
      'Format': 'Standard Vectors'
    },
    related: ['ai', 'd1']
  },
  'ai-gateway': {
    id: 'ai-gateway',
    title: 'AI Gateway',
    description: 'Observability for AI applications.',
    icon: 'Activity',
    color: '#673AB7',
    category: 'AI',
    overview: 'Proxy, cache, and monitor your AI requests across multiple providers with a single API.',
    limits: [
      '1,000,000 logs monthly',
      'Unlimited caching',
      'Rate limiting included'
    ],
    setupSteps: [
      'Create gateway in dashboard',
      'Update API endpoint to gateway URL',
      'View logs in real-time'
    ],
    specs: {
      'Monthly Logs': '1M',
      'Analytics': 'Real-time',
      'Caching': 'Edge-based'
    },
    related: ['ai', 'workers']
  },
  d1: {
    id: 'd1',
    title: 'D1 Database',
    description: 'Serverless SQL (SQLite).',
    icon: 'Database',
    color: '#F38020',
    category: 'Storage',
    overview: 'Cloudflare native SQL database for edge apps.',
    limits: [
      '500MB storage per DB',
      '5M rows total',
      '100k write units/day'
    ],
    setupSteps: [
      'wrangler d1 create my-db',
      'wrangler d1 execute my-db --file=schema.sql'
    ],
    specs: {
      'Storage': '500MB',
      'Writes': '100k/day',
      'Reads': 'Unlimited'
    },
    related: ['workers', 'hyperdrive']
  },
  hyperdrive: {
    id: 'hyperdrive',
    title: 'Hyperdrive',
    description: 'Database acceleration.',
    icon: 'Zap',
    color: '#03A9F4',
    category: 'Network',
    overview: 'Make your existing regional databases feel global by accelerating connections from the edge.',
    limits: [
      '1 hyperdrive config free',
      'Standard pooling limits',
      'Global acceleration'
    ],
    setupSteps: [
      'wrangler hyperdrive create my-config',
      'Connect via env.HYPERDRIVE.connectionString'
    ],
    specs: {
      'Latent Reduction': 'Up to 50%',
      'Caching': 'Smart pooling',
      'Security': 'MTLS Support'
    },
    related: ['workers', 'd1']
  },
  r2: {
    id: 'r2',
    title: 'R2 Storage',
    description: 'Zero egress object storage.',
    icon: 'HardDrive',
    color: '#F38020',
    category: 'Storage',
    overview: 'S3-compatible storage without the bandwidth tax.',
    limits: [
      '10 GB / month free',
      '1M Class A ops',
      '10M Class B ops'
    ],
    setupSteps: [
      'wrangler r2 bucket create my-bucket',
      'env.MY_BUCKET.put(key, data)'
    ],
    specs: {
      'Capacity': '10GB',
      'Egress': '$0 (Free)',
      'API': 'S3 Compatible'
    },
    related: ['kv', 'images']
  },
  queues: {
    id: 'queues',
    title: 'Queues',
    description: 'Message queuing for Workers.',
    icon: 'Mail',
    color: '#FFC107',
    category: 'DevOps',
    overview: 'Guaranteed message delivery and asynchronous processing for your global applications.',
    limits: [
      '1 million messages free',
      '10 queues max',
      '128KB max message size'
    ],
    setupSteps: [
      'wrangler queues create my-queue',
      'env.MY_QUEUE.send(msg)',
      'Consumer Workers config'
    ],
    specs: {
      'Monthly Free': '1M msgs',
      'Max Queues': '10',
      'Retry Logic': 'Built-in'
    },
    related: ['workers', 'd1']
  },
  kv: {
    id: 'kv',
    title: 'Workers KV',
    description: 'Global key-value store.',
    icon: 'Zap',
    color: '#F38020',
    category: 'Storage',
    overview: 'High-read, low-latency global key-value store optimized for configuration and routing data.',
    limits: [
      '1 GB total storage',
      '100,000 reads per day',
      '1,000 writes/deletes per day'
    ],
    setupSteps: [
      'wrangler kv:namespace create MY_KV',
      'env.MY_KV.put("key", "value")',
      'await env.MY_KV.get("key")'
    ],
    specs: {
      'Read Limit': '100k/day',
      'Write Limit': '1k/day',
      'Max Value Size': '25MB'
    },
    related: ['workers', 'r2']
  },
  images: {
    id: 'images',
    title: 'Cloudflare Images',
    description: 'Image optimization and delivery.',
    icon: 'Image',
    color: '#F38020',
    category: 'Media',
    overview: 'End-to-end solution for resizing, optimizing, and delivering images at scale.',
    limits: [
      '1,000 images free (Trial)',
      'Unlimited transformations',
      'Delivery included in bandwidth'
    ],
    setupSteps: [
      'Enable Images in dashboard',
      'Upload image via API or Dashboard',
      'Use variants for responsive sizes'
    ],
    specs: {
      'Storage Limit': '1k images',
      'Format Support': 'WebP, AVIF',
      'Security': 'Signed URLs'
    },
    related: ['r2', 'stream']
  }
};
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the daily request limit for the Workers Free plan?',
    options: ['10,000', '100,000', '1,000,000', 'Unlimited'],
    correctIndex: 1,
    explanation: 'Cloudflare Workers Free Tier provides a generous 100,000 requests per day across all scripts.'
  },
  {
    id: 'q2',
    question: 'Which storage service offers 10GB of capacity for free with zero egress fees?',
    options: ['KV', 'D1', 'R2', 'Durable Objects'],
    correctIndex: 2,
    explanation: 'R2 Storage is designed to eliminate egress bandwidth taxes, offering 10GB for free monthly.'
  },
  {
    id: 'q3',
    question: 'How many monthly builds are included in the Pages Free Tier (2025 update)?',
    options: ['100', '250', '500', 'Unlimited'],
    correctIndex: 2,
    explanation: 'As of the latest 2025 update, Cloudflare Pages supports 500 builds per month on the Free Tier.'
  },
  {
    id: 'q_do1',
    question: 'What is the primary difference between a Worker and a Durable Object?',
    options: ['One is free, one is not', 'One is stateful, one is stateless', 'One uses Rust, one uses JS', 'No difference'],
    correctIndex: 1,
    explanation: 'Durable Objects provide a stateful environment with a persistent storage API, unlike standard stateless Workers.'
  },
  {
    id: 'q_wf1',
    question: 'Which service is best for long-running processes with built-in retries and state?',
    options: ['Cron Triggers', 'Durable Objects', 'Cloudflare Workflows', 'Queues'],
    correctIndex: 2,
    explanation: 'Workflows is designed specifically for stateful orchestration of multi-step processes.'
  }
];
export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'hono-d1',
    title: 'Hono + D1 REST API',
    stack: ['Hono', 'D1', 'Workers'],
    codeSnippet: `import { Hono } from 'hono'
const app = new Hono<{ Bindings: { DB: D1Database } }>()
app.get('/users', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM users LIMIT 10'
  ).all()
  return c.json(results)
})
export default app`
  },
  {
    id: 'r2-upload',
    title: 'R2 Image Uploader',
    stack: ['R2', 'Workers'],
    codeSnippet: `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    if (request.method === 'PUT') {
      await env.BUCKET.put(key, request.body);
      return new Response('Uploaded');
    }
    const object = await env.BUCKET.get(key);
    return new Response(object.body);
  }
}`
  }
];