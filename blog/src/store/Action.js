import axios from "axios"
import { api, API_BASE_URL } from "./Api"
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_SUCCESS} from "./ActionType"
//TWEET_CREATE_REQUEST,TWEET_CREATE_SUCCESS,TWEET_CREATE_FAILURE,TWEET_DELETE_REQUEST,TWEET_DELETE_SUCCESS,TWEET_DELETE_FAILURE,GET_ALL_TWEETS_REQUEST,GET_ALL_TWEETS_SUCCESS,GET_ALL_TWEETS_FAILURE,GET_USERS_TWEET_FAILURE,GET_USERS_TWEET_REQUEST,GET_USERS_TWEET_SUCCESS,LIKE_TWEET_REQUEST,LIKE_TWEET_SUCCESS,LIKE_TWEET_FAILURE,USER_LIKE_TWEET_SUCCESS,USER_LIKE_TWEET_REQUEST,USER_LIKE_TWEET_FAILURE,RETWEET_CREATE_REQUEST,RETWEET_CREATE_SUCCESS,RETWEET_CREATE_FAILURE,FIND_TWEET_BY_ID_REQUEST,FIND_TWEET_BY_ID_SUCCESS,FIND_TWEET_BY_ID_FAILURE,REPLY_TWEET_REQUEST,REPLY_TWEET_SUCCESS,REPLY_TWEET_FAILURE
export const loginUser=(loginData)=>async(dispatch)=>{
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/signin`,loginData)
        console.log("API-loginUse->",data);
        if (data.jwt) {
            console.log("sored in local storage");
            localStorage.setItem('jwt',data.jwt)
        }
        dispatch({type:LOGIN_USER_SUCCESS,payload:data.jwt})
        console.log("dispached");
    } catch (error) {
        console.log("error",error)
        dispatch({type:LOGIN_USER_FAILURE,payload:error.message})
    }
}
export const registerUser=(registerData)=>async(dispatch)=>{
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,registerData)
        console.log("registerUser",data);
        if (data.jwt) {
            localStorage.setItem('jwt',data.jwt)
        }
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.jwt})
    } catch (error) {
        console.log("error",error)
        dispatch({type:REGISTER_USER_FAILURE,payload:error.message})
    }
}
export const getUserProfile=(jwt)=>async(dispatch)=>{
    try {
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        })
        console.log("API-getUserProfile->",data);
        dispatch({type:GET_USER_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:GET_USER_PROFILE_FAILURE,payload:error.message})
    }
}
export const logout=()=>async(dispatch)=>{
       localStorage.removeItem("jwt")
        dispatch({type:LOGOUT,payload:null})
}
export const findUserById=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`/api/users/${userId}`)
        console.log("API-findUserById->",data);
        dispatch({type:FIND_USER_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:FIND_USER_BY_ID_FAILURE,payload:error.message})
    }
}
export const searchUser=(query)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`/api/users/search?query=${query}`)
        console.log("API-searchUser->",data);
        dispatch({type:SEARCH_USER_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:SEARCH_USER_FAILURE,payload:error.message})
    }
}
export const updateUserprofile=(reqData)=>async(dispatch)=>{
    try {
        const {data}=await api.put(`/api/users/update`,reqData)
        console.log("API-updateUserprofile->",data);
        dispatch({type:UPDATE_USER_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:UPDATE_USER_FAILURE,payload:error.message})
    }
}
export const followUserAction=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.put(`/api/users/${userId}/follow`)//not sure  get or put
        console.log("API-followUserAction->",data);
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:FOLLOW_USER_FAILURE,payload:error.message})
    }
}
//---------------------------------Action for tweet----------------------------------//

export const getAllTweet=()=>async(dispatch)=>{
    try {
        const {data}=await api.get('/api/twits/');
        console.log("API-getAllTweet->",data);
        dispatch({type:GET_ALL_TWEETS_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:GET_ALL_TWEETS_FAILURE,payload:error.message})
    }
}
export const getUsersTweet=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`/api/twits/user/${userId}`);
        console.log("API-getUsersTweet->",data);
        dispatch({type:GET_USERS_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:GET_USERS_TWEET_FAILURE,payload:error.message})
    }
}
export const findTwitsLikeContaineUser=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`/api/twits/user/${userId}/likes`);
        console.log("API-findTwitsLikeContaineUser->",data);
        dispatch({type:USER_LIKE_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:USER_LIKE_TWEET_FAILURE,payload:error.message})
    }
}
export const findTwitById=(twitId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`/api/twits/${twitId}`);
        console.log("API-findTwitById->",data);
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("error",error)
        dispatch({type:FIND_TWEET_BY_ID_FAILURE,payload:error.message})
    }
}
export const createTwit=(tweetData)=>async(dispatch)=>{
    try {
        const {data}=await api.post("/api/twits/create",tweetData);
        console.log("API-createTwit->",data);
        dispatch({type:TWEET_CREATE_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:TWEET_CREATE_FAILURE,payload:error.message})
    }
}
export const createTwitReply=(tweetData)=>async(dispatch)=>{
    try {
        const {data}=await api.post(`/api/twits/reply`,tweetData);
        console.log("API-createTwitReply->",data);
        dispatch({type:REPLY_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:REPLY_TWEET_FAILURE,payload:error.message})
    }
}
export const createReTweet=(twitId)=>async(dispatch)=>{
    try {
        const {data}=await api.put(`/api/twits/${twitId}/retwit`);//check for post or get?
        console.log("API-createReTweet->",data);
        dispatch({type:RETWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:RETWEET_FAILURE,payload:error.message})
    }
}
export const likeTweet=(twitId)=>async(dispatch)=>{
    try {
        const {data}=await api.post(`/api/${twitId}/likes`);//check for post or get?
        console.log("like tweet:",data);
        dispatch({type:LIKE_TWEET_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:LIKE_TWEET_FAILURE,payload:error.message})
    }
}
export const deleteTweet=(twitId)=>async(dispatch)=>{
    try {
        const {data}=await api.post(`/api/tweet/${twitId}`);//check for post or get?
        console.log("delete tweet:",data);
        dispatch({type:TWEET_DELETE_SUCCESS,payload:twitId})
    } catch (error) {
        console.log("error",error)
        dispatch({type:TWEET_DELETE_FAILURE,payload:error.message})
    }
}