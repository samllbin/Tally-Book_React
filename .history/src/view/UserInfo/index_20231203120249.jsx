import React from 'react';
import { FilePicker, Button } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function userInfo() {
  const navigateTo = useHistory();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const token = localStorage.getItem('token');
  const handleSelect = file => {
    console.log('file', file);
    let formData = new FormData();
    formData.append('file', file);
  };
  return (
    <div className={s.userInfo}>
      <FilePicker onChange={handleSelect} accept="image/*">
        <Button theme="primary" size="xs">
          点击上传
        </Button>
      </FilePicker>
    </div>
  );
}
