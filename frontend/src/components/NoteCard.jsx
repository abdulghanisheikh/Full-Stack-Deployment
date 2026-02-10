export default function NoteCard({index,note,deleteNote,buttonRef,setIsEditClick,setNoteId}){

    return <div key={index} className="py-2 px-4 min-h-50 w-80 bg-zinc-900 flex flex-col gap-8 items-center justify-between cursor-pointer rounded-sm">
        <p className="text-2xl font-semibold">{note.title}</p>
        <p className="text-sm">{note.description}</p>

        <div className="flex gap-2 items-center justify-center">
            <button ref={buttonRef} onClick={deleteNote} className="bg-red-600 text-white hover:bg-red-500 duration-300 ease-in-out py-0.5 px-5 rounded-sm cursor-pointer">Delete</button>

            <button onClick={()=>{
                setIsEditClick(true);
                setNoteId(note._id);
            }} className="bg-yellow-600 text-white hover:bg-yellow-500 duration-300 ease-in-out py-0.5 px-5 rounded-sm cursor-pointer">Edit</button>
        </div>
    </div>
}