import { IPData } from "../interfaces/apiInterface"
import { baseApi } from "./apiRequest"

export const saveIpOnList = async (ip: string, ipData: IPData) => {
  try {
    const {data} = await baseApi.post(`/saveip`,{ ip, ipData})
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const saveIpAndStatusOnList = async (ip: string, status: string, ipData: IPData) => {
  try {
    const {data} = await baseApi.post(`/createipandstatus`,{ ip, status, ipData})
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
