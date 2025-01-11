'use client';

import * as React from 'react';
import { cn } from '@/src/shared/lib/utils';
import { IconButton } from './buttons/IconButton';
import { useNickNameCheck } from 'store/login/loginStore';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  variantType?: 'default' | 'search';
  existingName?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**@description placeholder 대신 기본적으로 입력될 텍스트 */
  /**@description ex) 검색 후 이동된 화면에서 keyword를 유지하고 싶을 경우 */
  defaultText?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      variantType = 'default',
      onClick,
      onChange,
      existingName,
      defaultText = '',
      ...props
    },
    ref,
  ) => {
    const { nickNameCheck } = useNickNameCheck();
    const [inputValue, setInputValue] = React.useState<string>(defaultText);
    const [charCount, setCharCount] = React.useState<number>(0);
    const [message, setMessage] = React.useState<string>('');
    const [messageColor, setMessageColor] = React.useState<string>('text-warning');
    // console.log(nickNameCheck);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setCharCount(value.length);
      onChange?.(e);

      if (value.length > 10) {
        setMessage('10자 이내로 입력해 주세요.');
        setMessageColor('text-warning');
      } else {
        setMessage('');
        setMessageColor('text-warning');
      }
    };
    const handleClear = () => {
      if (variantType === 'default') {
        setInputValue('');
        setCharCount(0);
        setMessage('');
        inputRef.current?.focus();
      } else if (onClick) {
        onClick();
      }
    };
    React.useEffect(() => {
      if (nickNameCheck) {
        setMessage('이미 사용 중인 닉네임입니다.');
        setMessageColor('text-warning');
      }
    }, [nickNameCheck, inputValue]);

    return (
      <div className="w-full">
        {label && (
          <div className="text-gray-800 text-b2 pl-[4px]">
            {label} <span className="text-warning">*</span>
          </div>
        )}
        <div className="relative w-full mt-[8px]">
          <input
            type={type}
            ref={ref || inputRef}
            value={inputValue}
            onChange={handleChange}
            placeholder={variantType === 'search' ? '팝업스토어명 검색' : '닉네임을 입력해주세요'}
            className={cn(
              'flex h-[48px] w-full placeholder-gray-300 rounded-md pl-[12px] pr-[34px] py-[14px] border border-gray-200 focus-visible:outline-none focus-visible:border-blue-500 md:text-sm',
              className,
            )}
            {...props}
          />

          <IconButton
            className={`absolute transform -translate-y-1/2 top-1/2 right-[12px] cursor-pointer  ${variantType === 'search' || charCount > 0 ? '' : 'invisible'}`}
            icon={variantType === 'default' ? 'ic-delete' : 'ic-search'}
            size={variantType === 'search' ? 'md' : 'sm'}
            onClick={handleClear}
          />
        </div>
        {variantType === 'default' && (
          <div className="flex items-center justify-between mt-[8px]">
            <div className={`text-sm ${messageColor}`}>{message && <span>{message}</span>}</div>
            <div className="text-sm text-gray-300 text-c2">
              <span className={` ${!charCount ? 'text-gray-300' : charCount <= 10 ? 'text-blue-500' : 'text-warning'}`}>
                {charCount}
              </span>
              /10
            </div>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export { Input };
