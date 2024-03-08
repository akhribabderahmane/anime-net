import "./App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const [room,setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {message,room});
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  const joinRoom=()=>{
       if(room!==""){
        socket.emit("join_room",room);
       }
  }

  return (
    <main className=" bg-slate-300 min-h-screen px-20">
       <div className=" flex flex-row pt-8 gap-4 w-full">
        <input
          placeholder="Number..."
          type="text"
          className=" outline-none border-2 border-teal-800 w-80 px-2 rounded-md "
          onChange={(e)=>setRoom(e.target.value)}
        />
        <button
          onClick={joinRoom}
          className=" px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-800 text-white"
        >
          join room
        </button>
      </div>
      <div className=" flex flex-row  pt-2 gap-4 w-full">
        <input
          placeholder="message..."
          type="text"
          className=" outline-none border-2 border-teal-800 w-80 px-2 rounded-md "
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className=" px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-800 text-white"
        >
          Send
        </button>
      </div>
      <div>
         <p className=" font-semibold text-3xl "> message received : {messageReceived}</p>
      </div>
    </main>
  );
}

export default App;
