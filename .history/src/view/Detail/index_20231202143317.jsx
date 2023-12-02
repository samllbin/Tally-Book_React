import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import qs from 'query-string';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';
import { get } from '@/utils';

const Detail = () => {
  const location = useLocation(); // 获取 locaton 实例，我们可以通过打印查看内部都有些什么内容。
  const { id } = qs.parse(location.search);

  const [detail, setDetail] = useState({});

  console.log('location', location);

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
    </div>
  );
};

export default Detail;
