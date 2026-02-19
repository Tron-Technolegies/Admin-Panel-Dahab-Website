import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GrEdit } from "react-icons/gr";
import { IoEye, IoLocationOutline, IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteEvent } from "../../hooks/events/useAdminEvents";
import Loading from "../Loading";

export default function EventCard({
  _id,
  title,
  date,
  smallImage,
  mainImage,
  altText,
  location,
}) {
  const [open, setOpen] = useState(false);
  const { isPending, deleteEvent } = useDeleteEvent();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-3 rounded-md bg-gray-200 shadow md:w-87.5 w-full h-100">
        <img
          src={smallImage ? smallImage?.url : mainImage?.url}
          alt={altText}
          className="h-3/5 w-full object-cover rounded-md"
        />
        <div className="flex flex-col gap-2 my-3">
          <div className="flex gap-2 items-center text-sm ">
            <CiCalendarDate />
            <p className="italic">
              {new Date(date).toLocaleDateString("en-us")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <IoLocationOutline />
            <p>{location}</p>
          </div>

          <p className="font-semibold">{title.slice(0, 30)}....</p>
          <div className="flex gap-7 items-center justify-center mt-5">
            <Link to={`/events/${_id}`}>
              <IoEye className="text-gray-400 cursor-pointer" />
            </Link>
            <Link to={`/events/edit/${_id}`}>
              <GrEdit className="text-blue-700 cursor-pointer" />
            </Link>

            <IoTrashBin
              className="text-red-700 cursor-pointer"
              onClick={handleClickOpen}
            />
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Want To Delete This Event ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={async () => deleteEvent(_id)}>Yes</Button>
        </DialogActions>
        {isPending && <Loading />}
      </Dialog>
    </>
  );
}
