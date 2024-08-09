import { api } from "@/api";
import { ProfileBlock } from "@/components/ProfileBlock";
import { UserMainInfo } from "@/components/UserMainInfo";
import { getWhoami } from "@/getWhoami";
import { Post } from "@/typings/posts/Post";
import { User } from "@/typings/User";
import { Wall } from "./Wall";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const [me, user, postsResult] = await Promise.all([
    getWhoami(),
    api<User>(`/users/${params.id}`, {
      method: 'GET'
    }),
    api<PostQueryResult>(`/posts?ownerId=${params.id}`, {
      method: 'GET'
    })
  ])

  return (
    <div>
      <UserMainInfo user={user.data!} className="mb-4" />
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 basis-2/3">
          <Wall
            me={me!.data!}
            initialPosts={postsResult.data!.data}
            onPostPublish={async (message) => {
              'use server';

              const res = await api<Post>('/posts/publish', {
                method: 'POST',
                body: JSON.stringify({
                  message,
                  ownerId: params.id,
                })
              });

              return res.data!;
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
