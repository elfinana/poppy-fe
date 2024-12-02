import {
  PrimaryButton,
  SecondaryButton,
  SecondaryXSButton,
  TextButton,
  FilterIconButton,
  FocusIconButton,
  ToggleButton,
  LikeIconButton,
  CheckboxButton,
  DropdownButton,
} from '@/src/shared';
import { Checkbox } from '@/src/shared/ui/checkbox';
import React from 'react';

type Props = {};

const tdStyle = 'p-8 text-center';

const page = (props: Props) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-8">
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Primary</td>
            <td className={tdStyle}>XLarge</td>
            <td className={tdStyle}>Large</td>
            <td className={tdStyle}>Medium</td>
          </tr>
          <tr>
            <td className={tdStyle}>Default</td>
            <td className={tdStyle}>
              <PrimaryButton size="xl">예약하기</PrimaryButton>
            </td>
            <td className={tdStyle}>
              <PrimaryButton size="lg">예약하기</PrimaryButton>
            </td>
            <td className={tdStyle}>
              <PrimaryButton size="md">예약하기</PrimaryButton>
            </td>
          </tr>
          <tr>
            <td className={tdStyle}>Disabled</td>
            <td className={tdStyle}>
              <PrimaryButton variant="disabled" size="xl">
                예약하기
              </PrimaryButton>
            </td>
            <td className={tdStyle}>
              <PrimaryButton variant="disabled" size="lg">
                예약하기
              </PrimaryButton>
            </td>
            <td className={tdStyle}>
              <PrimaryButton variant="disabled" size="md">
                예약하기
              </PrimaryButton>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto mt-8">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Secondary</td>
            <td className={tdStyle}>Small</td>
            <td className={tdStyle}>XSmall</td>
            <td className={tdStyle}>Medium</td>
          </tr>
          <tr>
            <td className={tdStyle}>Default</td>
            <td className={tdStyle}>
              <SecondaryButton>초기화</SecondaryButton>
            </td>
            <td className={tdStyle}>
              <SecondaryButton size="sm">수정하기</SecondaryButton>
            </td>
            <td className={tdStyle}>
              <SecondaryXSButton>공식 홈페이지</SecondaryXSButton>
            </td>
          </tr>
          <tr>
            <td className={tdStyle}>Disabled</td>
            <td className={tdStyle}>
              <SecondaryButton variant="disabled">초기화</SecondaryButton>
            </td>
            <td className={tdStyle}>
              <SecondaryButton variant="disabled" size="sm">
                수정하기
              </SecondaryButton>
            </td>
            <td className={tdStyle}>
              <SecondaryXSButton variant="disabled">공식 홈페이지</SecondaryXSButton>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto mt-8">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Text</td>
            <td className={tdStyle}>Type</td>
          </tr>
          <tr>
            <td className={tdStyle}>Left</td>
            <td className={tdStyle}>
              <TextButton>최근 등록순</TextButton>
            </td>
          </tr>
          <tr>
            <td className={tdStyle}>Underline</td>
            <td className={tdStyle}>
              <TextButton variant="underline">개인정보 수집 · 이용</TextButton>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto mt-8">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Icon</td>
            <td className={tdStyle}>Filter</td>
            <td className={tdStyle}>Focus</td>
            <td className={tdStyle}>Like</td>
          </tr>
          <tr>
            <td className={tdStyle}>Active</td>
            <td className={tdStyle}>
              <FilterIconButton variant="active" />
            </td>
            <td className={tdStyle}>
              <FocusIconButton variant="active" />
            </td>
            <td className={tdStyle}>
              <LikeIconButton variant="active" value={1} />
            </td>
          </tr>
          <tr>
            <td className={tdStyle}>Inactive</td>
            <td className={tdStyle}>
              <FilterIconButton variant="inactive" />
            </td>
            <td className={tdStyle}>
              <FocusIconButton variant="inactive" />
            </td>
            <td className={tdStyle}>
              <LikeIconButton variant="inactive" value={12} />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto mt-8">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Select</td>
            <td className={tdStyle}>Toggle</td>
            <td className={tdStyle}>Checkbox</td>
            <td className={tdStyle}>Dropdown</td>
            <td className={tdStyle}>Radio-16</td>
            <td className={tdStyle}>Radio-20</td>
          </tr>
          <tr>
            <td className={tdStyle}>Active</td>
            <td className={tdStyle}>
              <ToggleButton checked={true} />
            </td>
            <td className={`${tdStyle} justify-items-center`}>
              <CheckboxButton checked={true} />
            </td>
            <td className={tdStyle}>
              <DropdownButton value="11.21(목)" variant="active" />
            </td>
          </tr>
          <tr>
            <td className={tdStyle}>Inactive</td>
            <td className={tdStyle}>
              <ToggleButton />
            </td>
            <td className={`${tdStyle} justify-items-center`}>
              <CheckboxButton />
            </td>
            <td className={tdStyle}>
              <DropdownButton value="날짜" variant="inactive" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
