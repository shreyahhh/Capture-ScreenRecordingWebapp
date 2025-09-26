"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Code, Zap, Target } from "lucide-react"

export function DocumentationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Screen Recorder App - Technical Documentation</DialogTitle>
          <DialogDescription>
            Comprehensive overview of the development stack, features, and implementation details.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="scope">Scope</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    Full-stack MERN application with modern frontend built using Next.js 14, 
                    Framer Motion for animations, and Shadcn/UI for component library. 
                    Backend powered by Express.js with MongoDB GridFS for video storage.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Core Functionality</h4>
                  <p className="text-sm text-muted-foreground">
                    Screen recording application that captures system audio and video, 
                    provides real-time preview, local download capabilities, and cloud storage 
                    with streaming playback functionality.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Development Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Component-driven development with TypeScript for type safety, 
                    modern React patterns with hooks, responsive design principles, 
                    and production-ready error handling and validation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tech-stack" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frontend Stack</CardTitle>
                  <CardDescription>Modern React ecosystem with performance optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Next.js 14</span>
                    <span className="text-sm text-muted-foreground">App Router, SSR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">React 18</span>
                    <span className="text-sm text-muted-foreground">Hooks, Suspense</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">TypeScript</span>
                    <span className="text-sm text-muted-foreground">Type Safety</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Framer Motion</span>
                    <span className="text-sm text-muted-foreground">Animations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shadcn/UI</span>
                    <span className="text-sm text-muted-foreground">Component Library</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tailwind CSS</span>
                    <span className="text-sm text-muted-foreground">Styling</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Backend Stack</CardTitle>
                  <CardDescription>Scalable server architecture with cloud storage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Node.js</span>
                    <span className="text-sm text-muted-foreground">Runtime</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Express.js</span>
                    <span className="text-sm text-muted-foreground">Web Framework</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">MongoDB</span>
                    <span className="text-sm text-muted-foreground">Database</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">GridFS</span>
                    <span className="text-sm text-muted-foreground">File Storage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Multer</span>
                    <span className="text-sm text-muted-foreground">File Upload</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mongoose</span>
                    <span className="text-sm text-muted-foreground">ODM</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Media APIs</CardTitle>
                  <CardDescription>Browser media capture and processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">MediaRecorder API</span>
                    <span className="text-sm text-muted-foreground">Video Recording</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">getDisplayMedia</span>
                    <span className="text-sm text-muted-foreground">Screen Capture</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">getUserMedia</span>
                    <span className="text-sm text-muted-foreground">Audio Capture</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">WebM Format</span>
                    <span className="text-sm text-muted-foreground">VP9 Codec</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Development Tools</CardTitle>
                  <CardDescription>Modern development and build pipeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Vite</span>
                    <span className="text-sm text-muted-foreground">Build Tool</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">ESLint</span>
                    <span className="text-sm text-muted-foreground">Code Quality</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">PostCSS</span>
                    <span className="text-sm text-muted-foreground">CSS Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Nodemon</span>
                    <span className="text-sm text-muted-foreground">Dev Server</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Core Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Screen recording with system audio capture</div>
                  <div>• Real-time recording timer (MM:SS format)</div>
                  <div>• Pause and resume recording functionality</div>
                  <div>• Instant video preview after recording</div>
                  <div>• Local download capability</div>
                  <div>• Cloud upload with progress tracking</div>
                  <div>• Recordings library with streaming playback</div>
                  <div>• File size and duration validation</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Advanced Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Browser compatibility detection</div>
                  <div>• Safari fallback messaging</div>
                  <div>• Upload status indicators</div>
                  <div>• Error handling and recovery</div>
                  <div>• Responsive design</div>
                  <div>• Professional UI animations</div>
                  <div>• GridFS video streaming</div>
                  <div>• RESTful API architecture</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Technical Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• WebM video format with VP9 codec</div>
                  <div>• Multiple audio track support</div>
                  <div>• Real-time file size calculation</div>
                  <div>• MongoDB GridFS for large files</div>
                  <div>• CORS-enabled API endpoints</div>
                  <div>• Environment-based configuration</div>
                  <div>• Production deployment ready</div>
                  <div>• TypeScript type safety</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>• Intuitive recording controls</div>
                  <div>• Clear status messaging</div>
                  <div>• Professional design system</div>
                  <div>• Smooth animations and transitions</div>
                  <div>• Comprehensive error feedback</div>
                  <div>• Mobile-responsive interface</div>
                  <div>• Accessible component design</div>
                  <div>• Progressive enhancement</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="scope" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Scope</CardTitle>
                <CardDescription>Current capabilities and future expansion possibilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Current Implementation</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• Full-stack screen recording application</div>
                    <div>• Professional-grade video capture and storage</div>
                    <div>• Modern React frontend with Next.js</div>
                    <div>• Scalable Express.js backend</div>
                    <div>• MongoDB cloud storage integration</div>
                    <div>• Production-ready deployment configuration</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Browser Support</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• Chrome: Full support (recommended)</div>
                    <div>• Firefox: Full support</div>
                    <div>• Edge: Full support</div>
                    <div>• Safari: Limited support with fallback</div>
                    <div>• Mobile browsers: Limited screen recording</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Potential Extensions</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• User authentication and profiles</div>
                    <div>• Recording annotations and editing</div>
                    <div>• Multiple output formats</div>
                    <div>• Recording scheduling</div>
                    <div>• Team collaboration features</div>
                    <div>• Advanced video analytics</div>
                    <div>• Mobile app development</div>
                    <div>• Enterprise integrations</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Deployment Targets</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• Frontend: Netlify, Vercel, AWS S3</div>
                    <div>• Backend: Railway, Heroku, AWS EC2</div>
                    <div>• Database: MongoDB Atlas</div>
                    <div>• CDN: CloudFlare, AWS CloudFront</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
