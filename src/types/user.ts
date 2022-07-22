export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  company: string;
  admin: boolean;
  tempPassword: string;
  tempPasswordTime: number;
  createdAt: string;
  updatedAt: string;
}
