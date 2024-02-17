import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  const { id, email, firstName, lastName, phone, role } = await readBody(event)
  try {
    const newUserData = await users.updateOne({ _id: id }, {
      email,
      firstName,
      lastName,
      phone,
      role
    });

    return setResponse(event, { statusCode: 200, statusMessage: 'success', data: newUserData })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});