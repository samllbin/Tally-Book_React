import React from 'react';
import { FilePicker, Button } from 'zarm';
import s from './style.module.less';

export default function userInfo() {
  const handleSelect = file => {
    console.log('file', file);
  };
  return <div className={s.userInfo}></div>;
}
