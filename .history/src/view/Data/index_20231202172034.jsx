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

  const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [expenseData, setExpenseData] = useState([]); // 支出数据
  const [incomeData, setIncomeData] = useState([]); // 收入数据
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM'));

  useEffect(() => {
    getData();
  }, [currentMonth]);

  // 获取数据详情
  const getData = async () => {
    const { data } = await get(`/api/bill/data?date=${currentMonth}`);

    // 总收支
    setTotalExpense(data.total_expense);
    setTotalIncome(data.total_income);

    // 过滤支出和收入
    const expense_data = data.total_data
      .filter(item => item.pay_type == 1)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
    const income_data = data.total_data
      .filter(item => item.pay_type == 2)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenseData(expense_data);
    setIncomeData(income_data);
  };

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
      <div className={s.structure}>
        <div className={s.head}>
          <span className={s.title}>收支详情</span>
          <div className={s.tab}>
            <span
              onClick={() => setTotalType('expense')}
              className={cx({
                [s.expense]: true,
                [s.active]: totalType == 'expense',
              })}
            >
              支出
            </span>
            <span
              onClick={() => setTotalType('income')}
              className={cx({
                [s.expense]: true,
                [s.active]: totalType == 'income',
              })}
            >
              收入
            </span>
          </div>
        </div>
      </div>
      <PopupDate ref={dateRef} mode="month" onSelect={choseMonth} />
    </div>
  );
};

export default Data;
