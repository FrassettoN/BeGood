import App from './App';
import { createRoot } from 'react-dom/client';
import './style/main.css';
import store from './redux/store';
import { Provider } from 'react-redux';

export const projectName = 'BeGood';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
