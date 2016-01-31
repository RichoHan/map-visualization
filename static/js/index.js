var currentCountry = "CHN";

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
    var history = {
      2009: travelData[geography.id]["2009"],
      2010: travelData[geography.id]["2010"],
      2011: travelData[geography.id]["2011"],
      2012: travelData[geography.id]["2012"],
      2013: travelData[geography.id]["2013"],
      2014: travelData[geography.id]["2014"]
    };
    drawLineChart(history);
  }
  return '<div class="hoverinfo">' + geography.properties.name
};

var drawLineChart = function(history){
  new Chartkick.LineChart("chart", history);
};

var drawArcs = function(map, countries){
  var arcs = new Array();
  for(var country in countries){
    arcs.push({
      origin: {
        latitude: countries[country].lat,
        longitude: countries[country].long
      },
      destination: {
        latitude: 23.3554,
        longitude: 120.4615
      },
      options: {
        strokeWidth: 2,
        strokeColor: 'rgba(100, 10, 200, 0.4)',
        greatArc: true
      }
    });
  }
  map.arc(arcs, {strokeWidth: 1, arcSharpness: 0.3});
};
