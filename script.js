const tempField = document.querySelector('.weather1')
const cityField = document.querySelector('.weather2 p')
const dateField = document.querySelector('.weather2 span');
const emojiField = document.querySelector('.weather3 p img')
const weatherField = document.querySelector('.weather3 span')
const searchField = document.querySelector('.searchField')
const form = document.querySelector('form')

// let target = "New Delhi"
async function fetchData(target) {
    const url = `https://api.weatherapi.com/v1/current.json?key=f5fd505e329f439ebce181703243103&q=${target}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data);
        //Data change after destructing
        const { 
             current: {feelslike_c , condition:{icon , text},
            },
            location : {name , localtime}
            } = data


        updateDom(feelslike_c,name,icon,localtime,text)

         } catch (error) {
        alert('Error fetching data:', error);
        } 
}

window.addEventListener("load" , ()=> {
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetchDataByCoordinates(longitude,latitude)
    }),()=> {
        fetchData('New York')
    }
   } else {
    fetchData('New York')
   }    
});

async function fetchDataByCoordinates(latitude,longitude){
    const url = `https://api.weatherapi.com/v1/current.json?key=f5fd505e329f439ebce181703243103&q=${longitude},${latitude}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        //Data change after destructing
        const { 
             current: {feelslike_c , condition:{icon , text},
            },
            location : {name , localtime}
            } = data


        updateDom(feelslike_c,name,icon,localtime,text)

         } catch (error) {
        alert('Error fetching data:', error);
        } 
}

function updateDom(temp,city,emojiCode,time, conditions){
        tempField.innerText = Math.ceil(temp)
        cityField.innerText = city;
        emojiField.src = emojiCode
        const exactTime = time.split(" ")[1];
        const exactDate = time.split(" ")[0];
        const exactDay = new Date(exactDate).getDay()
        dateField.innerHTML = `${exactTime} - ${weekDays(exactDay)} - ${exactDate}`
        weatherField.innerText = conditions
}   

function weekDays(daysIndex) {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    if (daysIndex >= 0 && daysIndex < days.length) {
    return days[daysIndex]
    } else {
        "Unknown Date"
    }
}

const search =(e) => {
    e.preventDefault();

    target = searchField.value;
    fetchData(target)
}

form.addEventListener("submit" , search)
