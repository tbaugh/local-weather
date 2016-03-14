var apiKey = "081b8c336e95203da13b1feea127ab2e";
  var isFarenheit = true;
  var units = "imperial";
  var tempScale = "F";

  $(document).ready(function() {
    $("#button-text").html("Want that in Celsius?")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        function getNSet() {
          var apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=" + units + "&appid=" + apiKey;
          $.getJSON(apiURL, function(json) {
            $("#weather").html(json.main.temp);
            $("#temp-scale").html(tempScale);
            $("#city").html(json.name);
            $("#icon").html("<img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'>");
          });
        }

        $("#scale-toggle").click(function() {
          isFarenheit = !isFarenheit;
          if (isFarenheit === false) {
            units = "metric";
            tempScale = "C";
            $("#button-text").html("Give me Farenheit, please!")
          } else if (isFarenheit === true) {
            units = "imperial";
            tempScale = "F";
            $("#button-text").html("Want that in Celsius?")
          }
          $("#temp-scale").html(tempScale);
          getNSet();
        });

        getNSet();
      });
    } else {
      $("#data").html("Error! Enable location services!");
    }

  });