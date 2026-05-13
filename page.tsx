"use client"

import { useState, useEffect } from "react"
import { Menu, X, Satellite, Map, Bot } from "lucide-react"

export default function SmartHeatLensPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showLogin, setShowLogin] = useState(false)
  const [loginTab, setLoginTab] = useState<"login" | "signup">("login")
  const [userRole, setUserRole] = useState<"municipal" | "analyst" | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "heat-islands", "team", "connect"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "heat-islands", label: "Heat Islands" },
    { id: "connect", label: "Connect" },
  ]

  return (
    <div className="min-h-screen bg-[#D1FAE5]">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-[#3CBBB1] w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-[#1E3A5F] italic">SmartHeat Lens</h2>
            </div>
            <div className="bg-[#D1FAE5] mx-4 mb-4 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-[#1E3A5F] text-center mb-2">Welcome Back !</h3>
              <p className="text-[#1E3A5F] text-center mb-6 text-sm">Sign in To access your city Dashboard</p>
              
              {/* Login/Signup Tabs */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setLoginTab("login")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    loginTab === "login"
                      ? "bg-[#3CBBB1] text-white"
                      : "bg-white text-[#F59E0B] border-2 border-[#3CBBB1]"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setLoginTab("signup")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    loginTab === "signup"
                      ? "bg-[#3CBBB1] text-white"
                      : "bg-white text-[#F59E0B] border-2 border-[#3CBBB1]"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#3CBBB1] bg-white text-[#1E3A5F] placeholder-[#1E3A5F]/60 focus:outline-none focus:border-[#1E3A5F]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#3CBBB1] bg-white text-[#1E3A5F] placeholder-[#1E3A5F]/60 focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setUserRole("municipal")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    userRole === "municipal"
                      ? "border-[#1E3A5F] bg-[#3CBBB1]/20"
                      : "border-[#3CBBB1] bg-white"
                  }`}
                >
                  <span className="text-[#1E3A5F] font-semibold">Municipal Worker</span>
                </button>
                <button
                  onClick={() => setUserRole("analyst")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    userRole === "analyst"
                      ? "border-[#1E3A5F] bg-[#3CBBB1]/20"
                      : "border-[#3CBBB1] bg-white"
                  }`}
                >
                  <span className="text-[#1E3A5F] font-semibold">Climate Analyst</span>
                </button>
              </div>

              {/* Enter Button */}
              <button className="w-full py-3 bg-white border-2 border-[#3CBBB1] rounded-xl text-[#1E3A5F] font-semibold hover:bg-[#3CBBB1] hover:text-white transition-colors">
                Enter
              </button>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-white hover:text-[#1E3A5F] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3CBBB1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => scrollToSection("home")} className="text-xl font-bold text-[#1E3A5F] italic">
              SmartHeat Lens
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-semibold transition-colors ${
                    activeSection === item.id
                      ? "text-[#1E3A5F] underline underline-offset-4"
                      : "text-[#1E3A5F] hover:underline hover:underline-offset-4"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 bg-[#1E3A5F] text-white rounded-lg font-semibold hover:bg-[#1E3A5F]/90 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowLogin(true)
                  setLoginTab("signup")
                }}
                className="px-5 py-2 bg-[#F59E0B] text-white rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1E3A5F]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#3CBBB1] border-t border-[#1E3A5F]/20">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 rounded-lg text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F]/10"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex-1 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowLogin(true)
                    setLoginTab("signup")
                  }}
                  className="flex-1 px-4 py-2 bg-[#F59E0B] text-white rounded-lg font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 bg-[#D1FAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-6">
                Cooling Indian Cities One Ward at a Time
              </h1>
              <p className="text-[#1E3A5F] text-lg mb-8 max-w-lg">
                Urban wards in Indian cities differ by up to 11°C in surface temperature. Municipal planners have no ward-level heat data or AI tools to act on it. SmartHeat Lens changes that.
              </p>
              <button
                onClick={() => scrollToSection("about")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#1E3A5F] rounded-lg text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors"
              >
                Get Started -&gt;
              </button>
            </div>
            
            {/* India Heat Map Image */}
            <div className="bg-[#3CBBB1] rounded-2xl p-4 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%201.22.06%20PM%20%281%29-awSUosSlavphASj2mME89djGVOOEMh.jpeg"
                alt="India Heat Tracker Map showing heat index across different regions dated 08 May 2025"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-[#3CBBB1] py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">How It Works</h2>
            <p className="text-[#1E3A5F]/80 mb-8">Three AI layers turn raw satellite data into ward-level action plans</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* NASA Satellite Data */}
              <div className="bg-[#F59E0B] rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#1E3A5F]/20 rounded-lg flex items-center justify-center mb-4">
                  <Satellite className="w-6 h-6 text-[#1E3A5F]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">NASA Satellite Data</h3>
                <p className="text-[#1E3A5F]/80 text-sm">
                  LANDSAT thermal imagery at ward-level resolution
                </p>
              </div>

              {/* Heat Risk Mapping */}
              <div className="bg-[#F59E0B] rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#1E3A5F]/20 rounded-lg flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-[#1E3A5F]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Heat Risk Mapping</h3>
                <p className="text-[#1E3A5F]/80 text-sm">
                  K-means clustering ranks every ward by risk severity
                </p>
              </div>

              {/* Gemini AI Plans */}
              <div className="bg-[#F59E0B] rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#1E3A5F]/20 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-[#1E3A5F]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Gemini AI Plans</h3>
                <p className="text-[#1E3A5F]/80 text-sm">
                  Budgeted cooling interventions per ward in seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-[#D1FAE5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8">About SmartHeat Lens</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <p className="text-[#1E3A5F] text-lg">
                SmartHeat Lens is an AI-powered platform that monitors, predicts, and helps mitigate urban heat island effects across Indian cities.
              </p>
              
              <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#3CBBB1]">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">Key Statistics (May 7)</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-[#F59E0B]">07</span>
                    <p className="text-[#1E3A5F]">Cities recorded above-normal maximum temperature</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-[#F59E0B]">08</span>
                    <p className="text-[#1E3A5F]">Cities recorded above-normal minimum temperature</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#3CBBB1]">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">Heat Index Legend (°C)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-[#1E3A5F]">Less than 40</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-400" />
                    <span className="text-[#1E3A5F]">40 - 50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="text-[#1E3A5F]">50 - 60</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-[#1E3A5F]">Above 60</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#3CBBB1] rounded-2xl p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%201.22.06%20PM%20%281%29-awSUosSlavphASj2mME89djGVOOEMh.jpeg"
                alt="India Heat Tracker Map"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Heat Islands Section */}
      <section id="heat-islands" className="py-16 px-4 bg-[#D1FAE5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">What Are Heat Islands ?</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
            <p className="text-[#1E3A5F] text-lg">
              Dense concrete, minimal greenery and lack of green cover creates hyper-local zones where temperatures spike up to 11°C higher than surrounding areas. Citizens face heat stress, productivity loss and preventable deaths.
            </p>
            
            <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-[#3CBBB1]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%201.23.42%20PM%20%281%29-3FnLcAjQTn478BB6eZwfFkiYDECnBY.jpeg"
                alt="Delhi Heat Map showing urban heat island effect"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Delhi Section */}
          <div className="bg-[#3CBBB1] rounded-2xl p-6">
            <div className="bg-[#F59E0B] rounded-xl px-4 py-2 inline-block mb-6">
              <h3 className="text-xl font-bold text-[#1E3A5F]">Delhi</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Ward Level Heat Map */}
              <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-[#D1FAE5]">
                <h4 className="text-xl font-bold text-[#1E3A5F] mb-4">Ward Level Heat Map</h4>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%201.33.18%20PM-NSfGciLxi8czEbQdJpFO3EJ06G1wYP.jpeg"
                  alt="Delhi 2025 Ward-Level Data showing Average Annual NO2 Concentration"
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* AI Solutions */}
              <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#D1FAE5]">
                <h4 className="text-xl font-bold text-[#1E3A5F] mb-6">AI Solutions</h4>
                
                <div className="space-y-4">
                  <div className="bg-[#D1FAE5] rounded-xl p-4">
                    <h5 className="font-bold text-[#1E3A5F] mb-2">Air Quality Levels (NO2 μg/m³)</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-red-700" />
                        <span className="text-[#1E3A5F]">{">"}80 (HIGH)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-orange-500" />
                        <span className="text-[#1E3A5F]">60-80</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-yellow-400" />
                        <span className="text-[#1E3A5F]">40-60</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-400" />
                        <span className="text-[#1E3A5F]">20-40</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-200" />
                        <span className="text-[#1E3A5F]">{"<"}20 (LOW)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#D1FAE5] rounded-xl p-4">
                    <h5 className="font-bold text-[#1E3A5F] mb-2">Delhi Zones</h5>
                    <div className="text-sm text-[#1E3A5F] space-y-1">
                      <p>Central (28 Wards) | East (32 Wards)</p>
                      <p>South (42 Wards) | PMIST (18 Wards)</p>
                    </div>
                  </div>

                  <div className="bg-[#D1FAE5] rounded-xl p-4">
                    <h5 className="font-bold text-[#1E3A5F] mb-2">Data Layers</h5>
                    <div className="text-sm text-[#1E3A5F]">
                      NO2 | PM2.5 | Population Density
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 bg-[#D1FAE5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8">Meet The Team</h2>
          
          <div className="bg-[#3CBBB1] rounded-2xl p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Shraddha Tyagi - 3rd pic */}
              <div className="bg-[#D1FAE5] rounded-xl overflow-hidden border-2 border-dashed border-white">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%203.08.09%20PM-pwhb8Q3uZskvj9xNFNpmEbKavMRxL1.jpeg"
                    alt="Shraddha Tyagi"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 25%", transform: "scale(1.15)" }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#1E3A5F]">Shraddha Tyagi</h3>
                  <p className="text-sm text-[#1E3A5F]/80">B.Tech CSE-AI</p>
                  <p className="text-sm text-[#1E3A5F]/80">IGDTUW</p>
                </div>
              </div>

              {/* Kashish Dhingra - 1st pic */}
              <div className="bg-[#D1FAE5] rounded-xl overflow-hidden border-2 border-dashed border-white">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%203.07.38%20PM-Hc2BaAa8Y7CQUCUWJQGlN9IIeirrUN.jpeg"
                    alt="Kashish Dhingra"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%", transform: "scale(0.9)" }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#1E3A5F]">Kashish Dhingra</h3>
                  <p className="text-sm text-[#1E3A5F]/80">B.Tech AI-ML</p>
                  <p className="text-sm text-[#1E3A5F]/80">IGDTUW</p>
                </div>
              </div>

              {/* Priyanshi Saini - 2nd pic */}
              <div className="bg-[#D1FAE5] rounded-xl overflow-hidden border-2 border-dashed border-white">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-13%20at%203.07.44%20PM-AevzvO9gfIZM5dDcFuGiHBgF7ydMTt.jpeg"
                    alt="Priyanshi Saini"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "60% 15%" }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#1E3A5F]">Priyanshi Saini</h3>
                  <p className="text-sm text-[#1E3A5F]/80">B.Tech Mathematics &amp; Computing</p>
                  <p className="text-sm text-[#1E3A5F]/80">IGDTUW</p>
                </div>
              </div>

              {/* Ritisha Sharma - 4th pic */}
              <div className="bg-[#D1FAE5] rounded-xl overflow-hidden border-2 border-dashed border-white">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-08%20at%207.50.53%20PM-mvVs9a6t08CtUNp2aQei6kRfpf5qOK.jpeg"
                    alt="Ritisha Sharma"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#1E3A5F]">Ritisha Sharma</h3>
                  <p className="text-sm text-[#1E3A5F]/80">B.Tech AI-ML</p>
                  <p className="text-sm text-[#1E3A5F]/80">IGDTUW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-16 px-4 bg-[#F59E0B]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8">Get In Touch</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-4 bg-[#D1FAE5] rounded-xl text-[#1E3A5F] placeholder-[#1E3A5F]/60 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-6 py-4 bg-[#D1FAE5] rounded-xl text-[#1E3A5F] placeholder-[#1E3A5F]/60 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] resize-none"
            />
            <button className="px-8 py-3 bg-[#1E3A5F] text-white rounded-xl font-semibold hover:bg-[#1E3A5F]/90 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F59E0B] py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#1E3A5F] font-semibold">SmartHeat Lens - Cooling Indian Cities One Ward at a Time</p>
        </div>
      </footer>
    </div>
  )
}
