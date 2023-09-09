import Vue from "vue";
import Router from "vue-router";
import Chart from "@/views/Chart.vue";
import Search from "@/views/Search.vue";
import CustomMatchup from "@/views/CustomMatchup.vue";


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "search",
			component: Search,
		},
		{
			path: "/chart",
			name: "chart",
			component: Chart,
		},
		{
			path: "/custom",
			name: "custom-matchups",
			component: CustomMatchup,
		},
	],
});
