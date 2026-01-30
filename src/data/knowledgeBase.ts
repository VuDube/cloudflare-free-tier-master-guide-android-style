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
  },
  hyperdrive: {
    id: 'hyperdrive',
    title: 'Hyperdrive',
    description: 'Connect existing DBs to Workers.',
    icon: 'Zap',
    color: '#F38020',
    category: 'Compute',
    overview: 'Accelerates database queries from the edge to your existing Postgres/MySQL.',
    limits: [
      '100,000 queries per day',
      '1 Hyperdrive config free',
      'Supported: Postgres/MySQL'
    ],
    setupSteps: [
      'wrangler hyperdrive create my-config --connection-string="..."',
      'Bind in wrangler.toml'
    ],
    specs: {
      'Daily Queries': '100k',
      'Pooling': 'Built-in',
      'Latency': 'Optimized'
    },
    related: ['workers', 'd1']
  },
  queues: {
    id: 'queues',
    title: 'Queues',
    description: 'Guaranteed message delivery.',
    icon: 'Shuffle',
    color: '#F38020',
    category: 'Compute',
    overview: 'Decouple services with a serverless message queue.',
    limits: [
      '1 Million operations / month',
      'Max message size 128KB',
      'Retention: 4 days'
    ],
    setupSteps: [
      'wrangler queues create my-queue',
      'env.MY_QUEUE.send(msg)'
    ],
    specs: {
      'Ops/Month': '1M',
      'Max Message': '128KB',
      'Retry': 'Configurable'
    },
    related: ['workers', 'do']
  },
  vectorize: {
    id: 'vectorize',
    title: 'Vectorize',
    description: 'Vector database for AI apps.',
    icon: 'Box',
    color: '#F38020',
    category: 'AI',
    overview: 'High-performance vector search for RAG and AI applications.',
    limits: [
      '5 million vectors storage',
      '30 million queries / month',
      'Metadata: 10KB per vector'
    ],
    setupSteps: [
      'wrangler vectorize create my-index --dimensions=768',
      'env.INDEX.query(vector)'
    ],
    specs: {
      'Storage': '5M Vectors',
      'Queries': '30M/mo',
      'Dimensions': 'Up to 1536'
    },
    related: ['ai', 'ai-gateway']
  },
  images: {
    id: 'images',
    title: 'Images',
    description: 'Optimize & resize images.',
    icon: 'Image',
    color: '#F38020',
    category: 'Network',
    overview: 'Store, resize, and optimize images at scale.',
    limits: [
      '1,000 transformations / month',
      'Free storage tier included',
      'WebP/AVIF support'
    ],
    setupSteps: [
      'Upload image via dashboard or API',
      'Fetch via variant URL'
    ],
    specs: {
      'Transforms': '1k/mo',
      'Formats': 'WebP, AVIF, PNG',
      'Delivery': 'Edge Optimized'
    },
    related: ['r2', 'streams']
  },
  cache: {
    id: 'cache',
    title: 'Cache API',
    description: 'Customize edge caching.',
    icon: 'CloudRain',
    color: '#F38020',
    category: 'Network',
    overview: 'Direct control over the Cloudflare global CDN cache.',
    limits: [
      'Unlimited cache requests',
      'Purge by tag: Limited on Free',
      'Tiered Caching: Enabled'
    ],
    setupSteps: [
      'caches.default.put(request, response)',
      'caches.default.match(request)'
    ],
    specs: {
      'Traffic': 'Unlimited',
      'TTL': 'Customizable',
      'Purge': 'Standard'
    },
    related: ['pages', 'workers']
  },
  streams: {
    id: 'streams',
    title: 'Stream',
    description: 'On-demand video streaming.',
    icon: 'Play',
    color: '#F38020',
    category: 'Network',
    overview: 'High quality video hosting and streaming with a global player.',
    limits: [
      '100 minutes of video free',
      '1,000 minutes of viewing',
      'Max file size 1GB'
    ],
    setupSteps: [
      'Upload file via API',
      'Use Stream Player component'
    ],
    specs: {
      'Storage': '100 mins',
      'Delivery': 'Adaptive Bitrate',
      'Player': 'Integrated'
    },
    related: ['images', 'r2']
  },
  ai_gateway: {
    id: 'ai_gateway',
    title: 'AI Gateway',
    description: 'Observe & cache AI calls.',
    icon: 'ShieldCheck',
    color: '#F38020',
    category: 'AI',
    overview: 'The control plane for your AI apps. Logs, analytics, and caching for LLM requests.',
    limits: [
      '100,000 requests / month',
      'Logs: 1 week retention',
      'Cache: Free enabled'
    ],
    setupSteps: [
      'Create gateway in dashboard',
      'Replace OpenAI URL with Gateway URL'
    ],
    specs: {
      'Requests': '100k/mo',
      'Observability': 'Real-time',
      'Providers': 'Multi-LLM'
    },
    related: ['ai', 'vectorize']
  }
};