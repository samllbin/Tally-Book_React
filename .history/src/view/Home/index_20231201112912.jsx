import React, { useState, useEffect, useRef } from 'react';
import { Pull } from 'zarm';
import s from './style.module.less';
import dayjs from 'dayjs';
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils';

import BillItem from '@/components/BillItem';
import PopupType from '@/components/PopupType';
import PopupDate from '@/components/PopupDate';
import CustomIcon from '@/components/CustomIcon';
const Home = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [list, setList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

  const [totalExpence, setTotalExpence] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const typeRef = useRef(null);
  const dateRef = useRef(null);
  const [currentSelect, setCurrentSelect] = useState({});

  useEffect(() => {
    getBillList(); // 初始化
  }, [page, currentSelect, currentTime]);

  // 获取账单方法
  const getBillList = async () => {
    const { data } = await get(
      `/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${
        currentSelect.id || 'all'
      }`,
    );
    // 下拉刷新，重制数据
    if (page == 1) {
      setList(data.list);
    } else {
      setList(list.concat(data.list));
    }
    setTotalExpence(data.totalExpense?.toFixed(2));
    setTotalIncome(data.totalIncome?.toFixed(2));
    setTotalPage(data.totalPage);
    // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };

  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) {
      setPage(1);
    } else {
      getBillList();
    }
  };

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  };

  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show();
  };
  const monthToggle = () => {
    dateRef.current && dateRef.current.show();
  };

  const select = item => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发刷新列表，将分页重制为 1
    setPage(1);
    setCurrentSelect(item);
  };

  const selectMonth = item => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item);
  };
  const addToggle = () => {
    // do something
  };

  return (
    <div className={s.home}>
      <div className={s.head}>
        <div className={s.zong}>
          <span className={s.expence}>
            总支出：<b>￥ {totalExpence}</b>
          </span>
          <span className={s.income}>
            总收入：<b>￥ {totalIncome}</b>
          </span>
        </div>
        <div className={s.type}>
          <div className={s.left} onClick={toggle}>
            <span className={s.payType}>
              {currentSelect.name || '全部类型'}
              <ion-icon name="chevron-down-outline" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.date} onClick={monthToggle}>
              {currentTime} <ion-icon name="chevron-down-outline" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.content}>
        {list.length ? (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData,
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData,
            }}
          >
            <div className={s.dcb}>
              {list.map((item, index) => (
                <BillItem bill={item} key={index} />
              ))}
            </div>
          </Pull>
        ) : null}
      </div>
      <div className={s.add}>
        <div className={s.add} onClick={addToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
            <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" />
          </svg>
        </div>
      </div>
      <PopupType ref={typeRef} onselect={select} />
      <PopupDate ref={dateRef} mode="month" onSelect={selectMonth} />
    </div>
  );
};

export default Home;
