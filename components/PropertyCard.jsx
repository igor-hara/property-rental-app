import Link from 'next/link'
import Image from 'next/image'

import { FaBath, FaBed, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa'

const PropertyCard = ({ property }) => {
  // console.log('property', property)
  const { baths, beds, name, images, location, rates, square_feet, type, _id } = property

  const getRateDisplay = (rates) => {
    if (rates?.monthly) {
      return `$${rates?.monthly.toLocaleString()}/mo`
    } else if (rates?.weekly) {
      return `$${rates?.weekly.toLocaleString()}/wk`
    } else if (rates?.nightly) {
      return `$${rates?.nightly.toLocaleString()}/n`
    }
  }
  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={`/images/properties/${images[0]}`}
        alt=''
        width={0}
        height={0}
        className='w-full h-auto rounded-t-xl'
        sizes='100vw'
        priority={true}
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{type}</div>
          <h3 className='text-xl font-bold'>{name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay(rates)}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-2' />
            {beds} <span className='md:hidden lg:inline'>Beds</span>
          </p>{' '}
          <p>
            <FaBath className='inline mr-2' />
            {baths} <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            {square_feet} <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Nightly
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Weekly
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Monthly
            </p>
          )}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-lg text-orange-700' />
            <span className='text-orange-700'>
              {' '}
              {location.city} {location.state}
            </span>
          </div>
          <Link
            href={`/properties/${_id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
