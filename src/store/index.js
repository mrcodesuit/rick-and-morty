import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: false,
		characters: [],
		visitedPages: [],
		charactersInfo: null,
		currentCharacterPage: 1,
	},
	mutations: {
		setVisitedPages(state, { pagesite, characterCount }) {
			state.visitedPages.push({ pagesite, characterCount });
		},
		setCharactersInfo(state, charactersInfo) {
			state.charactersInfo = charactersInfo;
		},
		setCharacters(state, characters) {
			state.characters.push([...characters]);
		},
		setCurrentCharacterPage(state, currentCharacterPage) {
			state.currentCharacterPage = currentCharacterPage;
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		},
	},
	actions: {
		/**
		* @description fetch characters - api(graphql)
		* @param {number} pageSite
		*/
		fetchCharacters({ commit }, pageSite) {
			const isVisitedPage = this.state.visitedPages.some((page) => {
				return page.pagesite === pageSite;
			});
			if (!isVisitedPage) {
				commit('setIsLoading', true);
				try {
					axios({
						url: 'https://rickandmortyapi.com/graphql',
						method: 'post',
						data: {
							query: `
								query {
									characters(page:${pageSite}) {
									results {
										id
										name
										species
										location {
											id
											name
										}
										image
									}
									info {
										pages
										count
									}
									}
								}
							`,
						},
					}).then(({ data }) => {
						commit('setVisitedPages', {
							pagesite: pageSite,
							characterCount: data.data.characters.results.length,
						});
						if (data?.data?.characters?.results) {
							commit('setCharactersInfo', data.data.characters.info);
							commit('setCharacters', data.data.characters.results);
							commit('setIsLoading', false);
						} else {
							// Here you can use a sentry-logger for more details of error
							console.log(data);
						}
					});
				} catch (error) {
					// Here you can use a sentry-logger for more details of the error
					console.log(error);
				}
			}
		},
		/**
		* @description modify current character page
		* @param {number} dir
		*/
		modifyCurrentCharacterPage({ commit }, dir) {
			return commit('setCurrentCharacterPage', dir);
		},
		toggleIsLoading({ commit }, isLoading) {
			return commit('setIsLoading', isLoading);
		},
	},
	getters: {
		getCharacters(state) {
			return state.characters;
		},
		getVisitedPages(state) {
			return state.visitedPages;
		},
		getCharactersInfo(state) {
			return state.charactersInfo;
		},
		getCurrentCharacterPage(state) {
			return state.currentCharacterPage;
		},
		getIsLoading(state) {
			return state.isLoading;
		},
	},
});
