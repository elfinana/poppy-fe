import React from 'react';
import { BackDark, PoppyHomeHeader } from '@/public';
import { IconButton } from '@/src/shared';

type Props = {
  title: string;
  edit: boolean;
};

export const ChevronHeader = (props: Props) => {
  return (
    <div className="flex px-16 py-12 w-full fixed top-0 bg-white z-50">
      <div className="inline-flex w-40">
        <button>
          <BackDark />
        </button>
      </div>
      <div className="grow text-center text-h2">{props.title}</div>
      <div className="flex w-40 justify-end items-center text-b1 text-informative">
        {props.edit ? (
          <button>
            <span>편집</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
