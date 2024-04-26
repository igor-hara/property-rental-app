const apiDomain = process.env.NEXT_PUBLIC_API || null

async function getProperties() {
  try {
    // handle case where the domain is not available yet
    if (!apiDomain) return []

    const response = await fetch(`${apiDomain}/properties`)

    if (!response.ok) {
      new Error('Failed to fetch properties')
    }
    return await response.json()
  } catch (err) {
    console.error('Error: ', err)
    return []
  }
}

export { getProperties }
