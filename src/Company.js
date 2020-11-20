import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";
import UserContext from "./UserContext";
import "./Company.css";

function Company() {
    const { handle } = useParams();
    const { currentUser } = useContext(UserContext);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        async function getCompany() {
            let companyJsonResult = await JoblyApi.getCompany(handle);
            // companyJsonResult.jobs.map(companyJob => {
            //     currentUser.jobs.map(userJob => {
            //         if (companyJob.id === userJob.id) {
            //             companyJob.state = "applied";
            //         }
            //     });
            // });
            setCompany(companyJsonResult);
        }

        getCompany();
    }, [handle, currentUser]);

    return (
        <div className="Company">
            <div className="Company-title">
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            <div className="Company-jobs">
                {company.jobs && company.jobs.map(job => (<JobCard key={job.id} job={job} />))}
            </div>
        </div>
    );
}

export default Company;
