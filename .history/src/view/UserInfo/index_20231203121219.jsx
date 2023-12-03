import React, { useEffect, useState } from 'react';
import { FilePicker, Button } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';
import { get } from '@/utils';
import axios from 'axios';
import { baseUrl } from '../../config';

export default function userInfo() {
  const hsitory = useHistory();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = get('api/user/getUserInfo');
    setUser(data);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };
  const handleSelect = file => {
    console.log('file', file);
    if (file && file.file.size > 1024 * 1024) {
      Toast.show('上传头像不得超过 1MB ！！');
      return;
    }
    let formData = new FormData();
    formData.append('file', file.file);

    axios({
      method: 'post',
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }).then(res => {
      // 返回图片地址
      setAvatar(res.data);
    });
  };

  const save = async () => {
    const { data } = await post('/api/user/editUserInfo', {
      signature,
      avatar,
    });

    Toast.show('修改成功');
    // 成功后回到个人中心页面
    hsitory.goBack();
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
