
var map = L.map('theMap').setView([44.650627, -63.597140], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let lastLonitude=0;
let timeCount=0;
setInterval(async () => {
    const render = function () {

        const ABusData = dataNew.entity.filter(p => p.vehicle.vehicle.id == 2740)
        console.log(ABusData)

        renderBuses(L, ABusData, map)

    }

    const url = "https://hrmbuses.azurewebsites.net";
    const dataNew = await fetch(url).then(p => p.json())
    // console.log(dataNew.entity)
    console.log("Length", dataNew.entity.length)

    let renderBuses = (L, busData, map) => {

        console.log([busData[0].vehicle.position.latitude, busData[0].vehicle.position.longitude])
        if(lastLonitude==busData[0].vehicle.position.longitude) {timeCount++; return}
        lastLonitude=busData[0].vehicle.position.longitude;
        
        console.log("time refresh at:",timeCount)
        timeCount=0
        busData.forEach(b => L.marker([b.vehicle.position.latitude, b.vehicle.position.longitude]).addTo(map)
            .bindPopup('This is the running bus')
            .openPopup())
    }

    render()

}, 1000)
//import data from "./data";

// console.dir(data)