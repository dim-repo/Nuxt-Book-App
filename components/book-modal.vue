<template>
	<v-dialog max-width="500px" v-model="open">
    <v-card class="p-5 inner-card">
      <v-card-title>Add Books</v-card-title>
      <v-form>
        <v-select v-model="bookData.category" :items="categoriesData" item-text="name" label="Select A Category"></v-select>
        <v-text-field :disabled="editMode" v-model="bookData.name" label="Enter Book Title"></v-text-field>
        <v-text-field v-model="bookData.author" label="Enter Book Author"></v-text-field>
        <v-textarea v-model="bookData.description" label="Enter Book Description"></v-textarea>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!editMode" @click.stop="saveBook" color="green">Add</v-btn>
				<v-btn v-else @click.stop="updateBook" color="green">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
	import { Component, Vue, Prop } from 'nuxt-property-decorator'
	import { Book } from '../model/book'
  import { categories } from '../model/constants';
  import { Category } from '../model/category';


	@Component
	export default class BookModalComponent extends Vue {
		
		open: boolean = false;
		bookData: Book = new Book();
		categoriesData: Array<Category> = categories;
		editMode: boolean = false;

		created(){
			this.$root.$on('openModal', (book: Book = new Book()) => {
				this.open = true;
				this.bookData = Object.assign({}, book);
				if(this.bookData.name != ""){
					this.editMode = true;
				}
			})
		}

		reset(){
			this.bookData = new Book();
			this.open = false;
			this.editMode = false;
		}
		
		saveBook(){
			this.$emit('save', this.bookData);
			this.reset();
		}

		updateBook(){
			this.$emit('update', this.bookData);
			this.reset();
		}

	}
</script>

<style lang="scss" scoped>
	.inner-card{
		padding: 20px;
	}
</style>