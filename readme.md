# adaptive-utils

A comprehensive collection of TypeScript utilities for arrays, URLs, random ID generation, validation, and common development tasks. Lightweight, tree-shakable, and Bun/Node.js compatible.

## Features

- **Array Utilities**: Create, filter, and manipulate arrays with ease
- **URL Handling**: Parse and manipulate URL parameters, base64 encoding
- **Random ID Generation**: Secure, URL-friendly random ID generation
- **Validation**: Valibot schemas for common data types
- **Type Safety**: Fully typed with TypeScript
- **Lightweight**: Tree-shakable and optimized for performance
- **Cross-Platform**: Works with Bun and Node.js

## Installation

```bash
npm install @adaptive-sm/utils
# or
bun add @adaptive-sm/utils
```

## Quick Start

```typescript
import {
  arrCreate,
  searchParamsToObject,
  generateReadableId,
} from "@adaptive-sm/utils";

// Create arrays with custom logic
const squares = arrCreate(5, (i) => i * i); // [0, 1, 4, 9, 16]

// Parse URL search parameters
const params = searchParamsToObject("?name=john&age=30");

// Generate secure, readable IDs
const idGenerator = generateReadableId(12);
const id = idGenerator(); // "abc123def456"
```

## Categories

### Array Utilities

- `arrCreate` - Create arrays with custom population logic
- `notEmptyFilter` - Filter out empty values
- `notNullFilter` - Filter out null values
- `sortArrString` - Sort arrays of strings

### URL Utilities

- `searchParamsToObject` - Convert URL search params to object
- `objToUrlParams` - Convert object to URL parameters
- `base64`, `base64url` - Base64 encoding utilities
- `queryString` - Query string manipulation

### Random ID Generation

- `generateReadableId` - URL-friendly random IDs
- `generateId3` to `generateId12` - Various ID lengths
- `randomInteger` - Generate random integers
- `createPseudoRandom` - Pseudo-random number generation

### Validation (Valibot)

- `dateTimeSchema` - ISO timestamp validation
- `intOrStringSchema` - Integer or string validation
- `numberOrStringSchema` - Number or string validation
- `stringifyValibotErrors` - Error formatting

### Other Utilities

- Date manipulation
- Number rounding and parsing
- Object manipulation
- Text formatting and conversion

## License

MIT
