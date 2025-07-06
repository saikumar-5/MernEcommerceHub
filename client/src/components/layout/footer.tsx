import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";
import type { Analytics } from "@/../../shared/schema";

export default function Footer() {
  const [liked, setLiked] = useState(false);
  const queryClient = useQueryClient();

  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/analytics/like");
    },
    onSuccess: () => {
      setLiked(true);
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
  });

  const handleSocialClick = (platform: string) => {
    const urls = {
      linkedin: "https://www.linkedin.com/in/saikumar-pamoti",
      github: "https://github.com/saikumar-pamoti", 
      leetcode: "https://leetcode.com/saikumar-pamoti"
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  const scrollToComments = () => {
    const element = document.getElementById("comments");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[#00d9ff] mb-4">Sai Kumar</h3>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => handleSocialClick("linkedin")}
              className="p-3 text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin className="h-8 w-8" />
            </button>
            <button
              onClick={() => handleSocialClick("github")}
              className="p-3 text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Github className="h-8 w-8" />
            </button>
            <button
              onClick={() => handleSocialClick("leetcode")}
              className="p-3 text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <SiLeetcode className="h-8 w-8" />
            </button>
          </div>

          {/* Like and Comment Buttons */}
          <div className="flex justify-center space-x-8 mb-8">
            <Button
              variant="ghost"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending || liked}
              className={`flex items-center space-x-2 text-lg px-6 py-3 rounded-full transition-all duration-300 ${
                liked 
                  ? "text-red-400 bg-red-400/10" 
                  : "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
              <span>Like</span>
            </Button>

            <Button
              variant="ghost"
              onClick={scrollToComments}
              className="flex items-center space-x-2 text-lg px-6 py-3 rounded-full text-gray-400 hover:text-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Comment</span>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sai Kumar Pamoti. All rights reserved.
          </p>
          {analytics && (
            <p className="text-gray-500 text-xs mt-2">
              {analytics.totalVisitors} visitors • {analytics.totalComments} comments
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}