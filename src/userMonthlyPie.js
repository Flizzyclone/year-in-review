import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import userData from "./users.json" 

import { dropdownUserStyles } from "./components/dropdownStyles"

let months = ['January','February','March','April','May','June','July','August','September','October','November','December']

function refSort (targetData, refData) { //i found this on stack overflow somewhere
  // Create an array of indices [0, 1, 2, ...N].
  var indices = Object.keys(refData);

  // Sort array of indices according to the reference data.
  indices.sort(function(indexA, indexB) {
    if (refData[indexA] > refData[indexB]) {
      return -1;
    } else if (refData[indexA] < refData[indexB]) {
      return 1;
    }
    return 0;
  });

  // Map array of indices to corresponding values of the target array.
  return indices.map(function(index) {
    return targetData[index];
  });
}

const placeholderData = []

function getPlaceholderData() {
  let i = userData.list.indexOf(listData[0])
  for (let j=0; j < months.length; j++) {
    let month = months[j].toLowerCase()
    placeholderData.push(userData[month][i])
  }
}

let listData = []
let idData = []

function sortList(value) {
  listData = []
  idData = []
  let data = userData[value]
  let users = userData.list
  let ids = userData.id
  for (var i=0; i < users.length; i++) {
    listData.push(users[i])
  }
  listData = refSort(listData, data)
  idData = refSort(ids, data)
}

sortList('yearly')

getPlaceholderData()

let users = []

for (let i=0; i < listData.length; i++) {
  let toPush = {}
  toPush.value = idData[i]
  toPush.label = listData[i]
  users.push(toPush)
}

class UserPieGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        timeRange:'yearly',
        labels: months,
        plotOptions: {
          pie: {
            expandOnClick: false,
          }
        },
        chart: {
          id: "userMonthlyPie",
          background: '#39393F',
        },
        stroke: {
          show:false,
          colors:['#DFFFFF'],
        },
        colors:['#008FFB','#00E396','#FEB019','#FF4560','#775DD0','#3F51B5','#F46036','#D7263D','#4CAF50','#449DD1','#E2C044','#662E9B'],
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            let percent = w.globals.seriesPercent[seriesIndex]
            percent = Number(percent)
            percent = percent.toFixed(2)
            return (
              '<div class="chartTooltip">' +
              '<p class="tooltipMonth">' +
              w.globals.seriesNames[seriesIndex] +
              '</p><p class="tooltipData">' +
              w.globals.series[seriesIndex] + ' - ' + percent + '%' +
              "</p>" +
              "</div>"
            );
          }
        },
        dataLabels: {
          enabled:false,
        },
        legend: {
          show:false
        }
      },
      series: placeholderData,
    };
  }

  handleChange = selectedUser => {
    this.setState({timeRange: selectedUser.value})
    if (userData.id.indexOf(selectedUser.value) !== -1) {
      let data = []
      let i = userData.id.indexOf(selectedUser.value)
      for (let j=0; j < months.length; j++) {
        let month = months[j].toLowerCase()
        data.push(userData[month][i])
      }
      this.setState({series:data})
    }
  };

  render() {

    return (
      <div>
        <h1 id='bigSectionTitleHeader'>Top Users Monthly Messages</h1>
        <div id='orderedDiv'>
          <div id='actGraphControls'>
            <Select placeholder={listData[0]} onChange={this.handleChange} options={users} styles={dropdownUserStyles}/>
          </div> 
          <div className='pieDiv'>
            <Chart options={this.state.options} series={this.state.series} type="pie" width="100%" height="100%" />
          </div>
        </div>
      </div>
    );
  }
}
  
export default UserPieGraph;
  