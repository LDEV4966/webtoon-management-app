import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = async () =>{
        await authService.signOut();
        history.push("/");
    }
    return (
        <div>
            My Profile
            <button onClick ={onLogOutClick}>Log out</button>
        </div>
    )
}

export default Profile;