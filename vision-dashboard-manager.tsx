"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconSelector, availableIcons } from "./icon-selector"
import { Goal, Subtask, calculateProgress, generateId } from "../../utils/subtask-types"
import { ImageGalleryManager } from "./image-components-manager"
import { ChallengeCardManager } from "./challenge-card-manager"

// OurVisionManager Component
function OurVisionManager() {
  const [visionTitle] = useState("Our Vision:")
  const [vision, setVision] = useState(
    "To become the industry leader in innovative solutions, setting new standards for excellence and customer satisfaction.",
  )
  
  const [headerIconId, setHeaderIconId] = useState("icon9")
  const [showIconSelector, setShowIconSelector] = useState(false)
  
  // State for editing mode
  const [isEditing, setIsEditing] = useState(false)
  const [tempVision, setTempVision] = useState(vision)
  const [tempHeaderIconId, setTempHeaderIconId] = useState(headerIconId)
  
  // Get icon by ID
  const getIconSrc = (iconId: string) => {
    const icon = availableIcons.find(icon => icon.id === iconId);
    return icon ? icon.src : availableIcons[0].src;
  };

  // Handle icon selection
  const handleSelectIcon = (iconId: string) => {
    setTempHeaderIconId(iconId);
    setShowIconSelector(false);
  };

  // Start editing mode
  const startEditing = () => {
    setTempVision(vision)
    setTempHeaderIconId(headerIconId)
    setIsEditing(true)
  }

  // Save changes
  const saveChanges = () => {
    setVision(tempVision)
    setHeaderIconId(tempHeaderIconId)
    setIsEditing(false)
  }

  // Cancel changes
  const cancelChanges = () => {
    setIsEditing(false)
  }
  
  return (
    <Card className="border border-[#ddd] rounded-xl">
      <CardContent className="p-4">
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
                    alt="Vision icon"
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
                  alt="Vision icon"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
            </div>
            <h3 className="font-semibold text-lg text-black">{visionTitle}</h3>
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
        
        <div className="mt-4">
          {isEditing ? (
            <textarea 
              value={tempVision}
              onChange={(e) => setTempVision(e.target.value)}
              className="text-base w-full p-2 border border-gray-300 rounded-md bg-white"
              rows={3}
            />
          ) : (
            <p className="text-base">{vision}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// TeamGoalsVisionManager Component
function TeamGoalsVisionManager() {
  const [titleText, setTitleText] = useState("Team Goals & Vision")
  const [headerIconId, setHeaderIconId] = useState("icon1")
  const [showIconSelector, setShowIconSelector] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([
    {
      title: "Increase market share by 15%",
      description: "Expand our customer base through targeted marketing campaigns and strategic partnerships in key markets.",
      progress: 60,
      deadline: "2025-06-30",
      subtasks: [
        { id: "st1", title: "Launch marketing campaign", completed: true },
        { id: "st2", title: "Secure three new partnerships", completed: true },
        { id: "st3", title: "Conduct market research", completed: true },
        { id: "st4", title: "Expand to new region", completed: false },
        { id: "st5", title: "Implement customer feedback", completed: false },
      ]
    },
    {
      title: "Launch 2 innovative products",
      description: "Develop and release two new products that meet emerging customer needs and set new industry standards.",
      progress: 40,
      deadline: "2025-09-15",
      subtasks: [
        { id: "st6", title: "Complete product research", completed: true },
        { id: "st7", title: "Finalize product designs", completed: true },
        { id: "st8", title: "Develop prototypes", completed: false },
        { id: "st9", title: "Conduct user testing", completed: false },
        { id: "st10", title: "Launch product", completed: false },
      ]
    },
    {
      title: "Achieve 99% customer satisfaction",
      description: "Enhance customer experience through improved service quality, faster response times, and personalized solutions.",
      progress: 85,
      deadline: "2025-05-01",
      subtasks: [
        { id: "st11", title: "Train customer service team", completed: true },
        { id: "st12", title: "Implement new feedback system", completed: true },
        { id: "st13", title: "Reduce response time", completed: true },
        { id: "st14", title: "Personalize customer interactions", completed: true },
        { id: "st15", title: "Review satisfaction metrics", completed: false },
      ]
    },
  ])
  
  // State for editing the entire section
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [tempGoals, setTempGoals] = useState(goals);
  const [tempTitleText, setTempTitleText] = useState(titleText);
  const [tempHeaderIconId, setTempHeaderIconId] = useState(headerIconId);
  const [activeSubtasksGoalIndex, setActiveSubtasksGoalIndex] = useState<number | null>(null);
  const [showSubtasksModal, setShowSubtasksModal] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState<{ goalIndex: number; subtaskId: string | null }>({ goalIndex: -1, subtaskId: null });
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  // Get icon by ID
  const getIconSrc = (iconId: string) => {
    const icon = availableIcons.find(icon => icon.id === iconId);
    return icon ? icon.src : availableIcons[0].src;
  };

  // Handle icon selection
  const handleSelectIcon = (iconId: string) => {
    setTempHeaderIconId(iconId);
    setShowIconSelector(false);
  };
  
  // Functions for updating temporary goals
  const updateTempGoalTitle = (index: number, newTitle: string) => {
    const newGoals = [...tempGoals];
    newGoals[index] = {...newGoals[index], title: newTitle};
    setTempGoals(newGoals);
  }

  const updateTempGoalDescription = (index: number, newDescription: string) => {
    const newGoals = [...tempGoals];
    newGoals[index] = {...newGoals[index], description: newDescription};
    setTempGoals(newGoals);
  }

  const updateTempGoalProgress = (index: number, newProgress: number) => {
    const newGoals = [...tempGoals];
    newGoals[index] = {...newGoals[index], progress: Math.max(0, Math.min(100, newProgress))};
    setTempGoals(newGoals);
  }
  
  const updateTempGoalDeadline = (index: number, newDeadline: string) => {
    const newGoals = [...tempGoals];
    newGoals[index] = {...newGoals[index], deadline: newDeadline};
    setTempGoals(newGoals);
  }
  
  const updateTempGoalSubtasks = (index: number, newSubtasks: Subtask[]) => {
    const newGoals = [...tempGoals];
    const progress = calculateProgress(newSubtasks);
    newGoals[index] = {
      ...newGoals[index], 
      subtasks: newSubtasks,
      progress
    };
    setTempGoals(newGoals);
  }
  
  // Funkce pro přepínání stavu dokončení subtasku
  const toggleSubtaskCompletion = (goalIndex: number, subtaskId: string) => {
    if (!isEditingSection) return; // Přidat tuto podmínku
    
    const newGoals = [...tempGoals];
    const subtaskIndex = newGoals[goalIndex].subtasks.findIndex(st => st.id === subtaskId);
    if (subtaskIndex >= 0) {
      newGoals[goalIndex].subtasks[subtaskIndex].completed = !newGoals[goalIndex].subtasks[subtaskIndex].completed;
      const progress = calculateProgress(newGoals[goalIndex].subtasks);
      newGoals[goalIndex].progress = progress;
      setTempGoals(newGoals);
    }
  };

const addNewSubtask = () => {
  if (newSubtaskTitle.trim() === "") return;
  
  // Určit správný index cíle
  const goalIndex = editingSubtask.goalIndex >= 0 
    ? editingSubtask.goalIndex 
    : (activeSubtasksGoalIndex !== null ? activeSubtasksGoalIndex : -1);
  
  if (goalIndex >= 0) {
    const newGoals = isEditingSection ? [...tempGoals] : [...goals];
    
    const newSubtask: Subtask = {
      id: generateId(),
      title: newSubtaskTitle,
      completed: false
    };
    
    newGoals[goalIndex].subtasks.push(newSubtask);
    const progress = calculateProgress(newGoals[goalIndex].subtasks);
    newGoals[goalIndex].progress = progress;
    
    if (isEditingSection) {
      setTempGoals(newGoals);
    } else {
      setGoals(newGoals);
    }
    
    setNewSubtaskTitle("");
  }
};

// Funkce pro editaci existujícího subtasku
const updateSubtask = (goalIndex: number, subtaskId: string, newTitle: string) => {
  const newGoals = isEditingSection ? [...tempGoals] : [...goals];
  const subtaskIndex = newGoals[goalIndex].subtasks.findIndex(st => st.id === subtaskId);
  
  if (subtaskIndex >= 0) {
    newGoals[goalIndex].subtasks[subtaskIndex].title = newTitle;
    
    if (isEditingSection) {
      setTempGoals(newGoals);
    } else {
      setGoals(newGoals);
    }
  }
};

// Funkce pro odstranění subtasku
const removeSubtask = (goalIndex: number, subtaskId: string) => {
  const newGoals = isEditingSection ? [...tempGoals] : [...goals];
  const subtasks = newGoals[goalIndex].subtasks.filter(st => st.id !== subtaskId);
  
  newGoals[goalIndex].subtasks = subtasks;
  const progress = calculateProgress(subtasks);
  newGoals[goalIndex].progress = progress;
  
  if (isEditingSection) {
    setTempGoals(newGoals);
  } else {
    setGoals(newGoals);
  }
};
  // Save changes
  const saveChanges = () => {
    setGoals(tempGoals);
    setTitleText(tempTitleText);
    setHeaderIconId(tempHeaderIconId);
    setIsEditingSection(false);
  }
  
  // Cancel changes
  const cancelChanges = () => {
    setTempGoals([...goals]);
    setTempTitleText(titleText);
    setTempHeaderIconId(headerIconId);
    setIsEditingSection(false);
  }

  // Start editing mode
  const startEditing = () => {
    setTempGoals([...goals]);
    setTempTitleText(titleText);
    setTempHeaderIconId(headerIconId);
    setIsEditingSection(true);
  }

  return (
    <Card className="border border-[#ddd] rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`${isEditingSection ? "rounded-full border border-purple-200 p-1" : ""} inline-block mr-3`}>
              {isEditingSection ? (
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
            {isEditingSection ? (
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
          
          {!isEditingSection ? (
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(isEditingSection ? tempGoals : goals).map((goal, index) => (
            <Card key={index} className="border border-[#fbb350] rounded-xl bg-white">
              <CardContent className="p-4 space-y-3">
                {!isEditingSection ? (
                  <>
                    {/* First container - title and text */}
                    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
                      <h4 className="text-base font-semibold text-[#fbb350]">{goal.title}</h4>
                      <p className="text-sm text-gray-600 mt-2">{goal.description}</p>
                    </div>
                    
                    {/* Second container - deadline */}
                    {goal.deadline && (
                      <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
                        <div className="text-xs text-gray-500 flex items-center">
                          <img 
                            src="https://res.cloudinary.com/drkudvyog/image/upload/v1740840812/calendar_icon_2_gbghbs.png"
                            alt="Calendar"
                            width={16}
                            height={16}
                            className="mr-1"
                          />
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    
                    {/* Třetí kontejner - progress bar a subtasky */}
<div className="bg-white rounded-lg p-4 border border-gray-100">
  <div className="flex items-center space-x-3 mb-2">
    <div className="w-4/5 bg-gray-200 rounded-full h-2">
      <div 
        className="bg-[#fbb350] h-2 rounded-full"
        style={{ width: `${goal.progress}%` }}
      ></div>
    </div>
    <div className="text-sm text-gray-500">{goal.progress}%</div>
  </div>
  
  {goal.subtasks && goal.subtasks.length > 0 && (
    <div>
      <div className="text-xs text-gray-500 mb-2">
        {goal.subtasks.filter(st => st.completed).length} of {goal.subtasks.length} subtasks completed
      </div>
      
      <div className="space-y-2">
      <button
  className="text-xs text-[#5b06be] mt-2 hover:underline flex items-center"
  onClick={() => {
    setEditingSubtask({ goalIndex: index, subtaskId: null });
    setShowSubtasksModal(true);
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
  Add subtask
</button>
        {goal.subtasks.slice(0, 3).map((subtask, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex-shrink-0 w-5 h-5">
              <div
                className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                  subtask.completed 
                    ? 'bg-[#5b06be] text-white' 
                    : 'border-2 border-gray-300'
                }`}
                onClick={() => toggleSubtaskCompletion(index, subtask.id)}
              >
                {subtask.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
            <div className="text-sm">{subtask.title}</div>
          </div>
        ))}
      </div>

      {/* Modální okno pro správu subtasků */}
{showSubtasksModal && (activeSubtasksGoalIndex !== null || editingSubtask.goalIndex >= 0) && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => {
      setShowSubtasksModal(false);
      setActiveSubtasksGoalIndex(null);
      setEditingSubtask({ goalIndex: -1, subtaskId: null });
    }}></div>
    <div className="relative p-6 bg-white rounded-xl shadow-lg w-full max-w-md z-50" onClick={(e) => e.stopPropagation()}>
      <h3 className="text-xl font-bold mb-4">
        {editingSubtask.goalIndex >= 0 ? 
          (isEditingSection ? tempGoals[editingSubtask.goalIndex].title : goals[editingSubtask.goalIndex].title) : 
          (activeSubtasksGoalIndex !== null ? goals[activeSubtasksGoalIndex].title : '')}
      </h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Subtasks</h4>
        <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
          {(editingSubtask.goalIndex >= 0 ? 
            (isEditingSection ? tempGoals[editingSubtask.goalIndex].subtasks : goals[editingSubtask.goalIndex].subtasks) : 
            (activeSubtasksGoalIndex !== null ? goals[activeSubtasksGoalIndex].subtasks : [])
          ).map((subtask, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 flex-grow">
                <div 
                  className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                    subtask.completed 
                      ? 'bg-[#5b06be] text-white' 
                      : 'border-2 border-gray-300'
                  }`}
                  onClick={() => toggleSubtaskCompletion(
                    editingSubtask.goalIndex >= 0 ? editingSubtask.goalIndex : (activeSubtasksGoalIndex !== null ? activeSubtasksGoalIndex : 0), 
                    subtask.id
                  )}
                >
                  {subtask.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-sm flex-grow">{subtask.title}</div>
              </div>
              
              {isEditingSection && (
  <div className="flex items-center">
    <input
      type="text"
      value={newSubtaskTitle}
      onChange={(e) => setNewSubtaskTitle(e.target.value)}
      placeholder="Add new subtask..."
      className="flex-grow p-2 border border-gray-300 rounded-l-lg"
      onKeyDown={(e) => {
        if (e.key === 'Enter') addNewSubtask();
      }}
    />
    <button
      onClick={addNewSubtask}
      className="bg-[#5b06be] text-white p-2 rounded-r-lg"
      disabled={newSubtaskTitle.trim() === ""}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
)}
            </div>
          ))}
        </div>
        
        {/* Formulář pro přidávání subtasků - vždy viditelný v modálním okně */}
        {(
          <div className="flex items-center">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Add new subtask..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') addNewSubtask();
              }}
            />
            <button
              onClick={addNewSubtask}
              className="bg-[#5b06be] text-white p-2 rounded-r-lg"
              disabled={newSubtaskTitle.trim() === ""}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={() => {
            setShowSubtasksModal(false);
            setActiveSubtasksGoalIndex(null);
            setEditingSubtask({ goalIndex: -1, subtaskId: null });
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      
      {goal.subtasks.length > 3 && (
        <button
          className="text-xs text-[#5b06be] mt-2 hover:underline"
          onClick={() => {
            setActiveSubtasksGoalIndex(index);
            setShowSubtasksModal(true);
          }}
        >
          View all {goal.subtasks.length} subtasks
        </button>
      )}
    </div>
  )}
  
  {isEditingSection && (
  <button
    className="text-xs text-[#5b06be] mt-2 hover:underline flex items-center"
    onClick={() => {
      setEditingSubtask({ goalIndex: index, subtaskId: null });
      setShowSubtasksModal(true);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Add subtask
  </button>
)}
</div>
                  </>
                ) : (
                  <>
                    <input 
                      type="text"
                      value={goal.title}
                      onChange={(e) => updateTempGoalTitle(index, e.target.value)}
                      className="text-base font-semibold text-[#fbb350] block w-full p-1 border border-gray-300 rounded-md bg-white"
                    />
                    <textarea 
                      value={goal.description}
                      onChange={(e) => updateTempGoalDescription(index, e.target.value)}
                      className="text-sm text-gray-600 block w-full p-1 border border-gray-300 rounded-md bg-white mt-2"
                      rows={3}
                    />
                    
                    <div className="flex flex-col space-y-1 mt-2">
                      <label className="text-xs text-gray-500">Deadline:</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={goal.deadline ? new Date(goal.deadline).toLocaleDateString() : ''}
                          readOnly
                          className="text-sm p-2 border border-gray-300 rounded-md bg-white w-full cursor-pointer"
                          placeholder="Select date..."
                        />
                        
                        {/* Calendar icon */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <img 
                            src="https://res.cloudinary.com/drkudvyog/image/upload/v1740840812/calendar_icon_2_gbghbs.png" 
                            alt="Calendar" 
                            width="20" 
                            height="20" 
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ProgressWinsSectionManager Component
function ProgressWinsSectionManager() {
  const [titleText, setTitleText] = useState("Progress & Wins")
  const [victoriesTitleText, setVictoriesTitleText] = useState("Recent Victories:")
  const [wins, setWins] = useState([
    "Secured 3 major client contracts",
    "Launched innovative product feature",
    "Achieved 98% customer satisfaction rate",
  ])
  const [headerIconId, setHeaderIconId] = useState("trophy")
  const [showIconSelector, setShowIconSelector] = useState(false)
  
  // Limit the number of wins to maximum of 5
  const maxWinsCount = 5;

  // State for editing
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitleText, setTempTitleText] = useState(titleText)
  const [tempVictoriesTitleText, setTempVictoriesTitleText] = useState(victoriesTitleText)
  const [tempWins, setTempWins] = useState([...wins])
  const [tempHeaderIconId, setTempHeaderIconId] = useState(headerIconId)

  // Get icon by ID
  const getIconSrc = (iconId: string) => {
    const icon = availableIcons.find(icon => icon.id === iconId);
    return icon ? icon.src : availableIcons[0].src;
  };

  // Handle icon selection
  const handleSelectIcon = (iconId: string) => {
    setTempHeaderIconId(iconId);
    setShowIconSelector(false);
  };

  // Start editing mode
  const startEditing = () => {
    setTempTitleText(titleText)
    setTempVictoriesTitleText(victoriesTitleText)
    setTempWins([...wins])
    setTempHeaderIconId(headerIconId)
    setIsEditing(true)
  }

  // Save changes
  const saveChanges = () => {
    setTitleText(tempTitleText)
    setVictoriesTitleText(tempVictoriesTitleText)
    setWins([...tempWins])
    setHeaderIconId(tempHeaderIconId)
    setIsEditing(false)
  }

  // Cancel changes
  const cancelChanges = () => {
    setIsEditing(false)
  }

  // Update temporary win
  const updateTempWin = (index: number, newValue: string) => {
    const newWins = [...tempWins]
    newWins[index] = newValue
    setTempWins(newWins)
  }

  // Add new win
  const addNewWin = () => {
    if (tempWins.length < maxWinsCount) {
      setTempWins([...tempWins, "New achievement"])
    }
  }

  // Remove win
  const removeWin = (index: number) => {
    const newWins = [...tempWins]
    newWins.splice(index, 1)
    setTempWins(newWins)
  }

  return (
    <Card className="border border-[#ddd] rounded-xl h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`${isEditing ? "rounded-full border border-purple-200 p-1" : ""} inline-block mr-2`}>
              {isEditing ? (
                <div 
                  className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
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
                  />
                </div>
              ) : (
                <img 
                  src={getIconSrc(headerIconId)} 
                  alt="Section icon"
                  width={24}
                  height={24}
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
      <CardContent className="h-[calc(100%-80px)] pb-6">
        {/* Recent Victories container - now full height */}
        <Card className="border border-[#ddd] rounded-xl h-full mb-4">
          <CardContent className="p-4 flex flex-col h-full pb-8">
            <h3 className="font-semibold mb-6 text-lg text-[#5b06be]">{victoriesTitleText}</h3>
            {isEditing && tempWins.length >= maxWinsCount && (
              <div className="mb-3 text-xs text-red-500">
                Maximum of {maxWinsCount} achievements reached
              </div>
            )}
            
            <ul className="space-y-6 flex-grow">
              {(isEditing ? tempWins : wins).map((win, index) => (
                <li key={index} className="flex items-start">
                  <img
                    src="https://res.cloudinary.com/drkudvyog/image/upload/v1737477323/Trophy_icon_duha_rdwgow.png"
                    alt="Trophy Icon"
                    width={16}
                    height={16}
                    className="mr-3 mt-1 flex-shrink-0"
                  />
                  {isEditing ? (
                    <div className="flex flex-grow items-center">
                      <input
                        type="text"
                        value={win}
                        onChange={(e) => updateTempWin(index, e.target.value)}
                        className="text-base flex-grow p-1 border border-gray-300 rounded-md bg-white"
                      />
                      {isEditingSection && (
  <button 
    onClick={() => removeSubtask(
      editingSubtask.goalIndex >= 0 ? editingSubtask.goalIndex : activeSubtasksGoalIndex,
      subtask.id
    )}
    className="text-gray-400 hover:text-red-500"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
)}
                    </div>
                  ) : (
                    <span className="text-base">{win}</span>
                  )}
                </li>
              ))}
            </ul>
            
            {isEditing && tempWins.length < maxWinsCount && (
              <button 
                onClick={addNewWin}
                className="mt-4 self-start text-[#5b06be] hover:text-[#4a05a2] flex items-center text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add new achievement
              </button>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

// Main VisionDashboardManager Component
export function VisionDashboardManager() {
  return (
    <div className="container mx-auto p-6">
      
      {/* Dashboard content */}
      <div className="flex flex-col gap-6 rounded-xl">
        <TeamGoalsVisionManager />
        <OurVisionManager />
        <div className="grid gap-6 md:grid-cols-2">
          <ChallengeCardManager />
          <ProgressWinsSectionManager />
        </div>
        <ImageGalleryManager />
      </div>
    </div>
  )
}
