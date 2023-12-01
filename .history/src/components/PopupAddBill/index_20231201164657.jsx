import React, { forwardRef, useState } from 'react';
import { Popup, Icon } from 'zarm';
import cx from 'classnames';

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
      <div className={s.addBody}>
        <header className={s.header}>
          <span className={s.close} onClick={() => setShow(false)}>
            <Icon type="wrong" />
          </span>
        </header>
        <div className={s.body}>
          <div className={s.type}>
            <span
              onClick={() => setPayType('expense')}
              className={cx({
                [s.expense]: true,
                [s.active]: payType == 'expense',
              })}
            ></span>
          </div>
        </div>
      </div>
    </Popup>
  );
});

export default PopupAddBill;
