import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import '../../styles/main.scss';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';

const Layout: FunctionComponent = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
        {/* <Outlet /> */}
      </main>
    </div>
  );
};

export default Layout;
