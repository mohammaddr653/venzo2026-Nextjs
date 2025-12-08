export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}
