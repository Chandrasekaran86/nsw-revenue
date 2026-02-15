# 🚗 NSW Revenue - Motor Vehicle Stamp Duty Test Framework

[![Playwright](https://img.shields.io/badge/Playwright-46e3b7?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Allure Report](https://img.shields.io/badge/Allure-Report-FF6B6B?style=flat-square)](https://docs.qameta.io/allure/)

A comprehensive **Playwright Test Automation Framework** for validating the NSW Revenue Motor Vehicle Stamp Duty calculator with **Page Object Model (POM)**, **Allure Reporting**, and **Docker Support**.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Local Setup](#-local-setup)
- [🚀 Running Tests](#-running-tests)
- [🐳 Docker Setup](#-docker-setup)
- [🔄 Sequence Diagram](#-sequence-diagram)
- [📊 Allure Reporting](#-allure-reporting)
- [🤖 GitHub Actions](#-github-actions)
- [🧬 Framework Architecture](#-framework-architecture)
- [📚 Best Practices](#-best-practices)

---

## ✨ Features

- ✅ **Page Object Model (POM)** - Maintainable and scalable test structure
- ✅ **BDD Testing** - Behavior-Driven Development approach with clear step definitions
- ✅ **Cross-Browser Testing** - Chromium, Firefox, and WebKit support
- ✅ **Allure Reporting** - Comprehensive test reports with screenshots and attachments
- ✅ **Docker Support** - Containerized test execution for consistency across environments
- ✅ **GitHub Actions** - CI/CD integration with automated test execution
- ✅ **Test Healing** - Automatic failure detection and logging
- ✅ **Screenshot Capture** - Visual validation and debugging
- ✅ **Headed & Headless Modes** - Flexible test execution options

---

## 📁 Project Structure

```
nsw-revenue/
│
├── 📄 README.md                          # This file
├── 📄 package.json                       # Project dependencies
├── 📄 playwright.config.ts              # Playwright configuration
├── 📄 tsconfig.json                     # TypeScript configuration
│
├── 🐳 Dockerfile                        # Docker image definition
├── 🐳 docker-compose.yml                # Docker Compose configuration
├── 📄 docker-entrypoint.sh             # Docker entrypoint script
│
├── 📁 fixtures/                         # Custom Playwright fixtures
│   └── pageObjectFixtures.ts           # Page object fixture initialization
│
├── 📁 pageobjects/                      # Page Object Model classes
│   ├── MotorVehicleStampDutyPage.ts    # Service NSW page object
│   ├── RevenueNSWStampDutyPage.ts      # Revenue NSW calculator page object
│   └── RevenueNSWDutyResultPopupPage.ts# Calculation result popup page object
│
├── 📁 tests/                            # Test files
│   └── check-motor-vehicle-stamp-duty.spec.ts # Main test specification
│
├── 📁 .github/workflows/                # GitHub Actions workflows
│   └── playwright-test.yml              # CI/CD pipeline configuration
│
├── 📁 test-results/                     # Test execution results
│   ├── results.json                     # JSON test report
│   ├── junit.xml                        # JUnit XML report
│   ├── *.png                            # Test screenshots
│   └── allure-results/                  # Allure report data
│
└── 📁 playwright-report/                # HTML test report
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.58.2 | Web automation and testing |
| **Node.js** | 18+ | Runtime environment |
| **TypeScript** | ^5.0.0 | Language for type safety |
| **Allure** | ^3.4.5 | Test reporting and visualization |
| **Docker** | Latest | Containerization |
| **GitHub Actions** | Latest | CI/CD pipeline |

---

## ⚙️ Local Setup

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/nsw-revenue.git
cd nsw-revenue
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### Step 4: Verify Installation

```bash
npx playwright --version
```

---

## 🚀 Running Tests

### 1️⃣ Headless Mode (Recommended)

```bash
npm test
```

### 2️⃣ Headed Mode (Visual Debugging)

```bash
npx playwright test --headed
```

### 3️⃣ Debug Mode

```bash
npx playwright test --debug
```

### 4️⃣ Specific Browser

```bash
npx playwright test --project=chromium
```

### 5️⃣ With Allure Report

```bash
npx playwright test
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

---

## 🐳 Docker Setup

### Run Tests in Docker

```bash
docker-compose up --build
```

### Benefits

| Benefit | Description |
|---------|-------------|
| 🔒 **Isolation** | Isolated environment |
| 📦 **Consistency** | Same setup everywhere |
| ⚡ **Fast Setup** | Pre-configured image |
| 📊 **Persistent Storage** | Saved reports |

---

## 🔄 Sequence Diagram

```
Test Start
    │
    ├─→ ① Navigate to Service NSW Page ✅
    ├─→ ② Click "Check online" Button ✅
    ├─→ ③ Verify Calculator Page Loaded ✅
    ├─→ ④ Take Screenshot (Form) 📸
    ├─→ ⑤ Select "Yes" - Passenger ✅
    ├─→ ⑥ Enter Price: $1,000 ✅
    ├─→ ⑦ Click Calculate Button ✅
    ├─→ ⑧ Verify Modal Displayed ✅
    ├─→ ⑨ Extract Duty Value: $30.00 ✅
    ├─→ ⑩ Assert Value = $30.00 ✅
    ├─→ ⑪ Take Screenshot (Modal) 📸
    └─→ Test Complete ✅
```

### Benefits of This Framework

| Benefit | Description |
|---------|-------------|
| 🎯 **Clear Steps** | Easy to understand test flow |
| 📊 **Detailed Reports** | Screenshots and logs for every step |
| 🔧 **Maintainable** | Page Object Model keeps code clean |
| 🚀 **Fast Execution** | Optimized selectors and waits |
| 📱 **Cross-Browser** | Works on all major browsers |
| 🐳 **Docker Ready** | Consistent CI/CD environment |
| 📈 **Scalable** | Easy to add more tests |
| 🤖 **Automated CI/CD** | GitHub Actions integration |

---

## 📊 Allure Reporting

### Generate Report

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

### Report Features

- 📈 Test statistics and graphs
- 🏷️ Test categories and tags
- 📸 Screenshots and attachments
- 📝 Detailed execution logs
- ⏱️ Duration and timing
- 🔴 Failure analysis

---

## 🤖 GitHub Actions

### Two Automated Jobs

#### Job 1: Ubuntu Latest
- Runs on: `ubuntu-latest`
- Installs: Node.js, npm, Playwright
- Executes: Full test suite
- Reports: HTML, JSON, Allure

#### Job 2: Docker Container
- Runs on: Official Playwright Docker image
- Installs: All dependencies in container
- Executes: Full test suite
- Reports: HTML, JSON, Allure

### Manual Trigger

1. Go to **Actions** tab
2. Select **"Playwright Test Execution"**
3. Click **"Run workflow"**
4. Monitor execution
5. Download artifacts

### Artifacts

- **playwright-report** - HTML test report
- **allure-results** - Allure report data
- **healer-output** - Failure analysis

---

## 🧬 Framework Architecture

### Page Objects

#### MotorVehicleStampDutyPage
- Navigate to Service NSW
- Click online calculator button
- Verify page loaded

#### RevenueNSWStampDutyPage
- Select vehicle type
- Enter purchase price
- Click calculate button

#### RevenueNSWDutyResultPopupPage
- Verify popup loaded
- Extract duty values
- Close popup

### Fixtures
- Initialize page objects
- Clean test setup
- Reusable across tests

---

## 📚 Best Practices

### ✅ Do's
- Use Page Objects ✅
- Wait for elements ✅
- Take screenshots ✅
- Use meaningful names ✅
- Document tests ✅

### ❌ Don'ts
- Hardcoded selectors ❌
- No waits ❌
- Long tests ❌
- sleep() calls ❌
- Duplicate code ❌

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run tests | `npm test` |
| Run with UI | `npx playwright test --headed` |
| Debug mode | `npx playwright test --debug` |
| Docker run | `docker-compose up` |
| Generate allure | `npx allure generate ./allure-results --clean -o ./allure-report` |
| View allure | `npx allure open ./allure-report` |

---

**Happy Testing! 🎉**

*Last Updated: February 2026*
