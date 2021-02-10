
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
  
  const vertHoriz = [
    { value: 'vert', label: 'Vertical'},
    { value: 'horiz', label: 'Horizontal'},
  ]
  
  class MsgGraph extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selectedTimeframe: 'month',
        selectedOrientation: 'vert',
        options: {
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: 'Roboto',
              fontSize: '14px',
            },
          },
          chart: {
              id: "msgToplineBar",
              background: '#39393F',
              toolbar: {
                tools: {
                  pan:false
                }
              },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position:'bottom'
              },
              horizontal:false
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
        },
        series: [
          {
            name: "Messages",
            data: toplineData.months.data
          }
        ]
      };
    }
    
    changeOrientation = selectedOrientation => {
      this.setState({selectedOrientation: selectedOrientation.value});
      if(selectedOrientation.value === 'vert' && this.state.selectedTimeframe === 'month') {
        this.setState({
          options: {
            ...this.state.options,
            plotOptions: {
              ...this.state.options.plotOptions,
              bar: {
                ...this.state.options.plotOptions.bar,
                horizontal:false
              }
            },
            grid: {
              ...this.state.options.grid,
              show:true
            },
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:true
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true,
              }
            },
            xaxis: {
              ...this.state.options.xaxis,
              labels: {
                ...this.state.options.xaxis.labels,
                show:true,
              }
            }
          }
        })
      } else if (selectedOrientation.value === 'vert' && (this.state.selectedTimeframe === 'week' || this.state.selectedTimeframe === 'day')) {
        this.setState({
          options: {
            ...this.state.options,
            plotOptions: {
              ...this.state.options.plotOptions,
              bar: {
                ...this.state.options.plotOptions.bar,
                horizontal:false
              }
            },
            grid: {
              ...this.state.options.grid,
              show:true
            },
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true,
              }
            },
            xaxis: {
              ...this.state.options.xaxis,
              labels: {
                ...this.state.options.xaxis.labels,
                show:false,
              }
            }
          }
        })
      } else if (selectedOrientation.value === 'horiz' && this.state.selectedTimeframe === 'month') {
        this.setState({
          options: {
            ...this.state.options,
            plotOptions: {
              ...this.state.options.plotOptions,
              bar: {
                ...this.state.options.plotOptions.bar,
                horizontal:true,
              }
            },
            grid: {
              ...this.state.options.grid,
              show:false,
            },
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:true
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true,
              }
            },
            xaxis: {
              ...this.state.options.xaxis,
              labels: {
                ...this.state.options.xaxis.labels,
                show:true,
              }
            }
          }
        })
      } else if (selectedOrientation.value === 'horiz' && (this.state.selectedTimeframe === 'week' || this.state.selectedTimeframe === 'day')) {
        this.setState({
          options: {
            ...this.state.options,
            plotOptions: {
              ...this.state.options.plotOptions,
              bar: {
                ...this.state.options.plotOptions.bar,
                horizontal:true,
              }
            },
            grid: {
              ...this.state.options.grid,
              show:false,
            },
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:false,
              }
            },
            xaxis: {
              ...this.state.options.xaxis,
              labels: {
                ...this.state.options.xaxis.labels,
                show:true,
              }
            }
          }
        })
      }
    };

    changeTimeframe = selectedTimeframe => {
      this.setState({selectedTimeframe: selectedTimeframe.value});
      if(selectedTimeframe.value === 'month') {
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.months.data;
        series[0] = item;
        this.setState({series});
        this.setState({
          options:{
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories:toplineData.months.labels,
              labels : {
                ...this.state.options.xaxis.labels,
                show:true
              }
            },
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:true
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true
              }
            }
          }
        })
      } else if (selectedTimeframe.value === 'week' && this.state.selectedOrientation === 'vert') {
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.weeks.data;
        series[0] = item;
        this.setState({series});
        this.setState({
          options: {
            ...this.state.options,
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.weeks.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show:false
              }
            },
            grid: {
              ...this.state.options.grid,
              show:true,
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true
              }
            }
          }
        })
      } else if (selectedTimeframe.value === 'week' && this.state.selectedOrientation === 'horiz') {
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.weeks.data;
        series[0] = item;
        this.setState({series});
        this.setState({
          options: {
            ...this.state.options,
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.weeks.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show:true
              }
            },
            grid: {
              ...this.state.options.grid,
              show:false,
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:false
              }
            }
          }
        })
      } else if (selectedTimeframe.value === 'day' && this.state.selectedOrientation === 'vert') {
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.days.data;
        series[0] = item;
        this.setState({series});
        this.setState({
          options: {
            ...this.state.options,
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            xaxis: {
              ...this.state.options.xaxis,
              categories: toplineData.days.labels,
              labels: {
                ...this.state.options.xaxis.labels,
                show:false
              }
            },
            grid: {
              ...this.state.options.grid,
              show:true,
            },
            yaxis: {
              ...this.state.options.yaxis,
              labels: {
                ...this.state.options.yaxis.labels,
                show:true
              }
            }
          }
        })
      } else if (selectedTimeframe.value === 'day' && this.state.selectedOrientation === 'horiz') {
        let series = [...this.state.series];
        let item = {...series[0]};
        item.data = toplineData.days.data;
        series[0] = item;
        this.setState({series});
        this.setState({
          options: {
            ...this.state.options,
            dataLabels: {
              ...this.state.options.dataLabels,
              enabled:false
            },
            grid: {
              ...this.state.options.grid,
              show:false,
            },
            xaxis: {
              ...this.state.options.xaxis,
              labels: {
                ...this.state.options.xaxis.labels,
                show:true
              }
            },
            yaxis: {
              ...this.state.options.yaxis,
              categories: toplineData.days.labels,
              labels: {
                ...this.state.options.yaxis.labels,
                show:false
              }
            }
          }
        })
      }
    };

    render() {
  
      return (
        <div>
        <h1 id='bigSectionTitleHeader'>Overall Activity in Messages Bar Graph</h1>
        <div id='activityGraph'>
          <div id='actGraphControls'>
            <Select placeholder={'Month'} isSearchable={false} onChange={this.changeTimeframe} options={monthWeekDay} styles={dropdownStyles}/>
            <Select placeholder={'Vertical'} isSearchable={false} onChange={this.changeOrientation} options={vertHoriz} styles={dropdownStyles}/>
          </div> 
            <Chart options={this.state.options} series={this.state.series} type="bar" width="96%" height="90%" />
          </div>
        </div>
      );
    }
  }

export default MsgGraph;
  