import connectDB from '@/config/database'
import Property from '@/models/Property'

/**
 * Asynchronous function that handles GET requests.
 *
 * @param {Object} req - The request object.
 * @return {Promise<Response>} A promise that resolves to a Response object.
 */

// GET /api/properties
export const GET = async (req) => {
  try {
    await connectDB()

    const properties = await Property.find({})

    return new Response(JSON.stringify(properties), { status: 200 })
  } catch (err) {
    console.error('Error fetching properties:', err)
    return new Response(err.message, { status: 500 })
  }
}
