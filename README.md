# CartesianJS

![](./docs/descartes.png)

> Async Therefore I Am

A practical functional asynchronous library for JavaScript programmers.

## Why Cartesian?

Over the years, I've found myself rewriting utilities for handling Promise-based interactions in every new project I start. I wanted to have a place to pull these functions from and a basic requirement was that they should be modular, composable and purely functional.

This library is meant to give some building blocks form composing your business logic so that you can focus on that rather than needing to getting into the depths of writing a reduce that works asynchronously or figuring out how to batch a certain number of promises at a time.

## Installation

NPM:

```
npm install cartesian-js -S
```

Yarn:

```
yarn add cartesian-js --save
```

The library can be used either by requiring the whole thing or even requiring individual functions. The package is modular and most of the functions are one or two liners, so your build size should not be affected much.

```
// Load the full build.
const cartesian-js = require('cartesian-js');

// Load the full build with ESM
import * as cartesian-js from 'cartesian-js';

// Pull in a single module
import { compose } from 'cartesian-js';

// Directly load a single module
import compose from 'cartesian-js/compose';
```

## API

- [batch](#batch)
- [compose](#compose)
- [filter](#filter)
- [handle](#handle)
- [handleCompose](#handleCompose)
- [handlePipe](#handlePipe)
- [map](#map)
- [pipe](#pipe)
- [reduce](#reduce)
- [sleep](#sleep)
- [timeout](#timeout)

### batch

`batch(Promise, { batchSize?: number; }) => (Array<any>) : Promise<response>`

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

### compose

`compose(...Promises<any>) => (any) : Promise<any>`

Compose multiple promises. Composes from right to left.

Example:

```js
import { compose } from "cartesian-js";

const result = await compose(
  (x) => Promise.resolve(`${x}?`), // '8?'
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(x * 2) // 6
)(3);
```

### filter

`filter(Promise) => (Array<any>) : Promise<response>`

Filters over an array async.

Example:

```js
import { filter } from "cartesian-js";

const result = await filter((x) => {
  return Promise.resolve(x.includes("hi"));
})(["hi", "high", "hay"]);

console.log(result); // ["hi", "hey"]
```

### handle

`handle(Promise<any>) => [Error, Response]`

Wraps a promise in a catch and returns an array of any caught errors as the first item in the array and the response as the second item.

Example:

```js
import { handle } from "cartesian-js";

const [error, response] = await handle(api.deleteEverything);

if (error) {
  console.log(error);
}

if (response) {
  console.log(response);
}
```

### handleCompose

`handleCompose(...Promises<any>) => (any) : Promise<[error, response]>`

The same as compose, but wrapped in a handle. Returns an array of `[error, response]`

Example:

```js
import { handleCompose } from "cartesian-js";

const [result, error] = await handleCompose(
  (x) => Promise.resolve(`${x}?`), // '8?'
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(x * 2) // 6
)(3);
```

### handlePipe

`handlePipe(...Promises<any>) => (any) : Promise<[error, response]>`

The same as [pipe](#pipe), but wrapped in a [handle](#handle). Returns an array of `[error, response]`

Example:

```js
import { handlePipe } from "cartesian-js";

const [error, result] = await handlePipe(
  (x) => Promise.resolve(x * 2), // 6
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(`${x}?`) // '8?'
)(3);
```

### map

`map(Promise) => (Array<any>) : Promise<response>`

Maps over an array async.

Example:

```js
import { map } from "cartesian-js";

const result = await map((x) => Promise.resolve(x * 3))([1, 2, 3]);

console.log(result); // [3, 6, 9]
```

### pipe

`pipe(...Promises<any>) => (any) : Promise<any>`

Compose multiple promises. Each will pass its results to the next.

Example:

```js
import { pipe } from "cartesian-js";

const result = await pipe(
  (x) => Promise.resolve(x * 2), // 6
  (x) => Promise.resolve(x + 2), // 8
  (x) => Promise.resolve(`${x}?`) // '8?'
)(3);
```

### reduce

`reduce(Promise, ?initialValue) => (Array<any>) : Promise<response>`

Reduces over an array async.

Example:

```js
import { reduce } from "cartesian-js";

const [six, seven] = await reduce((prev, x) => {
  return Promise.resolve([...prev, x + 5]);
}, [])([1, 2]);

console.log(six); // 6
```

### sleep

`(milliseconds: number) => (any) : Promise<response>`

Waits for a certain number of milliseconds and then proceeds.

Example:

```js
console.log("Wait a second...");

const result = await sleep(1000)("Okay"); // Sleep for a second

console.log(result); // 'Okay'
```

### timeout

`timeout({ wait: number, errorMessage?: string }, () => Promise<any> => any : Promise<any>`

If the timeout happens before a response comes back, we resolve an error.

Example:

```js
const [error, result] = await handle(
  timeout(
    {
      wait: 3000,
      errorMessage: "Chronologically challenged",
    },
    longRunningPromise
  )
);
```
