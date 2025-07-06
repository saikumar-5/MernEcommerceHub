import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Calendar,
  TrendingUp,
  Mail,
  User,
  Briefcase
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Analytics, Comment, Contact } from "@/../../shared/schema";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  const { data: allComments = [] } = useQuery<Comment[]>({
    queryKey: ["/api/comments"],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  // Separate approved and pending comments
  const approvedComments = allComments.filter(comment => comment.isApproved);
  const pendingComments = allComments.filter(comment => !comment.isApproved);

  // Mutations
  const approveCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest("POST", `/api/comments/${commentId}/approve`);
    },
    onSuccess: () => {
      toast({
        title: "Comment Approved",
        description: "The comment is now visible to visitors.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/comments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest("DELETE", `/api/comments/${commentId}`);
    },
    onSuccess: () => {
      toast({
        title: "Comment Deleted",
        description: "The comment has been removed.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/comments"] });
    },
  });

  const markContactReadMutation = useMutation({
    mutationFn: async (contactId: number) => {
      return apiRequest("POST", `/api/contacts/${contactId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#00d9ff] mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio analytics, comments, and contacts</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black">
              Comments
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Visitors</CardTitle>
                  <Users className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics?.totalVisitors || 0}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{allComments.length}</div>
                  <p className="text-xs text-gray-400">
                    {approvedComments.length} approved, {pendingComments.length} pending
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Contact Messages</CardTitle>
                  <Mail className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{contacts.length}</div>
                  <p className="text-xs text-gray-400">
                    {contacts.filter(c => !c.isRead).length} unread
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Likes</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics?.totalLikes || 0}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#00d9ff]">Recent Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allComments.slice(0, 3).map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{comment.name}</span>
                          <Badge variant={comment.isApproved ? "default" : "secondary"} className="text-xs">
                            {comment.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{comment.comment.slice(0, 100)}...</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#00d9ff]">Recent Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contacts.slice(0, 3).map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {contact.firstName} {contact.lastName}
                          </span>
                          {!contact.isRead && (
                            <Badge variant="destructive" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{contact.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Comments */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#00d9ff] flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Pending Approval ({pendingComments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {pendingComments.length > 0 ? (
                    pendingComments.map((comment) => (
                      <div key={comment.id} className="border border-gray-700 rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-[#00d9ff]" />
                              <span className="font-medium text-white">{comment.name}</span>
                            </div>
                            {comment.profession && (
                              <div className="flex items-center gap-2 mt-1">
                                <Briefcase className="h-3 w-3 text-gray-400" />
                                <span className="text-sm text-gray-400">{comment.profession}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => approveCommentMutation.mutate(comment.id)}
                              disabled={approveCommentMutation.isPending}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteCommentMutation.mutate(comment.id)}
                              disabled={deleteCommentMutation.isPending}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{comment.comment}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{comment.email}</span>
                          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">No pending comments</p>
                  )}
                </CardContent>
              </Card>

              {/* Approved Comments */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#00d9ff] flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Approved Comments ({approvedComments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {approvedComments.map((comment) => (
                    <div key={comment.id} className="border border-gray-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-400" />
                            <span className="font-medium text-white">{comment.name}</span>
                            <Badge className="bg-green-500/20 text-green-400 text-xs">Live</Badge>
                          </div>
                          {comment.profession && (
                            <div className="flex items-center gap-2 mt-1">
                              <Briefcase className="h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-400">{comment.profession}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCommentMutation.mutate(comment.id)}
                          disabled={deleteCommentMutation.isPending}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-300 text-sm">{comment.comment}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{comment.email}</span>
                        <span>{comment.likes} likes</span>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#00d9ff] flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Messages ({contacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {contact.firstName} {contact.lastName}
                          </span>
                          {!contact.isRead && (
                            <Badge variant="destructive" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{contact.email}</p>
                        <p className="text-sm font-medium text-[#00d9ff] mt-1">{contact.subject}</p>
                      </div>
                      {!contact.isRead && (
                        <Button
                          size="sm"
                          onClick={() => markContactReadMutation.mutate(contact.id)}
                          className="bg-[#00d9ff] hover:bg-[#00b8e6] text-black"
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{contact.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No contact messages yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{analytics?.totalVisitors || 0}</div>
                  <p className="text-xs text-gray-400 mt-1">Unique visitors tracked</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Engagement Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {analytics?.totalVisitors ? 
                      Math.round((allComments.length / analytics.totalVisitors) * 100) : 0}%
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Comments per visitor</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Contact Rate</CardTitle>
                  <Mail className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {analytics?.totalVisitors ? 
                      Math.round((contacts.length / analytics.totalVisitors) * 100) : 0}%
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Contacts per visitor</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Approval Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-[#00d9ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {allComments.length ? 
                      Math.round((approvedComments.length / allComments.length) * 100) : 0}%
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Comments approved</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}