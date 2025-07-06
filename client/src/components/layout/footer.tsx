import { useState } from "react";
import { Heart, MessageCircle, Linkedin, Github, Code } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const commentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

export default function Footer() {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: "",
      profession: "",
      comment: "",
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/analytics/like");
    },
    onSuccess: () => {
      setIsLiked(true);
      toast({
        title: "Thank you!",
        description: "Your like has been recorded.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record your like. Please try again.",
        variant: "destructive",
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (data: CommentFormData) => {
      return apiRequest("POST", "/api/comments", data);
    },
    onSuccess: () => {
      form.reset();
      setIsCommentDialogOpen(false);
      toast({
        title: "Comment submitted!",
        description: "Your comment is pending approval and will be visible once reviewed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/comments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLike = () => {
    if (!isLiked) {
      likeMutation.mutate();
    }
  };

  const onSubmitComment = (data: CommentFormData) => {
    commentMutation.mutate(data);
  };

  return (
    <footer className="bg-[#0a0f1c] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Like and Comment Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-8">
            <button
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className={`flex flex-col items-center gap-2 transition-colors ${
                isLiked
                  ? "text-red-400"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center transition-colors ${
                isLiked
                  ? "border-red-400 bg-red-400/10"
                  : "border-gray-600 hover:border-red-400"
              }`}>
                <Heart className={`w-8 h-8 ${isLiked ? "fill-current" : ""}`} />
              </div>
              <span className="text-sm font-medium">Like</span>
            </button>
            
            <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#00d9ff] transition-colors">
                  <div className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-[#00d9ff] transition-colors">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Comment</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Leave a Comment</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              className="w-full bg-gray-800/50 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:border-[#00d9ff] focus:outline-none"
                              placeholder="Your Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              className="w-full bg-gray-800/50 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:border-[#00d9ff] focus:outline-none"
                              placeholder="Your Profession"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              {...field}
                              rows={4}
                              className="w-full bg-gray-800/50 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:border-[#00d9ff] focus:outline-none resize-none"
                              placeholder="Your comment..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCommentDialogOpen(false)}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={commentMutation.isPending}
                        className="flex-1 bg-[#00d9ff] hover:bg-[#00b8e6] text-black font-semibold"
                      >
                        {commentMutation.isPending ? "Submitting..." : "Submit Comment"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-[#00d9ff] text-lg font-bold">Sai Kumar</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Code className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}