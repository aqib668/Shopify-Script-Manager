import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Shopify Script Manager</h1>
          <p className="text-xl text-muted-foreground">Add custom tracking scripts to your Shopify thank you page</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-10">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Manage Scripts</CardTitle>
              <CardDescription>Create, edit, and manage your thank you page scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add tracking scripts that will be injected into your Shopify thank you page. Support for variables like
                order ID, total, and products.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/scripts" className="w-full">
                <Button className="w-full">Manage Scripts</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>Configure your Shopify connection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect your Shopify store and configure authentication settings. Manage API credentials and app
                permissions.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/settings" className="w-full">
                <Button className="w-full" variant="outline">
                  Settings
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Create a Shopify App</h3>
              <p className="text-sm text-muted-foreground">
                Create a custom app in your Shopify Partner account with the required permissions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. Configure API Credentials</h3>
              <p className="text-sm text-muted-foreground">Add your Shopify API credentials in the Settings page.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">3. Create Your First Script</h3>
              <p className="text-sm text-muted-foreground">
                Add a tracking script that will be injected into your thank you page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

