function filter_by_gender(chart, gender){
    var barrio = barrio_global
    gender_global = gender
    if (chart == 2) {
        showMigrationData(loadMigrationData(barrio, gender=gender))
    } else {
        if (gender == "Male") { gender = "Boys"}
        else if (gender == "Female") {gender = "Girls"}
        showBirthsDeathsChart(loadBirthsData(barrio, gender=gender), loadDeathsData(barrio, gender=gender))
    }
}
