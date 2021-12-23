

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    
    let url = "https://weather-proxy.freecodecamp.rocks/api/current?lat=" + lat + "&lon=" + long;
    const getData = function() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url)
        xhr.onload = function() {
            const weatherData = JSON.parse(xhr.response);
            // Frenheight Logic & Celsius
            const celcius = Math.floor(weatherData.main.temp);
            const farenheight = Math.floor((weatherData.main.temp * 1.8) + 32);
            const location = weatherData.name
            const weatherText = weatherData.weather[0].description
            let tempSwap = true;
            $("#location").html("The temperature in " + location + "<br> is " + celcius + "<button id='tempChange' class='btn bg-transparent cel'>°C</button>" + "and it is like <br>" + weatherText )
            $("#tempChange").click(function(){
                if(tempSwap == false){
                    $("#location").html("The temperature in " + location + "<br> is " + celcius + "<button id='tempChange' class='btn bg-transparent'>°C</button>" + "and it is like <br>" + weatherText )   
                    tempSwap = true;  
                 }
                 else{
                    $("#location").html("The temperature in " + location +  "<br> is "  + farenheight + "<button id='tempChange' class='btn bg-transparent cel'>°F</button>" + "and it is like <br>" + weatherText )
                    tempSwap=false;
                 }
            });
            // Weather Icon 
            const weatherImage = weatherData.weather[0].icon;
            $("#weatherIcon").attr("src", weatherImage);
        }
        xhr.send();
        
    }
    getData();
}
$("button").click(function() {
    getLocation();
    $("#buttons").append("<img id='weatherIcon' src='' alt='weather logo'>");
})
