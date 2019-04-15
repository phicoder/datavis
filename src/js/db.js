let dataVars = ['births', 'deaths', 'frequent_baby_names', 'frequent_names', 'population', 'unemployment', 'immigrants_emigrants']

var db = new loki()

dataVars.forEach(dataVar => {
    let collection = db.addCollection(dataVar)
    let data = window[dataVar]

    data.forEach(element => {
        collection.insert(element)
    })

    window[dataVar] = undefined
})


births = db.getCollection('births')
<<<<<<< HEAD
// console.log(births.find({'gender': 'Boys'}))
=======
>>>>>>> master
