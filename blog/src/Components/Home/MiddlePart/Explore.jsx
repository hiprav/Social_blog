import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweet } from '../../../store/Action';
import TwitCard from './TwitCard/TwitCard';
import BackdropComponent from '../../Backdrop/Backdrop';

function Explore() {
    const dispatch = useDispatch();
    const { twit } = useSelector(store => store);//,auth,theme
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        dispatch(getAllTweet())
       
      }, [twit.like, twit.retwit])
  return (
    <div className="space-y-5">
    <section>
      <h1 className="py-5 text-xl font-bold opacity-90">Explore</h1>
    </section>
    {/* <section className={`pb-10`}>
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
                  Tweet
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div> 
    </section>*/}
    {/* twit section */}
    <section>

    </section>
    <section className="space-y-5">
      {twit.twits && twit.twits.length > 0 ? (
        [...twit.twits].reverse().map((item, index) => (
          <TwitCard key={index} twit={item} />
        ))
      ) : (
        <p>No tweets available</p>
      )}
    </section>
    {/* <section>
      <BackdropComponent open={uploadingImage} />
    </section> */}
  </div>
  )
}

export default Explore
