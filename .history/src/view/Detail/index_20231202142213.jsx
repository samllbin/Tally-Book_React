import React, { useState } from 'react';
import Header from '@/components/Header';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const [detail, setDetail] = useState({});
  const location = useLocation();

  return (
    <div className={s.detail}>
      <Header title="账单详情" />
    </div>
  );
};

export default Detail;
