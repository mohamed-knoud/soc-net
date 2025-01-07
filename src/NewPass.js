import React,{useState} from 'react'
import './NewPass.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [good1,setGood1] = useState(false)
  const [pass,setPass] = useState('')
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setPass(e.target.value)
  }
  const location = useLocation();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setGood1(false)
    if(pass==''){
      setGood1(true)
    }else{
      try {
        const response = await axios.post('https://soc-net.info/api//updatePass.php',{
          email: location.state.response,
          password: pass// Example data to send
        });
        // console.log('Form data sent successfully:', response.data);
        
        navigate('/');
        }
        catch (error) {
          console.error('Error sending form data:', error);
        }
      } 
    }
  
  return (
    <div id="evr">
        <form id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{display:'inline-block',margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Forgot Your Password ?</label><br/>
            <span style={{margin:'20px 20px',fontWeight:'400'}}>Enter your new password - {location.state.response}</span>
            <input value={pass} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="password" placeholder='new password' name='code'/><br/>
            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter your new password</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Change Password" name="sign"/></div>
            <Link to='/' style={{margin:'10px 20px'}} href=""><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Go Back To Login</Link>
        </form>
    </div>
  )
}

export default Home
