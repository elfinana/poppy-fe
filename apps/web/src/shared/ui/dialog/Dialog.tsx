'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/src/shared/lib/utils';
import { buttonVariants } from '@/src/shared/ui/button';
import { buttonVariants as primaryButtonVariants } from '../buttons/PrimaryButton';
import { cva, VariantProps } from 'class-variance-authority';

const AlertDialog = AlertDialogPrimitive.Root;

export interface DialogTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>,
    VariantProps<typeof primaryButtonVariants> {
  asChild?: boolean;
  variant: 'enabled' | 'disabled';
}

const AlertDialogTrigger = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Trigger>, DialogTriggerProps>(
  ({ className, variant, ...props }, ref) => (
    // <AlertDialogPrimitive.Trigger className={cn(primaryButtonVariants({ variant, className }))} ref={ref} {...props} />
    <AlertDialogPrimitive.Trigger ref={ref} className={className} {...props} />
  ),
);
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed rounded-16 justify-center w-272 left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white shadow-24dp duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col w-full py-28 text-center border-b border-gray-200', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-row w-full justify-center', className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn('text-h3 text-gray-900', className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn('text-b3 text-gray-700', className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const actionButtonVariants = cva('text-b1 px-10 py-12 w-fit', {
  variants: {
    variant: {
      informative: 'text-informative',
      warning: 'text-warning',
    },
  },
});

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    VariantProps<typeof actionButtonVariants> {
  asChild?: boolean;
  variant: 'informative' | 'warning';
  text?: string;
}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant, text, ...props }, ref) => (
  <div className="w-full text-center border-l border-gray-200">
    <AlertDialogPrimitive.Action ref={ref} className={cn(actionButtonVariants({ variant }), className)} {...props}>
      {text ? text : '확인'}
    </AlertDialogPrimitive.Action>
  </div>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const cancelButtonVariants = cva('text-b1 px-10 py-12 w-fit', {
  variants: {
    variant: {
      ghost: 'text-b1 text-gray-400',
    },
  },
});

export interface CancelDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>,
    VariantProps<typeof cancelButtonVariants> {
  asChild?: boolean;
  text?: string;
}

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  CancelDialogActionProps
>(({ className, text, ...props }, ref) => (
  <div className="w-full text-center">
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(cancelButtonVariants({ variant: 'ghost' }), className)}
      {...props}>
      {text ? text : '취소'}
    </AlertDialogPrimitive.Cancel>
  </div>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
