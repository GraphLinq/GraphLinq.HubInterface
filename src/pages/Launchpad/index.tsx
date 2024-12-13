import Select from "@components/Select";
import "./style.scss";

import SEO from "@components/SEO";
import { useState } from "react";
import InputText from "@components/InputText";
import LaunchpadCard from "@components/LaunchpadCard/LaunchpadCard";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadPage() {
  const projects = ["0x1", "0x2", "0x3", "0x4"];
  const projectStatuses = ["All", "Active", "Failed", "Terminated", "Owned"];
  const [activeStatus, setActiveStatus] = useState(0);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  const resetFeedback = () => {
    setError("");
    setPending("");
    setSuccess("");
  };

  const handleSelectChange = (active: number) => {
    resetFeedback();
    setActiveStatus(active);
  };

  const handleSearchChange = (val: string) => {
    resetFeedback();
    setSearch(val);
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />
      <div className="main-page launchpad">
        <div className="main-card">
          <div className="main-card-title">Launchpad</div>
          <div className="main-card-content">
            <div className="main-card-desc">TODO</div>
            <div className="launchpad-filters">
              <div className="launchpad-filters-left">
                <div className="launchpad-filters-title">
                  Projects <span>{projects.length}</span>
                </div>
              </div>

              <div className="launchpad-filters-right">
                <Select
                  active={activeStatus}
                  options={projectStatuses.map((status) => (
                    <>{status}</>
                  ))}
                  onChange={(active) => handleSelectChange(active)}
                />
                <InputText
                  placeholder="Search by name..."
                  value={search}
                  onChange={(val) => handleSearchChange(val)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="launchpad-list">
          {projects.map((address) => (
            <LaunchpadCard address={address} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LaunchpadPage;
