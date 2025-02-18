import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #eee'
      }}>
        <Link to="/" style={{ marginRight: '1rem' }}>首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 