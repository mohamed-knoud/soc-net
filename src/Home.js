import React,{useState} from 'react'
import './Home.css'
import Logo from './logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
  localStorage.removeItem("email");
  axios.get("https://soc-net.info/api/show.php")
  .then(response => {
    // Handle the response
    console.log('Data:', response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error.message);
  });
  const [formData, setFormData] = useState({
      username:'',
      password:''
  });
    const navigate = useNavigate();
   const [good,setGood] = useState(false)
   const [good2,setGood2] = useState(false)
   const [gaga,setGaga] = useState(false)

  const handleChange1 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
     
  }
  const handleChange2 = (e)=>{
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
     
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGood(false)
    setGood2(false)
    setGaga(false)

    if(formData.username==''){
      setGood(true)
    }else{
      if(formData.password==''){
        setGood2(true)
      }else{
        try {
          // Send formData to PHP backend
          const response = await axios.post('https://soc-net.info/api/auth.php', formData);
          // console.log('Form data sent successfully:', response.data);
          if(response.data.response2 && response.data.response2.success===0)
            navigate('/verify', { state: { response: response.data, success: 1 } });
          else{
            if(response.data.response2 && response.data.response2.success===1){
              navigate('/feed', { state: { email:response.data.response1.email } });
            }
          }
          if(response.data.response1 &&  response.data.response1.error==0){
            setGaga(true)
          }
          // Optionally handle success response here
        } catch (error) {
          console.error('Error sending form data:', error);
          // Handle error state or show user a message
        }
      }
    }
    
  
  };
  return (
    <div id="evr">
        <form id="from" action='' method="POST" onSubmit={handleSubmit}>
            <div style={{margin:'15px 15px 0 15px',textAlign:'center'}}>
                <span id='log'>soc-net</span>
            </div>
            <label style={{margin:'10px 20px',fontSize:'1.2em',fontWeight:'400'}}>Please sign in</label><br/>
            <input onChange={handleChange1} value={formData.username} style={{width:'90%',margin:'10px 20px'}} type="text" placeholder='username/email' name='username'/><br/>
            {good && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username/email is not given</span>}
            <input onChange={handleChange2} value={formData.password} style={{width:'90%',margin:'10px 20px'}} type="password" placeholder='password' name='password'/>
            {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>password is not given</span>}
            {gaga && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>something is incorrect, we can't find you</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Sign in" name="sign"/><Link style={{textDecoration:'none'}} to='/signup'>Create New Account</Link></div>
            <Link to='/forgot' style={{margin:'10px 20px'}}>Forgot password?</Link>
        </form>
    </div>
  )
}

export default Home
