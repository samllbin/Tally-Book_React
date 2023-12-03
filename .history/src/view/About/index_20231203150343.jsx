import React from 'react';
import { Button } from 'zarm';
import s from './style.module.less';

export default function About() {
  return (
    <div>
      <Button className={s.btn} block theme="primary" onClick={submit}></Button>
    </div>
  );
}
