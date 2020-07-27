// declaring initial values and fetching values
var button = document.getElementById("submit");
var input = document.getElementById("txtinput");
var ul = document.querySelector("ul");
var li = document.getElementsByTagName("li");
var listItems=document.getElementsByTagName("li");


// creating function for text length
function inputLength() {
	return input.value.length;
}

// creating function for list length
function listLength(){
	return listItems.length;
}


// creating function for delete button
function deleteButton(){
  // declaring variable and connecting it to fetched button
	var btn=document.createElement("button");
  // creating remove option
	btn.appendChild(document.createTextNode("Remove"));
	listItems[i].appendChild(btn);
  // giving option to remove the task next to button
	btn.onclick=removeParent;
}

// tried update funtionality



// creating function for update button
//function updateButton(){
// declaring variable and connecting it to fetched button
//	var upbtn=document.createElement("button");
//	btn.appendChild(document.createTextNode("Update"));
//	listItems[i].appendChild(btn);
//}

// creating a for loop
// this loop will always work as condition will always be true
for( i=0;i<listLength();i++){
	deleteButton();
}

//function to create list item
function createListElement() {
	var li = document.createElement("li");
		li.appendChild(document.createTextNode(input.value));
		ul.appendChild(li);
		input.value = "";
    // condtion remains same for delete button
		var button = document.createElement("button");
		button.appendChild(document.createTextNode("Remove"));
		li.appendChild(button);
		button.onclick = removeParent;
}

//giving function to strike of task as it is done
function lineOnClick(lineThrough){
	var target = lineThrough.target;
	target.classList.toggle("taskComplete");
}

//remove list input
function removeParent(evt){
	evt.target.parentNode.remove();
}

// this function adds list item into list when clicked on submit
function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

//
function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

//setting elements call type
ul.addEventListener("click", lineOnClick);
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);



//using weather api as it will help in knowning weather before plannig
$("#map").hide();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var url =
        "https://fcc-weather-api.glitch.me/" +
        "/api/current?lon=" +
        lon +
        "&lat=" +
        lat;
      $.get(url, function(we) {
        var name = we.name;
        var country = we.sys.country;
        var whole = name + ", " + country;
        var speed = we.wind.speed + " m/s";
        var direction = we.wind.deg + "°";
        var tempc = we.main.temp + " ℃";
        var pressure = we.main.pressure + " mb";
        var max = we.main.temp_max + " ℃";
        var min = we.main.temp_min + " ℃";
        var humidity = we.main.humidity + " %";
        var cloud = we.clouds.all + " %";
        var icon = we.weather[0].icon;
        var des = we.weather[0].description;
        var type = we.weather[0].main;
        var tempf = Math.round(we.main.temp * 9 * 100 / 100) / 5 + 32 + " °F";
        var f = 1;
        var flag = 1;
        var flag2 = 1;
        function titleCase(str) {
          var newTitle = str.split(" ");
          for (var i = 0; i < newTitle.length; i++) {
            var f = newTitle[i].substring(0, newTitle[i].length).toLowerCase();
            var s = f.substring(0, 1).toUpperCase();
            var k = f.substring(1, f.length);
            newTitle[i] = s + k;
          }
          return newTitle.join(" ");
        }
        des = titleCase(des);
        var whole2 = type + " ( " + des + " )";
        $("#whole").text(whole);
        $("#temp").text(tempc);
        $("#whole2").text(whole2);
        $("#icon").attr("src", icon);
        $("#togg").click(function() {
          if (f === 1) {
            $("#temp").text(tempf);
            $("#togg").text("℃");
            f = 0;
          } else {
            $("#temp").text(tempc);
            $("#togg").text("°F");
            f = 1;
          }
        });
        $("#more").click(function() {
          if (flag === 1) {
            $("#more").text("Show Less");
            $("#data").show();
            $("#data").html(
              "<table><thead><tr><td><strong>Parameters </strong></td><td><strong> Values </strong></td></tr></thead><tbody><tr><td>Place : </td><td>" +
                whole +
                "</td></tr><tr><td>Temperature : </td><td>" +
                tempc +
                " ( " +
                tempf +
                " )" +
                "</td></tr><tr><td>Latitutde, Longitude :  </td><td>" +
                lat +
                " , " +
                lon +
                " </td></tr><tr><td>Max Temperature : </td><td>" +
                max +
                "</td></tr><tr><td>Min Temperature : </td><td>" +
                min +
                "</td></tr><tr><td>Wind Speed : </td><td>" +
                speed +
                "</td></tr><tr><td>Wind Direction : </td><td>" +
                direction +
                "</td></tr><tr><td>Pressure : </td><td>" +
                pressure +
                "</td></tr><tr><td>Humidity : </td><td>" +
                humidity +
                "</td></tr><tr><td>Clouds : </td><td>" +
                cloud +
                "</td></tr></tbody></table>"
            );
            $("#map").show();
            function initMap() {
              var uluru = { lat: lat, lng: lon };
              var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: uluru
              });
              var marker = new google.maps.Marker({
                position: uluru,
                map: map
              });
            }
            initMap();
            flag = 0;
          } else {
            $("#more").text("Show More");
            $("#data").hide();
            $("#map").hide();
            flag = 1;
          }
        });
      });
    }, showError);
  }
  else{
    $("#whole").text("Nothing to show as your browser doesn't support Geo Location");
    $("#temp").text("Try giving access to Geo Loaction to this web page from Browser settings or reloading it");
    $("#whole2").text("Mobile Interfaces are not supported.Sorry !!!");
  }
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#whole").text("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#whole").text("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#whole").text("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
           $("#whole").text("An unknown error occurred.");
            break;
    }
}
getLocation();
