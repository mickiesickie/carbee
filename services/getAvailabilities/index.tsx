
const getAvailabilities = async ({ token, isServer, date }) => {
  try {
    const response = await fetch(
      `${isServer ? process.env.BASE_URL : ''}/api/availability/${date}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return data
  } catch {
    console.log('error')
  }
}

export default getAvailabilities
