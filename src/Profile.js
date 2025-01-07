import React,{useState, useEffect, useRef  } from 'react'
import './Profile.css'
import Logo from './logo.png'
import { Link , useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
let res 
let rs = null
let newMessagess = null
let loader2 = true 
// let noImage = 1
function Profile() {
  const location = useLocation();
  let username = ''
   const [loader, setLoader] = useState(true);
  // const [noImage,setNoImage] = useState(false)

  const searchParams = new URLSearchParams(location.search);

  username =  searchParams.get('username'); // Get the 'myParam' query parameter

     const [file, setFile] = useState(null);
 
    const closeBtnSidenave1 = useRef(null);
    const form = useRef(null);
    const po = useRef(null);
    const addNewPost = async (e)=>{
      e.preventDefault()
      let dataa
      if(file===null){
        window.location.href='/feed?p=0';
        closePost()
      }else{
        if(content!==''){
          dataa = { image:file,content:content,id:res.data.response.id}; 
      }
        else{
          dataa = { image:file,id:res.data.response.id}; 
        }
  
        try {
          const responses = await axios.post('http://localhost/api/addNewPost.php', dataa, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(responses.data.success)
          {
              window.location.href='/feed';
          }  
      } catch (error) {
        console.error('Error:', error);
      }
      }
    }

    const closeBtnSidenave2 = useRef(null);
  // let { username } = useParams();
  //console.log(username)
  const follow = async (e,id) => {
    //console.log(id)

    let data
    if(id){
    data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.id }; 
    }
    try {
      await axios.post('http://localhost/api/follow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds)
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Followed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
      // console.log(rds)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const addMsg = async (e) => {
    e.preventDefault()
    let data

    data = { id_exp:res.data.response.id,id_dest:rs.data.response.id,content:content }; 
    // data = {a:1,b:2}

    try {
      const resultat = await axios.post('http://localhost/api/add_msg.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContent("")
      // console.log(resultat)
      // msg.current.scrollTop = msg.current.scrollHeight;
      // console.log(msg.current)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  // const pop = ()=>{
  //   console.log(1)
  // }
  const block = async () => {
    const data = { id_blocked:res.data.response.id,id_blocker:rs.data.response.id }; 
    // console.log(data)
    try {
      await axios.post('http://localhost/api/block.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds)
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unblock = async () => {
    const data = { id_unblocked:res.data.response.id,id_unblocker:rs.data.response.id }; 
    // console.log(data)
    try {
      await axios.post('http://localhost/api/unblock.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds.data)
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unfollow = async (e,id) => {
    //console.log(id)
    let data
    if(id){
     data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.response.id }; 
    }
    try {
      await axios.post('http://localhost/api/unfollow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds.data)
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Unfollowed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
      // console.log(rds)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
    

        const search = useRef(null);
        const msg = useRef(null);

        const dro = useRef(null);
        const dr = useRef(null);
        const [content, setContent] = useState("");
        const [newMessages, setNewMessages] = useState(null);

        const handleContentChange = (e)=>{
          setContent(e.target.value)
        }
        const [user, setUser] = useState("");
        const [followers, setFollowers] = useState(false);
        const [followers2, setFollowers2] = useState(false);

        // const [followerss, setFollowerss] = useState(false);

        const [following, setFollowing] = useState(false);
        const [following2, setFollowing2] = useState(false);



        const [usrs,setUsrs] = useState([])
        const [drop,setDrop] = useState(false)
        const handle = async (e)=>{
          setUser(e.target.value)
          const data = { input: e.target.value }; 
      
            try {
              const ras = await axios.post('http://localhost/api/searchUser.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
             setUsrs(ras.data)
            } catch (error) {
              console.error('Error:', error);
            }
          }
    // const [file, setFile] = useState(null);
    // const [file2, setFile2] = useState(null);
    const [good3, setGood3] = useState(false);
    const [good4, setGood4] = useState(false);
    const [users,setUsers] = useState(null)
    const [good1, setGood1] = useState(false);
    const [good2, setGood2] = useState(false);
    const [good33, setGood33] = useState(false);
    const [profile,setProfile] = useState(true)
    const [profile2,setProfile2] = useState(false)

    // const [visible,setVisible] = useState(true)
    const [edit,setEditTrue] = useState(false)
    const [edt,setEdtTrue] = useState(true)

    // const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        gender:'',
        e_mail:'',
        username:'',
        password:'',
        image:null
      });
      const [formDataa, setFormDataa] = useState({
        firstNamea: '',
        lastNamea:'',
        gendera:'',
        e_maila:'',
        usernamea:'',
        passworda:'',
        imagea:null
      });

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
      const handleChange3 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange4 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange5 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
      }
      const handleChange6 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        
      }
    const getUserData = async (username) => {
  
      const data = { input: username }; 
      try {
        rs = await axios.post('http://localhost/api/getUserData.php', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        setFormData(prevState => ({
          ...prevState,
          older: rs.data.image
        }));
        rs.data.followers.map(async (follower)=>{
          let sa = 0
          const da = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sa = await axios.post('http://localhost/api/checkFollow.php', da, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // console.log(s.data)
          } catch (error) {
            console.error('Error:', error);
          }
      // console.log(sa)
      follower.ok = sa.data
        })

        rs.data.following.map(async (follower)=>{
          let sad = 0
          const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sad = await axios.post('http://localhost/api/checkFollow.php', dad, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // console.log(s.data)
          } catch (error) {
            console.error('Error:', error);
          }
      // console.log(sa)
      follower.ok = sad.data
        })
        
        if(rs.data.response.image){
          setGood4(true)
          setImage2(false)
        }
        // console.log(rs)
        setFormData(prevState => ({
          ...prevState,
          e_mail: rs.data.response.email,
          firstName: rs.data.response.first_name,
          gender: rs.data.response.gender,
          lastName: rs.data.response.last_name,
          username: rs.data.response.username,
          id:rs.data.response.id,
          image:rs.data.response.image
        }));
      } catch (error) {
        console.error('Error:', error);
      }
     
    };
    const getUserDataa = async (username) => {
  
        const data = { email: localStorage.getItem("email") , input: username }; 
        try {
          res = await axios.post('http://localhost/api/getUserData.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(res)
          setFormDataa(prevState => ({
            ...prevState,
            older: res.data.response.image
          }));
          res.data.followers.map(async (follower)=>{
            let sa = 0
            const da = { email: localStorage.getItem("email") ,id:follower.id }; 
            try {
              sa = await axios.post('http://localhost/api/checkFollow.php', da, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              // console.log(s.data)
            } catch (error) {
              console.error('Error:', error);
            }
        // console.log(sa)
        follower.ok = sa.data
          })

          res.data.following.map(async (follower)=>{
            let sad = 0
            const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
            try {
              sad = await axios.post('http://localhost/api/checkFollow.php', dad, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              // console.log(s.data)
            } catch (error) {
              console.error('Error:', error);
            }
        // console.log(sa)
        follower.ok = sad.data
          })
          
          // for (let follower in ) {
              
          
          if(res.data.image){
            setGood4(true)
            setImage2(false)
          }
          
          setFormDataa(prevState => ({
            ...prevState,
            e_maila: res.data.response.email,
            firstNamea: res.data.response.first_name,
            gendera: res.data.response.gender,
            lastNamea: res.data.response.last_name,
            usernamea: res.data.response.username,
            ida:res.data.response.id,
            imagea:res.data.response.image
          }));
        } catch (error) {
          console.error('Error:', error);
        }
       
      };
    
    const [style1,setStyle1] = useState(null)
    const [style2,setStyle2] = useState(null)
    const [visibleOverlay,setVisibleOverlay] = useState(false)
    const sidenave1 = useRef(null);
    const upsd = useRef(null);

    const sidenave2 = useRef(null);
    const popup=useRef(null)
    const ups=useRef(null)
    const upps=useRef(null)
    const op=useRef(null)

    const popup2=useRef(null)
    const popup23=useRef(null)
    const popup234=useRef(null)
    const popup2342=useRef(null)

    const popup2345=useRef(null)

    const popup2344=useRef(null)
    const popup23442=useRef(null)




    const popup4=useRef(null)
    const popup90=useRef(null)


    const log=useRef(null)
    
    if(location.state)
      localStorage.setItem("email", location.state.email);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result); 
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const handleFileChange2 = (event) => {
      setProfile(true)
      // setFile2(event.target.files[0]);
      const file2 = event.target.files[0];
      setFormData(prevState => ({
        ...prevState,
        image: file2
      }));
      if (file2 && file2.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage2(e.target.result); 
        };
        reader.readAsDataURL(file2);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const [vis,setVis] = useState(false)
    const [viss,setViss] = useState(false)

    const opened = {
        width: '350px',
        opacity: '1',
        position:'absolute',
        zIndex:'100',

      };
      const closed = {
        width: '0px',
        opacity: '1',
        
        position:'absolute',
        zIndex:'100',

      };
      // const over = {
      //   height: '100%',
      //   width: '100%',
      //   position: 'fixed',
      //   zIndex:'15',
      //   top: '0',
      //   left: '0',
      //   backgroundColor: 'rgb(0,0,0)',
      //   backgroundColor: 'rgba(0,0,0, 0.5)',
      // }
    // const show = ()=>{

    //     setVisible(!visible)
       
    // }
   
    const closeNav1 = ()=>{
        setStyle1(closed)
        setStyle2(closed)
        setVisibleOverlay(false)


    }
    const closeNav2 = ()=>{
        setStyle2(closed)
        setStyle1(closed)
        setVisibleOverlay(false)
        // console.log(22)
    }
    const openNav1 = ()=>{
        setStyle1(opened)
        setStyle2(closed)
        setVisibleOverlay(true)


    }
    const openPost = ()=>{
      setVis(!vis)
      setVisibleOverlay(true)
     }
     const openPost2 = ()=>{
      loader2 = true
      setViss(!viss)
      setVisibleOverlay(true)
      if(newMessagess && newMessagess.data.length!==0)
        window.location.href = `#${newMessagess.data[newMessagess.data.length-1].id}`

     }
     const openFollowers = ()=>{
      setFollowers(!followers)
      setVisibleOverlay(true)
     }
     const openFollowers2 = ()=>{
      setFollowers2(!followers2)
      setVisibleOverlay(true)
     }
     const openFollowing = ()=>{
      setFollowing(!following)
      setVisibleOverlay(true)
     }
     const openFollowing2 = ()=>{
      setFollowing2(!following2)
      setVisibleOverlay(true)
     }
     const closePost = ()=>{
      // setVis(!vis)
      setVisibleOverlay(false)
      popup2.current.style.animation = 'fadeOut 0.2s ease'
      // setViss(!viss)
      // alert(popup23.current.style.animation)
      popup2.current.addEventListener('animationend', () => {
        popup2.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setVis(!vis)
      });
     }  
     const closePost2 = ()=>{
      setLoader(true)
      loader2 = true
      setVisibleOverlay(false)
      popup23.current.style.animation = 'fadeOut 0.2s ease'
      // alert(popup23.current.style.animation)
      popup23.current.addEventListener('animationend', () => {
        popup23.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setViss(!viss)
      });
     }

     const closePost23 = ()=>{
      setVisibleOverlay(false)
      popup234.current.style.animation = 'fadeOut 0.2s ease'
      popup234.current.addEventListener('animationend', () => {
        popup234.current.style.display = 'none'; 
        setFollowers(!followers)
      });
     }

     const closePost232 = ()=>{
      setVisibleOverlay(false)
      popup2342.current.style.animation = 'fadeOut 0.2s ease'
      popup2342.current.addEventListener('animationend', () => {
        popup2342.current.style.display = 'none'; 
        setFollowers2(false)
      });
     }

     const closePost234 = ()=>{
      setVisibleOverlay(false)

      popup2344.current.style.animation = 'fadeOut 0.2s ease'
      // alert(popup23.current.style.animation)
      popup2344.current.addEventListener('animationend', () => {
        popup2344.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setFollowing(!following)
      });
     }
     const closePost2342 = ()=>{
      setVisibleOverlay(false)
      popup23442.current.style.animation = 'fadeOut 0.2s ease'
      // alert(popup23.current.style.animation)
      popup23442.current.addEventListener('animationend', () => {
        popup23442.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setFollowing2(false)
      });
     }
    //  const closePost2349 = ()=>{
    //   setVisibleOverlay(false)
    //   popup2345.current.style.animation = 'fadeOut 0.2s ease'
    //   // alert(popup23.current.style.animation)
    //   popup2345.current.addEventListener('animationend', () => {
    //     popup2345.current.style.display = 'none'; // Remove the element from the layout after the animation ends
    //     setFollowerss(!followerss)
    //   });
    //  }
     
    const openNav2 = ()=>{
        setStyle2(opened)
        setStyle1(closed)
        setVisibleOverlay(true)

    }
    const handleUpdate = async () => {
      
      setGood1(false)
      setGood2(false)
      setGood33(false)

     if(formData.firstName===''){
        setGood1(true)
        getUserData(localStorage.getItem("email"))

      }else if(formData.lastName===''){
          setGood2(true)
          getUserData(localStorage.getItem("email"))

        }else if(formData.username===""){
            setGood33(true)
            getUserData(localStorage.getItem("email"))

          }else{
      try {
        const response = await axios.post('http://localhost/api/updateProfile.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          // console.log(response.data)
          setGood3(true)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
     }
     

    
    };
    
    useEffect(() => {
   
      (async () => {
        // e.preventDefault();
    
        const email = { email: localStorage.getItem("email") }; // Example data to send to PHP script
        try {
          const rsa = await axios.post('http://localhost/api/getUsers.php', email, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
         setUsers(rsa.data)
        } catch (error) {
          console.error('Error:', error);
        }
       
      })();

      const handleClickOutside = (event) => {
        // console.log(event.target)
        if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
          closeNav2()
        }

        if(closeBtnSidenave1.current.contains(event.target) && sidenave1.current){
          setVisibleOverlay(false)
        }
        if(closeBtnSidenave2.current.contains(event.target) && sidenave2.current){
          setVisibleOverlay(false)
        }

        // if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
        //   setVisibleOverlay(true)
        //   setStyle1(opened)
        //   setStyle2(closed)
        // }
        // if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
        //   setVisibleOverlay(true)
        //   setStyle1(closed)
        //   setStyle2(opened)
        // }
       
        if(dr.current && !dr.current.contains(event.target) && dro.current && !dro.current.contains(event.target)){
          setDrop(false)
        }
        
          if(popup2.current && popup2.current.contains(event.target)){
            setVisibleOverlay(true);  // Hide the div
          }
          // Check if the click was outside the div
          if (sidenave1.current && !sidenave1.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}  // Hide the div
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            // else
            //   setVisibleOverlay(false);  // Hide the div
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {loader2=true;setLoader(true);upsd.current.style.display='none'}
          if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'


          
          
          if(popup90.current && popup90.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'

          if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {loader2=true;setLoader(true);upsd.current.style.display='none';}
          if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'
        }
          if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            // else
            //   setVisibleOverlay(false);  // Hide the div
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
        }
        if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
          if(popup23.current && popup23.current.contains(event.target))
            {setVisibleOverlay(true);}  // Hide the div
          if(popup234.current && popup234.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2344.current && popup2344.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2342.current && popup2342.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup23442.current && popup23442.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2345.current && popup2345.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          // else
          //   setVisibleOverlay(false);  // Hide the div
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {loader2=true;setLoader(true);upsd.current.style.display='none';}
        if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'

        if(popup90.current && popup90.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {loader2=true;setLoader(true);upsd.current.style.display='none';}
        if(popup90.current && popup90.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup90.current && popup90.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        
        
        
        if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {loader2=true;setLoader(true);upsd.current.style.display='none';}
        if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'
      }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true);
            else
              setVisibleOverlay(false); 
              setStyle1(closed)
              setStyle2(closed)
          
          }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);
            // else
            //   setVisibleOverlay(false); 
              setStyle1(closed)
              setStyle2(closed)
        
          }
          if(popup4.current && popup4.current!==event.target && event.target===op.current){
            setProfile(true)
            setEditTrue(false)
            setEdtTrue(false)
            upsd.current.style.display='none'
          }
          if(popup90.current && popup90.current!==event.target && event.target===op.current){
            setProfile(true)
            setEditTrue(false)
            setEdtTrue(false)
            upsd.current.style.display='none'
          }
          if(popup.current && popup.current!==event.target && event.target===op.current){
            setProfile(true)
            setEditTrue(false)
            setEdtTrue(false)
            upsd.current.style.display='none'
          }
          if (popup2.current && !popup2.current.contains(event.target)) {
            popup2.current.style.animation = 'fadeOut 0.2s ease'
            popup2.current.addEventListener('animationend', () => {
              popup2.current.style.display = 'none';
              setVis(false)
            });
          }
          if (popup23.current && !popup23.current.contains(event.target)) {
            loader2=true;
            setLoader(true)
            popup23.current.style.animation = 'fadeOut 0.2s ease'
            popup23.current.addEventListener('animationend', () => {
              popup23.current.style.display = 'none';
              setViss(false)
            });
          }
          if (popup234.current && !popup234.current.contains(event.target)) {
            popup234.current.style.animation = 'fadeOut 0.2s ease'
            popup234.current.addEventListener('animationend', () => {
              popup234.current.style.display = 'none';
              setFollowers(false)
            });
          }
          if (popup2344.current && !popup2344.current.contains(event.target)) {
            popup2344.current.style.animation = 'fadeOut 0.2s ease'
            popup2344.current.addEventListener('animationend', () => {
              popup2344.current.style.display = 'none';
              setFollowing(false)
            });
          }
          if (popup2342.current && !popup2342.current.contains(event.target)) {
            popup2342.current.style.animation = 'fadeOut 0.2s ease'
            popup2342.current.addEventListener('animationend', () => {
              popup2342.current.style.display = 'none';
              setFollowers2(false)
            });
          }
          if (popup23442.current && !popup23442.current.contains(event.target)) {
            popup23442.current.style.animation = 'fadeOut 0.2s ease'
            popup23442.current.addEventListener('animationend', () => {
              popup23442.current.style.display = 'none';
              setFollowing2(false)
            });
          }
          if (popup2345.current && !popup2345.current.contains(event.target)) {
            popup2345.current.style.animation = 'fadeOut 0.2s ease'
            popup2345.current.addEventListener('animationend', () => {
              popup2345.current.style.display = 'none';
              // setFollowerss(false)
            });
          }
          if((popup90.current && popup90.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup90.current && event.target!==popup90.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(false)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup90.current && popup90.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(true)
                  setProfile(false)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup90.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }

          if((popup4.current && popup4.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup4.current && event.target!==popup4.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(false)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup4.current && popup4.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(true)
                  setProfile(false)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup4.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }
          if((popup.current && popup.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup.current && event.target!==popup.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(false)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup.current && popup.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(true)
                  setProfile(false)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }
        };
  
      document.addEventListener('mousedown', handleClickOutside);
      
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);

      };
    }, []);
    const observer = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach(mutation => {
          // console.log(mutation);
          // Example: log specific details
          // console.log(newMessagess)
          if (mutation.type === 'childList') {
            
            if(newMessagess && newMessagess.data.length!==0)
              {
                window.location.href = `#${newMessagess.data[newMessagess.data.length-1].id}`
              }
          } else if (mutation.type === 'attributes') {
              console.log('Attributes changed');
          } else if (mutation.type === 'characterData') {
              console.log('Text content changed');
          }
      });
  });

  const config = {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
  };
    useEffect(() => {
      // console.log(res,rs,nbr)
      let data
      let checkNewMessages = null
      if(res && rs){

      data = { id_exp:res.data.response.id,id_dest:rs.data.response.id}; 
      checkNewMessages = setInterval(async () => {
        if (loader2 && viss && msg.current) {
          if(newMessagess && newMessagess.data.length!==0)
            {
              // console.log(111)
              window.location.href = `#${newMessagess.data[newMessagess.data.length-1].id}`
              loader2=false;
            }
        }
        if (msg.current) {
          observer.observe(msg.current, config)
        }
        try {
          newMessagess = await axios.post('http://localhost/api/checkNewMessages.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setNewMessages(newMessagess)
          if(newMessagess.data.length===0){
            loader2 = false
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }, 1000);
    }
      // Cleanup function to clear the interval when the component unmounts or when dependencies change
      return () => clearInterval(checkNewMessages);
    }, [username,rs,viss]); // Empty dependency array means this effect runs only once when the component mounts
  
    useEffect(() => {
      // if(username!=null){
      //   console.log(username)
      // }else{
      //   console.log(username)
      // }
      // if (msg.current) {
      //   // msg.current.scrollTop = msg.current.scrollHeight;
      // }
      
      // username =  searchParams.get('username'); // Get the 'myParam' query parameter
      // console.log(username)

      getUserData(localStorage.getItem("email"))
      setFollowers(false)
      setFollowing(false)
      setVisibleOverlay(false)
      getUserDataa(username)

      if(sessionStorage.getItem('flag')==0){
        sessionStorage.setItem('flag', 1);
        // window.location.reload()
      }else{
        sessionStorage.setItem('flag', 0);
        window.location.reload()
      }
    
    }, [username]);
    
  return (
    <>
    {visibleOverlay && <div className="overlay"></div>}
    <header id="section1">
        <div><Link to="/feed"><img id="logo" src={Logo} alt="logo"/></Link></div>
        <div id="second">
        <div className="dropdown">
                  <input value={user} onChange={handle} onClick={()=>{search.current.style.display='block'}} type="text" placeholder='looking for someone...'/>
                  <div id="myDropdown" ref={search} className="dropdown-contentt">
                  <div style={{textAlign:'right',marginRight:'10px',marginTop:'10px'}}><i onClick={()=>{search.current.style.display='none'}} id="close"  className="fa-solid fa-x"></i></div>
        
                  {user==="" && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>Enter name or username</span>} 
          {user!=="" && usrs.length===0 && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>no user found !</span>} 
           {user!=="" && usrs.length>0 && <div style={{width:'100%',marginTop:'5px'}}>
            
            {usrs.map((item, index) => {
              return (
                  <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
                    <div style={{display:'flex'}}>
                      {item.image!==null && <img 
                          src={`http://localhost/${item.image}`} 
                          alt="Preview" 
                          style={{
                              marginLeft: '1px',
                              marginBottom: '6px',
                              maxWidth: '100%',
                              marginRight: '15px',
                              height: '40px',
                              width: '40px',
                              verticalAlign: 'middle',
                              borderRadius: '50%',
                              cursor:'initial'
                          }} 
                      />}
                      {item.image===null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
                      <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
                      <Link style={{color:"black"}} onClick={()=>{setProfile(true);setProfile2(false);setEditTrue(false);search.current.style.display='none'}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500',fontSize:'0.8em'}}>{item.first_name} {item.last_name}</span></Link>
                      <span style={{cursor:'initial',color:'rgba(0,0,0,0.5'}}>@{item.username}</span>
          
                    </div>
                    </div>
                    
                  </div>
              ); })}
  
              </div>}
            </div>
          </div>
        <nav>
            <Link to='/feed'><i className="fa-solid fa-house"></i></Link>
            <i onClick={openPost} className="fa-solid fa-circle-plus"></i>
            <i onClick={openNav1} className="fa-solid fa-bell"></i>
            <i onClick={openNav2} className="fa-solid fa-message"></i>
            <div className="dropdown">
            {!image2 && formData.image && <img ref={popup4}
            src={`http://localhost/uploads/${formData.image}`} 
            alt="Preview" 
            style={{ marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
          />}

            {image2 && <img 
              src={image2} 
              ref={popup90}
              alt="Preview" 
              style={{marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
            />}
          
                {!formData.image && <i ref={popup} id="profile" className="dropbtn fa-solid fa-user"></i>}
                {true && <div ref={upsd} style={{display:'none'}} className="dropdown-content">
                    <div ref={upps} onClick={() => {setProfile2(true);setEdtTrue(false)}}><i className="fa-solid fa-address-book"></i>My Profile</div>               
                    <div ref={ups}  onClick={() => {setProfile2(false);setEditTrue(!edit)}}><i className="fa-solid fa-pen-to-square"></i>Edit Profile</div>
                    <hr/>
                    <Link ref={log} style={{color:'black'}} to='/'><div><i className="fa-solid fa-right-from-bracket"></i>Logout</div></Link>
                </div>}
            </div>

        </nav>
        </div>
    </header>
    <div ref={sidenave1} style={style1} className="sidenav">
    <a ref={closeBtnSidenave1} className="closebtn" onClick={closeNav1}>&times;</a>
    <h1>Notifications</h1>
  </div>
  <div ref={sidenave2} style={style2} className="sidenav">
    <a ref={closeBtnSidenave2} className="closebtn" onClick={closeNav2}>&times;</a>
    <h1>Messages</h1>
  </div>
  {edit && <div id="edit">

      <p style={{padding:'10px 20px',fontSize:'1.3em',fontWeight:'400'}}>Edit Profile</p>
      {good3 && <span style={{margin:'10px 20px',color:'green'}}>Profile is updated !</span>}<br/>
      {!good4 && !image2 && <i ref={popup} style={{display:'inline-block',margin:'10px 20px'}} id="profile2" className="dropbtn fa-solid fa-user"></i>}
      {image2 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img 
            src={image2} 
            alt="Previewa" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      {!image2 && good4 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img 
            src={`http://localhost/${formData.image}`} 
            alt="Previeww" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      <p style={{padding:'10px 20px',fontSize:'1.1em',fontWeight:'400'}}>Change Profile Picture</p>

      <input accept="image/*"
        onChange={handleFileChange2} id="put" style={{height:'auto',width:'40%',border:'1px solid #ced4da',fontSize:'1.2em',padding:'5px',margin:'0px 20px',marginBottom:'10px'}} type="file"/><br/>

      <input value={formData.firstName} onChange={handleChange1} placeholder='first name' style={{margin:'15px 10px 0px 20px',height:'50px',width:'45%'}} type="text" name="firstName"/>
      
      <input value={formData.lastName} onChange={handleChange2} type="text" placeholder='last name' style={{width:'45%',height:'50px',margin:'15px 0px 0px 0px'}} name="lastName"/>
      {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>first name is not given</span>}
      {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>last name is not given</span>}<br/>
<div id="dio" style={{margin:'0px 10px 0px 20px',display:'flex',alignItems:'center'}}>
      <input checked={formData.gender === 'male'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="male" value='male' name="gender"/><label style={{marginRight:'10px'}} htmlFor='male'>Male</label>
            <input checked={formData.gender === 'female'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="female" value='female' name="gender"/><label htmlFor='female' style={{marginRight:'10px'}}>Female</label>
            <input checked={formData.gender === 'other'} onChange={handleChange6} disabled type="radio" id="other" value='other' name="gender" style={{marginRight:'10px'}}/><label htmlFor='other' style={{marginRight:'10px'}}>Other</label>
            </div>
            <input value={formData.e_mail} disabled onChange={handleChange3} placeholder='email' style={{margin:'0px 10px 0px 20px',height:'50px',width:'90%'}} type="email" name="e_mail"/>
            <input value={formData.username} onChange={handleChange4} placeholder='username' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="text" name="username"/>
            {good33 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username is not given</span>}
            <input value={formData.password} onChange={handleChange5} placeholder='new password' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="password" name="password"/>
            <a href='#section1'><button onClick={handleUpdate} style={{padding:'7px',fontSize:'1.1em',outine:'none',border:'none',borderRadius:'5px',margin:'20px 10px 0px 20px',color:'white',backgroundColor:'#0b5ed7'}}>Update Profile</button></a>
</div>}
  {vis && <div className='all'>
  <div ref={popup2} className="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Add New Post</h3>
      <i id="close" onClick={closePost} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <form action='' onSubmit={addNewPost} method="post">
    {image && (
        <div>
          <img 
            src={image} 
            alt="Preview" 
            style={{ maxWidth: '100%', height: 'auto',width:'100%'}} 
          />
        </div>
      )}
      <input accept="image/*" 
        onChange={handleFileChange} id="put" style={{height:'auto',width:'100%',border:'1px solid #ced4da',fontSize:'1.2em',padding:'5px',marginBottom:'10px'}} type="file"/><br/>
      <label htmlFor="say">Say Something</label><br/>
      <input style={{height:'35px',padding:'5px',width:'100%',marginTop:'10px',marginBottom:'10px'}} type="text" name="say" id="say"/><br/>
      <input type="submit" value="Post" style={{padding:'10px',color:'white',backgroundColor:'#0b5ed7'}}/>
    </form>
  </div>
  </div>}
  
    {!edit && !profile2 && profile && <div style={{margin:'60px',width:'80%',textAlign:'center'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start'}}>

      {!image2 && formDataa.imagea && (<img 
            src={`http://localhost/${formDataa.imagea}`} 
            alt="Preview" 
            id="image30" 
          />)}
          {image2 && (<img 
            src={image2} 
            alt="Preview" 
            id="image30" 
          />)}
          {!formDataa.imagea && <i id="profile30" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
        <div style={{marginLeft:'60px',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'2em'}}>{formDataa.firstNamea} {formDataa.lastNamea}</span>


          <div style={{position:'relative',display:'flex',flexDirection:'column'}}>{res && res.data.response.blocked2===0 && rs && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && <i onClick={()=>setDrop(!drop)} ref={dr} style={{fontSize:'2em'}} className="fa-solid fa-ellipsis"></i>}
          {drop && <div ref={dro} style={{position:'absolute',top:'35px'}} className="dropdown-contenp">
                    <div onClick={()=>{openPost2();setDrop(false);}}><i className="fa-solid fa-message"></i><span>Message</span></div>               
                    <div onClick={()=>block()}><i style={{marginLeft:'4px',display:'inline-block'}} className="fa-solid fa-x"></i><span>Block</span></div>
                </div>}</div>
          </div>
          <span style={{marginTop:'10px',fontSize:'1.1em',opacity:'0.6'}}>@{formDataa.usernamea}</span>
          {res && res.data.response.blocked2===0 && res.data.response.blocked!==1 && <div style={{marginTop:'20px'}}>

          <button className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-signs-post"></i>0 Posts</button>
          <button onClick={()=>{openFollowers();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{res && res.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{res && res.data.response.num_of_following} Following</button>
          </div>}
          {
            res && rs && res.data.response.blocked2===0 && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && 
            <>
            {res && res.data.response.blocked2===0 &&res.data.response.number===0 && <button onClick={(e,id)=>follow(e,res.data.response.id)} className='follo'>Follow</button>}
            {res && res.data.response.blocked2===0 &&res.data.response.number>0 && <button onClick={(e)=>unfollow(e,res.data.response.id)} className='unfollo'>Unfollow</button>}
            </>
          }

          {
            res && res.data.response.blocked2===0 && res.data.response.blocked!==0 &&  
            <button onClick={()=>unblock()} className='unblock'>Unblock</button>
          }
          {
            res && res.data.response.blocked2!==0 &&  
            <span style={{marginTop:'10px',border:'1px solid rgba(150, 1, 1,0.3)',padding:'15px 10px',fontSize:'1.1em',borderRadius:'5px',color:'rgb(150, 1, 1)',backgroundColor:'rgba(235,80,80,0.5)'}}>@{formDataa.usernamea} blocked you !</span>
          }
          
        </div>
        </div>
      </div> }
      {!edit && !profile && profile2 && <div style={{margin:'60px',width:'80%',textAlign:'center'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start'}}>

      {!image2 && formData.image && (<img 
            src={`http://localhost/${formData.image}`} 
            alt="Preview" 
            id="image30" 
          />)}
          {image2 && (<img 
            src={image2} 
            alt="Preview" 
            id="image30" 
          />)}
          {!formData.image && <i id="profile30" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
        <div style={{marginLeft:'60px',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <span style={{fontSize:'2em'}}>{formData.firstName} {formData.lastName}</span>
          <span style={{marginTop:'10px',fontSize:'1.1em',opacity:'0.6'}}>@{formData.username}</span>
          <div style={{marginTop:'20px'}}>
          <button className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-signs-post"></i>0 Posts</button>
          <button onClick={()=>{openFollowers2();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{rs && rs.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing2();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{rs && rs.data.response.num_of_following} Following</button>

          </div>
        </div>
      </div>
  
  
  
      

      </div>}


      {viss && <div ref={po} className='all'>
  <div ref={popup23} style={{overflowY:'hidden',overflowX:'hidden',height:'90vh'}} className="post">
  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>{formDataa.imagea && (<img 
            src={`http://localhost/${formDataa.imagea}`} 
            alt="Preview" 
            // id="image30" 
            style={{marginRight:'10px',objectFit: 'cover',width:'45px',height:'45px',borderRadius:'50%'}}
          />)}{!formDataa.imagea && <i id="profile31" className="dropbtn fa-solid fa-user"></i>}<span style={{fontSize:'1.3em'}}>{formDataa.firstNamea} {formDataa.lastNamea}(@{formDataa.usernamea})</span>
         </div>
                <i id="close" style={{fontSize:'1.2em',left:'20px'}} onDoubleClick={closePost2} onClick={closePost2} className="fa-solid fa-x"></i>

                </div>
                <hr style={{width:'100%',opacity:'0.4'}}/>

    
    <form ref={form} style={{height:'90%',verticalAlign:'top',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} onSubmit={addMsg} method="post">
      <div ref={msg} style={{position:'relative',zIndex:'1',overflowY:'scroll',height:'100%',width:'100%',display:'flex',flexDirection:'column',alignSelf:'flex-start'}}>
       {loader2 && <div className="loader"></div>}
      {!loader2 && newMessagess!==null && newMessagess.data.map((item,index) => {
          return (
            rs.data.response.id === item.id_dest ? 
              <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-end',width:'60%',color:'white',borderRadius:'5px',margin:'10px 10px',padding:'10px',backgroundColor:'#0c6dfd'}}><span>{item.content}</span><br/>
              <span>{item.moment}</span>
              </div> :
              <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-start',width:'60%',color:'black',borderRadius:'5px',margin:'10px 10px',padding:'10px',border:'1px solid rgba(0,0,0,0.5)',backgroundColor:'#FFF'}}><span>{item.content}</span><br/>
              <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.6)'}}>{item.moment}</span>
              </div> 
          );
        })}
      </div>
      <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <input value={content} onChange={handleContentChange} placeholder='say something...' type="text" name="say" id="say"/>
        <button className="send" type="submit">Send</button>
        </div>
    </form>
  </div>
  </div>}

  {followers && <div className='all'>
  <div ref={popup234} className="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost23} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.followers != [] && res.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`http://localhost/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following && <div className='all'>
  <div ref={popup2344} className="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost234} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.following!=[] && res.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`http://localhost/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}




  {followers2 && <div className='all'>
  <div ref={popup2342} className="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost232} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    
    {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.followers != [] && rs.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`http://localhost/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(true);setFollowers2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following2 && <div className='all'>
  <div ref={popup23442} className="post">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost2342} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.following!=[] && rs.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`http://localhost/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(true);setFollowers2(false);setFollowing2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}


  </>
  )
}

export default Profile