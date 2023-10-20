//API_notification messages

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:"Loading",
        message:"Data is being Loaded,please wait"
},
success: {
    title: "Success",
    message: "Data has been loaded successfully"
},
responseFailure:{
    title:"Error",
    message:"An Error occured while fetching response from the server. plase try again"
},
requestFailure:{
    title:"Error",
    message:"An Error occured while sending request to the server. plase try again"
},
networkError:{
    title:"Error",
    message:"Network Error. plase try again"
}

}

//Api Service call

export const SERVICE_URLS={
    userSignup: { url: "/signup", method: "POST" },
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'/create',method:'POST'},
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'/post',method:'GET',query:true},
    updatePost:{url:'/update',method:'PUT',query:true},
    deletePost:{url:'/delete',method:'DELETE',query:true},
    newComment:{url:'comment/new',method:'POST'},
    getAllComments:{url:'comments',method:'GET',params:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true},

}
