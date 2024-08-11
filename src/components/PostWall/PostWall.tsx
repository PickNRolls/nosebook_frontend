import { Post } from "@/components/Post";
import { like } from "@/components/like";
import { User } from "@/typings/User";
import { Post as PostType } from "@/typings/posts/Post";
import cn from 'classnames';

export type PostWallProps = {
  className?: string;
  me: User;
  posts: PostType[];
  onPostRemove: (post: PostType) => void;
  onCommentSubmit: (post: PostType, comment: string) => void;
}

export const PostWall = (props: PostWallProps) => {
  return (
    <div className={cn("flex flex-col gap-4", props.className)}>
      {props.posts.map((post) => (
        <Post
          key={post.id}
          me={props.me}
          post={post}
          onCommentSubmit={props.onCommentSubmit}
          onLikeClick={async (post) => {
            const res = await like(post.id);
            return res?.data;
          }}
          onRemoveClick={props.onPostRemove}
        />
      ))}
    </div>
  );
};

