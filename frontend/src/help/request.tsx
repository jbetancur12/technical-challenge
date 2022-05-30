export const getUserInfo = async (url: string): Promise<string> => {
  return (
    await fetch(url)
      .then(async (response) => await response.json())
      // and return the result data.
      .then((data) => data)
  )
}
