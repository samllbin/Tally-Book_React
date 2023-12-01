import react, { forwardRef, useEffect, useState } from 'react';
import { Popup } from 'zarm';
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
      <div className={s.PopupType}></div>
    </Popup>
  );
});
export default PopupType;
