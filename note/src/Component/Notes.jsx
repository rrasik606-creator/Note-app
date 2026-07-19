import React, { useEffect, useState } from 'react'
import CreateNotes from './CreateNotes'
import { v4 as uuid } from 'uuid'
import Note from './Note'

const DEFAULT_COLOR = 'rgba(225, 225, 225, 0.1)'

const Notes = () => {
  const [heading, setHeading] = useState("")
  const [inputText, setInputText] = useState("")
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [searchTerm, setSearchTerm] = useState("")

  const [notes, setNotes] = useState(() => {
    const data = JSON.parse(localStorage.getItem("notes"))
    return data || []
  })

  const [editToggle, setEditToggle] = useState(null)

  const editHandler = (id, noteHeading, text, noteColor) => {
    setEditToggle(id)
    setHeading(noteHeading || "")
    setInputText(text)
    setColor(noteColor || DEFAULT_COLOR)
  }

  const saveHandler = () => {
    if (editToggle) {
      setNotes(notes.map((note) =>
        note.id === editToggle
          ? { ...note, heading: heading, text: inputText, color: color }
          : note
      ))
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: uuid(), heading: heading, text: inputText, color: color }
      ])
    }

    setHeading("")
    setInputText("")
    setColor(DEFAULT_COLOR)
    setEditToggle(null)
  }

  const deleteHandler = (id) => {
    const newNotes = notes.filter(n => n.id !== id)
    setNotes(newNotes)
  }

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const filteredNotes = notes.filter((note) =>
    (note.heading || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        <input
          type='text'
          placeholder='Search by heading...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full bg-white/10 border-[1.5px] border-white/30 rounded-[10px] text-white px-3 py-2 placeholder-white/70 focus:outline-none'
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className='bg-transparent border-[1.5px] border-white rounded-[10px] text-white px-[10px] py-[8px] text-[13px] cursor-pointer hover:bg-white hover:text-[#4b1589]'
          >
            Clear
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4'>
        {
          editToggle === null && searchTerm === "" ? (
            <CreateNotes
              heading={heading}
              setHeading={setHeading}
              inputText={inputText}
              setInputText={setInputText}
              saveHandler={saveHandler}
              color={color}
              setColor={setColor}
            />
          ) : (
            <></>
          )
        }
        {
          filteredNotes.map((note) => (
            editToggle === note.id ? (
              <CreateNotes
                key={note.id}
                heading={heading}
                setHeading={setHeading}
                inputText={inputText}
                setInputText={setInputText}
                saveHandler={saveHandler}
                color={color}
                setColor={setColor}
              />
            ) : (
              <Note
                key={note.id}
                id={note.id}
                heading={note.heading}
                text={note.text}
                color={note.color}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
              />
            )
          ))
        }
      </div>

      {searchTerm && filteredNotes.length === 0 && (
        <p className='text-white/60 text-center mt-4'>No notes found with that heading.</p>
      )}
    </div>
  )
}

export default Notes