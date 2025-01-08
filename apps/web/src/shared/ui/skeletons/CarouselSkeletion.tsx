import { Skeleton } from '../skeleton';

type Props = {
  variant: 'L' | 'XL';
};

export const CarouselSkeleton = ({ variant }: Props) => {
  if (variant === 'L') {
    return <Skeleton className="w-full rounded-none h-264" />;
  } else {
    return <Skeleton className="w-full h-full rounded aspect-square" />;
  }
};
