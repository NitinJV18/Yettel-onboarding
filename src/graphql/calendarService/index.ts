import { typeDefs } from './calendarSchema';
import calendarResolver from './calendarResolver';

export default {
    resolvers: calendarResolver,
    typeDefs: typeDefs,
};