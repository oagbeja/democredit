export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}
export interface sigupInput {
  firstName: string;
  lastName: string;
  nin: number;
  email: string;
  password: string;
}

export interface loginInput {
  email: string;
  password: string;
}

export interface userInput {
  email: string;
  password: string;
}

interface baseUserInput {
  email: string;
  firstName: string;
  lastName: string;
  uuid: string;
  userId: number;
}

export interface myAccountInput {
  user: baseUserInput;
  amount: number;
}

export interface anotherAccountInput {
  user: baseUserInput;
  email: string;
  amount: number;
}
