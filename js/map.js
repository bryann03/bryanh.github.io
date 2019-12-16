function initMap() {

    //Home click
    $('#buttonHome').click(function () {
        window.location = "./index.html";
    });

    //Audio playing
    var audio = new Audio();

    //Pulse and Dot for change color
    var previousPulse;
    var previousDot;

    //Audtio settings
    var imgAudioPlay = document.getElementById("imgPlayButton");
    imgAudioPlay.addEventListener("click", playPause);

    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    // Themes end

    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Add image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.data = [{
        "title": "Brussels",
        "latitude": 50.8371,
        "longitude": 4.3676
    }, {
        "title": "Paris",
        "latitude": 48.8567,
        "longitude": 2.3510
    }, {
        "title": "Reykjavik",
        "latitude": 64.1353,
        "longitude": -21.8952
    }, {
        "title": "Moscow",
        "latitude": 55.7558,
        "longitude": 37.6176
    }, {
        "title": "Madrid",
        "latitude": 40.4167,
        "longitude": -3.7033
    }, {
        "title": "London",
        "latitude": 51.5002,
        "longitude": -0.1262,
        "url": "http://www.google.co.uk"
    }, {
        "title": "Peking",
        "latitude": 39.9056,
        "longitude": 116.3958
    }, {
        "title": "New Delhi",
        "latitude": 28.6353,
        "longitude": 77.2250
    }, {
        "title": "Tokyo",
        "latitude": 35.6785,
        "longitude": 139.6823,
        "url": "http://www.google.co.jp"
    }, {
        "title": "Ankara",
        "latitude": 39.9439,
        "longitude": 32.8560
    }, {
        "title": "Buenos Aires",
        "latitude": -34.6118,
        "longitude": -58.4173
    }, {
        "title": "Brasilia",
        "latitude": -15.7801,
        "longitude": -47.9292
    }, {
        "title": "Ottawa",
        "latitude": 45.4235,
        "longitude": -75.6979
    }, {
        "title": "Washington",
        "latitude": 38.8921,
        "longitude": -77.0241
    }, {
        "title": "Cairo",
        "latitude": 30.0571,
        "longitude": 31.2272
    }, {
        "title": "Pretoria",
        "latitude": -25.7463,
        "longitude": 28.1876
    }];

    // add events to recalculate map position when the map is moved or zoomed
    chart.events.on("ready", updateCustomMarkers);
    chart.events.on("mappositionchanged", updateCustomMarkers);

    // this function will take current images on the map and create HTML elements for them
    function updateCustomMarkers(event) {

        // go through all of the images
        imageSeries.mapImages.each(function (image) {
            // check if it has corresponding HTML element
            if (!image.dummyData || !image.dummyData.externalElement) {
                // create onex
                image.dummyData = {
                    externalElement: createCustomMarker(image)
                };
            }

            // reposition the element accoridng to coordinates
            var xy = chart.geoPointToSVG({
                longitude: image.longitude,
                latitude: image.latitude
            });
            image.dummyData.externalElement.style.top = xy.y + 'px';
            image.dummyData.externalElement.style.left = xy.x + 'px';
        });

    }

    // this function creates and returns a new marker element
    function createCustomMarker(image) {

        var chart = image.dataItem.component.chart;

        // create holder
        var holder = document.createElement('div');
        holder.className = 'map-marker';
        holder.title = image.dataItem.dataContext.title;
        holder.style.position = 'absolute';

        // maybe add a link to it?
        if (undefined != image.url) {
            holder.onclick = function () {
                window.location.href = image.url;
            };
            holder.className += ' map-clickable';
        }

        // create dot
        var dot = document.createElement('div');
        dot.className = 'dot';
        holder.appendChild(dot);

        // create pulse
        var pulse = document.createElement('div');
        pulse.className = 'pulse';
        holder.appendChild(pulse);

        // append the marker to the map container
        chart.svgContainer.htmlElement.appendChild(holder);

        holder.addEventListener("click", function () {
            displayAudio(holder.title),
                changeHolderColor(dot, pulse),
                updateCurrentRadioText(holder.title);
        });

        return holder;
    }

    // this function play the radio of the locatio at onClick of dot
    function displayAudio(title) {
        imgAudioPlay.src = "./img/pause-button.svg"
        try {
            switch (title) {
                case "Brussels":
                    audio.src = "./mp3/Brussels.mp3";
                    break;
                case "Paris":
                    audio.src = "./mp3/Paris.mp3";
                    break;
                case "Reykjavik":
                    audio.src = "./mp3/Reykjavik.mp3";
                    break;
                case "Moscow":
                    audio.src = "./mp3/Moscow.mp3";
                    break;
                case "Madrid":
                    audio.src = "./mp3/Madrid.mp3";
                    break;
                case "London":
                    audio.src = "./mp3/London.mp3";
                    break;
                case "Peking":
                    audio.src = "./mp3/Peking.mp3";
                    break;
                case "New Delhi":
                    audio.src = "./mp3/New Delhi.mp3";
                    break;
                case "Tokyo":
                    audio.src = "./mp3/Tokyo.mp3";
                    break;
                case "Ankara":
                    audio.src = "./mp3/Ankara.mp3";
                    break;
                case "Buenos Aires":
                    audio.src = "./mp3/Buenos Aires.mp3";
                    break;
                case "Brasilia":
                    audio.src = "./mp3/Brasilia.mp3";
                    break;
                case "Ottawa":
                    audio.src = "./mp3/Ottawa.mp3";
                    break;
                case "Washington":
                    audio.src = "./mp3/Washington.mp3";
                    break;
                case "Cairo":
                    audio.src = "./mp3/Cairo.mp3";
                    break;
                case "Pretoria":
                    audio.src = "./mp3/Pretoria.mp3";
                    break;
            }
        } catch (error) {
            console.error(error);
        }

        audio.play();
    }

    //Changes pulse color during click
    function changeHolderColor(dot, pulse) {
        if (previousDot != null && previousPulse != null) {
            previousDot.style.border = "60px solid #f7f14c"
            previousPulse.style.border = "5px solid #f7f14c"
        }

        previousDot = dot;
        previousPulse = pulse;

        pulse.style.border = "5px solid #fcae2c"
        dot.style.border = "60px solid #fcae2c"
    }

    //Update text from wich radio are you listening
    function updateCurrentRadioText(title) {
        var text = document.getElementById("currentRadio")
        text.innerHTML = "Estas escuchando la rádio de " + title + " 🎵";
    }

    //Play/Pause button
    function playPause() {
        if (!audio.paused) {
            audio.pause();
            imgAudioPlay.src = "./img/play-button.svg"
        } else {
            audio.play();
            imgAudioPlay.src = "./img/pause-button.svg"
        }

    }
}