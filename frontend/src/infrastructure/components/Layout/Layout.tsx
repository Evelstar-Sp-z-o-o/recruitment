import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import '../../../styles/main.scss';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';

const Layout: FunctionComponent = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </div>
  );
};

export default Layout;
