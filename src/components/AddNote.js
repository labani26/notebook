import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {

  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) => {

      e.preventDefault(); //for not reloading the page
      addNote (note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""}) // for empting the title, description and tag after Add Note
      props.showAlart("Added successfully", "success");
  }
  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value }) //for adding or updating note
  }

  
    return (
        <div>
            <div className='container my-3'>
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} /> 
                        {/* value={note.title} for empting the title after Add Note */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="ddescription" name='description' value={note.description} onChange={onChange} />
                        {/* value={note.title} for empting the description after Add Note */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                        {/* value={note.title} for empting the tag after Add Note */}
                    </div>
                   
                    {/* <button disable={ note.title.length<3 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}

                    <button disable={ note.title.length<3 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
            <div className='container my-3'>
            </div>
        </div>
    )
}

export default AddNote
