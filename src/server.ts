import fastify from 'fastify';
import mercurius from 'mercurius';
import { FastifyReply, FastifyRequest } from 'fastify';
import calendarService from './graphql/calendarService'; 
import peopleService from './graphql/peopleService'; 


import axios from 'axios';
import qs from 'qs'; 


const clientId = '285701115690-nl8p7st01prctf49or0m757l9qani581.apps.googleusercontent.com';
const clientSecret = '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'; 
const redirectUri = 'http://localhost:3000/test';
const scopes = ['openid', 'https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/contacts.readonly','https://www.googleapis.com/auth/calendar.events.readonly','profile'].join(' ');

const server = fastify({ logger: true });

const mergedTypeDefs = calendarService.typeDefs + peopleService.typeDefs;
const mergedResolvers = {
  Query: {
    ...calendarService.resolvers.Query,
    ...peopleService.resolvers.Query
  },
  Mutation: {
    ...calendarService.resolvers.Mutation
  }
}

server.register(mercurius as any, {
  schema: mergedTypeDefs, // Use mergedTypeDefs
  resolvers: mergedResolvers, // Use mergedResolvers
  graphiql: true,
  context: (request, reply) => {
    const auth = request.headers.authorization;
    const token = auth && auth.split(' ')[1];
    return { token };
  },
});

server.get('/auth/google', async (request: FastifyRequest, reply: FastifyReply) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
  reply.redirect(authUrl);
});

server.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
  const code = (request as { query: { code: string } }).query.code;
  console.log(code)
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = response.data.access_token;
    const idToken = response.data.id_token;
    reply.send({ accessToken: accessToken, idToken: idToken });
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error);
    reply.status(500).send({ error: 'Error exchanging authorization code for tokens' });
  }
});


server
  .listen({ port: 3000 }) // Use an options object instead of passing port and host directly
  .then(() => {
    console.log(`Server is running on http://localhost:3000`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });