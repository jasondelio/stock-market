import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import "./ChartTab.css";

function ChartTab(props) {
  const chartData = props.chartData;
  const [chartDateFrom, setChartDateFrom] = useState(null);
  const [filteredChartData, setFilteredChartState] = useState(null);
  const [isChartDateFromPicked, setIsChartDateFromPicked] = useState(false);
  const chartOptions = {
    chart: {
      type: "candlestick",
    },
    title: {
      text: props.symbol + " Chart",
      align: "left",
    },
    xaxis: {
      type: "string",
      labels: {
        rotate: 0,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  //For updating the filteredChartData, every time the date picker value is changed
  useEffect(() => {
    if (isChartDateFromPicked) {
      const filteredChartData = chartData.series[0].data.filter(
        (data) => moment(data.x) >= moment(chartDateFrom)
      );
      setFilteredChartState({ series: [{ data: filteredChartData }] });
    }
  }, [chartData, chartDateFrom, isChartDateFromPicked]);

  //On change handler for date picker
  function chartDatePickerHandler(date) {
    setChartDateFrom(date);
    if (date !== null) {
      setIsChartDateFromPicked(true);
    } else {
      setIsChartDateFromPicked(false);
    }
  }

  return (
    <div className="chart-container">
      <h2>Chart (Last 100 Days)</h2>
      <hr />
      <div className="date-picker">
        <DatePicker
          selected={chartDateFrom}
          onChange={chartDatePickerHandler}
          isClearable
          placeholderText="Search date from"
          filterDate={(date) => {
            return moment() > date && moment().subtract(101, "days") < date;
          }}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      {chartData.length !== 0 ? (
        <div className="chart">
          <ReactApexChart
            options={chartOptions}
            series={
              chartDateFrom !== null && filteredChartData !== null
                ? filteredChartData.series
                : chartData.series
            }
            type="candlestick"
            height={350}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ChartTab;
