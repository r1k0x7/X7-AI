# Contributing to X7 AI Platform

Thank you for your interest in contributing to X7 AI Platform! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/x7-ai-platform.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -m "feat: add your feature"`
6. Push: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Code style (formatting)
- `refactor:` — Code refactoring
- `perf:` — Performance improvement
- `test:` — Tests
- `chore:` — Build process or auxiliary tool changes

## Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured
- TailwindCSS for styling
- Component-based architecture

## Testing

```bash
npm test
npm run test:watch
```

## Questions?

Open an issue or join our [Discord](https://discord.gg/x7ai).
