# Cadence

**Ambient AI that protects flow state**

Cadence is an experimental interface exploring how AI can assist creative work without interrupting cognitive flow. Instead of traditional chat-based interactions that demand immediate context, Cadence observes natural pause points (~10 seconds) and offers brief, contextual suggestions that users can ignore or engage with seamlessly.

_This project represents my exploration into React development, combining UX research insights with modern web technologies to solve real problems in creative workflows._

Created by [Evan Dunkel](https://evandunkel.com/cadence)

## Technical Stack

- **React** + **TypeScript** + **Vite** for rapid development
- **Tailwind CSS** for styling
- **Framer Motion** for animations (following flow-state preserving animation principles)
- **BERTopic** for topic segmentation and contextual suggestions

## Future Concept Development

### Natural Pause Detection

- 10-second heuristic for detecting writing pauses
- Topic transition analysis using BERTopic
- Non-intrusive suggestion timing

### Ambient Interface

- Minimal UI that stays out of the way
- Contextual suggestions appear without breaking focus
- One-click expansion for deeper assistance

### Research Integration

- Pull content from external sources (Reminders, notes)
- Manual search tuning capabilities
- Idea staging and combination workflows

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Animation Guidelines

Following principles for maintaining flow state:

- Animations default to 0.2-0.3s duration
- Use `ease-out` for entering elements
- Respect `prefers-reduced-motion` for accessibility
- Hardware-accelerated transforms for smooth interactions

## Project Structure

```
src/
├── components/        # UI components
│   ├── Bubble.tsx    # Suggestion bubble interface
│   ├── Caret.tsx     # Text cursor indicators
│   └── ui/           # Shared UI components
├── lib/              # Utilities and helpers
└── main.tsx          # Application entry point
```

## Core Principles

1. **Respect cognitive flow** - Wait for natural pauses
2. **Suggest, don't interrupt** - Passive suggestions over active interruptions
3. **Match user pace** - Adapt to individual working rhythms

---

_Learn more at [evandunkel.com/cadence](https://evandunkel.com/cadence)_
