"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { VisionDashboardManager } from '@/components/ui/vision-dashboard-manager'

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto">
          <VisionDashboardManager />
        </div>
      </main>
    </DndProvider>
  )
}
