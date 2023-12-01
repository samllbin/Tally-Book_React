import React, { forwardRef, useEffect, useState } from 'react';
import { Popup, Icon } from 'zarm';
import { get } from '@/utils';
import s from './style.module.less';
import cx from 'classnames';

const PopupType = forwardRef(({ onselect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expenceType, setExpenceType] = useState([]);
  const [incomeType, setIncomeType] = useState([]);

  useEffect(async () => {
    const { data } = await get('/api/type/list');
    setExpenceType(data.filter(i => i.type == 1));
    setIncomeType(data.filter(i => i.type == 2));
  }, []);

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      },
    };
  }

  const choseType = item => {
    setActive(item.id);
    setShow(false);
    onselect(item);
  };

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.PopupType}>
        <div className={s.head}>
          请选择类型
          <span className={s.cross} onClick={() => setShow(false)}>
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </div>
        <div className={s.content}>
          <div
            onClick={() => choseType({ id: 'all' })}
            className={cx({ [s.all]: true, [s.active]: active == 'all' })}
          >
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expense}>
            {expenceType.map((item, index) => (
              <p
                key={index}
                onClick={() => choseType(item)}
                className={cx({ [s.active]: active == item.id })}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className={s.title}>收入</div>
          <div className={s.income}>
            {incomeType.map((item, index) => (
              <p
                key={index}
                onClick={() => choseType(item)}
                className={cx({ [s.active]: active == item.id })}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
});
export default PopupType;
