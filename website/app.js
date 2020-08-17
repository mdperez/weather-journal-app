/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=3d381da34e0ca6316174ac6da304308b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async (baseURL, zipCode, key)=>{
    const res = await fetch(baseURL+zipCode+key)
    try {
        const data = await res.json();
        return data;
    }  catch(error) {
        console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, { 
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),       
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

const getData = async (url='') => { 
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData;
    }
    catch(error) {
        console.log("error", error);
    }
};

const updateUI = data => {
    document.querySelector("#date").textContent = data.date;
    document.querySelector("#temp").textContent = data.temperature;
    document.querySelector("#content").textContent = data.userResponse;
};


const generateEntry = () => {
    const zipCode = document.querySelector("#zip").value;
    getWeather(baseURL,zipCode,apiKey).then((data) => {
        const userResponse = document.querySelector("#feelings").value;
        const entry = {
            // generates a new timestamp to have unique ids
            key: +new Date(),
            temperature: data.main.temp,
            date: newDate,
            userResponse: userResponse
        }
        postData("/entry", entry).then(() => { 
            getData("/lastEntry").then((data) => {
                updateUI(data);
            });
        });
    });
}


document.querySelector("#generate").addEventListener("click", generateEntry);