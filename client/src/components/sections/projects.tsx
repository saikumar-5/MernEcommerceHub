import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Github, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@/../../shared/schema";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const likeMutation = useMutation({
    mutationFn: async (projectId: number) => {
      return apiRequest("POST", `/api/projects/${projectId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });

  const filteredProjects = projects.filter(project => 
    filter === "all" || project.category === filter
  );

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
              &lt;Projects/&gt;
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Projects/&gt;
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={
                filter === category
                  ? "bg-[#00d9ff] text-black hover:bg-[#00b8e6]"
                  : "border-gray-600 text-gray-300 hover:border-[#00d9ff] hover:text-white"
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      className={`
                        ${project.category === 'security' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 
                          project.category === 'e-commerce' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                          project.category === 'mobile' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/50'}
                      `}
                    >
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#00d9ff] mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-gray-300 border-gray-600 bg-gray-700/50 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:border-[#00d9ff] hover:text-white"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:border-[#00d9ff] hover:text-white"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Like Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => likeMutation.mutate(project.id)}
                      disabled={likeMutation.isPending}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {project.likes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}