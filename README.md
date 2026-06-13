# X7 AI Platform

> **The Future of Artificial Intelligence**
>
> One Platform. Unlimited AI Power.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

**X7 AI Platform** is a comprehensive, all-in-one artificial intelligence platform that brings together the world's most powerful AI models and tools into a single, unified interface. Built with cutting-edge technology and designed with a futuristic cyberpunk aesthetic, X7 AI empowers developers, creators, and businesses to harness the full potential of AI.

### Key Features

- **AI Chatbot** — Chat with GPT-5, Claude 4, Gemini 2.0, DeepSeek V3, and Grok 2 with streaming responses
- **AI Image Generator** — Create stunning visuals with text-to-image, image-to-image, background removal, upscaling, and face swap
- **AI Coding Assistant** — Generate, debug, explain, and refactor code in 15+ programming languages
- **AI Document Analyzer** — Upload PDF, DOCX, PPTX, XLSX and get summaries, translations, data extraction, and Q&A
- **AI Voice Assistant** — Speech-to-text, text-to-speech, voice cloning, and AI call assistant in 50+ languages
- **AI Agent System** — Deploy autonomous agents for marketing, trading, research, coding, and customer service
- **AI Marketplace** — Buy and sell prompts, agents, tools, and templates
- **AI Automation** — Build workflows with IF-THEN logic, integrate Gmail, Telegram, Slack, and more
- **AI API Platform** — Access Chat, Image, OCR, Voice, and Embedding APIs with analytics and rate limiting
- **Admin Panel** — Complete user management, analytics, and platform monitoring

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript 5.7, TailwindCSS 4 |
| **UI Components** | Radix UI, Framer Motion, Lucide React |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | PostgreSQL 16, Prisma ORM |
| **Cache** | Redis (ioredis) |
| **Auth** | NextAuth.js v5 (OAuth + Credentials) |
| **AI APIs** | OpenAI, Anthropic, Google Gemini, DeepSeek, xAI |
| **Payments** | Stripe |
| **Real-time** | Server-Sent Events (SSE), WebSocket |
| **Deployment** | Vercel, Docker |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- API keys for AI providers

### Installation

```bash
# Clone the repository
git clone https://github.com/r1k0x7/x7-ai-platform.git
cd x7-ai-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/x7_ai_platform"
DIRECT_URL="postgresql://user:password@localhost:5432/x7_ai_platform"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# AI APIs
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_AI_API_KEY=""
DEEPSEEK_API_KEY=""
GROK_API_KEY=""

# Payments
STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY=""

# Security
ENCRYPTION_KEY=""
JWT_SECRET=""
```

---

## API Documentation

### Authentication

All API endpoints (except auth) require a valid session cookie or API key.

```http
Authorization: Bearer <api-key>
```

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send chat message |
| `/api/chat/stream` | POST | Streaming chat (SSE) |
| `/api/image/generate` | POST | Generate image |
| `/api/code/generate` | POST | Generate code |
| `/api/voice/stt` | POST | Speech to text |
| `/api/voice/tts` | POST | Text to speech |
| `/api/pdf/analyze` | POST | Analyze document |
| `/api/automation/run` | POST | Run automation |
| `/api/agents/run` | POST | Run AI agent |
| `/api/marketplace` | GET/POST | Marketplace items |
| `/api/api-keys` | GET/POST/DELETE | API key management |
| `/api/usage` | GET | Usage statistics |
| `/api/billing` | GET | Billing information |

### Admin Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/users` | GET/PATCH | User management |
| `/api/admin/stats` | GET | Platform analytics |

---

## Project Structure

```
x7-ai-platform/
├── prisma/                  # Database schema
│   └── schema.prisma
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API Routes
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── image/
│   │   │   ├── code/
│   │   │   ├── voice/
│   │   │   ├── pdf/
│   │   │   ├── automation/
│   │   │   ├── agents/
│   │   │   ├── marketplace/
│   │   │   ├── api-keys/
│   │   │   ├── usage/
│   │   │   ├── billing/
│   │   │   ├── admin/
│   │   │   └── webhooks/
│   │   ├── app/             # Dashboard pages
│   │   │   ├── dashboard/
│   │   │   ├── chat/
│   │   │   └── layout.tsx
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── landing/         # Landing page sections
│   │   ├── dashboard/       # Dashboard components
│   │   ├── shared/          # Shared providers
│   │   └── ui/              # UI components
│   ├── lib/                 # Core libraries
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── redis.ts         # Redis client
│   │   ├── ai-router.ts     # AI model routing
│   │   └── utils.ts         # Utilities
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── public/                  # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

---

## Features in Detail

### AI Chatbot
- Multi-model support (GPT-5, Claude 4, Gemini 2.0, DeepSeek V3, Grok 2)
- Real-time streaming responses
- Markdown and code syntax highlighting
- Multi-chat with folder organization
- Chat history and prompt library
- Export to PDF, Word, Markdown

### AI Image Generator
- Text-to-image and image-to-image
- Background removal and upscaling
- Face swap and AI avatar generation
- Style presets: Realistic, Anime, Cyberpunk, Pixar, 3D, Fantasy

### AI Coding Assistant
- Code generation, debugging, explanation, refactoring
- Language conversion
- Full project scaffolding
- Support for 15+ languages

### AI Document Analyzer
- PDF, DOCX, PPTX, XLSX support
- Summarization, translation, data extraction
- Question answering and OCR
- AI-powered search

### AI Voice Assistant
- Speech-to-text (Whisper)
- Text-to-speech (6 voices)
- Voice cloning
- AI call assistant
- 50+ language support

### AI Agent System
- Marketing, Trading, Research, Coding, Customer Service agents
- Multi-agent collaboration
- Autonomous and scheduled tasks
- Visual workflow builder

### AI Automation
- Zapier-like workflow builder
- Integrations: Gmail, Telegram, WhatsApp, Discord, Slack, Notion, Google Drive
- IF-THEN logic with AI processing

---

## Monetization

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 20 chats/day, 5 images/day, basic models |
| **Pro** | $29/mo | Unlimited chats & images, all models, priority speed |
| **Enterprise** | Custom | Custom AI, team workspace, full API, dedicated support |

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Plugin system for custom AI models
- [ ] Advanced analytics dashboard
- [ ] White-label solution
- [ ] On-premise deployment
- [ ] Multi-tenant architecture
- [ ] Advanced team collaboration
- [ ] Custom AI model training

---

## Support

- **Documentation**: [https://docs.x7ai.com](https://docs.x7ai.com)
- **Discord**: [https://discord.gg/x7ai](https://discord.gg/x7ai)
- **Email**: support@x7ai.com
- **Twitter**: [@x7ai](https://twitter.com/x7ai)

---

## Acknowledgments

- [OpenAI](https://openai.com) for GPT models
- [Anthropic](https://anthropic.com) for Claude models
- [Google](https://ai.google) for Gemini models
- [DeepSeek](https://deepseek.ai) for DeepSeek models
- [xAI](https://x.ai) for Grok models
- [Vercel](https://vercel.com) for hosting and Next.js
- [Prisma](https://prisma.io) for database ORM

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by r1k0x7**

[Website](https://x7ai.com) · [GitHub](https://github.com/r1k0x7) · [Twitter](https://twitter.com/r1k0x7)

</div>
