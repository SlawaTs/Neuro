import {createStore} from 'vuex'
import events from './serv/events.json';
import trunstile from './serv/trunstile-events.json'

export default createStore({
    state: {
        productsEvents: events,
        trunstile: trunstile,

    },
    getters: {
        sessions: state => {
            let set = new Set();
            state.trunstile.forEach(pr => set.add(pr.sessionId))
            return set
        },
        trunstileSession: state => id => state.trunstile.filter(pr => pr.sessionId === id),
        productsSession: state => id => state.productsEvents.filter(pr => pr.sessionId === id)
    },
    mutations: {
        increase(state, id) {
            let i = state.productsEvents.findIndex(pr => pr.id === id);
            state.productsEvents[i].productCount++;
        },
        decrease(state, id) {
            let i = state.productsEvents.findIndex(pr => pr.id === id);
            state.productsEvents[i].productCount--;
        },
        remove(state, id) {
            state.productsEvents = state.productsEvents.filter(pr => pr.id !== id);
        },
        add(state, pr) {
            state.productsEvents.push(pr)
        },
        setSession(state, {id, newSession}) {
            state.productsEvents[state.productsEvents.findIndex(pr=>pr.id=== id)].sessionId = newSession
        }
    },
    actions: {
        remove({commit}, id) {
            commit('remove', id);
        },
        increase({commit}, id) {
            commit('increase', id);
        },
        decrease({commit}, id) {
            commit('decrease', id);
        },
        addProduct({commit}, pr) {
            commit('add', pr);
        },
        setSession({commit}, payload) {
            commit('setSession', payload)
        }
    },
    modules: {}
})
