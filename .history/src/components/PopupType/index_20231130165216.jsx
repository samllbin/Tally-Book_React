import react, { forwardRef, useState } from 'react';
import { Popup } from 'zarm';

const PopupType = forwardRef(({ onselect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expenceType, setExpenceType] = useState([]);
});
export default PopupType;
