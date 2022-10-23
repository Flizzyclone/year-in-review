import React from 'react';
import './App.css';

import Topline from "./topline.js"
import TopChannels from "./topChannels.js"
import TopUsers from "./topUsers.js"
import UserLineGraph from "./userGraph.js"
import ChannelLineGraph from "./channelGraph.js"
import UserPieGraph from "./userPie.js"
import ChannelPieGraph from "./channelPie.js"
import UserMonthlyPie from "./userMonthlyPie.js"
import ChannelMonthlyPie from "./channelMonthlyPie.js"
import OverallBar from "./overallBar.js"
import UserMonthlyBar from "./userBar.js"
import ChannelMonthlyBar from "./channelBar.js"

function App() {
  return (
    <div className="App">
      <h1 id='pageTitleHeader'>Year in Review 2020</h1>
      <h1 class='bigSectionTitleHeader'>Overall Activity in Messages</h1>
      <Topline></Topline>
      <div class="twoOrdered">
        <TopChannels></TopChannels>
        <TopUsers></TopUsers>
      </div>
      <UserLineGraph></UserLineGraph>
      <ChannelLineGraph></ChannelLineGraph>
      <div class="twoOrdered">
        <UserPieGraph></UserPieGraph>
        <ChannelPieGraph></ChannelPieGraph>
      </div>
      <div class="twoOrdered">
        <UserMonthlyPie></UserMonthlyPie>
        <ChannelMonthlyPie></ChannelMonthlyPie>
      </div>
      <OverallBar></OverallBar>
      <UserMonthlyBar></UserMonthlyBar>
      <ChannelMonthlyBar></ChannelMonthlyBar>
      <br></br>
      <h1 id='pageTitleHeader'>Overall...</h1>
      <h1 class="mostLeastHeader">804,268 Messages Sent</h1>
      <h1 class="mostLeastHeader">32,523 Pictures Sent</h1>
      <h1 class="mostLeastHeader">2,751 Memes Sent</h1>
      <h1 class="mostLeastHeader">272 People Joined</h1>
      <br></br>
      <br></br>
      <h1 class="mostLeastHeader">Most Active Month: November</h1>
      <h1 class="mostLeastHeader">Least Active Month: February</h1>
      <h1 class="mostLeastHeader">Most Active Week: June 22-June 28</h1>
      <h1 class="mostLeastHeader">Least Active Week: February 24-March 1</h1>
      <h1 class="mostLeastHeader">Most Active Day: June 20th</h1>
      <h1 class="mostLeastHeader">Least Active Day: February 25th</h1>
      <h1 id='pageTitleHeader'>To 2021!🥂</h1>
    </div>
  );
}

export default App;
