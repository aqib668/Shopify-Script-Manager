"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, ArrowLeft, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockScripts = [
  {
    id: "1",
    name: "Google Analytics Purchase Tracking",
    status: "active",
    createdAt: "2023-10-15",
    updatedAt: "2023-10-20",
  },
  {
    id: "2",
    name: "Facebook Pixel Conversion",
    status: "inactive",
    createdAt: "2023-09-05",
    updatedAt: "2023-09-05",
  },
  {
    id: "3",
    name: "Custom Affiliate Tracking",
    status: "active",
    createdAt: "2023-08-22",
    updatedAt: "2023-10-01",
  },
]

export default function ScriptsPage() {
  const [scripts, setScripts] = useState(mockScripts)
  const { toast } = useToast()

  const toggleStatus = (id: string) => {
    setScripts(
      scripts.map((script) =>
        script.id === id ? { ...script, status: script.status === "active" ? "inactive" : "active" } : script,
      ),
    )

    toast({
      title: "Status updated",
      description: "The script status has been updated successfully.",
    })
  }

  const deleteScript = (id: string) => {
    setScripts(scripts.filter((script) => script.id !== id))

    toast({
      title: "Script deleted",
      description: "The script has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Manage Scripts</h1>
          </div>
          <Link href="/scripts/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Script
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thank You Page Scripts</CardTitle>
            <CardDescription>Manage scripts that will be injected into your Shopify thank you page</CardDescription>
          </CardHeader>
          <CardContent>
            {scripts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">No scripts found. Create your first script to get started.</p>
                <Link href="/scripts/new">
                  <Button>Add New Script</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scripts.map((script) => (
                    <TableRow key={script.id}>
                      <TableCell className="font-medium">{script.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={script.status === "active" ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => toggleStatus(script.id)}
                        >
                          {script.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{script.createdAt}</TableCell>
                      <TableCell>{script.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/scripts/${script.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/scripts/${script.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => deleteScript(script.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

