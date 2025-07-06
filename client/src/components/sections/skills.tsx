import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Settings, Shield, Code2, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "Java", level: "Proficient" },
      { name: "SQL", level: "Proficient" },
      { name: "HTML", level: "Proficient" },
      { name: "CSS", level: "Proficient" },
      { name: "Python", level: "Experienced" },
      { name: "JavaScript", level: "Experienced" },
      { name: "C", level: "Familiar" },
      { name: "C++", level: "Familiar" },
      { name: "R Programming", level: "Familiar" }
    ]
  },
  {
    title: "Cybersecurity",
    icon: <Shield className="w-6 h-6" />,
    skills: [
      { name: "Malware Analysis", level: "✓" },
      { name: "Intrusion Detection", level: "✓" },
      { name: "Network Security", level: "✓" },
      { name: "Threat Analysis", level: "✓" },
      { name: "Security Frameworks", level: "✓" }
    ]
  },
  {
    title: "Libraries/Frameworks",
    icon: <Settings className="w-6 h-6" />,
    skills: [
      { name: "Express.js", level: "✓" },
      { name: "Pandas", level: "✓" },
      { name: "Numpy", level: "✓" },
      { name: "Matplotlib", level: "✓" },
      { name: "nltk", level: "✓" },
      { name: "Sklearn", level: "✓" }
    ]
  },
  {
    title: "Tools/Platforms",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Git", level: "✓" },
      { name: "Burp Suite", level: "✓" },
      { name: "Wireshark", level: "✓" },
      { name: "Figma", level: "✓" },
      { name: "Cisco Packet Tracer", level: "✓" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Skills/&gt;
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#00d9ff] text-lg">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    {skill.level === "✓" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          skill.level === "Proficient" ? "border-green-500 text-green-400 bg-green-500/10" :
                          skill.level === "Experienced" ? "border-blue-500 text-blue-400 bg-blue-500/10" :
                          "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                        }`}
                      >
                        {skill.level}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}