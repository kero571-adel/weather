export default function FunApi(state,action){
    switch(action.type){
        case "your location":
            return `https://api.openweathermap.org/data/2.5/weather?lat=${action.payload.latitude}&lon=${action.payload.longitude}&appid=4ffbfa8485a95042fd73469dca85c095`;
        case "Cario":
          return "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=4ffbfa8485a95042fd73469dca85c095";
        case "Fakous":
          return "https://api.openweathermap.org/data/2.5/weather?lat=30.566667&lon=31.833333&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "Alex":
          return "https://api.openweathermap.org/data/2.5/weather?lat=31.2000924&lon=29.9187387&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "Aswan":
            return "https://api.openweathermap.org/data/2.5/weather?lat=24.088938&lon=32.8998293&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Asyut":
            return "https://api.openweathermap.org/data/2.5/weather?lat=&lon=30.0444&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Dakahalia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=31.05&lon=31.3833&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Faiyam":
            return "https://api.openweathermap.org/data/2.5/weather?lat=29.3084021&lon=30.8428497&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Gharbia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.867&lon=31.028&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Giza":
            return "https://api.openweathermap.org/data/2.5/weather?lat=29.98&lon=31.21&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "Ismailia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.5964923&lon=32.2714587&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "Kafr el sheikh":
            return "https://api.openweathermap.org/data/2.5/weather?lat=31.3&lon=30.93&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Luxor":
            return "https://api.openweathermap.org/data/2.5/weather?lat=25.6872431&lon=32.6396357&appid=4ffbfa8485a95042fd73469dca85c095";           
        case "Monufia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.454228&lon=31.045688&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "North Sinai":
            return "https://api.openweathermap.org/data/2.5/weather?lat=31.29&lon=32.34&appid=4ffbfa8485a95042fd73469dca85c095";         
        case "Sohag":
            return "https://api.openweathermap.org/data/2.5/weather?lat=26.55705&lon=31.46859&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "South sinai":
            return "https://api.openweathermap.org/data/2.5/weather?lat=29.0552778&lon=33.9116667&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Qalyubia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.1875&lon=31.2008&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Beheira":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.5667&lon=30.2167&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Damietta":
            return "https://api.openweathermap.org/data/2.5/weather?lat=31.4167&lon=31.8167&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Port Said":
            return "https://api.openweathermap.org/data/2.5/weather?lat=31.2564&lon=32.2842&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Suez":
            return "https://api.openweathermap.org/data/2.5/weather?lat=29.9737&lon=32.5547&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Beni Suef":
            return "https://api.openweathermap.org/data/2.5/weather?lat=29.0795&lon=31.0968&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Minya":
            return "https://api.openweathermap.org/data/2.5/weather?lat=28.1167&lon=30.7167&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Qena":
            return "https://api.openweathermap.org/data/2.5/weather?lat=26.1667&lon=32.7167&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "New Valley":
            return "https://api.openweathermap.org/data/2.5/weather?lat=25.0000&lon=28.5000&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Matrouh":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.7000&lon=25.5000&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Red Sea":
            return "https://api.openweathermap.org/data/2.5/weather?lat=26.0000&lon=34.0000&appid=4ffbfa8485a95042fd73469dca85c095";            
        case "Sharqia":
            return "https://api.openweathermap.org/data/2.5/weather?lat=30.5853&lon=31.4958&appid=4ffbfa8485a95042fd73469dca85c095";            
        default:
        console.log("unknown"); 
    }
}