import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex';
import { Book } from '~/model/book';


export const state = () => ({
	collection:[
	] as Array<Book>,
	bookData: {} as Book
})

export const getters = getterTree(state, {
	
});

export const mutations = mutationTree(state, {
	addCollection(state, bookData: Book){
		state.collection.push(bookData);
	},

	updateCollection(state, bookData: Book){
		state.collection = state.collection.map((book: Book) => {
			if(book.name.toLowerCase() == bookData.name.toLowerCase()){
				return bookData;
			}
			return book;
		})
	},

	removeFromCollection(state, bookData: Book){
		state.collection = state.collection.filter((book: Book) => book.name.toLowerCase() != bookData.name.toLowerCase());
	},

	getBook(state, name: String){
		state.bookData = state.collection.find((book: Book )=> book.name.toLowerCase() == name.toLowerCase() ) || new Book();
 	}

});

export const actions = actionTree({state, getters, mutations},{
	
	getCollection(){},
	
	setCollection({ commit }, bookData: Book){
		commit('addCollection',bookData);
	},

	updateCollection({ commit }, bookData: Book){
		commit('updateCollection', bookData);
	},

	removeFromCollection({ commit }, bookData: Book){
		commit('removeFromCollection', bookData);
	},

	getBook({ commit }, name: String){
		commit('getBook', name);
	}

})