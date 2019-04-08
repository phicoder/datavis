$.getJSON('https://raw.githubusercontent.com/martgnz/bcn-geodata/master/barris/barris_geo.json', function (geojson) {

    var data = []
    $.each(geojson.features, function (index, feature) {
        data.push({
            "N_Barri": feature.properties['N_Barri'],
            value: feature.properties['C_Barri']
        });
    });

    // Initiate the chart
    Highcharts.mapChart('map', {

        chart: {
            map: geojson
        },

        title: {
            text: 'Population of Barcelona'
        },

        colorAxis: {
            tickPixelInterval: 100,
            min: 0,
            max: 80
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function () {
                            console.log('i am here')
                            var births = loadBirthsData(this.N_Barri)
                            var deaths = loadDeathsData(this.N_Barri)
                            showBirthsDeathsChart(births, deaths)
                        }
                    }
                }
            }
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

function loadBirthsData(barrio){

    var births = db.getCollection('births')
    var res = births.find({ "Neighborhood Name": barrio })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].Year
        num = res[i].Number
        if (year in dict) dict[year] += num
        else dict[year] = num
    }

    return dict

}

function loadDeathsData(barrio){

    var deaths = db.getCollection('deaths')
    var res = deaths.find({ "Neighborhood Name": barrio })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].Year
        num = res[i].Number
        if (year in dict) dict[year] += num
        else dict[year] = num
    }

    return dict

}



