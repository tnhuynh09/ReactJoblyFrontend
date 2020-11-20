import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import Search from "./Search";
import CompanyCard from "./CompanyCard";
import "./Companies.css";

function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            let companyJsonResult = await JoblyApi.getCompanies();
            setCompanies(companyJsonResult);
        }

        getCompanies();
    }, []);

    async function handleSearch(searchTerm) {
        let companies = await JoblyApi.getCompanies(searchTerm);
        setCompanies(companies);
    }

    return (
        <div className="Companies">
            <div>
                <Search endpoint="companies" handleSearch={handleSearch} />
            </div>
            {companies.length ? (
                <div className="Companies-card">
                    {companies.map(company => (
                        <CompanyCard key={company.handle} company={company} />
                    ))}
                </div>)
                : (
                    <p>Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default Companies;