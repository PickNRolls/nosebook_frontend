import * as featchat from '@/features/chat/server';

export default async function Page({ searchParams }: {
  searchParams: {
    interlocutorId?: string;
  }
}) {
  const { interlocutorId } = searchParams;
  if (!interlocutorId) {
    return (
      null
    );
  }

  const [
    chats
  ] = await Promise.all([
    featchat.api.findByFilter({
      interlocutorId,
    }),
  ]);

  const chat = chats.data?.data.length ? chats.data.data[0] : null;
  if (!chat) {
    return <featchat.components.Chat newChatWithInterlocutorId={interlocutorId} />;
  }

  return (
    <featchat.components.Chat id={chat.id} />
  );
}
