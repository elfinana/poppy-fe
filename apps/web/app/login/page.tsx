import Image from 'next/image';

export default function page() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* header logo */}
      <header className="w-full flex h-[48px] mb-[40px] items-center justify-center">
        <Image width={80} height={24} src="/login/img-login-logo.svg" alt="login-logo" />
      </header>

      {/* market img */}
      <div className="mb-">
        <Image width={240} height={240} src="/login/img-login-1.svg" alt="login-img" />
      </div>

      <p className="text-center text-gray-900 text-h2">오늘은 어디서 Pop?</p>
      <p className="text-center text-gray-800 text-b3">
        놓치기 싫은 팝업스토어,
        <br />
        지금 Poppy에서 만나보세요.
      </p>

      <div className="w-full">
        <button type="button" className="w-full h-[48px] rounded-xl bg-green relative">
          <Image
            className="absolute top-[4px] left-[8px] "
            width={40}
            height={40}
            src="/login/img-login-naver.svg"
            alt="login-img"
          />
          <span className="text-white text-h3">네이버로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
