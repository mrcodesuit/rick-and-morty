<template lang="pug">
div(:class="$options.name")
	.character-list
		.charactersPagination(:style="{ marginBottom: '1.6rem' }")
			span.pageNumber(@click="fetchCharacters(-1)") Prev
			span.pageNumber.page {{ currentCharacterPage }}
			span.pageNumber(@click="fetchCharacters(1)") Next
		.row
			.loader(v-if="isLoading")
				p Laden...
			.character-wrapper.col-12.col-sm-6.col-lg-4.col-xl-3(
				v-else,
				v-for="character in filteredCharacters"
			)
				CCard(:character="character")
		.charactersPagination
			span.pageNumber(@click="fetchCharacters(-1)") Prev
			span.pageNumber.page {{ currentCharacterPage }}
			span.pageNumber(@click="fetchCharacters(1)") Next
</template>

<script>
// @ is an alias to /src
import CCard from "@/components/Card.vue";

export default {
	name: "VCharacters",
	components: {
		CCard,
	},
	beforeMount() {
		if (this.characters.length === 0) {
			this.$store.dispatch("fetchCharacters", this.currentCharacterPage);
		}
	},
	computed: {
		isLoading: function () {
			return this.$store.getters.getIsLoading;
		},
		characters: function () {
			return this.$store.getters.getCharacters;
		},
		visitedPages: function () {
			return this.$store.getters.getVisitedPages;
		},
		charactersLength: function () {
			return this.characters.length;
		},
		filteredCharacters: function () {
			return this.characters[
				this.visitedPages.findIndex(
					(page) => this.currentCharacterPage === page.pagesite
				)
			];
		},
		currentCharacterPage: function () {
			return this.$store.getters.getCurrentCharacterPage;
		},
		charactersInfo: function () {
			if (this.characters) return this.$store.getters.getCharactersInfo;
		},
	},
	methods: {
		fetchCharacters(dir) {
			if (this.currentCharacterPage === 1 && dir === -1) {
				this.$store.dispatch(
					"modifyCurrentCharacterPage",
					this.charactersInfo.pages
				);
			} else if (
				this.currentCharacterPage === this.charactersInfo.pages &&
				dir === 1
			) {
				this.$store.dispatch("modifyCurrentCharacterPage", 1);
			} else if (dir === -1) {
				this.$store.dispatch(
					"modifyCurrentCharacterPage",
					this.currentCharacterPage - 1
				);
			} else {
				this.$store.dispatch(
					"modifyCurrentCharacterPage",
					this.currentCharacterPage + 1
				);
			}
			this.$store.dispatch("fetchCharacters", this.currentCharacterPage);
		},
	},
};
</script>

<style lang="scss">
.VCharacters {
	.loader {
		text-align: center;
	}
	.character-list {
		.character-wrapper {
			margin-bottom: 1.6rem;
		}
		.charactersPagination {
			display: flex;
			justify-content: center;
			.pageNumber {
				cursor: pointer;
				padding: 0.4rem 0.8rem;
				font-size: 1.6rem;
				border: 0.1rem solid #ccc;
				&:hover {
					background-color: antiquewhite;
				}
				&.page {
					cursor: default;
					border: none;
					&:hover {
						background-color: white;
					}
				}
			}
		}
	}
}
</style>