import React, { useContext } from 'react'
import { Link ,useHistory,useLocation} from 'react-router-dom'
import { context } from '../context/notes/State'

export default function Navbar() {
    const {isLogin,setIsLogin} = useContext(context);
    let history=useHistory();

    const logout = ()=>{
        window.localStorage.removeItem("authToken");
        setIsLogin({login:false,homeAlert:0})
        history.push("/login");
    }

    // console.log(isLogin)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/welcome">Re-Minder</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLogin.login?<li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">MyNotes</Link>
                        </li>:null}
                        <li className="nav-item">
                            <Link className={`nav-link ${useLocation().pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    {!isLogin.login?<div className="container text-end">
                        <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup">Sigup</Link>
                    </div>:<div className="container text-end">
                        <button className="btn btn-primary mx-2" onClick={logout}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}
