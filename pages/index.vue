<template>
  <div>
    <v-row>
      <v-col md="4">
        <h2 class="text-center mb-5">Recently Read Books</h2>
        <v-row v-for="(item, index) in recentBooks" :key="index">
          <book-card-component
            class="mb-5"
            :bookData="item"
          >
            <template v-slot:button>
              <nuxt-link class="n-link" :to="`/${item.name}`">
                <v-btn>View</v-btn>
              </nuxt-link>
              <v-btn @click.stop="editBook(item)">Edit</v-btn>
              <v-btn @click.stop="openWarning(item)">Remove</v-btn>
            </template>
          </book-card-component>
        </v-row>
      </v-col>
      <v-col md="4">
        <h2 class="text-center mb-5">Favourite Books</h2>
        <v-row v-for="(item, index) in favoriteBooks" :key="index">
          <book-card-component
            class="mb-5"
            :bookData="item"
          >
            <template v-slot:button>
              <nuxt-link class="n-link" :to="`/${item.name}`">
                <v-btn>View</v-btn>
              </nuxt-link>
              <v-btn @click.stop="editBook(item)">Edit</v-btn>
              <v-btn @click.stop="openWarning(item)">Remove</v-btn>
            </template>
          </book-card-component>
        </v-row>
      </v-col>
      <v-col md="4">
        <h2 class="text-center mb-5">Best of the Best</h2>
        <v-row v-for="(item, index) in bestBooks" :key="index">
          <book-card-component
            class="mb-5"
            :bookData="item"
          >
            <template v-slot:button>
              <nuxt-link class="n-link" :to="`/${item.name}`">
                <v-btn>View</v-btn>
              </nuxt-link>
              <v-btn @click.stop="editBook(item)">Edit</v-btn>
              <v-btn @click.stop="openWarning(item)">Remove</v-btn>
            </template>
          </book-card-component>
        </v-row>
      </v-col>
    </v-row>
    <book-modal-component @save="saveBook" @update="updateBook" />
    <warning-component @deleteBook="deleteBook"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BookCardComponent from "../components/book-card.vue";
import BookModalComponent from "../components/book-modal.vue";
import { Book } from "../model/book";
import WarningComponent from "../components/warning.vue";


@Component({
  components: {
    BookCardComponent,
    BookModalComponent,
    WarningComponent
  }
})
export default class IndexPage extends Vue {
  get bookCollection(): Array<Book> {
    return this.$accessor.book.collection;
  }

  recentBooks: Array<Book> = [];
  favoriteBooks: Array<Book> = [];
  bestBooks: Array<Book> = [];

  created(){
    this.updateBookData();
  }

  filterBook(category: String) :Array<Book>{
    return this.bookCollection.filter((book: Book) => book.category.toLowerCase() == category.toLowerCase());
  }
  updateBookData(): void {
    this.recentBooks = this.filterBook('recent');
    this.favoriteBooks = this.filterBook('favorite');
    this.bestBooks = this.filterBook('best');
  }

  saveBook(bookData: Book): void {
    this.$accessor.book.setCollection(bookData);
    this.updateBookData();
  }

  openWarning(book: Book){
    this.$root.$emit('openWarning', book);
  }

  deleteBook(book: Book){
    this.$accessor.book.removeFromCollection(book);
    this.updateBookData();
  }

  editBook(book: Book){
    this.$root.$emit('openModal', book);
  }

  updateBook(book: Book){
    this.$accessor.book.updateCollection(book);
    this.updateBookData();
  }
}
</script>
<style lang="scss" scoped>
  .n-link{
    margin-right: 9px;
  }
</style>