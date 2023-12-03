import React, { useEffect, useState } from 'react';

import s from './style.module.less';
import { get } from '@/utils';

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { result } = await get('/api/user/getUserInfo');

    setUserInfo(result);
  };
  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：测试</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b>个性签名</b>
          </span>
        </div>
        <img
          className={s.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={'//s.yezgea02.com/1624959897466/avatar.jpeg'}
          alt=""
        />
      </div>
    </div>
  );
};

export default User;
