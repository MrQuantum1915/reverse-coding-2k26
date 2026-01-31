"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import VoidParticles from "../components/VoidParticles";
import Snowfall from "react-snowfall";

function TeamImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse">
          <div className="absolute inset-0 bg-linear-to-t from-cyan-900/20 to-transparent" />
        </div>
      )}
      
      {hasError ? (
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
            backgroundColor: '#1a1a1a'
          }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.3] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          placeholder="empty"
        />
      )}
    </div>
  );
}

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const getLocalPhoto = (fileName) => {
  if (!fileName) return null;
  return `/PHOTOS/${fileName}`;
};

const linkedinHelper = (v) => {
  if (!v) return null;
  const value = v.trim();
  if (value === "None" || value === "N/A" || value === "") return null;
  return value.startsWith("http")
    ? value
    : `https://www.linkedin.com/in/${value}`;
};

const instagramHelper = (v) => {
  if (!v) return null;
  const value = v.trim();
  if (value === "None" || value === "N/A" || value === "") return null;
  return value.startsWith("http") ? value : `https://instagram.com/${value}`;
};

export const websiteTeam = [
  {
    name: "Darshan Patel ",
    photo: getLocalPhoto("DARSHAN.jpeg"),
    linkedin: linkedinHelper("darshan-patel-1713062a4"),
    instagram: instagramHelper("mrquantum_1915"),
  },
  {
    name: "Ansh Ahuja",
    photo: getLocalPhoto("ANSH.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/ansh-ahuja-3081662b9/"
    ),
    instagram: instagramHelper("https://www.instagram.com/ansh_ah0/"),
  },
  {
    name: "Avadhesh Nagar",
    photo: getLocalPhoto("Avadhesh.webp"),
    linkedin: linkedinHelper("https://www.linkedin.com/in/avadheshnagar"),
    instagram: instagramHelper("avadhesh_nagar_"),
  },
];

export const problemSetters = [
  {
    name: "Darshan Patel ",
    photo: getLocalPhoto("DARSHAN.jpeg"),
    linkedin: linkedinHelper("darshan-patel-1713062a4"),
    instagram: instagramHelper("mrquantum_1915"),
  },
  {
    name: "Arpit Maheshwari",
    photo: getLocalPhoto("Arpit.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/arpit-maheshwari-bb59a2336/"
    ),
    instagram: instagramHelper("Arpit_maheshwari_07"),
  },
  {
    name: "Ashay Gupta",
    photo: getLocalPhoto("Ashay.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/ashay-gupta-30068831b"
    ),
    instagram: null,
  },
  {
    name: "Tarun Jain",
    photo: getLocalPhoto("tarun.jpeg"),
    linkedin: linkedinHelper("www.linkedin.com/in/tarundeepakjain"),
    instagram: instagramHelper("https://www.instagram.com/tarundeepakjain/"),
  },
];

export const prTeam = [
  {
    name: "Tarun Jain",
    photo: getLocalPhoto("tarun.jpeg"),
    linkedin: linkedinHelper("http://www.linkedin.com/in/tarundeepakjain"),
    instagram: instagramHelper("https://www.instagram.com/tarundeepakjain/"),
  },
  {
    name: "Harshit Dubey",
    photo: getLocalPhoto("dubey.jpeg"),
    linkedin: linkedinHelper(
      "http://www.linkedin.com/in/harshit-dubey-b892b1310"
    ),
    instagram: instagramHelper("https://www.instagram.com/dubeyharshittt/"),
  },
  {
    name: "Arpit Maheshwari",
    photo: getLocalPhoto("Arpit.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/arpit-maheshwari-bb59a2336/"
    ),
    instagram: instagramHelper("Arpit_maheshwari_07"),
  },
  {
    name: "Krishna Yadav",
    photo: getLocalPhoto("krishna.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/krishna-yadav-86964b32a"
    ),
    instagram: instagramHelper("_.krishna__yadav._"),
  },
  {
    name: "Kartavya Kataria",
    photo: getLocalPhoto("Kartavya.png"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/kartavya-kataria-35aa0136a"
    ),
    instagram: null,
  },
  {
    name: "Vedant Songire",
    photo: getLocalPhoto("Vedant.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/vedant-songire-018006394/"
    ),
    instagram: instagramHelper("vedxnt_74"),
  },
  {
    name: "Palin Jena",
    photo: getLocalPhoto("PALIN.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/palin-jena-98b220377"
    ),
    instagram: null,
  },
  {
    name: "Jaynil Parmar",
    photo: getLocalPhoto("JAYNIL.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/jaynil-parmar-b8b45b396"
    ),
    instagram: instagramHelper("https://www.instagram.com/jaynil1460"),
  },
  {
    name: "Pravesh Sharma",
    photo: getLocalPhoto("pravesh.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/pravesh-sharma-57990324a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/pravesh20_08?igsh=MWVwNThlZjZmOGNxOA%3D%3D&utm_source=qr"
    ),
  },
  {
    name: "Anand Gaikwad",
    photo: getLocalPhoto("anand.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/anand-gaikwad-a14496381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/anandgaikwad78?igsh=MWd5YzlvZTIyMzY1dA%3D%3D&utm_source=qr"
    ),
  },
  {
    name: "Hrishikesh Pathak ",
    photo: getLocalPhoto("pathak.jpg"),
    linkedin: linkedinHelper("http://www.linkedin.com/in/hrishikesh-pathak1"),
    instagram: instagramHelper("https://www.instagram.com/hrishikesh.pathakk/"),
  },
  {
    name: "Aditya Vikram ",
    photo: getLocalPhoto("aditya.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/aditya-vikram-020a3b378?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/adityavikram_01?igsh=c2ZwaWw3NTlzMzI0"
    ),
  },
  {
    name: "Shrey Mihir Mehta ",
    photo: getLocalPhoto("shrey.jpg"),
    linkedin: linkedinHelper(
      "http://www.linkedin.com/in/shrey-mehta-2349b9382"
    ),
    instagram: null,
  },
  {
    name: "Devraj Desai",
    photo: getLocalPhoto("devraj.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/devraj-desai-274107381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/desaidevraj0709?igsh=OG8xbm4xbGQ2YnYw"
    ),
  },
];

export const designTeam = [
  {
    name: "Abhishek yadav ",
    photo: getLocalPhoto("yadav.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/abhishek-yadav-9406683a4/"
    ),
    instagram: null,
  },
  {
    name: "Aman Kumar",
    photo: getLocalPhoto("AMAN.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/aman-prajapati-10892b380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    ),
    instagram: null,
  },
  {
    name: "Harshit Dubey",
    photo: getLocalPhoto("dubey.jpeg"),
    linkedin: linkedinHelper("www.linkedin.com/in/harshit-dubey-b892b1310"),
    instagram: instagramHelper("https://www.instagram.com/dubeyharshittt/"),
  },
  {
    name: "Neha Nupur",
    photo: getLocalPhoto("NEHA.jpg"),
    linkedin: linkedinHelper("https://www.linkedin.com/in/nehanupur"),
    instagram: instagramHelper("https://instagram.com/iamnehanupur"),
  },
  {
    name: "Kaushik Nanda Upadhaya",
    photo: getLocalPhoto("kaushik.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/kaushik-nanda-upadhaya-4a1735381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/kaushik_nu?igsh=MXI4cm50OGJibTAyNA=="
    ),
  },
  
];



function Page() {
  const [activeTab, setActiveTab] = useState("Website");

  const tabs = [
    { id: "Website", label: "Website Team", data: websiteTeam },
    { id: "Setters", label: "Problem Setters", data: problemSetters },
    { id: "PR", label: "PR Team", data: prTeam },
    { id: "Design", label: "Design Team", data: designTeam },
  ];

  const currentData = tabs.find((t) => t.id === activeTab)?.data || [];
  return (
    <div className={`min-h-screen relative overflow-x-hidden bg-black text-white ${orbitron.className}`}>
      
      <div className="fixed inset-0 z-0">
         <VoidParticles />
      </div>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
          <Snowfall
            color="#00fffb" 
            snowflakeCount={60}
            style={{
              opacity: 0.2,
              width: "100vw",
              height: "100vh",
            }}
          />
      </div>

      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-gradient(circle at center, transparent 0%, black 100%) pointer-events-none z-10" />


      <div className="relative z-20 container mx-auto px-6 py-20 pb-32">
        
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-center  mt-16 mb-0 tracking-widest uppercase 
               text-transparent bg-clip-text bg-linear-to-b from-cyan-300 via-cyan-500 to-cyan-900
               drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
          The Architects
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative group px-3 py-2 sm:px-8 sm:py-3 text-[10px] sm:text-base overflow-hidden font-bold tracking-widest uppercase transition-all duration-300
                  ${activeTab === tab.id 
                    ? "text-black bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]" 
                    : "text-cyan-500 border border-cyan-800 hover:text-cyan-300 hover:border-cyan-400 bg-black/40 backdrop-blur-sm"
                  }`}
              style={{
                clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" 
              }}
            >
               {activeTab !== tab.id && (
                  <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-16"
          >
            {currentData.map((person) => (
              <div
                key={person.name}
                className="group flex flex-col items-center"
              >
                <div className="relative w-[280px] h-[370px] p-1 
                                border border-cyan-500/20 bg-black/50 backdrop-blur-sm
                                group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]
                                transition-all duration-500">
                  
                  <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyan-500 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-cyan-400/30"></div>
                  <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
                  <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
                  <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyan-500 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-cyan-400/30"></div>

                  <div className="w-full h-full relative overflow-hidden bg-zinc-900">
                    <TeamImage src={person.photo} alt={person.name} />
                    
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-4 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 bg-black/60 backdrop-blur-md border-t border-cyan-500/30">
                        {person.linkedin && (
                        <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-none border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        )}
                        {person.instagram && (
                        <a
                            href={person.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-none border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold tracking-widest text-cyan-100 uppercase group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                    {person.name}
                    </h3>
                    <div className="h-0.5 w-0 group-hover:w-full bg-cyan-500 mt-2 transition-all duration-500 mx-auto box-shadow-[0_0_10px_#00fffb]" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Page;
