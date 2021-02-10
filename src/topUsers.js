
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select'

import userData from "./users.json" 

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
let idData = []
let orderData = []

function sortList(value) {
  listData = []
  idData = []
  orderData = []
  let data = userData[value]
  let users = userData.list
  let ids = userData.id
  for (var i=0; i < users.length; i++) {
    listData.push(users[i])
  }
  listData = refSort(listData, data)
  idData = refSort(ids, data)
  orderData = refSort(data, data)
  for (i=0; i < listData.length; i++) {
    listData[i] = i+1 + '.‏‏‎ ‎' + listData[i]
  }
}

sortList('yearly')

class UserList extends Component {
  state = {
    timeRange: 'yearly',
  };

  render() {
    return <div className='userlistentry'>
      {idData.map((entry, index) => <div className='userListBox'key={idData[index]}>
        <img className='listEntryPFP' onError={(e)=>{e.target.onerror = null; e.target.src="./defaultpfp.png"}} alt='./defaultpfp.png'src={'./pfps/' + idData[index] + '.webp'}></img>
        <h1 className='userListText'>{listData[index]}</h1>
        <h1 className='userListData'>{orderData[index]}</h1>
      </div>)}
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
        <UserList></UserList>
        <div className={'maximizeBehind hidden' + this.state.maximized}>
          <button className={'maximizeButton hidden' + this.state.maximized} onClick={this.maximize}>Show More</button>
        </div>
      </div>
    </div>
  }
}



function TopUsers() {
    return (
      <div>
        <h1 id='bigSectionTitleHeader'>Top 100 Users</h1>
        <AllTogether></AllTogether>
      </div>
    );
}
  
export default TopUsers;
  