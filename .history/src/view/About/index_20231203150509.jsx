import React from 'react';
import { Button } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();
  const submit = () => {
    history.goBack();
  };
  return (
    <div>
      <div className={s.title}>好好学习，天天向上</div>
      <Button className={s.btn} block theme="primary" onClick={submit}>
        返回
      </Button>
    </div>
  );
}
