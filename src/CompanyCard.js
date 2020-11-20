import React from "react";
import { Link } from "react-router-dom";
import defaultCompanyLogo from "./default-company-logo.jpg";
import "./CompanyCard.css";

function CompanyCard({ company }) {

    return (
        <div className="CompanyCard">
            <Link to={`/companies/${company.handle}`}>
                <div className="CompanyCard-card">
                    <h2>{company.name}
                        <img src={company.logo_url || defaultCompanyLogo} alt={company.handle} />
                    </h2>
                    <p>{company.description}</p>
                </div>
            </Link>
        </div>
    );
}

export default CompanyCard;
