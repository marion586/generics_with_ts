// Union types
// A union type is similar to Javascripts OR expression. It allows you to use two or more types (union members) to form a
// new type that may be any of those types.

function orderProduct(orderId: string | number) {
  console.log("Ordering product with id", orderId);
}

orderProduct(1);

orderProduct("123-abc");
// orderProduct({ name: "foo" });

// Intersection types
// An intersection type, on the other hand, combines multiple types into one. This new type has all the features of the
// combined types.

interface Person {
  name: string;
  firstname: string;
}

interface FootballPlayer {
  club: string;
}

function transferPlayer(player: Person & FootballPlayer) {}

transferPlayer({
  name: "Ramos",
  firstname: "Sergio",
  club: "PSG",
});

// transferPlayer({
//   name: "Ramos",
//   firstname: "Sergio",

// });

// Keyof
// Now that we know the union type. Let’s have a look at the keyof operator. The keyof operator takes the keys of an
// interface or an object and produces a union type.

interface MovieCharacter {
  firstname: string;
  name: string;
  movie: string;
}

type characterProps = keyof MovieCharacter;

const a: characterProps = "name";

interface PizzaMenu {
  starter: string;
  pizza: string;
  beverage: string;
  dessert: string;
}

const simpleMenu: PizzaMenu = {
  starter: "Salad",
  pizza: "Pepperoni",
  beverage: "Coke",
  dessert: "Vanilla ice cream",
};

function adjustMenu(
  menu: PizzaMenu,
  menuEntry: keyof PizzaMenu,
  change: string
) {
  menu[menuEntry] = change;
}
// 👍
adjustMenu(simpleMenu, "pizza", "Hawaii");
// 👍
adjustMenu(simpleMenu, "beverage", "Beer");

// 👎 Type - 'bevereger' is not assignable
// adjustMenu(simpleMenu, "bevereger", "Beer");
// // 👎 Wrong property - 'coffee' is not assignable
// adjustMenu(simpleMenu, "coffee", "Beer");s

let firstname = "Frodo";

let name1: typeof firstname = "";

function getCharacter() {
  return {
    firstname: "Frodo",
    name: "Baggins",
  };
}

type Character = ReturnType<typeof getCharacter>;
type keyss = keyof Character;
function testReturn(data: keyss): Character & { key: keyss } {
  return {
    firstname: "Frodo",
    name: "Baggins",
    key: data,
  };
}

testReturn("firstname");

type fott = Person & FootballPlayer;

interface StringId {
  id: string;
}

interface NumberId {
  id: number;
}

type Id<T> = T extends string ? StringId : NumberId;

let idOne: Id<string>;
// equal to let idOne: StringId;

let idTwo: Id<number>;
// equal to let idTwo: NumberId;

// infer type

type flattenArrayType<T> = T extends Array<infer ArrayType> ? ArrayType : T;

type foo = flattenArrayType<string[]>;
// equal to type foo = string;

type foo1 = flattenArrayType<number[]>;
// equal to type foo = number;

type foo2 = flattenArrayType<number>;
// equal to type foo = number;

// Mapped types

interface Character1 {
  playInFantasyMovie: () => void;
  playInActionMovie: () => void;
}

type toFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type characterReatures = toFlags<Character1>;
interface Character3 {
  playInFantasyMovie: () => void;
  playInActionMovie: () => void;
}

/*

equal to 

type characterFeatures = {
  playInFantasyMovie: boolean;
  playInActionMovie: boolean;
}

*/

type mutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type Character2 = {
  readonly firstname: string;
  readonly name: string;
};

type mutableCharacter = mutable<Character>;
/*

equal to

type mutableCharacter = {
  firstname: string;
  name: string;
}

 */

type mutable1<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type CharacterReadonly = {
  readonly firstname: string;
  readonly name: string;
};

type mutableCharacter2 = mutable1<CharacterReadonly>;

// type mutableCharacter2 = {
//   firstname: string;
//   name: string;
// }

//  */

type optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

type Character8 = {
  firstname: string;
  name: string;
};

type mutableCharacter8 = optional<Character>;

/* 

equal to

type mutableCharacter = {
  firstname?: string;
  name?: string;
}

*/

type setters<Type> = {
  [Property in keyof Type as `set${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

type Character9 = {
  firstname: string;
  name: string;
};

type character = setters<Character>;

/*

equal to

type character = {
  setFirstname: () => string;
  setName: () => string;
}

*/

type nameOnly<Type> = {
  [Property in keyof Type as Exclude<Property, "firstname">]: Type[Property];
};

type Character11 = {
  firstname: string;
  name: string;
};

type character11 = nameOnly<Character>;

/*

equal to 

type character = {
  name: string;
}

*/
