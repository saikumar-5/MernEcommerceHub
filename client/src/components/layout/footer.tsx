import { Link } from "wouter";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    // In a real app, these would link to actual social profiles
    console.log(`Navigate to ${platform} profile`);
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-primary font-mono mb-4">
              &lt;SK/&gt;
            </div>
            <p className="text-muted-foreground mb-4">
              Full Stack Developer passionate about creating innovative web solutions.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("github")}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("linkedin")}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("twitter")}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Technologies</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">React & Node.js</span>
              </li>
              <li>
                <span className="text-muted-foreground">MongoDB & Express</span>
              </li>
              <li>
                <span className="text-muted-foreground">TypeScript & Python</span>
              </li>
              <li>
                <span className="text-muted-foreground">AWS & Docker</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Sai Kumar Pamoti. Built with React, Node.js, and MongoDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
