'use client';

import { Post as PostType } from "@/typings/posts/Post";
import { LikeButton } from "./LikeButton";
import { useState } from "react";


export type PostProps = {
  post: PostType;
  onLikeClick: (post: PostType) => Promise<PostType>;
}

export const Post = (props: PostProps) => {
  const [newerPost, setNewerPost] = useState<PostType>();
  const post = newerPost ? newerPost : props.post;

  return <div className="bg-white rounded-lg border border-slate-200 flex flex-col">
    <div className="px-4 pt-5">
      <div>
        {post.author.firstName} {post.author.lastName}
      </div>
      <div className="text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleDateString('ru', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        })}
      </div>
    </div>

    <div className="h-96 px-4">
      {post.message}
    </div>

    <div className="pb-3 px-4 flex gap-2">
      <LikeButton
        likedByUser={post.likedByUser}
        likesCount={post.likesCount}
        onClick={async () => {
          const newPost = await props.onLikeClick(post);
          setNewerPost(newPost);
        }}
      />
      <button className="bg-slate-100 rounded-lg text-slate-500 h-8 px-3">
        Comment
      </button>
    </div>
  </div >;
};

