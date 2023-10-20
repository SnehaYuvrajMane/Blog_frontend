import { useState,useEffect,useContext } from 'react';
import {Box,styled,FormControl,InputBase,Button, TextareaAutosize} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation,useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import {API} from '../../service/api.js';



const Container=styled(Box)(({theme})=> ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
      margin:0
    }
    
  }));
const Image=styled('img')(
    {
        width:'100%',
        height:'50vh',
        objectFit:'cover'

    }
);

const StyledFormControl=styled(FormControl)`

margin-top:10px;
display:flex;
flex-direction:row;


`;
const InputTextField =styled(InputBase)`

flex:1;
margin:0 30px;
font-size:25px;

`;
const TextArea=styled(TextareaAutosize)`

width:100%;
margin-top:50px;
font-size:18px;
border:none;
&:focus{
    outline:none;
}



`;

const intialPost={
    title:"",
    description:"",
    picture:"",
    username:"",
    categories:"",
    createdDate:new Date()

}



const CreatePost=()=>{
    
    

const [post,setPost]=useState(intialPost);

const[ file,setFile]=useState(null);

const account=useContext(DataContext);
const location =useLocation();
const navigate=useNavigate();
const url=post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

useEffect(()=>{
    console.log("account",account);
    const getImage= async ()=>{
        
      
        if(file){
            const data = new FormData();
          
            data.append('name',file.name);
            data.append('file',file);
          
            // console.log("data file is ",data.get('file'));
        const response  = await API.uploadFile(data);
         post.picture=response.data.imageUrl;
        }
     }


    getImage();


    post.categories=location.search?.split("=")[1]||'All';
    post.username=account.account.username;
},[file])

const handleChange=(e)=>{

    setPost({...post,[e.target.name]:e.target.value})
}
const savePost=async()=>{

   let response=await API.createPost(post);

   if(response.isSuccess)
   {
    navigate('/');
   }
}

    return(
        <>
      <Container>
            <Image src={url} alt='Banner' />
            <StyledFormControl>
            <label htmlFor='fileInput'>

            <AddCircleIcon  fontSize='large' color='action'/>
            </label>
            <input type='file'
                id='fileInput'
                style={{display:'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
            />
            <InputTextField placeholder='Title' onChange={(e)=>handleChange(e)} name='title'/> 
            <Button variant='contained' onClick={()=>savePost()}>Publish</Button>


            </StyledFormControl>     
            <TextArea
                minrows={5}
                placeholder='Tell Your Story...'
                onChange={(e)=>handleChange(e)}
                name='description'
                />
     
            
            
            </Container>
        </>
    )
}

export default CreatePost;