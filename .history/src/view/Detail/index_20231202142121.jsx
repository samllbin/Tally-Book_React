import React, { useState } from 'react';
import Header from '@/components/Header';
import s from './style.module.less';

const Detail = () => {
  const [detail, setDetail] = useState;()
  return (
    <div className={s.detail}>
      <Header title="账单详情" />
    </div>
  );
};

export default Detail;
