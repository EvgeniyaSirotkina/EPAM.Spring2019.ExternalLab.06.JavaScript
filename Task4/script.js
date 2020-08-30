function Purchase(name, price, number) {
	this.name = name;
	this.price = price;
	this.number = number;
}

Purchase.prototype.getCost = function() {
	return (roundTotalCost(this.price * this.number));
}

Purchase.prototype.toString = function() {
	return (this.name + ';' + this.price + ';' + this.number + ';' + this.getCost());
}

function DiscountPurchase(name, price, number, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;

	this.parentGetCost = Purchase.prototype.getCost;
	this.getCost = function() {
		let cost = this.parentGetCost();
		return roundTotalCost(cost * (1 - this.discount / 100));
	}

	let parentToString = Purchase.prototype.toString;
	this.toString = function() {
		let result = parentToString.call(this);
		let data = result.split(';');
		data[4] = data[3];
		data[3] = this.discount;

		return data.join(';');
	}
}

function FixDiscountPurchase(name, price, number, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;
}

FixDiscountPurchase.prototype.getCost = function() {
	let cost = Purchase.prototype.getCost.apply(this, arguments);

	if (cost >= this.discount) {
		return roundTotalCost(cost - this.discount);
	} else {
		return roundTotalCost(cost);
	}
}

FixDiscountPurchase.prototype.toString = function() {
	let result = Purchase.prototype.toString.apply(this, arguments);
	let data = result.split(';');
	data[4] = data[3];
	data[3] = this.discount;

	return data.join(';');
}

// 1
let purchases = [
	new Purchase("bread", 1.2, 1),
	new Purchase("meat", 10.18, 2),
	new Purchase("oil", 1.99, 1),
	new DiscountPurchase("coffe", 19.18, 3, 7),
	new DiscountPurchase("vegetables", 1.49, 1, 5),
	new DiscountPurchase("cheese", 7.17, 1, 12),
	new FixDiscountPurchase("butter", 2.27, 1, 0.16),
	new FixDiscountPurchase("fish", 5.39, 3, 1.75),
	new FixDiscountPurchase("fruits", 6.49, 2, 2.15)
];

function showPurchases(purch, containerId) {
	const container = document.getElementById(containerId)
	container.innerHTML += '<ul class="list-group">';
	purch.forEach(purchase => {
		container.innerHTML += `<li class="list-group-item">${purchase}</li>`;
	});
	container.innerHTML += '</ul>';
}

function roundTotalCost(totalCost) {
	return Math.round(totalCost * 100) / 100
}

// 2
showPurchases(purchases, "purchases");

// 3
let filtredPurchases = purchases.filter(purchase => purchase.getCost() > 20);
showPurchases(filtredPurchases, "filtered-purchases");

// 4
function ChangePurchaseToDiscountPurchase(value) {
	if (value.discount == undefined) {
		return new DiscountPurchase(value.name, value.price, value.number, value.number * 2);
	} else {
		return value;
	}
}
let mapedPurchases = purchases.map(ChangePurchaseToDiscountPurchase);
showPurchases(mapedPurchases, "map-purchases");

// 5

function isMoreThan50(value) {
	return (value.getCost() > 50);
}
function showAnswer(answer) {
	const containerCheck = document.getElementById("check-purchases-cost")
	containerCheck.innerHTML += answer
}

function returnAnswer(text, answer) {
	if (answer) {
		return `<div class="alert alert-info" role="alert">
					${text} Yes
				</div>`
	} else {
		return `<div class="alert alert-danger" role="alert">
					${text} No
				</div>`
	}
}

let isAllPurchase = purchases.every(isMoreThan50)
let isAnyPurchase = purchases.some(isMoreThan50)

showAnswer(returnAnswer("All Purchases Cost More than 50 BYN ", isAllPurchase))
showAnswer(returnAnswer("Any Purchases Cost More than 50 BYN ", isAnyPurchase))

// 6
let maxPurchase = purchases.reduce((prev, curr) => {
	if (prev.getCost() > curr.getCost()) {
		return prev;
	} else {
		return curr;
	}
});

document.getElementById("max-purchases").innerHTML +=  maxPurchase

// 7
let maxName = purchases[purchases.length - 1].name
let maxPrice = purchases[purchases.length - 1].price
let minNumber = purchases[purchases.length - 1].number

purchases.reduceRight((previous, current) => {
	if (current.name.length > maxName.length) {
		maxName = current.name;
	}

	if (current.price > maxPrice) {
		maxPrice = current.price;
	}

	if (current.number < minNumber) {
		minNumber = current.number;
	}

	return current;
});

var newPurchase = new Purchase(maxName, maxPrice, minNumber)
document.getElementById("new-purchases").innerHTML +=  newPurchase