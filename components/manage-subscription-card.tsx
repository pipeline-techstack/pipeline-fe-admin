"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { manageSubscriptionUsage } from "@/lib/api";

export default function ManageSubscriptionCard() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await manageSubscriptionUsage({
        email,
        count,
      });
      console.log("Subscription usage updated successfully:", response);
      setSuccess(true);
      alert("Operation Successful");

      // Clear form fields
      setEmail("");
      setCount(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Failed to update subscription usage:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Subscription Usage</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
            Subscription usage updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usageEmail">Email</Label>
            <Input
              id="usageEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Usage Count</Label>
            <Input
              id="count"
              type="number"
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value))}
              min={1}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Usage"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
