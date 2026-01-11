"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const getLocalPhoto = (fileName) => {
  if (!fileName) return null;
  return `/photos/${fileName}`;
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
    photo: getLocalPhoto("darshan.jpeg"),
    linkedin: linkedinHelper("darshan-patel-1713062a4"),
    instagram: instagramHelper("mrquantum_1915"),
  },
  {
    name: "Ansh Ahuja",
    photo: getLocalPhoto("ansh.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/ansh-ahuja-3081662b9/"
    ),
    instagram: instagramHelper("https://www.instagram.com/ansh_ah0/"),
  },
  {
    name: "Avadhesh Nagar",
    photo: getLocalPhoto("avadhesh.webp"),
    linkedin: linkedinHelper("https://www.linkedin.com/in/avadheshnagar"),
    instagram: instagramHelper("avadhesh_nagar_"),
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
    photo: getLocalPhoto("arpit.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/arpit-maheshwari-bb59a2336/"
    ),
    instagram: instagramHelper("Arpit_maheshwari_07"),
  },
  {
    name: "Kartavya Kataria",
    photo: getLocalPhoto("kartavya.png"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/kartavya-kataria-35aa0136a"
    ),
    instagram: null,
  },
  {
    name: "Vedant Songire",
    photo: getLocalPhoto("vedant.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/vedant-songire-018006394/"
    ),
    instagram: instagramHelper("vedxnt_74"),
  },
  {
    name: "Palin Jena",
    photo: getLocalPhoto("palin.jpeg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/palin-jena-98b220377"
    ),
    instagram: null,
  },
  {
    name: "Jaynil Parmar",
    photo: getLocalPhoto("jaynil.jpg"),
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
    name: "Neha Nupur",
    photo: getLocalPhoto("neha.jpg"),
    linkedin: linkedinHelper("https://www.linkedin.com/in/nehanupur"),
    instagram: instagramHelper("https://instagram.com/iamnehanupur"),
  },
  {
    name: "Aman Kumar",
    photo: getLocalPhoto("aman.jpeg"),
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
    name: "Kaushik Nanda Upadhaya",
    photo: getLocalPhoto("kaushik.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/kaushik-nanda-upadhaya-4a1735381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    ),
    instagram: instagramHelper(
      "https://www.instagram.com/kaushik_nu?igsh=MXI4cm50OGJibTAyNA=="
    ),
  },
  {
    name: "Abhishek yadav ",
    photo: getLocalPhoto("yadav.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/abhishek-yadav-9406683a4/"
    ),
    instagram: null,
  },
];

export const problemSetters = [
  {
    name: "Darshan Patel ",
    photo: getLocalPhoto("darshan.jpeg"),
    linkedin: linkedinHelper("darshan-patel-1713062a4"),
    instagram: instagramHelper("mrquantum_1915"),
  },
  {
    name: "Arpit Maheshwari",
    photo: getLocalPhoto("arpit.jpg"),
    linkedin: linkedinHelper(
      "https://www.linkedin.com/in/arpit-maheshwari-bb59a2336/"
    ),
    instagram: instagramHelper("Arpit_maheshwari_07"),
  },
  {
    name: "Ashay Gupta",
    photo: getLocalPhoto("ashay.jpg"),
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

function Page() {
  const [activeTab, setActiveTab] = useState("Website");

  const tabs = [
    { id: "Website", label: "Website Team", data: websiteTeam },
    { id: "PR", label: "PR Team", data: prTeam },
    { id: "Design", label: "Design Team", data: designTeam },
    { id: "Setters", label: "Problem Setters", data: problemSetters },
  ];

  const currentData = tabs.find((t) => t.id === activeTab)?.data || [];
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto mt-10">
       
        <h2
          className="text-2xl sm:text-5xl md:text-5xl font-black text-center mb-2 sm:mb-10 tracking-tighter uppercase  
               bg-gradient-to-b from-white via-blue-200 to-blue-600 bg-clip-text text-transparent 
               drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          The Brains <br className="sm:hidden" /> Behind the Build
        </h2>
 <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-20 mt-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 sm:px-10 py-2.5 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-lg font-bold tracking-wide transition-all duration-300 cursor-pointer border-2 ${
                activeTab === tab.id
                  ? "bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16"
        >
          <AnimatePresence mode="wait">
            {currentData.map((person) => (
              <motion.div
                key={`${activeTab}-${person.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col items-center"
              >
                
                <div className="relative w-full max-w-[280px] lg:max-w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-zinc-900/50 border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full h-auto block transition-all duration-700 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://www.transparenttextures.com/patterns/carbon-fibre.png";
                    }}
                  />

                 
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent 
                                opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                                transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-10"
                  >
                    <div className="flex gap-3 sm:gap-6">
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 sm:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all text-white"
                        >
                          <Linkedin className="w-4 h-4 sm:w-6 sm:h-6" />
                        </a>
                      )}
                      {person.instagram && (
                        <a
                          href={person.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 sm:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all text-white"
                        >
                          <Instagram className="w-4 h-4 sm:w-6 sm:h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 sm:mt-8 text-xs sm:text-lg font-black tracking-tight sm:tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300 uppercase text-center leading-snug px-2">
                  {person.name}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
