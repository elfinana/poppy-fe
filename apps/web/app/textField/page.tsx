import { Input, Textarea } from '../../src/shared/index';

type props = {};
export default function page() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Input type="text" label="닉네임" />
      <Textarea />
    </div>
  );
}
