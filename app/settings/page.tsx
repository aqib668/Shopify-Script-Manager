"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Key, ShieldCheck, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [shopDomain, setShopDomain] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!shopDomain || !apiKey || !apiSecret || !accessToken) {
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
      title: "Settings saved",
      description: "Your Shopify API settings have been saved successfully.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="api" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="api">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Shopify API Settings</CardTitle>
                  <CardDescription>Connect your Shopify store to manage script tags</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop-domain">Shop Domain</Label>
                    <Input
                      id="shop-domain"
                      placeholder="your-store.myshopify.com"
                      value={shopDomain}
                      onChange={(e) => setShopDomain(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your full Shopify domain including .myshopify.com
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      placeholder="API Key from your Shopify app"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input
                      id="api-secret"
                      type="password"
                      placeholder="API Secret from your Shopify app"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="access-token">Access Token</Label>
                    <Input
                      id="access-token"
                      type="password"
                      placeholder="Access Token from your Shopify app"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      This is the Admin API access token generated for your custom app
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShopDomain("")
                      setApiKey("")
                      setApiSecret("")
                      setAccessToken("")
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isSubmitting ? "Saving..." : "Save Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security settings for your Shopify integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">API Access</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your app requires the following Shopify API access scopes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>write_script_tags - To add scripts to your thank you page</li>
                    <li>read_orders - To access order data for your scripts</li>
                    <li>read_customers - To access customer data (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Webhook Verification</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Verify Shopify webhooks to ensure secure communication
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate New Webhook Secret
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Creating a Shopify Custom App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Create a Custom App</h3>
              <p className="text-sm text-muted-foreground">
                Go to your Shopify admin → Settings → Apps and sales channels → Develop apps → Create an app
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">2. Configure App Settings</h3>
              <p className="text-sm text-muted-foreground">
                Give your app a name and configure the App URL to point to this Vercel deployment
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">3. Configure API Scopes</h3>
              <p className="text-sm text-muted-foreground">
                Add the required API access scopes: write_script_tags, read_orders, read_customers
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">4. Generate API Credentials</h3>
              <p className="text-sm text-muted-foreground">
                Generate API credentials and add them to the settings above
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

