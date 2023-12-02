import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';
import { NavBar } from 'zarm';

export default function Header({ title = '' }) {
  const navigateTo = useNavigate();
  return (
    <div className={s.headerWrap}>
      <div className={s.body}>
        <NavBar className={s.head} />
      </div>
    </div>
  );
}
