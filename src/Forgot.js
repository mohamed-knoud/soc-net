import React from 'react'
import './Forgot.css'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
let randomNum = 0;

function Home() {
    const [good1,setGood1] = useState(false)
    const [good2,setGood2] = useState(false)
    const [good3,setGood3] = useState(false)

    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    const generateRandomNumber = () => {
      randomNum = Math.floor(Math.random()*1000000)
    };
    const handleSubmit = async (e) => {
      setGood1(false)
      setGood2(false)

      e.preventDefault();
        if(email===''){
          setGood1(true)
        }else{

          try {
            const response = await axios.post('https://soc-net.info/api/auth2.php',{
              email: email,  // Example data to send
            });
            // console.log('Form data sent successfully:', response.data);
            if(response.data.success==0){
              setGood2(true)
            }else{
              setGood2(false)
              
            generateRandomNumber()
            setGood3(true)

            const response = await axios.post('https://soc-net.info/api/code2.php',  {
              code:randomNum,
              email: email,  // Example data to send
            });
            // console.log(response.data)
            

  
              navigate('/code', { state: { code : randomNum, response: email } });
            }
          } catch (error) {
            console.error('Error sending form data:', error);
          }
        }
      }
      const handleChange = (e)=>{
        setEmail(e.target.value)
      }
  return (
    <div id="evr">
        <form id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Forgot Your Password ?</label><br/>
            <input value={email} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="email" placeholder='enter your email' name='email'/><br/>
            {good3 && <div className="loader2"></div>}

            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter your email id !</span>}
            {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>email id is not registered</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Send Verification Code " name="sign"/></div>
            <Link to='/' style={{margin:'10px 20px'}} href=""><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Go Back To Login</Link>
        </form>
    </div>
  )
}

export default Home
