import * as featchat from '@/features/chat/server';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <featchat.components.Messenger>
      {children}
    </featchat.components.Messenger>
  );
}

export const metadata = {
  title: 'Мессенджер',
}

