# 💬 Forum API

A forum application built with **TypeScript**, following the principles of **Domain-Driven Design (DDD)**.

## 🚀 Technologies

- **TypeScript** - Main language with static typing
- **Vitest** - Testing framework
- **ESLint** - Linting with Rocketseat configuration
- **Day.js** - Date manipulation library
- **@faker-js/faker** - Test data generation

## 📁 Project Structure

```text
src/
├── core/                      # Core concepts layer
│   ├── entities/              # Base entities (Entity, AggregateRoot, WatchedList)
│   ├── errors/                # Custom errors
│   ├── events/                # Domain Events system
│   ├── repositories/          # Base repository interfaces
│   └── types/                 # Utility types (Optional, Either)
├── domain/                    # Domain layer
│   ├── forum/                 # Forum domain
│   │   ├── application/       # Use cases and repositories
│   │   └── enterprise/        # Forum entities and domain events
│   └── notification/          # Notification domain

test/
├── factories/                 # Test data factories
├── repositories/              # In-memory repositories for testing
└── utils/                     # Test utilities
```

## 🏗️ Architecture

The project follows a **rich domain architecture** based on Domain-Driven Design.

### Core Concepts

- **Entity** - Base entity with a unique identifier and equality comparison
- **AggregateRoot** - Aggregate root with support for Domain Events
- **WatchedList** - Observable collection that tracks additions, removals, and updates
- **Either** - Functional monad for error handling
- **Domain Events** - Decoupled domain event system

### Forum Domain

The forum domain includes:

- **Questions** - Questions with attachments and comments
- **Answers** - Answers with comments
- **Attachments** - Attachments for questions and answers
- **Comments** - Comments on questions and answers

### Use Cases

- `create-question` - Create a new question
- `answer-question` - Answer a question
- `comment-on-question` - Comment on a question
- `comment-on-answer` - Comment on an answer
- `delete-question` - Delete a question
- `delete-answer` - Delete an answer
- `edit-answer` - Edit an answer
- `choose-question-best-answer` - Select the best answer

## 🧪 Testing

The project uses **Vitest** with in-memory repositories for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔧 Available Scripts

```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
npm run lint        # Run ESLint
npm run lint:fix    # Run ESLint with automatic fixes
```

## 📝 Key Concepts

### Aggregate

An **aggregate** is a group of related entities that work together and are treated as a single consistency boundary.

In the forum domain:

- `Question → Attachments[]`
- `Question → Answers[]`
- `Answer → AnswerComments[]`

### Watched List

A specialized collection that tracks changes to its items:

- Item added
- Item removed
- Item updated

This is especially useful when editing aggregates, allowing the application to determine exactly what changed.

### Domain Events

Events raised within the domain that can be observed by other components.

Benefits include:

- Loose coupling between components
- Asynchronous communication
- Easier implementation of side effects

## 🛠️ Development

The project uses a strict TypeScript configuration, including:

- Strict mode enabled
- Path aliases (`@/*` → `./src/*`)
- ES2023 target
- CommonJS modules

## 📄 License

ISC
