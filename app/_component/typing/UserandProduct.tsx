type ISignIn = {
  Email: string;
  Password: string;
};

type ISignUp<T> = {
  Firstname: T;
  Lastname: T;
  Email: T;
  Password: T;
};

type IProduct = {
  id: number;
  ProductName: string;
  Price: number;
  createdAt: string;
  user: ISignUp<string>;
};

interface IUsers extends ISignUp<string> {
  Product: IProduct[];
}

interface IcreateProduct extends IProduct {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
}

interface IvalidateProduct extends ISignUp<string> {}

export type {
  ISignIn,
  ISignUp,
  IUsers,
  IProduct,
  IvalidateProduct,
  IcreateProduct,
};
