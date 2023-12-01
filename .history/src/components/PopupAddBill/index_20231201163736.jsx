import React, { forwardRef, useState } from 'react';
import { Popup } from 'zarm';

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  ref.current = {
    show: () => {
      setShow(true);
    },
    false: () => {
      setShow(false);
    },
  };

  <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  ></Popup>;
});
