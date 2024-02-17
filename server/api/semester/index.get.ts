import { semester } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) || {};
    const items =  await semester.find(query);
    return setResponse(event, { statusCode: 200, statusMessage: 'success', data: items })

  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});