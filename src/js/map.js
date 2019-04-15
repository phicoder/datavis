//Define global variables to sync radiobut&graph
barrio_global = 'el Raval'
gender_global = "all"

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

                            //keep track by means of global variables
                            barrio_global = barrio
                            //patch until db is all unified to Male & Female
                            //then can be removed
                            if (gender_global == "Male") { gender = "Boys"}
                            else if (gender_global == "Female") {gender = "Girls"}
                            else { gender = "all" }

                            $("#barrio_name").html(barrio)

                            var births = loadBirthsData(barrio, gender)
                            var deaths = loadDeathsData(barrio, gender)
                            showBirthsDeathsChart(births, deaths)


                            var migration = loadMigrationData(barrio, gender_global)
                            showMigrationData(migration)

                            var ageDistribution = loadAgeData(barrio)
                            showAgeDistribution(ageDistribution)

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

function loadBirthsData(barrio, gender="all"){

    var births = db.getCollection('births')
    if (gender == "all") {
        var res = births.find({ "neighborhood_name": barrio  })
    } else {
        var res = births.find({ "neighborhood_name": barrio, "gender": gender  })
    }

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

function loadDeathsData(barrio, gender="all"){

    var deaths = db.getCollection('deaths')
    if (gender == "all") {
        var res = deaths.find({ "neighborhood_name": barrio  })
    } else {
        var res = deaths.find({ "neighborhood_name": barrio, "gender": gender  })
    }

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

function loadMigrationData(barrio, gender="all"){

    var migration = db.getCollection('immigrants_emigrants')
    if ( gender == "all") {
        var res = migration.find({ "neighborhood_name": barrio })
    } else {
        var res = migration.find({ "neighborhood_name": barrio, "gender": gender })
    }


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

function loadAgeData(barrio) {

    var population = db.getCollection('population')
    var res = population.find({ "neighborhood_name": barrio })

    dict = {}
    n = res.length
    for (i = 0; i<n; i++) {

        gender = res[i].gender
        age = res[i].age
        number = res[i].number
        year = res[i].year

        if (year != 2017) continue

        if (age in dict) {
            if (gender in dict[age]) {
                dict[age][gender] += number
            } else {
                dict[age][gender] = number
            }
        }
        else {
            dict[age] = {}
            dict[age][gender] = number
        }

    }

    return dict
}




