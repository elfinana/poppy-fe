import { DateLabel, StatusLabel } from '@/src/shared';
import React from 'react';

const tdStyle = 'p-8 text-center item-center';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-8">
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Date</td>
            <td className={tdStyle}>d-day</td>
            <td className={tdStyle}>오픈예정</td>
            <td className={tdStyle}>종료</td>
          </tr>
          <tr>
            <td className={tdStyle}>Label</td>
            <td className={tdStyle}>
              <DateLabel status="operational" daysLeft={123} />
            </td>
            <td className={tdStyle}>
              <DateLabel status="planned" daysLeft={1} />
            </td>
            <td className={tdStyle}>
              <DateLabel status="ended" daysLeft={0} />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className={`text-h1 ${tdStyle}`}>Status</td>
            <td className={tdStyle}>영업중</td>
            <td className={tdStyle}>영업종료</td>
          </tr>
          <tr>
            <td className={tdStyle}>Label</td>
            <td className={tdStyle}>
              <StatusLabel status="operational" />
            </td>
            <td className={tdStyle}>
              <StatusLabel status="closed" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
