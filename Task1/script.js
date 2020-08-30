function Purchase(name, price, number) {
	this.name = name;
	this.price = price;
	this.number = number;

	this.getCost = function() {
		return roundTotalCost(this.price * this.number);
	}

	this.toString = function() {
		return `${this.name};${this.price};${this.number};${this.getCost()};`;
	}
}

let purchases = [
	new Purchase("bread", 1.2, 1),
	new Purchase("meat", 10.18, 2),
	new Purchase("coffe", 19.18, 2),
	new Purchase("oil", 1.99, 1),
	new Purchase("vegetables", 1.49, 1),
	new Purchase("cheese", 7.17, 1)
];

function showPurchases(purch) {
	const container = document.getElementById("purchases")
	container.innerHTML += '<ul class="list-group">'
	for (let i = 0; i < purch.length; i++) {
		container.innerHTML += `<li class="list-group-item">${purch[i]}</li>`
	}
	container.innerHTML += '</ul>'
}

function totalCost(purch) {
	let totalCost = 0;

	return function(purch) {

		if (typeof purch == "undefined") {
			return totalCost;
		} else {
			return totalCost += purch.getCost();
		}
	}
}

let makeS = totalCost();

for (let i = 0; i < purchases.length; i++) {
	makeS(purchases[i]);
}

function roundTotalCost(totalCost) {
	return Math.round(totalCost * 100) / 100;
}

showPurchases(purchases);
document.getElementById("totalCost").innerHTML += `<p class="lead p-4 ml-2">Total: ${roundTotalCost(makeS())} BYN</p>`;