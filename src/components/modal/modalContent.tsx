import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type ModalContentProps = {
  className?: string;
};

const ModalContent: React.FC<ModalContentProps & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <section
      className={cn('mx-auto min-w-[480px] p-8 lg:p-10', [
        className && className,
      ])}
    >
      {children}
    </section>
  );
};

export default ModalContent;
