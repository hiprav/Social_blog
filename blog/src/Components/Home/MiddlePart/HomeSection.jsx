import { Avatar, Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import TwitCard from "./TwitCard/TwitCard";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
//import { createTweet, getAllTweets } from "../../../Store/Tweet/Action";

import BackdropComponent from "../../Backdrop/Backdrop";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiPicker from "emoji-picker-react";
import { createTwit, getAllTweet } from "../../../store/Action";
import { uploadToCloudnary } from "../../../Utils/UploadToCloudnary";
// import ImageIcon from '@mui/icons-material/Image';

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selsectedVideo, setSelectedVideo] = useState("");
  const dispatch = useDispatch();
  const { twit } = useSelector(store => store);//,auth,theme
  const jwt = localStorage.getItem("jwt")

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => setOpenEmoji(!openEmoji)
  const handleCloseEmoji = () => setOpenEmoji(false);

  const handleSubmit = (values, actions) => {
    dispatch(createTwit(values))
    actions.resetForm();
    setSelectedImage("")
    setSelectedVideo("")
    handleCloseEmoji()
  };


  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      video: ""
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudnary(event.target.files[0], "image");
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  const handleSelectVideo = async (event) => {
    setUploadingImage(true);
    // const videoUrl = await uploadToCloudinary(event.target.files[0],"video");
    //formik.setFieldValue("video", videoUrl);
    //setSelectedVideo(videoUrl)
    setUploadingImage(false);

    // console.log()
  };

  useEffect(() => {
    dispatch(getAllTweet())
  }, [twit.like, twit.retwit])

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue("content", formik.values.content + emoji)
  }


  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5 ">
          <Avatar
            alt="Avatar"
          //src={auth.user?.image}
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-[#6e6e6e]" >
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?"
                  className={`border-none outline-none text-xl bg-transparent `}
                  {...formik.getFieldProps("content")} />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500">{formik.errors.content}</div>
                )}
              </div>

              {!uploadingImage && (
                <div>
                  {selectedImage && <img className="w-[28rem]" src={selectedImage} alt="" />}

                  {/* {selsectedVideo  && <video autoPlay controls src={twit.video}/>} */}
                </div>
              )}

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2  rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>

                  <label className="flex items-center space-x-2  rounded-md cursor-pointer">
                    <SlideshowIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="videoFile"
                      className="hidden"
                      onChange={handleSelectVideo} />
                  </label>

                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <div className="relative">
                    <TagFacesIcon onClick={handleOpenEmoji} className="text-[#1d9bf0] cursor-pointer" />
                    {openEmoji && <div className="absolute top-10 z-50 ">
                      <EmojiPicker
                        // theme={theme.currentTheme}
                        onEmojiClick={handleEmojiClick}
                        lazyLoadEmojis={true}/>
                    </div>}
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#1d9bf0",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      color: "white",
                    }}>
                    Add blog
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* twit section */}
      <section className="space-y-5">
        {twit.twits && twit.twits.length > 0 ? (
          [...twit.twits].reverse().map((item, index) => (
            <TwitCard key={index} twit={item} />
          ))
        ) : (
          <p>No tweets available</p>
        )}
      </section>
      <section>
        <BackdropComponent open={uploadingImage} />
      </section>
    </div>
  );
};
export default HomeSection;
