import * as featfriend from '@/features/friendship/client';

export default async function Page({ searchParams }: {
  searchParams: {
    id: string;
    section: featfriend.PageSection;
  }
}) {
  return (
    <div className="flex gap-4">
      <div className="basis-[61%]">
        <featfriend.components.ListBlock id={searchParams.id} section={searchParams.section} />
      </div>
      <div className="basis-[39%]">
        <featfriend.components.ContextBlock id={searchParams.id} section={searchParams.section} />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Друзья',
}

