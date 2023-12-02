import React, { useEffect, useRef, useState } from 'react';
import { Icon, Progress } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import { get, typeMap } from '@/utils';
import CustomIcon from '@/components/CustomIcon';
import PopupDate from '@/components/PopupDate';
import s from './style.module.less';

let proportionChart = null; // 用于存放 echart 初始化返回的实例
const Data = () => {
  const dateRef = useRef();

  const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [expenseData, setExpenseData] = useState([]); // 支出数据
  const [incomeData, setIncomeData] = useState([]); // 收入数据
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM'));
  const [pieType, setPieType] = useState('expense');

  useEffect(() => {
    getData();
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose();
    };
  }, [currentDate]);

  // 获取数据详情
  const getData = async () => {
    const { data } = await get(`/api/bill/data?date=${currentDate}`);

    // 总收支
    setTotalExpense(data.total_expense);
    setTotalIncome(data.total_income);

    // 过滤支出和收入
    const expense_data = data.total_account
      .filter(item => item.pay_type == 1)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
    const income_data = data.total_account
      .filter(item => item.pay_type == 2)
      .sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenseData(expense_data);
    setIncomeData(income_data);

    setPieChart(pieType == 'expense' ? expense_data : income_data);
  };
  // 切换饼图收支类型
  const changePieType = type => {
    setPieType(type);
  };
  useEffect(() => {
    // 重绘饼图
    setPieChart(pieType == 'expense' ? expenseData : incomeData);
  }, [pieType]);

  const controlDate = () => {
    dateRef.current && dateRef.current.show();
  };
  const choseMonth = item => {
    setCurrentDate(item);
  };

  const setPieChart = data => {
    if (window.echarts) {
      proportionChart = echarts.init(document.getElementById('proportion'));
      console.log(proportionChart);

      proportionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        // 图例
        legend: {
          data: data.map(item => item.type_name),
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map(item => {
              return {
                value: item.number,
                name: item.type_name,
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  };
  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={controlDate}>
          <span>{currentDate}</span>
          <Icon className={s.date} type="date" />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥{totalExpense}</div>
        <div className={s.income}>共收入¥{totalIncome}</div>
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
                [s.income]: true,
                [s.active]: totalType == 'income',
              })}
            >
              收入
            </span>
          </div>
        </div>
        <div className={s.content}>
          {(totalType == 'expense' ? expenseData : incomeData).map(item => (
            <div key={item.type_id} className={s.item}>
              <div className={s.left}>
                <div className={s.type}>
                  <span
                    className={cx({
                      [s.expense]: totalType == 'expense',
                      [s.income]: totalType == 'income',
                    })}
                  >
                    <CustomIcon
                      type={item.type_id ? typeMap[item.type_id].icon : 1}
                    />
                  </span>
                  <span className={s.name}>{item.type_name}</span>
                </div>
                <div className={s.progress}>
                  <span className="icon">￥</span>
                  {Number(item.totalNumber).toFixed(2) || 0}
                </div>
              </div>
              <div className={s.right}>
                <div className={s.percent}>
                  <Progress
                    shape="line"
                    percent={Number(
                      (item.totalNumber /
                        Number(
                          totalType == 'expense' ? totalExpense : totalIncome,
                        )) *
                        100,
                    ).toFixed(2)}
                    theme="primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.proportion}>
          <div className={s.head}>
            <span className={s.title}>收支构成</span>
            <div className={s.tab}>
              <span
                onClick={() => changePieType('expense')}
                className={cx({
                  [s.expense]: true,
                  [s.active]: pieType == 'expense',
                })}
              >
                支出
              </span>
              <span
                onClick={() => changePieType('income')}
                className={cx({
                  [s.income]: true,
                  [s.active]: pieType == 'income',
                })}
              >
                收入
              </span>
            </div>
          </div>
          <div id="proportion"></div>
        </div>
      </div>
      <PopupDate ref={dateRef} mode="month" onSelect={choseMonth} />
    </div>
  );
};

export default Data;