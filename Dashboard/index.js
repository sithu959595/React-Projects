/**
 * Challenge part 2: Display the image's author
 * 
 * With the data you've already fetched, display the name of the 
 * image author on the page. They show up as the "user" in the data
 * returned from the API.
 * 
 * 
 * Don't worry about positioning the author in the lower-left yet.
 */



	async function getImage(){
		try{
				let response=await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
				console.log("1")
				let data=await response.json();
				console.log("2")
				document.body.style.backgroundImage = `url(${data.urls.regular})`
				console.log("333333333")
				document.getElementById("username").textContent=`By: ${data.user.username}`;
		}
		catch(err){
			console.log("Error happens")
			document.body.style.backgroundImage =" url('https://images.unsplash.com/photo-1583743598842-89e8cc4d9641?crop=entropy&cs=tinysrgb&		fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM0NjQ4MDg&ixlib=rb-4.0.3&q=80&		w=1080')";
		}
	}
	
    getImage();
	
	
	//BitCoin
	fetch("https://api.coingecko.com/api/v3/coins/dogecoin?localization=false")
	.then(response=>{
		if(!response.ok){
			throw Error("Something went wrong")
		}
		return response.json()
		})
	.then(data=>{
		document.getElementById("crypto-top").innerHTML=`<img src=${data.image.small} /><span>${data.name}</span>`;
		document.getElementById("crypto-down").innerHTML=`
		<div>Highest: $${data.market_data.high_24h.usd}</div>
		<div>Current: $${data.market_data.current_price.usd}</div>
		<div>Lowest: $${data.market_data.low_24h.usd}</div>`;
		
		
		})
	.catch(err=>console.log(err))
	
	// let time=new Date();
	// let time1=time.getHours()>=12 ? "PM" : "AM";
	// console.log(time.toLocaleTimeString("en-US",{hour12:true,timeStyle:"short"}))
	// document.getElementById("time").textContent=time.toLocaleTimeString("en-US",{hour12:true,timeStyle:"short"});
	
	// setInterval(()=>{
	// 	console.log(time.toLocaleTimeString("en-US",{hour12:true,timeStyle:"short"}))
	// document.getElementById("time").textContent=time.toLocaleTimeString("en-US",{hour12:true,timeStyle:"short"});
	// },1000);

let curposition={lat:"",lon:""};
let curposi=new Promise((resolve,reject)=>{
navigator.geolocation.getCurrentPosition((position) => {
	curposition.lat=position.coords.latitude;
	curposition.lon=position.coords.longitude;
  
  resolve(curposition);
});}
);
function getLoca(){
	return curposi;
}
async function getWeather(){
	try{
	let p=await getLoca();
	console.log(p)
	let response=await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${p.lat}&lon=${p.lon}&units=imperial`);
	
	if(!response.ok){
		throw Error("Werather")
	}
	let data=await response.json();
	
	console.log(data);
	document.getElementById("weather").innerHTML=`
	<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />
	<div id="temperature">${Math.round(data.main.temp)}º</div>
                <div id="city">${data.name}</div>`
	
	}
	catch(error){
		console.log("Error for getting Wearther Information")
	}
	
}
getWeather();