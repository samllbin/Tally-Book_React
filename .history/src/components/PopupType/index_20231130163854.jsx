import react from 'react';
import { Popup } from 'zarm';

const PopupType = () => {
  return (
    <Popup
      visible={visible.popBottom}
      direction="bottom"
      onMaskClick={() => toggle('popBottom')}
      afterOpen={() => console.log('打开')}
      afterClose={() => console.log('关闭')}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className="popup-box">
        <Button size="xs" onClick={() => toggle('picker')}>
          打开Picker
        </Button>
      </div>
    </Popup>
  );
};
export default PopupType;
