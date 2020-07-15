var searchHistory = [];

$(".btn-sub").on("click", function () {
  $(".container-1").removeClass("hide");
  $(".card-container").removeClass("hide");
  $(".home").addClass("hide");

  displayWeather();
  updateHistory();
});

// Function to update search history with a clickable button
function updateHistory() {
  var cityText = $(".city-input").val();
  searchHistory.push(cityText);
  var newLi = $("<li>");
  var newBtn = $('<button class="city">');
  newBtn.attr("data-name", cityText);
  $(".cities").append(newLi);
  newLi.append(newBtn.text(cityText));
  localStorage.setItem(searchHistory);
  console.log(searchHistory);
}

function displayWeather() {
  var APIKey = "ab7855bac5246546bc74b1ff44c74dbd";
  var inputText = $(".city-input").val();
  // Replaces spaces in input string with a "+" to be used in the queryURL
  var inputVal = inputText.replace(/ /g, "+");
  // the URL we need to query the database for current day info
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    inputVal +
    "&appid=" +
    APIKey +
    "&units=imperial";

  // the URL we need to query the database for forecast info
  var queryURL1day =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputVal +
    "&appid=" +
    APIKey +
    "&units=imperial";

  // NOTE FIRST CARD AJAX CALL ====================
  $.ajax({
    url: queryURL1day,
    method: "GET",
  }).then(function (response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);

    //NOTE Date UNIX conversion
    var a = new Date(response.dt * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + " " + date + ", " + year;

    // FIRST CARD DATA --------------
    $("#location-date-1").text(response.name);
    //
    $(".date-1").text(time);
    //
    $("#icon-1").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    //
    $("#windspeed-1").text("Wind speed: " + response.wind.speed + "mph");
    //
    $("#humidity-1").text("Humidity: " + response.main.humidity + "%");
    //;
    $("#temp-1").text("Temperature: " + response.main.temp + "\u00B0" + "F");
    //NOTE UV INDEX AJAX request
    // var lat = response.city.coord.lat;
    // var lon = response.city.coord.lon;
    // console.log(lon);
    // console.log(lat);
    // var queryUV =
    //   "http://api.openweathermap.org/data/2.5/uvi?appid=ab7855bac5246546bc74b1ff44c74dbd&lat=" +
    //   lat +
    //   "&lon=" +
    //   lon;
    // $.ajax({
    //   url: queryUV,
    //   method: "GET",
    // }).then(function (response) {
    //   console.log(response);
    //   $("#uv-1").text(response.value);
    // });
  });

  // NOTE FORECAST AJAX CALL
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);

    //NOTE time conversion (to be revisited)

    // =============================== second card date
    // var a2 = new Date(response.list[4].dt * 1000);
    // var months = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];
    // var year2 = a2.getFullYear();
    // var month2 = months[a2.getMonth()];
    // var date2 = a2.getDate();
    // var time2 = month2 + " " + date2 + ", " + year2;
    // //=============================== third card date
    // var a3 = new Date(response.list[12].dt * 1000);

    // var year3 = a3.getFullYear();
    // var month3 = months[a3.getMonth()];
    // var date3 = a3.getDate();
    // var time3 = month3 + " " + date3 + ", " + year3;
    // // =============================== fourth card date
    // var a4 = new Date(response.list[20].dt * 1000);

    // var year4 = a4.getFullYear();
    // var month4 = months[a4.getMonth()];
    // var date4 = a4.getDate();
    // var time4 = month4 + " " + date4 + ", " + year4;
    // // =============================== fifth card date
    // var a5 = new Date(response.list[28].dt * 1000);

    // var year5 = a5.getFullYear();
    // var month5 = months5[a5.getMonth()];
    // var date5 = a5.getDate();
    // var time5 = month5 + " " + date5 + ", " + year5;
    // // =============================== sixth card date
    // var a6 = new Date(response.list[36].dt * 1000);

    // var year6 = a6.getFullYear();
    // var month6 = months6[a6.getMonth()];
    // var date6 = a6.getDate();
    // var time6 = month6 + " " + date6 + ", " + year6;

    //NOTE SECOND CARD DATA --------------------
    $("#date-2").text(new Date(response.list[4].dt * 1000));
    //
    $("#icon-2").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[4].weather[0].icon +
        "@2x.png"
    );
    //
    $("#temp-2").text("Temp: " + response.list[4].main.temp + "\u00B0" + "F");
    $("#humidity-2").text("Humidity: " + response.list[4].main.humidity + "%");

    //NOTE THIRD CARD DATA -----------------------
    $("#date-3").text(new Date(response.list[12].dt * 1000));
    //
    $("#icon-3").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[12].weather[0].icon +
        "@2x.png"
    );
    //
    $("#temp-3").text("Temp: " + response.list[12].main.temp + "\u00B0" + "F");
    $("#humidity-3").text("Humidity: " + response.list[12].main.humidity + "%");

    //NOTE FOURTH CARD DATA -----------------------
    $("#date-4").text(new Date(response.list[20].dt * 1000));
    //
    $("#icon-4").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[20].weather[0].icon +
        "@2x.png"
    );
    //
    $("#temp-4").text("Temp: " + response.list[20].main.temp + "\u00B0" + "F");
    $("#humidity-4").text("Humidity: " + response.list[20].main.humidity + "%");

    //NOTE FIFTH CARD DATA -----------------------
    $("#date-5").text(new Date(response.list[28].dt * 1000));
    //
    $("#icon-5").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[28].weather[0].icon +
        "@2x.png"
    );
    //
    $("#temp-5").text("Temp: " + response.list[28].main.temp + "\u00B0" + "F");
    $("#humidity-5").text("Humidity: " + response.list[28].main.humidity + "%");

    //NOTE SIXTH CARD DATA -----------------------
    $("#date-6").text(new Date(response.list[36].dt * 1000));
    //
    $("#icon-6").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[36].weather[0].icon +
        "@2x.png"
    );
    //
    $("#temp-6").text("Temp: " + response.list[36].main.temp + "\u00B0" + "F");
    $("#humidity-6").text("Humidity: " + response.list[36].main.humidity + "%");
    //
  });
}

$("#city").on("click", displayWeather);
