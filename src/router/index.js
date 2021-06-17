import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/characters',
	},
	{
		path: '/characters',
		name: 'Characters',
		// route level code-splitting
		// this generates a separate chunk (xxx.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "characters" */ '../views/Characters.vue'),
	},
	{
		path: '/characters/:id',
		name: 'CharactersDetailPage',
		component: () =>
			import(
				/* webpackChunkName: "charactersDetailPage" */ '../views/CharactersDetailPage.vue'
			),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
