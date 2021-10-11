import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { context } from '../../context/notes/State';
import Fetching from '../../FetchIng';
import Alert from '../Alert';
import host from '../../Hosting.js';

export default function Login() {
    const alrt = useContext(context);
    const history = useHistory();
    const login = async (e) => {
        e.preventDefault();
        let email = document.getElementById("exampleInputEmail1").value;
        let pass = document.getElementById("exampleInputPassword1").value;
        let data = {
            email: email,
            password: pass
        }
        let token = await Fetching(`${host}/api/auth/login`, "POST", data);
        // console.log(token);
        window.localStorage.setItem('authToken', token.authToken)
        if (token.err) {
            alrt.updateAlert("danger", token.err);
        }
        else {
            history.push("/");
            alrt.setIsLogin({...alrt.isLogin,login:true});
        }

    }
    return (
        <div className="container my-5">
            <form onSubmit={login}>
                <Alert />
                <h2>Login Here....</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}