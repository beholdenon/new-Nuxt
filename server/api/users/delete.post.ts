import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  console.log('/server/api/users/delete.post');
  const { userId } = await readBody(event)
  try {
    await users.deleteOne({ _id: userId });
    await users.save();
    return setResponse(event, { statusCode: 200, statusMessage: 'success', data: {} })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});