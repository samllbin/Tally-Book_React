import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import qs from 'query-string';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';
import { get } from '@/utils';
import {cx} from "classnames"

const Detail = () => {
  const [detail, setDetail] = useState({});

  const location = useLocation();
  const { id } = qs.parse(location.search);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail?id=${id}`);
    setDetail(data);
  };

  return (
    <div className={s.detail}>
      <Header title="账单详情" />
      <div className={s.card}>
        <div className={s.type}>
          <div className={}></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
