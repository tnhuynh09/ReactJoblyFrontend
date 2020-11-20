import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import Search from "./Search";
import JobCard from "./JobCard";
import "./Jobs.css";

function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
            let jobsJsonResult = await JoblyApi.getJobs();
            setJobs(jobsJsonResult);
        }

        getJobs();
    }, []);

    async function handleSearch(searchTerm) {
        let jobs = await JoblyApi.getJobs(searchTerm);
        setJobs(jobs);
    }

    return (
        <div className="Jobs">
            <div>
                <Search endpoint="jobs" handleSearch={handleSearch} />
            </div>
            {jobs.length ? (
                <div className="Jobs-card">
                    {jobs.map(job => <JobCard job={job} key={job.id} />)}
                </div>)
                : (
                    <p>Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default Jobs;