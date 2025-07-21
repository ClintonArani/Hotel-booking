import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex gap-1 items-center">
      {Array(5)
        .fill('')
        .map((_, index) => (
          <img
            key={index}
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
            alt="star-icon"
            className="w-5 h-5"
          />
        ))}
    </div>
  )
}

export default StarRating
