import React from 'react';
import { FilePicker, Button } from 'zarm';
import s from './style.module.less';

export default function userInfo() {
  const navigateTo = useNavigate(); // 路由实例
  const [user, setUser] = useState({}); // 用户
  const [avatar, setAvatar] = useState(''); // 头像
  const [signature, setSignature] = useState(''); // 个签
  const token = localStorage.getItem('token'); // 登录令牌
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
