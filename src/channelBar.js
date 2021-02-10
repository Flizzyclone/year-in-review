
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import channelData from "./channels.json" // incomplete data

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

const vertHoriz = [
  { value: 'vert', label: 'Vertical'},
  { value: 'horiz', label: 'Horizontal'},
]
  
class ChannelBarGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: null,
      selectedCurve:'vert',
      options: {
          chart: {
              id: "channelActivityBar",
              background: '#39393F',
              toolbar: {
                tools: {
                  pan:false
                }
              }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position:'bottom'
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
              show:true,
              align:'left',
              style: {
                colors:'#CCCCCC',
                fontSize:'14px',
                fontFamily: 'Roboto, Arial, sans-serif',
              }
            },
          },
          tooltip: {
            theme:'dark', 
          },
          responsive: [
            {
              breakpoint: 500,
              options: {
                dataLabels: {
                  enabled:false
                },
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
      },
      series: [
        {
          name: "Messages",
          data: placeholderData
        }
      ]
    };
  }

  changeOrientation = selectedOrientation => {
    this.setState({selectedOrientation: selectedOrientation.label});
    if(selectedOrientation.value === 'vert') {
      this.setState({
        options: {
          ...this.state.options,
          plotOptions: {
            ...this.state.options.plotOptions,
            bar : {
              ...this.state.options.plotOptions.bar,
              horizontal:false
            }
          },
          grid: {
            ...this.state.options.grid,
            show:true
          }
        }
      })
    } else if (selectedOrientation.value === 'horiz') {
      this.setState({
        options: {
          ...this.state.options,
          plotOptions: {
            ...this.state.options.plotOptions,
            bar : {
              ...this.state.options.plotOptions.bar,
              horizontal:true
            }
          },
          grid: {
            ...this.state.options.grid,
            show:false
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
        <h1 id='bigSectionTitleHeader'>Top Channels Bar Graph</h1>
        <div id='activityGraph'>
          <div id='actGraphControls'>
            <Select placeholder={listData[0]} onChange={this.changeChannel} options={users} styles={dropdownUserStyles}/>
            <Select placeholder={'Vertical'} isSearchable={false} onChange={this.changeOrientation} options={vertHoriz} styles={dropdownStyles}/>
          </div> 
          <Chart options={this.state.options} series={this.state.series} type="bar" width="96%" height="90%" />
        </div>
      </div>
    );
  }
}
  
export default ChannelBarGraph;
  