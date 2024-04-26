import connectDB from '@/config/database'

export const GET = async (req) => {
  try {
    await connectDB()
    return new Response('Hello from other side', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
