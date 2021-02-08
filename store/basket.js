/**
 * item - одна книга, поля:
	 id
	 title
	 author
	 image
	 price
	 count = 1
 *
 *
 *
 * */

function updateLocalStorage(state) {
	// функция для сохранения данных в localStorage
	// TODO: изменить на sessionStorage ???
	localStorage.setItem('basket', JSON.stringify(state.all_books));
}

export const state = () => ({
	all_books: [] // массив для товаров корзины
});

export const mutations = {
	add_book(state, item){
		// добавить одну книгу в корзину, если есть, то +1
		let book = state.all_books.find(x => x.id === +item.id);
		if(book !== undefined){
			book.count++;
		} else {
			state.all_books.push({
				id: +item.id,
				title: item.title,
				author: item.author,
				image: item.image,
				price: item.price,
				count: 1
			})
		}
		updateLocalStorage(state);
	},
	add_book_local_storage(state, item){
		// добавляем книгу из localStorage
		// должна использоваться только в одном месте, поэтому нет доп проверок на поля
		if(item){
			state.all_books.push(item);
		}
	},
	add_one_book(state, id){
		// добавить ещё одну книгу в корзину
		// увеличить количество на 1
		let book = state.all_books.find(x => x.id === +id);
		if(book !== undefined){
			book.count++;
		} else {
			console.error("basket.store mutation add_one_book")
		}
		updateLocalStorage(state);
	},
	remove_one_book(state, id){
		// удалить одну книгу
		// уменишь количесвто на 1
		let book = state.all_books.find(x => x.id === +id);
		if(book !== undefined){
			book.count--;
			if(book.count <= 0){
				state.all_books = state.all_books.filter(x => x.id !== +id);
			}
		} else {
			console.error("basket.store mutation remove_one_book")
		}
		updateLocalStorage(state);
	},
	remove_book(state, id){
		// удалить книгу из корзины
		state.all_books = state.all_books.filter(x => x.id !== +id);
		updateLocalStorage(state);
	},
	clean_basket(state){
		// очистить корзину
		state.all_books = [];
		updateLocalStorage(state);
	}
};

export const getters = {
	getBasket(state){
		// получить данные корзины
		return state.all_books.slice().sort((a, b)=>{
			if(a.title > b.title){
				return 1;
			}
			if(a.title < b.title){
				return -1;
			}
			return 0;
		});
	},
	getBasketCount(state){
		// получить кол-во товара в корзине
		return state.all_books.length;
	},
	getBasketCountById: state => id => {
		// получить кол-во товара по id
		let book = state.all_books.find(x => x.id === +id);
		if(book !== undefined){
			return book.count;
		}
		return 0;
	}
};

