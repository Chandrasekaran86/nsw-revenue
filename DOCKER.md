# Playwright Docker Setup

This Docker setup provides a containerized environment for running Playwright tests with persistent storage for tests and reports.

## Features

- **Base Image**: `mcr.microsoft.com/playwright:v1.58.2-noble`
- **Playwright MCP**: Automatically installed for enhanced testing capabilities
- **Persistent Storage**: Test files, reports, and browser cache are persisted across container restarts
- **Security**: Runs as non-root user
- **Health Checks**: Container health monitoring

## Prerequisites

- Docker and Docker Compose installed
- npm dependencies installed locally: `npm ci`

## Quick Start

### Using Docker Compose (Recommended)

Run tests with persistent storage:

```bash
docker-compose up
```

### Using Docker CLI

Build the image:

```bash
docker build -t nsw-revenue-playwright:latest .
```

Run tests:

```bash
docker run --rm \
  -v $(pwd)/tests:/app/tests \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  nsw-revenue-playwright:latest
```

## Persistent Storage

The setup includes persistent storage for:

- **`/app/tests`** - Test files
- **`/app/pageobjects`** - Page object classes
- **`/app/fixtures`** - Test fixtures
- **`/app/test-results`** - JSON test results
- **`/app/reports`** - Generated reports
- **`/app/playwright-report`** - HTML report
- **`playwright-cache`** - Playwright configuration cache
- **`playwright-browsers`** - Browser cache

## Docker Compose Commands

### Run all tests

```bash
docker-compose up
```

### Run specific test file

```bash
docker-compose run --rm playwright-tests tests/check-motor-vehicle-stamp-duty.spec.ts
```

### Run with headed browser

```bash
docker-compose run --rm -e HEADED=true playwright-tests --headed
```

### View logs

```bash
docker-compose logs -f playwright-tests
```

### Stop containers

```bash
docker-compose down
```

### Remove volumes (WARNING: Deletes persistent data)

```bash
docker-compose down -v
```

## Dockerfile Details

### Base Image
- **Image**: `mcr.microsoft.com/playwright:v1.58.2-noble`
- **Includes**: Node.js, npm, Playwright browsers pre-installed

### Installed Components
- **Playwright MCP**: `npx -y @playwright/mcp@latest`
- **Playwright Browsers**: Latest versions with dependencies
- **System Tools**: curl, git

### Security
- Non-root user (`playwright`) for container execution
- User ID: 1000

### Resource Limits (via Docker Compose)
- **CPU Limit**: 2 cores
- **Memory Limit**: 2GB
- **CPU Reservation**: 1 core
- **Memory Reservation**: 1GB

## Accessing Reports

After test execution, reports are available at:

- **HTML Report**: `./playwright-report/index.html`
- **JSON Results**: `./test-results/`)
- **Test Logs**: Docker container logs

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` | `false` | Auto-download browsers |

To override, use:

```bash
docker-compose run --rm -e NODE_ENV=development playwright-tests
```

## Troubleshooting

### Container fails to start
- Check Docker daemon is running
- Verify sufficient disk space
- Review logs: `docker-compose logs`

### Tests timeout
- Increase memory allocation in `docker-compose.yml`
- Increase timeout in Playwright config

### Browser crashes
- Ensure container has sufficient resources
- Check browser installation: `docker-compose run --rm playwright-tests npx playwright install`

### Permission denied errors
- Ensure volumes have proper permissions
- Run with elevated permissions if needed

## CI/CD Integration

For GitHub Actions, use the container in workflow:

```yaml
container:
  image: nsw-revenue-playwright:latest
```

Or build and use the image as part of your pipeline.

## Cleanup

Remove old images and containers:

```bash
docker-compose down --rmi all
```

This will remove all containers and images associated with the Playwright setup.
