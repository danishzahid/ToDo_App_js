import "./styles.css";
import { useState } from "react";
const buttonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "0 10px"
};

export default function App() {
  const [activeCard, setActiveCard] = useState("toDo");
  return (
    <div className="App">
      <h1>Practice App</h1>
      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center"
        }}
      >
        <button onClick={() => setActiveCard("toDo")}>ToDo App</button>
        <button onClick={() => setActiveCard("office")}>Office Tasks</button>
      </div>
      {activeCard === "toDo" && <MyToDoCard />}
      {activeCard === "office" && <OfficeCard />}
    </div>
  );
}

const MyToDoCard = () => {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [activeState, setActiveState] = useState("all");

  //console.log(activeState);

  let filteredData = [];
  filteredData = toDos.filter((item) => {
    console.log("hi");
    if (activeState === "all") {
      console.log(item);
      return item;
    }
    if (activeState === "checked") {
      return item.checked;
    }
    if (activeState === "remaining") {
      return !item.checked;
    }
  });

  console.log(toDos);
  console.log(filteredData);

  const handleCut = (item) => {
    let updated = toDos.filter((i) => {
      if (i.name === item.name) {
        return false;
      } else {
        return true;
      }
    });
    setToDos([...updated]);
  };

  // let temp = [
  //   {
  //     name: "workout",
  //     id: "workout4",
  //     checked: false
  //   },
  //   {
  //     name: "gotogym",
  //     id: "gotogym4",
  //     checked: false
  //   }
  // ];

  return (
    <>
      <h1>My ToDo</h1>
      <input
        type="text"
        onChange={(e) => {
          setToDo(e.target.value); // todo = workout
        }}
        value={toDo}
      />
      <button
        onClick={() => {
          // todo = "gotogym"
          setToDos([
            {
              name: toDo, // gotogym
              id: toDo + 4,
              checked: false
            },
            ...toDos // [{}]
          ]); // todos = [{}]
          setToDo("");
        }}
      >
        Add Task
      </button>
      <h5>
        {activeState === "all"
          ? "Total"
          : activeState === "remaining"
          ? "Reamaining"
          : "Checked"}{" "}
        Tasks {filteredData.length}
      </h5>
      <button
        style={buttonStyle}
        onClick={() => {
          setActiveState("all");
        }}
      >
        All
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          setActiveState("checked");
        }}
      >
        Checked
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          setActiveState("remaining");
        }}
      >
        Remaining
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          let updatedArray = toDos.filter((item) => !item.checked);
          setToDos([...updatedArray]);
        }}
      >
        Clear Checked
      </button>
      <ul>
        {filteredData.map((item, index) => {
          return (
            <li
              key={item.id}
              style={{
                textDecoration: item.checked ? "line-through" : "none"
              }}
            >
              <input
                type="checkBox"
                checked={item.checked} // false
                onChange={(e) => {
                  //console.log(e.target.checked);
                  console.log(item);
                  let updated = toDos.map((i) => {
                    if (i.name === item.name) {
                      return {
                        ...i,
                        checked: !i.checked // false | true
                      };
                    } else {
                      return i;
                    }
                  });

                  setToDos([...updated]);
                }}
              />
              {item.name}
              <button style={buttonStyle} onClick={() => handleCut(item)}>
                Cut
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const OfficeCard = () => {
  return (
    <>
      <h1>Office Task</h1>
    </>
  );
};
