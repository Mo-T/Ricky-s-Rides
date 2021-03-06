// JavaScript Document
//Global Variables - can be used in any of the function as they re declared outside of them
var carSelected, addExtraItems, checkedAddExtras, numberDays, checkInDate, dropOffDate, addCost, pickUpLocation, dropOffLocation;
var bookingFee = 50;
var insuranceFee = 20;
var dailyPrice = 0;
var totalCost = 0;

function updateCars() {
	//This is the function called when a user selects one of the available cars on the GUI
	carSelected = this.dataset.name; //Stores the selected car
	dailyPrice = this.dataset.price; //Finds price of selected car
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
	checkInDate = document.getElementById("checkInDate").value;
	dropOffDate = document.getElementById("dropOffDate").value;
	numberDays = document.getElementById("numberDays").value;
	dropOffLocation = document.getElementById("dropOffLocationSelect").value;
	pickUpLocation = document.getElementById("pickUpLocationSelect").value;
	for (var i = 0; i < addExtraItems.length; i++) {
		if (addExtraItems[i].checked) {
			checkedAddExtras.push(' ' + addExtraItems[i].value); //Finds the price value of the checked extra item
			addCost += Number(addExtraItems[i].dataset.price);
		}
	}
	totalCost = (numberDays * dailyPrice) + addCost + bookingFee + insuranceFee;
	document.getElementById("checkInDateOutput").innerHTML = checkInDate;
	document.getElementById("dropOffDateOutput").innerHTML = dropOffDate;
	document.getElementById("dayOutput").innerHTML = numberDays;
	document.getElementById("bookingFeeOutput").innerHTML = "$" + bookingFee;
	document.getElementById("insuranceFeeOutput").innerHTML = "$" + insuranceFee;
	document.getElementById("extrasOutput").innerHTML = checkedAddExtras;
	document.getElementById("pickUpLocationOutput").innerHTML = pickUpLocation;
	document.getElementById("dropOffLocationOutput").innerHTML = dropOffLocation;
	document.getElementById("totalPriceOutput").innerHTML = "$" + totalCost;
}

function checkDetailInputs() {
	//Checks that a room type has been selected
	if (carSelected == null) {
		document.getElementById("errorMessageCarSelection").innerHTML = "Please select one of the cars available";
		return;
	}
	
	//Checks that a valid pickup date has been entered
	if (document.getElementById("checkInDate").validity.valueMissing || document.getElementById("checkInDate").validity.rangeUnderFlow || document.getElementById("checkInDate").validity.rangeOverFlow) {
		document.getElementById("errorMessageDate1").innerHTML = "Please enter in a valid date - not a past date";
		return; //forces the user to fix their - the function will stop running
	}
	
	if (document.getElementById("numberDays").validity.rangeOverflow || document.getElementById("numberDays").validity.rangeUndeflow) {
		document.getElementById("errorMessagesNumberDays").innerHTML = "Please select a valid number of days between 1 and 21 days";
		return;
	}
	
	if ( document.getElementById("dropOffDate").value <= document.getElementById("checkInDate").value) {
		alert("yo");
		return;
	}
	
	var firstName = document.getElementById("firstNameInput").value;
	var lastName = document.getElementById("lastNameInput").value;
	var emailAddress = document.getElementById("emailInput").value;
	var cellphoneNumber = document.getElementById("cellphoneInput").value;
	var userAge = document.getElementById("ageInput").value;
	var licenseNumber = document.getElementById("driversLicenseInput").value;
	
	if (document.getElementById("firstNameInput").validity.patternMismatch || document.getElementById("firstNameInput").validity.valueMissing) {
		document.getElementById("errorMessageFirstName").innerHTML = "Please enter in a valid first name (no numbers)";
		return;
	}
	if (document.getElementById("lastNameInput").validity.patternMismatch || document.getElementById("lastNameInput").validity.valueMissing) {
		document.getElementById("errorMessageLastName").innerHTML = "Please enter in a valid last name (no numbers)";
		return;
	}
	//Checks that a valid email has been entered
	if (document.getElementById("emailInput") == "" || !document.getElementById("emailInput").checkValidity()) { //checks validity of the email address
		document.getElementById("errorMessageEmailAddress").innerHTML = "Please enter in a valid email address following the requested format"; //if empty or invalid, htne prints an error message to help user with functionality 
		return; //forces the user to fix their - the function will stop running	
	}
	
	if (document.getElementById("cellphoneInput") == "" || document.getElementById("cellphoneInput").validity.valueMissing || document.getElementById("cellphoneInput").validity.patternMismatch) {
		document.getElementById("errorMessageCellNumber").innerHTML = "Please enter in a valid cellphone number";
		return;
	}
	
	if (document.getElementById("ageInput").validity.rangeOverflow || document.getElementById("ageInput").validity.rangeUnderflow) {
		document.getElementById("errorMessageAge").innerHTML = "Please enter in a valid age between 25 and 80";
		return;
	}
	
	if (document.getElementById("driversLicenseInput").validity.patternMismatch || document.getElementById("driversLicenseInput").cehckValidity()) {
		document.getElementById("errorMessageDriversLicnese").innerHTML = "Please enter your drivers license number: ########";
		return;
	}
	
	if (document.getElementById("checkButton").checked == false) {
		document.getElementById("errorMessageTermsConditions").innerHTML = "You must accept the Terms and Conditions to proceed";
		return;
	}
	
	pushData(firstName, lastName, emailAddress, cellphoneNumber, userAge, licenseNumber);
}

function pushData(firstName, lastName, emailAddress, cellphoneNumber, userAge, licenseNumber) {
	//creating the link to Firebase and pushing to the booking node
	var database = firebase.database(); //connecting to database
	var reservationsRef = database.ref('reservations'); //creating a reference to this node in your databse
	var reservations = { //creating a JSON file to be sent over the web
		//creating a key pair user_name will be the name of the field in your database
		First_name: firstName,
		Last_name: lastName,
		Age: userAge,
		Phone_number: cellphoneNumber,
		Email_address: emailAddress,
		Check_In_Date: checkInDate,
		Drop_Off_Date: dropOffDate,
		Extras: checkedAddExtras,
		Room_type: carSelected,
		Pickup_Location: pickUpLocation,
		Drop_Off_Location: dropOffLocation,
		Total_cost: "$" + totalCost,
		Drivers_License_Number: licenseNumber,
		Number_of_Days: numberDays
	};
	reservationsRef.push(reservations); //pushing the JSON file to your database
	document.getElementById('confirmOverlay').style.height = "100%"; //displays the confirm overlay
	setTimeout(function() { //sets a timer of 4 seconds and will refresh the page 
		location.reload();
	}, 4000);
} //end of function

//creating new variables to check the date select is only a present date 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("checkInDate").setAttribute("min", today);
document.getElementById("dropOffDate").setAttribute("min", today);

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
document.getElementById("confirmButton").addEventListener('click', checkDetailInputs);