$.getJSON('https://raw.githubusercontent.com/martgnz/bcn-geodata/master/barris/barris_geo.json', function (geojson) {

    var data = []
    $.each(geojson.features, function (index, feature) {
        data.push({
            "N_Barri": feature.properties['N_Barri'],
            value: feature.properties['Homes'] + feature.properties['Dones']
        });
    });

    var history_color = null
    var history_disctrict = null

    // Initiate the chart
    Highcharts.mapChart('map', {

        chart: {
            map: geojson
        },

        title: {
            text: 'Districts and Population'
        },

        subtitle: {
            text: 'Choose one to see detailed information on the right'
        },

        colorAxis: {
            tickPixelInterval: 100
        },

        plotOptions: {
            series: {
                marker:{
                    states:{
                        select:{
                            fillColor:'#66ff00'
                        }
                    }
                },
                point: {
                    events: {
                        click: function () {

                            this.setState("select")
                            this.update({
                                marker:{
                                    fillColor:'#66ff00',
                                }
                            })

                            let barrio = this.N_Barri

                            $("#barrio_name").html(barrio)

                            var births = loadBirthsData(barrio)
                            var deaths = loadDeathsData(barrio)
                            showBirthsDeathsChart(births, deaths)

                            var migration = loadMigrationData(barrio)
                            //call function to load migration chart


                            //IDK if we will use this
                            //var genderData = loadGenderData(barrio)
                            //var male = genderData[0]
                            //var female = genderData[1]
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
            name: 'Population',
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
    var res = births.find({ "neighborhood_name": barrio  })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].year
        num = res[i].number
        if (year in dict) dict[year] += num
        else dict[year] = num
    }

    return dict

}

function loadDeathsData(barrio){

    var deaths = db.getCollection('deaths')
    var res = deaths.find({ "neighborhood_name": barrio })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].year
        num = res[i].number
        if (year in dict) dict[year] += num
        else dict[year] = num
    }

    return dict

}

function loadMigrationData(barrio){

    var migration = db.getCollection('immigrants_emigrants')
    var res = migration.find({ "neighborhood_name": barrio })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].year
        im = res[i].immigrants
        em = res[i].emigrants
        if (year in dict) {
            dict[year].immigrants += im
            dict[year].emigrants += em
        }
        else dict[year] = { immigrants: im, emigrants: em}
    }

    return dict

}

function loadGenderData(barrio){

    var population = db.getCollection('population')
    var res = population.find({ "neighborhood_name": barrio })

    dict_male = {}
    dict_female = {}
    n = res.length
    for (i = 0; i<n; i++) {
        year = res[i].year
        num = res[i].number
        gender = res[i].gender

        if (gender == 'male') {
            if (year in dict_male) dict_male[year] += num
            else dict_male[year] = num
        } else {
            if (year in dict_female) dict_female[year] += num
            else dict_female[year] = num
        }
    }

    return [dict_male, dict_female]

}




