import React from 'react'

const CreateNotes = ({heading, setHeading, inputText, setInputText, saveHandler, color, setColor}) => {
  const char = 200;
  const charLimit = char - inputText.length;
  return (
    <div 
      className='bg-white/10 backdrop-blur-[5px] shadow-[inset_-6px_-4px_2px_rgba(225,225,225,0.03)] rounded-[15px] border-[1.5px] border-white/30 text-white p-4 min-h-[140px] flex flex-col justify-between break-words'
      style={{ backgroundColor: color }}
    >
      <input
        type='text'
        placeholder='Heading...'
        maxLength={40}
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        className='bg-transparent border-none text-white font-semibold text-lg placeholder-white/70 focus:outline-none mb-2 border-b border-white/30 pb-1'
      />
      <textarea 
        cols={10}
        rows={5}
        placeholder='Type your note...'
        maxLength={200}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className='bg-transparent border-none text-white resize-none text-lg whitespace-pre-wrap placeholder-white focus:outline-none'
      >
      </textarea>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-sm'>{charLimit} Left</span>
        <input 
          type='color' 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          className='w-7 h-7 border-none rounded-md bg-transparent cursor-pointer p-0 color-yellow-400'
        />
        <button 
          className='bg-transparent transition duration-100 ease-in-out border-[1.5px] border-white rounded-[10px] text-white px-[10px] py-[4px] text-[13px] cursor-pointer hover:bg-white hover:text-[#4b1589]'
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateNotes