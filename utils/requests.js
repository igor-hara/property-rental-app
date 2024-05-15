const apiDomain = process.env.NEXT_PUBLIC_API || null

const getProperties = async () => {
  try {
    // handle case where the domain is not available yet
    if (!apiDomain) return []

    // no-store makes appear new properties right away (without refresh)
    const response = await fetch(`${apiDomain}/properties`, { cache: 'no-store' })

    if (!response.ok) {
      throw new Error('Failed to fetch properties')
    }
    return await response.json()
  } catch (err) {
    console.error('Error: ', err)
    return []
  }
}

// fetch single property
const getProperty = async (id) => {
  try {
    // handle case where the domain is not available yet
    if (!apiDomain) return null
    const res = await fetch(`${apiDomain}/properties/${id}`)

    if (!res.ok) throw new Error('Failed to fetch property')

    return await res.json()
  } catch (err) {
    console.error('Error fetching single property: ', err)
    return null
  }
}

export { getProperties, getProperty }
