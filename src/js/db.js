let dataVars = ['births', 'deaths', 'frequent_baby_names', 'frequent_names', 'population', 'unemployment', 'immigrants_emigrants']

var db = new loki()

dataVars.forEach(dataVar => {
    let collection = db.addCollection(dataVar)
    let data = window[dataVar]

    data.forEach(element => {
        collection.insert(element)
    })

    console.log(window)
    window[dataVar] = undefined
    console.log(window)
})

