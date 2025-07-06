import { CheckCircle, Code, Shield, Wrench, Globe } from "lucide-react";

interface ProgrammingSkill {
  name: string;
  level: "proficient" | "experienced" | "familiar";
  color: string;
}

interface VerifiedSkill {
  name: string;
  verified: boolean;
}

interface ToolSkill {
  name: string;
  icon: string;
}

export default function Skills() {
  const programmingSkills: ProgrammingSkill[] = [
    { name: "Java", level: "proficient", color: "bg-green-500" },
    { name: "SQL", level: "proficient", color: "bg-green-500" },
    { name: "HTML", level: "proficient", color: "bg-green-500" },
    { name: "CSS", level: "proficient", color: "bg-green-500" },
    { name: "Python", level: "experienced", color: "bg-yellow-500" },
    { name: "JavaScript", level: "experienced", color: "bg-yellow-500" },
    { name: "C", level: "experienced", color: "bg-yellow-500" },
    { name: "C++", level: "experienced", color: "bg-yellow-500" },
    { name: "R Programming", level: "familiar", color: "bg-blue-500" }
  ];

  const cybersecuritySkills: VerifiedSkill[] = [
    { name: "Malware Analysis", verified: true },
    { name: "Intrusion Detection", verified: true },
    { name: "Network Security", verified: true },
    { name: "Threat Analysis", verified: true },
    { name: "Security Frameworks", verified: true }
  ];

  const librarySkills: VerifiedSkill[] = [
    { name: "Express.js", verified: true },
    { name: "Pandas", verified: true },
    { name: "Numpy", verified: true },
    { name: "Matplotlib", verified: true },
    { name: "nlkt", verified: true },
    { name: "Sklearn", verified: true }
  ];

  const toolSkills: ToolSkill[] = [
    { name: "Git", icon: "🔧" },
    { name: "Burp Suite", icon: "🐛" },
    { name: "Wireshark", icon: "🌐" },
    { name: "Figma", icon: "🎨" },
    { name: "Cisco Packet Tracer", icon: "🌐" }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Programming Skills */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-[#00d9ff]" />
              <h3 className="text-lg font-bold text-[#00d9ff]">Programming</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Proficient:</h4>
                <div className="flex flex-wrap gap-1">
                  {programmingSkills.filter(skill => skill.level === "proficient").map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Experienced:</h4>
                <div className="flex flex-wrap gap-1">
                  {programmingSkills.filter(skill => skill.level === "experienced").map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Familiar:</h4>
                <div className="flex flex-wrap gap-1">
                  {programmingSkills.filter(skill => skill.level === "familiar").map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cybersecurity Skills */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#00d9ff]" />
              <h3 className="text-lg font-bold text-[#00d9ff]">Cybersecurity</h3>
            </div>

            <div className="space-y-3">
              {cybersecuritySkills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Libraries/Frameworks */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-[#00d9ff]" />
              <h3 className="text-lg font-bold text-[#00d9ff]">Libraries/Frameworks</h3>
            </div>

            <div className="space-y-3">
              {librarySkills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools/Platforms */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-6 h-6 text-[#00d9ff]" />
              <h3 className="text-lg font-bold text-[#00d9ff]">Tools/Platforms</h3>
            </div>

            <div className="space-y-3">
              {toolSkills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="text-gray-300 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}