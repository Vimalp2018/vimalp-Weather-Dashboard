var city = $("#searchCity")
var apiKey = "&appid=c213d17a1936fd981bd9f425a1bd1ead";
var todaysDate = new Date();

$("#submitButton").on("click", function() {
  $('#result').addClass('show');
  city = $("#searchCity").val();
  
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })

  .then(function (response){
    weatherToday(response);
    forecast(response);
    list();

    })
  });

  function list() {
    var searchList = $("<li>").text(city);
    $(".list").append(searchList);
  }

  function weatherToday (response) {

    var farinheight = (response.main.temp - 273.15) * 1.80 + 32;
    farinheight = Math.floor(farinheight);

    $('#currentCity').empty();

    var card = $("<div>").addClass("card");
    var body = $("<div>").addClass("card-body");
    var city = $("<div>").addClass("card-title").text(response.name);
    var cityDate = $("<div>").addClass("card-title").text(todaysDate.toLocaleDateString('en-US'));
    var temp = $("<div>").addClass("card-text current-temp").text("temp: " + farinheight + " °F");
    var humidity = $("<div>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<div>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<div>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    city.append(cityDate, image)
    body.append(city, temp, humidity, wind);
    card.append(body);
    $("#currentCity").append(card)
   
  }

function forecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    $('#forecast').empty();

    var results = response.list;

    for (var i = 0; i < results.length; i++) {

      var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
    
      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        var farinheight = Math.floor(temp);

        var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        var body = $("<div>").addClass("card-body p-3 forecastBody")
        var cityDate = $("<div>").addClass("card-title").text(todaysDate.toLocaleDateString('en-US'));
        var temp = $("<div>").addClass("card-text forecastTemp").text("temp: " + farinheight + " °F");
        var humidity = $("<div>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        body.append(cityDate, image, temp, humidity);
        card.append(body);
        $("#forecast").append(card);

      }
    }
  });

}