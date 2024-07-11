import { v4 as uuid } from "uuid";

export interface EmployeeLineItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  created: Date;
}

export const createDefaultEmployee = (): EmployeeLineItem => ({
  id: uuid(),
  name: "",
  email: "",
  phone: "",
  occupation: "",
  created: new Date(),
});
