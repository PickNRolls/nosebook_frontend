import { User } from "./User";

export type Comment = {
  id: string;
  author: User;
  message: string;

  likesCount: number;
  likedByUser: boolean;
  randomFiveLikers: User[];

  canBeRemovedByUser: boolean;
  createdAt: string;
};

