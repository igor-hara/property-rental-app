import connectDB from '@/config/database'
import Property from '@/models/Property'

// GET /api/properties/:id

export const GET = async (req, { params }) => {
  const id = params.id

  try {
    await connectDB()

    const property = await Property.findById(id)

    if (!property) return new Response('Property not found', { status: 404 })

    return new Response(JSON.stringify(property), { status: 200 })
  } catch (err) {
    console.error('Error fetching single property:', err)
    return new Response(err.message, { status: 500 })
  }
}
