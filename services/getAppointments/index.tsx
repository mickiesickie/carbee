const getAppoinments = async ({ token, isServer, params }) => {
  try {
    const response = await fetch(
      `${isServer ? process.env.BASE_URL : ''}/api/appointments?size=${
        params.size
      }&after=${params.after}`,
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

export default getAppoinments
