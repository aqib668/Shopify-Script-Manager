"use server"

import { revalidatePath } from "next/cache"

export async function saveCheckoutScript(scriptContent: string) {
  // In a real app, you would save this script to a database
  console.log("Saving checkout script:", scriptContent)
  revalidatePath("/checkout-scripts")
  return { success: true }
}

export async function saveThankYouScript(scriptContent: string) {
  // In a real app, you would save this script to a database
  console.log("Saving thank you script:", scriptContent)
  revalidatePath("/thankyou-scripts")
  return { success: true }
}

