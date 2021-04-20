import { StrictMode, lazy, Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './index.css';
const App = lazy(() => import('./App'))


ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div className="loading">loading</div>}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
