<template>
	<div class="header">
		<ul class="header__navigation">
			<li class="header__navigation-item">
				<router-link to="/" class="header__navigation-item-link"
					>Home</router-link
				>
			</li>
			<li class="header__navigation-item">
				<router-link to="/meals" class="header__navigation-item-link"
					>Carbonara Meals Calculator</router-link
				>
			</li>
			<li class="header__navigation-item">
				<router-link to="/restaurants" class="header__navigation-item-link"
					>Our Restaurants</router-link
				>
			</li>
			<li class="header__navigation-item">
				<button @click="removeClass()">{{ darkMode ? 'dark mode' : 'light mode' }}</button>
			</li>
		</ul>
	</div>
</template>
<style lang="scss">
@import "./Header.scss";
</style>
<script>
export default {
	name: "Header",
	data() {
		return {
			darkMode: false,
		};
	},
	methods: {
		removeClass() {
			if (document.querySelector("body").classList.contains("dark")) {
				this.darkMode = true;
			} else {
				this.darkMode = false;
			}
			document.querySelector("body").classList.toggle("dark");
		},
	},
	mounted() {},
};
</script>
