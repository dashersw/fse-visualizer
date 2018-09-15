import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import sleep from 'await-sleep'

Vue.use(Vuex)

const socket = io('localhost:3000')

async function emit (msg) {
  return new Promise((resolve, reject) => {
    socket.emit(msg, data => {
      if (!data) return reject(new Error('No incoming data'))

      resolve(data)
    })
  })
}

const state = {
  game: {},
  logs: [],
  freezeAnimations: false,
  removeTimeout: 0,
  paused: true,
  sizes: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    pitchRatio: 105 / 68,
    pitchHeight: window.innerWidth * 0.8,
    pitchWidth: window.innerWidth * 0.8,
    verticalOrientation: false,
    pitchView: {
      horizontal: false,
      threeD: false
    }
  }
}

const mutations = {
  clearLogs (state) {
    state.logs = []
  },
  setGame (state, game) {
    state.game = game
    state.logs.push(game.state.iterationLog)
  },
  setSizes (state, sizes) {
    state.sizes = sizes
  },
  setFreezeAnimations (state, freeze, removeTimeout) {
    state.freezeAnimations = freeze
    state.removeTimeout = removeTimeout
  },
  toggle3d (state, toggle) {
    state.sizes.pitchView.threeD = toggle
  },
  toggleVertical (state, toggle) {
    state.sizes.pitchView.horizontal = toggle
  },
  togglePause (state, toggle) {
    state.paused = toggle
  }
}

const actions = {
  async startGame ({ commit }) {
    commit('setGame', await emit('start game'))
  },
  async iterateGame ({ commit }, times = 1) {
    for (let i = 0; i < times; i++) {
      const iteration = await emit('iterate game')
      if (iteration.state.iterationLog.length > 2) {
        await sleep(200)
      }
      commit('setGame', iteration)
    }
  },
  clearLogs ({ commit }) {
    commit('clearLogs')
  },
  togglePause ({ state, commit }, toggle) {
    if (toggle === undefined) toggle = !state.paused
    commit('togglePause', toggle)
  },
  toggle3d ({ state, commit }) {
    commit('toggle3d', !state.sizes.pitchView.threeD)
  },
  toggleVertical ({ state, commit }) {
    commit('toggleVertical', !state.sizes.pitchView.horizontal)
  },
  calculatePitchScale ({ commit, state }) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const verticalOrientation = windowHeight / windowWidth > 1.1
    const pitchView = {
      horizontal: state.sizes.pitchView.horizontal,
      threeD: state.sizes.pitchView.threeD
    }

    const pitchRatio = state.sizes.pitchRatio
    let pitchHeight
    let pitchWidth

    pitchView.horizontal = !verticalOrientation
    commit('toggleVertical', !verticalOrientation)

    if (pitchView.horizontal) {
      pitchHeight = windowWidth * 0.8
      pitchWidth = pitchHeight / pitchRatio

      if (pitchWidth > windowHeight * 0.7) {
        pitchWidth = windowHeight * 0.7
        pitchHeight = pitchWidth * pitchRatio
      }
    } else {
      pitchHeight = windowHeight * 0.8
      pitchWidth = pitchHeight / pitchRatio

      if (pitchWidth > windowWidth * 0.7) {
        pitchWidth = windowWidth * 0.7
        pitchHeight = pitchWidth * pitchRatio
      }
    }

    commit('setSizes', {
      windowHeight,
      windowWidth,
      verticalOrientation,
      pitchView,
      pitchHeight,
      pitchWidth,
      pitchRatio
    })

    clearTimeout(state.removeTimeout)

    let removeTimeout = setTimeout(() => {
      commit('setFreezeAnimations', false)
    }, 300)

    commit('setFreezeAnimations', true, removeTimeout)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
