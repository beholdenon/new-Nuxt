import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  const { studentId, meetingId, semester, advisor, body, date, count } = await readBody(event)
  console.log('/server/api/meeting/update.post');
  try {
    const student =  await users.findOne({_id: studentId});
    const meeting = student.meetings.id(meetingId);
    console.log(meeting)
    meeting.semester = semester;
    meeting.advisor = advisor;
    meeting.body = body;
    meeting.date = date;
    meeting.count = count;
    
    await student.save();
      return setResponse(event, { statusCode: 200, statusMessage: 'success', data: meeting })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});