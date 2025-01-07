import React,{useState,useEffect} from 'react'
import './Verify.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let randomNum = 0;

function Home() {
    // alert()
    const navigate = useNavigate();

    const [good,setGood] = useState(false)
    const [code,setCode] = useState('')
    const [good1,setGood1] = useState(false)
    const [good12,setGood12] = useState(false)

    const handleChange = (e)=>{
        setCode(e.target.value);
    }
    const generateRandomNumber = () => {
        randomNum = Math.floor(Math.random()*1000000)
      };
    const location = useLocation();
    // console.log(location.state)
    const handleClick = async ()=>{
        setGood(false)
        setGood1(false)
        setGood12(false)
        generateRandomNumber()
              const response = await axios.post('http://localhost/api/code.php',  {
                code:randomNum,
                email:location.state.response.response1.email
              });
              // console.log(response)
              if(response.data===1){
                setGood(true)
              }

    }
    const handleClick2 = async ()=>{
              const responsee = await axios.post('http://localhost/api/activate.php',  {
                email:location.state.response.response1.email
              });
              // console.log(responsee)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setGood(false)
        setGood1(false)
        setGood12(false)

        if(code==""){
          setGood12(true)
          // setGood12(false)
          setGood1(false)
          setGood(true)
        }else{
          if(code==randomNum){
            handleClick2();
            navigate('/feed', { state: { email: location.state.response.response1.email } });
          }
          else{
              setGood1(true)
          }
        }
        
      };
    useEffect(() => {
        // Define an async function inside useEffect


        // console.log(112)

        const fetchData = async () => {
          // Generate random number
          generateRandomNumber();
    
          try {
            // Make the POST request
            const response = await axios.post('http://localhost/api/code.php', {
              code: randomNum,
              email: location.state.response.response1.email,
            });
    
            // Check response
            if (response.data === 1) {
              setGood(true);
            }
          } catch (error) {
            console.error('Error while making the request:', error);
          }
        };
    
        // Call the async function
        fetchData();
      }, []);
                  
      
      
  return (
    <div id="evr">
        <form id="from" action='' method="POST" onSubmit={handleSubmit}>
            <label style={{margin:'30px 20px',fontSize:'1.2em',fontWeight:'400'}}>Verify Your Email Id</label><br/>
            <span style={{margin:'20px 20px',fontSize:'1.3em',fontWeight:'400'}}>({location.state.response.response1.email})</span><br/><br/>
            <span style={{margin:'20px 20px',fontWeight:'400'}}>Enter 6 Digit Code Sended to You</span>
            <input value={code} onChange={handleChange} style={{width:'90%',margin:'10px 20px'}} type="text" placeholder='######' name='code'/><br/>
            {good && !good1 && !good12 && <span style={{margin:'20px 20px',fontSize:'1.1em',color:'green',fontWeight:'400'}}>Verification code sended !</span>}
            {good12 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(177, 7, 72)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>enter 6 digit code !</span>}
            {!good && !good1 && <div className="loader"></div>}
            {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>incorrect verifictaion code !</span>}
            <div style={{margin:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><input style={{padding:'5px 10px',backgroundColor:'#0b5ed7',color:'white',borderRadius:'5px'}} type="submit" value="Verify Email" name="sign"/><span onClick={handleClick} style={{textDecoration:'none',color:'rgb(74, 139, 252)',cursor:'pointer'}}>Resend Code</span></div>
            <Link style={{margin:'10px 20px'}} to="/"><i style={{marginRight:'5px'}} className="fa-solid fa-circle-arrow-left"></i>Logout</Link>
        </form>
    </div>
  )
}

export default Home