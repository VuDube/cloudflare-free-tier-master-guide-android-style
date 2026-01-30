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
  bestPractices?: string[];
  commonErrors?: { code: string; message: string; fix: string }[];
  neuronCosts?: Record<string, number>;
  wranglerConfig?: string;
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
export interface AutomationScript {
  id: string;
  title: string;
  description: string;
  command: string;
}
export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  steps: string[];
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
    bestPractices: [
      'Use Redirects file for SPA routing',
      'Enable Header optimizations for caching',
      'Utilize Pages Functions for API logic'
    ],
    commonErrors: [
      { code: 'Build Failed', message: 'Environment variable missing', fix: 'Check Settings > Variables in dashboard' }
    ],
    specs: { 'Build Limit': '500/mo', 'Max Domains': '100', 'SSL': 'Automatic' },
    related: ['workers', 'kv'],
    wranglerConfig: `[[pages_build_output]]\ndirectory = "dist"\n\n[[functions]]\ndirectory = "./functions"`
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
    setupSteps: ['npm install -g wrangler', 'wrangler init my-worker', 'wrangler deploy'],
    bestPractices: [
      'Keep scripts under 1MB',
      'Use environment secrets, not plain text',
      'Minimize CPU-intensive loops'
    ],
    commonErrors: [
      { code: '1101', message: 'Worker threw exception', fix: 'Check wrangler tail for logs' },
      { code: '1015', message: 'Rate limited', fix: 'Verify usage doesn\'t exceed 100k/day' }
    ],
    specs: { 'Daily Quota': '100k requests', 'CPU Time': '10ms (Free)', 'Memory': '128MB' },
    related: ['d1', 'r2', 'kv', 'durable-objects'],
    wranglerConfig: `name = "my-worker"\nmain = "src/index.ts"\ncompatibility_date = "2025-04-24"\n\n[vars]\nENVIRONMENT = "production"`
  },
  ai: {
    id: 'ai',
    title: 'Workers AI',
    description: 'Inference on global GPUs.',
    icon: 'Brain',
    color: '#F38020',
    category: 'AI',
    overview: 'Run Llama 3, Whisper, and SDXL directly on Cloudflare GPUs. Updated 2025 quotas provide enhanced neuron access.',
    limits: [
      '30,000 neurons per day (2025 Free Tier Update)',
      'Llama 3.1 8B supported',
      'Global GPU availability'
    ],
    setupSteps: ['Add [ai] binding to wrangler.toml', 'env.AI.run("@cf/meta/llama-3-8b")', 'Deploy'],
    bestPractices: [
      'Batch requests where possible',
      'Use streaming responses for LLMs',
      'Choose model size based on complexity'
    ],
    commonErrors: [
      { code: 'Out of Neurons', message: 'Daily quota exceeded', fix: 'Wait for reset or upgrade' }
    ],
    specs: { 'Daily Neurons': '30k', 'Model Access': 'Standard', 'Hardware': 'NVIDIA GPUs' },
    related: ['vectorize', 'ai-gateway'],
    neuronCosts: {
      '@cf/meta/llama-3.1-8b': 0.1,
      '@cf/openai/whisper': 1.0,
      '@cf/stabilityai/stable-diffusion-xl-base-1.0': 5.0,
      '@cf/baai/bge-large-en-v1.5': 0.01
    }
  },
  tunnel: {
    id: 'tunnel',
    title: 'Cloudflare Tunnel',
    description: 'Securely connect local services to the edge.',
    icon: 'Network',
    color: '#03A9F4',
    category: 'Security',
    overview: 'Cloudflare Tunnel provides a secure way to connect your resources to Cloudflare without a publicly routable IP address.',
    limits: ['Unlimited tunnels', 'Unlimited bandwidth', 'Zero trust integration', 'Standard concurrent connections'],
    setupSteps: ['Install cloudflared', 'cloudflared tunnel create my-app', 'Configure config.yaml', 'Run tunnel'],
    bestPractices: ['Run as service', 'Use Access policies', 'Health check beacons'],
    commonErrors: [{ code: 'Credentials Missing', message: 'Tunnel token invalid', fix: 'Run tunnel login' }],
    specs: { 'Encryption': 'TLS 1.3', 'Latency': 'Minimal', 'Routing': 'Private' },
    related: ['workers', 'turnstile']
  },
  'durable-objects': {
    id: 'durable-objects',
    title: 'Durable Objects',
    description: 'Stateful compute with consistency.',
    icon: 'Database',
    color: '#F38020',
    category: 'Compute',
    overview: 'Durable Objects provide low-latency state and coordination for your Workers, enabling real-time features.',
    limits: ['1,000,000 requests (Shared)', '128MB memory per object', 'Unlimited storage'],
    setupSteps: ['Define class', 'Add binding to wrangler.toml', 'Call env.DO.get(id)'],
    bestPractices: ['Small state objects', 'Use alarm API', 'Minimize locks'],
    commonErrors: [{ code: 'Storage Error', message: 'Size exceeded', fix: 'Shard state' }],
    specs: { 'Shared Quota': '1M reqs', 'Isolation': 'Single-threaded', 'Consistency': 'Strong' },
    related: ['workers', 'workflows']
  }
};
export const AUTOMATION_SCRIPTS: AutomationScript[] = [
  { id: 'd1-mig', title: 'D1 Migration', description: 'Apply pending SQL migrations.', command: 'wrangler d1 migrations apply my-db --remote' },
  { id: 'kv-bulk', title: 'KV Bulk Write', description: 'Populate KV from JSON file.', command: 'wrangler kv:key put --binding=MY_KV "key" "value"' },
  { id: 'r2-life', title: 'R2 Lifecycle', description: 'Set object expiration rules.', command: 'wrangler r2 bucket lifecycle set my-bucket --file lifecycle.json' }
];
export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  { id: 'rag-flow', title: 'RAG Pipeline', description: 'Ingest docs to Vectorize.', steps: ['Fetch PDF', 'Chunk Text', 'Generate Embeddings', 'Upsert Vectorize'] },
  { id: 'batch-proc', title: 'Batch Media', description: 'Process R2 uploads.', steps: ['Listen R2 Event', 'Trigger Worker', 'Resize Image', 'Notify Webhook'] },
  { id: 'edge-cache', title: 'Edge Prefetch', description: 'Warm global cache.', steps: ['Identify Hot Assets', 'Dispatch Workers', 'Fetch to Cache', 'Verify P95'] },
  { id: 'lora-inf', title: 'LoRA Inference', description: 'Custom fine-tuned LLM.', steps: ['Load Base Llama 3', 'Apply LoRA Weights', 'Stream Response', 'Log Neurons'] }
];
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
  }
];