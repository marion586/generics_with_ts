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
