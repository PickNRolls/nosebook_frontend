import { mockUuid } from "@/mockUuid";
import { mockUser, User } from "../User";

export type Post = {
  id: string;
  author: User;
  owner: User;
  message: string;
  likesCount: number;
  likedByUser: boolean;
  randomFiveLikers: User[];
  createdAt: string;
};

// export function mockPost(): Post {
//   return {
//     id: mockUuid(),
//     author: mockUser(),
//     message: 'Mocked post',
//     likedBy: [mockUser()],
//     comments: [],
//     createdAt: new Date().toISOString()
//   };
// }
