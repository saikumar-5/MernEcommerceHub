import { SKILLS } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting digital experiences with modern technologies and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Skills Grid */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-6">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-background p-4 rounded-lg hover:bg-muted transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-xl ${skill.color} group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>
                    <span className="text-foreground font-mono">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="animate-fade-in">
            <div className="bg-background rounded-lg overflow-hidden border border-border">
              <div className="bg-muted px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground font-mono text-sm ml-4">about.js</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-primary">developer</span> = {"{"}
                  {"\n"}  <span className="text-green-500">name</span>:{" "}
                  <span className="text-yellow-400">"Sai Kumar Pamoti"</span>,
                  {"\n"}  <span className="text-green-500">role</span>:{" "}
                  <span className="text-yellow-400">"Full Stack Developer"</span>,
                  {"\n"}  <span className="text-green-500">skills</span>: [
                  {"\n"}    <span className="text-yellow-400">"MERN Stack"</span>,{" "}
                  <span className="text-yellow-400">"Python"</span>,
                  {"\n"}    <span className="text-yellow-400">"AWS"</span>,{" "}
                  <span className="text-yellow-400">"Docker"</span>
                  {"\n"}  ],
                  {"\n"}  <span className="text-green-500">passion</span>:{" "}
                  <span className="text-yellow-400">"Building scalable solutions"</span>,
                  {"\n"}  <span className="text-green-500">currentFocus</span>:{" "}
                  <span className="text-yellow-400">"Modern web architectures"</span>
                  {"\n"}{"}"};
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
