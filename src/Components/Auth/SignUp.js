import React from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { context } from '../../context/notes/State';
import Fetching from '../../FetchIng';
import Alert from '../Alert';
import host from '../../Hosting.js';

export default function SignUp() {

    const alrt = useContext(context);
    const history = useHistory();

    const signUp = async () => {
        let fName = document.getElementById('exampleInputName').value;
        let email = document.getElementById("exampleInputEmail1").value;
        let pass = document.getElementById("exampleInputPassword1").value;
        // console.log(fName,email,pass);
        let data = {
            fullName: fName,
            email: email,
            password: pass
        }
        let url = `${host}/api/auth/signup`;
        let token = await Fetching(url, "POST", data);
        if (token.err)
            alrt.updateAlert("danger", token.err.msg);
        else
        {
            alrt.updateAlert('success',`Welcome Mr. ${fName}, you are successfull registered!`)
            window.localStorage.setItem("authToken", token.authToken);
            history.push("/login")
        }
    }

    return (
        <div className="container my-5">
            <Alert />
            <form>
                <h2>Create An Account Here</h2>
                <div className="mb-3 my-3">
                    <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="exampleInputName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="button" className="btn btn-primary" onClick={signUp}>Submit</button>
            </form>
        </div>
    )
}
