import React, { useEffect, useState } from 'react';

import s from './style.module.less';
import { get } from '@/utils';

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = await get('/api/user/getUserInfo');

    setUserInfo(data);
  };
  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{userInfo.userName}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="../../assets/geqian.png"
              alt=""
            />
            <b>{userInfo.signature || '暂无签名'}</b>
          </span>
        </div>
        <img
          className={s.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={userInfo.avatar || ''}
          alt=""
        />
      </div>
    </div>
  );
};

export default User;
