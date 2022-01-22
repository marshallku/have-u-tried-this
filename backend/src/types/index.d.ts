import { IUserDocument } from "../models/schemas/User";

declare global {
  namespace Express {
    export interface User extends IUserDocument {}
  }
}
