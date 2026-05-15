"use client";
import { Navbar }   from "@/components/layout/Navbar";
import { Hero }     from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work }     from "@/components/sections/Work";
import { Process }  from "@/components/sections/Process";
import { About }    from "@/components/sections/About";
import { Contact }  from "@/components/sections/Contact";
import { Footer }   from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <Services />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
