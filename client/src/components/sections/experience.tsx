import { useQuery } from "@tanstack/react-query";
import type { Experience } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperienceSection() {
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  return (
    <section id="experience" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full hidden lg:block"></div>

          {isLoading ? (
            <div className="space-y-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative flex items-center justify-between">
                  <div className="w-5/12 pr-8">
                    <div className="bg-background p-6 rounded-lg">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-5 w-1/2 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-card hidden lg:block"></div>
                  <div className="w-5/12 pl-8">
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {experiences?.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Mobile layout */}
                  <div className="lg:hidden">
                    <div className="bg-background p-6 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {experience.position}
                          </h3>
                          <h4 className="text-primary font-semibold mb-2">{experience.company}</h4>
                          <div className="text-primary font-mono font-bold text-sm">
                            {experience.startDate} - {experience.endDate || "Present"}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {experience.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs font-mono">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden lg:flex items-center justify-between">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-5/12 text-right pr-8">
                          <div className="bg-background p-6 rounded-lg border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {experience.position}
                            </h3>
                            <h4 className="text-primary font-semibold mb-3">{experience.company}</h4>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {experience.description}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-end">
                              {experience.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs font-mono">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Timeline dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-card"></div>

                        <div className="w-5/12 pl-8">
                          <div className="text-primary font-mono font-bold">
                            {experience.startDate} - {experience.endDate || "Present"}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-5/12 pr-8">
                          <div className="text-primary font-mono font-bold text-right">
                            {experience.startDate} - {experience.endDate || "Present"}
                          </div>
                        </div>

                        {/* Timeline dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-card"></div>

                        <div className="w-5/12 text-left pl-8">
                          <div className="bg-background p-6 rounded-lg border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {experience.position}
                            </h3>
                            <h4 className="text-primary font-semibold mb-3">{experience.company}</h4>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {experience.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs font-mono">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {experiences && experiences.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No experience data available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
