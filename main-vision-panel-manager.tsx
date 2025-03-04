import { useState } from "react"

export function MainVisionPanelManager() {
  const [vision, setVision] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [tempVision, setTempVision] = useState(vision)

  // Otevření režimu editace
  const startEditing = () => {
    setTempVision(vision)
    setIsEditing(true)
  }

  // Uložení změn
  const saveChanges = () => {
    setVision(tempVision)
    setIsEditing(false)
  }

  // Zrušení změn
  const cancelChanges = () => {
    setIsEditing(false)
  }

  return (
    <div className="bg-white text-foreground rounded-3xl border border-[#ddd] p-6 relative group">
      {!isEditing ? (
        <>
          <p className="text-3xl font-light leading-relaxed">
            {vision}
          </p>
          <button
            onClick={startEditing}
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full p-1 transition-opacity"
          >
            <img 
              src="https://res.cloudinary.com/drkudvyog/image/upload/v1740768653/Edit_icon_duha_fzk30m.png" 
              alt="Edit" 
              width="16" 
              height="16" 
            />
          </button>
        </>
      ) : (
        <div className="w-full">
          <textarea
            value={tempVision}
            onChange={(e) => setTempVision(e.target.value)}
            className="text-3xl font-light leading-relaxed w-full p-2 border border-purple-300 rounded-md bg-white"
            rows={4}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button 
              onClick={cancelChanges}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button 
              onClick={saveChanges}
              className="px-3 py-1 text-sm bg-[#5b06be] hover:bg-[#4a05a2] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
