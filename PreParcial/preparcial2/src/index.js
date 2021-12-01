import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import ListMovies from "./components/listMovies";
import {IntlProvider} from "react-intl";
import mensages_es from "./locales/es.json"
import message_en from "./locales/en.json"

const language = navigator.language.split(/[-_]/)[0];

const messages = {
  'es': mensages_es,
  'en': message_en
};

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <ListMovies />
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
