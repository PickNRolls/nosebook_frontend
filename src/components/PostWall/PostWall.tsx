import { api } from "@/api";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { Post } from "@/components/Post";
import { like } from "@/components/like";
import cn from 'classnames';

export type PostWallProps = {
  className?: string;
  userId: string;
}

export const PostWall = async (props: PostWallProps) => {
  const postsResult = await api<PostQueryResult>(`/posts?ownerId=${props.userId}`, {
    method: 'GET'
  });

  return (
    <div className={cn("flex flex-col gap-4", props.className)}>
      {postsResult.data?.data.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLikeClick={async (post) => {
            'use server';

            const res = await like(post.id);
            return res.data!;
          }} />
      ))}
    </div>
  );
};

