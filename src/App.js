import './App.css';
import { useState, useEffect, useReducer, lazy, Suspense } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import FunApi from './FunApi';

const Modal = lazy(() => import('./Modal')); 

function App() {
  const [detail, setDetail] = useState("0");
  const [search, setSearch] = useState("0");
  const [api, dispatch] = useReducer(FunApi, "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=4ffbfa8485a95042fd73469dca85c095");
  const [temp, setTemp] = useState({
    number: null, min: null, max: null, dec: "", feels_like: null,
    temp_max: null, temp_min: null, speed_wind: null, degree_wind: null,
    humidity: null, ground_level: null, pressure: null, icon: "", country: "Cairo"
  });
  const [openOrHidden, setOpenOrHidden] = useState({ view: "none", msg: "" });
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isDay, setIsDay] = useState(null);

  useEffect(() => {
    /**function for background in night or day */
    const setDayTimeBackground = () => {
      const isDayTime = () => {
        const currentHour = new Date().getHours();
        return currentHour >= 6 && currentHour < 18;
      };
      setIsDay(isDayTime());
    };
    setDayTimeBackground();
    /**function for background in night or day */

    /**function for finding lat and lon user location */
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          },
          (error) => {
            console.error("Geolocation Error:", error.message);
          }
        );
      } else {
        setOpenOrHidden({ view: "", msg: "The browser does not support location determination" });
      }
    };
    getLocation();
    /**function for finding lat and lon user location */
  }, []);

  /*function for change Height detail*/
  const changeDetailHeight = () => {
    setDetail(prev => prev === "0" ? "100%" : "0");
  };

  /*function for change Height search*/
  const changeSearchHeight = () => {
    setSearch(prev => prev === "0" ? "100%" : "0");
  };

  useEffect(() => {
    /**function for api temp */
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(api);
        setTemp(prev => ({
          ...prev,
          number: Math.round(response.data.main.temp - 272.15),
          min: Math.round(response.data.main.temp_min - 272.15),
          max: Math.round(response.data.main.temp_max - 272.15),
          dec: response.data.weather[0].description,
          feels_like: +(response.data.main.feels_like - 272.15).toFixed(2),
          temp_max: +(response.data.main.temp_max - 272.15).toFixed(2),
          temp_min: +(response.data.main.temp_min - 272.15).toFixed(2),
          speed_wind: +(response.data.wind.speed * 3.16).toFixed(2),
          degree_wind: response.data.wind.deg,
          humidity: response.data.main.humidity,
          ground_level: response.data.main.grnd_level,
          pressure: response.data.main.pressure,
          icon: response.data.weather[0].icon,
        }));
      } catch (error) {
        if (error.message === "Network Error") {
          setOpenOrHidden({ view: "", msg: "You are not connected to the internet" });
        } else {
          setOpenOrHidden({ view: "", msg: "Sorry, there is a problem with fetching the weather data." });
        }
      }
    };
    fetchWeatherData();
    /**function for api temp */
  }, [api]);

  return (
    <div style={{ backgroundSize: "100% 100%", width: "100%", height: "100%" }} className={isDay ? 'daytime' : 'nighttime'}>
      {/*img for icon*/}
      <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt='' loading="lazy" />
      {/*img for icon*/}
      
      {/*modal error*/}
      <Suspense fallback={<div>Loading...</div>}>
        <Modal view={openOrHidden.view} message={openOrHidden.msg} />
      </Suspense>
      {/*modal error*/}
      
      {/* Search Section */}
      <Card className="search" style={{ height: search, width: "100%" }}>
        {/*button hide search*/}
        <button onClick={() => {
          if (temp.country === "your location" && location.latitude !== null) {
            changeSearchHeight();
            dispatch({ type: temp.country, payload: { latitude: location.latitude, longitude: location.longitude } });
          } else if (temp.country === "your location" && location.latitude === null) {
            setOpenOrHidden({ view: "", msg: "We cannot locate you" });
          } else {
            changeSearchHeight();
            dispatch({ type: temp.country });
          }
        }}>
          <div></div><div></div>
        </button>
        {/* Cities List */}
        <div className="custom-radio-group" style={{ overflow: "auto", marginTop: "20px", direction: "ltr" }}>
          {[
            "your location", "Alex", "Aswan", "Beheira", "Beni Suef", "Port Said", "Cario", "Dakahalia",
            "Damietta", "Fakous", "Faiyam", "Gharbia", "Giza", "Ismailia", "Kafr el sheikh", "Luxor", "Monufia",
            "Matrouh", "Minya", "North Sinai", "New Valley", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag",
            "South sinai", "Suez"
          ].map(city => (
            <label key={city} className="custom-radio-container">
              <input type="radio" name="custom-radio" onChange={() => setTemp(prev => ({ ...prev, country: city }))} />
              <span className="custom-radio-checkmark"></span>
              {city}
            </label>
          ))}
        </div>
        {/* Cities List */}
      </Card>
      {/* Search Section */}

      <div id="content">
        {/*button open search*/}
        <div className="buttonSearch">
          <button className="button" onClick={changeSearchHeight}>
            <span className="span">🔎</span>
          </button>
        </div>
        {/* Weather Info Card */}
        <Card className="card">
          <Typography component="div">{temp.country}</Typography>
          <Typography component="div">
            {temp.number !== null ? temp.number : <CircularProgress color="inherit" />}ْ
          </Typography>
          <Typography component="div" sx={{ mb: 1.5, color: "#eeeeee" }}>
            {temp.dec !== "" ? temp.dec : <CircularProgress color="inherit" />}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }} component="div">
            H:{temp.min !== null ? temp.min : <CircularProgress color="inherit" />}ْ L:{temp.max !== null ? temp.max : <CircularProgress color="inherit" />}ْ
          </Typography>
        </Card>
        {/* Weather Info Card */}

        {/*button open detail*/}
        <Card sx={{ minWidth: 275 }} className="card2">
          <button onClick={changeDetailHeight}>
            <span>View more details</span>
          </button>
        </Card>
        {/*button open detail*/}
      </div>

      {/* Detail Section */}
      <Card className="details" style={{ height: detail, overflow: "auto" }}>
        {/*button hide detail*/}
        <button onClick={changeDetailHeight}>
          <div></div><div></div>
        </button>
        {/* Weather Detail Info */}
        <Card className="cardOnDetails">
          <Typography component="div">Feels like: {temp.feels_like !== null ? temp.feels_like : <CircularProgress color="inherit" />}ْ</Typography>
          <Typography component="div">Temp max: {temp.temp_max !== null ? temp.temp_max : <CircularProgress color="inherit" />}ْ</Typography>
          <Typography component="div">Temp min: {temp.temp_min !== null ? temp.temp_min : <CircularProgress color="inherit" />}ْ</Typography>
        </Card>
        <Card className="cardOnDetails">
          <Typography component="div">Speed wind: {temp.speed_wind !== null ? temp.speed_wind : <CircularProgress color="inherit" />} KM</Typography>
          <Typography component="div">Degree wind: {temp.degree_wind !== null ? temp.degree_wind : <CircularProgress color="inherit" />}ْ</Typography>
        </Card>
        <Card className="cardOnDetails">
          <Typography component="div">Humidity: {temp.humidity !== null ? temp.humidity : <CircularProgress color="inherit" />}%</Typography>
          <Typography component="div">Pressure: {temp.pressure !== null ? temp.pressure : <CircularProgress color="inherit" />} hPa</Typography>
          <Typography component="div">Ground level: {temp.ground_level !== null ? temp.ground_level : <CircularProgress color="inherit" />} hPa</Typography>
        </Card>
        {/* Weather Detail Info */}
      </Card>
      {/* Detail Section */}
    </div>
  );
}

export default App;