import React, { useState } from 'react'
import image from './image'

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredImages = image.filter(img =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className='p-4 border border-gray-200 rounded-lg text-center'>
      <h1 className='text-2xl font-bold py-5'>Image Gallery</h1>

      {/* Search Input */}
      <input
        type='text'
        placeholder='Search by title...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mb-5 p-2 border rounded-md w-full max-w-md mx-auto'
      />

      {/* Image Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className='border border-gray-200 p-2 rounded-lg hover:shadow-md transition-all duration-300'
          >
            <div className='h-48 overflow-hidden rounded-md'>
              <img
                src={img.img}
                alt={`Image ${index + 1}`}
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer'
                onClick={() => setSelectedImage(img)}
              />
            </div>
            <p className='text-center mt-2 text-lg capitalize font-medium'>
              {img.title}
            </p>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
          <div className='relative p-4 bg-white rounded-lg max-w-2xl w-full'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-2 right-2 text-black font-bold text-xl'
            >
              &times;
            </button>
            <img
              src={selectedImage.img}
              alt={selectedImage.title}
              className='w-full h-auto rounded-lg'
            />
            <p className='mt-2 text-center font-semibold'>{selectedImage.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Images
