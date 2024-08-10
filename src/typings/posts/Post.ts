import { User } from "../User";

export type Post = {
  id: string;
  author: User;
  owner: User;
  message: string;
  likesCount: number;
  likedByUser: boolean;
  canBeRemovedByUser: boolean;
  randomFiveLikers: User[];
  createdAt: string;
};

