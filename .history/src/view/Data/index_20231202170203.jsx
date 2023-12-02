import React, { useEffect, useRef, useState } from 'react';
import { Icon, Progress } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import { get, typeMap } from '@/utils';
import CustomIcon from '@/components/CustomIcon';
import PopupDate from '@/components/PopupDate';
import s from './style.module.less';

const Data = () => {
  const dateRef = useRef();
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM'));

  const controlDate = () => {
    dateRef.current && dateRef.current.show();
  };
  const choseMonth = item => {
    setCurrentDate(item);
  };
  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={controlDate}>
          <span>{currentDate}</span>
          <Icon className={s.date} type="date" />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥1000</div>
        <div className={s.income}>共收入¥200</div>
      </div>
    </div>
  );
};

export default Data;
