'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/src/shared/lib/utils';

const BottomSheet = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
BottomSheet.displayName = 'BottomSheet';

const BottomSheetTrigger = DrawerPrimitive.Trigger;

const BottomSheetPortal = DrawerPrimitive.Portal;

const BottomSheetClose = DrawerPrimitive.Close;

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black bg-opacity-60', className)}
    {...props}
  />
));
BottomSheetOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <BottomSheetPortal>
    <BottomSheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 px-20 flex h-auto flex-col rounded-t-[24px] bg-white p-4',
        className,
      )}
      {...props}>
      <div className="mx-auto mt-2 w-10 h-1 bg-gray-100 rounded-full" />
      <div>{children}</div>
    </DrawerPrimitive.Content>
  </BottomSheetPortal>
));
BottomSheetContent.displayName = 'BottomSheetContent';

const BottomSheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid  text-center font-semibold', className)} {...props} />
);
BottomSheetHeader.displayName = 'BottomSheetHeader';

const BottomSheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-8 px-16', className)} {...props} />
);
BottomSheetFooter.displayName = 'BottomSheetFooter';

const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
BottomSheetTitle.displayName = DrawerPrimitive.Title.displayName;

const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
BottomSheetDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
};
