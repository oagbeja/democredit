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
