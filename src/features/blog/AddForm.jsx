import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Radio,
  } from "@material-tailwind/react";
const AddForm = () => {
  return (
    <div className='p-7 mx-auto w-80 max-w-lg'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Add Blog
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter Blog Details
      </Typography>

      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
         
          <Input
            size="lg"
            label='Blog Title'
           />

           <Input
            size='lg'
            label='Author'
            />

            <div className="type">
            <Typography>Blog Type</Typography>
            <div className="">
                <Radio 
                name='type' 
                label="News" 
                 />
                <Radio 
                name='type' 
                label="Travel"
                color='green' />
            </div>
            </div>


            


            <div className="">
                <Textarea label='Description' />
            </div>

       
          
        </div>
        
        <Button className="mt-6" fullWidth>
          submit
        </Button>
        
      </form>
    </Card>
    </div>
  )
}

export default AddForm