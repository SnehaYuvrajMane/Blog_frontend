import { useState, useContext} from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material';

import {API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import {useNavigate} from 'react-router-dom';



const Component=styled(Box)`
width:400px;

margin:auto;
box-shadow: 0px 0px 10px 0px #000000;   
`;

const Image= styled('img')(
    {
        width:'100px',
        margin:'auto',
        display:'flex',
        padding:'50px 0 0'
    }
);

const Wrapper=styled(Box)`

padding:20px 30px;
display:flex;
flex:1;
flex-direction:column;
& > div ,& > button,&>p{
    margin:20px 0;
}

`;
const LoginButton=styled(Button)`
 text-transform:none;
 background:#F86418;
 color:#fff;    
 border-radius:5px;
`;
const SignUpButton=styled(Button)`
text-transform:none;
 background:#fff;
 color:#2874f0;    
 border-radius:5px;
 box-shadow: 0px 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text=styled(Typography)`
 color:#878787;
 font-size:16px;

`;

const Error=styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;


`

const loginInitialValues={
    username:'',
    password:''
}
const signUpIntialValues={

    name:'',
    username:'',
    password:''
}

const Login = ({isUserAuthenticated}) => {

    const [account, toggleAccount]=useState('login');
 
    const [signup, setSignUp]=useState(signUpIntialValues);
    const [login,setLogin]=useState(loginInitialValues);
    const [error,setError] =useState('');
    const {setAccount}=useContext(DataContext);

    const navigate =useNavigate();

    const toggleSignUp=()=>{
       account==='login'? toggleAccount('signup'):toggleAccount('login');

    }
    const onInputChange=(e)=>{
        // console.log(e.target.name,e.target.value);
       setSignUp({ ...signup, [e.target.name]:e.target.value});

    }

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
  
    const signupUser=async ()=>{
     let response = await API.userSignup(signup);
    //  console.log(response);
     if(response.isSuccess){
        setError('');
        setSignUp(signUpIntialValues);
        toggleAccount('login')
     }
     else{
    setError('Something went Wrong! please try again later');

     }

        
    }
    const onvalueChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value});

    }

    const loginUser =async ()=>{
        try{
            let response=await  API.userLogin(login);
      
            if(response.isSuccess)
            {
                 setError('');
              //    sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
              //    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
               
                 setAccount({username:response.data.username,name:response.data.name})
                 sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
                 isUserAuthenticated(true);
                 navigate('/');
      
      
              } else{
              setError("something went Wrong! please try again later")
            }
        }
        catch(error){
            setError("something went Wrong! please try again later")

        }
      
      
    }



 return (
    <Component>
    <Box>
    <Image src={imageURL} alt="logo" />
   
   {
    account=== 'login' ?

    <Wrapper>
    <TextField  variant="standard" value={login.username}  onChange={(e)=>onvalueChange(e)} name='username' label= "Enter Username"/>   
    <TextField  variant="standard" value={login.password}  onChange={(e)=>onvalueChange(e)}  name='password' type="password"  label="Enter Password"/>  
    
    {error && <Error>{error}</Error>}
    <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
<Text style={{textAlign:'center'}}>OR</Text>
    <SignUpButton onClick={()=>toggleSignUp()}>Create An Account</SignUpButton>
    </Wrapper>
    :

    <Wrapper>
    <TextField  variant="standard" name='name' onChange={(e)=>onInputChange(e)} label= "Enter Name"/>   
    <TextField  variant="standard" name='username' onChange={(e)=>onInputChange(e)} label="Enter Username"/>  
    <TextField  variant="standard"   type="password" name='password' onChange={(e)=>onInputChange(e)} label="Enter Password"/> 
    
    {error && <Error>{error}</Error>}
    <SignUpButton onClick={()=>signupUser()}>Sign Up</SignUpButton>
<Text style={{textAlign:'center'}}>OR</Text>
    <LoginButton variant="contained" onClick={()=>toggleSignUp()}>Already have An Account?</LoginButton>
    </Wrapper>
   }
   
    </Box>
   
    
    </Component>


    )

}
export default Login;