// JavaScript Document
//Global Variables - can be used in any of the function as they re declared outside of them
var carSelected, addExtraItems, checkedAddExtras, numberDays, checkInDate, dropOffDate, addCost, pickUpLocation;
var bookingFee = 50;
var insuranceFee = 20;
var dailyPrice = 0;
var totalCost = 0;

function updateCars() {
	//This is the function called when a user selects one of the available cars on the GUI
	carSelected = this.dataset.name; //Stores the selected car
	alert("Car Selected: " + carSelected); //Test alert for selected car
	dailyPrice = this.dataset.price; //Finds price of selected car
	alert("Daily Price: $" + dailyPrice); //Test alert for car price
	window.scrollTo(0, document.getElementById("bookingInformation").offsetTop - 49);
	document.getElementById("carOutput").innerHTML = carSelected; //Outputing to the divs in your HTML that will make the details appear on the "booking information" table
	document.getElementById("priceOutput").innerHTML = "$" + dailyPrice;
	updateBooking(); //Calling the next function which is the updateBooking() function
}

//Event listener that will call the updateCars() fucntion when a car card is clicked on the GUI
var carInputs = document.getElementsByClassName("carCard");
for (var i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCars);
}