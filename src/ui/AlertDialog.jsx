import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../features/blog/blogSlice';

const AlertDialog = ({open, handleOpen, index}) => {
    const dispatch = useDispatch();
  return (
    <div>
 <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Blog</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the blog?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>No</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            dispatch(removeBlog(index));
            handleOpen();
          }}>
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>


    </div>
  )
}

export default AlertDialog