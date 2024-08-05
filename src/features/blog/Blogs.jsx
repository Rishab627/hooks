import { Card, IconButton, Rating, Typography } from '@material-tailwind/react';
import React from 'react'
import { useSelector } from 'react-redux'
import AlertDialog from '../../ui/AlertDialog';
import { useNavigate } from 'react-router';

const TABLE_HEAD = ["Title", "Image", "Author", "BlogType",  "Country", "Rating", "Description", "Update", "Delete"];


const Blogs = () => {


  const nav = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [ind, setInd] = React.useState(0);


  const handleOpen = () => setOpen(!open);
 


  const {blogs} = useSelector((state) => state.blogSlice);


  // useEffect(() => {
    
  //   window.addEventListener('click', (e) => {
  //     console.log('hello jee');
  //   })
  // }, []);
  
  

  return (

    <div className="p-7">
    <Card className="h-full w-full">
    <table className="w-full table-fixed text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {blogs.map(({ title, baseImage, author, blogType, someEx, country, rating, description, id }, index ) => {
          const isLast = index === blogs.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={id}>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {title}
                </Typography>
              </td>


              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <img src={baseImage} alt="img" />
                </Typography>
              </td>


              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {author}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {blogType}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                 
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {country}
                </Typography>
              </td>
              <td className={classes}>
               <Rating value={rating} readonly/>
              </td>
              <td className=''>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description}
                    </Typography>
                </td>
              <td className={classes}>
                <Typography
                  
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <IconButton
                  onClick={() => nav(`/edit-blog/${id}`)}
                   size='sm'>
                    <i className='fas fa-edit'/>
                  </IconButton>
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                 
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <IconButton onClick={() => {
                    setInd((prev) => index);
                    handleOpen();
                   }} size='sm'>
                    <i className='fas fa-trash'/>
                  </IconButton>
                </Typography>
              </td>
               
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>
  <AlertDialog open={open} handleOpen={handleOpen} index={ind}/>
  </div>
  )
}

export default Blogs