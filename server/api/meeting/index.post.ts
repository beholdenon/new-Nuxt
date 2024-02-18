import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  const { studentId, semester, advisor, body, date, count } = await readBody(event)
  console.log('/server/api/meeting/index.post');
  try {
    const student =  await users.findOne({_id: studentId});
    const newMeetingData = await student.meetings.push({ semester, advisor, body, date, count });
    await student.save();
    
    const data = {
        id: newMeetingData._id,
        semester: newMeetingData.semester,
        advisor: newMeetingData.advisor,
        body: newMeetingData.body,
        date: newMeetingData.date,
        count: newMeetingData.count
      }
      return setResponse(event, { statusCode: 200, statusMessage: 'success', data: data })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});