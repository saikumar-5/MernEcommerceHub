import { ChevronDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiLeetcode } from "react-icons/si";

export default function Hero() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Navigate to ${platform} profile`);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Terminal prompt with name */}
          <div className="mb-8">
            <span className="text-[#00d9ff] text-xl font-mono">
              &gt; Sai Kumar Pamoti
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Sai Kumar Pamoti
          </h1>

          {/* Subtitle */}
          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-8">
            Cybersecurity & Technology Enthusiast
          </div>

          {/* Skill badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "Full Stack Development",
              "Security", 
              "Problem Solving",
              "Research"
            ].map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-6 py-3 text-gray-300 border-gray-600 bg-gray-800/50 hover:bg-gray-700/50 transition-colors rounded-full"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <button
              onClick={() => handleSocialClick("linkedin")}
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin className="h-8 w-8" />
            </button>
            <button
              onClick={() => handleSocialClick("github")}
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Github className="h-8 w-8" />
            </button>
            <button
              onClick={() => handleSocialClick("leetcode")}
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <SiLeetcode className="h-8 w-8" />
            </button>
          </div>

          {/* CTA Button */}
          <div className="mb-16">
            <Button
              size="lg"
              onClick={() => handleScrollToSection("#projects")}
              className="bg-[#00d9ff] hover:bg-[#00b8e6] text-black px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => handleScrollToSection("#about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-[#00d9ff] hover:scale-110 transition-transform"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
}