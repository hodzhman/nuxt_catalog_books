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

export const state = () => ({
	counter: 0,
	all_books: []
});

export const mutations = {
	increment(state) {
		state.counter++
	},
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
	},
	remove_book(state, id){
		// удалить книгу из корзины
		state.all_books = state.all_books.filter(x => x.id !== +id);
	},
	clean_basket(state){
		// очистить корзину
		state.all_books = [];
	}
};

export const getters = {
	getBasket(state){
		// return state.all_books;
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
		return state.all_books.length;
	},
	getBasketCountById: state => id => {
		let book = state.all_books.find(x => x.id === +id);
		if(book !== undefined){
			return book.count;
		}
		return 0;
	}
};

