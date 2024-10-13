import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Main_layout from './main_page.js'
import Login_page from './Apps/Login/login_page.js'

import Tables from './Apps/Main_post/table/table.js'
import Test_one from './Apps/Main_post/test.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main_page_view()
{
  const [login, set_login] = useState(false);
  const user_id = useRef();

  if (login == false)
  {
    return (
      <Login_page set_login={set_login} login_id={user_id}/>
    )
  }
  else
  {
    return (
      <Main_layout login_id={user_id.current}/>
    )
  }

}

root.render(
  <React.StrictMode>
    <Main_page_view/>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
