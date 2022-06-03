export const getUserInfo = async (url: string): Promise<any> => {
  const resp: any = await fetch(url)
  const result = await resp.json()
  return result
}
