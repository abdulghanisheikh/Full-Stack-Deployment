import { useState,useEffect,useRef } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

export default function App(){
  const [notes,setNotes]=useState([]);
  const [isEditClick,setIsEditClick]=useState(false);
  const [data,setData]=useState({
    title:"",
    description:""
  });
  const [loading,setLoading]=useState(false);
  const [noteId,setNoteId]=useState("");
  const [editDescription,setEditDescription]=useState("");

  const submitButtonRef=useRef(null);
  const deleteButtonRef=useRef(null);
  const updateButtonRef=useRef(null);
  const BASE_URL=import.meta.env.VITE_BASE_URL||"http://localhost:3000";

  async function fetchNotes(){
    setLoading(true);
    try{
      const res=await axios.get(`${BASE_URL}/api/notes`);
      const {success,message,notes}=res.data;
      
      if(success) setNotes(notes);
      else console.log(message);
    }
    catch(err){
      console.log("Error:",err.message);
    }
    finally{
      setLoading(false);
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    const btn=submitButtonRef.current;

    if(btn){
        btn.disabled=true;
        btn.classList.remove("cursor-pointer","active:scale-90","hover:bg-blue-500");
        btn.classList.add("opacity-50");
        btn.innerText="Creating...";
    }

    try{
      const {title,description}=data;

      await axios.post(`${BASE_URL}/api/notes`,{
        title,
        description
      });

      setData({ title:"",description:"" });
      fetchNotes();
    }
    catch(err){
      console.log(err.message);
    }
    finally{
      btn.disabled=false;
      btn.innerText="Create Note"
      btn.classList.add("cursor-pointer","active:scale-90","hover:bg-blue-500");
      btn.classList.remove("opacity-50");
    }
  }

  async function deleteNote(noteId){
    const btn=deleteButtonRef.current;

    if(btn){
      btn.disabled=true;
      btn.classList.add("opacity-50");
      btn.classList.remove("hover:bg-red-500","cursor-pointer");
      btn.innerText="Deleting...";
    }

    try{
      await axios.delete(`${BASE_URL}/api/notes/${noteId}`);
      fetchNotes();
    }
    catch(err){
      console.log("Error:",err.message);
    }
    finally{
      btn.disabled=false;
      btn.classList.remove("opacity-50");
      btn.classList.add("hover:bg-red-500","cursor-pointer");
      btn.innerText="Delete";
    }
  }

  async function handleUpdate(){
    setLoading(true);
    const btn=updateButtonRef.current;

    if(btn){
      btn.disabled=true;
      btn.innerText="Updating...";
      btn.classList.remove("cursor-pointer","hover:bg-yellow-500");
      btn.classList.add("opacity-50");
    }

    try{
      await axios.patch(`${BASE_URL}/api/notes/${noteId}`,{
        description:editDescription
      });

      setEditDescription("");
      fetchNotes();
    }
    catch(err){
      console.log("Error:",err.message);
    }
    finally{
      setLoading(false);
      btn.disabled=false;
      btn.innerText="Update";
      btn.classList.add("cursor-pointer","hover:bg-yellow-500");
      btn.classList.remove("opacity-50");
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[]);

  return <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center gap-3 relative">

    <div className="flex flex-col py-5 px-10 w-full gap-3">
      {/* heading */}
      <h1 className="text-5xl underline">Notes</h1>

      {/* form for creating note */}
      <form onSubmit={(e)=>handleSubmit(e)} className="flex lg:flex-row gap-3 w-full flex-col justify-center items-center lg:justify-start lg:items-start">

        <input type="text" onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} placeholder="title" value={data.title} name="title" className="outline-none lg:w-1/3 w-full px-4 lg:py-3 py-1 rounded-md bg-zinc-900"/>
        
        <textarea type="text" onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} placeholder="description" value={data.description} name="description" className="outline-none bg-zinc-900 px-4 lg:w-1/3 w-full rounded-md"/>

        <button ref={submitButtonRef} type="submit" className="bg-blue-600 hover:bg-blue-500 rounded-sm cursor-pointer text-white px-3 py-0.5 shadow-md shadow-black/50 hover:shadow-none duration-300 ease-in-out mt-5 active:scale-90 w-50">Create Note</button>
      </form>

    </div>

    {/* container for notes */}
    <div className="flex flex-wrap gap-3 px-10 py-5 w-full">

      {/* loader for notes */}
      {
        loading&&<div className="w-full py-5 flex justify-center">
          <p className="text-white">Loading data...</p>
        </div>
      }

      {/* form for updating note */}
      {
        isEditClick&&(
          <>
            <div onClick={()=>{
              setIsEditClick(false);
              setEditDescription("");
            }} className="absolute inset-0 bg-black/10 bg-opacity-1/2 backdrop-blur-lg min-h-screen w-full"></div>

            <div className="flex flex-col items-center gap-2 absolute z-10 top-1/2 left-1/2 -translate-1/2">
              <h1 className="text-4xl">Update note</h1>

              <form className="py-4 px-3 min-h-70 w-80 flex flex-col gap-3 justify-between items-center rounded-md bg-zinc-900 text-white cursor-pointer">
                <textarea type="text" name="editDescription" value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} placeholder="description" className="w-full border-none outline-none flex-1 px-2 py-1 rounded-md text-md bg-black"/>

                <button ref={updateButtonRef} className={`bg-yellow-600 text-white hover:bg-yellow-500 duration-300 ease-in-out py-0.5 px-5 rounded-sm cursor-pointer ${editDescription.trim()===""&&'cursor-not-allowed opacity-50'}`} onClick={()=>{
                  handleUpdate();
                  setIsEditClick(false);
                }}>Update</button>
              </form>
            </div>
          </>
        )
      }

      {
        notes.length>0?(
          notes.map((note,index)=>{
            return <NoteCard setIsEditClick={setIsEditClick} setNoteId={setNoteId} buttonRef={deleteButtonRef} deleteNote={()=>deleteNote(note._id)} index={index} note={note} deleteRef={deleteButtonRef} />
          })
      ):!loading&&(
        <div className="w-full py-5 px-10 bg-red-500/10">
          <p className="text-white">No notes yet.</p>
        </div>
      )
      }
    </div>
  
  </div>
}