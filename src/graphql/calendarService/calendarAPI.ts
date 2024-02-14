import axios from 'axios';

export async function createEvent(token: string, event: any) {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const eventDetails = {
    summary: event.summary,
    location: event.location,
    description: event.description,
    start: {
      dateTime: event.start,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: event.end,
      timeZone: 'Asia/Kolkata',
    },
  };

  const response = await axios.post(url, eventDetails, { headers: headers });

  return response.data;
}

export async function getNextFiveEvents(token: string, calendarId: string = 'primary') {
  const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
    headers: { 'Authorization': `Bearer ${token}` },
    params: {
      maxResults: 5,
      orderBy: 'startTime',
      singleEvents: true,
      timeMin: (new Date()).toISOString(),
    },
  });

  return response.data.items;
}