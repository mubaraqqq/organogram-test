import { ReactNode } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='h-screen w-full'>
      <main className='h-full w-full overflow-hidden bg-gray-300'>
        {children}
      </main>
    </div>
  );
}
