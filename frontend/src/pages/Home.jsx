import React, { useEffect, useState } from "react";
import { Create, Read, Delete, Edit } from "../services/actions/crud";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsediting] = useState("");
  const [taskComplete, setTaskcomplete] = useState([]);

  const AddTodo = () => {
    Create(text, setData);
    setText("");
  };

  const DeleteTodo = (id) => {
    Delete(id, setData);
  };

  const EditTodo = (item) => {
    setIsediting(item);
    setText(item.task);
  };

  const SaveEdit = () => {
    Edit(isEditing._id, text, setData);
    setIsediting("");
    setText("");
  };

  useEffect(() => {
    Read(setData);
  }, []);


  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Todo List
        </h1>

        {/* Input Section */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={!isEditing ? AddTodo : SaveEdit}
            disabled={text.trim() === ""}
            className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 flex items-center gap-2"
          >
            <FiPlus /> {!isEditing ? "Add" : "Update"}
          </button>
        </div>

        {/* Todo Items */}
        <ul className="space-y-3">
          {data &&
            data.map((item, index) => (
              <li
                key={item._id}
                className={`flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm ${taskComplete.includes(item._id)?'opacity-50':''}`}
              >
                <div className="flex items-center gap-2 relative">
                  <input
                    className="z-50"
                    type="checkbox"
                    onClick={(e) =>
                      e.target.checked
                        ? setTaskcomplete((prev) => [...prev, item._id])
                        : setTaskcomplete((prev) =>
                            prev.filter((d) => d !== item._id)
                          )
                    }
                  />
                  <span className="text-gray-700">
                    {index + 1}. {item.task}

                  </span>
                  {taskComplete&&taskComplete.includes(item._id)&&
                  <span className="w-full h-[1px] bg-black absolute right-0"></span>
                  }
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => EditTodo(item)}
                    className="text-yellow-500 hover:text-yellow-700 transition duration-200 flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => DeleteTodo(item._id)}
                    className="text-red-500 hover:text-red-700 transition duration-200 flex items-center gap-1"
                  >
                    <FiTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
