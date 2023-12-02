import React, { useState } from 'react';
import Header from '@/components/Header';
import qs from 'query-string';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const [detail, setDetail] = useState({});

  const location = useLocation();
  const id = qs.parse(location.search);

  return (
    <div className={s.detail}>
      <Header title="账单详情" />
    </div>
  );
};

export default Detail;
