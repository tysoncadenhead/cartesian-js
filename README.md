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

### pipe(...Promises<any>) => (any) : Promise<any>

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

### handlePipe(...Promises<any>) => (any) : Promise<[error, response]>

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

### compose(...Promises<any>) => (any) : Promise<any>

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

### handleCompose(...Promises<any>) => (any) : Promise<[error, response]>

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

### map(Promise) => (Array<any>) : Promise<response>

Maps over an array async.

Example:

```js
import { map } from "async-functional-utils";

const result = await map((x) => Promise.resolve(x * 3))([1, 2, 3]);

console.log(result); // [3, 6, 9]
```

### reduce(Promise, ?initialValue) => (Array<any>) : Promise<response>

Reduces over an array async.

Example:

```js
import { reduce } from "async-functional-utils";

const [six, seven] = await reduce((prev, x) => {
  return Promise.resolve([...prev, x + 5]);
}, [])([1, 2]);

console.log(six); // 6
```

### filter(Promise) => (Array<any>) : Promise<response>

Filters over an array async.

Example:

```js
import { filter } from "async-functional-utils";

const result = await filter((x) => {
  return Promise.resolve(x.includes("hi"));
})(["hi", "high", "hay"]);

console.log(result); // ["hi", "hey"]
```

### batch(Promise, { batchSize?: number; }) => (Array<any>) : Promise<response>

Executes a given number of promises against an array at a time.

Example:

```js
const result = await batch(
  (x) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 10);
    });
  },
  {
    batchSize: 2,
  }
)([1, 2, 3, 4, 5]);

console.log(result); // [1, 2, 3, 4, 5]
```
