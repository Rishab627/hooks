import { Button, Input, avatar } from '@material-tailwind/react';
import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {

  const [search, setSearch] = useState('spider');
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: (val) => {

      setSearch(val.search);

    }
  });

  const getData = async () => {
    try {

      const response = await axios.get(`http://www.omdbapi.com?apikey=6905a701&s=${search}`);
      setData(response.data);
    } catch (err) {

    }
  }

  useEffect(() => {
    getData();

  }, [search])

  console.log(data);


  return (


    <div className='p-5'>
      <div className="search-info" >
        <form onSubmit={formik.handleSubmit} className='flex gap-5 items-center'>
          <div className='place-items-center'>
            <Input className='max-w-sm'
              name='search'
              value={formik.values.search}
              onChange={formik.handleChange}
              label='search movie' />
          </div>

          <Button type='submit' size='sm'>Submit</Button>
        </form>
      </div>
      <br />


      <div className="main grid grid-cols-4 space-y-5">
      
          {data?.Search.map((mov) => {
            return <div className="movie" key={mov.imdbID}>
                <img src={mov.Poster} alt="" />
                <h1 className='font-semibold'>{mov.Type}</h1>
                <h1 className='text-2xl font-bold'>{mov.Title}</h1>
                <p>{mov.Year}</p>
            </div>
          })}
        
      </div>


    </div>
  )
}

export default App