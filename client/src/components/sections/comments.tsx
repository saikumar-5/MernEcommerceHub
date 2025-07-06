import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, User, Briefcase } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@/../../shared/schema";

export default function Comments() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    comment: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get approved comments only
  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ["/api/comments/approved"],
  });

  const submitMutation = useMutation({
    mutationFn: async (data: { name: string; profession: string; comment: string }) => {
      return apiRequest("POST", "/api/comments", {
        name: data.name,
        email: `${data.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        profession: data.profession,
        comment: data.comment
      });
    },
    onSuccess: () => {
      toast({
        title: "Comment Submitted!",
        description: "Your comment has been submitted for review and will appear once approved.",
        variant: "default",
      });
      setFormData({ name: "", profession: "", comment: "" });
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/comments"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.profession.trim() || !formData.comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  return (
    <section id="comments" className="py-20 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            Comments
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            What people are saying
          </p>
          
          {/* Comment Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#00d9ff] hover:bg-[#00b8e6] text-black px-6 py-3 rounded-lg font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Leave a Comment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[#00d9ff]">Leave a Comment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Your Profession
                  </label>
                  <Input
                    value={formData.profession}
                    onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                    placeholder="e.g., Software Engineer, Designer"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Your Comment
                  </label>
                  <Textarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="w-full bg-[#00d9ff] hover:bg-[#00b8e6] text-black"
                >
                  {submitMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Comment
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Comments Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-800/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white">{comment.name}</h4>
                      <p className="text-sm text-gray-400">{comment.profession}</p>
                    </div>
                    <Badge variant="outline" className="text-xs text-green-400 border-green-500/50">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{comment.comment}"
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
}