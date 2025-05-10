import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Quotes = () => {
  const [quotes, setQuotes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const api = 'https://api.api-ninjas.com/v1/quotes'

  const getQuotes = async () => {
    try {
      setIsFetching(true)
      setError(null)
      const res = await axios.get(api, {
        headers: {
          'X-Api-Key': 'rt9LjpH2QK1qIZuNX27f3A==6R4LvFsPdh5iK8Tb'
        }
      })
      setQuotes(res.data[0])
    } catch (err) {
      console.error('Error fetching quote:', err)
      setError('Failed to fetch quote. Please try again.')
    } finally {
      setIsFetching(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    getQuotes()
  }, [])

  if (loading) {
    return <div className='text-center mt-10'>Loading...</div>
  }

  return (
    <section>
      <h1 className='text-center mb-10 border-b border-b-amber-50 pb-3'>Quotes Generator</h1>
      <div className='p-4 flex flex-col items-center gap-6'>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <>
            <p className='text-xl text-center'>" {quotes.quote} "</p>
            <p className='w-full text-right font-semibold'><span>-</span> {quotes.author}</p>
          </>
        )}

        <button
          className='bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 text-white disabled:opacity-50'
          onClick={getQuotes}
          disabled={isFetching}
        >
          {isFetching ? 'Fetching...' : 'Generate'}
        </button>
      </div>
    </section>
  )
}

export default Quotes
