import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function ChatRoomSelection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    room: "JavaScript",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, room } = formData;
    navigate(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div className="App">
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
        </header>
        <main className="join-main">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Room</label>
              <select
                name="room"
                id="room"
                onChange={handleInputChange}
                value={formData.room}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ChatRoomSelection;
