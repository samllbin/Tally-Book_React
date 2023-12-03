import React, { useEffect, useState } from 'react';

import s from './style.module.less';
import { get } from '@/utils';
import { useHistory } from 'react-router-dom';

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = await get('/api/user/getUserInfo');

    setUserInfo(data);
  };

  const history = useHistory();
  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{userInfo.userName}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
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
      <div className={s.content}>
        <Cell
          hasArrow
          title="用户信息修改"
          onClick={() => history.push('/userinfo')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/gxqm.png"
              alt=""
            />
          }
        />
        <Cell
          hasArrow
          title="重制密码"
          onClick={() => history.push('/account')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/zhaq.png"
              alt=""
            />
          }
        />
        <Cell
          hasArrow
          title="关于我们"
          onClick={() => history.push('/about')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615975178434/lianxi.png"
              alt=""
            />
          }
        />
      </div>
    </div>
  );
};

export default User;
