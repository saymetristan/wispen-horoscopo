'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, getYear, getMonth } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Facebook, Instagram, Twitter, Star, DollarSign } from "lucide-react"
import { generateHoroscope } from '@/lib/generateHoroscope'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const [date, setDate] = useState<Date>()
  const [showResults, setShowResults] = useState(false)
  const [month, setMonth] = useState(getMonth(new Date()))
  const [year, setYear] = useState(getYear(new Date()))
  const [horoscope, setHoroscope] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReveal = async () => {
    if (date) {
      setIsLoading(true);
      try {
        const horoscopeResult = await generateHoroscope(date);
        setHoroscope(horoscopeResult);
        setShowResults(true);
      } catch (error) {
        console.error('Error al generar el horóscopo:', error);
        setHoroscope("Hubo un error al consultar las estrellas. Por favor, intenta de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const years = Array.from({ length: 100 }, (_, i) => getYear(new Date()) - 99 + i)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A237E] to-[#3498DB] text-white font-sans">
      <div className="stars absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>
      
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-3xl font-bold text-[#F1C40F] mb-4 md:mb-0">wispen</div>
          <h1 className="text-2xl md:text-3xl font-poppins text-center md:text-left">tu horoscopo financiero</h1>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto p-4 md:p-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-8 md:my-12"
        >
          <h2 className="text-3xl md:text-5xl font-poppins mb-6 md:mb-10">Descubre Cómo las Estrellas Influyen en tus Finanzas</h2>
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Star className="text-[#F1C40F] w-10 h-10 mr-4" />
              <DollarSign className="text-[#2ECC71] w-10 h-10" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal bg-white/20 hover:bg-white/30 ${!date && "text-gray-300"}`}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "PPP", { locale: es }) : <span>Elige tu fecha de nacimiento</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex justify-between p-2 bg-[#1A237E] border-b border-[#3498DB]">
                  <Select
                    value={month.toString()}
                    onValueChange={(value) => setMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-[110px] bg-[#1A237E] text-white border-[#3498DB]">
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A237E] text-white border-[#3498DB]">
                      {months.map((m, index) => (
                        <SelectItem key={m} value={index.toString()}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={year.toString()}
                    onValueChange={(value) => setYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-[90px] bg-[#1A237E] text-white border-[#3498DB]">
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A237E] text-white border-[#3498DB] max-h-[200px] overflow-y-auto">
                      {years.map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={new Date(year, month)}
                  onMonthChange={(newMonth) => {
                    setMonth(getMonth(newMonth))
                    setYear(getYear(newMonth))
                  }}
                  className="bg-[#1A237E] text-white rounded-md border-[#3498DB]"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hidden",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#3498DB] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal",
                    day_selected: "bg-[#3498DB] text-white hover:bg-[#3498DB] hover:text-white focus:bg-[#3498DB] focus:text-white",
                    day_today: "bg-[#2ECC71] text-white",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </PopoverContent>
            </Popover>
            <Button 
              className="w-full mt-6 bg-[#2ECC71] hover:bg-[#27AE60] text-white text-lg py-3"
              onClick={handleReveal}
            >
              Revelar Mi Destino Financiero
            </Button>
          </div>
        </motion.section>

        <AnimatePresence>
  {showResults && (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="my-12 md:my-16 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg"
    >
      <h3 className="text-2xl md:text-3xl font-poppins mb-4 text-[#F1C40F]">Tu Horóscopo Financiero</h3>
      {isLoading ? (
        <p className="text-lg md:text-xl mb-6">Consultando a las estrellas...</p>
      ) : (
        <>
          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: horoscope }} />
        </>
      )}
    </motion.section>
  )}
</AnimatePresence>

        <section className="my-12 md:my-16 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-poppins mb-6 text-[#F1C40F]">Cómo Funciona</h3>
          <ol className="list-none space-y-6">
            <li className="flex items-center">
              <div className="bg-[#2ECC71] rounded-full p-2 mr-4">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Ingresa tu fecha de nacimiento</span>
            </li>
            <li className="flex items-center">
              <div className="bg-[#F1C40F] rounded-full p-2 mr-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Nuestro algoritmo cósmico-financiero hace su magia</span>
            </li>
            <li className="flex items-center">
              <div className="bg-[#3498DB] rounded-full p-2 mr-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Recibe ideas personalizadas sobre tu relación con el dinero</span>
            </li>
          </ol>
        </section>

        <section className="my-12 md:my-16 text-center">
          <h3 className="text-2xl md:text-3xl font-poppins mb-6">¿Listo para Descubrir tu Horóscopo Financiero?</h3>
          <Button className="bg-[#3498DB] hover:bg-[#2980B9] text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
            Obtén Tu Perfil Estelar
          </Button>
        </section>
      </main>

      <footer className="relative z-10 bg-[#34495E]/80 backdrop-blur-md text-white p-6 md:p-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Facebook size={28} className="hover:text-[#F1C40F] transition-colors cursor-pointer" />
            <Twitter size={28} className="hover:text-[#F1C40F] transition-colors cursor-pointer" />
            <Instagram size={28} className="hover:text-[#F1C40F] transition-colors cursor-pointer" />
          </div>
          <a href="#" className="text-[#F1C40F] hover:underline text-lg md:text-xl transition-colors hover:text-white">Visita la Página Principal de Wispen</a>
          <p className="text-sm md:text-base mt-4 md:mt-0">© 2024 Wispen. Solo para fines de entretenimiento.</p>
        </div>
      </footer>
    </div>
  )
}