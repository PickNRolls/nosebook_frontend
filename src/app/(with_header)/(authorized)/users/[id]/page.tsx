import { api } from "@/api";
import { like } from "@/components/like";
import { Post } from "@/components/Post";
import { UserMainInfo } from "@/components/UserMainInfo";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { User } from "@/typings/User";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const [
    user,
    postsResult
  ] = await Promise.all([
    api<User>(`/users/${params.id}`, {
      method: 'GET'
    }),
    api<PostQueryResult>(`/posts?ownerId=${params.id}`, {
      method: 'GET'
    })
  ]);

  return (
    <div>
      <UserMainInfo user={user.data!} />
      <div>
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
    </div>
  );
}
