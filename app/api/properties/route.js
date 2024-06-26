import connectDB from '@/config/database'
import Property from '@/models/Property'

import { getSessionUser } from '@/utils/getSessionUser'
import cloudinary from '@/config/cloudinary'

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

// POST /api/properties
export const POST = async (req) => {
  try {
    await connectDB()

    // get user id
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 })
    }
    const { userId } = sessionUser

    // fetch form data
    const formData = await req.formData()

    // access all values from amenities and images
    const amenities = formData.getAll('amenities')
    const images = formData.getAll('images').filter((image) => image !== '')

    // create new property object
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities: amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    }

    // upload images to cloudinary
    const imageUploadPromises = []

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer()
      const imageArray = Array.from(new Uint8Array(imageBuffer))
      const imageData = Buffer.from(imageArray)

      // convert image data to base64
      const base64Image = imageData.toString('base64')

      // upload to cloudinary
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: 'propertypulse',
      })

      if (result && result.url) {
        imageUploadPromises.push(result.url)
      } else {
        console.error('Error uploading image to cloudinary:', result)
        // Handle the case where result or result.secure is undefined
      }

      // wait for all images to upload
      // add uploaded images to the propertyData object
      const imageUploadResults = await Promise.all(imageUploadPromises)
      propertyData.images = imageUploadResults
    }

    // save to DB
    const newProperty = new Property(propertyData)
    await newProperty.save()

    // redirect to this created property
    return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/properties/${newProperty._id}`)

    //   return new Response(JSON.stringify({ message: 'Property created successfully.' }), {
    //     status: 200,
    //   })
  } catch (err) {
    console.error('Error creating property:', err)
    return new Response(err.message, { status: 500 })
  }
}
