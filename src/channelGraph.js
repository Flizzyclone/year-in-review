
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import channelData from "./channels.json" 

import { dropdownStyles, dropdownUserStyles } from "./components/dropdownStyles"

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
  let i = channelData.list.indexOf(listData[0])
  for (let j=0; j < months.length; j++) {
    let month = months[j].toLowerCase()
    placeholderData.push(channelData[month][i])
  }
}

let listData = []

function sortList(value) {
  listData = []
  let data = channelData[value]
  let users = channelData.list
  for (var i=0; i < users.length; i++) {
    listData.push(users[i])
  }
  listData = refSort(listData, data)
}

sortList('yearly')

getPlaceholderData()

let users = []

for (let i=0; i < listData.length; i++) {
  let toPush = {}
  toPush.value = listData[i]
  toPush.label = listData[i]
  users.push(toPush)
}

const sharpCurvy = [
  { value: 'sharp', label: 'Sharp'},
  { value: 'curved', label: 'Curved'},
]
  
class ChannelLineGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: null,
      selectedCurve:'Sharp',
      options: {
        chart: {
            id: "channelActivityLineGraph",
            background: '#39393F',
            toolbar: {
              tools: {
                pan:false
              }
            }
        },
        xaxis: {
          categories: months,
          labels: {
            style: {
              colors: '#CCCCCC',
              fontSize: '14px',
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
          }
        },
        yaxis: {
          labels: {
            style: {
                colors: '#CCCCCC',
                fontSize: '14px',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 400,
            },
          }
        },
        responsive: [
          {
            breakpoint: 500,
            options: {
              xaxis: {
                labels: {
                  show:false
                }
              },
              yaxis: {
                labels: {
                  show:true,
                  style: {
                    colors: '#CCCCCC',
                    fontSize: '12px',
                    fontFamily: 'Roboto, Arial, sans-serif',
                    fontWeight: 400,
                },
                }
              }
            }
          }
        ],
        tooltip: {
          theme:'dark', 
        }
      },
      series: [
        {
          name: "Messages",
          data: placeholderData
        }
      ]
    };
  }

  changeCurve = selectedCurve => {
    this.setState({selectedCurve: selectedCurve.label});
    if(selectedCurve.value === 'sharp') {
      this.setState({
        options: {
          ...this.state.options,
          stroke: {
            ...this.state.options.stroke,
            curve: 'straight'
          }
        }
      })
    } else if(selectedCurve.value === 'curved') {
      this.setState({
        options: {
          ...this.state.options,
          stroke: {
            ...this.state.options.stroke,
            curve: 'smooth'
          }
        }
      })
    }
  };

  changeChannel = selectedChannel => {
    this.setState({selectedChannel: selectedChannel.value});
    if (channelData.list.indexOf(selectedChannel.value) !== -1) {
      let data = []
      let i = channelData.list.indexOf(selectedChannel.value)
      for (let j=0; j < months.length; j++) {
        let month = months[j].toLowerCase()
        data.push(channelData[month][i])
      }
      let series = [...this.state.series];
      let item = {...series[0]};
      item.data = data;
      series[0] = item;
      this.setState({series});
    }
  };

  render() {

    return (
      <div>
        <h1 id='bigSectionTitleHeader'>Top Channels Line Graph</h1>
        <div id='activityGraph'>
          <div id='actGraphControls'>
            <Select placeholder={listData[0]} onChange={this.changeChannel} options={users} styles={dropdownUserStyles}/>
            <Select placeholder={'Sharp'} isSearchable={false} onChange={this.changeCurve} options={sharpCurvy} styles={dropdownStyles}/>
          </div> 
          <Chart options={this.state.options} series={this.state.series} type="line" width="96%" height="90%" />
        </div>
      </div>
    );
  }
}
  
export default ChannelLineGraph;
  