import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./app/store/Store";
import {HashRouter} from "react-router-dom";
import './i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);


reportWebVitals();