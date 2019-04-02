let dataVars = ['births', 'deaths', 'frequentBabyNames', 'frequentNames', 'population', 'unemployment']

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

