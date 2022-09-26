import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import io from "socket.io-client";
//import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import MessagesPage from "./MessagesPage";
import Navbar from "../navBar";
import axios from "../../api/axios";

function ChatPage(props) {
  const { auth } = useAuth();
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [usersTable, setUsersTable] = useState([]);
  const [userRole, setUserRole] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  

  let config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  const socket = io("http://localhost:8080", {
    extraHeaders: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });
  
  const toggle = async (name) => {
    //e.preventDefault();
    setModal(!modal);
    if (name !== "") {
      //const userData = { userName: username, joinedRoom: room };
      setRoom(name);
      if (auth?.roles?.includes(1000)) { setUsername("Admin")} else{setUsername(name)}
      await socket.emit("join_room", name);
    }
  };

  const currentUser=auth.name;

  // useEffect(() => {
   

  //   const joinRoom = () => {
  //     if (username !== "" && room !== "") {
  //       const userData = { userName: username, joinedRoom: room };
  //       socket.emit("join_room", room);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (auth?.roles?.includes(1000)) {
      axios.get("/users", config).then((res) => {
        setUsersTable(res.data);
        setUserRole(true);
      });
    }

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Page">
      <Navbar />
      <div className="ChatApp">
        {userRole ? (
          <Table>
            <thead>
              <tr>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {usersTable &&
                usersTable.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.firstName}</td>
                      <td>
                        {/* <Form inline onSubmit={(e) => e.preventDefault()}> */}
                        <Button color="danger" onClick={()=>toggle(item.firstName)}>
                          Start Chat
                        </Button>
                        {/* </Form> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <Button color="danger" onClick={()=>toggle(currentUser)}>
            Start chat with Admin
          </Button>
        )}

        <Modal
          isOpen={modal}
          toggle={toggle}
          className={className}
          backdrop={"static"}
        >
          <ModalHeader toggle={toggle}>Chat </ModalHeader>
          <ModalBody>
            <div>
              {/* {userRole ? ( */}
              {/* <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                      type="text"
                      placeholder="User ID"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Room"
                      onChange={(e) => {
                        setRoom(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        e.key === "Enter" && joinRoom();
                      }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                  </div> */}

              <MessagesPage
                username={username}
                room={room}
              />
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default ChatPage;
