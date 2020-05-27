<template>
	<v-dialog max-width="500px" v-model="open">
		<v-card class="p-5 inner-card">
			Are you sure you want to delete?
			<v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="cancelDelete" color="green">Cancel</v-btn>
				<v-btn @click.stop="deleteBook" color="red">Delete</v-btn>
      </v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Book } from '../model/book';

@Component
export default class WarningComponent extends Vue{
	open: boolean = false;
	book: Book = new Book();
	mounted(){
		this.$root.$on('openWarning',(book: Book)=>{
			this.open = true;
			this.book = book;
		})
	}

	cancelDelete(){
		this.open = false;
		this.$emit('cancelDelete');
	}

	deleteBook(){
		this.open = false;
		this.$emit('deleteBook',this.book);
		this.book = new Book();
	}

}
</script>

<style lang="scss" scoped>
	.inner-card{
		padding: 20px;
	}
</style>