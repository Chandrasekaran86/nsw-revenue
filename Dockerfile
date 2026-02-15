# Use Microsoft's Playwright image
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=false \
    PATH="/app/node_modules/.bin:$PATH"

# Install system dependencies and Node.js (if needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (comes with the image, but ensure npm is updated)
RUN npm install -g npm@latest

# Copy package files (required)
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Install Playwright MCP
RUN npx -y @playwright/mcp@latest

# Install Playwright browsers
RUN npx playwright install --with-deps

# Create directories for persistent storage and test files
RUN mkdir -p /app/tests \
    && mkdir -p /app/reports \
    && mkdir -p /app/test-results \
    && mkdir -p /app/.playwright \
    && mkdir -p /app/pageobjects \
    && mkdir -p /app/fixtures \
    && mkdir -p /app/healer-output

# Copy production files
COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

# Create a non-root user for security (use a different UID if 1000 exists)
RUN useradd -m -u 2000 -s /bin/bash playwright || \
    (id -u playwright > /dev/null 2>&1 && echo "playwright user already exists") || \
    useradd -m -s /bin/bash playwright

# Set proper permissions
RUN chown -R playwright:playwright /app || true

# Switch to non-root user
USER playwright

# Use custom entrypoint script that includes test healer
ENTRYPOINT ["./docker-entrypoint.sh"]

# Default test file argument (can be overridden)
CMD ["tests/check-motor-vehicle-stamp-duty.spec.ts"]
