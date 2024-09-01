import * as featuser from '@/features/user/server';
import * as featcurrentuser from '@/features/current-user';
import * as featpost from '@/features/post';
import * as featcomment from '@/features/comment';
import * as dto from '@/dto';

import { ProfileBlock } from "@/components/profile-block";
import { serverRenderApi } from "@/serverRenderApi";
import { actionApi } from "@/actionApi";

import { Wall } from "./wall";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const [me, user, postsResult] = await Promise.all([
    featcurrentuser.api.get(),
    serverRenderApi<featuser.Model>(`/users/${params.id}`, {
      method: 'GET'
    }),
    serverRenderApi<dto.FindResult<featpost.Model>>(`/posts?ownerId=${params.id}`, {
      method: 'GET'
    })
  ]);

  return (
    <div>
      <featuser.components.MainInfo user={user?.data} className="mb-4" />
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 basis-2/3">
          <Wall
            me={me!.data!}
            initialPostsQueryResult={postsResult?.data}
            onCommentSubmit={async (postId, comment) => {
              'use server';

              return actionApi<{ id: string }>('/comments/publish-on-post', {
                method: 'POST',
                body: JSON.stringify({
                  id: postId,
                  message: comment
                })
              }).then(res => {
                const id = res.data.id;

                return actionApi<featcomment.Model>(`/comments/${id}`)
              }).then(res => {
                return res.data;
              });
            }}
            onPostRemove={async (post) => {
              'use server';

              await actionApi('/posts/remove', {
                method: 'POST',
                body: JSON.stringify({
                  id: post.id,
                }),
              });
            }}
            onPostPublish={async (message) => {
              'use server';

              const res = await actionApi<{ id: string }>('/posts/publish', {
                method: 'POST',
                body: JSON.stringify({
                  message,
                  ownerId: params.id,
                })
              });

              const id = res.data?.id

              const postRes = await actionApi<featpost.Model>(`/posts/${id}`, {
                method: 'GET'
              });

              return postRes.data;
            }}
            onFetch={async (cursor: string) => {
              'use server';

              const res = await actionApi<dto.FindResult<featpost.Model>>(`/posts?ownerId=${params.id}&cursor=${encodeURIComponent(cursor)}`, {
                method: 'GET'
              });

              return res?.data;
            }}
            onCommentFetch={async (postId: string, next: string) => {
              'use server';

              const res = await actionApi<dto.FindResult<featcomment.Model>>(`/comments?postId=${postId}&next=${encodeURIComponent(next)}`, {
                method: 'GET'
              });

              return res?.data;
            }}
            onCommentLike={async (comment: featcomment.Model) => {
              'use server';

              const res = await actionApi<null>(`/like/comment`, {
                method: 'POST',
                body: JSON.stringify({
                  id: comment.id,
                })
              });

              return res.ok
            }}
            onCommentRemove={async (comment: featcomment.Model) => {
              'use server';

              const res = await actionApi<null>(`/comments/remove`, {
                method: 'POST',
                body: JSON.stringify({
                  id: comment.id,
                })
              });

              return res.ok
            }}
          />
        </div>
        <div className="flex flex-col basis-1/3">
          <ProfileBlock className="sticky top-16">
            Friends
          </ProfileBlock>
        </div>
      </div>
    </div>
  );
}
