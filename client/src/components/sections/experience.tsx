export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      position: "Full Stack Web Developer",
      company: "Innodatatics - GenAI | Data Science | BI",
      duration: "June 2025 - Present",
      location: "Hyderabad, Telangana",
      description: "Working on advanced web development projects with focus on GenAI integration and data science applications.",
      status: "Current",
      type: "work"
    },
    {
      id: 2,
      position: "Cyber Security Tool Developer",
      company: "Durbhasi Gurukulam",
      duration: "April 2025 - Present",
      location: "Remote",
      description: "Building a live IPS tool using Fail2Ban and Rust programming language. Gaining hands-on experience in network security, intrusion detection, and static malware analysis.",
      status: "Current",
      type: "work"
    },
    {
      id: 3,
      position: "Research Assistant",
      company: "BML Munjal University",
      duration: "August 2024 - Present",
      location: "Gurugram, Haryana",
      description: "Conducting research on heterogeneous nano-mechanical behavior of vehicle gear materials using Python data analysis and machine learning techniques.",
      status: "Current",
      type: "research"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Experience/&gt;
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00d9ff]"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-[#00d9ff] rounded-full border-4 border-[#0a0f1c]"></div>
                
                {/* Content card */}
                <div className="ml-20 w-full">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:border-[#00d9ff]/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#00d9ff] mb-1">
                          {experience.position}
                        </h3>
                        <p className="text-lg text-white font-medium">
                          {experience.company}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {experience.duration} • {experience.location}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] text-sm rounded-full border border-[#00d9ff]/30">
                        {experience.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>
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