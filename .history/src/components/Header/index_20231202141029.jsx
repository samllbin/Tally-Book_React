import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.less';
import { NavBar, Icon } from 'zarm';

export default function Header({ title = '' }) {
  const history = useHistory();
  return (
    <div className={s.headerWrap}>
      <div className={s.body}>
        <NavBar
          className={s.head}
          left={
            <Icon
              type="arrow-left"
              theme="primary"
              onClick={history.push(-1)}
            />
          }
          title={title}
        />
      </div>
    </div>
  );
}
