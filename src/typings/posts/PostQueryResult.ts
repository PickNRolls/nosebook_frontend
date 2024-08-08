import { Post } from "./Post";

export type PostQueryResult = {
  error: {} | null;
  remainingCount: number;
  data: Post[];
  next: string;
};
