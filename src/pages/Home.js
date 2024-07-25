import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard';

const Home = () => {

  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes', {
        // params: {
        //   api_key: 'f3ad2eea7599eade545772ddb286d350',
        //   page: page
        // }
      });
      setData(response.data);
    } catch (err) {
    }

  }

  useEffect(() => {
    getData();
    console.log('hello see');
  }, [page]);

  console.log(data);
  console.log('render');

  return (

  <div>
    
    
    {data && <div className='grid grid-cols-3 space-y-5 gap-5 '>

    {data?.recipes.map((rec) => {
      return <div className='w-[500px]' key={rec.id}>
      <img className='w-full' src={rec.image} alt="" />
      <h1 className='text-2xl font-semibold'>{rec.name}</h1>

      {rec.ingredients.map((ing, i) => {
        return <p key={i}>{`${i+1}.`}{ing}</p>
      })}
      
      
      </div>
    })}
    
    
    
    </div>}
    
    </div>
    
  )
}

export default Home