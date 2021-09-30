// JavaScript Document
//Global Variables - can be used in any of the function as they re declared outside of them
var carSelected, checkedAddExtras; //GV 1 & 2
var dailyPrice = 0; //GV 3
const bookingFee = 50; //GV 4
const insuranceFee = 20; //GV 5
var totalCost = 0; //GV 6
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
	var addExtraItems = document.getElementsByClassName("addCheck");
	//This collects all my additionalitems checkboxes and stores them in an object array
	checkedAddExtras = []; //Empty list to add the selected additional items to
	var addCost = 0;
	var checkInDate = document.getElementById("checkInDate").value;
	var dropOffDate = document.getElementById("dropOffDate").value;
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
	document.getElementById("checkInDateOutput").innerHTML = checkInDate;
	document.getElementById("dropOffDateOutput").innerHTML = dropOffDate;
	document.getElementById("dayOutput").innerHTML = numberDays;
	document.getElementById("bookingFeeOutput").innerHTML = "$" + bookingFee;
	document.getElementById("insuranceFeeOutput").innerHTML = "$" + (insuranceFee * numberDays);
	document.getElementById("extrasOutput").innerHTML = checkedAddExtras;
	document.getElementById("pickUpLocationOutput").innerHTML = pickUpLocation;
	document.getElementById("dropOffLocationOutput").innerHTML = dropOffLocation;
	document.getElementById("totalPriceOutput").innerHTML = "$" + totalCost;
//	window.scrollTo(0, document.getElementById("bookingInformation").offsetTop - 49);
}

function checkDetailInputs() {
	//Checks that a room type has been selected
	if (carSelected == null) {
		document.getElementById("errorMessageCarSelection").innerHTML = "Please select a car to continue";
		window.scrollTo(0, document.getElementById("errorMessageCarSelection").offsetTop - 550);
		return;
	}
	//Checks that a valid pickup date has been entered
	if (document.getElementById("checkInDate").validity.valueMissing || document.getElementById("checkInDate").validity.rangeUnderFlow || document.getElementById("checkInDate").validity.rangeOverFlow) {
		document.getElementById("errorMessageDate1").innerHTML = "Please enter in a valid date - not a past date";
		return; //forces the user to fix their - the function will stop running
	}
	if (document.getElementById("numberDays").validity.valueMissing || document.getElementById("numberDays") == null || document.getElementById("numberDays").validity.rangeOverflow || document.getElementById("numberDays").validity.rangeUndeflow) {
		document.getElementById("errorMessageNumberDays").innerHTML = "Please select a valid number of days between 1 and 21 days";
		window.scrollTo(0, document.getElementById("numberDays").offsetTop - 49);
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
		window.scrollTo(0, document.getElementById("errorMessageFirstName").offsetTop - 49);
		return;
	}
	if (document.getElementById("lastNameInput").validity.patternMismatch || document.getElementById("lastNameInput").validity.valueMissing) {
		document.getElementById("errorMessageLastName").innerHTML = "Please enter in a valid last name (no numbers)";
		window.scrollTo(0, document.getElementById("errorMessageLastName").offsetTop - 49);
		return;
	}
	//Checks that a valid email has been entered
	if (document.getElementById("emailInput") == "" || !document.getElementById("emailInput").checkValidity()) { //checks validity of the email address
		document.getElementById("errorMessageEmailAddress").innerHTML = "Please enter in a valid email address following the requested format"; //if empty or invalid, htne prints an error message to help user with functionality 
		window.scrollTo(0, document.getElementById("errorMessageEmailAddress").offsetTop - 49);
		return; //forces the user to fix their - the function will stop running	
	}
	if (document.getElementById("cellphoneInput") == "" || document.getElementById("cellphoneInput").validity.valueMissing || document.getElementById("cellphoneInput").validity.patternMismatch) {
		document.getElementById("errorMessageCellNumber").innerHTML = "Please enter in a valid cellphone number";
		window.scrollTo(0, document.getElementById("errorMessageCellNumber").offsetTop - 49);
		return;
	}
	if (document.getElementById("ageInput").validity.rangeOverflow || document.getElementById("ageInput").validity.rangeUnderflow) {
		document.getElementById("errorMessageAge").innerHTML = "Please enter in a valid age between 25 and 80";
		window.scrollTo(0, document.getElementById("errorMessageAge").offsetTop - 49);
		return;
	}
	if (document.getElementById("driversLicenseInput").validity.patternMismatch || document.getElementById("driversLicenseInput") == null) {
		document.getElementById("errorMessageDriversLicense").innerHTML = "Please enter a valid drivers license number: XX######";
		return;
	}
	if (document.getElementById("checkButton").checked == false) {
		document.getElementById("errorMessageTermsConditions").innerHTML = "You must accept the Terms and Conditions to proceed";
		window.scrollTo(0, document.getElementById("errorMessageTermsConditions").offsetTop - 49);
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
		Drivers_License_Number: licenseNumber,
		Room_type: carSelected,
		Check_In_Date: document.getElementById("checkInDate").value,
		Drop_Off_Date: document.getElementById("dropOffDate").value,
		Number_of_Days: document.getElementById("numberDays").value,
		Drop_Off_Location: document.getElementById("dropOffLocationSelect").value,
		Pickup_Location: document.getElementById("pickUpLocationSelect").value,
		Extras: checkedAddExtras,
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
document.getElementById("dropOffDate").setAttribute("min", today);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
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
for (var i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCars);
}
//Event listener for when a user selects nights/dates/extras is clicked
var allExtraInputs = document.getElementsByClassName("addCheck");
for (i = 0; i < allExtraInputs.length; i++) {
	allExtraInputs[i].addEventListener('input', updateBooking);
}
document.getElementById("confirmButton").addEventListener('click', checkDetailInputs);