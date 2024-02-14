import axios from 'axios';

export const resolvers = {
  Query: {
    getPerson: async (_: any, { resourceName }: { resourceName: String }, context: { token: String }) => {
      try {
        const response = await axios.get(`https://people.googleapis.com/v1/people/${resourceName}?personFields=names,emailAddresses`, {
          headers: {
            'Authorization': `Bearer ${context.token}`
          }
        });

        return response.data;
      } catch (error: any) {
        console.error('Error getting person:', error.response.data);
        throw error;
      }
    }
  }
};