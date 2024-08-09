import React, { useEffect } from 'react'
import TwitCard from './TwitCard/TwitCard'
import { useDispatch, useSelector } from 'react-redux'
//import { findTwitsById } from '../../../Store/Tweet/Action';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import { findTwitById } from '../../../store/Action';

 const TwitDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();
   dispatch(findTwitById(param.id))
  let { twit } = useSelector(store => store);//,theme
  
  const navigate = useNavigate();
  const handleBack = () => navigate(-1)

  useEffect(() => {
  //dispatch(findTwitById(param.id));
  async function fetchNumber() {
    console.log("on the way");
  await axios.get(`https://localhost:5454/api/twits/${param.id}`)
  .then(response => twit=response.data)
  .catch(error => console.error('Error fetching number:', error));
  console.log("yee hai tera uter--->","param.id->",twit);
}
fetchNumber();
  }, [ param.id]);
  dispatch(findTwitById(param.id));
  console.log("near",param.id);
  twit=twit.twits[param.id-1];
  console.log("twitdetail->", twit);
  console.log(twit.liked);

  return (
    <div>
      <section
        className={`z-50 flex items-center sticky top-0 
         bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {"Twit"}
        </h1>
      </section>
      <section>
        <TwitCard twit={twit} />
        <Divider sx={{ margin: "1rem 0rem" }} />
      </section>
      <section >
        {twit && twit?.replyTwits ? (
          twit?.replyTwits.map((item, index) => (
            <TwitCard key={index} twit={item} />
          ))
        ) : (
          <p>No replies available</p>
        )}
      </section>
    </div>
  )
}

export default TwitDetail