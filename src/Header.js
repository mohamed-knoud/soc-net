import React,{useState, useEffect, useRef  } from 'react'
import './Header.css'
import Logo from './logo.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Comments from './Comments';
import axios from 'axios';
let res 
let rs
let rresponses = null
let likesElemeents = null
// const [lik, setLik] = useState(true);
let lik 
// let loader = true 
let checkNewCommennt
// let checkNewComments = []
let checkNewComment = []
const regex = /^del_[0-9]+/;
let queryParams 
function Header() {
  const [trigger, setTrigger] = useState(false);

  const [checkNewComments, setCheckNewComments] = useState([]);

  //  const [loader, setLoader] = useState(true);

  
  // const isArrayOfArrays = (arr)=>{
  //   return Array.isArray(arr) && arr.every(element => Array.isArray(element));
  // } 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [inputValue,setInputValue] = useState("")
  const handleInputChange = (event)=>{
    // console.log(event.target.value)
    setInputValue(event.target.value)
  }
  // Example of getting a parameter (e.g., "id")
  // const p = ;

  // console.log(queryParams.get('p'))
    // console.log()
    // const openComments = ()=>{

    // }
  const [user, setUser] = useState("");

  const [likes, setLikes] = useState([]);

  const [minus, setMinus] = useState(false);
  const [minuss, setMinuss] = useState(true);
  const [minusss, setMinusss] = useState(false);

  const closeLikes = (id) =>{
    // document.querySelector(`.all.box_${id}`).style.animation = 'fadeOut 0.2s ease'
    // document.querySelector(`.all.box_${id}`).addEventListener('animationend', () => {
      // document.querySelector(`.all.box_${id}`).style.animation = 'none'
      document.querySelector(`.all.box_${id}`).style.display = 'none'; 
    // });
  }

  // const [change, setChange] = useState(false);

  const [ress, setRess] = useState(null);
  const [drop,setDrop] = useState(false)
  const addLike = async (id)=>{
    let daa
    daa = {id_liker:res.data.response.id,id_post:id}; 
    // console.log(daa)
    try {
      const like = await axios.post('http://localhost/api/addLike.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log(like)
       
  } catch (error) {
    console.error('Error:', error);
  }
  }

  const removeLike = async (id)=>{
    let daa
    daa = {id_liker:res.data.response.id,id_post:id}; 
    // console.log(daa)
    try {
      let yi = await axios.post('http://localhost/api/removeLike.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log(yi)
       
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const toggleDelete = (event)=>{
    if(event.target.nextElementSibling.style.display=='none') {
      event.target.nextElementSibling.style.display='block'
    }
    else{
      event.target.nextElementSibling.style.display = 'none'
    }
  }
  const [content, setContent] = useState("");
  const [contentt, setContentt] = useState("");

  const handleContentChange = (e)=>{
    setContent(e.target.value)
  }
  // const handleContentChangee = (e)=>{
  //   setContentt(e.target.value)
  // }
  // const [content2, setContent2] = useState("");
  const postComment = async (id,value)=>{
    let data = {id_post:id}; 
    console.log(id)
    setContentt("");
    let daa = null
    if(value!=="")
    {
      daa = {id_liker:res.data.response.id,id_post:id,content:value}; 
      if(daa!==null){
    try {
      const like = await axios.post('http://localhost/api/addComment.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // if(like.data===1){
      //   window.location.href = `#comment_${id}`
      //   window.location.reload();
      // }
  } catch (error) {
    console.error('Error:', error);
  }

  checkNewCommennt = setInterval(async () => {
    // if(checkNewComments && checkNewComments.data.length!==0)
    //   {
    //     window.location.href = `#${checkNewComments.data[checkNewComments.data.length-1].id}`
    //   }
  // if (msg.current) {
  //   observer.observe(msg.current, config)
  // }
  try {
    checkNewComment = await axios.post('http://localhost/api/checkNewComments.php', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  console.log(checkNewComment)
  setCheckNewComments(checkNewComment.data)
  clearInterval(checkNewCommennt)
  // clearInterval(checkNewCommennt);

  } catch (error) {
    console.error('Error:', error);
  }
}, 1000);
  }}
}
  
  const postCommennt = async (id,value)=>{
    console.log(id)
    let daa = null
    if(value!==""){
      daa = {id_liker:res.data.response.id,id_post:id,content:value}; 
    if(daa!==null){
    try {
      const like = await axios.post('http://localhost/api/addComment.php', daa, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(like.data===1){
        window.location.href = `#send_${id}`
        window.location.reload();
      }
      } catch (error) {
        console.error('Error:', error);
      }
      }}
    }

  // const handleContentChange2 = (e)=>{
  //   setContent2(e.target.value)
  // }
  const [noImage,setNoImage] = useState(false)

  const addNewPost = async (e)=>{
    e.preventDefault()
    let dataa
    if(file===null){
      setNoImage(true)
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
          window.location.reload();
        }  
    } catch (error) {
      console.error('Error:', error);
    }
    }
  }

  const deletePost = async (id_post)=>{
    let dat  
    dat = {id:id_post};
    console.log(dat)
      try {
        const re = await axios.post('http://localhost/api/deletePost.php', dat, {
          headers: {
          'Content-Type': 'application/json',
          },
        });
        console.log(re.data)
        // if(re.data===1)
          window.location.reload(true)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const [usrs,setUsrs] = useState([])
  const popup90=useRef(null)
  const example=useRef(null)

  const dro=useRef(null)

  const openFollowers = ()=>{
    setFollowers(!followers)
    setVisibleOverlay(true)
   }
   const openFollowing = ()=>{
    setFollowing(!following)
    setVisibleOverlay(true)
   }

  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
   const [formDataa, setFormDataa] = useState({
          firstNamea: '',
          lastNamea:'',
          gendera:'',
          e_maila:'',
          usernamea:'',
          passworda:'',
          imagea:null
        });

  const closePost23 = ()=>{
    setVisibleOverlay(false)
    popup234.current.style.animation = 'fadeOut 0.2s ease'
    popup234.current.addEventListener('animationend', () => {
      popup234.current.style.display = 'none'; 
      setFollowers(!followers)
    });
   }
   const unfollow = async (e,id) => {
    let data
    if(id){
     data = { id_suiveur:res.data.response.id,id_suivi:id }; 
    //  console.log(11)
    // console.log(data)

    }else{
    //  console.log(112)
    // console.log(data)

    data = { id_suiveur:res.response.data.id,id_suivi:res.data.response.id }; 
    }
    try {
      const rds = await axios.post('http://localhost/api/unfollow.php', data, {
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
  const closePost23489 = ()=>{
    setVisibleOverlay(false)
    popup23448.current.style.animation = 'fadeOut 0.2s ease'
    // alert(popup23.current.style.animation)
    popup23448.current.addEventListener('animationend', () => {
      popup23448.current.style.display = 'none'; // Remove the element from the layout after the animation ends
      setlikesBox(!likesBox)
    });
   }

   const closePost2348 = ()=>{
    setVisibleOverlay(false)
    popup2344.current.style.animation = 'fadeOut 0.2s ease'
    // alert(popup23.current.style.animation)
    popup2344.current.addEventListener('animationend', () => {
      popup2344.current.style.display = 'none'; // Remove the element from the layout after the animation ends
      setFollowing(!following)
    });
   }

    const up = useRef(null);
const popup23=useRef(null)
    const popup234=useRef(null)
    const popup2345=useRef(null)
    const [profile2,setProfile2] = useState(false)
    const [likesBox,setlikesBox] = useState(false)


    const popup2344=useRef(null)
    const popup23448=useRef(null)

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

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [good3, setGood3] = useState(false);
    const [good4, setGood4] = useState(false);
    const [users,setUsers] = useState([])
    const [good1, setGood1] = useState(false);
    const [good2, setGood2] = useState(false);
    const [good33, setGood33] = useState(false);
    const [profile,setProfile] = useState(false)
    const [visible,setVisible] = useState(true)
    const [edit,setEditTrue] = useState(false)
    const [edt,setEdtTrue] = useState(true)

    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        gender:'',
        e_mail:'',
        username:'',
        password:'',
        image:null
      });
      <br />

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

      const getUserDataa = async () => {
  
        const data = { email: localStorage.getItem("email")}; 
        // console.log(data)
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
          // console.log(res.data)
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
        // console.log(follower)
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

          
          // console.log(res.data)
          
          if(res.data.response.image){
            setGood4(true)
            setImage2(false)
          }
          
          setFormData(prevState => ({
            ...prevState,
            e_mail: res.data.response.email,
            firstName: res.data.response.first_name,
            gender: res.data.response.gender,
            lastName: res.data.response.last_name,
            username: res.data.response.username,
            id:res.data.response.id,
            image:res.data.response.image
          }));
        } catch (error) {
          console.error('Error:', error);
        }
       return res;
      };
    // const getUserData = async (username) => {
    //   const data = { email: username }; 
    //   try {
    //     res = await axios.post('http://localhost/api/getUserData.php', data, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     console.log(res)
    //     setFormData(prevState => ({
    //       ...prevState,
    //       older: res.data.image
    //     }));
    //     setResponse(res.data);
    //     if(res.data.image){
    //       setGood4(true)
    //       setImage2(false)
    //     }
        
    //     setFormData(prevState => ({
    //       ...prevState,
    //       e_mail: res.data.email,
    //       firstName: res.data.first_name,
    //       gender: res.data.gender,
    //       lastName: res.data.last_name,
    //       username: res.data.username,
    //       id:res.data.id,
    //       image:res.data.image
    //     }));
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
     
    // };
    const [style1,setStyle1] = useState(null)
    const [style2,setStyle2] = useState(null)
    const [visibleOverlay,setVisibleOverlay] = useState(false)
    const sidenave1 = useRef(null);
    const search = useRef(null);


    const sidenave2 = useRef(null);
    const closeBtnSidenave1 = useRef(null);
    const closeBtnSidenave2 = useRef(null);

    const popup=useRef(null)
    const ups=useRef(null)
    const upps=useRef(null)
    const op=useRef(null)

    const popup2=useRef(null)
    const popup2c=useRef(null)

    const popup4=useRef(null)
    const popup44=useRef(null)

    const popup5=useRef(null)

    const log=useRef(null)
    // console.log(location.state.response)
    if(location.state)
      localStorage.setItem("email", location.state.email);
    
    // const param1 = queryParams.get('id'); // Retrieve 'param1' value
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result); // Set the image source for preview
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const handleFileChange2 = (event) => {
      setProfile(true)
      setFile2(event.target.files[0]);
      const file2 = event.target.files[0];
      // console.log(file2)
      setFormData(prevState => ({
        ...prevState,
        image: file2
      }));
      if (file2 && file2.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage2(e.target.result); // Set the image source for preview
        };
        reader.readAsDataURL(file2);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const [vis,setVis] = useState(false)
    // const [comments,setComments] = useState(false)
    const openComments = (id_post) => {
      // console.log(document.querySelector(`.allp.comments.boxC_${id_post}`))
      // console.log(id_post)
      // setCheckNewComments([])
      if(document.querySelector(`.allp.comments.boxC_${id_post}`).style.display=='none'){
        document.querySelector(`.allp.comments.boxC_${id_post}`).style.display='flex';
        // alert(11)
      }
      let data = {id_post:id_post}; 
      checkNewCommennt = setInterval(async () => {
          // if(checkNewComments && checkNewComments.data.length!==0)
          //   {
          //     window.location.href = `#${checkNewComments.data[checkNewComments.data.length-1].id}`
          //   }
        // if (msg.current) {
        //   observer.observe(msg.current, config)
        // }
        try {
          checkNewComment = await axios.post('http://localhost/api/checkNewComments.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        // console.log(checkNewComment)
        setCheckNewComments(checkNewComment.data)
        clearInterval(checkNewCommennt)
        // clearInterval(checkNewCommennt);

        } catch (error) {
          console.error('Error:', error);
        }
      }, 1000);
      setVisibleOverlay(true)

    }
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
      const over = {
        height: '100%',
        width: '100%',
        /* display: none; */
        position: 'fixed',
        zIndex:'15',
        top: '0',
        left: '0',
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0, 0.5)',
      }
    // const show = ()=>{
    //   if(flag==1)  
    //     {
    //       setVisible(true)
    //       flag=0
    //       console.log('show if')
    //     }
    //     else{
    //       setVisible(true)
    //       console.log('show else')

    //     }
    //     // console.log(222)
        
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

     const closePostc = (id_post)=>{
      setVisibleOverlay(false)
      if(document.querySelector(`.allp.comments.boxC_${id_post}`).style.display=='none'){
        document.querySelector(`.allp.comments.boxC_${id_post}`).style.animation = 'fadeOut 0.2s ease'
      }
      document.querySelector(`.allp.comments.boxC_${id_post}`).addEventListener('animationend', () => {
        document.querySelector(`.allp.comments.boxC_${id_post}`).style.display = 'none';
      });
      }


    const openNav2 = ()=>{
        setStyle2(opened)
        setStyle1(closed)
        setVisibleOverlay(true)

    }
    const handleUpdate = async () => {
      
      setGood1(false)
      setGood2(false)
      setGood33(false)

     if(formData.firstName==''){
        setGood1(true)
        getUserDataa(localStorage.getItem("email"))

      }else if(formData.lastName==''){
          setGood2(true)
          getUserDataa(localStorage.getItem("email"))

        }else if(formData.username==""){
            setGood33(true)
            getUserDataa(localStorage.getItem("email"))

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
        // if(document.getElementById('send_26')){
        //   console.log('ok')
        // }else{
        //   console.log('no')
        // }

        // document.addEventListener('DOMContentLoaded', function() {
        //   console.log(12132)
          
        // });
      
        
        (async () => {
          res = await getUserDataa(localStorage.getItem("email"));  
          // console.log(res);        
          (async () => {
            const data = { email: localStorage.getItem("email"),id:res.data.response.id };
            try {
               const rsa = await axios.post('http://localhost/api/getUsers.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            //  console.log(rsa.data)

             setUsers(rsa.data)
            } catch (error) {
              console.error('Error:', error);
            }
          })();
        
        })();
      }, []);
      
    useEffect(() => {
      const handleClickOutside = (event) => {

        // console.log(event.target)
        let commentsBox = document.querySelectorAll('.allp') 
        
        commentsBox.forEach((element) => {
          // console.log(element,)
          if(element.style.display == 'flex' && event.target.parentElement.parentElement.parentElement!==element && event.target.parentElement.parentElement.parentElement.parentElement!==element && event.target.tagName !== 'SPAN'){
            // console.log('ok')
            // console.log(event.target)
            element.style.display = 'none'
            setVisibleOverlay(false)
          }
        });
        // if(document.querySelector('.allp.comments').style.display = 'flex'){
        //   document.querySelector('.allp.comments').style.display = 'none'
        //   // console.log(111)
        //   setVisibleOverlay(false)
        // }
      if(event.target.classList.value=='overlay' || popup2.current && !popup2.current.contains(event.target)){
        setVisibleOverlay(false)
      }
      if(event.target.classList.value=='overlay' || popup2344.current && !popup2344.current.contains(event.target)){
        setVisibleOverlay(false)
      }
      const elements = document.querySelectorAll('.dropdown-conten');
      
      likesElemeents = document.querySelectorAll('[class*="likes"]') 
      // console.log(event.target.classList.value)
      if(event.target.classList.value!=='slikes'){
      likesElemeents.forEach((element) => {
        if(element.style.display !== 'none' && element.id===event.target.id && !element.contains(event.target)){
          closeLikes(element.id)
        }
      }); 
    }
     
      elements.forEach((element) => {
        if(!regex.test(event.target.id) && event.target!=element.previousElementSibling){
          element.style.display = 'none';
        }
        if((!regex.test(event.target.id) && event.target.id && event.target.nextElementSibling && event.target.id.slice(2)!=event.target.nextElementSibling.id)){
          element.style.display = 'none';
        }
      }); 
      
      if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
        closeNav1()
      }

      if(closeBtnSidenave1.current.contains(event.target) && sidenave1.current){
        setVisibleOverlay(false)
      }
      if(closeBtnSidenave2.current.contains(event.target) && sidenave2.current){
        setVisibleOverlay(false)
      }
      // popup2344
      if (popup234.current && popup234.current.contains(event.target)) {
       setVisibleOverlay(true)
        
      }
      if (popup2344.current && popup2344.current.contains(event.target)) {
       setVisibleOverlay(true)
      }

      if (popup234.current && !popup234.current.contains(event.target)) {
            setVisibleOverlay(false)
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
      if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
        // if(popup2.current && popup2.current.contains(event.target))
        //   setVisibleOverlay(true);  // Hide the div
        // else
        //   setVisibleOverlay(false);  // Hide the div
        //   setStyle1(closed)
        //   setStyle2(closed)
      if(popup4.current && popup4.current!=event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
      if(popup90.current && popup90.current!=event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!=event.target && popup2.current && !popup2.current.contains(event.target))
        up.current.style.display='none'
    } 
    if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
          if(popup23.current && popup23.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup234.current && popup234.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2344.current && popup2344.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2345.current && popup2345.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          else {
            if(/likes/.test(event.target.classList.value) || event.target.id=='cloe')
              setVisibleOverlay(false);  // Hide the div
            // else
            // setVisibleOverlay(true);  // Hide the div
          }
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!=event.target && popup23.current && !popup23.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!=event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!=event.target && popup2344.current && !popup2344.current.contains(event.target))
          up.current.style.display='none'
        if(popup4.current && popup4.current!=event.target && popup2345.current && !popup2345.current.contains(event.target))
          up.current.style.display='none'

        
        if(popup90.current && popup90.current!=event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        
        
        
        if(popup.current && popup.current!=event.target && popup23.current && !popup23.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!=event.target && popup234.current && !popup234.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!=event.target && popup2344.current && !popup2344.current.contains(event.target))
          up.current.style.display='none'
        if(popup.current && popup.current!=event.target && popup2345.current && !popup2345.current.contains(event.target))
          up.current.style.display='none'
      }
      if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
        if(popup23.current && popup23.current.contains(event.target))
          setVisibleOverlay(true);  // Hide the div
        if(popup234.current && popup234.current.contains(event.target))
          setVisibleOverlay(true);  // Hide the div
        if(popup2344.current && popup2344.current.contains(event.target))
          setVisibleOverlay(true);  // Hide the div
        if(popup2345.current && popup2345.current.contains(event.target))
          setVisibleOverlay(true);  // Hide the div
        else {
          if(/likes/.test(event.target.classList.value) | event.target.id=='cloe')
            setVisibleOverlay(false);  // Hide the div
          // else
          //   setVisibleOverlay(true);  // Hide the div
        }
        
          setStyle1(closed)
          setStyle2(closed)
    
      if(popup90.current && popup90.current!=event.target && popup2344.current && !popup2344.current.contains(event.target))
        up.current.style.display='none'
      
      
      if(popup.current && popup.current!=event.target && popup23.current && !popup23.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!=event.target && popup234.current && !popup234.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!=event.target && popup2344.current && !popup2344.current.contains(event.target))
        up.current.style.display='none'
      if(popup.current && popup.current!=event.target && popup2345.current && !popup2345.current.contains(event.target))
        up.current.style.display='none'
    }
    if(popup90.current && popup90.current!=event.target && event.target==op.current){
      setProfile(true)
      setEditTrue(false)
      setEdtTrue(false)
      up.current.style.display='none'
    }
    if((popup90.current && popup90.current!=event.target && up.current && !up.current.contains(event.target)) ){
      up.current.style.display='none'
    }
    if(popup90.current && event.target!=popup90.current && event.target!=popup.current && up.current){
      if(event.target==ups.current){
        up.current.style.display='none'
        setEditTrue(true)
        setEdtTrue(false)
        // setProfile(false)
        setProfile2(false);
      }else {
        if(popup90.current && popup90.current!=event.target && event.target!=log.current && !log.current.contains(event.target)){
          if(event.target==upps.current ){
            setProfile2(true)
            // setProfile(false)

            setEditTrue(false)
            setEdtTrue(false)
            up.current.style.display='none'
          }
        }
      }
    }else{
      if(event.target==popup90.current){
        if(up.current.style.display=='none'){
up.current.style.display='block'

}else{

up.current.style.display='none'
}
      }
    }
        // Check if the click was outside the div
        if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
          if(popup90.current && popup90.current!=event.target && popup23.current && !popup23.current.contains(event.target))
            up.current.style.display='none'
          
         
          if(popup90.current && popup90.current!=event.target && popup2345.current && !popup2345.current.contains(event.target))
            up.current.style.display='none'
          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          else{
            if(popup234.current && popup234.current.contains(event.target)){
              setVisibleOverlay(true);  // Hide the div
            }
            if(popup2344.current && popup2344.current.contains(event.target)){
              setVisibleOverlay(true);  // Hide the div
            }
          }
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!=event.target && popup2.current && !popup2.current.contains(event.target))
          up.current.style.display='none'
        if(popup44.current && popup44.current!=event.target && popup2.current && !popup2.current.contains(event.target))
          up.current.style.display='none'
      }
        if (sidenave2.current && !sidenave2.current.contains(event.target)) {
          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);
            setStyle1(closed)
            setStyle2(closed)
        }

        if (sidenave1.current && !sidenave1.current.contains(event.target)) {
          if(popup2.current && popup2.current.contains(event.target))
            setVisibleOverlay(true);
            setStyle1(closed)
            setStyle2(closed)
        }
        if(popup4.current && popup4.current!=event.target && event.target==op.current){
          setProfile(true)
          setEditTrue(false)
          setEdtTrue(false)
          up.current.style.display='none'
        }
        if(popup44.current && popup44.current!=event.target && event.target==op.current){
          setProfile(true)
          setEditTrue(false)
          setEdtTrue(false)
          up.current.style.display='none'
        }
        if (popup2.current && !popup2.current.contains(event.target)) {
          popup2.current.style.animation = 'fadeOut 0.2s ease'
          popup2.current.addEventListener('animationend', () => {
            popup2.current.style.display = 'none';
            setVis(false)
          });
        }
        if((popup4.current && popup4.current!=event.target && up.current && !up.current.contains(event.target)) ){
          up.current.style.display='none'
        }
        if((popup44.current && popup44.current!=event.target && up.current && !up.current.contains(event.target)) ){
          up.current.style.display='none'
        }
        if(popup4.current && event.target!=popup4.current && event.target!=popup.current && up.current){
          if(event.target==ups.current){
            up.current.style.display='none'
            setEditTrue(true)
            setEdtTrue(false)
            // setProfile(false)
          }else {
            if(popup4.current && popup4.current!=event.target && event.target!=log.current && !log.current.contains(event.target)){
              if(event.target==upps.current ){
                setProfile(true)
                setEditTrue(false)
                setEdtTrue(false)
                up.current.style.display='none'
              }
            }
          }
        }else{
          if(event.target==popup4.current){
              if(up.current.style.display=='none'){
                  up.current.style.display='block'
                  // console.log('ouvert')
              }else{
                  up.current.style.display='none'
                  // console.log('fermé')
              }
          }
        }
        if(popup44.current && event.target!=popup44.current && event.target!=popup.current && up.current){
          if(event.target==ups.current){
            up.current.style.display='none'
            setEditTrue(true)
            setEdtTrue(false)
            // setProfile(false)
          }else {
            if(popup44.current && popup44.current!=event.target && event.target!=log.current && !log.current.contains(event.target)){
              if(event.target==upps.current ){
                setProfile(true)
                setEditTrue(false)
                setEdtTrue(false)
                up.current.style.display='none'
              }
            }
          }
        } 
          if(event.target==popup44.current){
            // console.log(11)
              if(up.current.style.display=='none'){
                  up.current.style.display='block'
              }else{
                up.current.style.display='none'
              }
          }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
     
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [formData.id]);
   
    const follow = async (e,id) => {
        const data = { id_suiveur: res.data.response.id,id_suivi:id }; 
        try {
          const rds = await axios.post('http://localhost/api/follow.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log()
          e.target.innerHTML = "<i className='fa-solid fa-check'></i> Followed";
          e.target.style.opacity = '0.6'
          e.target.style.pointerEvents = 'none'
          // console.log(rds)
        } catch (error) {
          console.error('Error:', error);
        }
       
      };

      let compteur = 0

      useEffect(() => {

        (async () => {
            let rees = await getUserDataa(localStorage.getItem("email"));  
            // console.log(rees)
            let data = {id:rees.data.response.id}; 
            // console.log(data)
            try {
              rresponses = await axios.post('http://localhost/api/retrievePosts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              // console.log(rresponses.data)
              if(rresponses.data.length>0)
                {
                  rresponses.data.map((item,index)=>{
                    let table = [item.num_of_likes,index]
                    // console.log(table)
                    setLikes((prevState) => [...prevState, table]);
                  })
                  setRess(rresponses.data)
                  // console.log(rresponses.data)
                  setCheckNewComments(rresponses.data)
                  // console.log(rresponses.data)
                  // document.body.click();
                }
                // console.log(ress)
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, []);

       useEffect(() => {
            setFollowers(false)
            setFollowing(false)
            setVisibleOverlay(false)
          }, []);

  useEffect(() => {
    setTrigger(!trigger);
    // console.log(11)
    // loader = !loader
    setContentt("")
  }, [checkNewComments]);

  // const [loader,setLoader] = useState(true)
  //   useEffect(() => {
  //     // Code to execute on component load
  //     // console.log('Component loaded!');
  //     setLoader(false)
  
  //     // Cleanup function (optional)
  //     return () => {
  //       console.log('Component unmounted!');
  //     };
  //   }, [checkNewComments]);
    
  return (
    <>
    {visibleOverlay && <div className="overlay"></div>}
    <header id="section1">
        <div><a href=""><span id="logo">soc-net</span></a></div>
        <div id="second">
        <div className="dropdown">
          <input value={user} onChange={handle} onClick={()=>{search.current.style.display='block'}} type="text" name="user" placeholder='looking for someone...'/>
          <div id="myDropdown" ref={search} className="dropdown-contentt">
          <div style={{textAlign:'right',marginRight:'10px',marginTop:'10px'}}><i onClick={()=>{search.current.style.display='none'}} id="close" className="fa-solid fa-x"></i></div>
          {user=="" && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>Enter name or username</span>} 
          {user!="" && usrs.length==0 && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>no user found !</span>} 
           {user!="" && usrs.length>0 && <div style={{width:'100%',marginTop:'5px'}}>
            
            {usrs.map((item, index) => {
      return (
          <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
            <div style={{display:'flex'}}>
              {item.image!=null && <img 
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
              {item.image==null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
              <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
              <Link style={{color:"black"}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500',fontSize:'0.8em'}}>{item.first_name} {item.last_name}</span></Link>
              <span style={{cursor:'initial',color:'rgba(0,0,0,0.5'}}>@{item.username}</span>
  
            </div>
            </div>
            
          </div>
      );  
  })} 
  
            </div>}
          </div>
        </div>
        <nav>
            <i onClick={()=>{setEditTrue(false);setEdtTrue(true);window.location.reload(true);}} className="fa-solid fa-house"></i>
            <i onClick={openPost} className="fa-solid fa-circle-plus"></i>
            <i onClick={openNav1} className="fa-solid fa-bell"></i>
            <i onClick={openNav2} className="fa-solid fa-message"></i>
            <div className="dropdown">
            {!image2 && formData.image && <img  ref={popup44}
            src={`http://localhost/uploads/${formData.image}`} 
            alt="Preview" 
            style={{ marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
          />}

            {image2 && <img  
              src={image2} 
              ref={popup90}
              alt="Preview" 
              style={{ marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
            />}
                {!formData.image && <i ref={popup4}  id="profile" className="dropbtn fa-solid fa-user"></i>}
                {visible && <div ref={up} style={{display:'none'}} className="dropdown-content">
                    <div ref={upps} onClick={() => {setProfile(true);setEdtTrue(false)}}><i className="fa-solid fa-address-book"></i>My Profile</div>               
                    <div ref={ups}  onClick={() => {setEditTrue(!edit)}}><i className="fa-solid fa-pen-to-square"></i>Edit Profile</div>
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
      {good3 && !good1 && !good2 && !good33 && <span style={{margin:'10px 20px',color:'green'}}>Profile is updated !</span>}<br/>
      {!good4 && !image2 && <i ref={popup} style={{display:'inline-block',margin:'10px 20px'}} id="profile2" className="dropbtn fa-solid fa-user"></i>}
      {image2 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img 
            src={image2} 
            alt="Preview" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      {!image2 && good4 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img 
            src={`http://localhost/${formData.image}`} 
            alt="Preview" 
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
  <div ref={popup2} id="post">
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
      <input style={{height:'35px',padding:'5px',width:'100%',marginTop:'10px',marginBottom:'10px'}} type="text" value={content} onChange={handleContentChange} name="say" id="say"/><br/>
      <input type="submit" value="Post" style={{padding:'10px',color:'white',backgroundColor:'#0b5ed7'}}/>
    </form>
  </div>
  </div>}

  {edt && <div style={{display:'flex',justifyContent:'space-between',width:'85%',margin:'auto'}}>
  <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
  { 
    <div style={{flexGrow: 25}}>
      {(queryParams.get('p')==0 || noImage) && <><span id="edtd">no image is selected</span><br/></>}
      {(queryParams.get('p')!=0 && ress===null) && <div className="edct" style={{display:'inline-block',verticalAlign:'top'}}>Follow Someone or Add a new post</div>}
    </div>
  }
{ress!==null && ress.length!=0 && <div style={{width:'100%',margin:'auto'}}>
            
            {ress.length!=0 && ress.map((item, index) => {
      return (
          <div id={`send_${item.id_post}`} className="edcct" key={index}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginLeft:'10px',marginBottom:'10px'}}>
                <div>
            {item.profile_pic==null && <i id="profile11" className="dropbtn fa-solid fa-user"></i>}
            {item.profile_pic!=null && <img 
                src={`http://localhost/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '35px',
                    width: '35px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
            {/* `/profile?username=${item.username}` */}
            {<Link style={{color:'black'}} to={`/profile?username=${item.username}`}><span style={{fontSize:'0.9em'}}>{item.username}</span></Link>}
            </div>
            <div style={{position:'relative',display:'flex',flexDirection:'column'}}>
            {res.data.response.id===item.id && <i id={`i_${item.id_post}`} onClick={toggleDelete} style={{marginRight:'10px',fontSize:'1em'}} className="fa-solid fa-ellipsis"></i>}
            <div id={`${item.id_post}`} style={{display:'none'}} className="dropdown-conten">
                    <div onClick={()=>deletePost(item.id_post)}><i className="fa-solid fa-trash"></i><span id={`del_${item.id_post}`}>Delete Post</span></div>  
                </div>
            </div>
            </div>
            <img 
                src={`http://localhost/${item.photo}`} 
                alt="Preview" 
                style={{
                    // marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    // marginRight: '5px',
                    height: '100%',
                    width: '100%',
                    verticalAlign: 'middle',
                }} 
            />
            <div>
              <div style={{display:'flex',alignItems:'center'}}>
                <i onClick={(event)=>
                  {
                  const newLikes = [...likes];
                  newLikes[index][0] -= 1;
                  setLikes(newLikes);
                  removeLike(item.id_post);event.target.style.display='none';event.target.nextElementSibling.style.display='block';
                  }} 
                  style={{display:item.liked?'block':'none',color:'#dc3545',fontSize:'1.5em',margin:'5px'}} className="fa-solid fa-heart"></i>
                
                <i onClick={(event)=>{
                  const newLikes = [...likes];
                  newLikes[index][0] += 1;
                  setLikes(newLikes);
                  addLike(item.id_post);event.target.style.display='none';event.target.previousElementSibling.style.display='block';}} style={{display:item.liked?'none':'block',fontSize:'1.5em',margin:'5px'}} className="fa-regular fa-heart"></i>
                
                <i style={{fontSize:'1.5em',margin:'5px 10px 5px 5px'}} className="fa-regular fa-comment"></i> <span onClick={()=>openComments(item.id_post)} style={{fontSize:'0.8em',fontStyle:'italic',fontWeight:'600'}}>{item.num_of_comments} comments</span></div>
              <hr style={{opacity:'0.3',width:'100%'}}/>
              <div style={{margin:'15px'}}>
      {/* setVisibleOverlay(true) */}
                <span id={item.id_post} className='slikes' onClick={(event)=>{
                  setVisibleOverlay(!visibleOverlay);
                  if(document.querySelector(`.all.box_${event.target.id}`).style.display=='none'){
                    document.querySelector(`.all.box_${event.target.id}`).style.display='flex';
                  }
                  }}>{likes[index][0]} likes</span>
                <span style={{marginLeft:'10px',fontSize:'0.9em',opacity:'0.5'}}>{item.formatted_time}</span></div>
              <div style={{margin:'15px'}}>{item.content}</div>
              <hr style={{opacity:'0.3',width:'100%'}}/>
              <div style={{marginBottom:'10px',width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <input placeholder='say something...' type="text" id={`${index}`} className="sayy"/>
                <button className={`send_${item.id_post}`} onClick={(e)=>{
                  postCommennt(item.id_post,e.target.previousElementSibling.value);
                  }} type="submit">Post</button>
              </div>
            </div>
          </div>
      );
  })}
  
            </div>}</div>
    <div style={{flexGrow: 6,maxWidth:'400px',minWidth:'400px',display:'inline-block',verticalAlign:'top'}}>
    
        <div style={{display:'flex',flexDirection:'column',padding:'2px',margin:'25px 30px',verticalAlign:'top'}}>
        <div style={{display:'flex'}}>
        {formData.image && (<img 
            src={`http://localhost/${formData.image}`} 
            alt="Preview" 
            style={{ maxWidth: '100%',marginRight:'15px', height: 'auto' ,width:'60px',verticalAlign:'top',height:'60px',borderRadius:'50%'}} 
          />)}
          {!formData.image && <i id="profile3" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
          <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
            <span ref={op} style={{cursor:'pointer',display:'inline-block',fontWeight:'500'}}>{formData.firstName} {formData.lastName}</span>
            <span style={{color:'rgba(0,0,0,0.5'}}>@{formData.username}</span>

          </div>
          </div>
          <div style={{textAlign:'start',marginTop:'15px'}}>
          <span style={{fontWeight:'bold',color:'rgba(0,0,0,0.4'}}>You Can Follow Them</span>

          </div>
          {users.length!=0 && users && <div style={{width:'100%',marginTop:'20px'}}>
            
          {users.length!=0 && users.map((item, index) => {
    return (
        <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
          <div style={{display:'flex'}}>
            {item.image!=null && <img 
                src={`http://localhost/${item.image}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    height: '45px',
                    width: '45px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
            {item.image==null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
            <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
            <Link style={{color:"black"}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500'}}>{item.first_name} {item.last_name}</span></Link>
            <span style={{color:'rgba(0,0,0,0.5'}}>@{item.username}</span>

          </div>
          </div>
          <button onClick={(e)=>follow(e,item.id)} className='follow'>Follow</button>
          
        </div>
    );
})}

          </div>}
        </div>
      
    </div>

    </div>}
    {ress!==null && ress.length!=0 && ress.map((item,index) => {
      return (
        <div key={index} id={item.id_post} className={`all likes box_${item.id_post}`} style={{display:'none'}}>
        <div className={`post`}>
          <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3>Likes</h3>
            <i id="cloe" onClick={()=>closeLikes(item.id_post)} className="fa-solid fa-x"></i>
          </div>
          <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
          <div>
            
          {item.likers.length===0 && <span>Currently No Likes</span>}


            {item.likers && <div style={{width:'100%',marginTop:'20px'}}>
            {item.likers && item.likers!=[] && item.likers.map((itm) => {
        return (
          <div style={{ display: 'flex', marginBottom: '10px', flexDirection: 'column' }} key={itm.id}>
            <div style={{ display: 'flex'}}>
              <div style={{display: 'flex',justifyContent:'space-between',width:'100%'}} key={itm.id}>
                <div style={{display: 'flex'}}>
              {itm.image ? (
                <img
                  src={`http://localhost/${itm.image}`}
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
                <Link style={{ color: 'black' }} to={`/profile?username=${itm.username}`}>
                  <span style={{ display: 'inline-block', fontWeight: '500' }}>
                    {itm.first_name} {itm.last_name}
                  </span>
                </Link>
                <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{itm.username}</span>
              </div>
              </div>
            {itm.me==0 && itm.ok==0 && <button onClick={(e) => follow(e, itm.id)} className='follo'>Follow</button>}
      
            {itm.me==0 && itm.ok!=0  && <button onClick={(e)=>unfollow(e,itm.id)} className='unfollo'>Unfollow</button>}
              </div>
            </div>
            
          </div>
        );
      })}
      
            
                      </div>}
          </div>
        </div>
        </div>)})}
    {!edit && profile && <div style={{margin:'60px',width:'80%',textAlign:'center'}}>
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
          <button className='follo' onClick={()=>{openFollowers();}}><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{res && res.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{res && res.data.response.num_of_following} Following</button>

          </div>
        </div>
      </div>
  
  
  
      <div>
        {/* <h1>Posts</h1> */}
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
            {res.data.followers!=[] && res.data.followers.map((item) => {
        return (
          <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
            {/* <span>ppppp</span> */}
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
            {item.ok==0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}
      
            {item.ok!=0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
          </div>
        );
      })}
      
            
                      </div>}
        </div>
        </div>}
        {/* {followers && <div className='all'>
        <div ref={popup234} className="post">
          <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3>Followers</h3>
            <i id="close" onClick={closePost23} className="fa-solid fa-x"></i>
          </div>
          <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
          {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                        
            {res.data.followers!=[] && res.data.followers.map((item) => {
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
            {item.ok==0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}
      
            {item.ok!=0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
          </div>
        );
      })}
      
            
                      </div>}
        </div>
        </div>} */}
        
        {/* likesBox */}
        
       {following && <div className='all'>
         <div ref={popup2344} className="post">
           <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
             <h3>Following</h3>
             <i id="close" onClick={closePost2348} className="fa-solid fa-x"></i>
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
       


       {following && <div className='all'>
         <div ref={popup2344} className="post">
           <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
             <h3>Following</h3>
             <i id="close" onClick={closePost2348} className="fa-solid fa-x"></i>
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
       
         {ress!==null && ress.length!=0 && ress.map((item,index)=>{
          return(
            <div style={{display:'none'}} className={`allp comments boxC_${item.id_post}`} key={item.id_post}>
                <div className='postg'>
                  <div style={{width: '65%', height: '100%', overflow: 'hidden', position: 'relative'}}><img style={{width: '100%', height: '100%', position: 'absolute'}} src={`http://localhost/${item.photo}`}/></div>
                  <div style={{width:'35%',height: '100%',backgroundColor:'white',padding:'10px'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'flex',alignItems:'center'}}>
                      {item.profile_pic==null && <i id="profile111" className="dropbtn fa-solid fa-user"></i>}
            {item.profile_pic!=null && <img 
                src={`http://localhost/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '55px',
                    width: '55px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                          <span style={{fontWeight:'500',fontSize:'1em'}}>{item.first_name} {item.last_name}</span>
                          <span style={{color:'rgba(0,0,0,0.5)',fontWeight:'500',fontSize:'1em'}}>@{item.username}</span>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                        <span>{item.num_of_likes} likes</span>
                        <span style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em'}}>{item.formatted_time}</span>
                      </div>
                    </div>

                    <div>

                    </div>
                    <hr style={{opacity:'0.5',width:'100%'}}/>
                    <div style={{display:'flex',flexDirection:'column',maxHeight:'100%',height:'76%',overflowY:'scroll'}}>
{/* {isArrayOfArrays(checkNewComments)? checkNewComments[index] && checkNewComments[index].length!==0 && checkNewComments[index].map((itm,index)=>{
return(
  <>
                      <div key={index} id={index} style={{display:'flex'}}>
                      {itm.image==null && <i id="profile111" className="dropbtn fa-solid fa-user"></i>}
            {itm.image!=null && <img 
                src={`http://localhost/${itm.image}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '45px',
                    width: '45px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
                        <div style={{marginLeft:'10px'}}>
                          <span style={{fontWeight:'700',color:'rgba(0,0,0,0.5)'}}>@{itm.username}</span> - <span style={{fontWeight:'500',fontSize:'0.9em'}}>{itm.content}</span><br/>
                          <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.5)'}}>({itm.formatted_time})</span>
                        </div>
                      </div>
                      </>
)}
) 
:checkNewComments.data && checkNewComments.data.length!==0 && checkNewComments.data.map((itm,index)=>{
  return(
    <>
                        <div key={index} id={index} style={{display:'flex'}}>
                        {itm.image==null && <i id="profile111" className="dropbtn fa-solid fa-user"></i>}
              {itm.image!=null && <img 
                  src={`http://localhost/${itm.image}`} 
                  alt="Preview" 
                  style={{
                      marginLeft: '1px',
                      marginBottom: '6px',
                      maxWidth: '100%',
                      marginRight: '5px',
                      height: '45px',
                      width: '45px',
                      verticalAlign: 'middle',
                      borderRadius: '50%'
                  }} 
              />}
                          <div style={{marginLeft:'10px'}}>
                            <span style={{fontWeight:'700',color:'rgba(0,0,0,0.5)'}}>@{itm.username}</span> - <span style={{fontWeight:'500',fontSize:'0.9em'}}>{itm.content}</span><br/>
                            <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.5)'}}>({itm.formatted_time})</span>
                          </div>
                        </div>
                        </>
  )}
  ) 
  } */}
       <Comments trigger={trigger} checkNewComments={checkNewComments} />

                    </div>
                    <hr style={{opacity:'0.5',width:'100%'}}/>
                    <div style={{marginBottom:'10px',width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <input placeholder='say something...' type="text" className="sayy"/>
                      <button onClick={(e)=>{postComment(item.id_post,e.target.previousElementSibling.value);e.target.previousElementSibling.value="";}} className={`send_${item.id_post}`} type="submit">Post</button>
                    </div>
                  </div>
                </div>
            </div> 
          );
         }) }
        
            
      
  </>
  )
}

export default Header
