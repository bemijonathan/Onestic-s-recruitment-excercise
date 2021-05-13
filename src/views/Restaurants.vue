<template>
	<div class="page page__stores">
		<p>{{ welcomeMessage }}</p>
		<div class="pages__stores-list">
			<StoreList :stores="stores" v-if="stores.length" />
		</div>
	</div>
</template>

<script>
import moment from "moment/src/moment";
import StoreList from "@/components/StoreList/StoreList";
import axios from "axios";
// let stores = () => import("@/assets/stores/stores.json");

export default {
	name: "Stores",
	components: {
		StoreList,
	},
	data() {
		return {
			timeFormat: "dddd, MMMM Do YYYY, h:mm:ss a",
			currentTime: moment().format(this.timeFormat),
			timer: null,
			stores: [],
		};
	},
	methods: {
		startTimer() {
			this.timer = setInterval(() => {
				this.currentTime = moment().format(this.timeFormat);
			}, 1000);
		},
	},
	computed: {
		welcomeMessage() {
			return (
				"Welcome to our restaurants list! Your local time is: " +
				this.currentTime
			);
		},
	},
	mounted() {
		this.startTimer();
		if (!localStorage.getItem("restuarants")) {
			axios.get("/stores/stores.json").then((e) => {
				const { data } = e;
				this.stores = data;
				localStorage.setItem("restuarants", JSON.stringify(data));
			});
		} else {
			this.stores = JSON.parse(localStorage.getItem("restuarants"));
		}
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
};
</script>
