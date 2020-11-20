import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import Alert from "./Alert";
import "./Login.css";

function Login({ setToken }) {
    const history = useHistory();
    const [activeView, setActiveView] = useState("login");
    const initialState = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        errors: []
    }
    const [formData, setFormData] = useState(initialState)

    function setTabViewType(type) {
        if (type != activeView) {
            formData.errors = [];
        }
        setActiveView(type);
    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data;
        let token;

        try {
            if (activeView === "login") {
                data = {
                    username: formData.username,
                    password: formData.password
                };
                token = await JoblyApi.login(data);
            } else {
                data = {
                    username: formData.username,
                    password: formData.password,
                    first_name: formData.first_name || undefined,
                    last_name: formData.last_name || undefined,
                    email: formData.email || undefined
                };
                token = await JoblyApi.register(data);
            }
        } catch (errors) {
            return setFormData(data => ({ ...data, errors }));
        }

        setToken(token);
        history.push("/jobs");
    }

    return (
        <div className="Login">
            <div className="Login-buttonWrapper">
                <button className={`Login-loginBtn ${activeView === "login" ? "Login-tabBtnActive" : ""} `} onClick={() => setTabViewType("login")}>
                    Login
                </button>
                <button className={`Login-signUpBtn ${activeView === "signup" ? "Login-tabBtnActive" : ""} `} onClick={() => setTabViewType("signup")}>
                    Sign up
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {activeView === "login" ? "" : (
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {formData.errors.length ? (
                    <Alert type={"Alert-danger"} messages={formData.errors} />
                ) : null}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
