import React, { forwardRef, useState, useRef } from 'react';
import { Popup, Icon } from 'zarm';
import cx from 'classnames';

import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [payType, setPayType] = useState('expense');
  const [time, setTime] = useState(new Date());

  const dateRef = useRef(null);
  ref.current = {
    show: () => {
      setShow(true);
    },
    false: () => {
      setShow(false);
    },
  };

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.addBody}>
        <header className={s.header}>
          <span className={s.close} onClick={() => setShow(false)}>
            <svg
              width={25}
              height={25}
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </span>
        </header>
        <div className={s.body}>
          <div className={s.type}>
            <span
              onClick={() => setPayType('expense')}
              className={cx({
                [s.expense]: true,
                [s.active]: payType == 'expense',
              })}
            >
              支出
            </span>
            <span
              onClick={() => setPayType('income')}
              className={cx({
                [s.income]: true,
                [s.active]: payType == 'income',
              })}
            >
              收入
            </span>
          </div>
          <div className={s.time}></div>
        </div>
      </div>
    </Popup>
  );
});

export default PopupAddBill;
