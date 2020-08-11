# Async Functional Utils

This utility library is designed to handle async code using functional paradigms like `curry` and `compose`. It is currently a work in progress and more utilities will be added.

## Installation

NPM:

```
npm install async-functional-utils -S
```

Yarn:

```
yarn add async-functional-utils --save
```

## API

### handle(Promise<any>) => [Error, Response]

Wraps a promise in a catch and returns an array of any caught errors as the first item in the array and the response as the second item.

Example:

```js
import { handle } from "async-functional-utils";

const [error, response] = await handle(api.deleteEverything);

if (error) {
  console.log(error);
}

if (response) {
  console.log(response);
}
```

### pipe(...Promises<any>) => Promise<any>

Compose multiple promises. Each will pass its results to the next.

Example:

```js
import { pipe } from "async-functional-utils";

const result = await pipe(
  (x) => Promise.resolve(x * 2), // 6
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(`${x}?`) // '8?'
)(3);
```

### handlePipe(...Promises<any>) => Promise<[error, response]>

The same as pipe, but wrapped in a handle. Returns an array of `[error, response]`

Example:

```js
import { handlePipe } from "async-functional-utils";

const [error, result] = await handlePipe(
  (x) => Promise.resolve(x * 2), // 6
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(`${x}?`) // '8?'
)(3);
```

### compose(...Promises<any>) => Promise<any>

Compose multiple promises. Composes from right to left.

Example:

```js
import { compose } from "async-functional-utils";

const result = await compose(
  (x) => Promise.resolve(`${x}?`), // '8?'
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(x * 2) // 6
)(3);
```

### handleCompose(...Promises<any>) => Promise<[error, response]>

The same as compose, but wrapped in a handle. Returns an array of `[error, response]`

Example:

```js
import { handleCompose } from "async-functional-utils";

const [result, error] = await handleCompose(
  (x) => Promise.resolve(`${x}?`), // '8?'
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(x * 2) // 6
)(3);
```
