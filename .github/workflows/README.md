# GitHub Actions Workflows

This repository uses a comprehensive set of GitHub Actions workflows for continuous integration, automated releases, and package publishing.

## Workflows Overview

### 🔍 CI Pipeline (`ci.yml`)

**Triggers:** Pull requests and pushes to main/master branches

**Features:**

- **Smart Change Detection**: Only runs relevant jobs based on file changes
- **Matrix Testing**: Tests across multiple Node.js versions (18, 20, 22)
- **Parallel Jobs**: Runs lint, test, build, coverage, and audit in parallel
- **Type Checking**: Validates both CJS and MJS TypeScript configurations
- **Dependency Review**: Automatically reviews dependency changes in PRs
- **Coverage Upload**: Uploads test coverage to Codecov

**Jobs:**

1. `changes` - Detects which files changed
2. `quality` - Runs code quality checks (lint, test, build, coverage, audit)
3. `compatibility` - Tests Node.js version compatibility
4. `type-check` - TypeScript compilation checks
5. `dependency-review` - Reviews new dependencies
6. `status-check` - Aggregates all job results

### 🚀 Release Pipeline (`release.yml` → `publish.yml`)

**Triggers:**

- Automatic: Pushes to master branch
- Manual: Workflow dispatch with version type selection

**Features:**

- **Semantic Versioning**: Auto-detects version bump based on commit messages
- **Changelog Generation**: Automatically updates CHANGELOG.md
- **GitHub Releases**: Creates GitHub releases with release notes
- **Pre-release Support**: Handles alpha/beta/rc versions

**Version Detection Rules:**

- `BREAKING CHANGE` or `!:` in commits → Major version
- `feat:` in commits → Minor version
- Default → Patch version

### 📦 Publish Pipeline (`publish.yml`)

**Triggers:** Git tags starting with `v*` or GitHub releases

**Features:**

- **Environment Protection**: Uses npm-publish environment for security
- **Dry Run Validation**: Tests publishing before actual publish
- **Duplicate Check**: Prevents republishing existing versions
- **Pre-release Tagging**: Correctly tags alpha/beta releases
- **Documentation Updates**: Generates and deploys docs for stable releases

### 🔄 Dependency Updates (`deps.yml`)

**Triggers:**

- Weekly schedule (Mondays)
- Manual trigger

**Features:**

- **Automated Updates**: Updates all dependencies
- **Security Fixes**: Applies npm audit fixes
- **PR Creation**: Creates pull requests for review
- **Test Validation**: Ensures updates don't break tests

### 🌙 Nightly Tests (`nightly.yml`)

**Triggers:**

- Daily at 2 AM UTC
- Manual trigger

**Features:**

- **Cross-Platform Testing**: Tests on Ubuntu, Windows, macOS
- **Extended Coverage**: Full test suite with coverage reporting
- **Performance Benchmarks**: Tracks performance over time
- **Security Scanning**: Vulnerability scanning with Trivy

## Setup Requirements

### Repository Secrets

Add these secrets in GitHub repository settings:

```
CODECOV_TOKEN     - Codecov upload token (optional)
```

### Repository Settings

1. **Environments**: Create `npm-publish` environment for publish protection
2. **Branch Protection**: Enable required status checks on main/master
3. **Actions Permissions**: Allow GitHub Actions to create releases and push tags

### NPM Setup

1. Create NPM account and organization
2. Configure npm trusted publishing for this repository
3. Grant publish permission through npm package settings

## Usage Examples

### Manual Release

```bash
# Trigger manual release with specific version type
gh workflow run release.yml -f version-type=minor
```

### Emergency Publish

```bash
# Push tag to trigger immediate publish
git tag v1.2.3
git push origin v1.2.3
```

### Dependency Updates

```bash
# Trigger dependency update check
gh workflow run deps.yml
```

## Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) for automatic version detection:

```bash
# Patch version (1.0.0 → 1.0.1)
fix: resolve parser error in EmptyLine

# Minor version (1.0.0 → 1.1.0)
feat: add new Table component

# Major version (1.0.0 → 2.0.0)
feat!: remove deprecated Block interface
BREAKING CHANGE: Block interface removed

# Pre-release
feat: add experimental features (1.0.0 → 1.1.0-alpha.1)
```

## Monitoring

- **Actions Tab**: View workflow runs and logs
- **Releases**: Track published versions
- **Security Tab**: Review vulnerability scans
- **Insights**: Analyze dependency updates and security alerts

## Best Practices

1. **Always use semantic commit messages** for automatic versioning
2. **Review dependency update PRs** before merging
3. **Monitor nightly test results** for early issue detection
4. **Use draft releases** for pre-release testing
5. **Enable branch protection** to require CI passes before merge

## Troubleshooting

### Failed Publishes

- Check NPM_TOKEN validity
- Verify version isn't already published
- Review package.json configuration

### CI Failures

- Check Node.js version compatibility
- Review dependency conflicts
- Validate TypeScript configuration

### Version Bumps Not Working

- Verify commit message format
- Check branch protection settings
- Ensure GITHUB_TOKEN permissions
