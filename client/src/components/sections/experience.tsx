import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import type { Experience } from "@/../../shared/schema";

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
              &lt;Experience/&gt;
            </h2>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-800/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Experience/&gt;
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00d9ff]"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-[#00d9ff] rounded-full border-4 border-[#0a0f1c]"></div>

                {/* Content */}
                <div className="ml-20">
                  <Card className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#00d9ff] mb-2">
                            {experience.position}
                          </h3>
                          <h4 className="text-lg text-white mb-2">
                            {experience.company}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col lg:items-end space-y-2">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {experience.startDate} - {experience.endDate || "Present"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>Remote</span>
                          </div>
                          {!experience.endDate && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-gray-300 border-gray-600 bg-gray-700/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}