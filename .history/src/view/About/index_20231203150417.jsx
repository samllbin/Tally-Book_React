import React from 'react';
import { Button } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();
  const submit = () => {};
  return (
    <div>
      <Button className={s.btn} block theme="primary" onClick={submit}></Button>
    </div>
  );
}
