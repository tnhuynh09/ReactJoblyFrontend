import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import JoblyApi from "./JoblyApi";
import "./JobCard.css";

function JobCard({ job }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    let [, setState] = useState();
    function handleUpdate() {
        //passing empty object will re-render the component
        //replacement of forceUpdate()
        setState({});
    }

    async function handleApply() {
        let id = job.id;
        let applicationResult = await JoblyApi.applyToJob(id);
        if (applicationResult === "applied") {
            job.state = "applied";
            currentUser.jobs.push(job);
            handleUpdate();
            setCurrentUser(currentUser);
        }
    }

    return (
        <div className="JobCard">
            <h3 className="JobCard-title">{job.title}</h3>
            <h3 className="JobCard-info">Salary: {job.salary}</h3>
            <h3 className="JobCard-info">Equity: {job.equity}</h3>
            {(job.state === "applied") ? <button>APPLIED</button> :
                <button onClick={handleApply}>
                    APPLY
            </button>}
        </div>
    );
}

export default JobCard;
