<template>
<div class="wide top-offset base-offset upper">
  <div>
    <h1 class="title">PDSDSS statistics</h1>
    <div class="wide additional-offset">
      <p class="base-text inline">Type: </p>
      <select id="type" class="selection inline" onclick="onTypeChoose()">
        <option value="top">Top</option>
        <option value="graph">Graph</option>
      </select>
    </div>
    <div class="wide additional-offset">
      <p class="base-text addition inline">Channel: </p>
      <select id="channel" class="selection inline">
        <option value="all">All</option>
      </select>
    </div>
    <div class="wide additional-offset">
      <p class="base-text inline">User: </p>
      <select id="user" class="selection inline">
        <option value="all">All</option>
      </select>
    </div>
    <div class="wide additional-offset">
      <p class="base-text inline">Attachment: </p>
      <select id="attachment" class="selection inline">
        <!--            <option value="any">Any</option>-->
        <!--            <option value="none">None</option>-->
        <!--            <option value="image">Image</option>-->
        <!--            <option value="video">Video</option>-->
        <!--            <option value="file">File</option>-->
        <option value="any">Both</option>
        <option value="has">Has</option>
        <option value="none">None</option>
      </select>
    </div>
    <div class="wide additional-offset">
      <p class="base-text inline">From: </p>
      <input type="date" id="start" class="selection date-picker inline" value="2022-04-04" min="2022-04-04"
             max="2024-04-09">
    </div>
    <div class="wide additional-offset">
      <p class="base-text inline">Till: </p>
      <input type="date" id="end" class="selection date-picker inline" value="2024-04-09" min="2022-04-04"
             max="2024-04-09">
    </div>
    <!--    <div class="wide additional-offset">-->
    <!--        <p class="base-text inline">Gap: </p>-->
    <!--        <select id="gap" class="selection inline">-->
    <!--            <option value="month">Month</option>-->
    <!--            <option value="week">Week</option>-->
    <!--            <option value="day">Day</option>-->
    <!--            <option value="hour">Hour</option>-->
    <!--        </select>-->
    <!--    </div>-->

    <button class="additional-offset top-offset" onclick="render()">Render!</button>
  </div>

  <div class="wrapper wide">
    <div id="content" class="top-offset centered content">
      <p class="gray-text">Server data is preparing</p>
    </div>
  </div>

  <hr class="top-offset">
  <p class="base-text base-offset">Made with love for PDSDSS. <b>Usbek corp. 2024</b></p>
</div>

</template>

<script>
</script>

<style>
* {
  margin: 0;
  padding: 0
}

p, a, span, div {
  user-select: none;
}

body {
  background-color: #1f1f21;
}

.wide {
  width: auto;
}

.inline {
  display: inline-block;
  margin-right: 0.5vw;
}

.selection {
  font-family: Calibri;
  font-weight: bolder;
  color: azure;
  background-color: #2f2f30;
  font-size: 0.9vw;
}

.selection.date-picker {
  color-scheme: dark;
  font-size: 0.85vw;
}

.base-offset {
  margin-left: 1.5vw;
}

.top-offset {
  margin-top: 1vw;
}

.additional-offset {
  margin-left: 1vw;
}

.base-text {
  margin-bottom: 0.5vw;
  font-family: "Calibri";
  font-size: 1vw;
  color: aliceblue;
}

button {
  display: inline-block;
  padding: 0.15vw 0.3vw;
  text-decoration: none;
  background: #2f2f30;
  background-size: 20vw;
  text-align: center;
  color: #ffffff;
  font-size: 1.25vw;
  border: none;
  outline: none;
  transition: background 0.25s ease;
  font-family: "Calibri";
  font-weight: bolder;
  border-radius: 0.25vw;
}

button:hover {
  border: none;
  outline: none;
  background: #38383a;
}

button:active {
  border: none;
  outline: none;

  transition: background 0.1s ease;
  background: #4b494d;
}

button:focus {
  border: none;
  outline: none;
}

.content {
  background-color: #38383a;
  padding: 0.5vw 1.5vw;
  width: 92.5%;
  height: 50%;
  border-radius: 0.5vw;
}

.tile {
  /*background-color: #2f2f31;*/
  padding: 0.5vw 0.75vw;
  height: 50%;
  border-radius: 0.35vw;
  margin: 0.25vw 1vw;
  text-align: left;
}

.upper {
  margin-bottom: 1.25vw;
}

.tile-caption {
  font-family: "Calibri";
  font-weight: bolder;
  font-size: 1.175vw;

  color: aliceblue;
}

.tile-text {
  color: #938c94;
  font-family: "Calibri Light";
  font-style: italic;
  font-size: 0.9vw;
}

.draw {
  background-color: #464648;
  width: 90vw;
  height: 25vw;
  border-radius: 0.25vw;
  margin: 0.5vw 0;
}

.centered {
  margin-left: auto;
  margin-right: auto;
}

.gray-text {
  color: #938c94;
  font-family: "Calibri Light";
  font-style: italic;
  font-size: 1vw;
}

hr {
  /*size: 1px;*/
  width: 97.5%;
  margin: 0.5vw auto 1vw auto;
  color: #2f2f30;
  margin-top: 0.5vw;
  margin-bottom: 0.5vw;
}

.title {
  font-family: "Arial Black";
  font-size: 2vw;
  color: aliceblue;
}

.wrapper {
  text-align: center;
}

</style>
