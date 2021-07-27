import React from 'react'
import './App.css';
import CalendarHeatmap from 'react-calendar-heatmap'; 
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import data from './26-11-2020.json';



function App() {

  
const today=new Date();
const description=data.map((data)=> 
    data.description
  )
console.log(description)
// let array=[]
// for (let i=0;i<description.length;i++){
//   array.push(description[i].desc);
// }
// console.log(array[0])
// console.log(array[1])




// console.log(description)
// const lengthdesc=description.length;
// console.log(lengthdesc);



  return (
    <div className="App">
      <div className="header">
      <h1>Change Heat Map</h1>
      <CalendarHeatmap
  startDate={new Date('2020-08-01')}
  endDate={today}
  showMonthLabels={true}
  showWeekdayLabels={true}
  addGap={true}
  showBorder={true}
  gutterSize={2}
  values={[

    { date: '2021-01-05', count: 4},
    { date: '2020-12-24', count: 2 },
    { date: '2020-08-14', count: 1},
    { date: '2020-11-26', count: 3,change:description },
    { date: '2020-12-14', count: 2},
    { date: '2020-12-01', count: 4 },
    { date: '2021-01-07', count: 1 },
    { date: '2021-06-020', count: 3}
  ]}
  classForValue={value => {
    if (!value) {
      return 'color-empty';
    }
    return `color-github-${value.count}`;
  }}
  tooltipDataAttrs={e => {
    if(e.count>0){
    return {
      'data-tip':`${e.count} Changes on ${e.date}`
    };}
    else{
      return{
      'data-tip':`0 Changes`
    };}
  }}
  onClick={(e) => {
    console.log(e)
  // var result=(!e.change ? `${e.count} changes found` :e.change);
   var div=document.createElement("div");
   var div1=document.createElement("div");
  
   if(e.change){
      var ol=document.createElement("ol");
      for(var i=0;i<e?.change.length;i++){
        var li=document.createElement("li")
        li.innerHTML=e?.change[i]
        ol.appendChild(li)
      }
   div1.appendChild(ol)

   }else{
    var p=document.createElement("p");
    p.innerHTML=`${e.count} changes `;
    div1.appendChild(p)
    console.log(e)
   }
  //  p.innerHTML=`${result}`;
  
   var h2=document.createElement("h2");
   h2.innerHTML=`showing changes occured on ${e.date}`;
   div.appendChild(h2)
  //  div1.appendChild(p)
   div.id='container';
   div1.id='container1';
  document.body.appendChild(div);
  document.body.appendChild(div1)
  // console.log(`date: ${e.date} desc: ${e.change}`)
  }
  }
/>
<div className="footer">
    <h1>Select a box to view Changes for that date</h1>
    <div className="changes">

    </div>
  </div>
<ReactTooltip/>
</div>
    </div>
  );
}

export default App;
