import PropertyCard from '@/components/PropertyCard'

async function getProperties() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/properties`)

    if (!response.ok) {
      new Error('Failed to fetch properties')
    }
    return await response.json()
  } catch (err) {}
}

const PropertiesPage = async () => {
  const properties = await getProperties()

  console.log('properties', properties)
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties && properties.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          'No properties found'
        )}
      </div>
    </section>
  )
}

export default PropertiesPage
