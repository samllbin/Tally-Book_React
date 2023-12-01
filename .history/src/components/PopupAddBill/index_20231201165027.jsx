import React, { forwardRef, useState } from 'react';
import { Popup, Icon } from 'zarm';
import cx from 'classnames';

import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [payType, setPayType] = useState('expense');

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
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
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
                [s.expense]: true,
                [s.active]: payType == 'income',
              })}
            >
              收入
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
});

export default PopupAddBill;
