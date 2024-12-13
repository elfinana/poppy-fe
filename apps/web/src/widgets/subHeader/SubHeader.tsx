import React from 'react';
import { IconButton, TextButton } from '@/src/shared';

type Props = {
  label: string;
  text?: string;
  iconButton?: boolean;
};

export const SubHeader = ({ label, text, iconButton }: Props) => {
  return (
    <div className="fixed top-0 z-50 flex justify-between w-full px-16 py-12 bg-white">
      <div className={`flex ${text && 'justify-between'} w-full`}>
        {iconButton && <IconButton className={`${!text && 'absolute'}`} size="md" icon="ic-back" />}
        <p className={`text-center w-full text-black text-h2 ${!text && 'text-center'}`}>{label}</p>
        {text && <TextButton>{text}</TextButton>}
      </div>
    </div>
  );
};
