import Home from '@/view/Home';
import Data from '@/view/Data';
import User from '@/view/User';
import Detail from '@/view/Detail';
import Login from '@/view/Login';
import UserInfo from '@/view/UserInfo';
import Account from '@/view/Account';
import About from '@/view/About';

const Home = import('@/view/Home');

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
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/about',
    component: About,
  },
];

export default routes;
