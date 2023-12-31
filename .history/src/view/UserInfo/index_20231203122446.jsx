import React, { useEffect, useState } from 'react';
import { FilePicker, Button, Input } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';
import { get } from '@/utils';
import axios from 'axios';
import { baseUrl } from '@/config';
import Header from '@/components/Header';

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
    const { data } = await get('api/user/getUserInfo');
    setUser(data);
    setAvatar(imgUrlTrans(data.avatar));
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
      setAvatar(imgUrlTrans(data.avatar));
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
    <>
      <Header title="用户信息" />
      <div className={s.userinfo}>
        <h1>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            <img className={s.avatarUrl} src={avatar} alt="" />
            <div className={s.desc}>
              {/* <span>支持 jpg、png、jpeg 格式大小 1MB 以内的图片</span> */}
              <FilePicker
                className={s.filePicker}
                onChange={handleSelect}
                accept="image/*"
              >
                <Button className={s.upload} theme="primary" size="xs">
                  点击上传
                </Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              clearable
              type="text"
              value={signature}
              placeholder="请输入个性签名"
              onChange={value => setSignature(value)}
            />
          </div>
        </div>
        <Button onClick={save} style={{ marginTop: 50 }} block theme="primary">
          保存
        </Button>
      </div>
    </>
  );
}
