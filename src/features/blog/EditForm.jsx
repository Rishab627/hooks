import React, { useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Radio,
    Option,
    Select,
    Rating
  } from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog } from './blogSlice';
import { useNavigate, useParams } from 'react-router';


const radioData = [
  {value: 'news', color: 'red', label: 'News'},
  {value: 'travel', color: 'green', label: 'Travel'},
];

const checkData = [
  {color: 'blue', label:'Blue', value:'blue'},
  {color: 'red', label:'Red', value:'red'},
  {color: 'green', label:'Green', value:'green'},
];

const blogSchema = Yup.object({
  title: Yup.string().min(4).max(100).required(),
  author: Yup.string().min(2).max(100).required(),
  blogType: Yup.string().required(),
  someEx: Yup.array().min(1).required(),
  country: Yup.string().required(),
  rating: Yup.number().required('rating is required'),
  description: Yup.string().min(10).max(200).required('description is required'),
//   imageReview: Yup.mixed().test('fileType', 'invalid image', (e) => {
//     return e && ;
//   })
});

const validTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp' ];



const EditForm = () => {

    const {id} = useParams();



  const dispatch = useDispatch();

  const {blogs} = useSelector((state) => state.blogSlice);


  const blog = blogs.find((blog) => blog.id === id);

  const nav = useNavigate();

  const {handleChange, handleSubmit, values, errors, setFieldValue, touched} = useFormik({
    initialValues: {
      title: blog.title,
      author: blog.author,
      blogType: blog.blogType,
      someEx: blog.someEx,
      country: blog.country,
      rating: blog.rating,
      description: blog.description,
      imageReview: null,
      baseImage: blog.baseImage
    },
    onSubmit: (val, {resetForm}) => {


       


        if (val.imageReview === null) {
            delete val.imageReview;
            dispatch(updateBlog({...val, id: id}))
            nav(-1);
        } else {
            if (validTypes.includes(val.imageReview.type)) {
                delete val.imageReview;
            dispatch(updateBlog({...val, id: id}))
            nav(-1);
            } else {
                console.log('please provide image');
            }
            
        }



        // delete val.imageReview;
        // dispatch(updateBlog({...val, id: id}))
        // nav(-1);

   
    },
    //  validationSchema: blogSchema,
     
  });
  
  return (
    <div className='p-7 mx-auto w-80 max-w-lg'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Edit Blog
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter Blog Details
      </Typography>

      <form onSubmit={handleSubmit} className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
         

         <div className="title">
         <Input
            name='title'
            onChange={handleChange}
            value={values.title}
            size="lg"
            label='Blog Title'
           />
           {errors.title && touched.title &&<h1 className='text-red-600'>{errors.title}</h1>}

         </div>
          

          <div className="author">
          <Input
            name='author'
            onChange={handleChange}
            value={values.author}
            size='lg'
            label='Author'
            />
            {errors.author && touched.author &&<h1 className='text-red-600'>{errors.author}</h1>}

          </div>
           

           <div className="radio">
           <div className="">
              <Typography>Blog Type</Typography>
              <div className="">
              {radioData.map((rad, i) => {
              return  <Radio
              key={i}
              color={rad.color}
              name='blogType'
              onChange={handleChange}
              checked={rad.value === values.blogType}
              value={rad.value}
              label={rad.label}
              />;
            })}
              </div>
              </div>
              {errors.blogType && touched.blogType &&<h1 className='text-red-600'>{errors.blogType}</h1>}
           </div>
            


            
            <div className="someex">
            <div className="ch">
              <Typography>Some Example</Typography>
              <div className="flex w-max gap-4">
                {checkData.map((check, i) => {
                  return <Checkbox
                  key={i}
                  color={check.color}
                  name='someEx'
                  checked={values.someEx.includes(check.value)}
                  label={check.label}
                  onChange={handleChange}
                  value={check.value}
                  />
                })}
               
              </div>
            </div>
            {errors.someEx && touched.someEx &&<h1 className='text-red-600'>{errors.someEx}</h1>}
            </div>
           
            
            <div className="country">
            <div className="ch">
              <Select onChange={(e) => setFieldValue('country', e)} label="Select Country" value={values.country}>
                <Option value='nepal'>Nepal</Option>
                <Option value='india'>India</Option>
                <Option value='pakistan'>Pakistan</Option>
                <Option value='usa'>USA</Option>
                <Option value='canada'>Canada</Option>

              </Select>
            </div>
            {errors.country && touched.country &&<h1 className='text-red-600'>{errors.country}</h1>}
            </div>


            <div className="file">
              <Input 
              onChange={(e) => {
                const file = e.target.files[0];
                // const url = URL.createObjectURL(file);
                setFieldValue('imageReview', file) ;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener('load', (e) => {
                setFieldValue('baseImage', e.target.result) ;
                console.log('hello');
                })
              }}
              type='file'
              name='image'
              label='Update Image'/>

              {values.baseImage && <img src={values.baseImage} alt="" height='200px' /> }
              {errors.imageReview && touched.imageReview &&<h1 className='text-red-600'>{errors.imageReview}</h1>}
            
            </div>
            


            <div className="">
              <Typography>Rating</Typography>
            <Rating value={values.rating}
            onChange={(e) => setFieldValue('rating', e)}/>
          
          {errors.rating && touched.rating &&<h1 className='text-red-600'>{errors.rating}</h1>}

            </div>


            


            <div className="">
                <Textarea 
                name='description'
                label='Description'
                onChange={handleChange}
                value={values.description} />
               {errors.description && touched.description && <h1 className='text-red-600'>{errors.description}</h1>}
            </div>


           

       
          
        </div>
        
        <Button type='submit' className="mt-6" fullWidth>
          submit
        </Button>
        
      </form>
    </Card>
    </div>
  )
}

export default EditForm