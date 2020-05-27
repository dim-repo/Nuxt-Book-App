<template>
	<v-card class="mx-auto" max-width="350">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
    <v-card-title>{{bookData.name}}</v-card-title>
    <v-card-subtitle>{{bookData.author}}</v-card-subtitle>
    <v-card-text>{{bookData.description}}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>	
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Book } from '../model/book';


@Component
export default class BookCardComponent extends Vue {
	@Prop() bookData!: Book;
}
</script>