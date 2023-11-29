import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import routes from '@/router';
import NavBar from '@/components/NavBar';

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const needNav = ['/', '/data', '/user'];
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]); // [] 内的参数若是变化，便会执行上述回调函数=
  return (
    <ConfigProvider primaryColor={'#007fff'}>
      <>
        <Switch>
          {routes.map(route => (
            <Route exact key={route.path} path={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
        <NavBar showNav={showNav} />
      </>
    </ConfigProvider>
  );
};

export default App;
