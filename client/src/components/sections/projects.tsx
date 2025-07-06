import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "PHISHX",
      category: "Security",
      description: "Phishing Detection Extension",
      fullDescription: "Developed a browser extension that extracts and analyzes URLs using a Flask-based backend and XGBoost ML model to detect phishing websites with real-time predictions.",
      technologies: ["Python", "Flask", "XGBoost", "ML"],
      badge: "Extension",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      githubUrl: "https://github.com/saikumar-5/PhishX",
      // liveUrl: "https://phishx-demo.vercel.app"
    },
    {
      id: 2,
      title: "AGRIMART",
      category: "E-commerce",
      description: "Online Marketplace",
      fullDescription: "Developed a full-stack e-commerce marketplace connecting farmers with customers, featuring custom dashboards for real-time tracking of sales and transactions.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
      badge: "Full Stack",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
      githubUrl: "https://github.com/abhiram1206/agrimart",
      // liveUrl: "https://agrimart.vercel.app"
    },
    {
      id: 3,
      title: "AGRIMART (Android)",
      category: "Mobile App",
      description: "Android E-commerce App",
      fullDescription: "Developed an Android application for AgriMart marketplace using XML for UI design and Java for backend integration, featuring responsive design and seamless user experience.",
      technologies: ["Android Studio", "XML", "Java", "API Integration"],
      badge: "Native Android",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      githubUrl: "https://github.com/saikumar-5/Agrimart-Farmers-Panel",
      // liveUrl: null // No live demo for Android app
    },
    {
      id: 4,
      title: "Nano-Mechanical Analysis",
      category: "Research",
      description: "Material Science Research",
      fullDescription: "Conducting comprehensive research on vehicle gear materials utilizing nanoindentation test results analyzed through Python and Data Analysis techniques with ML models.",
      technologies: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
      badge: "Ongoing",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      // githubUrl: "https://github.com/yourusername/nano-mechanical-analysis",
      // liveUrl: null // Research project, no live demo
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Projects/&gt;
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-gray-800/30 border border-gray-700 hover:border-[#00d9ff]/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#00d9ff] text-sm font-medium">
                      {project.category}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                  <Badge className={`${project.badgeColor} text-xs px-2 py-1`}>
                    {project.badge}
                  </Badge>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {project.fullDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-[#00d9ff] transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {/* {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-[#00d9ff] transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )} */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}