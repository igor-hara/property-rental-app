import Image from 'next/image'

const PropertyImages = ({ images }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto w-full'>
        {images?.length === 1 ? (
          <Image
            src={images[0]}
            alt=''
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {images.map((image, ind) => (
              <div
                key={ind}
                className={`${images.length === 3 && ind === 2 ? 'col-span-2' : 'col-span-1'}`}
              >
                <Image
                  key={ind}
                  src={image}
                  alt=''
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertyImages
