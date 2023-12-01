import react, { forwardRef, useEffect, useState } from 'react';
import { Popup } from 'zarm';
import { get } from '@/utils';

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
});
export default PopupType;
