import "./OverviewTab.css";

function OverviewTab(props) {
  return (
    <div className="overview-container">
      <h2>Overview</h2>
      <hr />
      <table className="overview-table">
        <tbody>
          <tr>
            <td>Prev. Close</td>
            <th>{props.previousClose}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Open</td>
            <th>{props.open}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Volume</td>
            <th>{props.volume}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Avg. Volume</td>
            <th>{props.avgVolume}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Day's Range</td>
            <th>{props.dayRange}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>52-Week Range</td>
            <th>{props.yearRange}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Market Cap</td>
            <th>{props.marketCap}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>P/E Ratio</td>
            <th>{props.pe}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>EPS</td>
            <th>{props.eps}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Shares Outstanding</td>
            <th>{props.sharesOutstanding}</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Next Earnings Date</td>
            <th>{props.earningsAnnouncement}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OverviewTab;
