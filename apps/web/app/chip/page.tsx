import { ChoiceChipGroup, ChoiceChipGroupItem, DateLabel, StatusLabel } from '@/src/shared';
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
    </div>
  );
};

export default page;
