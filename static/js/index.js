var createMap = function(){
  return new Datamap({
    element: document.getElementById("worldmap"),
    projection: 'mercator',
    geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: popupFunc,
      highlightBorderWidth: 3
    },
    fills: {
      defaultFill: "#CBE2C6",
      residence: "#fa0fa0",
      TWN: "#0000FF"
    },
    data: {
      TWN: { fillKey: "TWN" }
    }
  });
};

var popupFunc = function(geography, data){
  if(currentCountry != geography.id && geography.id in travelData){
    currentCountry = geography.id;
    var history = {
      2009: travelData[geography.id]["2009"],
      2010: travelData[geography.id]["2010"],
      2011: travelData[geography.id]["2011"],
      2012: travelData[geography.id]["2012"],
      2013: travelData[geography.id]["2013"],
      2014: travelData[geography.id]["2014"]
    };
    drawArc(map, travelData[geography.id]);
    drawLineChart(geography.properties.name, history);
    $('#nation').html("<h3 class='nation_title'>" + geography.properties.name + "</h3>");
    $('#data').empty();
    $('#data').append("<li><span class='st'>2009</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2009"] + "人</li>");
    $('#data').append("<li><span class='st'>2010</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2010"] + "人</li>");
    $('#data').append("<li><span class='st'>2011</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2011"] + "人</li>");
    $('#data').append("<li><span class='st'>2012</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2012"] + "人</li>");
    $('#data').append("<li><span class='st'>2013</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2013"] + "人</li>");
    $('#data').append("<li><span class='st'>2014</span>&nbsp&nbsp&nbsp&nbsp" + travelData[geography.id]["2014"] + "人</li>");
    var total = parseInt(travelData[geography.id]["2009"])+
      parseInt(travelData[geography.id]["2010"])+
      parseInt(travelData[geography.id]["2011"])+
      parseInt(travelData[geography.id]["2012"])+
      parseInt(travelData[geography.id]["2013"])+
      parseInt(travelData[geography.id]["2014"]);
    $('#total_visitors').html("&nbsp&nbsp" + total);
  }
  return '<div class="hoverinfo">' + geography.properties.name
};

var sum

var drawLineChart = function(country, history){
  data = [
    {"name": country, "data": history}
  ];
  new Chartkick.LineChart("chart", data, {"library": {"backgroundColor": "#F7F7F7"}, "min": 0, "colors": ["#036EB8"]});

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

var drawArc = function(map, country){
  var arcs = new Array();
  arcs.push({
    origin: {
      latitude: country.lat,
      longitude: country.long
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
  map.arc(arcs, {strokeWidth: 1, arcSharpness: 0.3});
};

var processData = function(data){
  var result = new Array();
  data.forEach(function(element, index){
    result[element.code] = element;
  });
  return result;
};

var findYearMax = function(data, year){
  var max = 0;
  for(var country in data){
    var num = parseInt(data[country][year]);
    max = num>max ? num : max;
  }
  return max;
};

var findYearMin = function(data, year){
  var min = Infinity;
  for(var country in data){
    var num = parseInt(data[country][year]);
    min = num<min ? num : min;
  }
  return min;
};

var updateMap = function(map, travelData, year){
  yearMin = findYearMin(travelData, year);
  yearMax = findYearMax(travelData, year);
  var info = new Array();
  for(var country in travelData)
    info[country] = "rgba(3, 110, 186, " + (0.2+travelData[country][year]/yearMax) + ")";
  map.updateChoropleth(info);
};
