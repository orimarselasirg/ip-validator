import { baseApi } from "./apiRequest"

export const deleteStatusIp = async (ip: string) => {
  const data =  await baseApi.delete(`/deleteip?ip=${ip}`)
  return data
}