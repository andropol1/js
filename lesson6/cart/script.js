function Prod(info, price, img) {
	this.info = info;
	this.price = price;
	this.img = img;
}

let
	prod0 = new Prod("Чипсы Lays, 85г", 100, "lays.jpg"),
	prod1 = new Prod("Кетчуп Heinz, 150u", 500, "heinz.webp"),
	prod2 = new Prod("Набор конфет Raffaello Весенняя серия, 150г белый", 100, "raf.webp"),
	prod3 = new Prod("Knorr Приправа универсальная Деликат, 200г", 30, "prip.webp"),
	prod4 = new Prod("Оливковое масло 520мм", 130, "oliv.webp"),
	prod = [prod0, prod1, prod2, prod3, prod4],
	listItems = document.querySelector('.listItems'),
	ul = document.createElement('ul'),
	p = document.createElement('p'),
	div = document.getElementById('listAdd');
document.querySelector('#listAdd').append(p);

function createProd(it, price, info, id) { 
	let fragment = new DocumentFragment(),
		li = document.createElement("li"),
		img = document.createElement("img"),
		span = document.createElement("span"),
		p = document.createElement("p"),
		btn = document.createElement("button");
	img.src = "img/" + it;
	img.height = '100';
	li.classList.add("itemProd");
	span.innerText = price;
	span.classList.add('span_price');
	p.innerText = info;
	btn.id = "btn" + id;
	btn.onclick = f;
	li.id = "li" + id;
	btn.innerHTML = "Добавить";
	li.append(img, span, p, btn);
	fragment.append(li);
	return fragment;
}

for (it in prod) {
	listItems.append(createProd(prod[it].img, prod[it].price, prod[it].info, prod[it].id = it));
}

function f(e) { 
	let
		div = document.getElementById('listAdd').querySelector('ul'),
		li = document.createElement("li"),
		img = e.target.parentNode.querySelector('img').cloneNode(true),
		span = e.target.parentNode.querySelector('span').cloneNode(true),
		addedItem = document.querySelectorAll('.cart_li img');

	if (addedItem.length !== 0) {
		for (let i = 0; i <= addedItem.length - 1; i++) {
			if (img.outerHTML == addedItem[i].outerHTML) {
				let liParent = addedItem[i].parentNode,
					label = liParent.querySelectorAll('.label');
				if (label[0] != undefined) {
					label[0].innerHTML = Number(label[0].innerHTML) + 1;
					liParent.append(label[0]);
				} else {
					label = document.createElement("span");
					label.classList.add('label');
					label.innerHTML = "2";
					liParent.append(label);
				}
				liParent.onclick = function () { liParent.remove(); sum(); };
				sum();
				return
			}
		}
	}
	li.classList.add("cart_li");
	li.innerHTML += img.outerHTML + span.outerHTML;
	div.append(li);
	li.onclick = function () { li.remove(); sum() };
	sum();
}
function remItem(e) {
	let label = e.target.parentNode.querySelector('.label');
	if (label != undefined) {
		label.innerHTML = Number(label.innerHTML) - 1;
	}
	sum()
};
function sum() {
	let allSpan = document.querySelectorAll('#listAdd .span_price'), allSum = 0;
	for (var i = 0; i <= allSpan.length - 1; i++) {
		let liParent = allSpan[i].parentNode;
		let count = liParent.querySelector('.label');
		if (count != undefined) {
			allSum += +allSpan[i].innerHTML * count.innerHTML;
		} else {
			allSum += +allSpan[i].innerHTML;
		}
	}

	document.querySelector("#listAdd p").innerHTML = `Сумма вашей покупки ${allSum} рублей`;
}


