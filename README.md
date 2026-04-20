
# 🧪 End-to-End QA Automation Framework (Playwright + Jest)

## 📌 Overview

This project is a **production-grade QA automation framework** designed to validate the reliability of a full-stack TaskManager application.

It demonstrates a **QA engineering approach**, combining:

* Risk-based test coverage
* API + UI test layering
* CI/CD quality gates
* Failure scenario validation
* Maintainable test architecture

The framework ensures **functional correctness, data consistency, and user experience reliability** across the entire application stack.

## 🎯 QA Objectives (Senior-Level Focus)

This project was designed to validate:

### ✔ Functional correctness

* Task creation, update, deletion
* Status transitions (Todo → Done)
* Data persistence consistency

### ✔ System resilience

* Invalid payload handling (API validation)
* Non-existent resource handling (404 cases)
* UI synchronization with backend state

### ✔ User experience reliability

* Modal confirmations
* Real-time UI updates
* Navigation consistency

### ✔ Production readiness

* CI/CD automation gates
* Coverage enforcement
* Regression safety net

## 🧠 Test Strategy (Risk-Based Approach)

Instead of testing everything equally, this framework prioritizes **business-critical flows**:

### 🔴 Critical Flows (High Risk)

* Task creation
* Task deletion
* Task completion
* API CRUD operations

### 🟠 Medium Risk

* Form validation
* UI state rendering
* Empty state handling

### 🟡 Low Risk

* Page layout rendering
* Static UI elements

## 🏗️ Architecture

```text id="arch1"
src/
 ├── app.js
 ├── routes/
 │    └── tasks.js
 ├── services/
 │    └── taskService.js

tests/
 ├── api/        → Integration tests (Jest)
 ├── e2e/        → UI tests (Playwright)
```
## 🧪 Testing Layers

### 🔹 1. API Layer (Jest – Integration Tests)

Validates backend business logic independently of UI.

Covers:

* CRUD operations
* Input validation (400 errors)
* Resource not found (404 errors)
* Service-layer logic

 Focus: **data integrity & backend reliability**

### 🔹 2. UI Layer (Playwright – E2E Tests)

Simulates real user behavior in a browser.

Covers:

* Task lifecycle (create → update → delete)
* Modal interactions (confirm deletion)
* UI + API synchronization
* Real-time state updates

 Focus: **user experience & system integration**

## ⚙️ CI/CD Strategy (Quality Gates)

The pipeline enforces **progressive validation stages**:

```yaml id="ci1"
unit-tests → api-tests → e2e-tests
```

### Key design decisions:

* `needs:` dependency ensures **fail-fast execution**
* E2E tests run only on stable backend
* Coverage thresholds act as **quality gates**
* Artifacts stored for debugging (Playwright reports)


## 📊 Code Coverage Policy

Coverage is not just a metric — it is a **quality control mechanism**.

```js id="cov1"
coverageThreshold: {
  global: {
    branches: 55,
    functions: 65,
    lines: 85,
    statements: 85
  }
}
```

### Interpretation:

* Branch coverage ensures **all logic paths are validated**
* Function coverage ensures **all business functions are tested**
* Line coverage ensures **execution completeness**
* Thresholds are tuned for **early-stage project maturity**


## 🧪 Key Test Scenarios

### ✔ Task Management Flow

* Create task via API + UI
* Validate persistence
* Update status
* Delete task with confirmation

### ✔ Negative Scenarios

* Missing required fields → 400 error
* Invalid ID → 404 error
* Deleting non-existent task

### ✔ UI Consistency

* Task list updates instantly
* Modal confirmation prevents accidental deletion
* Completed tasks visually marked


## 🧱 Engineering Practices

This framework applies:

* Separation of concerns (API vs UI tests)
* Reusable selectors strategy (data-testid)
* Deterministic test setup (clean state before each run)
* Independent test execution (no dependencies between tests)
* CI-first design (tests validated in pipeline, not locally only)

## 🛠️ Tech Stack

* **Playwright** → End-to-End testing
* **Jest** → API & integration testing
* **Node.js / Express** → Backend application
* **GitHub Actions** → CI/CD automation

## 👤 Author

**ChaimaKh78**
QA Automation And Devops Engineer
