
function create_radiobuttons() {
    $(document).ready(function(){
        for(var i=2; i<=3; i++){
            $("body").append("<label class=radio_container id=chart" +i+ "_label_gender_all ><input type='radio' class=chart2_radioBut name=chart" + i + "_gender id ='chart" + i + "_gender_all' value='all' checked='checked' /><span id=checkmark" + i + "_all class='checkmark'></span>All</label>")
            $("body").append("<label class=radio_container id=chart" +i+ "_label_gender_male ><input type='radio' class=chart2_radioBut name=chart" + i + "_gender id ='chart" + i + "_gender_male' value='Male' /><span id=checkmark" + i + "_male class='checkmark'></span>Male</label>")
            $("body").append("<label class=radio_container id=chart" +i+ "_label_gender_female ><input type='radio' class=chart2_radioBut name=chart" + i + "_gender id ='chart" + i + "_gender_female' value='Female' /><span id=checkmark" + i + "_female class='checkmark'></span>Female</label>")
            $("input[name=chart"+i+"_gender]").click({chart: i }, filter_by_gender);
            }
        });
    }

function filter_by_gender(event){
    var barrio = barrio_global
    var gender = document.querySelector("input[name=chart" + event.data.chart + "_gender]:checked").value;
    gender_global = gender
    if (event.data.chart == 2) { 
        showMigrationData(loadMigrationData(barrio, gender=gender))
    } else {
        if (gender == "Male") { gender = "Boys"}
        else if (gender == "Female") {gender = "Girls"}
        showBirthsDeathsChart(loadBirthsData(barrio, gender=gender), loadDeathsData(barrio, gender=gender))
    }
}
