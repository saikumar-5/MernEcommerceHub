import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Shield, 
  Database, 
  Wrench,
  CheckCircle
} from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "Java", level: "Proficient", color: "text-green-400" },
        { name: "SQL", level: "Proficient", color: "text-green-400" },
        { name: "HTML", level: "Proficient", color: "text-green-400" },
        { name: "CSS", level: "Proficient", color: "text-green-400" },
        { name: "Python", level: "Experienced", color: "text-blue-400" },
        { name: "JavaScript", level: "Experienced", color: "text-blue-400" },
        { name: "C", level: "Experienced", color: "text-blue-400" },
        { name: "C++", level: "Experienced", color: "text-blue-400" },
        { name: "R Programming", level: "Familiar", color: "text-gray-400" }
      ]
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="w-6 h-6" />,
      skills: [
        "Malware Analysis",
        "Intrusion Detection", 
        "Network Security",
        "Threat Analysis",
        "Security Frameworks"
      ]
    },
    {
      title: "Libraries/Frameworks",
      icon: <Database className="w-6 h-6" />,
      skills: [
        "Express.js",
        "Pandas",
        "Numpy",
        "Matplotlib",
        "nlkt",
        "Sklearn"
      ]
    },
    {
      title: "Tools/Platforms",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        "Git",
        "Burp Suite",
        "Wireshark",
        "Figma",
        "Cisco Packet Tracer"
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Skills/&gt;
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="bg-gray-800/30 border-gray-700 hover:border-[#00d9ff]/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-[#00d9ff]">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#00d9ff]">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    // Handle different skill formats
                    if (typeof skill === 'string') {
                      return (
                        <div key={skill} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-300">{skill}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{skill.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs border-gray-600 ${skill.color}`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}