import { GraduationCap, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;About Me/&gt;
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div className="space-y-8">
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                Currently pursuing my second year of B.Tech at BML Munjal University, I
                am passionate about developing my skills in Cyber Security and Full Stack
                Development. Eager to learn, explore, and grow in the field, I am
                constantly working towards building a strong foundation for a career in
                cybersecurity.
              </p>
              <p>
                Motivated individual passionate in exploring emerging technologies,
                solving complex challenges, and continuously enhancing technical
                expertise and communication skills to make meaningful contributions.
              </p>
            </div>

            {/* Projects Counter */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-[#00d9ff] mb-2">5+</div>
              <div className="text-gray-400 text-lg">Projects</div>
            </div>
          </div>

          {/* Right Column - Education & Certifications */}
          <div className="space-y-8">
            {/* Education Section */}
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-[#00d9ff]" />
                  <h3 className="text-xl font-semibold text-[#00d9ff]">Education</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white">BML Munjal University</h4>
                    <p className="text-gray-400">B.Tech Computer Science • Aug 2023 - Present</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white">Sri Chaitanya Junior College</h4>
                    <p className="text-gray-400">Higher Secondary • June 2023</p>
                    <p className="text-gray-500 text-sm">97.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications Section */}
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-[#00d9ff]" />
                  <h3 className="text-xl font-semibold text-[#00d9ff]">Certifications</h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    "Google Cybersecurity Professional Certificate",
                    "Mastercard Cybersecurity Job Simulation",
                    "Cisco Networking Academy Certificate", 
                    "Tata Cybersecurity Analyst Job Simulation"
                  ].map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}