'use client'

import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '100px auto',
}

const Loading = ({ loading }) => {
  return (
    <div className='sweet-loading'>
      <ClipLoader
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
      />
    </div>
  )
}

export default Loading
