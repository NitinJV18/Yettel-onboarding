export const typeDefs = `

  type Mutation {
    createEvent(
      summary: String!
      location: String
      description: String
      start: DateTime!
      end: DateTime!
    ): Event
  }
  
  scalar DateTime
  
  type Event {
    id: ID!
    summary: String
    location: String
    description: String
    start: DateTime
    end: DateTime
  }
  
  extend type Query {
    nextFiveEvents: [Event]
  }
`;