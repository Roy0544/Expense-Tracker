"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function UserProfile() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <Card className="shadow-lg border border-slate-200 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/rony.png" alt="@rony" />
            <AvatarFallback>RR</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">Rony Roy</CardTitle>
            <p className="text-sm text-muted-foreground">rony@example.com</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-300">
              Premium User
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100 dark:bg-slate-900">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome back, Rony 👋 Here’s a quick summary of your finances:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-bold text-red-500">$1,250</p>
                </Card>
                <Card className="p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Remaining Budget
                  </p>
                  <p className="text-lg font-bold text-green-600">$750</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
              <Button variant="destructive" className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">🍽️ Dinner at Pizza Hut</span>
                <span className="text-sm font-medium text-red-500">- $45</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">🚗 Uber Ride</span>
                <span className="text-sm font-medium text-red-500">- $12</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">💰 Salary Credited</span>
                <span className="text-sm font-medium text-green-600">
                  + $1,500
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🛍️ Amazon Shopping</span>
                <span className="text-sm font-medium text-red-500">- $220</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
