import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import "./Home.css";

function Home() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <h1> Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            {currentUser ? (<h4>Welcome Back!</h4>) : (
                <Link to="/login">
                    Log in
                </Link>
            )}
        </div>
    );
}

export default Home;
