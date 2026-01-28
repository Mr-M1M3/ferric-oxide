# Rust like utils fro typescript

Rust is famous for its exceptional design choices that helps reduce some class of bugs beforehand. It also force us to wrtite good code. You can now taste these features in typesriupt too.

## Installation

```bash
npm i @mr-m1m3/rusts
```

## Usage

Basically rusts exports classes that implements spceific rust standard library modules.

Currently rusts exports following classes:

* [Maybe](Maybe) (`Option<T>` equivalent of rust)

#### Maybe

Basically a wrapper around `null`. Use it when a value can either be something or nothing.

```typescript
import {Maybe} from "@mr-m1m3/rusts";

// contains some value
const maybe_a_number = new Maybe(100);

// doesn't contain value
const or_maybe_not = new Maybe(null);

// methods
/*
 * .is_value() -> returns `true` because it contains a value otherwise resturns false
 */
maybe_a_number.is_value(); // true
or_maybe_not.is_value(); //false

/*
 * is_not_a_value() -> opposite of .is_value()
 */
or_maybe_not.is_not_a_value(); // true
maybe_a_number.is_not_a_value(); // false

/*
 * .unwrap() -> returns the value if it contains any or throws if it doesn't
 */
maybe_a_number.unwrap(); // 100
or_maybe_not.unwrap(); // throws


/*
 * .expect(msg: string) -> same as .unwrap() but you can specify a message to be displayed as error
 */
maybe_a_number.expect('oops!'); // logs: 100
or_maybe_not.expect('oops!'); // throws an error showing: oops!


/*
 * .unwrap_or(default: T) -> returns the value if it contains any; provided default if it doesn't
 */
maybe_a_number.unwrap_or(420); // 100
or_maybe_not.unwrap_or(420); // 420

/*
 * .unwrap_or_else(fn: () => T) -> same as .unwrap_or() but takes a function calulate the default value
 */
maybe_a_number.unwrap_or_else(() => Math.random() * 15); // 100
or_maybe_not.unwrap_or_else(() => Math.random() * 15); // a random number


```
