<template lang="pug">
router-link(:to="`/characters/${character.id}`", :class="$options.name")
	.image-wrapper
		img(:src="character.image")
	.content-wrapper
		p Name: {{ character.name }}
		p Spezies: {{ character.species }}
		p Ort: {{ character.location.name }}
</template>

<script>
export default {
	name: "CCard",
	props: {
		character: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped lang="scss">
.CCard {
	box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
		rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	display: flex;
	padding: 1.6rem;
	width: 100%;
	height: 100%;
	cursor: pointer;
	text-decoration: none;
	color: #000;
	.image-wrapper {
		width: 30%;
		img {
			width: 100%;
			height: height;
		}
	}
	.content-wrapper {
		width: 70%;
		margin: 0 1.6rem;
	}
}
</style>
