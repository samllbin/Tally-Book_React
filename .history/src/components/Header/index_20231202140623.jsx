import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';

export default function Header({ title = '' }) {
  const navigateTo = useNavigate();
  return (
    <div className={s.headerWrap}>
      <div className={s.body}></div>
    </div>
  );
}
