// graphql/peopleService/peopleSchema.ts

export const typeDefs = `
type Person {
  resourceName: String
  names: [Name]
  emailAddresses: [EmailAddress]
}

type Name {
  displayName: String
  familyName: String
  givenName: String
}

type EmailAddress {
  value: String
}

type Query {
  getPerson(resourceName: String!): Person
}
`;