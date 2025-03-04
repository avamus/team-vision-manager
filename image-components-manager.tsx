"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Interface for image objects
export interface GalleryImageManager {
  id: string
  url: string
  caption: string
  altText: string
  position?: { x: number, y: number }
  size?: { width: number, height: number }
  textStyle?: {
    isBold: boolean,
    color: string,
    backgroundColor: string,
    textAlign?: string,
    shadow?: string
  }
}

// ImageUploadSlotManager Component
interface ImageUploadSlotManagerProps {
  onUpload: (newImage: any) => void
}

export function ImageUploadSlotManager({ onUpload }: ImageUploadSlotManagerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [caption, setCaption] = useState("")
  const [altText, setAltText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setCaption(file.name.split('.').slice(0, -1).join('.')) // Use filename minus extension as default caption
      setAltText(file.name.split('.').slice(0, -1).join('.'))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setCaption(file.name.split('.').slice(0, -1).join('.')) // Use filename minus extension as default caption
      setAltText(file.name.split('.').slice(0, -1).join('.'))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return
    
    setIsLoading(true)
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const newImage = {
        id: uuidv4(),
        url: event.target?.result as string,
        caption: caption || selectedFile.name,
        altText: altText || selectedFile.name
      }
      
      onUpload(newImage)
      setIsLoading(false)
      
      // Reset form
      setSelectedFile(null)
      setPreviewUrl(null)
      setCaption("")
      setAltText("")
    }
    reader.readAsDataURL(selectedFile)
  }

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Helper function for generating UUID
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, 
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

if (previewUrl) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl overflow-hidden h-64 relative bg-gray-100 mb-6">
            <img 
              src={previewUrl} 
              alt="Image preview" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Description
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                  setAltText(e.target.value); // Automaticky použít stejnou hodnotu pro altText
                }}
                className="w-full p-3 border border-gray-300 rounded-xl text-base"
                placeholder="Enter a description for this image"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              setSelectedFile(null)
              setPreviewUrl(null)
            }}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-[#5b06be] hover:bg-[#4a05a2] text-white rounded-xl font-medium"
          >
            Upload
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`aspect-[16/7.2] relative border-2 border-dashed ${dragActive ? 'border-[#5b06be] bg-purple-50' : 'border-gray-300'} 
        rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-all`}
      onClick={onButtonClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      
      <div className="text-center p-4">
        {isLoading ? (
          <div className="animate-spin w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5b06be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center rounded-full bg-purple-100">
              <img 
                src="https://res.cloudinary.com/drkudvyog/image/upload/v1741034637/upload_icon_orpcqe.png" 
                alt="Upload"
                width={24}
                height={24}
              />
            </div>
            <p className="text-sm font-medium text-gray-700">Click to upload image</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            <p className="text-xs text-purple-600 mt-2">Drag and drop also supported</p>
          </>
        )}
      </div>
    </div>
  )
}

// ImageDisplayManager Component
interface ImageDisplayManagerProps {
  image: GalleryImageManager
  onUpdate: (updatedImage: GalleryImageManager) => void
  onDelete: (imageId: string) => void
  onApplyToAll?: (style: any) => void
  index: number
}

export function ImageDisplayManager({ image, onUpdate, onDelete, onApplyToAll, index }: ImageDisplayManagerProps) {
  const [position, setPosition] = useState(image.position || { x: 0, y: 0 })
  const [size, setSize] = useState(image.size || { width: 360, height: 240 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [textStyle, setTextStyle] = useState(image.textStyle || {
    isBold: false,
    color: "#000000",
    backgroundColor: "#f9fafb",
    textAlign: "left",
    shadow: "0 2px 4px rgba(0,0,0,0.05)"
  })
  const [caption, setCaption] = useState(image.caption || "")
  const cardRef = useRef<HTMLDivElement>(null)

  // Save position and size changes
  useEffect(() => {
    onUpdate({
      ...image,
      position,
      size,
      textStyle,
      caption
    })
  }, [position, size, textStyle, caption, image, onUpdate])

  // Moving the image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button
    
    if ((e.target as HTMLElement).classList.contains('resize-handle') || 
        (e.target as HTMLElement).classList.contains('edit-text-btn')) {
      // If clicking on resize handle or edit text button, don't start moving
      return
    }
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
    
    e.preventDefault()
  }
  
  // Resizing the image
  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY
    })
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      }
      
      if (isResizing && cardRef.current) {
        const deltaX = e.clientX - dragStart.x
        const deltaY = e.clientY - dragStart.y
        
        setSize({
          width: Math.max(150, size.width + deltaX),
          height: Math.max(100, size.height + deltaY)
        })
        
        setDragStart({
          x: e.clientX,
          y: e.clientY
        })
      }
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, position, size])

  // Edit caption
  const handleEdit = () => {
    const newCaption = prompt("Enter new caption:", caption)
    if (newCaption !== null) {
      setCaption(newCaption)
    }
  }

  // Toggle bold text
  const toggleBold = () => {
    setTextStyle({
      ...textStyle,
      isBold: !textStyle.isBold
    })
  }

  // Change text color
  const changeTextColor = (color: string) => {
    setTextStyle({
      ...textStyle,
      color
    })
  }

  // Change background color
  const changeBackgroundColor = (backgroundColor: string) => {
    setTextStyle({
      ...textStyle,
      backgroundColor,
      shadow: `0 4px 8px ${backgroundColor}`
    })
  }

  return (
    <div 
      ref={cardRef}
      className="absolute"
      style={{ 
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging || isResizing || showTextEditor ? 10 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      <Card 
        className="w-full h-full border border-[#ddd] rounded-xl overflow-hidden hover:shadow"
        style={{ 
          boxShadow: textStyle.shadow || '0 2px 4px rgba(0,0,0,0.05)' 
        }}
      >
        <div className="relative w-full h-3/4">
          <Image
            src={image.url}
            alt={image.altText || `Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            draggable={false}
            className="select-none"
          />

          {/* Edit text button - added to the top right corner of the image */}
          <div className="absolute top-2 right-2 flex space-x-2">
  {/* Tlačítko pro zobrazení kódu */}
  <button
    className="bg-white bg-opacity-80 rounded-full p-1 w-6 h-6 flex items-center justify-center cursor-pointer z-10 hover:bg-opacity-100 transition-all"
    onClick={(e) => {
      e.stopPropagation();
      // Zobrazit kód karty
      alert(JSON.stringify(image, null, 2));
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  </button>
  
  {/* Edit text button */}
  <button
    className="bg-white bg-opacity-80 rounded-full p-1 w-6 h-6 flex items-center justify-center cursor-pointer z-10 hover:bg-opacity-100 transition-all edit-text-btn"
    onClick={(e) => {
      e.stopPropagation()
      setShowTextEditor(!showTextEditor)
    }}
  >
    <img 
      src="https://res.cloudinary.com/drkudvyog/image/upload/v1740768653/Edit_icon_duha_fzk30m.png" 
      alt="Edit" 
      width="16" 
      height="16" 
    />
  </button>
</div>
        </div>
        
        {/* Caption */}
        <CardContent 
          className="p-3 h-1/4 overflow-auto relative"
          style={{ backgroundColor: textStyle.backgroundColor }}
        >
          <p 
            className={`text-sm leading-relaxed ${textStyle.isBold ? 'font-bold' : 'font-medium'}`}
            style={{ 
              color: textStyle.color,
              textAlign: textStyle.textAlign as "left" | "center" | "right" | "justify" | undefined
            }}
          >
            {caption || "No caption available"}
          </p>
        </CardContent>
        
        {/* Resize handle - more elegant */}
        <div 
          className="absolute bottom-0 right-0 cursor-se-resize resize-handle"
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, transparent 14px, rgba(200, 200, 200, 0.3) 15px)',
            cursor: 'se-resize'
          }}
        />
      </Card>

      {/* Text editor popup */}
      {showTextEditor && (
        <>
          {/* Overlay for closing when clicking outside */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowTextEditor(false)}
          />
        
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl z-50 p-5 border border-gray-200" 
            style={{ width: '320px', maxWidth: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption edit field */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl mb-3"
                placeholder="Enter image caption"
              />
            </div>
            
            {/* Bold and alignment in one row */}
            <div className="flex flex-wrap items-center mb-4 w-full">
              <div className="grid grid-cols-4 gap-2 w-full">
                {/* Bold button */}
                <div className="flex items-center justify-center">
                  <button 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${textStyle.isBold ? 'bg-blue-100 border-blue-400 border' : 'bg-gray-100'}`}
                    onClick={toggleBold}
                  >
                    <span className="font-bold text-lg">B</span>
                  </button>
                </div>
                
                {/* Text alignment buttons */}
                <div className="flex items-center justify-center">
                  <button 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${textStyle.textAlign === 'left' ? 'bg-blue-100 border-blue-400 border' : 'bg-gray-100'}`}
                    onClick={() => setTextStyle({...textStyle, textAlign: 'left'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="17" y1="10" x2="3" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="17" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-center">
                  <button 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${textStyle.textAlign === 'center' ? 'bg-blue-100 border-blue-400 border' : 'bg-gray-100'}`}
                    onClick={() => setTextStyle({...textStyle, textAlign: 'center'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="10" x2="6" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="18" y1="18" x2="6" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-center">
                  <button 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${textStyle.textAlign === 'right' ? 'bg-blue-100 border-blue-400 border' : 'bg-gray-100'}`}
                    onClick={() => setTextStyle({...textStyle, textAlign: 'right'})}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="21" y1="10" x2="7" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="21" y1="18" x2="7" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Text color */}
<div className="space-y-1 mb-4">
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-500">Text color</span>
    <button 
      className="text-xs bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
      onClick={() => {
        navigator.clipboard.writeText(textStyle.color);
        alert(`Color code ${textStyle.color} copied to clipboard!`);
      }}
    >
      {textStyle.color}
    </button>
  </div>
  <div className="relative w-full h-24 mb-2">
    <div 
      id="colorSlider"
      className="w-full h-full rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(to right, red, orange, yellow, lime, cyan, blue, violet, magenta)`
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();
        
        const updateColor = (clientX: number) => {
          const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
          const hue = (x / rect.width) * 360;
          const color = `hsl(${hue}, 100%, 50%)`;
          changeTextColor(color);
        };
        
        updateColor(e.clientX);
        
        const handlePointerMove = (moveEvent: PointerEvent) => {
          moveEvent.preventDefault();
          updateColor(moveEvent.clientX);
        };
        
        const handlePointerUp = () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp);
        };
        
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
      }}
    />
  </div>
</div>
            
            {/* Background color */}
<div className="space-y-1 mb-4">
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-500">Background</span>
    <button 
      className="text-xs bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
      onClick={() => {
        navigator.clipboard.writeText(textStyle.backgroundColor);
        alert(`Color code ${textStyle.backgroundColor} copied to clipboard!`);
      }}
    >
      {textStyle.backgroundColor}
    </button>
  </div>
  <div className="relative w-full h-16 mb-2">
    <div 
      id="bgColorSlider"
      className="w-full h-full rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(to right, 
          #fce4ec, #f3e5f5, #e8eaf6, #e3f2fd, #e0f7fa, #e0f2f1, #e8f5e9, #f1f8e9, 
          #f9fbe7, #fffde7, #fff8e1, #fff3e0, #fbe9e7, #ffebee)`
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        const slider = e.currentTarget;
        const rect = slider.getBoundingClientRect();
        
        const updateColor = (clientX: number) => {
          const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
          const hue = (x / rect.width) * 360;
          const color = `hsl(${hue}, 70%, 90%)`;
          changeBackgroundColor(color);
        };
        
        updateColor(e.clientX);
        
        const handlePointerMove = (moveEvent: PointerEvent) => {
          moveEvent.preventDefault();
          updateColor(moveEvent.clientX);
        };
        
        const handlePointerUp = () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp);
        };
        
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
      }}
    />
  </div>
</div>
            
            {/* Buttons */}
            <div className="flex flex-col space-y-3 mt-4">
              <button 
                className="w-full text-sm bg-gray-100 hover:bg-gray-200 rounded-xl p-2 transition-colors"
                onClick={() => setShowTextEditor(false)}
              >
                Close
              </button>
              
              <button 
  className="w-full text-sm bg-[#5b06be] hover:bg-[#4a05a2] text-white rounded-xl p-2 transition-colors"
  onClick={(e) => {
    e.stopPropagation();
    if (typeof onApplyToAll === 'function') {
      // Ujistíme se, že máme správné parametry
      const styleToApply = {
        isBold: textStyle.isBold,
        color: textStyle.color,
        backgroundColor: textStyle.backgroundColor,
        textAlign: textStyle.textAlign,
        shadow: textStyle.shadow
      };
      
      // Aplikujeme styl na všechny obrázky
      onApplyToAll(styleToApply);
      
      // Zobrazíme potvrzení
      alert("Style has been applied to all images!");
      setShowTextEditor(false);
    } else {
      alert("Cannot apply style to all images - function not available");
    }
  }}
>
  Apply to all images
</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ImageGalleryManager Component
export function ImageGalleryManager() {
    const [images, setImages] = useState<GalleryImageManager[]>([]);
    
    const [titleText] = useState("Vision in Action")
  
    const [showUploadDialog, setShowUploadDialog] = useState(false);
  
    const handleImageUpdate = (updatedImage: GalleryImageManager) => {
      setImages((prevImages) => prevImages.map((img) => 
        img.id === updatedImage.id ? updatedImage : img
      ))
    }
  
    const handleImageDelete = (imageId: string) => {
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId))
    }
  
    const handleApplyStyleToAll = (style: any) => {
        console.log("Applying style to all images:", style);
        setImages(prevImages => {
          // Create new array with updated styles, preserving other properties
          const updatedImages = prevImages.map(img => ({
            ...img,
            textStyle: { 
              ...img.textStyle,
              ...style
            }
          }));
          
          return updatedImages;
        });
      };
  
    return (
      <div>
        <Card className="border border-[#ddd] rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="https://res.cloudinary.com/drkudvyog/image/upload/v1740700886/Interactie_vision_board_icon_r4a3hh.png" 
                  alt="Vision Board Icon"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-2xl font-bold text-black">{titleText}</span>
              </div>
              
              <button
                onClick={() => setShowUploadDialog(true)}
                className="px-3 py-2 text-sm bg-white hover:bg-gray-100 text-[#5b06be] border border-[#5b06be] rounded-xl flex items-center"
              >
                <img 
                  src="https://res.cloudinary.com/drkudvyog/image/upload/v1741034637/upload_icon_orpcqe.png" 
                  alt="Upload"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                Add Image
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <Card className="border border-[#ddd] rounded-xl">
              <CardContent className="p-0">
                <div className="relative h-[550px] w-full bg-gray-50 overflow-hidden">
                  {images.map((image, index) => (
                    <ImageDisplayManager
                      key={image.id}
                      image={image}
                      onUpdate={handleImageUpdate}
                      onDelete={handleImageDelete}
                      onApplyToAll={handleApplyStyleToAll}
                      index={index}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
  
        {showUploadDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowUploadDialog(false)}></div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
              
              <ImageUploadSlotManager 
                onUpload={(newImage) => {
                  setImages(prev => [...prev, {
                    ...newImage,
                    position: { 
                      // Umístit nový obrázek vpravo od posledního nebo do prvního slotu
                      x: prev.length ? prev[prev.length - 1].position.x + 400 : 20, 
                      y: 20
                    },
                    size: { width: 360, height: 240 },
                    textStyle: {
                      isBold: false,
                      color: "#000000",
                      backgroundColor: "#f9fafb",
                      textAlign: "left",
                      shadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }
                  }]);
                  setShowUploadDialog(false);
                }} 
              />
            </div>
          </div>
        )}
      </div>
    );
  }
