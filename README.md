# TypeUp Parser

Event-based parser for TypeUp documents with comprehensive TypeScript support.

## Overview

The TypeUp Parser provides a simple, event-based API for parsing TypeUp documents into the TypeUp DOM structure. It handles all TypeUp syntax including blocks, inlines, and nested structures with proper error handling and location tracking.

## Installation

```bash
npm install @typeup/parser
```

## Usage

```typescript
import { parser } from "@typeup/parser"

// Parse TypeUp content
const document = parser.parse(content, source)

// Use with event handlers
const handler = new MyEventHandler()
parser.parse(content, source, handler)
```

## Features

- **Event-based Architecture**: Flexible parsing with customizable event handlers
- **Complete TypeUp Support**: Handles all TypeUp block and inline elements
- **TypeScript Support**: Comprehensive type definitions and type safety
- **Error Handling**: Detailed error reporting with source location tracking
- **Performance**: Optimized for parsing large documents
- **Modern Tooling**: Built with modern development practices and tooling

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run fix

# Run full verification
npm run verify
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.