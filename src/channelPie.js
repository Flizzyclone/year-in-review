import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import channelData from "./channels.json" //imcomplete DATA!!!

import { dropdownStyles } from "./components/dropdownStyles"

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

const monthlyOptions = [
    { value: 'january', label: 'January'},
    { value: 'february', label: 'February'},
    { value: 'march', label: 'March'},
    { value: 'april', label: 'April'},
    { value: 'may', label: 'May'},
    { value: 'june', label: 'June'},
    { value: 'july', label: 'July'},
    { value: 'august', label: 'August'},
    { value: 'september', label: 'September'},
    { value: 'october', label: 'October'},
    { value: 'november', label: 'November'},
    { value: 'december', label: 'December'},
]

export const groupedOptions = [
  {
    label: "Yearly",
    options: [{value: 'yearly', label: '2020'}]
  },
  {
    label: "Monthly",
    options: monthlyOptions
  }
];

let listData = []
let orderData = []

function sortList(value) {
  listData = []
  orderData = []
  let data = channelData[value]
  let users = channelData.list
  for (var i=0; i < users.length; i++) {
    listData.push(users[i])
  }
  listData = refSort(listData, data)
  orderData = refSort(data, data)
  for (i=0; i < listData.length; i++) {
    listData[i] = i+1 + '.‏‏‎ ' + listData[i]
  }
}

sortList('yearly')

class ChannelPieGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRange:'yearly',
      options: {
          labels: listData,
          plotOptions: {
            pie: {
              expandOnClick: false,
            }
          },
          colors:['#008FFB','#00E396','#FEB019','#FF4560','#775DD0','#3F51B5','#F46036','#D7263D','#4CAF50','#449DD1','#E2C044','#662E9B'],
          chart: {
            id: "channelActivityPie",
            background: '#39393F',
          },
          stroke: {
            show:false,
            colors:['#DFFFFF'],
          },
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
      series: orderData,
    };
  }

  handleChange = selectedTimeRange => {
    this.setState({timeRange: selectedTimeRange.value})
    sortList(selectedTimeRange.value)
    this.setState({
      options: {
        ...this.state.options,
        labels:listData
      }
    })
    this.setState({series:orderData})
  };

  render() {

    return (
      <div>
        <h1 class='bigSectionTitleHeader'>Top Channels Pie Chart</h1>
          <div class="orderedDivWrap redGraphWrap">
          <div id='orderedDiv'>
            <div id='actGraphControls'>
              <Select value={this.timeRange} placeholder={'2020'} onChange={this.handleChange} isSearchable={false} options={groupedOptions} styles={dropdownStyles}/>
            </div> 
            <div className='pieDiv'>
              <Chart options={this.state.options} series={this.state.series} type="pie" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  
export default ChannelPieGraph;
  