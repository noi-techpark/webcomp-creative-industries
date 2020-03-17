import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

var i18n = new VueI18n({
  locale: "en",
  messages: {
    en: {
        "industry": "Industry",
        "industries": "Industries",
        "type": "Type",
        "filter": "Filter",
        "search-placeholder": "Freelancers, Companies, ..."
    },
    de: {
        "industry": "Industrie",
        "industries": "Industrien",
        "type": "Typ",
        "filter": "Filter",
        "search-placeholder": "Freelancers, Firmen, ..."
    },
    it: {
        "industry": "Industria",
        "industries": "Industrie",
        "type": "Tipo",
        "filter": "Filtra",
        "search-placeholder": "Freelancer, Aziende, ..."
    }
  }
})

new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app')

