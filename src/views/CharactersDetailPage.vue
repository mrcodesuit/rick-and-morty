<template lang="pug">
div(:class="$options.name")
	router-link.pageBack(to="/characters") &#x21E6; Zurück zur Übersicht

	.detail-wrapper(v-if="characterDetails")
		CCard(:character="characterDetails")
</template>

<script>
// @ is an alias to /src
import CCard from "@/components/Card.vue";

export default {
	name: "VCharactersDeatilPage",
	components: {
		CCard,
	},
	data() {
		return {
			characterDetails: null,
			characterId: this.$route.params.id,
		};
	},
	beforeMount() {
		// If you want to visit the details page directly,
		// you will also need to make an API call
		// so that the character's data can be displayed.
		if (this.characters.length === 0) this.$router.push({ name: "Characters" });
		else {
			const characterFlat = this.characters.flat(2);
			this.characterDetails = characterFlat.find((character) => {
				if (character.id === this.characterId) {
					return character;
				}
			});
		}
	},
	computed: {
		characters: function () {
			return this.$store.getters.getCharacters || null;
		},
	},
};
</script>


<style lang="scss">
.pageBack {
	font-size: 1.6rem;
	text-decoration: none;
}
.detail-wrapper {
	margin: 3.2rem 0;
}
</style>
