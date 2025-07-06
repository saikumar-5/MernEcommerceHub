import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiLeetcode } from "react-icons/si";

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const fullText = "Sai Kumar Pamoti";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      if (!isDeleting && currentText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTypingSpeed(150);
        timer = setTimeout(handleType, 500);
      } else {
        setCurrentText(isDeleting 
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
        );
        setTypingSpeed(isDeleting ? 50 : 150);
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, fullText]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      linkedin: "https://www.linkedin.com/in/saikumar-pamoti",
      github: "https://github.com/saikumar-pamoti", 
      leetcode: "https://leetcode.com/saikumar-pamoti"
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Animated Terminal prompt with name */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <span className="text-[#00d9ff] text-3xl md:text-4xl font-mono">
              &gt; {currentText}
            </span>
            <span className="animate-pulse ml-1 text-[#00d9ff] text-3xl md:text-4xl">_</span>
          </div>

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