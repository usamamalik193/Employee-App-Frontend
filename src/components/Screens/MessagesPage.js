import React from "react";
import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesPage({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); //this is messageList useState
  const [messageListA, setMessageListA] = useState([
    //for testing purpose to check .map function in redering of texts, (it works)
    {
      _id: "6329d28d5bddc2c1cd4919ab",
      room: "sam",
      __v: 0,
    },
    {
      _id: "6329d75db6a3f90576bf3fd6",
      room: "sam",
      author: "sam",
      message: "sccw",
      time: "20:8",
      __v: 0,
    },
    {
      _id: "6329d829ed49d86fe8f53fea",
      room: "sam",
      author: "Admin",
      message: "yoo",
      time: "20:11",
      __v: 0,
    },
    {
      _id: "6329d889ed49d86fe8f53fec",
      room: "sam",
      author: "sam",
      message: "fcsc",
      time: "20:13",
      __v: 0,
    },
    {
      _id: "6329d895ed49d86fe8f53fee",
      room: "sam",
      author: "Admin",
      message: "dcfws",
      time: "20:13",
      __v: 0,
    },
    {
      _id: "6329d8a0ed49d86fe8f53ff0",
      room: "sam",
      author: "sam",
      message: "scsc",
      time: "20:13",
      __v: 0,
    },
    {
      _id: "6329d8a3ed49d86fe8f53ff2",
      room: "sam",
      author: "Admin",
      message: "dcvsec",
      time: "20:13",
      __v: 0,
    },
    {
      _id: "632aaf5ccd494db06382bca4",
      room: "sam",
      author: "sam",
      message: "dsvesd",
      time: "11:29",
      __v: 0,
    },
    {
      _id: "632aaf68cd494db06382bca7",
      room: "sam",
      author: "Admin",
      message: "hgnth",
      time: "11:30",
      __v: 0,
    },
    {
      _id: "632aaf7ecd494db06382bca9",
      room: "sam",
      author: "Admin",
      message: "scs",
      time: "11:30",
      __v: 0,
    },
  ]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      console.log(messageList);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    var arr1 = [];
    socket.on("joined", async (data) => {
      //let temp = data.map(obj=>({...obj}));
      arr1 = data;
      //let temp = Object.assign({}, ...data);

      //setMessageList((list) => [...list,temp]); //this not working...
      setMessageList([...messageList, arr1]); //this also not working...
      console.log("arrrr",arr1);

    });

    // console.log("test arry1", arr1);
    // setMessageList([...messageList, arr1]);
  }, [socket]);

  useEffect(() => {
    console.log("List Effect");
    console.log(messageList, "usama"); // this use effect is made to check state change of messageList but not woking..
  }, [messageList]);

  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Enter your message..."
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
