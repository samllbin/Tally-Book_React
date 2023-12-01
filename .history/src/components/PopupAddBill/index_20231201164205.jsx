import React, { forwardRef, useState } from 'react';
import { Popup } from 'zarm';

import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [payType, setPayType] = useState('expense');

  ref.current = {
    show: () => {
      setShow(true);
    },
    false: () => {
      setShow(false);
    },
  };

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.addBody}></div>
    </Popup>
  );
});

export default PopupAddBill;
