import { array } from "yargs";

console.log("mandeha");

const message: string = "Hello world by Ahsan!";
console.log(message);

export const getMessage = (): string => message;

function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
console.log(output);

function identityDouble<T, G>(arg: T, arg1: G): G {
  console.log(arg);
  return arg1;
}

let output1 = identityDouble<string, number>("hello", 2);
console.log(output1);

//How to Use Generic Classes
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }
  getValue(): T {
    return this.value;
  }
}

let box = new Box<number>(42);
console.log(box.getValue());

// How to Use Generics with Interfaces
interface Lenghuise {
  length: number;
  value: string;
}

function loggingIdentity<T extends Lenghuise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

let a = null;
a = {
  length: 23,
  value: "val",
};
let result = loggingIdentity(a);

console.log(result);

// How to Use Generics with Interfaces

interface Pair<T, U> {
  first: T;
  second: U;
}

let pair: Pair<number, string> = { first: 1, second: "two" };
console.log(pair);
// How to Use Generic Functions with an Array

function reverse<T>(array: T[]): T[] {
  return array.reverse();
}

let numbers: number[] = [1, 2, 3, 4, 5];

let reversedNumbers: number[] = reverse<number>(numbers);
console.log(reversedNumbers);

// How to Use Generic Constraints with

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let person = { name: "John", age: 30, city: "New York" };
let age: number = getProperty(person, "age");
console.log(age);
// How to Use Generic Utility Functions

function toArray<T>(value: T): T[] {
  return [value];
}

let numberArray: number[] = toArray(42);

console.log(numberArray);

let stringArray: string[] = toArray("hello");
console.log(stringArray);

let bool: Boolean[] = toArray<Boolean>(true);
console.log(bool);

// How to Use Generic Interfaces with A Function

interface Transformer<T, U> {
  (input: T): U;
}

function uppercase(input: string): string {
  return input.toUpperCase();
}

let transform: Transformer<string, string> = uppercase;
console.log(transform("hello"));

let numberToString: Transformer<number, string> = (num) => num.toString();
console.log(numberToString(123));
