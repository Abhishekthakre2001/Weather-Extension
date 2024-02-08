


function getweather() {
    //  ********** start loading after the data fetch *********************
    document.getElementById('loader').style.display = 'block';

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const tempcity = data.address.state_district;
                // tempturecity.innerHTML = data.address.state_district;
                console.log(tempcity);

                const apiKey = '375e2053062a4e54b89154226242701';

                const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${tempcity}&aqi=yes`;
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        //  ********** stop loading after the data fetch *********************
                        document.getElementById('loader').style.display = 'none';

                        tempturecity.innerHTML = tempcity;

                        const temprature = data.current.temp_c;
                        temperature.innerHTML = data.current.temp_c + "°C";

                        const date = new Date(data.current.last_updated);
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        let day = weekday[date.getDay()];
                        tempday.innerHTML = day;
                        console.log(day);

                    })

            })
            .catch(() => {
                console.log("Error fetching data from API");
            });
    });
}
window.onload = function () {
    getweather();
};
