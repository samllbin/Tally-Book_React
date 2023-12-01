import react, { forwardRef, useState } from 'react';
import { Popup } from 'zarm';
import {get} from '@/utils'

const PopupType = forwardRef(({ onselect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expenceType, setExpenceType] = useState([]);
  const [incomeType, setIncomeType] = useState([]);

  const {data} = await get
});
export default PopupType;
