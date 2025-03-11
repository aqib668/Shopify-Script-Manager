"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { saveCheckoutScript } from "@/lib/actions"

export default function CheckoutScriptsPage() {
  const [script, setScript] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await saveCheckoutScript(script)
      toast({
        title: "Success",
        description: "Your checkout script has been saved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout Scripts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add Checkout Script</CardTitle>
          <CardDescription>
            This script will be injected into the checkout page of your Shopify store. Make sure to include the full
            script tag.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="<script>// Your tracking code here</script>"
            className="min-h-[200px] font-mono"
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Script"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

