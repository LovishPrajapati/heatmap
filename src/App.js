import React from "react";
import "./App.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import changes from "./changes.json";
import moment from "moment";

function getDates(startDate) {
  const { counts } = changes;
  var dateArray = [];
  var currentDate = moment(startDate);
  var endDate = new Date();
  while (currentDate <= endDate) {
    if (currentDate.format("YYYY-MM-DD") in counts) {
      dateArray.push({
        date: moment(currentDate).format("YYYY-MM-DD"),
        count: counts[currentDate.format("YYYY-MM-DD")].count,
        changes: counts[currentDate.format("YYYY-MM-DD")].changes,
      });
    } else {
      dateArray.push({
        date: `${moment(currentDate).format("YYYY-MM-DD")}`,
        count: 0,
        changes: [],
      });
    }
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}
function clickHandler(e) {
  if (document.getElementById("container")) {
    document.body.removeChild(document.getElementById("container"));
    document.body.removeChild(document.getElementById("container1"));
  }
  var div = document.createElement("div");
  var div1 = document.createElement("div");
  if (e.changes.length > 0) {
    var ol = document.createElement("ol");
    for (var i = 0; i < e.changes.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = e.changes[i].description;
      ol.appendChild(li);
    }
    div1.appendChild(ol);
  } else {
    var p = document.createElement("p");
    p.innerHTML = `${e.count} changes `;
    div1.appendChild(p);
  }
  var h2 = document.createElement("h2");
  h2.innerHTML = `showing changes occured on ${e?.date}`;
  div.appendChild(h2);
  div.id = "container";
  div1.id = "container1";
  document.body.appendChild(div);
  document.body.appendChild(div1);
}

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Change Heat Map</h1>
        <CalendarHeatmap
          startDate={new Date(changes.startDate)}
          endDate={new Date()}
          showMonthLabels={true}
          showWeekdayLabels={true}
          addGap={true}
          showBorder={true}
          gutterSize={2}
          values={getDates(changes.startDate)}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              "data-tip": `${value.date} has count: ${value.count}`,
            };
          }}
          onClick={clickHandler}
        />
        <div className="footer">
          <h1>Select a box to view Changes for that date</h1>
          <div className="changes"></div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
}

export default App;
