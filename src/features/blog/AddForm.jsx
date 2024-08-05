import React from 'react'
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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addBlog } from './blogSlice';
import { useNavigate } from 'react-router';
import { useBackTo } from '../../hooks/backTo';


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
  imageReview: Yup.mixed().test('fileType', 'invalid image', (e) => {
    const validTypes = [ 'image/jpeg', 'image/jpg', 'image/png' ];
    return e && validTypes.includes(e.type);
  })
});

const AddForm = () => {

  const dispatch = useDispatch();

  const nav = useNavigate();
    

  // const {handleChange, handleSubmit, values, errors, setFieldValue, touched} = useFormik({
  //   initialValues: {
  //     title: '',
  //     author: '',
  //     blogType: '',
  //     someEx: [],
  //     country: '',
  //     rating: null,
  //     description: '',
  //     imageReview: null,
  //     baseImage: null
  //   },
  //   onSubmit: (val, {resetForm}) => {
  //     delete val.imageReview;
  //     dispatch(addBlog({...val, id: nanoid()}))
  //     nav(-1);
  //   },
  //   validationSchema: blogSchema
  // });
  
  return (
    <div className='p-7 mx-auto w-80 max-w-lg'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Add Blog
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter Blog Details
      </Typography>


     
      <Formik
          initialValues={{
            title: '',
            author: '',
            blogType: '',
            someEx: [],
            country: '',
            rating: null,
            description: '',
            imageReview: null,
            baseImage: null
          }}
          onSubmit={(val, { resetForm }) => {
            delete val.imageReview;

            dispatch(addBlog({ ...val, id: nanoid() }));
            nav(-1);
          }}
          validationSchema={blogSchema}
        >

          {({ handleChange, touched, values, errors, setFieldValue, handleSubmit }) => <form onSubmit={handleSubmit} className="mt-4 mb-2 ">
            <div className="mb-1 flex flex-col gap-6">

              <div>
                <Input
                  name='title'
                  onChange={handleChange}
                  value={values.title}
                  size="lg"
                  label='Blog Title'
                />
                {errors.title && touched.title && <h1 className='text-red-600'>{errors.title}</h1>}
              </div>

              <div>
                <Input
                  size="lg"
                  name='author'
                  onChange={handleChange}
                  value={values.author}
                  label='Author'
                />
                {errors.author && touched.author && <h1 className='text-red-600'>{errors.author}</h1>}
              </div>




              <div className="type">
                <Typography>Blog Type</Typography>

                <div className="flex gap-10">

                  {radioData.map((rad, i) => {
                    return <Radio
                      key={i}
                      color={rad.color}
                      name='blogType'
                      onChange={handleChange}
                      value={rad.value}
                      label={rad.label}
                    />;
                  })}


                </div>
                {errors.blogType && touched.blogType && <h1 className='text-red-600'>{errors.blogType}</h1>}
              </div>

              <div className="ch">
                <Typography>Some Example</Typography>
                <div className="flex w-max gap-4">
                  {checkData.map((check, i) => {
                    return <Checkbox
                      key={i}
                      name='someEx'
                      onChange={handleChange}
                      color={check.color}
                      value={check.value}
                      label={check.label} />
                  })}

                </div>
                {errors.someEx && touched.someEx && <h1 className='text-red-600'>{errors.someEx}</h1>}
              </div>


              <div className="w-72">
                <Select onChange={(e) => setFieldValue('country', e)} label="Select Country">
                  <Option value='nepal'>Nepal</Option>
                  <Option value='india'>India</Option>
                  <Option value='china'>China</Option>

                </Select>
                {errors.country && touched.country && <h1 className='text-red-600'>{errors.country}</h1>}
              </div>

              <div>
                <Typography>Rating</Typography>
                <Rating onChange={(e) => setFieldValue('rating', e)} />
                {errors.rating && touched.rating && <h1 className='text-red-600'>{errors.rating}</h1>}
              </div>



              <div>
                <Input onChange={(e) => {
                  const file = e.target.files[0];
                  // const url = URL.createObjectURL(file);
                  setFieldValue('imageReview', file);
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.addEventListener('load', (e) => {
                    setFieldValue('baseImage', e.target.result);
                  });
                }} type='file' name='image' label='select image' />

                {values.baseImage && !errors.imageReview && <img src={values.baseImage} alt="" className='h-[220px] w-full] mt-5 object-cover' />}
                {errors.imageReview && touched.imageReview && <h1 className='text-red-600'>{errors.imageReview}</h1>}

              </div>

              <div>
                <Textarea
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  label="Description" />
                {errors.description && touched.description && <h1 className='text-red-600'>{errors.description}</h1>}
              </div>





            </div>

            <Button type='submit' className="mt-6" fullWidth>
              Submit
            </Button>

          </form>}


        </Formik>



      
    </Card>
    </div>
  )
}

export default AddForm