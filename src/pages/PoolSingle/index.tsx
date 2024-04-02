import Button from "@components/Button";
import "./style.scss";
import {
  SITE_NAME,
} from "@constants/index";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

import useChains from "../../composables/useChains";
import useNetwork from "../../composables/useNetwork";

const seoTitle = `${SITE_NAME} — Pool`;

function PoolSinglePage() {
  const { address: account } = useAccount();
  const { isGLQChain } = useChains();
  const { switchToGraphLinqMainnet } = useNetwork();
  const { id: poolId } = useParams();

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="twitter:title" content={seoTitle} />
      </Helmet>
      <div className="main-page pool">
        <div className="main-card">
          <div className="main-card-title">Pool</div>
          <div className="main-card-content">
            <div className="main-card-desc">
              Your liquidity position will appear here.
            </div>

            <div>id : {poolId}</div>

            {!account ? (
              <>
                <div className="main-card-notlogged">
                  Please connect to manage your pool.
                </div>
              </>
            ) : (
              <>
                {isGLQChain ? (
                  <>
                    <div>PoolSingle</div>
                    <div>id : {poolId}</div>
                  </>
                ) : (
                  <>
                    <div className="main-card-wrongnetwork">
                      Please switch to GLQ Chain network to manage your pools.
                      <Button onClick={switchToGraphLinqMainnet}>
                        Switch to GLQ Chain network
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PoolSinglePage;
