import * as featchat from '@/features/chat/server';

export default async function Page(opts: {
  params: {
    id: string;
  }
}) {
  const { id } = opts.params;

  return (
    <featchat.components.Chat id={id} />
  );
}
