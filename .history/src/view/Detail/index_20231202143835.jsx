import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import qs from 'query-string';
import s from './style.module.less';
import { useLocation } from 'react-router-dom';
import { get, typeMap } from '@/utils';
import { cx } from 'classnames';
import CustomIcon from '@/components/CustomIcon';

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
          <sapn
            className={cx({
              [s.expense]: detail.pay_type == 1,
              [s.income]: detail.pay_type == 2,
            })}
          >
            <CustomIcon
              type={detail.type_id ? typeMap[detail.type_id] : 1}
            ></CustomIcon>
          </sapn>
        </div>
      </div>
    </div>
  );
};

export default Detail;
