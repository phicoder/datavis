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
                            var births = loadBirthsData(this.N_Barri)
                            var deaths = loadDeathsData(this.N_Barri)
                            showBirthsDeathsChart(births, deaths)

                            var genderData = loadGenderData(this.N_Barri)
                            var male = genderData[0]
                            var female = genderData[1]
                            // call function to load second chart with parameters male and female


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

function loadGenderData(barrio){

    var population = db.getCollection('population')
    var res = population.find({ "Neighborhood Name": barrio })

    dict_male = {}
    dict_female = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].Year
        num = res[i].Number
        gender = res[i].Gender

        if (gender == 'Male') {
            if (year in dict_male) dict_male[year] += num
            else dict_male[year] = num
        } else {
            if (year in dict_female) dict_female[year] += num
            else dict_female[year] = num
        }
    }

    return [dict_male, dict_female]

}




