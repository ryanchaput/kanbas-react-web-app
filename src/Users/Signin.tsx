import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from './client';
import * as client from './client';
export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: '', username: '', password: '', role: '', firstName: '', lastName: '', dob: new Date(), email: ''
    });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div>
            <h1>Sign in to Kanbas!</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="user-input">Username</label>
                    <input className="form-control" id="user-input" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="password-input">Password</label>
                    <input className="form-control" id="password-input" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                </div>
                <button className="btn btn-primary" onClick={signin}> Sign In</button>
            </form>
            <Link to="/Kanbas/Account/Signup">Sign Up</Link>
        </div>
    )
}