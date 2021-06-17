<template lang="pug">
.app
	header
		img(src="@/assets/img/rick-and-morty-logo.svg")
	.content
		.container
			router-view
	footer
		span &#169; {{ new Date().getFullYear() }} Mirko Roßbach
</template>

<style lang="scss">
* {
	box-sizing: border-box;
}

html {
	font-size: 62.5%;
	height: 100%;
}

body {
	margin: 0;
	height: 100%;
	overflow-y: scroll;
}

.app {
	display: flex;
	flex-direction: column;
	position: relative;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	min-height: 100%;

	header {
		box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
			rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
		padding: 1.6rem;
		display: flex;
		justify-content: center;
		img {
			max-width: 18rem;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 2.4rem 0;
		height: 100%;
	}

	p {
		font-size: 1.6rem;

		@media screen and (max-width: 600px) {
			font-size: 1.4rem;
		}

		margin-top: 0;
	}
	footer {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: gainsboro;
		height: 4rem;
		padding: 1.6rem;
		margin-top: auto;
		span {
			font-size: 1.2rem;
		}
	}
}
</style>
