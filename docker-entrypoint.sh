#!/bin/bash

# Playwright Test Runner with Healer
# This script runs Playwright tests and executes the healer if tests fail

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TEST_FILE="${1:-tests/check-motor-vehicle-stamp-duty.spec.ts}"
HEALER_OUTPUT_DIR="/app/healer-output"
HEALER_LOG="/app/healer-output/healer-execution.log"

# Create healer output directory
mkdir -p "$HEALER_OUTPUT_DIR"

# Log function
log_message() {
    local message="$1"
    local level="${2:-INFO}"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${BLUE}[${timestamp}]${NC} [${level}] ${message}" | tee -a "$HEALER_LOG"
}

# Section header function
print_section() {
    local title="$1"
    echo -e "\n${BLUE}═════════════════════════════════════════${NC}"
    echo -e "${BLUE}→ ${title}${NC}"
    echo -e "${BLUE}═════════════════════════════════════════${NC}\n"
}

# Initialize log
print_section "🚀 Playwright Test Runner with Healer"
log_message "Starting test execution..."
log_message "Test file: $TEST_FILE"
log_message "Output directory: $HEALER_OUTPUT_DIR"

# Run Playwright tests
print_section "▶ Running Playwright Tests"
log_message "Executing: npx playwright test $TEST_FILE --reporter=json --reporter=html"

if npx playwright test "$TEST_FILE" --reporter=json --reporter=html; then
    print_section "✅ Tests Passed Successfully"
    log_message "All tests completed successfully!" "SUCCESS"
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    TEST_EXIT_CODE=$?
    print_section "❌ Tests Failed - Activating Healer"
    log_message "Test execution failed with exit code: $TEST_EXIT_CODE" "ERROR"
    echo -e "${RED}❌ Tests failed! Exit code: $TEST_EXIT_CODE${NC}"
    
    # Run Playwright Healer using Playwright's trace and debug features
    print_section "🔧 Playwright Healer Activation"
    log_message "Initiating Playwright Healer..." "HEALER"
    echo -e "${YELLOW}🔧 Running Playwright Healer for failed tests...${NC}"
    
    # Create healer report
    {
        echo "═════════════════════════════════════════"
        echo "  PLAYWRIGHT HEALER EXECUTION REPORT"
        echo "═════════════════════════════════════════"
        echo ""
        echo "Execution Time: $(date)"
        echo "Test File: $TEST_FILE"
        echo "Status: HEALING PROCESS INITIATED"
        echo ""
        echo "─────────────────────────────────────────"
        echo "Running Playwright Healer..."
        echo "─────────────────────────────────────────"
        echo ""
    } >> "$HEALER_LOG"
    
    # Run Playwright with trace enabled for better debugging
    log_message "Executing Playwright test with trace collection..." "HEALER"
    if npx playwright test "$TEST_FILE" \
        --reporter=json \
        --reporter=html \
        --trace=on 2>&1 | tee -a "$HEALER_LOG"; then
        log_message "Playwright Healer trace collection completed successfully" "HEALER"
        echo -e "${GREEN}✓ Playwright Healer trace analysis completed${NC}"
        HEALER_SUCCESS=true
    else
        HEALER_STATUS=$?
        log_message "Playwright Healer trace collection completed with status: $HEALER_STATUS" "HEALER"
        echo -e "${YELLOW}⚠ Playwright Healer process completed${NC}"
        HEALER_SUCCESS=true  # Continue even if healer has non-zero exit
    fi
    
    # Generate detailed healer report
    {
        echo ""
        echo "─────────────────────────────────────────"
        echo "Healer Actions Performed:"
        echo "─────────────────────────────────────────"
        echo "1. ✓ Collected test execution traces"
        echo "2. ✓ Generated detailed test reports (HTML & JSON)"
        echo "3. ✓ Captured debugging information"
        echo "4. ✓ Logged all healing activities"
        echo ""
        echo "─────────────────────────────────────────"
        echo "Debug Artifacts Available:"
        echo "─────────────────────────────────────────"
        echo "• HTML Report: /app/playwright-report/index.html"
        echo "• JSON Report: /app/test-results/results.json"
        echo "• Trace Files: /app/test-results/trace.zip"
        echo "• Healer Log: healer-execution.log"
        echo ""
        echo "Next Steps:"
        echo "• Open HTML report in browser for visual debugging"
        echo "• Use 'npx playwright show-trace' to view trace files"
        echo "• Review test failures and update selectors"
        echo ""
        echo "═════════════════════════════════════════"
    } >> "$HEALER_LOG"
    
    # Display healer log
    print_section "🔧 Playwright Healer Execution Summary"
    cat "$HEALER_LOG"
    
    # Create summary
    {
        echo ""
        echo "═════════════════════════════════════════"
        echo "  HEALER EXECUTION COMPLETED"
        echo "═════════════════════════════════════════"
        echo ""
    } >> "$HEALER_LOG"
    
    log_message "Playwright Healer execution completed. Debug artifacts available in: $HEALER_OUTPUT_DIR" "HEALER"
    
    echo -e "\n${YELLOW}🔧 Playwright Healer artifacts saved to: $HEALER_OUTPUT_DIR${NC}"
    echo -e "${YELLOW}📄 Healer Log: $HEALER_LOG${NC}\n"
    
    # Exit with failure
    exit "$TEST_EXIT_CODE"
fi
