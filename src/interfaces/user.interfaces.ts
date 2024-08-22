export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  permission: string[];
}

export interface getUserQuery {
  q?: string;
}
