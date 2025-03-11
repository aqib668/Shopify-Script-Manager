"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { saveThankYouScript } from "@/lib/actions"

export default function ThankYouScriptsPage() {
  const [script, setScript] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await saveThankYouScript(script)
      toast({
        title: "Success",
        description: "Your thank you page script has been saved",
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
      <h1 className="text-3xl font-bold mb-6">Thank You Page Scripts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add Thank You Page Script</CardTitle>
          <CardDescription>
            This script will be injected into the order confirmation (thank you) page of your Shopify store. You can
            access order details using Shopify's Liquid variables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`<script>
// Example tracking code
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'purchase',
  'orderId': '{{ order.order_number }}'
});
</script>`}
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

