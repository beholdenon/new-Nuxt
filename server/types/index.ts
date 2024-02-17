import { Types } from "mongoose"

export interface ISetResponse {
    statusCode: number
    statusMessage: string
    data?: any,
    cause?: any
}