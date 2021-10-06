// JavaScript Document
//Global Variables - can be used in any of the function as they re declared outside of them
var carSelected, checkedAddExtras, addCost; //GV 1 & 2 & 3
var dailyPrice = 0; //GV 4
const bookingFee = 50; //GV 5
const insuranceFee = 20; //GV 6
var totalCost = 0; //GV 7
function updateCars() {
	//This is the function called when a user selects one of the available cars on the GUI
	carSelected = this.dataset.name; //Stores the selected car
	dailyPrice = this.dataset.price; //Finds price of selected car
	window.scrollTo(0, document.getElementById("bookingInformation").offsetTop - 10);
	document.getElementById("carOutput").innerHTML = carSelected; //Outputing to the divs in your HTML that will make the details appear on the "booking information" table
	document.getElementById("priceOutput").innerHTML = "$" + (dailyPrice);
	updateBooking(); //Calling the next function which is the updateBooking() function
}

function updateBooking() {
	//This is the function called when the user enters in their reservation details and selects any extra items available
	var addExtraItems = document.getElementsByClassName("addCheck");
	//This collects all my additionalitems checkboxes and stores them in an object array
	checkedAddExtras = []; //Empty list to add the selected additional items to
	//	var addCost = 0;
	addCost = 0;
	var checkInDate = document.getElementById("checkInDate").value;
	var numberDays = document.getElementById("numberDays").value;
	var dropOffLocation = document.getElementById("dropOffLocationSelect").value;
	var pickUpLocation = document.getElementById("pickUpLocationSelect").value;
	for (var i = 0; i < addExtraItems.length; i++) {
		if (addExtraItems[i].checked) {
			checkedAddExtras.push(' ' + addExtraItems[i].value); //Finds the price value of the checked extra item
			addCost += Number(addExtraItems[i].dataset.price);
		}
	}
	//const bookingFee = 50; //GV 4
	//const insuranceFee = 20; //GV 5
	totalCost = (numberDays * dailyPrice) + addCost + bookingFee + (insuranceFee * numberDays);
	if (checkedAddExtras == 0) {
		document.getElementById("extrasOutput").innerHTML = "No Extra Options Selected";
	} else {
		document.getElementById("extrasOutput").innerHTML = checkedAddExtras;
	}
	document.getElementById("checkInDateOutput").innerHTML = checkInDate;
	document.getElementById("dayOutput").innerHTML = numberDays;
	document.getElementById("pickUpLocationOutput").innerHTML = pickUpLocation;
	document.getElementById("dropOffLocationOutput").innerHTML = dropOffLocation;
	document.getElementById("extrasPriceOutput").innerHTML = "$" + addCost.toFixed(2);
	document.getElementById("bookingFeeOutput").innerHTML = "$" + bookingFee.toFixed(2);
	document.getElementById("insuranceFeeOutput").innerHTML = "$" + (insuranceFee * numberDays).toFixed(2);
	document.getElementById("totalPriceOutput").innerHTML = "$" + totalCost.toFixed(2);
}

function checkDetailInputs() {
	//Checks that a room type has been selected
	if (carSelected == null) {
		document.getElementById("errorMessageCarSelection").innerHTML = "Please select a car to proceed";
		window.scrollTo(0, document.getElementById("errorMessageCarSelection").offsetTop - 550);
		return;
	} else {
		document.getElementById("errorMessageCarSelection").style.display = "none";
	}
	//Checks that a valid pickup date has been entered
	if (document.getElementById("checkInDate").validity.valueMissing || document.getElementById("checkInDate").validity.rangeUnderFlow || document.getElementById("checkInDate").validity.rangeOverFlow || today >= document.getElementById("checkInDate")) {
		document.getElementById("errorMessageDate1").innerHTML = "Please enter in a valid date - not a past date";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 2 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableBookingDetails").style.border = "5px solid red";
		document.getElementById("closeBookingDetails").style.maxHeight = document.getElementById("closeBookingDetails").scrollHeight + "px";
		return; //forces the user to fix their - the function will stop running
	} else {
		document.getElementById("disableBookingDetails").style.border = "none";
		document.getElementById("errorMessageDate1").style.display = "none";
		document.getElementById("closeBookingDetails").style.maxHeight = null;
	}
	if (document.getElementById("numberDays").validity.valueMissing || document.getElementById("numberDays") == null || document.getElementById("numberDays").validity.rangeOverflow || document.getElementById("numberDays").validity.rangeUndeflow) {
		document.getElementById("errorMessageNumberDays").innerHTML = "Please select a valid number of days between 1 and 21 days";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 2 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableBookingDetails").style.border = "5px solid red";
		document.getElementById("closeBookingDetails").style.maxHeight = document.getElementById("closeBookingDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableBookingDetails").style.border = "none";
		document.getElementById("errorMessageNumberDays").style.display = "none";
	}
	if (document.getElementById("pickUpLocationSelect").value == "") {
		document.getElementById("errorMessagePickupLocation").innerHTML = "Please select a pickup location for your chosen car";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 3 - Please enter valid details in all relevant fields";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableLocationDetails").style.border = "5px solid red";
		document.getElementById("closeLocationDetails").style.maxHeight = document.getElementById("closeLocationDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableLocationDetails").style.border = "none";
		document.getElementById("errorMessagePickupLocation").style.display = "none";
		document.getElementById("closeLocationDetails").style.maxHeight = null;
	}
	if (document.getElementById("dropOffLocationSelect").value == "") {
		document.getElementById("errorMessageDropOffLocation").innerHTML = "Please select a drop off location for your chosen car";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 3 - Please enter valid details in all relevant fields";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableLocationDetails").style.border = "5px solid red";
		document.getElementById("closeLocationDetails").style.maxHeight = document.getElementById("closeLocationDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableLocationDetails").style.border = "none";
		document.getElementById("errorMessageDropOffLocation").style.display = "none";
		document.getElementById("closeLocationDetails").style.maxHeight = null;
	}
	var firstName = document.getElementById("firstNameInput").value;
	var lastName = document.getElementById("lastNameInput").value;
	var emailAddress = document.getElementById("emailInput").value;
	var cellphoneNumber = document.getElementById("cellphoneInput").value;
	var userAge = document.getElementById("ageInput").value;
	var licenseNumber = document.getElementById("driversLicenseInput").value;
	document.getElementById("firstNameOutput").innerHTML = firstName;
	document.getElementById("lastNameOutput").innerHTML = lastName;
	document.getElementById("emailAddressOutput").innerHTML = emailAddress;
	document.getElementById("cellphoneNumberOutput").innerHTML = cellphoneNumber;
	document.getElementById("ageOutput").innerHTML = userAge;
	document.getElementById("driversLicenseNumberOutput").innerHTML = licenseNumber;
	// Disable the button on initial page load
	if (document.getElementById("firstNameInput").validity.patternMismatch || document.getElementById("firstNameInput").validity.valueMissing || document.getElementById("firstNameInput") == "") {
		document.getElementById("errorMessageFirstName").innerHTML = "Please enter in a valid first name (no numbers)";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageFirstName").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
	}
	if (document.getElementById("lastNameInput").validity.patternMismatch || document.getElementById("lastNameInput").validity.valueMissing || document.getElementById("lastNameInput") == "") {
		document.getElementById("errorMessageLastName").innerHTML = "Please enter in a valid last name (no numbers)";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageLastName").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
	}
	//Checks that a valid email has been entered
	if (document.getElementById("emailInput") == "" || !document.getElementById("emailInput").checkValidity()) { //checks validity of the email address
		document.getElementById("errorMessageEmailAddress").innerHTML = "Please enter in a valid email address following the requested format"; //if empty or invalid, htne prints an error message to help user with functionality 
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format";
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return; //forces the user to fix their - the function will stop running	
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageEmailAddress").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
	}
	if (document.getElementById("cellphoneInput") == "" || document.getElementById("cellphoneInput").validity.valueMissing || document.getElementById("cellphoneInput").validity.patternMismatch) {
		document.getElementById("errorMessageCellNumber").innerHTML = "Please enter in a valid cellphone number";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageCellNumber").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
	}
	if (document.getElementById("ageInput").validity.rangeOverflow || document.getElementById("ageInput").validity.rangeUnderflow || document.getElementById("ageInput").validity.valueMissing || document.getElementById("ageInput") == "") {
		document.getElementById("errorMessageAge").innerHTML = "Please enter in a valid age between 25 and 80";
		document.getElementById("errorMessageAccordions").innerHTML = "PError in Step 5 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageAge").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
	}
	if (document.getElementById("driversLicenseInput").validity.patternMismatch || document.getElementById("driversLicenseInput") == "" || document.getElementById("driversLicenseInput").validity.valueMissing) {
		document.getElementById("errorMessageDriversLicense").innerHTML = "Please enter a valid drivers license number: XX######";
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format";
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39);
		document.getElementById("disableCustomerDetails").style.border = "5px solid red";
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px";
		return;
	} else {
		document.getElementById("disableCustomerDetails").style.border = "none";
		document.getElementById("errorMessageDriversLicense").style.display = "none";
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
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
		Drivers_License_Number: licenseNumber,
		Selected_Car: carSelected,
		Check_In_Date: document.getElementById("checkInDate").value,
		Number_of_Days: document.getElementById("numberDays").value,
		Drop_Off_Location: document.getElementById("dropOffLocationSelect").value,
		Pickup_Location: document.getElementById("pickUpLocationSelect").value,
		Extras: checkedAddExtras,
		Extras_Cost: "$" + addCost,
		Insurance_Fee: "$" + insuranceFee,
		Booking_Fee: "$" + bookingFee,
		Total_cost: "$" + totalCost
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

var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}
//Event listener that will call the updateCars() fucntion when a car card is clicked on the GUI
var carInputs = document.getElementsByClassName("carCard");
for (i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCars);
}
//Event listener for when a user selects nights/dates/extras is clicked
var allExtraInputs = document.getElementsByClassName("addCheck");
for (i = 0; i < allExtraInputs.length; i++) {
	allExtraInputs[i].addEventListener('input', updateBooking);
}
//Initially disables the confirm button
document.getElementById("confirmButton").disabled = true;
////Event listener for confirm button that enables the button if the terms and condititions checkbox is ticked
//
document.getElementById('checkButton').addEventListener('click', function() {
	document.getElementById("confirmButton").disabled = !document.getElementById("confirmButton").disabled;
});
//Event listener for confirm button - once clicked, the checDetailInputs() will run
document.getElementById("confirmButton").addEventListener('click', function() {
	checkDetailInputs();
});
//document.getElementById("confirmButton").addEventListener('click', checkDetailInputs);s