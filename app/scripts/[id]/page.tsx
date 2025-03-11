"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, RefreshCw } from "lucide-react"

// Mock data for demonstration
const mockScript = {
  id: "1",
  name: "Google Analytics Purchase Tracking",
  status: "active",
  createdAt: "2023-10-15",
  updatedAt: "2023-10-20",
  content: `<script>
  // Google Analytics 4 purchase event
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
        item_variant: '{{ line_item.variant.title | replace: "'", "\\'" }}',
        price: {{ line_item.price | money_without_currency }},
        quantity: {{ line_item.quantity }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  });
</script>`,
}

export default function ScriptDetailPage({ params }: { params: { id: string } }) {
  const [script, setScript] = useState(mockScript)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the script data from your API
    // For now, we'll just simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto text-center py-20">
          <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading script details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/scripts">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{script.name}</h1>
          </div>
          <Link href={`/scripts/${params.id}/edit`}>
            <Button className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Script
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Badge variant={script.status === "active" ? "default" : "secondary"}>
            {script.status === "active" ? "Active" : "Inactive"}
          </Badge>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created: {script.createdAt}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            <span>Updated: {script.updatedAt}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Script Content</CardTitle>
            <CardDescription>This script will be injected into your Shopify thank you page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{script.content}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

