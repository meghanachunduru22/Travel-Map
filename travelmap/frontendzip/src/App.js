// import "./app.css";
// import * as React from "react";
// import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useEffect, useState } from "react";
// import { Room, Star, StarBorder } from "@material-ui/icons";
// import axios from "axios";
// import {format} from "timeago.js";
// import Register from "./components/Register";
// import Login from "./components/Login";

// function App() {
//   const myStorage = window.localStorage;
//   const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
//   //   myStorage.getItem("user")
//   // );
//   const [pins, setPins] = useState([]);
//   const [currentPlaceId, setCurrentPlaceId] = useState(null);
//   const [newPlace, setNewPlace] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [desc, setDesc] = useState(null);
//   const [star, setRating] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [showLogin, setShowLogin] = React.useState(true);
//   const [viewport, setViewport] = useState({
//     latitude: 47.040182,
//     longitude: 17.071727,
//     zoom: 4,
//   });

//   useEffect(()=>{
//     const getPins = async ()=>{
//       try{
//         const res = await axios.get("/pins")
//         setPins(res.data);
//         console.log(res.data,"res");
//       }catch(err){
//         console.log(err)
//       }
//     };
//     getPins()
//   },[])


//   const handleMarkerClick = (id,lat,long)=>{
//     setCurrentPlaceId(id)
//     // setViewport({...viewport, latitude:lat,longitude:long})
//   }

//   const handleAddClick = (e)=>{
//     console.log(e.lngLat.lng,"lat lng")
//     // const longitude = e.lngLat.lng;
 
//     setNewPlace({
//       lat:e.lngLat.lat,
//       long:e.lngLat.lng,
//     });
//   };

//   const handleLogout = ()=>{
//     myStorage.removeItem("user");
//     setCurrentUser(null);
//   }
  

//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     const newPin = {
//       username:currentUser,
//       title,
//       desc,
//       // rating,
//       lat:newPlace.lat,
//       long:newPlace.long,

//     }
//     try{
//       const res = await axios.post("/pins",newPin);
//       setPins([...pins,res.data]);
//       setNewPlace(null);
//     }catch(err){
//       console.log(err);
//     }
//   }

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//     <Map
//       mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
//       initialViewState={{
//         longitude: 17.071727,
//         latitude: 47.040182,
//         zoom: 4,
//       }}
//       style={{ width: "100vw", height: "100vh" }}
//       mapStyle="mapbox://styles/mapbox/streets-v9"
//       onDblClick={handleAddClick}
      
//     >

//       {pins.map(p=>(

//      <>

//       <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
//         <Room
//           style={{
//             fontSize: 7 * viewport.zoom,
//             color: p.username === currentUser ? "tomato" : "slateblue",
//             cursor: "pointer",

//           }}
//           onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
//         />  
//       </Marker>
//       {p._id === currentPlaceId && (
//       <Popup
//         latitude={p.lat}
//         longitude={p.long}
//         closeButton={true}
//         closeOnClick={false}
//         onClose={() => setCurrentPlaceId(null)}
//         anchor="left"
//       >
//         <div className="card">
//             <label>Place</label>
//             <h4 className="place">{p.title}</h4>
//             <label>Review</label>
//             <p className="desc">{p.desc}</p>
//             <label>Rating</label>
//             <div className="stars">
//               {Array(p.rating).fill(<Star className="star"/>)}

//             </div>
//             <label>Information</label>
//             <span className="username">
//               Created by <b>{p.username}</b>
//             </span>
//             <span className="date">
//               Updated {format(p.updatedAt)}</span>
//           </div>
//       </Popup>
//      )}
//     </> 
//     ))}

//     {newPlace && (
//     <Popup
//         latitude={newPlace.lat}
//         longitude={newPlace.long}
//         closeButton={true}
//         closeOnClick={false}
//         onClose={() => setCurrentPlaceId(null)}
//         anchor="left"
//       >
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label>Title</label>
//           <input 
//           placeholder="Enter a title"
//           onChange={(e)=>setTitle(e.target.value)}
//           />
//           <label>Review</label>
//           <textarea 
//           placeholder="Say us something about this place."
//           onChange={(e)=>setDesc(e.target.value)}
//           />
//           <label>Rating</label>
//           <select onChange={(e)=>setRating(e.target.value)}>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//           </select>
//           <button className="submitButton" type="submit">Add Pin</button>
//         </form>
//       </div>
//       </Popup>
//       )}
//       {currentUser ? (<button className="button logout" onClick={handleLogout}>Log out</button>):(     
//       <div className="buttons">
//         <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>
//         <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
//       </div>
//       )}
//     {showRegister && <Register setShowRegister = {setShowRegister}/>} 
//     {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>} 
    
//     </Map>
//     </div>

//   );
// }

// export default App;


import "./app.css";
import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  //   myStorage.getItem("user")
  // );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = React.useState(true);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [showInfo,setShowInfo] = useState(null);

  useEffect(()=>{
    const getPins = async ()=>{
      try{
        const res = await axios.get("/pins")
        setPins(res.data);
        console.log(res.data,"res");
      }catch(err){
        console.log(err)
      }
    };
    getPins()
  },[])


  const handleMarkerClick = (id,lat,long)=>{
    setCurrentPlaceId(id)
    // setViewport({...viewport, latitude:lat,longitude:long})
  }

  const handleAddClick = (e)=>{
    console.log(e.lngLat.lng,"lat lng")
    // const longitude = e.lngLat.lng;
 
    setNewPlace({
      lat:e.lngLat.lat,
      long:e.lngLat.lng,
    });
  };

  const handleLogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
  }
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      // rating,
      lat:newPlace.lat,
      long:newPlace.long,

    }
    try{
      const res = await axios.post("/pins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 17.071727,
        latitude: 47.040182,
        zoom: 4,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
      
    >

      {pins.map(p=>(

     <>

      <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
        <Room
          style={{
            fontSize: 7 * viewport.zoom,
            color: p.username === currentUser ? "tomato" : "slateblue",
            cursor: "pointer",

          }}
          onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
        />  
      </Marker>
      {p._id === currentPlaceId && (
      <Popup
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setCurrentPlaceId(null)}
        anchor="left"
      >
        <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(p.rating).fill(<Star className="star"/>)}

            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>{p.username}</b>
            </span>
            <span className="date">
              Updated {format(p.updatedAt)}</span>
          </div>
      </Popup>
     )}
    </> 
    ))}

    {newPlace && (
    <Popup
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setCurrentPlaceId(null)}
        anchor="left"
      >
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input 
          placeholder="Enter a title"
          onChange={(e)=>setTitle(e.target.value)}
          />
          <label>Review</label>
          <textarea 
          placeholder="Say us something about this place."
          onChange={(e)=>setDesc(e.target.value)}
          />
          <label>Rating</label>
          <select onChange={(e)=>setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="submitButton" type="submit">Add Pin</button>
        </form>
      </div>
      </Popup>
      )}
      {currentUser ? (<button className="button logout" onClick={handleLogout}>Log out</button>):(     
      <div className="buttons">
        <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>
        <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
      </div>
      )}

    {/* <button className="info" onClick={handleInfo}>TRAVEL MAP</button> */}

    {showRegister && <Register setShowRegister = {setShowRegister}/>} 
    {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>} 
    
    </Map>
    </div>

  );
}

export default App;