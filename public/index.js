'use strict'

// Get the elements that users can interact with
const submit = document.querySelector('.tax-calculator-submit-btn')
const line1Input = document.querySelector('.tax-calculator-line1')
const zipInput = document.querySelector('.tax-calculator-zip')
const stateInput = document.querySelector('.tax-calculator-state option:checked')
const amountInput = document.querySelector('.tax-calculator-amount')
const response = {
  "totalRate": 0.101,
  "rates": [
    {
      "rate": 0.065,
      "name": "WA STATE TAX",
      "type": "State"
    },
    {
      "rate": 0,
      "name": "WA COUNTY TAX",
      "type": "County"
    },
    {
      "rate": 0.036,
      "name": "WA CITY TAX",
      "type": "City"
    }
  ]
}
line1Input.addEventListener('focus', () => {
	document.querySelector(".tax-calculator-totalRate").innerHTML = 'Tax (%) $';
	document.querySelector(".tax-calculator-totalAmount").innerHTML = 'Total $';
})
zipInput.addEventListener('focus', () => {
	document.querySelector(".tax-calculator-totalRate").innerHTML = 'Tax (%) $';
	document.querySelector(".tax-calculator-totalAmount").innerHTML = 'Total $';
})
stateInput.addEventListener('focus', () => {
	document.querySelector(".tax-calculator-totalRate").innerHTML = 'Tax (%) $';
	document.querySelector(".tax-calculator-totalAmount").innerHTML = 'Total $';
})
amountInput.addEventListener('focus', () => {
	document.querySelector(".tax-calculator-totalRate").innerHTML = 'Tax (%) $';
	document.querySelector(".tax-calculator-totalAmount").innerHTML = 'Total $';
})

submit.addEventListener('click', () => {
	const line1 = document.querySelector('.tax-calculator-line1').value
	const zip = document.querySelector('.tax-calculator-zip').value
	const state = document.querySelector('.tax-calculator-state option:checked').value
	let endPoint = 'https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?&country=United States'
	if (line1) {
		endPoint = endPoint + `&line1=${line1}`
	}
	if (state) {
		endPoint = endPoint + `&region=${state}`
	}
	if (zip) {
		endPoint = endPoint + `&postalCode=${zip}`
	}
	const Http = new XMLHttpRequest()
	const url = endPoint;
	Http.open("GET", url); // I can't get this to work - sorry!
	Http.setRequestHeader("content-type", "application/json");
	Http.setRequestHeader("Authorization", "Basic aHR0cHdhdGNoOmY=");
	Http.send();
	Http.onreadystatechange = (e) =>{
		if (Http.readyState == 4) {
			if (Http.status == 200) {
				calculateTax(Http.responseText)
    		} else {
				calculateTax(response)    			
    		}
    	}
		console.log(Http.responseText)
	}
})

function calculateTax (data) {
	const currency = document.querySelector('.tax-calculator-amount').value
    const amt = Number(currency.replace(/[^0-9\.]+/g,""));
	if (isNaN(amt) || amt == 0) {
		return
	}
	const taxes = `Tax (${(data.totalRate * 100).toFixed(2)}%) $${(amt * parseFloat(data.totalRate)).toFixed(2) }`
	const total = `Total $${(amt + (amt * parseFloat(data.totalRate))).toFixed(2) }`
	document.querySelector(".tax-calculator-totalRate").innerHTML = taxes;
	document.querySelector(".tax-calculator-totalAmount").innerHTML = total;

}

