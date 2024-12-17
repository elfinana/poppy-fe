'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SubHeader } from '@/src/widgets';
import { IconButton, PrimaryButton, Textarea } from '@/src/shared';
import Camera from '../../public/icons/ic-camera.svg';
import Delete from '../../public/icons/ic-delete.svg';
import { useState, useRef } from 'react';

export default function Page() {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const isButtonEnabled = textareaValue.length > 20;

  return (
    <div className="flex flex-col items-center w-full h-full px-[16px]">
      {/* Header */}
      <SubHeader iconButton label="리뷰 남기기" />

      {/* Content Area */}
      <div className="flex flex-col w-full h-full pt-[64px]">
        {/* Card Area */}
        <div className="flex gap-x-[12px]">
          <Image width={64} height={64} src="/images/img-info-1.png" alt="info-img" />
          <div className="flex flex-col gap-y-[8px]">
            <span className="text-gray-900 text-h4">오둥이의 아르바이트</span>
            <div className="flex flex-col text-b5">
              <span className="text-gray-400">
                일정 <span className="text-gray-700 ml-[6px]">2024. 11. 18(월) 오후 1:30</span>
              </span>
              <span className="text-gray-400">
                인원 <span className="text-gray-700 ml-[6px]">2명</span>
              </span>
            </div>
          </div>
        </div>

        <hr className="mt-[16px] mb-[20px]" />

        {/* Star Area */}
        <div className="flex flex-col gap-y-[8px] mb-[32px]">
          <span className="text-gray-900 text-h4">방문하신 팝업스토어, 어떠셨나요?</span>
          <div className="flex gap-x-[4px]">
            <IconButton icon={'ic-star-active'} size={'xlg'} />
            <IconButton icon={'ic-star-active'} size={'xlg'} />
            <IconButton icon={'ic-star-active'} size={'xlg'} />
            <IconButton icon={'ic-star-active'} size={'xlg'} />
            <IconButton icon={'ic-star'} size={'xlg'} />
          </div>
        </div>

        {/* Review Area */}
        <div className="mb-[12px]">
          <span className="text-gray-900 text-h4">리뷰 작성</span>
          <div className="flex">
            <div className="flex items-center gap-x-[8px] mr-[8px]">
              {/* Button Area */}
              <div className="w-[80px] h-[80px] flex border border-gray-100 rounded-4">
                <button
                  className="flex flex-col items-center justify-center w-full h-full"
                  type="button"
                  onClick={handleButtonClick}>
                  <Camera />
                  <span className="text-gray-400 text-c1">{selectedImages.length} / 5</span>
                </button>
              </div>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Scrollable Image Previews */}
            {selectedImages.length > 0 && (
              <div className="flex overflow-x-auto gap-x-[8px]">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0 w-[80px] h-[80px]">
                    <Image
                      src={image}
                      alt={`preview-${index}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full rounded-4"
                    />
                    <button
                      className="absolute top-[4px] right-[4px]   "
                      type="button"
                      onClick={() => handleRemoveImage(index)}>
                      <Delete />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Textarea Area */}
        <Textarea
          placeholder="방문하신 팝업스토어의 후기를 남겨주시면, 다른 사용자들에게도 도움이 됩니다."
          onChange={handleTextareaChange}
        />
      </div>

      {/* Footer */}
      <footer className="w-full py-[8px]">
        <PrimaryButton
          variant={isButtonEnabled ? 'enabled' : 'disabled'}
          disabled={!isButtonEnabled}
          onClick={() => {}}>
          작성 완료
        </PrimaryButton>
      </footer>
    </div>
  );
}
