# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS learning project demonstrating various framework patterns including controllers, services, custom decorators, and request/response handling. The project is written in TypeScript and uses Express as the HTTP adapter.

## Commands

### Development
- `pnpm run start:dev` - Start with hot-reload for development
- `pnpm run start:debug` - Start with debugging enabled and file watching
- `pnpm run start:prod` - Run production build from `dist/main`

### Building & Code Quality
- `pnpm run build` - Compile TypeScript (outputs to `dist/`, auto-deletes old build)
- `pnpm run format` - Format code with Prettier
- `pnpm run lint` - Run ESLint with auto-fix

### Testing
- `pnpm run test` - Run unit tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:cov` - Run tests with coverage (outputs to `coverage/`)
- `pnpm run test:e2e` - Run end-to-end tests (uses config at `test/jest-e2e.json`)

Note: This project uses **pnpm** as the package manager (evidenced by `pnpm-lock.yaml`).

## Architecture

### Module Structure
- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root module
- `src/app.controller.ts` - Main controller with demo endpoints
- `src/app.service.ts` - Business logic service
- `src/param-decorators/` - Custom parameter decorators

### Custom Decorators

The project includes a custom `@User()` parameter decorator at [src/param-decorators/user.decorator.ts](src/param-decorators/user.decorator.ts). It:
- Uses `createParamDecorator` from NestJS
- Accepts an optional `data` string parameter to extract specific user properties
- Expects `request.user` to contain user information
- Returns the full user object when called without arguments, or a specific property when called with a string key

Example usage:
```typescript
@User() user: UserEntity        // Returns full user object
@User('firstName') firstName    // Returns user.firstName only
```

### Response Handling Patterns

The controller demonstrates two response handling approaches:

1. **Standard NestJS** (platform-agnostic): Return values directly, NestJS handles response serialization
2. **Express-specific** (using `@Res()`): Manual control over response for custom headers or streaming

When using `@Res({ passthrough: true })`, you can modify the response (headers, status) while still letting NestJS handle the final send. Without `passthrough`, you must manually call `response.send()` or `response.json()`, otherwise the request will hang.

### Built-in Decorators Used

- `@Req()` / `@Res()` - Inject Express Request/Response objects
- `@Ip()` - Extract client IP address
- `@Get()` - Define GET route handlers

## Code Style

- **Prettier**: Single quotes, trailing commas everywhere
- **Comments**: Code includes Chinese comments explaining concepts (learning project)
- **ESLint**: Allows `any` types, warns on unsafe operations
- **TypeScript**: Target ES2023, NodeNext modules, partial strict mode
