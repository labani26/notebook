import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";


// const NoteState = (props) => {

//For the sake of understanding of Context API and State
//     const s1 = {
//         "name": "Labani",
//         "class": 11
//     }
//     const [state, setState] = useState(s1);

//     const update = () => {
//         setTimeout(() => {
//             setState ({
//                 "name": "Lara",
//                 "class": 12
//             })
//         }, 2000);
//     }

//     return(
//         <NoteContext.Provider value={{state, update}}>

//             {props.children}

//         </NoteContext.Provider>
//     )

// }


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);


      // Get all Notes
      const getNotes = async () => {
        try {
            const response = await fetch(`${host}/note/fetchallnotes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
    
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };
    
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/note/addnote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
    
            const note = await response.json();
            setNotes(notes.concat(note));
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };
    
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/note/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
    
            await response.json();
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };
    
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/note/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
    
            const json = await response.json();
            const newNotes = notes.map(note => {
                if (note._id === id) {
                    return { ...note, title, description, tag };
                }
                return note;
            });
    
            setNotes(newNotes);
        } catch (error) {
            console.error("Failed to edit note:", error);
        }
    };
    

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;



// import React, { useState } from "react";
// import NoteContext from "./NoteContext";

// const NoteState = (props) => {
//     const host = "http://localhost:5000";
//     const notesInitial = [
//         {
//             "_id": "6696561721020ed7af9beaca",
//             "user": "6694de620f77041a69f46339",
//             "title": "My title",
//             "description": "My name is Sardar",
//             "tag": "personal",
//             "date": "2024-07-16T11:14:31.870Z",
//             "__v": 0
//         },
//         {
//             "_id": "6696568921020ed7af9beace",
//             "user": "6694de620f77041a69f46339",
//             "title": "My title",
//             "description": "My name is Sardar",
//             "tag": "personal",
//             "date": "2024-07-16T11:16:25.702Z",
//             "__v": 0
//         },
//         {
//             "_id": "6696568a21020ed7af9bead0",
//             "user": "6694de620f77041a69f46339",
//             "title": "My title",
//             "description": "My name is Sardar",
//             "tag": "personal",
//             "date": "2024-07-16T11:16:26.609Z",
//             "__v": 0
//         }
//     ];

//     const [notes, setNotes] = useState(notesInitial);

//     // Add a Note
//     const addNote = async (title, description, tag) => {
//         try {
//             const response = await fetch(${host}/note/addnote, {
//                 method: "POST",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NGRlNjIwZjc3MDQxYTY5ZjQ2MzM5In0sImlhdCI6MTcyMTEyODQ0OX0.       mArk_r8kXEfQ5gD_ePQS4pcpoxOc67qefhrbvfqmQv8'
//                 },
//                 body: JSON.stringify({ title, description, tag })
//             });

//             if (!response.ok) {
//                 throw new Error(HTTP error! Status: ${response.status});
//             }

//             const note = await response.json();
//             setNotes(notes.concat(note));
//         } catch (error) {
//             console.error("Failed to add note:", error);
//         }
//     };

//     // Delete Note
//     const deleteNote = async (id) => {
//         try {
//             await fetch(${host}/note/deletenote/${id}, {
//                 method: "DELETE",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'auth-token': localStorage.getItem("token")
//                 }
//             });

//             const newNotes = notes.filter((note) => note._id !== id);
//             setNotes(newNotes);
//         } catch (error) {
//             console.error("Failed to delete note:", error);
//         }
//     };

//     // Edit a Note
//     const editNote = async (id, title, description, tag) => {
//         try {
//             const response = await fetch(${host}/note/updatenote/${id}, {
//                 method: "PUT",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'auth-token': localStorage.getItem("token")
//                 },
//                 body: JSON.stringify({ title, description, tag })
//             });

//             if (!response.ok) {
//                 throw new Error(HTTP error! Status: ${response.status});
//             }

//             const json = await response.json();

//             const newNotes = notes.map(note => {
//                 if (note._id === id) {
//                     return { ...note, title, description, tag };
//                 }
//                 return note;
//             });

//             setNotes(newNotes);
//         } catch (error) {
//             console.error("Failed to edit note:", error);
//         }
//     };

//     return (
//         <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
//             {props.children}
//         </NoteContext.Provider>
//     );
// };

// export default NoteState;