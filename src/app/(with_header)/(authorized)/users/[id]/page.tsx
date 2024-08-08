import { api } from "@/api";
import { like } from "@/components/like";
import { Post } from "@/components/Post";
import { UserMainInfo } from "@/components/UserMainInfo";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const [
    user,
    postsResult
  ] = await Promise.all([
    api(`/users/${params.id}`, {
      method: 'GET'
    }).then(res => res.json()),
    api(`/posts?ownerId=${params.id}`, {
      method: 'GET'
    }).then(res => res.json() as Promise<PostQueryResult>)
  ]);

  return (
    <div>
      <UserMainInfo user={user} />
      <div>
        {postsResult.data.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLikeClick={async (post) => {
              'use server';

              return like(post.id);
            }} />
        ))}
      </div>
    </div>
  );
}
