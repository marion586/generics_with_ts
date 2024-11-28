interface User {
  id: number;
  name: string;
  age: number;
  email?: string;
}

const updateUser = (user: Partial<User>) => {
  console.log(`Updating user: ${user.name} `);
};
updateUser({ name: "Alice" });

interface Car {
  make: string;
  model: string;
  mileage?: number;
}

const myCar: Required<Car> = {
  make: "Ford",
  model: "Focus",
  mileage: 12000,
};

interface Config {
  apiEndpoint: string;
}

const config: Readonly<Config> = { apiEndpoint: "https://api.example.com" };

type UserSummary = Pick<User, "name" | "email">;

const userSummary: UserSummary = {
  name: "Alice",
  email: "alice@example.com",
};

// Omit<Type, Keys>
const userWithoutEmail: Omit<User, "email"> = {
  id: 1,
  name: "Bob",
  age: 12,
};

// Record<Keys, Type>

type Fruit = "apple" | "banana" | "orange";

type Inventory = Record<Fruit, number>;
const inventory: Inventory = {
  apple: 10,
  banana: 5,
  orange: 0,
};

// Exclude<Type, ExcludedUnion
type Primitive = string | number | boolean;

const value: Exclude<Primitive, string> = true;

// Extract<Type, Union>

const value2: Extract<Primitive, number> = 42; // Only allows numbers.

// NonNullable;
type NullableString = string | null | undefined;

const value3: NonNullable<NullableString> = "Hello";

// ReturnType

type PointGenerator = () => { x: number; y: number };

const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20,
};

// Parameters

function createUser(name: string, age: number, email: string): User {
  return { id: 1, name, age, email };
}

// Combining Partial and Required
type CreateUserParams = Parameters<typeof createUser>;

interface User2 {
  id: number;
  name?: string;
  email?: string;
}

type UpdateUser2 = Required<Pick<User, "id">> & Partial<Omit<User, "id">>;

const updateUser2Data: UpdateUser2 = { name: "marion", id: 2 };

// Creating flexible API responses

interface APiResponse<T, E> {
  data?: T;
  error?: E;
}

type UserResponse = APiResponse<Pick<User, "name" | "email">, Error>;

const response1: UserResponse = {
  data: { name: "Alice", email: "alice@example.com" },
  error: new Error("Some error occurred"),
};

// Combining Exclude and Extract for filtering types
type ResponseTypes = "success" | "error" | "loading";

// Extracting specific response types while excluding others
type NonLoadingResponses = Exclude<ResponseTypes, "loading">;

const handleResponse = (responseType: NonLoadingResponses) => {
  if (responseType === "success") {
    console.log("Operation was successful!");
  } else if (responseType === "error") {
    console.log("An error occurred.");
  }
};
handleResponse("success");
handleResponse("error");

// Best practices

type User3 = {
  id: number;
  name: string;
  email?: string;
};
// Overly complex type using multiple utilities.
type ComplexUser = Partial<Required<Pick<User3, "name" | "email">>>;
// This can be confusing and hard to maintain.
const user1: ComplexUser = { name: "Alice" }; // Valid, but unclear intent

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

type ProductPreview = Pick<Product, "id" | "name">;
const preview: ProductPreview = {
  id: 101,
  name: "Smartphone",
};

// Performance considerations
// A complex type that could impact performance if used excessively.
type DeeplyNestedType = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: string;
        };
      };
    };
  };
};

// Accessing deeply nested properties can lead to performance issues
const example: DeeplyNestedType = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: "Hello",
        },
      },
    },
  },
};

console.log(example.level1.level2.level3.level4.level5); // Performance hit on deep access
