// function showBirthsDeathsChart(births, deaths){
//     // births = loadBirthsData('el Raval')
//     births_x_values = []
//     births_y_values = []
//
//     for (x in births){
//         births_x_values.push(x)
//         births_y_values.push(births[x])
//     }
//     var chart_1 = new Highcharts.chart('chart_1', {
//
//         title: {
//             text: 'Solar Employment Growth by Sector, 2010-2016'
//         },
//
//         subtitle: {
//             text: 'Source: thesolarfoundation.com'
//         },
//
//         yAxis: {
//             title: {
//                 text: 'Number of Employees'
//             }
//         },
//         legend: {
//             layout: 'vertical',
//             align: 'right',
//             verticalAlign: 'middle'
//         },
//
//         plotOptions: {
//             series: {
//                 label: {
//                     connectorAllowed: false
//                 }
//                     // ,
//                 // pointStart: 2010
//             }
//         },
//         series: [{
//             name: 'Births',
//             data: births_y_values
//         }
//         // ,{
//         //     name: 'Deaths',
//         //     data: deaths_y_values
//         // }
//         ],
//         xAxis: {
//             categories: births_x_values
//         }
//
//
//     });
// }

function showBirthsDeathsChart(births, deaths) {
    let births_x_values = []
    let births_y_values = []

    for (x in births) {
        births_x_values.push(x)
        births_y_values.push(births[x])
    }
    chart_1.series[0].update({
        data: births_y_values
    })
    chart_1.xAxis.update({
        categories: births_x_values
    })
    chart_1.redraw()
}


var chart_1 = null

$(function () {
    births = loadBirthsData('el Raval')
    let births_x_values = []
    let births_y_values = []

    for (let x in births) {
        births_x_values.push(x)
        births_y_values.push(births[x])
    }

    chart_1 = new Highcharts.chart('chart_1', {

        title: {
            text: 'Births and Deaths'
        },

        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },

        yAxis: {
            title: {
                text: 'Births'
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
                // ,
                // pointStart: 2013
            }
        },

        series: [{
            name: 'Births',
            data: births_y_values
            // categories: births_x_values

        }
            // ,{
            //     name: 'Deaths',
            //     data: deaths_y_values
            // }
        ],
        xAxis: {
            categories: births_x_values,
            title: "Year"

        }


    })


    var chart_2 = new Highcharts.chart('chart_2', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
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
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],


    })

    var chart_3 = new Highcharts.chart('chart_3', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
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
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],


    })


    // var chart_4 = new Highcharts.chart('chart_4', {
    //
    //     title: {
    //         text: 'Solar Employment Growth by Sector, 2010-2016'
    //     },
    //
    //     subtitle: {
    //         text: 'Source: thesolarfoundation.com'
    //     },
    //
    //     yAxis: {
    //         title: {
    //             text: 'Number of Employees'
    //         }
    //     },
    //     legend: {
    //         layout: 'vertical',
    //         align: 'right',
    //         verticalAlign: 'middle'
    //     },
    //
    //     plotOptions: {
    //         series: {
    //             label: {
    //                 connectorAllowed: false
    //             },
    //             pointStart: 2010
    //         }
    //     },
    //
    //     series: [{
    //         name: 'Installation',
    //         data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    //     }, {
    //         name: 'Manufacturing',
    //         data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    //     }, {
    //         name: 'Sales & Distribution',
    //         data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    //     }, {
    //         name: 'Project Development',
    //         data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    //     }, {
    //         name: 'Other',
    //         data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    //     }],
    //
    //
    // });

})
