import React from 'react';
import { Button } from 'zarm';

export default function About() {
  return (
    <div>
      <Button className={s.btn} block theme="primary" onClick={submit}></Button>
    </div>
  );
}
