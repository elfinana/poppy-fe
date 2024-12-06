import {
  ChoiceChipGroup,
  ChoiceChipGroupItem,
  DateLabel,
  FilterChipGroup,
  FilterChipGroupItem,
  StatusLabel,
} from '@/src/shared';
import { InputChip } from '@/src/shared/ui/chips/InputChip';
import React from 'react';

const tdStyle = 'p-8 text-center item-center';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-8">
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Choice</td>
            <td className={tdStyle}>
              <ChoiceChipGroup>
                <ChoiceChipGroupItem value="all">전체</ChoiceChipGroupItem>
                <ChoiceChipGroupItem value="done">예약완료</ChoiceChipGroupItem>
                <ChoiceChipGroupItem value="canceled">예약취소</ChoiceChipGroupItem>
              </ChoiceChipGroup>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Filter</td>
            <td className={tdStyle}>
              <FilterChipGroup>
                <FilterChipGroupItem variant="enabled" value="1100" text="오전 11:00" />
                <FilterChipGroupItem variant="enabled" value="1130" text="오전 11:30" />
                <FilterChipGroupItem variant="disabled" value="1200" text="오후 12:00" />
              </FilterChipGroup>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Input</td>
            <td className={tdStyle}>
              <InputChip value="odungi" text="오둥이" />
              <InputChip value="odungiparttime" text="오둥이의 아르바이트" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
