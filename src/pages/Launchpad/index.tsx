import Select from "@components/Select";
import "./style.scss";
import Spinner from "@assets/icons/spinner.svg?react";
import SearchEmpty from "@assets/icons/search-empty.svg?react";

import SEO from "@components/SEO";
import { useState } from "react";
import InputText from "@components/InputText";
import LaunchpadCard from "@components/LaunchpadCard/LaunchpadCard";
import useLaunchpad from "../../composables/useLaunchpad";
import { getFundraisers } from "../../queries/api";
import { useQuery } from "@tanstack/react-query";

const seoTitle =
  "Launchpad | GLQ GraphLinq Chain Smart Contract | GraphLinq.io";
const seoDesc =
  "View tokens, transactions, balances, source code, and analytics for the Pool smart contract on GLQ Smart Chain.";

function LaunchpadPage() {
  const projectStatuses = [
    "All",
    "Active",
    "Finalized",
    "Failed",
    "Terminated",
  ];
  const [activeStatus, setActiveStatus] = useState(0);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");

  useLaunchpad();

  const qFundraisers = useQuery({
    queryKey: ["fundraisers", activeStatus, search],
    queryFn: ({ signal }) => getFundraisers({ activeStatus, search }, signal),
  });

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
                  Projects{" "}
                  <span>{qFundraisers.data && qFundraisers.data.length}</span>
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

        {qFundraisers.data && qFundraisers.data.length ? (
          <div className="launchpad-list">
            {qFundraisers.data.map((fundraiser) => (
              <LaunchpadCard fundraiser={fundraiser} />
            ))}
          </div>
        ) : (
          <>
            {qFundraisers.isLoading ? (
              <div className="launchpad-list-empty">
                <div className="launchpad-empty">
                  <div className="launchpad-empty-info">
                    <Spinner />
                    <div className="launchpad-empty-label">
                      Loading projects...
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="launchpad-empty">
                <div className="launchpad-empty-info">
                  <SearchEmpty />
                  <div className="launchpad-empty-label">No projects found</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LaunchpadPage;
