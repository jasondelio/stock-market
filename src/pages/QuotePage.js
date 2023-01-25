import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import React from "react";
import "./QuotePage.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useOverview, useHistorical } from "../Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Tabs from "../components/Tabs";
import OverviewTab from "../components/OverviewTab";
import ChartTab from "../components/ChartTab";
import HistoricalTab from "../components/HistoricalTab";

function QuotePage() {
  const [params] = useSearchParams();
  const symbol = params.get("symbol");
  const { overviewLoading, overviewApiError, overviewData } =
    useOverview(symbol);

  const {
    historicalRowData,
    chartData,
    historicalLoading,
    historicalApiError,
  } = useHistorical(symbol);

  return (
    <div className="quote-container">
      <NavBar />
      {overviewLoading || historicalLoading ? (
        <div className="loader-container">
          <Loader size="120px" />
        </div>
      ) : overviewApiError !== null || historicalApiError !== null ? (
        <Error
          message={
            <p>
              Reload the page, or if this keeps happening, return to{" "}
              <a href="/stocks">Stocks Page</a>, or try again later.
            </p>
          }
        />
      ) : (
        <React.Fragment>
          <div className="quote-header">
            <h1>
              {symbol !== null
                ? `${overviewData.companyName} (${symbol})`
                : "Stock symbol not found!"}
            </h1>
            <hr />
            <h2>{overviewData.price} USD</h2>
            <p
              className={
                overviewData.change < 0
                  ? "price-down"
                  : overviewData.change > 0
                  ? "price-up"
                  : "price-same"
              }
            >
              {overviewData.change > 0
                ? "+" + overviewData.change
                : overviewData.change}{" "}
              (
              {overviewData.changesPercentage > 0
                ? "+" + overviewData.changesPercentage
                : overviewData.changesPercentage}
              %)
              {overviewData.change < 0 ? (
                <ArrowDownwardIcon
                  sx={{ verticalAlign: "middle", fontSize: 18 }}
                />
              ) : overviewData.change > 0 ? (
                <ArrowUpwardIcon
                  sx={{ verticalAlign: "middle", fontSize: 18 }}
                />
              ) : (
                "="
              )}
            </p>
          </div>
          <Tabs>
            <OverviewTab index={1} label="Overview" {...overviewData} />
            <ChartTab
              index={2}
              label="Chart"
              symbol={symbol}
              chartData={chartData}
            />
            <HistoricalTab
              index={3}
              label="Historical"
              historicalRowData={historicalRowData}
            />
          </Tabs>
        </React.Fragment>
      )}
    </div>
  );
}

export default QuotePage;
