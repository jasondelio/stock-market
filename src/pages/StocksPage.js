import NavBar from "../components/NavBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./StocksPage.css";
import { useNavigate } from "react-router-dom";
import { useStocks } from "../Api";
import Loader from "../components/Loader";
import Error from "../components/Error";

function StocksPage() {
  const { stocksRowData, sectorOptions, stocksLoading, stocksApiError } =
    useStocks();
  const [isSearch, setIsSearch] = useState(false);
  const [filteredStocksRowData, setFilteredStocksRowData] = useState([]);
  const [sector, setSector] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const navigate = useNavigate();

  //On click handler for view details action button
  function actionButton(params) {
    navigate(`/quote/?symbol=${params.value}`);
  }

  const columns = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Sector", field: "sector" },
    {
      headerName: "Action",
      field: "symbol",
      sortable: false,
      cellRenderer: (params) => (
        <div>
          <button
            className="view-details-button"
            onClick={() => actionButton(params)}
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  const defColumnDefs = { flex: 1, sortable: true };

  //For updating filteredStocksRowData, every time the value of the symbol and sector are changed
  useEffect(() => {
    if (sector !== null && symbol !== null) {
      const symbolRegex = new RegExp(symbol, "i");
      setFilteredStocksRowData(
        stocksRowData
          .filter((stock) => stock.sector === sector)
          .filter((stock) => symbolRegex.test(stock.symbol))
      );
    } else if (sector === null && symbol !== null) {
      const symbolRegex = new RegExp(symbol, "i");
      setFilteredStocksRowData(
        stocksRowData.filter((stock) => symbolRegex.test(stock.symbol))
      );
    } else if (sector !== null && symbol === null) {
      setFilteredStocksRowData(
        stocksRowData.filter((stock) => stock.sector === sector)
      );
    }
  }, [stocksRowData, symbol, sector]);

  //On changed handler when the values in symbol text field changed
  function symbolHandleChange(event) {
    if (event.target.value !== "") {
      setIsSearch(true);
      setSymbol(event.target.value);
    } else {
      setSymbol(null);
    }

    if (event.target.value === "" && sector === null) {
      setIsSearch(false);
    }
  }

  //On changed handler when the values in sector text field changed
  function sectorHandleChange(event, value) {
    if (value !== null) {
      setIsSearch(true);
      setSector(value.label);
    } else {
      setSector(null);
    }

    if (value === null && symbol === null) {
      setIsSearch(false);
    }
  }

  return (
    <div className="stocks-container">
      <NavBar page="Stocks" />
      {stocksLoading ? (
        <div className="loader-container">
          <Loader size="120px" />
        </div>
      ) : stocksApiError !== null ? (
        <Error message="Reload the page, or if this keeps happening, try again later." />
      ) : (
        <React.Fragment>
          <h1 className="stocks-title">List of Nasdaq Companies</h1>
          <div className="search-container">
            <TextField
              id="search-symbol-input"
              sx={{ width: "50%" }}
              label="Search by symbol"
              variant="outlined"
              onChange={symbolHandleChange}
            />
            <Autocomplete
              disablePortal
              id="combo-box-sector"
              options={sectorOptions}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              sx={{ width: "50%" }}
              renderInput={(params) => <TextField {...params} label="Sector" />}
              onChange={sectorHandleChange}
            />
          </div>
          <div className="ag-theme-balham stocks-table-container">
            <AgGridReact
              columnDefs={columns}
              rowData={isSearch ? filteredStocksRowData : stocksRowData}
              pagination={true}
              paginationPageSize={15}
              defaultColDef={defColumnDefs}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default StocksPage;
