import { hc } from 'hono/client'
import { type apiRoutesType } from "../../../backend/server/app"

const client = hc<apiRoutesType>("/")

export const honoAPI = client.api