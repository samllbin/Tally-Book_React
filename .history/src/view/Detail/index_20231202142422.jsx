import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import qs from 'query-string';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';
import { get } from '@/utils';

const Detail = () => {
  const [detail, setDetail] = useState({});

  const location = useLocation();
  const id = qs.parse(location.search);

  useEffect(() => {
    getDetail(id);
  }, []);

const getDetail(id){
  const {data} = await get("/api/bill/detail?id")
}

  return (
    <div className={s.detail}>
      <Header title="账单详情" />
    </div>
  );
};

export default Detail;
