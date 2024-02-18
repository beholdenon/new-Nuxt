import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) || {};
    const items =  await users.findOne(query);
    let countedMeetings = 0;
    if(items.meetings.length) {
      items.countedMeetings = items.meetings.filter(meeting => meeting.count === true).length;
    }
    return setResponse(event, { statusCode: 200, statusMessage: 'success', data: items })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});