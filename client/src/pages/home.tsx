import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import Comments from "@/components/sections/comments";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <Comments />
      </main>
      
      <Footer />
    </div>
  );
}
