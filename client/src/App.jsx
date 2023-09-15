import './App.css';
import { NotificationsProvider } from './providers/notification-provider';

function App() {
  return (
    <NotificationsProvider>
      <div className="App">
        Homepage
      </div>
    </NotificationsProvider>
  );
}

export default App;
