
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'
import Chart from "react-apexcharts";

import toplineData from "./topline.json" // last updated as of 11/05

import { dropdownStyles } from "./components/dropdownStyles"

const monthWeekDay = [
    { value: 'month', label: 'Month'},
    { value: 'week', label: 'Week'},
    { value: 'day', label: 'Day'},
  ]
  
  const sharpCurvy = [
    { value: 'sharp', label: 'Sharp'},
    { value: 'curved', label: 'Curved'},
  ]
  
  class MsgGraph extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selectedTimeframe: 'Month',
        selectedCurve:'Sharp',
        options: {
            chart: {
                id: "msgToplineChart",
                background: '#39393F',
                toolbar: {
                  tools: {
                    pan:false
                  }
                }
            },
            xaxis: {
                categories: toplineData.months.labels,
                labels: {
                    style: {
                        colors: '#CCCCCC',
                        fontSize: '14px',
                        fontFamily: 'Roboto, Arial, sans-serif',
                        fontWeight: 400,
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
          ]
        },
        series: [
          {
            name: "Messages",
            data: toplineData.months.data
          }
        ],
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

    changeTimeframe = selectedTimeframe => {
      this.setState({selectedTimeframe: selectedTimeframe.value});
      if(selectedTimeframe.value === 'month') {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.months.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show: true,
              }
            }
          }
        })
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.months.data;
        series[0] = item;
        this.setState({series});
      } else if (selectedTimeframe.value === 'week') {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.weeks.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show: false,
              }
            }
          }
        })
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.weeks.data;
        series[0] = item;
        this.setState({series});
      } else if (selectedTimeframe.value === 'day') {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.days.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show: false,
              }
            }
          }
        })
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.days.data;
        series[0] = item;
        this.setState({series});
      }
    };

    render() {
  
      return (
        <div id='activityGraph'>
          <div id='actGraphControls'>
            <Select placeholder={'Month'} isSearchable={false} onChange={this.changeTimeframe} options={monthWeekDay} styles={dropdownStyles}/>
            <Select placeholder={'Sharp'} isSearchable={false} onChange={this.changeCurve} options={sharpCurvy} styles={dropdownStyles}/>
          </div> 
          <Chart options={this.state.options} series={this.state.series} type="line" width="100%" height="90%" />
        </div>
      );
    }
  }

export default MsgGraph;
  