# Transformer - Juan Aragon CO

Utility library for transforming dict objects into typed domain data

## Installation

```bash
yarn add @juanaragon-co/transformer dayjs
npm install juanaragon-co/transformer dayjs
```

## Usage

```ts
import { t } from '@juanaragon-co/transformer';

const transformer = t.object({
    name: t.string('user.name'),
    age: t.number('user.age'),
    email: t.string('user.email', {defaultValue: 'john@example.com'}),
});

/* {
 *    "name": "John Doe",
 *    "age": 23,
 *    "email": "john@example.com"
 * }
 */
const result = transformer.transform({
    user: {
        name: 'John Doe',
        age: '23',
    }
});

```
