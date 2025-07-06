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

                {/* Content - Always left aligned */}
                <div className="ml-20">
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-[#00d9ff] mb-2">
                      {experience.position}
                    </h3>
                    <h4 className="text-lg text-white mb-1">
                      {experience.company}
                    </h4>
                    <div className="text-sm text-gray-400 mb-3">
                      {experience.startDate} - {experience.endDate || "Present"} • {experience.endDate || "Present"} • Remote
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    {!experience.endDate && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50 mb-4">
                        Current
                      </Badge>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-gray-300 border-gray-600 bg-gray-700/50 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}