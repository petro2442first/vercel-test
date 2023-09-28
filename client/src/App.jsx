import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/sidebar/sidebar';
import { ShowNotification } from './components/show-notification/show-notification';

import './App.css';

function App() {
  return (
    <div className="page">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>

        <ShowNotification />
    </div>
  );
}

export default App;
