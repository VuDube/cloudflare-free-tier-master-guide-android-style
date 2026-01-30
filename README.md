# Cloudflare AI Chat Agent Template

A production-ready template for building AI-powered chat applications on Cloudflare Workers. Features multi-session conversations powered by Durable Objects, streaming responses, tool calling (web search, weather, MCP integration), and a modern React frontend with shadcn/ui.

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/)

## ✨ Key Features

- **Multi-Session Chat**: Persistent conversations across sessions using Cloudflare Durable Objects
- **AI Integration**: Cloudflare AI Gateway with Gemini models (tool calling support)
- **Streaming Responses**: Real-time message streaming for natural chat experience
- **Built-in Tools**: Web search (SerpAPI), weather lookup, extensible MCP tools
- **Session Management**: Create, list, update, delete chats with automatic titling
- **Modern UI**: React + TypeScript + Tailwind CSS + shadcn/ui components
- **Type-Safe**: Full TypeScript with Workers types and proper error handling
- **Production-Ready**: CORS, logging, health checks, client error reporting

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Durable Objects, Hono, Agents SDK, OpenAI SDK
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide React
- **State Management**: TanStack Query, Zustand (via immer), React Router
- **Tools & Utils**: MCP SDK, SerpAPI integration
- **Dev Tools**: Bun, ESLint, TypeScript 5

## 🚀 Quick Start

1. Click the deploy button above to deploy to Cloudflare Workers
2. Configure environment variables (see [Configuration](#configuration))
3. Your app is live! Start chatting with AI at the deployed URL

## 📦 Installation

```bash
# Clone or download the repo
git clone <your-repo-url>
cd cf-droid-guide-mxyxqztzevrsprwyxpuqq

# Install dependencies with Bun
bun install
```

## 🔧 Configuration

Set these environment variables in your `wrangler.jsonc` or Cloudflare dashboard:

```json
{
  "vars": {
    "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
    "CF_AI_API_KEY": "{your-cloudflare-workers-ai-token}",
    "SERPAPI_KEY": "{optional-serpapi-key-for-web-search}"
  }
}
```

- Get `CF_AI_API_KEY` from [Cloudflare Dashboard > AI > API Tokens](https://dash.cloudflare.com/?to=/:account/ai-gateway/tokens)
- Create AI Gateway at [Cloudflare AI Gateway](https://dash.cloudflare.com/?to=/:account/ai-gateway)

Optional MCP servers can be added in `worker/mcp-client.ts`.

## 💻 Development

```bash
# Start dev server (frontend + worker proxy)
bun dev

# Open http://localhost:3000 (or ${PORT:-3000})
```

- Hot reload for both frontend and worker
- Type generation: `bun cf-typegen`
- Lint: `bun lint`

## 🧪 Usage Examples

### Chat API (Backend)

```bash
# List sessions
curl https://your-worker/api/sessions

# Create session
curl -X POST https://your-worker/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"firstMessage": "Hello!"}'

# Send message (via /api/chat/{sessionId}/chat)
curl -X POST https://your-worker/api/chat/{sessionId}/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather in London?", "stream": true}'
```

### Frontend (React)

The UI handles sessions automatically:
- New chat → Creates session with smart title
- Send messages → Streams responses with tool support
- Sidebar → Switch/delete sessions

Available models: Gemini 2.5 Flash/Pro (configurable)

## 🚀 Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun deploy
```

Or use the button:

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/)

**Custom Domain**: Add via Cloudflare Dashboard > Workers > Your Worker > Triggers > Custom Domain.

**Migrations**: Automatic Durable Object migrations handle ChatAgent/AppController.

## 🔍 Troubleshooting

- **AI Gateway errors**: Verify `CF_AI_BASE_URL` format and token permissions
- **CORS issues**: All `/api/*` routes include CORS middleware
- **Worker types**: Run `bun cf-typegen` after `wrangler pull`
- **Sessions missing**: Check Durable Objects namespace bindings

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Make changes
4. `bun lint`
5. Test locally: `bun dev`
6. Submit PR

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare developers. Questions? [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)