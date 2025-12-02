# Changelog
## [1.2.1] - 2025-12-02

## [1.2.0] - 2025-11-28

## [1.1.0] - 2025-11-25

## [1.0.2] - 2025-11-25

## [1.0.1] - 2025-11-25


## [1.0.0] - 2024-11-24

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive GitHub Actions workflows for CI/CD
- Automated version bumping and publishing
- Multi-platform and multi-version Node.js testing

### Changed

- Updated package.json scripts for better development workflow
- Improved test coverage and type checking

## [1.0.0] - 2024-11-24

### Added

- Initial stable release of TypeUp Parser library
- Event-based parsing API for TypeUp documents
- Complete TypeScript support with comprehensive type definitions
- Modern build system using Vite and Vitest
- ESLint configuration with TypeScript support

### Changed

- **BREAKING:** Migrated from Jest to Vitest for testing
- **BREAKING:** Replaced `@cogneco/mend` with `mendly`
- **BREAKING:** Updated to `@typeup/dom` v1.0.0
- Modernized development dependencies and tooling
- Updated TypeScript configuration for modern standards
- Improved project structure and documentation

### Features

- TypeUp document parsing with event-based API
- Support for all TypeUp block and inline elements
- Type-safe parser implementation
- Comprehensive test suite with coverage reporting
- Modern development workflow with linting and formatting

### Migration Guide

For users upgrading from v0.x:

1. Update import statements:
   - Replace `@cogneco/mend` imports with `mendly`
   - Update `@typeup/dom` usage according to v1.0.0 API

2. Development setup:
   - Run `npm install` to get updated dependencies
   - Use `npm test` instead of Jest directly
   - Use `npm run verify` for full project validation

3. API Changes:
   - Parser API remains stable, but underlying dependencies have changed
   - Check TypeUp DOM v1.0.0 changelog for any breaking changes in DOM usage