import './App.css';
import { useState , useEffect , useReducer} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Tab } from '@mui/material';
import FunApi from './FunApi';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from './Modal'; 
function App(){
  let[detail,setdetail] = useState("0");
  let[search,setsearch] = useState("0");
  let[api,dispatch] = useReducer(FunApi,"https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=4ffbfa8485a95042fd73469dca85c095");
  let[temp,settemp] = useState({number:null,min:null,max:null,dec:"",feels_like:null,temp_max:null,temp_min:null,speed_wind:null,degree_wind:null,humidity:null,ground_level:null,pressure:null,icon:"",country:"Cairo"});
  let[openOrhidden,setopenOrhidden] = useState({view:"none",msg:""});
  let[ph,setUrl] = useState(null);
  let[location, setLocation] = useState({latitude:null,longitude:null});
  //let[location, setLocation] = useState({latitude:null,longitude:null,city:""});
  useEffect(()=>{
    /**function for bachground in night or day*/
    function Daytime(){
      let isDayTime = ()=>{
        const currentHour = new Date().getHours();
        return currentHour >= 6 && currentHour < 18;
      }
      if (isDayTime()) {
        setUrl(true);
      } else {
        setUrl(false);
      }
    }
    Daytime();
    /**function for bachground in night or day*/
    /**function for finding lat and lon user location*/
    function location(){
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({latitude:position.coords.latitude,longitude:position.coords.longitude});
          },
          (error) => {
            console.log("error")
            console.log(error.message)
          }
        );
      } else {
        setopenOrhidden({view:"",msg:"the browser does not support location determination"});
      }
    }
    location();
    /**function for finding lat and lon user location*/
    /**function for finding city name lat and lon user location*/
    // fetch('https://api.ipify.org?format=json')
    //   .then(response => response.json())
    //   .then(data => {
    //     const ipAddress = data.ip; // تخزين عنوان IP
    //     // استخدام عنوان IP للحصول على معلومات الموقع
    //     console.log(data.ip);
    //     fetch(`https://ipapi.co/${ipAddress}/json/`)
    //       .then(response => response.json())
    //       .then(locationData => {
    //         setLocation({...location,city:locationData.city}); // تحديث اسم المدينة
    //         console.log("locationData.city"+locationData.city);
    //       });
    //   });
  },[]);
  /*function for change Height detail*/
  function changeHdetail(){
    if(detail === "0"){
      setTimeout(()=>{
          setdetail("100%");
        },1000)
      }else{
        setdetail("0");
      }
    }
  /*function for change Height detail*/
  /*function for change Height search*/
    function changeHsearch(){
    if(search === "0"){
      setTimeout(()=>{
        setsearch("100%");
      },1000)
    }else{
      setsearch("0");
    }
  }
  /*function for change Height search*/
  useEffect(()=>{
    /*function for api temp*/
    async function getUser() {
      try {
        const response = await axios.get(api);
          settemp({...temp,
            number:Math.round(response.data.main.temp-272.15),
            min:Math.round(response.data.main.temp_min-272.15),
            max:Math.round(response.data.main.temp_max-272.15),
            dec:response.data.weather[0].description,
            feels_like:Number((response.data.main.feels_like-272.15).toFixed(2)),
            temp_max:Number((response.data.main.temp_max-272.15).toFixed(2)),
            temp_min:Number((response.data.main.temp_min-272.15).toFixed(2)),
            speed_wind:Number((response.data.wind.speed*3.16).toFixed(2)),
            degree_wind:response.data.wind.deg,
            humidity:response.data.main.humidity,
            ground_level:response.data.main.grnd_level,
            pressure:response.data.main.pressure,
            icon:response.data.weather[0].icon
          })
        } catch (error) {
          if(error.message === "Network Error"){
            setopenOrhidden({view:"",msg:"you are not connected to the internet"});
          }else{
            setopenOrhidden({view:"",msg:"Sorry,it seems that there is a problem with finding the weather for this city.we will solve this problem soon."});
          }
        }
      }
      getUser()
      /*function for api temp*/
    },[api]);
    return(
      <div style={{backgroundSize: "100% 100%",width: "100%",height: "100%"}} className={`${ph ? 'daytime' : 'nighttime'}`}>
      {/*img for icon  */}
        <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt=''/>
      {/*img for icon  */}
      {/**modal error */}
        <Modal view = {openOrhidden.view} message = {openOrhidden.msg}/>
      {/**modal error */}
        <Card className='search' style={{height:search,width:"100%"}}>
      {/**button hide serach*/}
          <button onClick={()=>{
            if(temp.country === "My location"&&location.latitude!==""){
              changeHsearch();
              //dispatch({type:temp.country,payload:{latitude:location.latitude,longitude:location.longitude,city:location.city}});
              dispatch({type:temp.country,payload:{latitude:location.latitude,longitude:location.longitude}});
              settemp({...temp,
                number: null,
                min: null,
                max: null,
                dec: "",
                feels_like: null,
                temp_max: null,
                temp_min: null,
                speed_wind: null,
                degree_wind: null,
                humidity: null,
                ground_level: null,
                pressure: null});
            }else if(temp.country==="My location"&&location.latitude===""){
              setopenOrhidden({view:"",msg:"we can not locate you"});
            }else{
              changeHsearch();
              dispatch({type:temp.country});  
              settemp({...temp,number: null,
                min: null,
                max: null,
                dec: "",
                feels_like: null,
                temp_max: null,
                temp_min: null,
                speed_wind: null,
                degree_wind: null,
                humidity: null,
                ground_level: null,
                pressure: null});   
            }
          }}>
            <div></div>
            <div></div>
          </button>
      {/**button hide serach*/}
      {/**list of cities*/}
          <div className="custom-radio-group" style={{overflow:"auto", marginTop:"20px" , direction:"ltr"}}>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" onChange={()=>{
                //settemp({...temp,country:location.city!==""?location.city:"My location"});
                settemp({...temp,country:"My location"});
              }}/>
              <span className="custom-radio-checkmark"></span>
              your location
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Alex"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Alex
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Asyut"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Asyut
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Aswan"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Aswan
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Beheira"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Beheira
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Beni Suef"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Beni Suef
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Port Said"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Port Said
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option2" onChange={()=>{
                settemp({...temp,country:"Cario"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Cario
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Dakahalia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Dakahalia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Damietta"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Damietta
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" onChange={()=>{
                settemp({...temp,country:"Fakous"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Fakous
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Faiyam"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Faiyam
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Gharbia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Gharbia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Giza"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Giza
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Ismailia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Ismailia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Kafr el sheikh"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Kafr el sheikh
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Luxor"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Luxor
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Monufia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Monufia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Matrouh"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Matrouh
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Minya"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Minya
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"North Sinai"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              North Sinai
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"New Valley"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              New Valley
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Qalyubia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Qalyubia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Qena"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Qena
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Red Sea"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Red Sea
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Sharqia"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Sharqia
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Sohag"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Sohag
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"South sinai"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              South sinai
            </label>
            <label className="custom-radio-container">
              <input type="radio" name="custom-radio" value="option3" onChange={()=>{
                settemp({...temp,country:"Suez"})
              }}/>
              <span className="custom-radio-checkmark"></span>
              Suez
            </label>
          </div>
      {/**list of cities*/}
        </Card>
        <div id='content'>
      {/**button open serach*/}
          <div className='buttonSearch'>
            <button className="button" onClick={changeHsearch}>
              <span className="span">🔎</span>
            </button>
          </div> 
      {/**button open serach*/}
      {/**card content main information for weather */}
          <Card className='card'>
            <Typography  component="div">
            {temp.country}
            </Typography>
            <Typography component="div">
              {temp.number?temp.number:<CircularProgress color="inherit"/>}ْ
            </Typography>
            <Typography  component="div" sx={{ mb: 1.5 ,color:"#eeeeee"}}>{temp.dec!==""?temp.dec:<CircularProgress color="inherit"/>}</Typography>
            <Typography variant="body2" sx={{fontWeight:"bold"}}  component="div">
              H:{temp.min?temp.min:<CircularProgress color="inherit"/>}ْ<Tab></Tab>L:{temp.max?temp.max:<CircularProgress color="inherit"/>}ْ
            </Typography>
          </Card>
      {/**card content main information for weather */}
      {/**button open detail*/}
          <Card sx={{ minWidth: 275 }} className='card2'>
            <button onClick={changeHdetail}>
              <span>view more detail</span>
            </button>
          </Card>
      {/**button open detail*/}
        </div>
        <Card className='details' style={{height:detail,overflow:"auto"}}>
      {/*button hide detail*/}
          <button onClick={changeHdetail}>
            <div></div>
            <div></div>
          </button>
      {/*button hide detail*/}
      {/*more detail*/}
          <Card className='cardOnDetails'>
            <Typography component="div">feels like: {temp.feels_like?temp.feels_like:<CircularProgress color="inherit"/>}ْ</Typography>
            <Typography component="div">temp max: {temp.temp_max?temp.temp_max:<CircularProgress color='inherit'/>}ْ</Typography>
            <Typography component="div">temp min: {temp.temp_min?temp.temp_min:<CircularProgress color='inherit'/>}ْ</Typography>
          </Card>
          <Card className='cardOnDetails'>
            <Typography component="div">speed wind: {temp.speed_wind?temp.speed_wind:<CircularProgress color='inherit'/>} KM</Typography>
            <Typography component="div">degree wind: {temp.degree_wind?temp.degree_wind:<CircularProgress color='inherit'/>}ْ</Typography>
          </Card>
          <Card className='cardOnDetails'>
            <Typography component="div">humidity: {temp.humidity?temp.humidity:<CircularProgress color='inherit'/>}%</Typography>
            <Typography component="div">pressure: {temp.pressure?temp.pressure:<CircularProgress color='inherit'/>} hPa</Typography>
            <Typography component="div">ground level: {temp.ground_level?temp.ground_level:<CircularProgress color='inherit'/>} hPa</Typography>
          </Card>
        </Card>
      {/*more detail*/}
      </div>
  )
}
export default App;