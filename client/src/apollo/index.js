import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'


Vue.use(VueApollo)

const apolloClient = new ApolloClient({
   uri: 'https://hasura-graph-development.herokuapp.com/v1/graphql',
   headers: {
     'x-hasura-admin-secret': 'celdamae19'
   }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading"
  }
})

export default apolloProvider