'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { getProperty } from '@/utils/requests'

const PropertyPage = () => {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  console.log('id: ', id)

  const fetchPropertyData = async () => {
    if (!id) return
    try {
      const property = await getProperty(id)
      setProperty(property)
    } catch (err) {
      console.error('Error fetching property: ', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (property === null) fetchPropertyData()
  }, [id, property])

  console.log('property: ', property)
  return (
    <div>
      <h1>Property Page</h1>
    </div>
  )
}

export default PropertyPage
