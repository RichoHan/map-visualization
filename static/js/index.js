var currentCountry;

var createMap = function(){
  return new Datamap({
    element: document.getElementById("worldmap"),
    geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: popupFunc,
      highlightBorderWidth: 3
    },
    fills: {
      defaultFill: "#ABDDA4",
      residence: "#fa0fa0",
      TWN: "#0000FF"
    },
    data: {
      TWN: { fillKey: "TWN" }
    }
  });
};

var popupFunc = function(geography, data){
  if(currentCountry!=geography.id){
    currentCountry = geography.id;
    drawLineChart(geography);
  }
  return '<div class="hoverinfo">' + geography.properties.name
};

var drawLineChart = function(geography){
  if(!(geography.id in travelData))
    return;
  console.log("Lines");
  var history = {
    2009: travelData[geography.id]["2009"],
    2010: travelData[geography.id]["2010"],
    2011: travelData[geography.id]["2011"],
    2012: travelData[geography.id]["2012"],
    2013: travelData[geography.id]["2013"],
    2014: travelData[geography.id]["2014"]
  };
  new Chartkick.LineChart("chart-1", history);
};
