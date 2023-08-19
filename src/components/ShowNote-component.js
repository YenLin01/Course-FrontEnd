import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../services/note.service";

const ShowNoteComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [notedata, setNoteData] = useState(null);

  const [cancelID, setCancelID] = useState([]);
  const [saveDone, setSaveDone] = useState([]);
  const [Effect, setEffect] = useState(false);

  useEffect(() => {
    let _id;

    if (currentUser) {
      _id = currentUser.user._id;
      noteService.get(_id).then((data) => {
        setNoteData(data.data);
      });
    }
  }, [Effect]);

  function checkDate(month, date, state) {
    let time = new Date();
    const currentTime = (time.getMonth() + 1) * 100 + time.getDate();
    const currentDate = month * 100 + date;

    if (currentDate < currentTime && !state) {
      return "noteExpired";
    }
  }

  const Navhandler = () => {
    navigate("postnote");
  };

  const deleteHandler = (e) => {
    let noteID = e.target.id;
    noteService.deleteNote(noteID).then(() => {
      setEffect(!Effect);
    });
  };

  const doneHandler = (e) => {
    let todoItem = e.target.parentElement;
    let noteID = e.target.id;
    console.log(todoItem.classList);

    todoItem.classList.toggle("done");

    if (Object.values(todoItem.classList).some((item) => item == "done")) {
      setSaveDone(saveDone.concat(noteID));
      setCancelID(cancelID.filter((data) => data !== noteID));
    } else {
      setCancelID(cancelID.concat(noteID));
      setSaveDone(saveDone.filter((data) => data !== noteID));
    }
  };

  const changedoneState = (e) => {
    noteService.updateStateDone(saveDone).then(setEffect(!Effect));
    noteService.cancelDone(cancelID).then(setEffect(!Effect));
    window.alert("更改完成");
    setSaveDone([]);
    setCancelID([]);
  };

  return (
    <div>
      {currentUser && (
        <button className="btn notebutton" onClick={Navhandler}>
          新增筆記
        </button>
      )}
      {currentUser && (saveDone.length !== 0 || cancelID.length !== 0) && (
        <div style={{ marginLeft: "1rem" }}>
          確認更改?
          <button className="btn notebutton" onClick={changedoneState}>
            確定
          </button>
        </div>
      )}

      {currentUser && notedata && notedata.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {notedata.map((note, index) => {
            return (
              <div
                key={index}
                className="card"
                style={{ width: "18rem", margin: "1rem " }}
              >
                <div
                  style={{ height: "17rem" }}
                  className={`card-body ${note.state}  ${checkDate(
                    note.TodoDate.month,
                    note.TodoDate.date,
                    note.state
                  )} `}
                >
                  <div style={{ height: "80%" }}>
                    <h5 style={{ height: "25%" }} className="card-title ">
                      記事標題:{note.title}
                    </h5>

                    <p
                      style={{ height: "45%", margin: "0.5rem 0rem" }}
                      className="card-text"
                    >
                      {note.content}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      預定完成日期: {note.TodoDate.month}/{note.TodoDate.date}
                    </p>
                  </div>

                  <button
                    id={note._id}
                    style={{ marginRight: "1rem" }}
                    className="btn btn-danger"
                    onClick={deleteHandler}
                  >
                    delete
                  </button>
                  <button
                    id={note._id}
                    type="button"
                    className="btn btn-success"
                    onClick={doneHandler}
                  >
                    done
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowNoteComponent;
