
import {Box,Typography,styled} from "@mui/material";


const Image =styled(Box)`
 
 background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000 ;
 width:100%;
 height:50vh;
 display:flex;
 align-items:center;
 flex-direction:column;
 justify-content:center;


`;
const Heading =styled(Typography)`

font-size:70px;
${'' /* color:#ffffff; */}
color:#f8f8ff ;
line-height:1;

 `;
 const SubHeading=styled(Typography)`
 
    font-size:25px;
    color:blue;
    background:#ffffff;
    border-radius:10px;
    


 
 `

const Banner =()=>{

    return(

    <Image>
        <Heading>BLOG</Heading>
        <SubHeading>Create Your Own Beautiful Blog</SubHeading>
        
    </Image>


    )
}
export default Banner;