import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface PaddedContainerProps extends PropsWithChildren {
  className?: string;
  isScrollable?: boolean;
}

const PaddedContainer = ({
  children,
  className,
  isScrollable = false,
}: PaddedContainerProps) => {
  return (
    <div
      className={cn(
        'px-4 pb-6 pt-12 lg:px-7 xl:px-10',
        [isScrollable && 'h-full w-full overflow-y-auto overflow-x-hidden'],
        [className && className]
      )}
    >
      {children}
    </div>
  );
};

export default PaddedContainer;
