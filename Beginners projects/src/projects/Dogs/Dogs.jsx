import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

const Dogs = () => {

    const [dogs, setDogs] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchDogs = async () => {
            if (search.trim() === '') {
                return; // Do not fetch if search is empty
            }
            try {
                const res = await axios.get(`https://api.api-ninjas.com/v1/dogs?name=${search}`, {
                    headers: {
                        'X-Api-Key': 'rt9LjpH2QK1qIZuNX27f3A==6R4LvFsPdh5iK8Tb'
                    }
                })
                console.log(res.data)
                setDogs(res.data)
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }
        fetchDogs()
    }, [search])





  return (
    <section className='w-1/2 p-4 bg-gray-700 text-white flex flex-col gap-5 justify-center items-center'>
      <h1>Paw Pawwww Finder</h1>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type='text' placeholder='Search...' className=' p-2 rounded-md bg-gray-800 text-white'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className=' p-4 rounded-md bg-blue-500 text-white'>Search</button>
      </form>
      <div className='w-full text-center'>
        <h2 className='w-full p-4 bg-orange-400'>Results</h2>
        <div className='w-full flex flex-col items-center'>
            {dogs.length > 0 ? (
                <>
                    <img src={`${dogs[0].image_link}`} alt={dogs[0].name} height={100} width={100}/>
                    <h3>Name: <span>{dogs[0].name}</span></h3>
                    <p>Life Expectancy: {dogs[0].min_life_expectancy} - {dogs[0].max_life_expectancy} years</p>
                    <p>Height: {dogs[0].min_height_male} - {dogs[0].max_height_male} inches</p>
                    <p>Weight: {dogs[0].min_weight_male} - {dogs[0].max_weight_male} lbs</p>
                </>
            ) : (
                // <p>No results found</p>
            )}
        </div>
      </div>
    </section>
  )
}

export default Dogs