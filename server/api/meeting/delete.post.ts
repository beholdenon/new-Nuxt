import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  console.log('/server/api/meeting/delete.post');
  const { studentId, meetingId } = await readBody(event)
  try {
    const student =  await users.findOne({_id: studentId});
    student.meetings.id(meetingId).deleteOne();
    await student.save();
    return setResponse(event, { statusCode: 200, statusMessage: 'success', data: {} })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});