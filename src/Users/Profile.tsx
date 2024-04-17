import * as client from './client';
import { User } from './client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState<User>({
        _id: '', username: '', password: '', role: "USER", firstName: '', lastName: '', dob: new Date(), email: ""
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const save = async () => {
        await client.updateUser(profile);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />
                    <input value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    
                    <select onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
            )}
            <button className="btn btn-primary" onClick={save}>
                Save
            </button>
            <button className="btn btn-danger" onClick={signout}>
                Signout
            </button>
        </div>
    );
}
/*
<input value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />
                    <input value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />
                    <input type="date" value={profile.dob.toString()} onChange={(e) =>
                        setProfile({ ...profile, dob: new Date(e.target.value) })} />
                    <input value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />
*/