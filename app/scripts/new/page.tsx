"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Code, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewScriptPage() {
  const [name, setName] = useState("")
  const [script, setScript] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !script) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Script created",
      description: "Your script has been created successfully.",
    })

    setIsSubmitting(false)

    // In a real app, you would redirect to the scripts list page
    // router.push('/scripts');
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/scripts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Script</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Script Details</CardTitle>
              <CardDescription>Basic information about your script</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Script Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Google Analytics Purchase Tracking"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="active">Active</Label>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="code" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Script Code
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Help & Variables
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>Script Code</CardTitle>
                  <CardDescription>Enter the JavaScript code to be injected into the thank you page</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={`<script>\n  // Your tracking code here\n  console.log('Order completed:', {{ order.order_number }});\n  \n  // Example for Google Analytics 4\n  gtag('event', 'purchase', {\n    transaction_id: '{{ order.order_number }}',\n    value: {{ order.total_price | money_without_currency }},\n    currency: '{{ shop.currency }}'\n  });\n</script>`}
                    className="font-mono min-h-[300px]"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    required
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Available Variables</CardTitle>
                  <CardDescription>Use these Liquid variables in your script to access order data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Order Information</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>{"{{ order.order_number }}"}</code> - Order number
                        </li>
                        <li>
                          <code>{"{{ order.total_price }}"}</code> - Total price
                        </li>
                        <li>
                          <code>{"{{ order.subtotal_price }}"}</code> - Subtotal price
                        </li>
                        <li>
                          <code>{"{{ order.tax_price }}"}</code> - Tax amount
                        </li>
                        <li>
                          <code>{"{{ order.shipping_price }}"}</code> - Shipping cost
                        </li>
                        <li>
                          <code>{"{{ shop.currency }}"}</code> - Currency code
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Line Items</h3>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <pre className="whitespace-pre-wrap">
                          {`{% for line_item in order.line_items %}
  // Access each line item
  {{ line_item.product_id }}
  {{ line_item.product.title }}
  {{ line_item.price }}
  {{ line_item.quantity }}
{% endfor %}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Example: Google Analytics 4</h3>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <pre className="whitespace-pre-wrap">
                          {`<script>
  gtag('event', 'purchase', {
    transaction_id: '{{ order.order_number }}',
    value: {{ order.total_price | money_without_currency }},
    tax: {{ order.tax_price | money_without_currency }},
    shipping: {{ order.shipping_price | money_without_currency }},
    currency: '{{ shop.currency }}',
    items: [
      {% for line_item in order.line_items %}
      {
        item_id: '{{ line_item.product_id }}',
        item_name: '{{ line_item.product.title | replace: "'", "\\'" }}',
        price: {{ line_item.price | money_without_currency }},
        quantity: {{ line_item.quantity }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  });
</script>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3">
            <Link href="/scripts">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Script"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

