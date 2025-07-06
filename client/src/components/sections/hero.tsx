import { ChevronDown, Github, Linkedin, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    // In a real app, these would link to actual social profiles
    console.log(`Navigate to ${platform} profile`);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Hi, I'm</span>
            <span className="block mt-2 text-primary typewriter">Sai Kumar Pamoti</span>
          </h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 font-mono">
            <span className="text-green-500">&lt;</span>
            Full Stack Developer
            <span className="text-green-500">/&gt;</span>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating innovative web solutions using the MERN stack.
            I build scalable applications that deliver exceptional user experiences and robust backend architectures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => handleScrollToSection("#projects")}
              className="btn-primary px-8 py-3"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollToSection("#contact")}
              className="btn-secondary px-8 py-3"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <button
              onClick={() => handleSocialClick("github")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl transform hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleSocialClick("linkedin")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl transform hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleSocialClick("leetcode")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl transform hover:scale-110"
            >
              <Code className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => handleScrollToSection("#about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary hover:scale-110 transition-transform"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
}
