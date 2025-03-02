"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Search, FileText, ChevronRight, X, Download, RefreshCw, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserProfile } from "./UserProfile"

// Sample data for team members
const teamMembers = [
  {
    id: "user1",
    name: "Sarah Johnson",
    role: "Real Estate Agent",
    dateCompleted: "2024-02-15",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["High Nurturer (85%)", "Strong Integrator (75%)"],
    isng: {
      nurturer: 85,
      integrator: 75,
      synergist: 60,
      genius: 45
    },
    strengths: ["Relationship Building", "Active Listening", "Conflict Resolution"],
    areasToImprove: ["Analytical Skills", "Market Trend Analysis"]
  },
  {
    id: "user2",
    name: "Michael Chen",
    role: "Property Manager",
    dateCompleted: "2024-02-10",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["Strong Genius (82%)", "Balanced profile"],
    isng: {
      nurturer: 65,
      integrator: 70,
      synergist: 68,
      genius: 82
    },
    strengths: ["Creative Problem Solving", "Innovation", "Adaptability"],
    areasToImprove: ["Emotional Intelligence", "Active Listening"]
  },
  {
    id: "user3",
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    dateCompleted: "2024-02-20",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["High Synergist (88%)", "Good balance"],
    isng: {
      nurturer: 72,
      integrator: 65,
      synergist: 88,
      genius: 60
    },
    strengths: ["Collaboration", "Win-Win Solutions", "Team Building"],
    areasToImprove: ["Technical Analysis", "Detail Orientation"]
  },
  {
    id: "user4",
    name: "David Smith",
    role: "Sales Manager",
    dateCompleted: "2024-02-05",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["High Integrator (90%)", "Low Nurturer (40%)"],
    isng: {
      nurturer: 40,
      integrator: 90,
      synergist: 65,
      genius: 70
    },
    strengths: ["Project Management", "Strategic Thinking", "Stakeholder Coordination"],
    areasToImprove: ["Emotional Intelligence", "Relationship Building"]
  },
  {
    id: "user5",
    name: "Jessica Wilson",
    role: "Transaction Coordinator",
    dateCompleted: "2024-02-18",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["Balanced overall", "Good Synergist (75%)"],
    isng: {
      nurturer: 68,
      integrator: 72,
      synergist: 75,
      genius: 65
    },
    strengths: ["Detail Orientation", "Process Management", "Communication"],
    areasToImprove: ["Creative Thinking", "Big Picture Focus"]
  },
  {
    id: "user6",
    name: "Robert Taylor",
    role: "Real Estate Investor",
    dateCompleted: "2024-02-08",
    profileImage: "https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png",
    highlights: ["High Genius (85%)", "Strong Integrator (80%)"],
    isng: {
      nurturer: 50,
      integrator: 80,
      synergist: 55,
      genius: 85
    },
    strengths: ["Innovation", "Risk Assessment", "Opportunity Recognition"],
    areasToImprove: ["Emotional Intelligence", "Team Collaboration"]
  }
];

export function TeamPsychologyDashboard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [openDialog, setOpenDialog] = useState(false)
    
    // Filter users based on search term
    const filteredUsers = teamMembers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    // Find selected user data
    const selectedUserData = teamMembers.find(user => user.id === selectedUser)
    
    // Handle user selection
    const handleUserSelect = (userId: string) => {
      setSelectedUser(userId)
      setOpenDialog(true)
    }
    
    // Nahraď původní funkci getUserSpecialization touto:
const getUserSpecialization = (userId) => {
    // Fixní mapování specializací pro uživatele
    const specializations = {
      "user1": { name: "Wholesaling", value: 85 },
      "user2": { name: "Creative Finance", value: 78 },
      "user3": { name: "Objection Handling", value: 92 },
      "user4": { name: "Foreclosure", value: 88 },
      "user5": { name: "Wholesaling", value: 83 },
      "user6": { name: "Creative Finance", value: 81 }
    };
    
    // Barvy a styl pro specializaci
    const specializationStyles = {
        "Foreclosure": "bg-[#fbb350] text-white border-[#e9a23f] shadow-md",
  "Wholesaling": "bg-[#fbb350] text-white border-[#e9a23f] shadow-md",
  "Creative Finance": "bg-[#fbb350] text-white border-[#e9a23f] shadow-md",
  "Objection Handling": "bg-[#fbb350] text-white border-[#e9a23f] shadow-md"
};
    
    const spec = specializations[userId] || { name: "Wholesaling", value: 80 };
    
    return {
      name: spec.name,
      value: spec.value,
      style: specializationStyles[spec.name]
    };
  };
    
    return (
      <div className="h-full w-full bg-white overflow-auto">
        <div className="w-full h-full max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="flex justify-between items-center p-4">
              <h2 className="font-semibold text-gray-700">Team Members ({filteredUsers.length})</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 pr-2 py-1 h-9 text-sm rounded-full border-gray-300 w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <Button 
                  variant="outline"
                  className="flex items-center gap-1 rounded-full border-gray-300 h-9 px-3 text-sm"
                >
                  <Filter className="w-3 h-3" />
                  Filter
                </Button>
                
                <Button
                  className="bg-[#5b06be] hover:bg-[#4a05a0] text-white rounded-full flex items-center gap-1 h-9 px-3 text-sm"
                >
                  <Download className="w-3 h-3" />
                  Export Data
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100%-4rem)] p-4">
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No team members found matching your search.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => {
                    // Získání specializace uživatele
                    const specialization = getUserSpecialization(user.id);
                    
                    return (
                      <div key={user.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6">
                        <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-6">
    <Image
      src="https://res.cloudinary.com/drkudvyog/image/upload/v1734565916/Profile_photo_duha_s_bilym_pozadim_cl4ukr.png"
      alt={user.name}
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <h3 className="font-medium text-xl text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-500 mt-1">Completed: {new Date(user.dateCompleted).toLocaleDateString()}</p>
    </div>
  </div>
  
  {/* Specializace jako štítek uprostřed */}
  <div className="flex-grow flex justify-center">
  <div className={`px-6 py-3 rounded-full border ${specialization.style} flex items-center gap-2 transform transition-all duration-200 hover:scale-105`}>
    <span className="font-bold text-lg">{specialization.name}</span>
    <span className="font-bold text-lg">{specialization.value}%</span>
  </div>
</div>
  
<Button
  className="bg-[#5b06be] hover:bg-[#4a05a0] text-white rounded-full"
  onClick={() => handleUserSelect(user.id)}
>
  View Complete ISNG Profile
</Button>
</div>
                        
                        <div className="grid grid-cols-4 gap-4">
                          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-green-600 font-medium">Nurturer</span>
                              <span className="text-green-600 font-bold">{user.isng.nurturer}%</span>
                            </div>
                            <Progress value={user.isng.nurturer} className="h-2 [&>div]:bg-green-500 bg-white" />
                          </div>
                          
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-purple-600 font-medium">Integrator</span>
                              <span className="text-purple-600 font-bold">{user.isng.integrator}%</span>
                            </div>
                            <Progress value={user.isng.integrator} className="h-2 [&>div]:bg-purple-500 bg-white" />
                          </div>
                          
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-blue-600 font-medium">Synergist</span>
                              <span className="text-blue-600 font-bold">{user.isng.synergist}%</span>
                            </div>
                            <Progress value={user.isng.synergist} className="h-2 [&>div]:bg-blue-500 bg-white" />
                          </div>
                          
                          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-amber-600 font-medium">Genius</span>
                              <span className="text-amber-600 font-bold">{user.isng.genius}%</span>
                            </div>
                            <Progress value={user.isng.genius} className="h-2 [&>div]:bg-amber-500 bg-white" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
  
        {/* Dialog pro zobrazení detailního ISNG profilu */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
    <DialogHeader className="px-6 py-4 border-b">
      <DialogTitle className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-[#5b06be]" />
        ISNG Profile Details
      </DialogTitle>
    </DialogHeader>
    <ScrollArea className="h-full py-6 px-6">
      {selectedUserData && <DashboardPage />} {/* Tato řádka byla změněna */}
    </ScrollArea>
  </DialogContent>
</Dialog>
      </div>
    )
  }
