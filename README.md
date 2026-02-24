# NestJS Get Started

A NestJS learning project demonstrating essential framework patterns including controllers, services, custom decorators, and request/response handling.

## Introduction

This project serves as a practical introduction to NestJS, showcasing various core concepts and patterns used in building scalable server-side applications. It demonstrates how to work with controllers, services, custom parameter decorators, and different response handling strategies.

## Features

- **Controllers & Services**: Clean separation of concerns with NestJS dependency injection
- **Custom Parameter Decorators**: Implementation of a `@User()` decorator for extracting user information
- **Request/Response Handling**: Both platform-agnostic and Express-specific patterns
- **Built-in Decorators**: Usage of `@Req()`, `@Res()`, `@Ip()` and more
- **Testing Setup**: Unit tests with Jest and end-to-end tests with Supertest

## Prerequisites

- Node.js (v22+ recommended)
- pnpm package manager

## Installation

```bash
pnpm install
```

## Running the App

```bash
# Development mode with hot-reload
pnpm run start:dev

# Production mode
pnpm run build
pnpm run start:prod
```

The application will start on `http://localhost:3000` by default.

## Available Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Returns "Hello World!" |
| GET | `/log-response` | Demonstrates manual response handling with custom headers |
| GET | `/log-req` | Returns User-Agent header from request |
| GET | `/log-ip` | Returns client IP address |
| GET | `/log-user` | Demonstrates custom `@User()` decorator (returns full user object) |
| GET | `/log-user-detail` | Demonstrates extracting specific user property with `@User('firstName')` |

## Development

```bash
# Build the project
pnpm run build

# Run linting
pnpm run lint

# Format code
pnpm run format
```

## Testing

```bash
# Run unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:cov

# Run end-to-end tests
pnpm run test:e2e
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Main controller with demo endpoints
├── app.service.ts          # Business logic service
├── app.controller.spec.ts  # Unit tests
└── param-decorators/
    └── user.decorator.ts   # Custom @User() decorator
```

## Key Concepts Demonstrated

### Custom Parameter Decorator

The `@User()` decorator ([src/param-decorators/user.decorator.ts](src/param-decorators/user.decorator.ts)) shows how to create reusable parameter decorators:

```typescript
@User() user: UserEntity           // Returns full user object
@User('firstName') firstName: string  // Returns specific property
```

### Response Handling Strategies

1. **Standard NestJS** (platform-agnostic): Return values directly
2. **Express-specific**: Use `@Res({ passthrough: true })` for manual control while maintaining NestJS features

```typescript
@Get('log-response')
testPureResponse(@Res({ passthrough: true }) response: Response): void {
  response.setHeader('X-Custom-Header', 'CustomValue');
  response.status(200).send('ok!');
}
```

## License

UNLICENSED
