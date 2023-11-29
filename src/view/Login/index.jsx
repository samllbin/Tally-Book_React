import React, { useCallback, useState } from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import { post } from '@/utils';
import cx from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import Captcha from 'react-captcha-code';

import s from './style.module.less';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [vecrify, setVecrify] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [type, setType] = useState('login');

  const handCaptchaChange = useCallback(captcha => {
    setCaptcha(captcha);
  }, []);
  const onSubmit = async () => {
    if (!userName) {
      Toast.show('请输入账号');
      return;
    }
    if (!password) {
      Toast.show('请输入密码');
      return;
    }
    try {
      if (type == 'login') {
        const { data } = await post('/api/user/login', {
          userName,
          password,
        });
        // 将 token 写入 localStorage
        localStorage.setItem('token', data.token);
      } else {
        if (!vecrify) {
          Toast.show('请输入验证码');
          return;
        }
        if (vecrify != captcha) {
          Toast.show('验证码错误');
          return;
        }
        const result = await post('/api/user/register', {
          userName,
          password,
        });
        Toast.show(result.msg);
      }
    } catch (error) {
      Toast.show(error.msg);
    }
  };
  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span
          className={type == 'login' ? s.active : null}
          onClick={() => setType('login')}
        >
          登录
        </span>
        <span
          className={type == 'register' ? s.active : null}
          onClick={() => setType('register')}
        >
          注册
        </span>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={value => setUserName(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={value => setPassword(value)}
          />
        </Cell>
        {type == 'register' ? (
          <Cell icon={<CustomIcon type="mima" />}>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={value => setVecrify(value)}
            />
            <Captcha charNum={4} onChange={handCaptchaChange} />
          </Cell>
        ) : null}
      </div>
      <div className={s.operation}>
        {type == 'register' ? (
          <div className={s.agree}>
            <Checkbox />
            <label className="text-light">
              阅读并同意<a>《掘掘手札条款》</a>
            </label>
          </div>
        ) : null}
        <Button block theme="primary" onClick={onSubmit}>
          {type == 'login' ? '登录' : '注册'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
