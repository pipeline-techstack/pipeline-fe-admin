"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addOrganization } from "@/lib/api";

export default function AddSubscriptionCard() {
  const [name, setName] = useState("");
  const [enterprisePriceId, setEnterprisePriceId] = useState(
    "price_1RLyXGIYrWUwXZcrnqllD67p"
  );
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await addOrganization({
        name,
        enterprisePriceId,
        email,
      });
      console.log("Subscription added successfully:", response);
      setSuccess(true);
      alert("Operation Successful");

      // Clear form fields
      setName("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Failed to add subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Enterprise Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 mb-4 p-3 rounded-md text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 mb-4 p-3 rounded-md text-green-800">
            Subscription added successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="TechStack Management"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enterprisePriceId">Enterprise Price ID</Label>
            <Input
              id="enterprisePriceId"
              value={enterprisePriceId}
              onChange={(e) => setEnterprisePriceId(e.target.value)}
              placeholder="price_1RLyXGIYrWUwXZcrnqllD67p"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subEmail">Email</Label>
            <Input
              id="subEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Subscription"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
