import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/../../shared/schema";

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
              &lt;Projects/&gt;
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-gray-800/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#00d9ff] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      project.category === "Security" ? "bg-red-500/20 text-red-400 border-red-500/50" :
                      project.category === "E-commerce" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                      project.category === "Mobile App" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" :
                      "bg-purple-500/20 text-purple-400 border-purple-500/50"
                    }`}
                  >
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-gray-700/50 text-gray-300 border-gray-600"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Special metrics */}
                {project.title === "PHISHX" && (
                  <div className="mb-4">
                    <span className="text-[#00d9ff] font-bold">97% Accuracy</span>
                  </div>
                )}
                
                {project.title === "AGRIMART" && (
                  <div className="mb-4">
                    <span className="text-[#00d9ff] font-bold">Full Stack MERN</span>
                  </div>
                )}
                
                {project.title === "AGRIMART MOBILE" && (
                  <div className="mb-4">
                    <span className="text-[#00d9ff] font-bold">Native Android 2024-Current</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => project.githubUrl && window.open(project.githubUrl as string, '_blank')}
                      className="flex-1 border-gray-600 hover:bg-gray-700 text-gray-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => project.liveUrl && window.open(project.liveUrl as string, '_blank')}
                      className="flex-1 border-gray-600 hover:bg-gray-700 text-gray-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}