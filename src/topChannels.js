
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'

import channelData from "./channels.json" 

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

function sortList(value) {
  listData = []
  let data = channelData[value]
  let channels = channelData.list
  for (var i=0; i < channels.length; i++) {
    listData.push(channels[i] + ' - ' + data[i] )
  }
  listData = refSort(listData, data)
  for (i=0; i < listData.length; i++) {
    listData[i] = i+1 + '. ' + listData[i]
  }
}

sortList('yearly')

class ChannelList extends Component {
  state = {
    timeRange: 'yearly',
  };

  render() {
    return <div className='channelListEntry'>
      {listData.map((entry, index) => <h1 className='listEntryText'key={index}>{entry}</h1>)}
    </div>
  }
}

class AllTogether extends Component {
  state = {
    timeRange: 'yearly',
    maximized: 'no',
  };

  maximize = maximized => {
    this.setState(
      { maximized: 'yes'},
    );
  };

  handleChange = timeRange => {
    sortList(timeRange.value)
    this.setState(
      { timeRange },
      () => timeRange.value
    );
  };

  render() {
    return <div id='orderedDiv'>
      <div id='actGraphControls'>
        <Select value={this.timeRange} placeholder={'2020'} onChange={this.handleChange} isSearchable={false} options={groupedOptions} styles={dropdownStyles}/>
      </div> 
      <div className={'listContainer maximized' + this.state.maximized}>
        <ChannelList></ChannelList>
        <div className={'maximizeBehind hidden' + this.state.maximized}>
          <button className={'maximizeButton hidden' + this.state.maximized} onClick={this.maximize}>Show More</button>
        </div>
      </div>
    </div>
  }
}

function TopChannels() {
    return (
      <div>
        <h1 id='bigSectionTitleHeader'>Top Channels</h1>
        <AllTogether></AllTogether>
      </div>
    );
}
  
export default TopChannels;