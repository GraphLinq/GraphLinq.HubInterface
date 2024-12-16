import Select from "@components/Select";
import "./style.scss";

import SEO from "@components/SEO";
import { useState } from "react";
import InputText from "@components/InputText";
import LaunchpadCard from "@components/LaunchpadCard/LaunchpadCard";
import useLaunchpad from "../../composables/useLaunchpad";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadPage() {
  const projects = [
    "0xA71A6DF9510Cb226bdb271E4d727bd7472e149d0",
    "0x28A922134968AD9171b9C44B6b65202f96b57223",
    "0xBf41BCB3C961C552648541f18F284584C294A529",
    "0xbC9d87D7Eb9dDc6C3e26bCcba40f9F10E349F0A2",
  ];
  const projectStatuses = ["All", "Active", "Failed", "Terminated", "Owned"];
  const [activeStatus, setActiveStatus] = useState(0);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  useLaunchpad();

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
            <div className="main-card-desc">TODO DESC</div>
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
