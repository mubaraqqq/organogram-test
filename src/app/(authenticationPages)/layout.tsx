import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

import { authOptions } from '../_lib/auth';

export default async function AuthenticationPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  return (
    <main className='flex h-screen flex-col items-center justify-center gap-32'>
      {children}
    </main>
  );
}
