import React, { useState, useContext, useEffect } from "react";
import Alert from "./Alert";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import "./Profile.css";

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        photo_url: currentUser.photo_url || "",
        username: currentUser.username,
        password: "",
        errors: [],
        saveConfirmed: false
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value,
            errors: []
        }))
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            let data = {
                first_name: formData.first_name || undefined,
                last_name: formData.last_name || undefined,
                email: formData.email || undefined,
                photo_url: formData.photo_url || undefined,
                password: formData.password
            };
            let username = formData.username;

            let updatedUser = await JoblyApi.saveProfile(username, data);
            setFormData(data => ({
                ...data,
                password: "",
                errors: [],
                saveConfirmed: true,
            }));
            setCurrentUser(updatedUser);
        } catch (errors) {
            setFormData(data => ({ ...data, errors }));
        }
    }

    useEffect(() => {
        if (formData.errors.length || formData.saveConfirmed) {
            setTimeout(() => {
                if (formData.errors.length) {
                    setFormData(data => ({ ...data, errors: [] }));
                } else if (formData.saveConfirmed) {
                    setFormData(data => ({ ...data, saveConfirmed: false }));
                }
            }, 3000);
        }
    }, [formData]);

    return (
        <div className="Profile">
            <h2 className="Profile-title">Profile</h2>
            <form>
                <label>Username</label>
                <p>{formData.username}</p>

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

                <label htmlFor="photo_url">Photo URL</label>
                <input
                    id="photo_url"
                    type="text"
                    name="photo_url"
                    value={formData.photo_url}
                    onChange={handleChange}
                />

                <label htmlFor="password">Re-enter Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {formData.errors.length ? (
                    <Alert type={"Alert-danger"} messages={formData.errors} />
                ) : null}

                {formData.saveConfirmed ? (
                    <Alert type={"Alert-success"} messages={["User updated successfully."]} />
                ) : null}

                <button onClick={handleSubmit} type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default Profile;
