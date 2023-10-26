import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import { resolvers, typeDefs } from './src/schema'
import { expressMiddleware } from '@apollo/server/express4'

const startApolloServer = async (typeDefs, resolvers) =>{
    const app = express()

    const httpServer= http.createServer(app)

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
      })

      await server.start()

      app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.headers.token })
        })
      )

      await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
      
}

startApolloServer(typeDefs, resolvers);