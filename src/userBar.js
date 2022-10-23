import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import userData from "./users.json" // no data, working with placeholders

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
  let i = userData.id.indexOf(idData[0])
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

const vertHoriz = [
  { value: 'vert', label: 'Vertical'},
  { value: 'horiz', label: 'Horizontal'},
]
  
class UserLineGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedUser:null,
      selectedOrientation:'vert',
      options: {
          chart: {
              id: "userActivityBar",
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
          grid: {
            borderColor: '#818386',
            strokeDashArray: 20,
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

  changeUser = selectedUser => {
    this.setState({selectedUser: selectedUser.value});
    if (userData.id.indexOf(selectedUser.value) !== -1) {
      let data = []
      let i = userData.id.indexOf(selectedUser.value)
      for (let j=0; j < months.length; j++) {
        let month = months[j].toLowerCase()
        data.push(userData[month][i])
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
        <h1 class='bigSectionTitleHeader'>Top Users Bar Graph</h1>
        <div class="lineGraphWrap blueGraphWrap">
          <div class='activityGraph'>
            <div id='actGraphControls'>
              <Select placeholder={listData[0]} onChange={this.changeUser} options={users} styles={dropdownUserStyles}/>
              <Select placeholder={'Vertical'} onChange={this.changeOrientation} isSearchable={false} options={vertHoriz} styles={dropdownStyles}/>
            </div> 
            <Chart options={this.state.options} series={this.state.series} type="bar" width="96%" height="90%" />
          </div>
        </div>
      </div>
    );
  }
}

export default UserLineGraph;
  