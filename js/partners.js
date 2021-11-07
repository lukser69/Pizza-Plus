const cardsRestaurants = document.querySelector('.cards-restaurants');

const renderItems = (data) => {
	data.forEach((item) => {
		const { image, kitchen, name, price, products, stars, time_of_delivery } =
			item;
		const a = document.createElement('a');

		a.setAttribute('href', '/restaurant.html');
		// a.getAttribute('href') возвраает значение атрибута
		// a.hasAttribute('href') возварщает true/false
		a.classList.add('card', 'card-restaurant');
		// a.classList.remove  удалят
		// a.classList.toggle если нет, то дабавляет, если есть, то удаляет

		a.dataset.products = products;
		// a.products = products;

		a.innerHTML = `
				<img src="${image}" alt="${name}" class="card-image"/>
				<div class="card-text">
					<div class="card-heading">
						<h3 class="card-title">${name}</h3>
						<span class="card-tag tag">${time_of_delivery} мин</span>
					</div>
					<div class="card-info">
						<div class="rating">${stars}</div>
						<div class="price">${price}</div>
						<div class="category">${kitchen}</div>
					</div>
				</div>
			`;

		a.addEventListener('click', (event) => {
			event.preventDefault();

			localStorage.setItem('restaurant', JSON.stringify(item));

			if (!localStorage.getItem('user')) {
				alert('Авторизуйтесь!');
				modalAuth.style.display = 'flex';
			} else {
				window.location.href = '/restaurant.html';
			}
		});

		cardsRestaurants.append(a);
	});
};

fetch('https://test-c4073-default-rtdb.firebaseio.com/db/partners.json')
	.then((response) => response.json())
	.then((data) => {
		renderItems(data);
	})
	.catch((error) => {
		console.log(error);
	});
// .finally(console.log('finnaly'))
