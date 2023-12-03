// router/index.js
import Home from '@/view/Home';
import Data from '@/view/Data';
import User from '@/view/User';
import Detail from '@/view/Detail';
import Login from '@/view/Login';
import UserInfo from '@/view/UserInfo';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/data',
    component: Data,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/detail',
    component: Detail,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/userInfo',
    component: UserInfo,
  },
];

export default routes;
