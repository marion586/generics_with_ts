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
