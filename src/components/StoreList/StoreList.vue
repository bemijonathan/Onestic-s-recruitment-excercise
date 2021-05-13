<template>
	<div class="store-list">
		<p>
			Here you can find all of our restaurants. We have {{ storesCount }} stores
			right now!
		</p>
		<div class="__joke_container" v-if="jokeTitle">
			<h4>
				{{ jokeTitle }}
			</h4>
			<p>
				{{ jokeText }}
			</p>
		</div>
		<div>
			<label for="search_places"> Search </label>
			<input
				type="search"
				name="search_places"
				id="search"
				placeholder="store"
				v-model="searchTerm"
			/>
		</div>

		<div class="store-list__container">
			<Store
				class="store-list__item"
				:title="store.name"
				:photo="store.image"
				:location="store.location"
				v-for="store in infiniteScrollStores"
				:key="store.id"
			/>
		</div>
	</div>
</template>
<style lang="scss">
@import "./StoreList.scss";
</style>
<script>
import Store from "@/components/Store/Store";
import axios from "axios";
import moment from "moment/src/moment";
export default {
	name: "StoreList",
	components: {
		Store,
	},
	props: {
		stores: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			count: 10,
			infiniteScrollStores: [],
			searchTerm: "",
			oldCount: 0,
			url: "https://api.jokes.one/jod?category=knock-knock",
			jokeTitle: "",
			jokeText: "",
		};
	},
	methods: {
		convertCookie(name) {
			var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
			return v ? v[2] : null;
		},
		async getJokeOfTheDay() {
			let t = this.convertCookie("joke");
			if (t) {
				t = JSON.parse(t);
				this.jokeTitle = t.title;
				this.jokeText = t.text;
			} else {
				try {
					const { data } = await axios.get(this.url);
					this.jokeTitle = data.contents.jokes[0].joke.title;
					this.jokeText = data.contents.jokes[0].joke.text;
					this.storageMiddleware({
						title: this.jokeTitle,
						text: this.jokeText,
					});
				} catch (error) {
					console.log(error)
				}
			}
		},
		storageMiddleware(body = {}) {
			const { title, text } = body;
			document.cookie = `joke=${JSON.stringify({
				title,
				text,
			})};expires=${moment(
				moment().format("YYYY-MM-DD") + " 23:59:00"
			).unix()}`;
		},
		searchScrollItems() {
			this.infiniteScrollStores.push(
				...this.storesWithImages.slice(
					this.oldCount,
					this.oldCount + this.count
				)
			);
			this.oldCount++;
		},
		loadMoreItems() {
			const _this = this;
			window.onscroll = () => {
				let bottomOfWindow =
					document.documentElement.scrollTop + window.innerHeight >=
					document.documentElement.scrollHeight;
				if (bottomOfWindow) {
					_this.infiniteScrollStores.push(
						..._this.storesWithImages.slice(
							_this.oldCount * _this.count,
							(_this.oldCount + 1) * _this.count
						)
					);
					_this.oldCount++;
				}
			};
		},
	},
	computed: {
		storesWithImages() {
			let stores = this.stores.map(function(store) {
				store["image"] = "https://via.placeholder.com/300?text=" + store.name;
				return store;
			});
			if (this.searchTerm) {
				const t = new RegExp(`${this.searchTerm}`, "gi");
				return stores.filter((store) => t.test(store.name));
			} else {
				return stores;
			}
		},
		storesCount() {
			return this.stores.length;
		},
	},
	mounted() {
		this.searchScrollItems();
		this.loadMoreItems();
		this.getJokeOfTheDay().then();
	},
	watch: {
		searchTerm() {
			this.infiniteScrollStores = [];
			this.oldCount = 0;
			this.searchScrollItems();
			this.loadMoreItems();
		},
	},
};
</script>
