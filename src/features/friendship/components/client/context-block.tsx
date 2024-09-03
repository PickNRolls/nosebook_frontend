import { FC } from "react";

import * as featuser from '@/features/user/server';

import { Link } from "@/components/link";
import { PageBlock } from "@/components/page-block";


export type ContextBlockProps = {
  id: string;
};

export const ContextBlock: FC<ContextBlockProps> = async (props) => {
  const [
    user,
  ] = await Promise.all([
    featuser.api.findById(props.id),
  ]);

  if (!user.data) {
    return null;
  }

  return (
    <PageBlock>
      <Link view="button-link" href={featuser.profilePageHref(props.id)} className="flex px-[15px] gap-2">
        <featuser.components.Avatar user={user.data} className="border-none size-[34px]" />
        <div className="flex flex-col">
          <featuser.components.Link user={user.data} dropHref />
          <span className="text-neutral-500 text-[12.5px]">перейти к странице</span>
        </div>
      </Link>
    </PageBlock>
  );
}
