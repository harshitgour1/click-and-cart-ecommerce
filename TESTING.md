# Testing Documentation

This document provides an overview of the testing suite implemented for the e-commerce application.

## Test Framework

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Environment**: jsdom for component tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Test Coverage

### 1. Unit Tests

#### Validation Tests (`lib/utils/__tests__/validation.test.ts`)
- Tests for `validateProductData` function
- Tests for `validatePartialProductData` function
- Covers all validation rules for product fields (name, slug, description, price, category, inventory)
- **Total: 20 tests**

#### Authentication Tests (`lib/utils/__tests__/auth.test.ts`)
- Tests for `authenticateRequest` function
- Tests for `getAuthErrorResponse` function
- Covers valid/invalid API keys and missing environment variables
- **Total: 5 tests**

### 2. Component Tests

#### ProductCard Tests (`components/products/__tests__/ProductCard.test.tsx`)
- Renders product information correctly
- Displays inventory status badges
- Shows low stock and out of stock warnings
- Verifies links to product detail pages
- **Total: 7 tests**

#### ProductForm Tests (`components/products/__tests__/ProductForm.test.tsx`)
- Renders all form fields
- Validates form inputs
- Auto-generates slugs from product names
- Resets form on button click
- **Total: 6 tests**

#### ProductSearch Tests (`components/products/__tests__/ProductSearch.test.tsx`)
- Renders search input
- Filters products by search query
- Shows/hides clear button
- Displays results count
- **Total: 6 tests**

### 3. Integration Tests (Note)

API route integration tests are located in `app/api/products/__tests__/` but are excluded from the default test run due to database connection complexity. These tests demonstrate the structure for integration testing but would require additional setup (e.g., test database, mocking) to run successfully.

## Test Statistics

- **Total Test Files**: 5 (passing)
- **Total Tests**: 44 (passing)
- **Coverage Areas**:
  - Validation utilities
  - Authentication utilities
  - Product components
  - Search and filter functionality

## Best Practices

1. **Focused Tests**: Each test focuses on a single behavior
2. **Descriptive Names**: Test names clearly describe what is being tested
3. **Arrange-Act-Assert**: Tests follow the AAA pattern
4. **No External Dependencies**: Unit and component tests don't rely on external services
5. **Fast Execution**: All tests run in under 4 seconds

## Future Improvements

- Add E2E tests with Playwright or Cypress
- Implement API integration tests with proper database mocking
- Add visual regression testing
- Increase code coverage to 80%+
- Add performance testing for critical paths
