import api from '@/utils/api'

export default {
  state: {
    globalLoading: false,
    map: {
      loading: false,
      locations: []
    },
    searchState: '',
    settings: {
      headerText: '',
      nameFormat: 'First Last',
      showRecentlyContacted: true
    },
    navIndex: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: false
    },
    header: {
      showHeader: true,
      showSearch: false,
      showBack: false,
      text: 'Resplice'
    }
  },
  getters: {
    getNavIndex: state => state.navIndex,
    getShowHeader: state => state.header.showHeader,
    getHeaderText: state => state.header.text,
    getShowBack: state => state.header.showBack,
    getShowSearch: state => state.header.showSearch,
    getSearchInput: state => state.searchState,
    getMapLocations: state => state.map.locations,
    getMapLoading: state => state.map.loading,
    getGlobalLoading: state => state.globalLoading,
    getSettingsHeaderText: state => state.settings.headerText
  },
  mutations: {
    setGlobalLoading: (state, payload) => {
      state.globalLoading = payload
    },
    changeNavIndex: (state, payload) => {
      state.navIndex.one = state.navIndex.two = state.navIndex.three = state.navIndex.four = state.navIndex.five = false
      state.navIndex[payload] = true
    },
    updateSearch: (state, payload) => {
      state.searchState = payload
    },
    changeNameFormat: (state, payload) => {
      state.settings.nameFormat = payload
    },
    toggleShowRecentlyContacted: (state, payload) => {
      state.settings.showRecentlyContact = payload
    },
    setShowHeader: (state, payload) => {
      state.header.showHeader = payload
    },
    setHeaderText: (state, payload) => {
      state.header.text = payload
    },
    setShowSearch: (state, payload) => {
      state.header.showSearch = payload
    },
    setMapLocations: (state, payload) => {
      state.map.locations = payload
    },
    setMapLoading: (state, payload) => {
      state.map.loading = payload
    },
    setSettingsHeaderText: (state, payload) => {
      state.settings.headerText = payload
    }
  },
  actions: {
    buildMap: ({ commit }, locations) => {
      // Sends a list of ids to server to get back lat and lng locations array
      api.post('/map', locations)
        .then(response => {
          commit('setMapLocations', response.data)
          commit('setMapLoading', false)
        })
        .catch(error => {
          commit('setMapLoading', false)
          console.log(error)
        })
    },
    feedbackSubmit: (feedbackData) => {
      api.post('/feedback', feedbackData)
        .then(response => {
          console.log(feedbackData)
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
