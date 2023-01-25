import { useState, useEffect } from "react";
import moment from "moment";

//Get the list of nasdaq 100 companies by fetching data from FMP API
async function getStocks() {
  let res = await fetch(
    `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.REACT_APP_FMP_API_KEY}`
  );

  let data = await res.json();
  return data.map((stock) => {
    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
    };
  });
}

//Get the a company's overview by fetching data from FMP API
async function getOverview(symbol) {
  let res = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.REACT_APP_FMP_API_KEY}`
  );
  let data = await res.json();
  return data;
}

//Get the company's historical by fetching data from Polygon API
async function getHistorical(symbol) {
  let startDate = moment().subtract(100, "days").format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");

  let res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=desc&limit=120&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`
  );

  let data = await res.json();
  return data.results.map((price) => {
    return {
      date: moment(price.t).format("YYYY-MM-DD"),
      open: price.o.toFixed(2),
      high: price.h.toFixed(2),
      low: price.l.toFixed(2),
      close: price.c.toFixed(2),
      volume: price.v,
    };
  });
}

//Get the stocks row data, sector options, the loading state, and the error message
function useStocks() {
  const [stocksRowData, setStocksRowData] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [stocksLoading, setStocksLoading] = useState(true);
  const [stocksApiError, setStocksApiError] = useState(null);

  //Fetch the data from API and giving timeout to prevent overwhelming the API and avoid the error code 429
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          setStocksRowData(await getStocks());
          setStocksLoading(false);
        } catch (err) {
          setStocksApiError(err);
          setStocksLoading(false);
        }
      })();
    }, 1000);
  }, []);

  //Get all the sector option possibilities from the fetched list of Nasdaq companies data
  useEffect(() => {
    if (stocksRowData.length !== 0) {
      const sectorData = stocksRowData
        .map((stock) => stock.sector)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();

      setSectorOptions(
        sectorData.map((sector) => {
          return {
            label: sector,
          };
        })
      );
    }
  }, [stocksRowData]);

  return {
    stocksRowData,
    sectorOptions,
    stocksLoading,
    stocksApiError,
  };
}

//Get the overview data, the loading state, and the error message
function useOverview(symbol) {
  const [overviewData, setOverviewData] = useState([]);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewApiError, setOverviewApiError] = useState(null);

  //Fetch the data from API and giving timeout to prevent overwhelming the API and avoid the error code 429
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          const data = await getOverview(symbol);
          setOverviewData({
            companyName: data[0].name,
            price:
              typeof data[0].price === "number"
                ? data[0].price.toFixed(2)
                : "N/A",
            changesPercentage:
              typeof data[0].changesPercentage === "number"
                ? data[0].changesPercentage.toFixed(2)
                : "N/A",
            change:
              typeof data[0].change === "number"
                ? data[0].change.toFixed(2)
                : "N/A",
            dayRange:
              typeof data[0].dayLow === "number" &&
              typeof data[0].dayHigh === "number"
                ? data[0].dayLow.toFixed(2) + " - " + data[0].dayHigh.toFixed(2)
                : "N/A",
            yearRange:
              typeof data[0].yearLow === "number" &&
              typeof data[0].yearHigh === "number"
                ? data[0].yearLow.toFixed(2) +
                  " - " +
                  data[0].yearHigh.toFixed(2)
                : "N/A",
            marketCap:
              typeof data[0].marketCap === "number" ? data[0].marketCap : "N/A",
            volume: typeof data[0].volume === "number" ? data[0].volume : "N/A",
            avgVolume:
              typeof data[0].avgVolume === "number" ? data[0].avgVolume : "N/A",
            open:
              typeof data[0].open === "number"
                ? data[0].open.toFixed(2)
                : "N/A",
            previousClose:
              typeof data[0].previousClose === "number"
                ? data[0].previousClose.toFixed(2)
                : "N/A",
            eps:
              typeof data[0].eps === "number" ? data[0].eps.toFixed(2) : "N/A",
            pe: typeof data[0].pe === "number" ? data[0].pe.toFixed(2) : "N/A",
            earningsAnnouncement:
              data[0].earningsAnnouncement !== null
                ? data[0].earningsAnnouncement.split("T")[0]
                : "N/A",
            sharesOutstanding:
              data[0].sharesOutstanding !== null
                ? data[0].sharesOutstanding
                : "N/A",
          });
          setOverviewLoading(false);
        } catch (err) {
          setOverviewApiError(err);
          setOverviewLoading(false);
        }
      })();
    }, 1000);
  }, [symbol]);

  return {
    overviewLoading,
    overviewApiError,
    overviewData,
  };
}

//Get the historical data, chart data, the loading state, and the error message
function useHistorical(symbol) {
  const [historicalRowData, setHistoricalRowData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [historicalLoading, setHistoricalLoading] = useState(true);
  const [historicalApiError, setHistoricalApiError] = useState(null);

  //Fetch the data from API
  useEffect(() => {
    (async () => {
      try {
        setHistoricalRowData(await getHistorical(symbol));
        setHistoricalLoading(false);
      } catch (err) {
        setHistoricalApiError(err);
        setHistoricalLoading(false);
      }
    })();
  }, [symbol]);

  //Get the chart data from the fetched historical price data
  useEffect(() => {
    if (historicalRowData.length !== 0) {
      const data = historicalRowData.map((price) => {
        return {
          x: price.date,
          y: [price.open, price.high, price.low, price.close],
        };
      });

      setChartData({
        series: [{ data: data.reverse() }],
      });
    }
  }, [historicalRowData]);

  return {
    historicalRowData,
    chartData,
    historicalLoading,
    historicalApiError,
  };
}

export { useStocks, useOverview, useHistorical };
