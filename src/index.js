import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import genericUser from './user.png'
import * as serviceWorker from './serviceWorker';

function Header() {
    return(
        <div className="header">
            <h1 className="projectName">Test Project</h1>
            <div className="user">
                <img src={genericUser}/>
                <p>User</p>
            </div>
        </div>
    );
}

ReactDOM.render(<Header />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
