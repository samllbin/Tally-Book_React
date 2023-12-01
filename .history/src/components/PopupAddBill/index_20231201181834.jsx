import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Popup, Keyboard } from 'zarm';
import cx from 'classnames';

import s from './style.module.less';
import dayjs from 'dayjs';
import PopupDate from '../PopupDate';
import { get } from '@/utils';

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [payType, setPayType] = useState('expense');
  const [time, setTime] = useState(new Date());
  const [amount, setAmount] = useState([]);

  const [currentType, setCurrentType] = useState('');
  const [expenseType, setExpenseType] = useState([]);
  const [incomeType, setIncomeType] = useState([]);

  useEffect(async () => {
    const {
      data: { list },
    } = await get('/api/type/list');

    const _Expense = list.filter(item => item.type == 1);
    const _Income = list.filter(item => item.type == 2);
    setExpenseType(_Expense);
    setIncomeType(_Income);
    setCurrentType(_Expense[0]);
  });

  const dateRef = useRef(null);

  const selectDate = date => {
    setTime(date);
  };
  ref.current = {
    show: () => {
      setShow(true);
    },
    false: () => {
      setShow(false);
    },
  };

  const handleMoney = value => {
    value = String(value);

    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1);
      setAmount(_amount);
      return;
    }

    if (value == 'ok') {
      return;
    }
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return;
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (
      value != '.' &&
      amount.includes('.') &&
      amount &&
      amount.split('.')[1].length >= 2
    )
      return;
    setAmount(amount + value);
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
        <div className={s.filter}>
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
          <div
            className={s.time}
            onClick={() => dateRef.current && dateRef.current.show()}
          >
            {dayjs(time).format('MM-DD')}{' '}
            <svg
              width={15}
              height={15}
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 184l144 144 144-144"
              />
            </svg>
          </div>
        </div>
        <div className={s.money}>
          <span className={s.sufix}>¥</span>
          <span className={cx(s.amount, s.animation)}>{amount}</span>
        </div>
        <div className={s.choseType}>
            <div className={s.typeBody}>
                {
                    (payType == 'expense'? expenseType: incomeType).map((item) => <div><div/>)
                }
            </div>
        </div>
        <Keyboard type="price" onKeyClick={value => handleMoney(value)} />
        <PopupDate ref={dateRef} onSelect={selectDate} />
      </div>
    </Popup>
  );
});

export default PopupAddBill;
