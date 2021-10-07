// JavaScript Document
//Global Variables (GV) - can be used in any of the function as they are declared outside of them
var carSelected, checkedAddExtras, addCost; //GV 1, 2 & 3
var dailyPrice = 0; //GV 4
const bookingFee = 50; //GV 5
const insuranceFee = 20; //GV 6
var totalCost = 0; //GV 7
function updateCars() {
	//This is the function called when a user selects one of the available cars on the GUI - responsible for finding and storing the details about the chosen car
	carSelected = this.dataset.name; //Stores the selected car
	dailyPrice = this.dataset.price; //Finds price of selected car
	window.scrollTo(0, document.getElementById("bookingInformation").offsetTop - 10);
	document.getElementById("carOutput").innerHTML = carSelected; //Outputing to the divs in your HTML that will make the details appear on the "booking information" table
	document.getElementById("priceOutput").innerHTML = "$" + (dailyPrice); //Outputs the daily price of the chosen vehicle to the summary table
	updateBooking(); //Calling the next function which is the updateBooking() function
} //End of the function	
function updateBooking() {
	//This is the function called when the user enters in their reservation details and selects any extra items available
	var addExtraItems = document.getElementsByClassName("addCheck");
	//This collects all my additionalitems checkboxes and stores them in an object array
	checkedAddExtras = []; //Empty list to add the selected additional items to
	addCost = 0; //Defining the value of the cost of the extra options as $0
	var checkInDate = document.getElementById("checkInDate").value; //Stores the selected check in date  
	var numberDays = document.getElementById("numberDays").value; //Stores the selected number of days for the reservation
	var pickUpLocation = document.getElementById("pickUpLocationSelect").value; //Stores the pickup location of the chosen car
	var dropOffLocation = document.getElementById("dropOffLocationSelect").value; //Stores the drop off location of the chosen car
	for (var i = 0; i < addExtraItems.length; i++) { //for loop to check for any selected extra options
		if (addExtraItems[i].checked) { //If statement to check for any selected options
			checkedAddExtras.push(' ' + addExtraItems[i].value); //Finds the price value of the checked extra item and also adds the selected item to the checkedExtraExtras list where it is stored
			addCost += Number(addExtraItems[i].dataset.price); //Adds the price value of the selected extra items to the addCost 
		}
	} //End of forloop
	totalCost = (numberDays * dailyPrice) + addCost + bookingFee + (insuranceFee * numberDays); //Calculates the total cost of ther reservation
	if (checkedAddExtras == 0) { //Checking whether the checkAddExtras list contains any selected extra items 
		document.getElementById("extrasOutput").innerHTML = "No Extra Options Selected"; //if there are no stored extra items, this message will be outputted to the summary table
	} else { //If there are extra items that are selected, this segment of the if statement will run
		document.getElementById("extrasOutput").innerHTML = checkedAddExtras; //Stored extra items will be outputted to the summary table
	} //End of the if statement
	document.getElementById("checkInDateOutput").innerHTML = checkInDate; //Outputs the check in date of the reservation to the summary table
	document.getElementById("dayOutput").innerHTML = numberDays; //Outputs the number of days for the reservation to the summary table
	document.getElementById("pickUpLocationOutput").innerHTML = pickUpLocation; //Outputs the selected pick up location of the reservation to the summary table
	document.getElementById("dropOffLocationOutput").innerHTML = dropOffLocation; //Outputs the selected frop off date of the reservation to the summary table
	document.getElementById("extrasPriceOutput").innerHTML = "$" + addCost.toFixed(2); //Outputs the price value of the extra items to the summary table to two decimal places
	document.getElementById("bookingFeeOutput").innerHTML = "$" + bookingFee.toFixed(2); //Outputs the booking fee of the reservation to the summary table to two decimal places
	document.getElementById("insuranceFeeOutput").innerHTML = "$" + (insuranceFee * numberDays).toFixed(2); //Outputs the insurance fee for the period of the reservation to the summary table to two decimal places
	document.getElementById("totalPriceOutput").innerHTML = "$" + totalCost.toFixed(2); //Outputs the total cost of the reservation to the summary table to two decimal places
	enterDetailInputs();
} //End of the function
function enterDetailInputs() {
	//This function will run once the confirm button is clicked
	//This function will store and output the personal details of the user to the summary table
	var firstName = document.getElementById("firstNameInput").value; //Stores the first name of the user in a variable called "firstName"
	var lastName = document.getElementById("lastNameInput").value; //Stores the last name of the user in a variable called "lastName"
	var emailAddress = document.getElementById("emailInput").value; //Stores the email address of the user in a variable called "emailAddress"
	var cellphoneNumber = document.getElementById("cellphoneInput").value; //Stores the cellphone number of the user in a variable called "cellphoneNumber"
	var userAge = document.getElementById("ageInput").value; //Stores the age of the user in a variable called "userAge"
	var licenseNumber = document.getElementById("driversLicenseInput").value; //Stores the drivers license number of the user in a variable called "licenseNumber"
	document.getElementById("firstNameOutput").innerHTML = firstName; //Outputs the first name of the user to the summary table
	document.getElementById("lastNameOutput").innerHTML = lastName; //Outputs the last name of the user to the summary table
	document.getElementById("emailAddressOutput").innerHTML = emailAddress; //Outputs the email address of the user to the summary table
	document.getElementById("cellphoneNumberOutput").innerHTML = cellphoneNumber; //Outputs the cellphone number of the user to the summary table
	document.getElementById("ageOutput").innerHTML = userAge; //Outputs the age of the user to the summary table
	document.getElementById("driversLicenseNumberOutput").innerHTML = licenseNumber; //Outputs the drivers license number of the user to the summary table
} //End of the function
function checkAllInputs() {
	//This function will control the error message and the validity of the information entered into each field in the GUI
	//If any field contains invalid data, error messages that match the field of error (from below) will be displayed and the prgram will stop until the errors are fixed
	//Checks that a car type has been selected 
	if (carSelected == null) {
		document.getElementById("errorMessageCarSelection").innerHTML = "Please select a car to proceed"; //If no car has been selected, this error message will be outputted to the relevant error message div that will display this message in red under the input field
		window.scrollTo(0, document.getElementById("errorMessageCarSelection").offsetTop - 550); //Window scroll which automatically scrolls the page to the location of the error message
		return; //Forces the user to select one of the available cars - function will stop running until the error is fixed and confirmed
	} else {
		document.getElementById("errorMessageCarSelection").style.display = "none"; //If a car is selected, the error message will not be displayed 
	} //End of this is statement
	//Checks that a valid pickup date has been entered
	if (document.getElementById("checkInDate").validity.valueMissing || document.getElementById("checkInDate").validity.rangeUnderFlow || document.getElementById("checkInDate").validity.rangeOverFlow || document.getElementById("checkInDate").value < today) {
		document.getElementById("errorMessageDate1").innerHTML = "Please enter in a valid date - not a past date"; //If the selected date is invalid (past date), this error message will be outputted to the relevant error message div that will display this message in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 2 - Please enter valid details in all fields and follow the requested format"; //Error message that will alert the user that there is an error within the step 2 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll that scrolls the page to the location of the accordions
		document.getElementById("disableBookingDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeBookingDetails").style.maxHeight = document.getElementById("closeBookingDetails").scrollHeight + "px"; //Opens the accordion that contains the error for the user to fix
		document.getElementById("closeLocationDetails").style.maxHeight = null; //These three statements will close the other accordions so that only the accordion with the error messga eis displayed/open
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //forces the user to select a valid pickup date - the function will stop running until the error is fixed and confirmed
	} else { //If the inputs fields are valid, then this segment of the if statement will run
		document.getElementById("disableBookingDetails").style.border = "none"; //The red border will not be displayed around the relevant accordion
		document.getElementById("errorMessageDate1").innerHTML = ""; //Displays nothing in the error message div - no error message is displayed
		document.getElementById("closeBookingDetails").style.maxHeight = null; //Closes the accordion that is valid which in this case is the step 2/booking details accordion after the confirm button is clicked
	} //End of this if statement
	//Checks that a valid number of days has been entered
	if (document.getElementById("numberDays").validity.valueMissing || document.getElementById("numberDays") == null || document.getElementById("numberDays").validity.rangeOverflow || document.getElementById("numberDays").validity.rangeUnderflow) {
		document.getElementById("errorMessageNumberDays").innerHTML = "Please select a valid number of days between 1 and 21 days"; //If the entered number of days is invalid (1-21), this error message will be ouputted to the relevant error message div that will display this error message in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 2 - Please enter valid details in all fields and follow the requested format"; //Error message alerting the user that there is an error in the step 2/booking details accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll that scrolls the page to the location of the accordions
		document.getElementById("disableBookingDetails").style.border = "4px solid red"; //Displays a red border around the accordion containing the invalid error and error message
		document.getElementById("closeBookingDetails").style.maxHeight = document.getElementById("closeBookingDetails").scrollHeight + "px"; //Opens the accordion containing the error
		document.getElementById("closeLocationDetails").style.maxHeight = null; //These three statements will close the other accordions if they are open
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid number of days - the function will stop running until the error is fixed and confirmed
	} else { //If the number of days entered is valid, this segment of the if statement will run
		document.getElementById("disableBookingDetails").style.border = "none"; //Red border is set to display: none, which means that it won't be seen as there is no error
		document.getElementById("errorMessageNumberDays").innerHTML = ""; //The error message div will not display an error message - empty div as there is no error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //Closes the booking details accordion after confirm button is clicked 
	} //End of this if statement
	//Checks that a valid pickup location has been entered/selected
	if (document.getElementById("pickUpLocationSelect").value == "") {
		document.getElementById("errorMessagePickupLocation").innerHTML = "Please select a pickup location for your chosen car"; //If no pickup location is selected, this error message will be outputted to the relevant error message div tha will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 3 - Please enter valid details in all relevant fields"; //Alerts the user that there is an error in the step 3/location accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions 
		document.getElementById("disableLocationDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error(s)
		document.getElementById("closeLocationDetails").style.maxHeight = document.getElementById("closeLocationDetails").scrollHeight + "px"; //Opens the accordion that contains the error message and the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements will close the other accordions so that only the invalid accordion will be open
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid pickup location - function will stop running until the error is fixed
	} else { //If a valid pickup location is selected, this segment of the if statement will run
		document.getElementById("disableLocationDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessagePickupLocation").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeLocationDetails").style.maxHeight = null; //The corresponding accordion will close once confirm button is clicked if all input fields are valid
	} //End of this if statement
	//Checks that a valid drop off location has been entered/selected
	if (document.getElementById("dropOffLocationSelect").value == "") {
		document.getElementById("errorMessageDropOffLocation").innerHTML = "Please select a drop off location for your chosen car"; //If no drop off location is selected, this error message will be outputted to the relevant error message div tha will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 3 - Please enter valid details in all relevant fields"; //Alerts the user that there is an error in the step 3/location accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions 
		document.getElementById("disableLocationDetails").style.border = "4px solid red";
		document.getElementById("closeLocationDetails").style.maxHeight = document.getElementById("closeLocationDetails").scrollHeight + "px"; //Opens the accordion that contains the error message and the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements will close the other accordions so that only the invalid accordion will be open
		document.getElementById("closeCustomerDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid drop off location - function will stop running until the error is fixed
	} else { //If a valid drop off location is selected, this segment of the if statement will run
		document.getElementById("disableLocationDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageDropOffLocation").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeLocationDetails").style.maxHeight = null; //The corresponding accordion will close once confirm button is clicked if all input fields are valid
	} //End of this if statement
	//Checks that a valid first name has been entered
	if (document.getElementById("firstNameInput").validity.patternMismatch || document.getElementById("firstNameInput").validity.valueMissing || document.getElementById("firstNameInput") == "") {
		document.getElementById("errorMessageFirstName").innerHTML = "Please enter in a valid first name (no numbers)"; //If an invalid first name has been entered, this error message will be outputted to the corresponding div that will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid first name - function will stop running until the error is fixed
	} else { //If the first name is valid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageFirstName").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details will close once confirm button is clicked if all input fields are valid
	} //End of this if statement
	//Checks that a valid last name has been entered
	if (document.getElementById("lastNameInput").validity.patternMismatch || document.getElementById("lastNameInput").validity.valueMissing || document.getElementById("lastNameInput") == "") {
		document.getElementById("errorMessageLastName").innerHTML = "Please enter in a valid last name (no numbers)"; //If an invalid last name has been entered, this error message will be outputted to the corresponding div that will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the customer details accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid last name - function will stop running until the error is fixed
	} else { //If the last name is valid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageLastName").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details accordion will close once confirm button is clicked if all input fields are valid
	} //End of this if statement
	//Checks that a valid email has been entered
	if (document.getElementById("emailInput") == "" || !document.getElementById("emailInput").checkValidity()) { //checks validity of the email address
		document.getElementById("errorMessageEmailAddress").innerHTML = "Please enter in a valid email address following the requested format"; //If the email address is invalid, this error message will be outputted to the corresponding div that will display it in red under the input field
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the customer details accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //forces the user to enter a valid email address - the function will stop running until the error is fixed
	} else { //If the email address is valid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageEmailAddress").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details accordion will close once confirm button is clicked if all input fields are valid
	} //End of this if statement
	//Checks that a valid cellphone number has been entered
	if (document.getElementById("cellphoneInput") == "" || document.getElementById("cellphoneInput").validity.valueMissing || document.getElementById("cellphoneInput").validity.patternMismatch) {
		document.getElementById("errorMessageCellNumber").innerHTML = "Please enter in a valid cellphone number"; //If the cellphone number is invalid, this error message will be outputted to the corresponding div that will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the customer details accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //forces the user to enter a valid cellphone number - the function will stop running until the error is fixed
	} else { //If the cellphone number is valid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageCellNumber").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details accordion will close once confirm button is clicked if all input fields are 
	} //End of this if statement
	//Checks that a valid age has been entered/selected
	if (document.getElementById("ageInput").validity.rangeOverflow || document.getElementById("ageInput").validity.rangeUnderflow || document.getElementById("ageInput").validity.valueMissing || document.getElementById("ageInput") == "") {
		document.getElementById("errorMessageAge").innerHTML = "Please enter in a valid age between 25 and 80"; //If the cellphone number is invalid (not 25-80), this error message will be outputted to the corresponding div that will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the customer details accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid age - function will stop running until the error is fixed
	} else { //If the age entered is invalid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageAge").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details accordion will close once confirm button is clicked if all input fields are 
	} //End of this if statement
	//Checks that a valiud drivers license number has been entered
	if (document.getElementById("driversLicenseInput").validity.patternMismatch || document.getElementById("driversLicenseInput") == "" || document.getElementById("driversLicenseInput").validity.valueMissing) {
		document.getElementById("errorMessageDriversLicense").innerHTML = "Please enter a valid drivers license number: XX######"; //If the drivers license number is invalid (not 2 letters an 6 numbers), this error message will be outputted to the corresponding div that will display it in red under the input field
		document.getElementById("errorMessageAccordions").innerHTML = "Error in Step 5 - Please enter valid details in all fields and follow the requested format"; //Alerts the user that there is an error in the step 5 accordion
		window.scrollTo(0, document.getElementById("accordionWindowScroll").offsetTop - 39); //Window scroll scrolls the page to the location of the accordions
		document.getElementById("disableCustomerDetails").style.border = "4px solid red"; //Displays a red border around the accordion that contains the error
		document.getElementById("closeCustomerDetails").style.maxHeight = document.getElementById("closeCustomerDetails").scrollHeight + "px"; //Opens the customer details accoridon containing the error
		document.getElementById("closeBookingDetails").style.maxHeight = null; //These three statements close the other accordions so that only the customer details accordion is open when invalid
		document.getElementById("closeLocationDetails").style.maxHeight = null;
		document.getElementById("panel_extras").style.maxHeight = null;
		return; //Forces the user to enter a valid drivers license number - function will stop running until the error is fixed
	} else { //If the drivers license number is valid, this segment of the if statement will run
		document.getElementById("disableCustomerDetails").style.border = "none"; //Sets the display for the red border to none - the border will not be displayed
		document.getElementById("errorMessageDriversLicense").innerHTML = ""; //Sets the display for the error message to none - error message will not be displayed
		document.getElementById("closeCustomerDetails").style.maxHeight = null; //The customer details accordion will close once confirm button is clicked if all input fields are 
	} //End of this if statement
	pushData(); //Calls the pushData function that will push data to firebase
} //End of the function
function pushData() {
	//This function is responsible for the creation of a JSON file containing all of the users reservation details that will be pushed to a Firebase database
	//Creating the link to Firebase and pushing to the booking node
	var database = firebase.database(); //Connecting to database
	var reservationsRef = database.ref('reservations'); //Creating a reference to this node in the databse called 'reservations'
	var reservations = { //Creating a JSON file to be sent over the web
		//Creating a key pair for the variables 
		First_name: document.getElementById("firstNameInput").value, //First_Name will be the name of the field in the database 
		Last_name: document.getElementById("lastNameInput").value, //Last_name will be the name of the field in the database 
		Age: document.getElementById("ageInput").value, //Age will be the name of the field in the database 
		Phone_number: document.getElementById("cellphoneInput").value, //Phone_number will be the name of the field in the database 
		Email_address: document.getElementById("emailInput").value, //Email_address will be the name of the field in the database 
		Drivers_License_Number: document.getElementById("driversLicenseInput").value, //Drivers_License_Number will be the name of the field in the database 
		Selected_Car: carSelected, //Selected_Car will be the name of the field in the database 
		Check_In_Date: document.getElementById("checkInDate").value, //Check_In_Date will be the name of the field in the database 
		Number_of_Days: document.getElementById("numberDays").value, //Number_of_Days will be the name of the field in the database 
		Drop_Off_Location: document.getElementById("dropOffLocationSelect").value, //First_Name will be the name of the field in the database 
		Pickup_Location: document.getElementById("pickUpLocationSelect").value, //Drop_Off_Location will be the name of the field in the database 
		Extras: checkedAddExtras, //First_Name will be the name of the field in the database 
		Extras_Cost: "$" + addCost, //Extras_Cost will be the name of the field in the database 
		Insurance_Fee: "$" + insuranceFee, //Insurance_Fee will be the name of the field in the database 
		Booking_Fee: "$" + bookingFee, //Booking_Fee will be the name of the field in the database 
		Total_Cost: "$" + totalCost //Total_Cost will be the name of the field in the database 
	}; //End of the JSON file
	reservationsRef.push(reservations); //Pushing the JSON file to the database
	window.scrollTo(0, document.getElementById("bookingInformation").offsetTop - 29);
	document.getElementById('confirmOverlay').style.height = "100%"; //Displays the confirm overlay that confirms that the users details have been pushed to their email (firebase)
	setTimeout(function() { //Sets a timer of 5 seconds and will refresh the page 
		location.reload(); //Reloads the page
	}, 5000); //5 second timer
} //End of function
//Creating new variables to check the date select is only a present date 
var today = new Date(); //Creates a new date function
var dd = today.getDate(); //Gets the day
var mm = today.getMonth() + 1; //Gets the month - January is 0!
var yyyy = today.getFullYear(); //Gets the year
if (dd < 10) { //If the days is less than 10, it wll be displayed in the format "0x" where x is any single digit number
	dd = '0' + dd;
}
if (mm < 10) { //If the month is less than 10, it wll be displayed in the format "0x" where x is any single digit number
	mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd; //Combines the day, month and year to create the date and stores it in the today variable
document.getElementById("checkInDate").setAttribute("min", today); //Connects the date function to the date input in the HTML
var acc = document.getElementsByClassName("accordion"); //Creates a new variable for the accordions
for (var i = 0; i < acc.length; i++) { //For loop that will make changes to the accordions as they are clicked on
	acc[i].addEventListener("click", function() { //Event listener that waits until an accordion is clicked
		this.classList.toggle("active"); //Sets the accordion to active
		var panel = this.nextElementSibling; //Creates a new variable called panel which controls the display
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null; //Accordion is close and contents are hidden
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px"; //Accordion is open and contents are displayed
		}
	});
} //End of accordion for loop
//Event listener that will call the updateCars() fucntion when a car card is clicked on the GUI
var carInputs = document.getElementsByClassName("carCard"); //Creates a new variable that will contain each car card
for (i = 0; i < carInputs.length; i++) { //For loop that checks for the selection of a car
	carInputs[i].addEventListener('click', updateCars); //When a car is clicked on, the updateCars() function will run
} //End of car selection for loop
//Event listener for when a user selects number of days/dates/extras is clicked
var allExtraInputs = document.getElementsByClassName("addCheck");
for (i = 0; i < allExtraInputs.length; i++) { //For loop to check for the selection of number of days/dates/extras
	allExtraInputs[i].addEventListener('input', updateBooking); //When a number of days/dates/extras are inputted/selected, the updateBooking() function will run
} //End of the number of days/dates/extras for loop
//Initially disables the confirm button
document.getElementById("confirmButton").disabled = true;
////Event listener for confirm button that enables the button if the terms and condititions checkbox is ticked
document.getElementById('checkButton').addEventListener('click', function() {
	document.getElementById("confirmButton").disabled = !document.getElementById("confirmButton").disabled; //Enables the confirm button when the terms and conditions checkbox is checked
});
//Event listener for confirm button - once clicked, the checDetailInputs() will run
document.getElementById("confirmButton").addEventListener('click', function() {
	checkAllInputs(); //When the confirm button is enabled and is clicked, the checkAllInputs() function will run
});