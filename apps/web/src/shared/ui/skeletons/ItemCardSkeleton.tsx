import { Skeleton } from '../skeleton';

type Props = {
  variant: 'list' | 'gallery' | 'rank' | 'smlist' | 'imageFull';
};

export const ItemCardSkeleton = ({ variant }: Props) => {
  const getDimensions = (variant: string) => {
    switch (variant) {
      case 'list':
        return { width: 160, height: 160 };
      case 'gallery':
        return { width: 168, height: 168 };
      case 'rank':
        return { width: 192, height: 248 };
      case 'smlist':
        return { width: 136, height: 136 };
      case 'imageFull':
        return { width: '100%', height: '100%' };
      default:
        return { width: 160, height: 160 };
    }
  };

  let { width, height } = getDimensions(variant);

  return (
    <div className="flex flex-col gap-y-8">
      <div className={variant === 'imageFull' ? 'aspect-square' : ''}>
        <Skeleton style={{ width: width, height: height }} />
      </div>
      <div>
        <Skeleton className="h-[52px]" />
      </div>
      <div>
        <Skeleton className="w-[72px] h-24" />
      </div>
    </div>
  );
};
