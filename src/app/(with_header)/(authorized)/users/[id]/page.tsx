import { api } from "@/api";
import { PostForm } from "@/components/PostForm";
import { PostWall } from "@/components/PostWall";
import { ProfileBlock } from "@/components/ProfileBlock";
import { UserMainInfo } from "@/components/UserMainInfo";
import { getWhoami } from "@/getWhoami";
import { Post } from "@/typings/posts/Post";
import { User } from "@/typings/User";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const me = await getWhoami();
  const user = await api<User>(`/users/${params.id}`, {
    method: 'GET'
  });

  return (
    <div>
      <UserMainInfo user={user.data!} className="mb-4" />
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 basis-2/3">
          <PostForm
            me={me!.data!}
            onSubmit={async message => {
              'use server';

              const res = await api<Post>('/posts/publish', {
                method: 'POST',
                body: JSON.stringify({
                  message,
                  ownerId: params.id,
                })
              });
            }}
          />
          <PostWall userId={user.data!.id} />
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
