<template>
	<div>
		<h1>{{book.name}}</h1>
		<v-banner class="banner">
			<v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="300px"></v-img>
		</v-banner>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Book } from '../../model/book';

@Component({
	components:{
	}
})
export default class BookPage extends Vue{
	book: Book = new Book();

	get bookData(){
		return this.$accessor.book.bookData;
	}

	created(){
		this.$accessor.book.getBook(this.$route.params.book);
		this.book = this.bookData;
		console.log(this.book);
	}

	mounted(){
			
	}
}
</script>

<style lang="scss" scoped>

</style>