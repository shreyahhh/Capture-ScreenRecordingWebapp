"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScreenRecorder } from "@/components/ScreenRecorder"
import { RecordingsList } from "@/components/RecordingsList"
import { DocumentationDialog } from "@/components/DocumentationDialog"
import { Video, List, Home } from "lucide-react"

type ActiveTab = 'home' | 'recorder' | 'recordings'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'recorder':
        return <ScreenRecorder />
      case 'recordings':
        return <RecordingsList />
      default:
        return (
          <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-5xl font-bold tracking-tight">
                Screen Recorder App
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional screen recording solution built with modern web technologies. 
                Capture, save, and manage your screen recordings with ease.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('recorder')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      Record Screen
                    </CardTitle>
                    <CardDescription>
                      Start recording your screen with professional-quality capture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Real-time recording timer
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Pause and resume functionality
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Instant video preview
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Local download and cloud upload
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab('recorder')}>
                      Start Recording
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('recordings')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <List className="h-6 w-6 text-primary" />
                      </div>
                      View Recordings
                    </CardTitle>
                    <CardDescription>
                      Access and manage all your recorded videos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        View all recordings
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Stream videos directly
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Download recordings
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        File information display
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab('recordings')}>
                      View Recordings
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Simple steps to start recording your screen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-semibold">Click Record Screen</h4>
                      <p className="text-sm text-muted-foreground">
                        Grant permissions and select what to record
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-semibold">Record Your Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Pause, resume, and stop when finished
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-semibold">Save or Upload</h4>
                      <p className="text-sm text-muted-foreground">
                        Download locally or upload to cloud storage
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              Screen Recorder App
            </h1>
            <nav className="hidden md:flex space-x-6">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button
                variant={activeTab === 'recorder' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('recorder')}
                className="gap-2"
              >
                <Video className="h-4 w-4" />
                Record Screen
              </Button>
              <Button
                variant={activeTab === 'recordings' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('recordings')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                View Recordings
              </Button>
            </nav>
          </div>
          
          {/* Documentation Button */}
          <DocumentationDialog />
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-2 overflow-x-auto">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className="gap-1 whitespace-nowrap"
            >
              <Home className="h-3 w-3" />
              Home
            </Button>
            <Button
              variant={activeTab === 'recorder' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('recorder')}
              className="gap-1 whitespace-nowrap"
            >
              <Video className="h-3 w-3" />
              Record
            </Button>
            <Button
              variant={activeTab === 'recordings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('recordings')}
              className="gap-1 whitespace-nowrap"
            >
              <List className="h-3 w-3" />
              Recordings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Built with Next.js, React, Express.js, and MongoDB</p>
          <p className="mt-2">Professional screen recording made simple</p>
        </div>
      </footer>
    </div>
  )
}
