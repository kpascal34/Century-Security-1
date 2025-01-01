'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Video, FileText } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const trainingMaterials = [
  { id: 1, title: "Basic Security Procedures", type: "Video", duration: "15 min", url: "https://example.com/video1" },
  { id: 2, title: "Emergency Response Guidelines", type: "Document", pages: 10, url: "https://example.com/doc1" },
  { id: 3, title: "De-escalation Techniques", type: "Video", duration: "20 min", url: "https://example.com/video2" },
  { id: 4, title: "First Aid Basics", type: "Document", pages: 15, url: "https://example.com/doc2" },
]

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'Video', duration: '', pages: '', url: '' })

  const filteredMaterials = trainingMaterials.filter(material => 
    (material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || material.type.toLowerCase() === activeTab)
  )

  const addMaterial = (e) => {
    e.preventDefault()
    // Here you would typically send the new material to your backend
    console.log("Adding new material:", newMaterial)
    // Reset the form
    setNewMaterial({ title: '', type: 'Video', duration: '', pages: '', url: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1c3664] mb-4 sm:mb-0">Training Materials</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Training Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Training Material</DialogTitle>
            </DialogHeader>
            <form onSubmit={addMaterial} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newMaterial.title} 
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select 
                  id="type" 
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="Video">Video</option>
                  <option value="Document">Document</option>
                </select>
              </div>
              {newMaterial.type === 'Video' ? (
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number"
                    value={newMaterial.duration} 
                    onChange={(e) => setNewMaterial({...newMaterial, duration: e.target.value})}
                    required
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="pages">Number of Pages</Label>
                  <Input 
                    id="pages" 
                    type="number"
                    value={newMaterial.pages} 
                    onChange={(e) => setNewMaterial({...newMaterial, pages: e.target.value})}
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="url">URL</Label>
                <Input 
                  id="url" 
                  value={newMaterial.url} 
                  onChange={(e) => setNewMaterial({...newMaterial, url: e.target.value})}
                  required
                />
              </div>
              <Button type="submit">Add Material</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Training Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <Input
              placeholder="Search training materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm mb-4 sm:mb-0"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="document">Documents</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration/Pages</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.title}</TableCell>
                    <TableCell>
                      {material.type === 'Video' ? (
                        <Video className="h-4 w-4 inline mr-2" />
                      ) : (
                        <FileText className="h-4 w-4 inline mr-2" />
                      )}
                      {material.type}
                    </TableCell>
                    <TableCell>{material.duration || `${material.pages} pages`}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <a href={material.url} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

