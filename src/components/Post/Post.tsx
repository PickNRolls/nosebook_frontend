'use client';

import { Post as PostType } from "@/typings/posts/Post";
import { LikeButton } from "./LikeButton";
import { useRef, useState } from "react";
import { ProfileBlock } from "../ProfileBlock";
import { CommentButton } from "./CommentButton";
import { RepostButton } from "./RepostButton";
import { Link } from "@/components/Link";
import { linkUserPage } from "@/components/linkUserPage";
import { RealtimeDate } from "@/components/RealtimeDate";
import { Avatar } from "@/components/Avatar";
import { User } from "@/typings/User";
import { PostCommentInput } from "../PostCommentInput";

export type PostProps = {
  me: User;
  post: PostType;
  onLikeClick: (post: PostType) => Promise<PostType | undefined>;
  onRemoveClick: (post: PostType) => void;
  onCommentSubmit: (post: PostType, comment: string) => void;
}

export const Post = (props: PostProps) => {
  const [newerPost, setNewerPost] = useState<PostType>();
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [comment, setComment] = useState('');
  const focusCommentAfterRenderRef = useRef(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement>();

  const post = newerPost ? newerPost : props.post;

  const handleCommentClick = () => {
    setCommentSectionVisible(true);
    focusCommentAfterRenderRef.current = true;
    commentTextareaRef.current?.focus();
  };

  const handleCommentSubmit = () => {
    props.onCommentSubmit(post, comment);
  };

  return <ProfileBlock className="flex flex-col">
    <div className="flex px-3 pt-3">
      <Avatar className="-mt-[6px] -ml-[6px] mr-1" user={post.author} size="sm" outline={false} />
      <div className="flex flex-col">
        <Link href={linkUserPage(post.author.id)} className="text-[13px] text-blue-600 font-medium leading-[16px] mt-[2px]">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <div className="text-[13px] text-gray-500 leading-[17px]">
          <RealtimeDate date={new Date(post.createdAt)} />
        </div>
      </div>

      {post.canBeRemovedByUser && (
        <span
          className="h-full flex items-center justify-center text-slate-400 hover:text-slate-500 w-[32px] ml-auto cursor-pointer"
          onClick={() => props.onRemoveClick(post)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" d="M12.74 3.26a.9.9 0 0 1 0 1.28L9.27 8l3.47 3.46a.9.9 0 0 1 .08 1.18l-.08.1a.9.9 0 0 1-1.28 0L8 9.27l-3.46 3.47a.9.9 0 0 1-1.28-1.28L6.73 8 3.26 4.54a.9.9 0 0 1-.08-1.18l.08-.1a.9.9 0 0 1 1.28 0L8 6.73l3.46-3.47a.9.9 0 0 1 1.28 0Z"></path></svg>
        </span>
      )}
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
          if (newPost) {
            setNewerPost(newPost);
          }
        }}
      />
      <CommentButton onClick={handleCommentClick} />
      <RepostButton />
    </div>

    {commentSectionVisible && (
      <PostCommentInput
        me={props.me}
        comment={comment}
        onCommentChange={setComment}
        onSubmit={handleCommentSubmit}
        submitDisabled={!comment}
        textareaRef={textarea => {
          commentTextareaRef.current = textarea;
          if (focusCommentAfterRenderRef.current) {
            textarea.focus();
            focusCommentAfterRenderRef.current = false;
          }
        }}
      />
    )}
  </ProfileBlock>;
};

