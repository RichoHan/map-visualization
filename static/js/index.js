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
    drawLine(geography);
  }
  return '<div class="hoverinfo">' + geography.properties.name
};

var drawLine = function(geography){
  if(!(geography.id in travelData))
    return;
};
