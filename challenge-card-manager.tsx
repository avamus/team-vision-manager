"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconSelector, availableIcons } from "./icon-selector"

export function ChallengeCardManager() {
  const [titleText, setTitleText] = useState("Current Challenge")
  const [challengeTitle, setChallengeTitle] = useState("What we're fighting against:")
  const [whyTitle, setWhyTitle] = useState("Why it matters:")
  const [challenge, setChallenge] = useState("Market saturation and fierce competition")
  const [why, setWhy] = useState("Overcoming this challenge will set us apart and secure our position as industry leaders.")
  const [headerIconId, setHeaderIconId] = useState("warning")
  const [showIconSelector, setShowIconSelector] = useState(false)

  // Stav pro editaci
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitleText, setTempTitleText] = useState(titleText)
  const [tempChallengeTitle, setTempChallengeTitle] = useState(challengeTitle)
  const [tempWhyTitle, setTempWhyTitle] = useState(whyTitle)
  const [tempChallenge, setTempChallenge] = useState(challenge)
  const [tempWhy, setTempWhy] = useState(why)
  const [tempHeaderIconId, setTempHeaderIconId] = useState(headerIconId)

  // Otevření režimu editace
  const startEditing = () => {
    setTempTitleText(titleText)
    setTempChallengeTitle(challengeTitle)
    setTempWhyTitle(whyTitle)
    setTempChallenge(challenge)
    setTempWhy(why)
    setTempHeaderIconId(headerIconId)
    setIsEditing(true)
  }

  // Uložení změn
  const saveChanges = () => {
    setTitleText(tempTitleText)
    setChallengeTitle(tempChallengeTitle)
    setWhyTitle(tempWhyTitle)
    setChallenge(tempChallenge)
    setWhy(tempWhy)
    setHeaderIconId(tempHeaderIconId)
    setIsEditing(false)
  }

  // Zrušení změn
  const cancelChanges = () => {
    setIsEditing(false)
  }

  // Získání ikony podle ID
  const getIconSrc = (iconId: string) => {
    const icon = availableIcons.find(icon => icon.id === iconId);
    return icon ? icon.src : availableIcons[0].src;
  };

  // Funkce pro výběr ikony
  const handleSelectIcon = (iconId: string) => {
    setTempHeaderIconId(iconId);
    setShowIconSelector(false);
  };

  return (
    <Card className="border border-[#ddd] rounded-xl">
      <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
  <div className="flex items-center">
    <div className={`${isEditing ? "rounded-full border border-purple-200 p-1" : ""} inline-block mr-3`}>
      {isEditing ? (
        <div 
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowIconSelector(!showIconSelector);
          }}
        >
          <img 
            src={getIconSrc(tempHeaderIconId)} 
            alt="Section icon"
            width={24}
            height={24}
            className="rounded-full"
          />
          {showIconSelector && (
            <IconSelector 
              selectedIconId={tempHeaderIconId}
              onSelectIcon={handleSelectIcon}
              onClose={() => setShowIconSelector(false)}
            />
          )}
        </div>
      ) : (
        <img 
          src={getIconSrc(headerIconId)} 
          alt="Section icon"
          width={24}
          height={24}
          className="rounded-full"
        />
      )}
    </div>
            {isEditing ? (
              <input
                type="text"
                value={tempTitleText}
                onChange={(e) => setTempTitleText(e.target.value)}
                className="text-2xl font-bold text-black px-2 py-1 border border-purple-300 rounded-md bg-white"
              />
            ) : (
              <span className="text-2xl font-bold text-black">{titleText}</span>
            )}
          </div>
          
          {!isEditing ? (
            <button
              onClick={startEditing}
              className="hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <img 
                src="https://res.cloudinary.com/drkudvyog/image/upload/v1740768653/Edit_icon_duha_fzk30m.png" 
                alt="Edit" 
                width="16" 
                height="16" 
              />
            </button>
          ) : (
            <div className="flex space-x-2">
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
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What we're fighting against kontejner */}
        <Card className="border border-[#ddd] rounded-xl">
          <CardContent className="p-4">
            {isEditing ? (
              <input
                type="text"
                value={tempChallengeTitle}
                onChange={(e) => setTempChallengeTitle(e.target.value)}
                className="font-semibold mb-4 text-lg text-[#5b06be] px-2 py-1 border border-purple-300 rounded-md bg-white"
              />
            ) : (
              <h3 className="font-semibold mb-4 text-lg text-[#5b06be]">{challengeTitle}</h3>
            )}
            
            {isEditing ? (
              <textarea
                value={tempChallenge}
                onChange={(e) => setTempChallenge(e.target.value)}
                className="text-base w-full p-2 border border-gray-300 rounded-md bg-white"
                rows={3}
              />
            ) : (
              <p className="text-base">{challenge}</p>
            )}
          </CardContent>
        </Card>
        
        {/* Why it matters kontejner */}
        <Card className="border border-[#ddd] rounded-xl">
          <CardContent className="p-4">
            {isEditing ? (
              <input
                type="text"
                value={tempWhyTitle}
                onChange={(e) => setTempWhyTitle(e.target.value)}
                className="font-semibold mb-4 text-lg text-[#5b06be] px-2 py-1 border border-purple-300 rounded-md bg-white"
              />
            ) : (
              <h3 className="font-semibold mb-4 text-lg text-[#5b06be]">{whyTitle}</h3>
            )}
            
            {isEditing ? (
              <textarea
                value={tempWhy}
                onChange={(e) => setTempWhy(e.target.value)}
                className="text-base w-full p-2 border border-gray-300 rounded-md bg-white"
                rows={3}
              />
            ) : (
              <p className="text-base">{why}</p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
