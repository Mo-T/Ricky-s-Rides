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

function updateBooking() {
	//This is the function called when the user enters in their reservation details and selects any extra items available
	addExtraItems = document.getElementsByClassName("addCheck");
	//This collects all my additionalitems checkboxes and stores them in an object array
	checkedAddExtras = []; //Empty list to add the selected additional items to
	addCost = 0; 
	alert("Added Cost: $" + addCost); //test alert
	checkInDate = document.getElementById("checkInDate").value;
	alert("Check In Date: " + checkInDate);//test alert
	dropOffDate = document.getElementById("dropOffDate").value;
	alert("Drop Off Date: " + dropOffDate);//test alert
	numberDays = document.getElementById("numberDays").value;
	alert("Number of days: " + numberDays);//test alert
	pickUpLocation = document.getElementById("pickUpLocationInput").value;
	alert("Pick Up Location: " + pickUpLocation);
	for (var i = 0; i < addExtraItems.length; i++) {
		if (addExtraItems[i].checked) {
			checkedAddExtras.push(' ' + addExtraItems[i].value); //Finds the price value of the checked extra item
			alert("Extra Items Selected: " + checkedAddExtras);//test alert
			addCost += Number(addExtraItems[i].dataset.price);
			alert("Added Cost: $" + addCost);//test alert
		}
	}
	alert("Booking Fee: $" + bookingFee);//test alert
	alert("Insurance Fee: $" + insuranceFee);//test alert
	totalCost = (numberDays * dailyPrice) + addCost + bookingFee + insuranceFee;
	alert("Total Cost: $" + totalCost);//test alert
	document.getElementById("checkInDateOutput").innerHTML = checkInDate;
	document.getElementById("dropOffDateOutput").innerHTML = dropOffDate;
	document.getElementById("dayOutput").innerHTML = numberDays;
	document.getElementById("bookingFeeOutput").innerHTML = "$" + bookingFee;
	document.getElementById("insuranceFeeOutput").innerHTML = "$" + insuranceFee;
	document.getElementById("extrasOutput").innerHTML = checkedAddExtras;
	document.getElementById("pickUpLocationOutput").innerHTML = pickUpLocation;
	document.getElementById("totalPriceOutput").innerHTML = "$" + totalCost;
}

//Event listener that will call the updateCars() fucntion when a car card is clicked on the GUI
var carInputs = document.getElementsByClassName("carCard");
for (var i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCars);
}
//Event listener for when a user selects nights/dates/extras is clicked
var allExtraInputs = document.getElementsByClassName("addCheck");
for (i = 0; i < allExtraInputs.length; i++) {
	allExtraInputs[i].addEventListener('input', updateBooking);
}