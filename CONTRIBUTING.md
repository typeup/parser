# Contributing to `TypeUp Parser`

This document outlines the coding standards and guidelines for contributing to the TypeUp Parser project.

## Project Overview

`TypeUp.parser` is a TypeScript library providing an event-based parser for TypeUp documents. The project follows strict coding conventions to maintain consistency and quality.

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Run tests:

```bash
npm test
```

4. Run tests in watch mode:

```bash
npm run test:watch
```

5. Run full verification:

```bash
npm run verify
```

## Coding Standards

### TypeScript & Types

1. All code must be written in TypeScript
2. Always provide type definitions with the following pattern for exported types:
   - Define the type/interface
   - Create a namespace with the same name
   - Provide `type`, `is` and `flawed` definitions inside the namespace

Example:

```typescript
export type MyType = {
	// type definition
}

export namespace MyType {
	export const { type, is, flawed } = isly
		.object<MyType>({
			// type definition
		})
		.rename("isly.MyType")
		.bind()
}
```

### Code Structure

1. Functions should have single return points
2. Use `result` as the variable name for function return values
3. Prefer fewer lines of code over shorter lines
4. Prefer expressions over statements
5. Avoid unnecessary braces
6. Use strict equality (`===` and `!==`) only when necessary
7. Rely on TypeScript's type system for type checking

### File Length Recommendations

1. Implementation files:

   - Aim to keep files under 200 lines of code
   - Files containing primarily data structures (e.g., country codes, encodings) may be longer
   - Split large files into focused modules when they exceed 300 lines
   - Each file should have a single core responsibility

2. Test files:

   - Keep individual test cases focused and concise
   - Use `it.each` to reduce code duplication
   - Test files may be longer than implementation files due to comprehensive test cases
   - Consider splitting test files if they exceed 400 lines

3. File organization:
   - Group related functionality in subdirectories
   - Use index files to re-export functionality
   - Keep directory structures shallow (max 3 levels deep)

### Naming Conventions

1. No abbreviations except:

   - "UI" (uppercase because it's a two-letter multi-word abbreviation)
   - "Id" (regular casing)
   - "max"
   - "min"

2. When using abbreviations:

   - Multi-word abbreviations of 1-2 letters stay uppercase (e.g., "UI")
   - All other abbreviations follow normal casing rules regardless of word count:
     - In PascalCase: "Id", "Utf", "Iso", etc.
     - In camelCase: "id", "utf", "iso", etc.

3. Prefer single word identifiers

4. Single letter identifiers only allowed if usage is within 3 lines

5. Use descriptive and clear names for variables and functions

### Testing

1. Always import from the package's index file:

   ```typescript
   import { parser } from "../index"
   ```

2. Prefer using `it.each` for test cases with similar patterns:

   ```typescript
   it.each([
   	["input1", expected1],
   	["input2", expected2],
   ])("test description %s", (input, expected) => {
   	expect(someFunction(input)).toBe(expected)
   })
   ```

3. Keep test descriptions short and focused
4. Test file names should match the implementation file with `.spec.ts` extension
5. Each test file should have one top-level `describe` block

### Code Formatting

The project uses ESLint and Prettier with the following configuration:

1. Print width: 120 characters
2. Use tabs for indentation
3. No semicolons
4. Double quotes for strings
5. LF line endings

### Import Order

1. Import order is enforced by eslint-plugin-simple-import-sort
2. Imports are grouped in the following order:
   - Core/framework imports
   - External packages
   - Internal modules
   - Relative imports

## Pull Request Process

1. Create a branch for your feature/fix
2. Ensure code passes all tests: `npm test`
3. Ensure code passes linting: `npm run lint`
4. Run the verification script: `npm run verify`
5. Update documentation as needed
6. Create a pull request with a clear description

## Development Workflow

1. Run tests in watch mode during development:

   ```bash
   npm run test:watch
   ```

2. Use the coverage command to check test coverage:

   ```bash
   npm run coverage
   ```

   Coverage thresholds are set to 90% for:

   - Statements
   - Functions
   - Lines

   And 85% for:

   - Branches

3. Fix linting issues:
   ```bash
   npm run fix
   ```

## Parser-Specific Guidelines

1. **Event-based Architecture**: The parser uses an event-based API. Ensure all new parsing logic follows this pattern.

2. **Error Handling**: Use `mendly.Error.Region` for proper error location tracking.

3. **Performance**: Be mindful of parsing performance, especially for large documents.

4. **Backward Compatibility**: Consider backward compatibility when making API changes.

5. **DOM Integration**: Ensure proper integration with `@typeup/dom` for element creation and manipulation.