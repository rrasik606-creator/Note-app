import React from 'react'

const Note = ({id, heading, text, color, editHandler, deleteHandler}) => {
  return (
    <div 
      className='bg-white/10 backdrop-blur-[5px] shadow-[inset_-6px_-4px_2px_rgba(225,225,225,0.03)] rounded-[15px] border-[1.5px] border-white/30 text-white p-4 min-h-[140px] flex flex-col justify-between break-words'
      style={{ backgroundColor: color }}
    >
      <div>
        {heading && <h3 className='font-semibold text-lg mb-1 border-b border-white/30 pb-1'>{heading}</h3>}
        <div className='whitespace-pre-wrap'>{text}</div>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <button 
          className='bg-transparent transition duration-100 ease-in-out border-[1.5px] border-white rounded-[10px] text-white px-[10px] py-[4px] text-[13px] cursor-pointer hover:bg-white hover:text-[#4b1589]'
          onClick={() => deleteHandler(id)}
        >
          Delete
        </button>
        <button 
          className='bg-transparent transition duration-100 ease-in-out border-[1.5px] border-white rounded-[10px] text-white px-[10px] py-[4px] text-[13px] cursor-pointer hover:bg-white hover:text-[#4b1589]'
          onClick={() => editHandler(id, heading, text, color)}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default Note