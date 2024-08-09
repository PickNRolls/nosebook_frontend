'use client';

import { Post as PostType } from "@/typings/posts/Post";
import { LikeButton } from "./LikeButton";
import { useState } from "react";
import { ProfileBlock } from "../ProfileBlock";
import { CommentButton } from "./CommentButton";
import { RepostButton } from "./RepostButton";
import { Link } from "@/components/Link";
import { linkUserPage } from "@/components/linkUserPage";
import { RealtimeDate } from "@/components/RealtimeDate";
import { Avatar } from "@/components/Avatar";

export type PostProps = {
  post: PostType;
  onLikeClick: (post: PostType) => Promise<PostType>;
}

export const Post = (props: PostProps) => {
  const [newerPost, setNewerPost] = useState<PostType>();
  const post = newerPost ? newerPost : props.post;

  return <ProfileBlock className="flex flex-col">
    <div className="flex px-3 pt-3">
      <Avatar className="-mt-[6px] -ml-[6px] mr-1" user={post.author} size="lg" outline={false} />
      <div className="flex flex-col">
        <Link href={linkUserPage(post.author.id)} className="text-[13px] text-blue-600 font-medium">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <div className="text-[13px] text-gray-500">
          <RealtimeDate date={new Date(post.createdAt)} />
        </div>
      </div>
    </div>

    <div className="min-h-10 px-3 pt-1 pb-2 text-[13px]">
      {post.message}
    </div>

    <div className="pb-1 px-2 flex gap-2">
      <LikeButton
        likedByUser={post.likedByUser}
        likesCount={post.likesCount}
        onClick={async () => {
          const newPost = await props.onLikeClick(post);
          setNewerPost(newPost);
        }}
      />
      <CommentButton />
      <RepostButton />
    </div>
  </ProfileBlock>;
};

