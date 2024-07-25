import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router';

const CategoryCard = ({rec: {id, name, image}}) => {



    const nav = useNavigate();
  return (
        <d className='grid grid-cols-3'>
        <Card className="mt-6 w-[500px] flex">
        <CardHeader color="blue-gray" className="relative h-56">
          <img className='w-full'
            src={image}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
           {name}
          </Typography>
          <Typography>
            {''}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={() => nav(`/category/${'strCategory'}`)}>Read More</Button>
        </CardFooter>
      </Card>
      </d>
  )
}

export default CategoryCard