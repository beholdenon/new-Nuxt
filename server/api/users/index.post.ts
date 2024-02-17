import { users } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  console.log("POST /api/users");
  const { id, email, password, firstName, lastName, phone, role } = await readBody(event)
  try {
    const userData = await users.findOne({ email });
    if (userData) {
      console.log(`User with email ${email} already exists`);
      return setResponse(event, { statusCode: 500, statusMessage: 'User already exists' })
    } 
    else {
      const newUserData = await users.create({
        email,
        password,
        firstName,
        lastName,
        phone,
        role
      });

      return {
        id: newUserData._id,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
      };
    }
  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});