import { ProfileBlock } from "@/components/ProfileBlock";
import { UserMainInfo } from "@/components/UserMainInfo";
import { getWhoami } from "@/getWhoami";
import { Post } from "@/typings/posts/Post";
import { User } from "@/typings/User";
import { Wall } from "./Wall";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { serverRenderApi } from "@/serverRenderApi";
import { actionApi } from "@/actionApi";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const [me, user, postsResult] = await Promise.all([
    getWhoami(),
    serverRenderApi<User>(`/users/${params.id}`, {
      method: 'GET'
    }),
    serverRenderApi<PostQueryResult>(`/posts?ownerId=${params.id}`, {
      method: 'GET'
    })
  ]);

  return (
    <div>
      <UserMainInfo user={user?.data} className="mb-4" />
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 basis-2/3">
          <Wall
            me={me!.data!}
            initialPostsQueryResult={postsResult?.data}
            onCommentSubmit={async (comment) => {
              'use server';

              return {};
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

              const res = await actionApi<Post>('/posts/publish', {
                method: 'POST',
                body: JSON.stringify({
                  message,
                  ownerId: params.id,
                })
              });

              return res?.data;
            }}
            onFetch={async (cursor: string) => {
              'use server';

              const res = await actionApi<PostQueryResult>(`/posts?ownerId=${params.id}&cursor=${encodeURIComponent(cursor)}`, {
                method: 'GET'
              });
              return res?.data;
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
