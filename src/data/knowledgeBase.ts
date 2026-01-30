export type TopicCategory = 'Compute' | 'Storage' | 'AI' | 'Network';
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
    related: ['d1', 'r2', 'kv']
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
    id: 'q4',
    question: 'What is the CPU time limit per request for Workers on the Free Tier?',
    options: ['10ms', '50ms', '100ms', '500ms'],
    correctIndex: 0,
    explanation: 'Free tier workers are limited to 10ms of CPU time, though wall time can be higher for I/O operations.'
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
  },
  {
    id: 'ai-chat',
    title: 'Llama 3 Edge Chat',
    stack: ['Workers AI', 'Workers'],
    codeSnippet: `export default {
  async fetch(request, env) {
    const response = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        messages: [
          { role: 'user', content: 'Hello!' }
        ]
      }
    );
    return Response.json(response);
  }
}`
  }
];