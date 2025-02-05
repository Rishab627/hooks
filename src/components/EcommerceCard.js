import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import {faker} from '@faker-js/faker'
import { useNavigate } from 'react-router';

   
const EcommerceCard = ({meal: {strMeal, strMealThumb, idMeal}}) => {


  const nav = useNavigate();
  return (
    <Card className="">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={strMealThumb}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {strMeal}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {`$${faker.commerce.price()}`}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
        onClick={() => nav(`/food-detail/${idMeal}`)}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          View Full
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EcommerceCard