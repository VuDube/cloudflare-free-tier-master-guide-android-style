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
    bestPractices: [
      'Use Redirects file for SPA routing',
      'Enable Header optimizations for caching',
      'Utilize Pages Functions for API logic'
    ],
    commonErrors: [
      { code: 'Build Failed', message: 'Environment variable missing', fix: 'Check Settings > Variables in dashboard' }
    ],
    specs: { 'Build Limit': '500/mo', 'Max Domains': '100', 'SSL': 'Automatic' },
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
    related: ['d1', 'r2', 'kv', 'durable-objects']
  },
  tunnel: {
    id: 'tunnel',
    title: 'Cloudflare Tunnel',
    description: 'Securely connect local services to the edge.',
    icon: 'Network',
    color: '#03A9F4',
    category: 'Security',
    overview: 'Cloudflare Tunnel provides a secure way to connect your resources to Cloudflare without a publicly routable IP address.',
    limits: [
      'Unlimited tunnels',
      'Unlimited bandwidth',
      'Zero trust integration included',
      'Standard concurrent connections'
    ],
    setupSteps: [
      'Install cloudflared on your server',
      'cloudflared tunnel create my-app',
      'Configure config.yaml with ingress rules',
      'cloudflared tunnel run my-app'
    ],
    bestPractices: [
      'Run as a service for persistence',
      'Use Access policies for security',
      'Implement health check beacons'
    ],
    commonErrors: [
      { code: 'Credentials Missing', message: 'Tunnel token invalid', fix: 'Run tunnel login or use token' }
    ],
    specs: { 'Encryption': 'TLS 1.3', 'Latency': 'Minimal Anycast', 'Routing': 'Private network' },
    related: ['workers', 'turnstile']
  },
  stream: {
    id: 'stream',
    title: 'Cloudflare Stream',
    description: 'Video infrastructure for applications.',
    icon: 'Video',
    color: '#E91E63',
    category: 'Media',
    overview: 'Stream is an end-to-end video solution. While primarily paid, the free-tier dashboard allows testing and management of assets.',
    limits: [
      'Testing quota enabled',
      'Direct creator uploads',
      'Adaptive bitrate included',
      'Global delivery network'
    ],
    setupSteps: [
      'Upload video via dashboard',
      'Configure security settings',
      'Embed using Stream Player JS'
    ],
    bestPractices: [
      'Use HLS/Dash for mobile optimization',
      'Implement signed URLs for private content',
      'Utilize webhooks for encoding status'
    ],
    commonErrors: [
      { code: 'Encoding Failed', message: 'Unsupported codec', fix: 'Use H.264/AAC standard' }
    ],
    specs: { 'Latency': 'Low-latency HLS', 'Formats': 'MP4, MOV, WebM', 'Storage': 'Cloudflare Managed' },
    related: ['r2', 'images']
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
    related: ['vectorize', 'ai-gateway']
  },
  'durable-objects': {
    id: 'durable-objects',
    title: 'Durable Objects',
    description: 'Stateful compute with consistency.',
    icon: 'Database',
    color: '#F38020',
    category: 'Compute',
    overview: 'Durable Objects provide low-latency state and coordination for your Workers, enabling real-time features.',
    limits: [
      '1,000,000 requests (Shared Free Quota)',
      '128MB memory per object',
      'Unlimited storage via State API'
    ],
    setupSteps: ['Define class', 'Add binding to wrangler.toml', 'Call env.DO.get(id)'],
    bestPractices: [
      'Keep state objects small',
      'Use alarm API for scheduled tasks',
      'Minimize global state locks'
    ],
    commonErrors: [
      { code: 'Storage Error', message: 'State size exceeded 128MB', fix: 'Shard state across IDs' }
    ],
    specs: { 'Shared Quota': '1M reqs', 'Isolation': 'Single-threaded', 'Consistency': 'Strong' },
    related: ['workers', 'workflows']
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