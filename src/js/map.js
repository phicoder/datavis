$.getJSON('https://raw.githubusercontent.com/martgnz/bcn-geodata/master/barris/barris_geo.json', function (geojson) {

    var data = []
    $.each(geojson.features, function (index, feature) {
        data.push({
            "N_Barri": feature.properties['N_Barri'],
            value: feature.properties['C_Barri']
        });
    });

    console.log(data)

    // Initiate the chart
    Highcharts.mapChart('map', {
        chart: {
            map: geojson
        },

        title: {
            text: 'Population of Barcelona'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            tickPixelInterval: 100,
            min: 0,
            max: 80
        },

        series: [{
            data: data,
            mapData: geojson,
            joinBy: 'N_Barri',
            name: 'Random data',
            states: {
                hover: {
                    color: '#a4edba',
                    tooltip: {
                        enabled: false
                    }
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.N_Barri}'
            }
        }]

    });


});


