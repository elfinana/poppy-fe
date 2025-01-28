'use client';

import { ChipListItem } from '@/src/entities';
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

const Page = (props: Props) => {
  const [recentlySearched, setRecentlySearched] = React.useState([
    { id: 0, text: '일둥이' },
    { id: 1, text: '이둥이' },
  ]);

  const deleteChipsHandler = (chip: ChipListItem) => {
    setRecentlySearched(recentlySearched.filter(val => val.id !== chip.id));
    // 삭제 API 요청
  };

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
              {recentlySearched.map((item, idx) => (
                <InputChip key={`CHIP_${idx}`} value={item.id} text={item.text} onDelete={deleteChipsHandler} />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Page;
