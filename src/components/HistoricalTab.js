import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "./HistoricalTab.css";

function HistoricalTab(props) {
  const historicalRowData = props.historicalRowData;
  const historicalColumns = [
    { headerName: "Date", field: "date" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volume", field: "volume" },
  ];

  const defColumnDefs = { flex: 1, sortable: true };
  const [historicalDateFrom, setHistoricalDateFrom] = useState(null);
  const [filteredHistoricalData, setFilteredHistoricalData] = useState([]);
  const [isHistoricalDateFromPicked, setIsHistoricalDateFromPicked] =
    useState(false);

  //For updating the filteredHistoricalData, every time the date picker value is changed
  useEffect(() => {
    if (isHistoricalDateFromPicked) {
      setFilteredHistoricalData(
        historicalRowData.filter(
          (price) => moment(price.date) >= moment(historicalDateFrom)
        )
      );
    }
  }, [historicalDateFrom, historicalRowData, isHistoricalDateFromPicked]);

  //On change handler for date picker
  function historicalDatePickerHandler(date) {
    setHistoricalDateFrom(date);
    if (date !== null) {
      setIsHistoricalDateFromPicked(true);
    } else {
      setIsHistoricalDateFromPicked(false);
    }
  }

  return (
    <div className="historical-container">
      <h2>Historical Data (Last 100 Days)</h2>
      <hr />
      <div className="date-picker">
        <DatePicker
          selected={historicalDateFrom}
          onChange={historicalDatePickerHandler}
          isClearable
          placeholderText="Search date from"
          filterDate={(date) => {
            return moment() > date && moment().subtract(101, "days") < date;
          }}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="ag-theme-balham historical-table-container">
        <AgGridReact
          columnDefs={historicalColumns}
          rowData={
            historicalDateFrom === null
              ? historicalRowData
              : filteredHistoricalData
          }
          pagination={true}
          paginationPageSize={15}
          defaultColDef={defColumnDefs}
        />
      </div>
    </div>
  );
}

export default HistoricalTab;
