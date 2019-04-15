var chart_3 = null
var chart_2 = null
var chart_1 = null

function showBirthsDeathsChart(births, deaths) {
    let births_x_values = []
    let births_y_values = []

    for (x in births) {
        births_x_values.push(x)
        births_y_values.push(births[x])
    }
    chart_3.series[0].update({
        data: births_y_values
    })

    let deaths_x_values = [null, null]
    let deaths_y_values = [null, null]
    for (x in deaths) {
        deaths_x_values.push(x)
        deaths_y_values.push(deaths[x])
    }
    chart_3.series[1].update({
        data: deaths_y_values
    })
    chart_3.redraw()
}

function get_birth_death_data_ready(bd) {
    let x_values = []
    let y_values = [null, null]
    if (Object.keys(bd).length === 5) {
        y_values = []
    }

    for (let x in bd) {
        x_values.push(x)
        y_values.push(bd[x])
    }
    return [x_values, y_values]
}

function get_migration_data_ready(migration) {
    let immigrants = []
    let emigrants = []
    let net = []
    for (m in migration) {
        im = migration[m].immigrants
        em = migration[m].emigrants
        immigrants.push(im)
        emigrants.push(-em)
        net.push(im - em)

    }
    return [immigrants, emigrants, net]
}

function showMigrationData(migration) {
    migration = get_migration_data_ready(migration)
    immigrants = migration[0]
    emigrants = migration[1]
    net = migration[2]
    chart_2.series[0].update({
        data: immigrants
    })
    chart_2.series[1].update({
        data: emigrants
    })
    chart_2.series[2].update({
        data: net
    })
    chart_2.redraw()

}

function get_age_distribution_ready(ageDistribution) {
    let males = []
    let females = []
    let total = 0
    for (x in ageDistribution){
        male = ageDistribution[x].Male
        female = ageDistribution[x].Female
        total = total + male + female
    }
    pct_total = 0
    for (x in ageDistribution) {
        males.push(-ageDistribution[x].Male / total * 100)
        females.push(ageDistribution[x].Female / total * 100)
    }
    return [males, females]
}

function showAgeDistribution(ageDistribution) {
    fm = get_age_distribution_ready(ageDistribution)
    males = fm[0]
    females = fm[1]
    chart_1.series[0].update({
        data: males
    })
    chart_1.series[1].update({
        data: females
    })
    chart_1.redraw()
}

$(function () {
    births = loadBirthsData('el Raval')

    deaths = loadDeathsData('el Raval')
    // update_birth_death_data_ready(births, deaths)

    birthz = get_birth_death_data_ready(births)
    births_x_values = birthz[0]
    births_y_values = birthz[1]

    deathz = get_birth_death_data_ready(deaths)
    deaths_x_values = deathz[0]
    deaths_y_values = deathz[1]


    chart_3 = new Highcharts.chart('chart_3', {
        title: {
            text: 'Births and Deaths'
        },
        yAxis: {
            title: {
                text: 'Births and deaths'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [
            {
                name: 'Births',
                data: births_y_values,
                color: '#33CEC3'
            },
            {
                name: 'Deaths',
                data: deaths_y_values,
                color: '#FD3F49'
            }
        ],
        xAxis: {
            categories: [2013, 2014, 2015, 2016, 2017],
            title: "Year"

        }
    })

    var migration = loadMigrationData('el Raval')
    var migration = get_migration_data_ready(migration)
    var immigrants = migration[0]
    var emigrants = migration[1]
    var net = migration[2]

    chart_2 = new Highcharts.chart('chart_2', {
        chart: {
            type: 'area'
        },

        title: {
            text: 'Immigration and Emigration'
        },

        yAxis: {
            title: {
                text: 'Immigration/emigration'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            area: {
                fillOpacity: 0.2,
                pointStart: 2013,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true,
                        }
                    }
                }
            }
        },

        series: [{
            name: "Immigrants",
            data: immigrants,
            color: '#009D91',
            fillColor: 'rgba(100, 203, 194, 0.5)',
            lineColor: '#009D91'

        }, {
            name: "Emigrants",
            data: emigrants,
            color: 'rgba(174, 59, 59, 1)',
            fillColor: 'rgba(237, 122, 125, 0.50)',
            lineColor: 'rgba(174, 59, 59, 1)'
        }, {
            name: "Net Migration",
            data: net,
            color: 'rgba(150, 150, 150, 1)',
            fillColor: 'rgba(183, 183, 183, 0.5)',
            lineColor: 'rgba(150, 150, 150, 1)'
        }

        ],
        xAxis: {
            categories: [2013, 2014, 2015, 2016, 2017],
            title: "Year"

        }


    })


    var ageDistribution = loadAgeData('el Raval')
    fm = get_age_distribution_ready(ageDistribution)
    males = fm[0]
    females = fm[1]


    var categories = Object.keys(ageDistribution)

    chart_1 = Highcharts.chart('chart_1', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Population Pyramid of 2017'
        },

        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value) + '%'
                }
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        tooltip: {
            formatter: function () {
                return "<b>${this.series.name} age ${this.point.category}</b><br/>Percentage: ${Highcharts.numberFormat(Math.abs(this.point.y), 0)}%"
            }
        },

        series: [{
            name: 'Male',
            data: males,
            color: '#33CEC3'
        }, {
            name: 'Female',
            data: females,
            color: '#FD3F49'
        }]
    })
})
