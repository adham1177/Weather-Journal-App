/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = 'ea388987fce4e801c9289a9f3dcfad80&units=imperial';

const generate = document.getElementById('generate') ;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1+'.'+ d.getDate()+'.'+ d.getFullYear();


//adding event listener for button 


generate.addEventListener('click' , generateData);

function generateData(e){
    e.preventDefault();
    console.log("begin");
    GetDataFromApi(baseUrl,document.getElementById('zip').value,apiKey)  
    console.log("done")


}


const GetDataFromApi = async(baseUrl,zip,apiKey) => {
    
    const res = await fetch(baseUrl +"?q=" + zip + "&appid=" + apiKey)
    
    
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        postData('/addNewData' , {temp:data.main.temp , date: newDate , feelings: document.getElementById('feelings').value})
        console.log(data)
        
        
        return data;
    } catch (error) {
        console.log('error', error);
        alert("Error Happened")
    }

    
    

    

    

    

}

const postData = async ( url = '', data = {})=>{
    console.log("entered")
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      retrieveData()
      document.getElementById("zip").value = "";
      document.getElementById("feelings").value = "";
             return newData
    }catch(error) {
    console.log("error", error);
    
    }
}


const retrieveData = async () =>{
    
 const request = await fetch('/Data');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData)
 // Write updated data to DOM elements
 document.getElementById('temp').innerHTML = "Temperature: " +  Math.round(allData.temp)+ ' degrees';
 document.getElementById('content').innerHTML = "You are feeling " + allData.feelings;
 document.getElementById('date').innerHTML ="Date: " + allData.date;
 }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
 }
}