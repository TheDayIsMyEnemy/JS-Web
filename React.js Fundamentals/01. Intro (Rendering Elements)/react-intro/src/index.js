import ReactDOM from 'react-dom';
import './app/styles/index.css';
import './app/styles/app.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(App(), document.getElementById('root'));
registerServiceWorker();
