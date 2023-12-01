import react, { forwardRef, useEffect, useState } from 'react';
import { Popup, Icon } from 'zarm';
import { get } from '@/utils';
import s from './style.module.less';

const PopupType = forwardRef(({ onselect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expenceType, setExpenceType] = useState([]);
  const [incomeType, setIncomeType] = useState([]);

  useEffect(async () => {
    const {
      data: { list },
    } = await get('/api/bill/list');

    setExpenceType(list.filter(i => i.type == 1));
    setIncomeType(list.filter(i => i.type == 2));
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
          <Icon
            type="wrong"
            className={s.cross}
            onClick={() => setShow(false)}
          ></Icon>
        </div>
        <div className={s.content}>
          <div
            onClick={() => choseType({ id: 'all' })}
            className={cx({ [s.all]: true, [s.active]: active == 'all' })}
          >
            全部类型
          </div>
        </div>
        <div className={s.expense}>
          {expenceType.map((item, index) => (
            <p key={index} onClick={() => choseType(item)}></p>
          ))}
        </div>
      </div>
    </Popup>
  );
});
export default PopupType;
