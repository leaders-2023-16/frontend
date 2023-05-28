import { IUser } from "./User";

export interface IFeedback {
  id: number;
  from_user: IUser;
  to_user: IUser;
  date: string;
  rating: number;
  text?: string;
}
