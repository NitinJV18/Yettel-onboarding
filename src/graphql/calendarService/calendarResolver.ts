import { createEvent,getNextFiveEvents } from './calendarAPI';

const calendarResolver = {
  Query: {
    nextFiveEvents: async (_parent: any, _args: any, context: any) => {
      const { token } = context;
      return await getNextFiveEvents(token);
    },
  },
  Mutation: {
    createEvent: async (_parent: any, args: any, context: any) => {
      const { token } = context;
      return await createEvent(token, args);
    },
  },
};

export default calendarResolver;