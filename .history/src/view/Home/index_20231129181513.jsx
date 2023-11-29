import React, { useState } from 'react';
import { Icon } from 'zarm';
import s from './style.module.less';
import BillItem from '@/components/BillItem';
const Home = () => {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: '25.00',
          date: '1623390740000',
          id: 911,
          pay_type: 1,
          remark: '',
          type_id: 1,
          type_name: '餐饮',
        },
      ],
      date: '2021-06-11',
    },
  ]); // 账单列表
  return (
    <div className={s.home}>
      <div className={s.head}>
        <div className={s.zong}>
          <span className={s.expence}>
            总支出：<b>￥ 200</b>
          </span>
          <span className={s.income}>
            总收入：<b>￥ 500</b>
          </span>
        </div>
        <div className={s.type}>
          <div className={s.left}>
            <span className={s.payType}>
              类型 <ion-icon name="chevron-down-outline" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.date}>
              2023-11 <Icon type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.content}>
        {list.map((item, index) => (
          <BillItem bill={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
