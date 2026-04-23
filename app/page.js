'use client';

import React, { useState } from 'react';
import { 
  Search, TrendingUp, Send, MapPin, Clock, DollarSign, 
  ChevronLeft, Filter, ShieldCheck, GraduationCap, Star, 
  Briefcase, CheckCircle2, FileText, User, ArrowRight,
  HelpCircle, UserCheck, MessageSquare, Camera, Paperclip
} from 'lucide-react';

// --- DATOS DE PRUEBA ---
const MOCK_STUDENT = {
  name: "Carlos M.",
  university: "Universidad Autónoma de Querétaro",
  major: "Ing. en Sistemas",
  semester: "8vo Semestre",
  rating: 4.9,
  reviews: 24,
  verified: true,
  goal: "Ahorrando para el pago de mi título universitario.",
  about: "Soy puntual, responsable y me gusta hacer las cosas bien. Tengo experiencia reparando equipos y haciendo trabajos de carga ligera."
};

const INITIAL_SERVICES = [
  {
    id: 1,
    title: 'Mantenimiento y Formateo de Laptops',
    category: 'REPARACIONES',
    description: 'Dejo tu computadora como nueva. Instalo Windows, Office y optimizo el rendimiento general de tu equipo.',
    price: 'Desde $400 MXN',
    location: 'Querétaro (A domicilio)',
    author: MOCK_STUDENT
  },
  {
    id: 2,
    title: 'Ayuda con mudanzas pequeñas y carga',
    category: 'MUDANZA',
    description: 'Tengo disponibilidad por las tardes para ayudarte a empacar, cargar y mover muebles de tamaño mediano o cajas pesadas.',
    price: '$150 MXN / hora',
    location: 'Zona Centro y Sur',
    author: {
      ...MOCK_STUDENT,
      name: "Ana P.",
      major: "Arquitectura",
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 3,
    title: 'Limpieza profunda de departamentos',
    category: 'LIMPIEZA',
    description: 'Servicio de limpieza detallada para departamentos pequeños y medianos. Llevo mis propios insumos básicos.',
    price: '$350 MXN / servicio',
    location: 'Juriquilla',
    author: {
      ...MOCK_STUDENT,
      name: "Luis R.",
      major: "Administración",
      verified: false,
      rating: 4.5
    }
  }
];

// --- COMPONENTES REUTILIZABLES ---
const VerifiedBadge = () => (
  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-100">
    <ShieldCheck className="w-3.5 h-3.5" />
    <span>Identidad Verificada</span>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // home, feed, post, studentProfile
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filters = ['Todos', 'Limpieza', 'Mudanza', 'Reparaciones', 'Otros'];
  const filteredServices = activeFilter === 'Todos' 
    ? INITIAL_SERVICES 
    : INITIAL_SERVICES.filter(job => job.category.toLowerCase() === activeFilter.toLowerCase());

  const viewProfile = (student) => {
    setSelectedStudent(student);
    setCurrentView('studentProfile');
  };

  // --- VISTAS ---

  const HomeView = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans text-gray-900 relative">
      {/* Header superior de inicio para soporte y verificación */}
      <div className="absolute top-0 w-full max-w-md p-6 flex justify-between items-center z-10">
        <button
          onClick={() => setCurrentView('supportChat')}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-zinc-900 transition-colors bg-white px-3.5 py-2 rounded-full shadow-sm border border-gray-200"
        >
          <HelpCircle className="w-4 h-4" /> Soporte
        </button>
        <button
          onClick={() => setCurrentView('verify')}
          className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors px-3.5 py-2 rounded-full border border-emerald-200"
        >
          <UserCheck className="w-4 h-4" /> Verificarme
        </button>
      </div>

      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-black tracking-tight mb-3 text-zinc-900">Chambitas</h1>
        <p className="text-base text-gray-500 mb-10 text-center max-w-xs">
          La red local y segura de micro-trabajos impulsada por estudiantes.
        </p>

        <div className="w-full space-y-4">
          <button 
            onClick={() => setCurrentView('feed')}
            className="w-full group bg-white hover:border-zinc-400 transition-all rounded-2xl p-5 flex items-center shadow-sm border border-gray-200"
          >
            <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-zinc-100 transition-colors">
              <Search className="w-6 h-6 text-zinc-700" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-lg font-bold text-zinc-900">Buscar un Servicio</span>
              <span className="block text-sm text-gray-500 mt-0.5">Encuentra estudiantes listos para ayudar</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-zinc-900 transition-colors" />
          </button>

          <button 
            onClick={() => setCurrentView('post')}
            className="w-full group bg-white hover:border-zinc-400 transition-all rounded-2xl p-5 flex items-center shadow-sm border border-gray-200"
          >
            <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-zinc-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-zinc-700" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-lg font-bold text-zinc-900">Publicar un Favor</span>
              <span className="block text-sm text-gray-500 mt-0.5">Describe lo que necesitas</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-zinc-900 transition-colors" />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Plataforma de confianza
        </div>
      </div>
    </div>
  );

  const FeedView = () => (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
        <button onClick={() => setCurrentView('home')} className="flex items-center text-gray-600 font-medium hover:text-zinc-900 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Inicio
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-black text-zinc-900 mb-1">Servicios Ofrecidos</h2>
          <p className="text-gray-500 text-sm">Contrata a estudiantes verificados de tu zona.</p>
        </div>
        
        {/* Filtros Minimalistas */}
        <div className="flex overflow-x-auto pb-4 mb-2 gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Lista de Servicios */}
        <div className="space-y-4">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {service.category}
                </span>
                <span className="text-sm font-semibold text-zinc-900 bg-gray-100 px-2 py-1 rounded-md">
                  {service.price}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-zinc-900 mb-2 leading-tight">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                {service.description}
              </p>

              {/* Miniatura del Perfil del Oferente */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                      {service.author.name}
                      {service.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                      {service.author.rating} • {service.author.major}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => viewProfile(service.author)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Ver perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PostJobView = () => (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
       <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
        <button onClick={() => setCurrentView('home')} className="flex items-center text-gray-600 font-medium hover:text-zinc-900">
          <ChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-zinc-900">Detalles del Favor</h2>
            <p className="text-gray-500 mt-1 text-sm">Sé claro y específico para atraer a los mejores estudiantes.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('¡Publicado!'); setCurrentView('home'); }} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título *</label>
              <input required type="text" placeholder="Ej: Ayuda para cargar cajas" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción *</label>
              <textarea required rows="4" placeholder="Describe exactamente qué necesitas..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none text-sm"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pago (MXN) *</label>
                <input required type="number" placeholder="$ 0.00" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Categoría *</label>
                <select required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm bg-white">
                  <option value="">Seleccionar...</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Mudanza">Mudanza</option>
                  <option value="Reparaciones">Reparaciones</option>
                </select>
              </div>
            </div>

            {/* Requerimiento de Factura Rediseñado */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="flex items-start cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 text-zinc-900 border-gray-300 rounded focus:ring-zinc-900" />
                <div className="ml-3">
                  <span className="block text-sm font-semibold text-zinc-900">Requiero comprobante / factura</span>
                  <span className="block text-xs text-gray-500 mt-0.5">Filtraremos solo a estudiantes que puedan emitirlo.</span>
                </div>
              </label>
            </div>

            <button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3.5 rounded-xl shadow-sm transition-all mt-8 text-sm">
              Publicar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const StudentProfileView = () => {
    const student = selectedStudent || MOCK_STUDENT;

    return (
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center pb-10">
        {/* Navbar limpia */}
        <div className="w-full bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
          <button onClick={() => setCurrentView('feed')} className="flex items-center text-gray-600 font-medium hover:text-zinc-900">
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver a Servicios
          </button>
        </div>

        <div className="w-full max-w-xl bg-white md:rounded-3xl md:mt-8 shadow-sm border-x border-b md:border border-gray-200 overflow-hidden">
          {/* Header minimalista */}
          <div className="h-24 bg-zinc-100 border-b border-gray-200"></div>
          
          <div className="px-6 pb-8 relative">
            {/* Avatar y Badge */}
            <div className="flex justify-between items-end -mt-10 mb-4">
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-sm flex items-center justify-center overflow-hidden z-10">
                <User className="w-10 h-10 text-gray-300" />
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                  {student.name} 
                  {student.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{student.major}</p>
                <p className="text-gray-400 text-xs mt-0.5">{student.university} • {student.semester}</p>
              </div>
              
              {/* Badge visual claro que solicitaste */}
              {student.verified && <VerifiedBadge />}
            </div>

            {/* Estadísticas Limpias */}
            <div className="flex gap-8 mt-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-lg font-bold text-zinc-900 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" /> {student.rating}
                </span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{student.reviews} reseñas</span>
              </div>
              <div>
                <span className="text-lg font-bold text-zinc-900">15</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Chambitas</span>
              </div>
            </div>

            {/* Propósito - Minimalista pero resaltado */}
            <div className="mt-6 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Su Meta Actual</h3>
              <p className="text-sm font-medium text-blue-700 bg-blue-50 p-3 rounded-xl border border-blue-100">
                &quot;{student.goal}&quot;
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Acerca de {student.name.split(' ')[0]}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {student.about}
              </p>
            </div>

            <button 
              onClick={() => setCurrentView('chat')}
              className="w-full mt-8 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Contactar para Servicio
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- NUEVAS VISTAS: CHATS Y VERIFICACIÓN ---

  const ChatView = () => {
    const student = selectedStudent || MOCK_STUDENT;
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        {/* Header del Chat */}
        <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
          <button onClick={() => setCurrentView('studentProfile')} className="flex items-center text-gray-600 hover:text-zinc-900 mr-3">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                {student.name} {student.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
              </p>
              <p className="text-xs text-emerald-600 font-medium">En línea</p>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="flex justify-center mb-6">
            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">Hoy</span>
          </div>
          <div className="flex justify-end">
            <div className="bg-zinc-900 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
              <p>¡Hola! Vi tu perfil en Chambitas. ¿Tienes disponibilidad para mañana en la tarde?</p>
              <span className="text-[10px] text-zinc-400 block mt-1 text-right">10:42 AM</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-zinc-900 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
              <p>¡Hola! Sí, claro. ¿De qué trata el servicio exactamente para llevar la herramienta necesaria?</p>
              <span className="text-[10px] text-gray-400 block mt-1 text-right">10:45 AM</span>
            </div>
          </div>
        </div>

        {/* Input Footer */}
        <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0 flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-zinc-600 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            className="flex-1 bg-gray-100 border-none px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-zinc-900 transition-all text-sm"
          />
          <button className="p-2.5 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors shadow-sm">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    );
  };

  const SupportChatView = () => (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
        <button onClick={() => setCurrentView('home')} className="flex items-center text-gray-600 hover:text-zinc-900 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shadow-sm">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">Soporte Chambitas</p>
            <p className="text-xs text-gray-500 font-medium">Te respondemos en minutos</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="flex justify-center mb-6">
          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">Automático</span>
        </div>
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 text-zinc-900 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
            <p>Hola 👋, soy el asistente de soporte de Chambitas. ¿Tienes algún problema con tu cuenta o algún servicio?</p>
            <span className="text-[10px] text-gray-400 block mt-1 text-right">Ahora</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0 flex items-center gap-2">
        <input 
          type="text" 
          placeholder="Envía tu duda o reporte..." 
          className="flex-1 bg-gray-100 border-none px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-zinc-900 transition-all text-sm"
        />
        <button className="p-2.5 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors shadow-sm">
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );

  const VerifyIdentityView = () => (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 z-20">
        <button onClick={() => setCurrentView('home')} className="flex items-center text-gray-600 font-medium hover:text-zinc-900">
          <ChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>
      </div>

      <div className="max-w-xl mx-auto p-4 mt-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
              <UserCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900">Darte de Alta</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              Verifica tu identidad como estudiante para ganar la insignia de confianza y obtener más trabajos.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada. Revisaremos tus datos.'); setCurrentView('home'); }} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre Completo *</label>
              <input required type="text" placeholder="Ej: Juan Pérez García" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Universidad / Institución *</label>
                <input required type="text" placeholder="Ej: UAQ" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Carrera y Semestre *</label>
                <input required type="text" placeholder="Ej: Arquitectura, 5to" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sube tu Credencial / INE *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-emerald-400 transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-semibold text-zinc-900">Haz clic para subir foto</span>
                <span className="text-xs text-gray-500 mt-1">Formatos: JPG, PNG (Max 5MB)</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-sm transition-all mt-8 text-sm">
              Enviar para Verificación
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === 'home' && <HomeView />}
      {currentView === 'feed' && <FeedView />}
      {currentView === 'post' && <PostJobView />}
      {currentView === 'studentProfile' && <StudentProfileView />}
      {currentView === 'chat' && <ChatView />}
      {currentView === 'supportChat' && <SupportChatView />}
      {currentView === 'verify' && <VerifyIdentityView />}
    </>
  );
}
