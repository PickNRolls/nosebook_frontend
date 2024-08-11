import { User } from "../User";
import { PostComments } from "./PostComments";

export type Post = {
  id: string;
  author: User;
  owner: User;
  message: string;

  likesCount: number;
  likedByUser: boolean;
  randomFiveLikers: User[];

  comments: PostComments;

  canBeRemovedByUser: boolean;
  createdAt: string;
};

