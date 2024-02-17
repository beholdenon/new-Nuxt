import { semester } from "~/server/dbModels"

export default defineEventHandler(async (event) => {
  const { name, slug } = await readBody(event)
  try {
    const semesterData = await semester.findOne({ name });
    if (semesterData) {
      console.log(`Semester with name ${name} already exists`);
      return setResponse(event, { statusCode: 500, statusMessage: 'Semester already exists' })
    } 
    else {
      const newSemesterData = await semester.create({name, slug});
      const data = {
        id: newSemesterData._id,
        name: newSemesterData.name,
        slug: newSemesterData.slug,
      }
      return setResponse(event, { statusCode: 200, statusMessage: 'success', data: data })
    }
  } catch (err) {
    return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
  }
});