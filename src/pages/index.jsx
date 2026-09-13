import React, { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { BlobsBackground, FloatingParticles } from '../components/BackgroundElements';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, Circle, Award, Globe, HelpCircle, User, MessageSquare, Play, FileText, ClipboardList, ThumbsUp, ThumbsDown, Flag, Bookmark, ArrowRight, Video, Target, BookOpen, Lock, Menu, Wifi, Radar, Cpu, Radio, Zap, Cog, ScanLine, Battery, CircuitBoard, Cable, Bot } from 'lucide-react';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function IntroAnimation({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 relative w-32 h-32"
          >
             <img src="/favicon.svg" alt="IoTrack Logo" className="w-full h-full drop-shadow-[0_0_20px_var(--brand)]" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-5xl md:text-6xl font-extrabold font-display flex items-center"
          >
            Io<span className="text-brand">Track</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-3 text-muted-foreground font-semibold tracking-[0.3em] uppercase text-sm md:text-base text-center"
          >
            Learning Kit
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CourseCompletionAnimation({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-md overflow-hidden"
        >
          {/* Confetti / Particle effect behind */}
          <div className="absolute inset-0 pointer-events-none">
             {[...Array(24)].map((_, i) => (
               <motion.div
                 key={`particle-${i}`}
                 initial={{ 
                   y: '100vh', 
                   x: `${Math.random() * 100}vw`,
                   rotate: 0,
                   opacity: 0
                 }}
                 animate={{ 
                   y: '-10vh',
                   x: `${Math.random() * 100}vw`,
                   rotate: 360,
                   opacity: [0, 1, 1, 0]
                 }}
                 transition={{ 
                   duration: 2 + Math.random() * 4, 
                   repeat: Infinity, 
                   delay: Math.random() * 2,
                   ease: "linear"
                 }}
                 className="absolute rounded-full shadow-[0_0_15px_var(--brand)]"
                 style={{
                   width: `${Math.random() * 15 + 5}px`,
                   height: `${Math.random() * 15 + 5}px`,
                   backgroundColor: i % 2 === 0 ? 'var(--brand)' : 'var(--foreground)',
                   opacity: 0.7
                 }}
               />
             ))}
          </div>

          <motion.div 
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
            className="text-center relative z-10 p-6 md:p-8 max-w-2xl mx-auto"
          >
            <motion.div 
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2, duration: 1 }}
              className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-brand flex items-center justify-center shadow-glow mb-6 md:mb-8 text-white border-4 border-background"
            >
              <Award className="w-10 h-10 md:w-16 md:h-16" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-7xl font-extrabold font-display mb-4 md:mb-6 text-foreground tracking-tight"
            >
              Course <span className="text-brand">Completed!</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-sm md:max-w-none mx-auto"
            >
              Congratulations on finishing the IoTrack Learning Kit! You've successfully learned the fundamentals of IoT, robotics, and sensor integration.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <MagneticButton onClick={onClose} className="px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl w-full sm:w-auto mx-auto font-extrabold">
                Return to Dashboard <ArrowRight className="w-5 h-5 md:w-5 md:h-5" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function Reveal({ children, delay = 0, y = 30, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, onClick, className = "", variant = "primary", as = "button", href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * 20);
    y.set(((e.clientY - r.top - r.height / 2) / r.height) * 20);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base = variant === "primary" ? "bg-gradient-brand text-primary-foreground shadow-glow" : "glass text-foreground";
  
  const content = (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`rounded-2xl px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 justify-center ${base} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  if (as === "a") {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">{content}</a>;
  }
  return content;
}

function TopNav({ setMobileMenuOpen }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-2xl font-extrabold font-display flex items-center">
          Io<span className="text-brand">Track</span>
          <span className="ml-3 pl-3 border-l border-border text-sm font-semibold tracking-widest text-muted-foreground uppercase hidden sm:block">Learning Kit</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export const COURSE_MODULES = [
  { id: 'overview', num: 'Welcome', title: 'Course Overview', items: [{ title: 'Overview', icon: <Globe className="w-4 h-4"/>, meta: 'Start Here' }] },
  { id: 'pretest', num: 'Assessment', title: 'Course Pre-Test', items: [{ title: 'Pre-Test', icon: <FileText className="w-4 h-4"/>, meta: 'Form • 5 min' }] },
  { id: 1, title: 'IoTrack Introduction', items: [{ title: 'What is IoTrack', icon: <BookOpen className="w-4 h-4"/>, meta: 'Reading' }, { title: 'What is IoT', icon: <BookOpen className="w-4 h-4"/>, meta: 'Reading' }, { title: 'The Hardware behind the kit', icon: <BookOpen className="w-4 h-4"/>, meta: 'Reading' }, { title: 'Quick Check', icon: <ClipboardList className="w-4 h-4"/>, meta: 'Activity' }, { title: 'Prerequisite Activity', icon: <Play className="w-4 h-4"/>, meta: 'Activity' }] },
  { id: 2, title: 'Robot Arm Control', items: [{ title: 'How the robotic arm works', icon: <BookOpen className="w-4 h-4"/>, meta: 'Reading' }, { title: 'Robotic arm movement', icon: <Play className="w-4 h-4"/>, meta: 'Interactive Demo' }, { title: 'Quick Check', icon: <ClipboardList className="w-4 h-4"/>, meta: 'Activity' }] },
  { id: 3, title: 'Sensors & Data', items: [{ title: 'How the sensors works', icon: <BookOpen className="w-4 h-4"/>, meta: 'Reading' }, { title: 'Read Sensor Data', icon: <Play className="w-4 h-4"/>, meta: 'Interactive Demo' }, { title: 'Quick Check', icon: <ClipboardList className="w-4 h-4"/>, meta: 'Activity' }] },
  { id: 4, title: 'Color Detection', items: [{ title: 'Interactive Demo', icon: <Play className="w-4 h-4"/>, meta: 'Demo' }, { title: 'Quick Check', icon: <ClipboardList className="w-4 h-4"/>, meta: 'Activity' }] },
  { id: 5, title: 'Stacking', items: [{ title: 'Interactive Demo', icon: <Play className="w-4 h-4"/>, meta: 'Demo' }, { title: 'Quick Check', icon: <ClipboardList className="w-4 h-4"/>, meta: 'Activity' }] },
  { id: 'posttest', num: 'Assessment', title: 'Course Post-Test', items: [{ title: 'Post-Test', icon: <FileText className="w-4 h-4"/>, meta: 'Form • 5 min' }] },
];

export const getAbsoluteStep = (moduleId, step) => {
  let absolute = 0;
  for (const mod of COURSE_MODULES) {
    if (mod.id === moduleId) {
      absolute += step + 1;
      return absolute;
    }
    absolute += mod.items.length;
  }
  return absolute;
};

function Sidebar({ currentModule, setCurrentModule, currentStep, setCurrentStep, mobileMenuOpen, setMobileMenuOpen, maxUnlockedAbsoluteStep }) {
  const [openAccordion, setOpenAccordion] = useState(currentModule);

  React.useEffect(() => {
    setOpenAccordion(currentModule);
  }, [currentModule]);

  const handleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-full md:w-80 m-0 md:m-3 md:mr-1.5 rounded-none md:rounded-3xl bg-background md:bg-card/95 md:backdrop-blur-md text-card-foreground border-r md:border border-border flex-shrink-0 overflow-y-auto flex flex-col scrollbar-none shadow-none md:shadow-glow`}>
        <div className="p-4 md:p-5 md:border-b border-border flex justify-between items-center sticky top-0 bg-background md:bg-card/90 md:backdrop-blur z-10">
          <h2 className="font-bold text-xl md:text-lg">Course Content</h2>
          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      
      {/* Accordions */}
      <div className="py-2">
        {COURSE_MODULES.map(mod => {
          // Check if this module is unlocked (at least step 0 is unlocked)
          const isModuleUnlocked = getAbsoluteStep(mod.id, 0) <= maxUnlockedAbsoluteStep;
          
          return (
            <div key={mod.id} className="border-b border-border/50 last:border-0">
              <div 
                className={`p-4 flex justify-between items-center transition-colors ${isModuleUnlocked ? 'cursor-pointer hover:bg-muted/50' : 'opacity-50 cursor-not-allowed'} ${openAccordion === mod.id ? 'bg-brand/5' : ''}`}
                onClick={() => isModuleUnlocked && handleAccordion(mod.id)}
              >
                <div>
                  <div className="text-xs font-bold text-brand mb-1 uppercase tracking-wider">{mod.num || `Module ${mod.id}`}</div>
                  <div className={`font-bold text-sm flex items-center gap-2 ${openAccordion === mod.id ? 'text-brand' : ''}`}>
                    {mod.title}
                    {!isModuleUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                  </div>
                </div>
                {openAccordion === mod.id ? <ChevronUp className="w-4 h-4 text-brand" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </div>
              
              <AnimatePresence>
                {openAccordion === mod.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-background/50"
                  >
                    <div className="px-4 py-2 border-l-2 border-brand/20 ml-4">
                      {mod.items.map((item, i) => {
                        const isUnlocked = getAbsoluteStep(mod.id, i) <= maxUnlockedAbsoluteStep;
                        const isCompleted = getAbsoluteStep(mod.id, i) < maxUnlockedAbsoluteStep;
                        const isActive = currentModule === mod.id && currentStep === i;
                        
                        return (
                          <div 
                            key={i} 
                            className={`flex gap-3 p-3 rounded-xl transition-all ${isUnlocked ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} ${isActive ? 'bg-brand/10 border border-brand/20 shadow-sm' : 'hover:bg-muted border border-transparent'}`}
                            onClick={() => {
                              if (isUnlocked) {
                                setCurrentModule(mod.id);
                                setCurrentStep(i);
                                setMobileMenuOpen(false);
                              }
                            }}
                          >
                            <div className="mt-0.5">
                              {isActive ? (
                                <Circle className="w-5 h-5 text-brand fill-brand/20" />
                              ) : isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-brand" />
                              ) : isUnlocked ? (
                                <Circle className="w-5 h-5 text-muted-foreground/50" />
                              ) : (
                                <Lock className="w-5 h-5 text-muted-foreground/30" />
                              )}
                            </div>
                            <div>
                              <div className={`text-sm font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</div>
                              <div className="text-xs text-brand/70 flex items-center gap-1 mt-1 font-medium">
                                {item.icon} {item.meta}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
    </>
  );
}

function RightSidebar({ maxUnlockedAbsoluteStep }) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem('iotrack-notes');
    if (saved) setNoteText(saved);
  }, []);

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
    localStorage.setItem('iotrack-notes', e.target.value);
  };

  const totalSteps = COURSE_MODULES.reduce((sum, mod) => sum + mod.items.length, 0);
  
  const progressPercent = Math.min(100, Math.round(((maxUnlockedAbsoluteStep - 1) / totalSteps) * 100));

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <>
      {/* Mobile overlay and bottom sheet for notes */}
      <AnimatePresence>
        {notesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setNotesOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-x-0 bottom-0 z-50 h-[80vh] bg-card rounded-t-3xl border-t border-border shadow-glow lg:hidden flex flex-col p-4"
            >
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-4" />
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold flex items-center gap-2"><Bookmark className="w-5 h-5 text-brand"/> My Notes</h3>
                 <button onClick={() => setNotesOpen(false)} className="p-2 -mr-2 text-muted-foreground hover:text-foreground"><ChevronDown className="w-6 h-6"/></button>
              </div>
              <textarea
                 value={noteText}
                 onChange={handleNoteChange}
                 placeholder="Type your notes here... They will be saved automatically."
                 className="flex-1 w-full bg-background border border-border rounded-2xl p-4 text-base resize-none focus:outline-none focus:border-brand/50 scrollbar-none"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Sidebar Element */}
      <aside className={`fixed bottom-6 right-4 z-40 flex flex-col gap-1 lg:relative lg:bottom-auto lg:right-auto lg:z-auto transition-all duration-300 ${notesOpen ? 'lg:w-80' : 'lg:w-24'} lg:border lg:border-border lg:rounded-3xl lg:bg-card/80 lg:backdrop-blur-md lg:py-6 lg:m-3 lg:ml-1.5 lg:shadow-soft lg:items-center`}>
        
        {/* Desktop Expanded Notes View */}
        {notesOpen ? (
          <div className="hidden lg:flex flex-col h-full w-full px-4 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
               <h3 className="font-bold flex items-center gap-2 text-lg"><Bookmark className="w-5 h-5 text-brand"/> My Notes</h3>
               <button onClick={() => setNotesOpen(false)} className="text-muted-foreground hover:text-foreground"><ChevronRight className="w-6 h-6"/></button>
            </div>
            <textarea
               value={noteText}
               onChange={handleNoteChange}
               placeholder="Type your notes here... They will be saved automatically."
               className="flex-1 w-full bg-background border border-border rounded-2xl p-4 text-sm resize-none focus:outline-none focus:border-brand/50 scrollbar-none"
            />
          </div>
        ) : (
          /* Default Collapsed View (Desktop & Mobile buttons) */
          <div className="flex flex-col items-center gap-1 lg:gap-3 w-full">
            <div className="flex flex-col items-center cursor-pointer group lg:mb-0">
              <div className="relative w-14 h-14 flex items-center justify-center bg-card lg:bg-transparent rounded-full shadow-glow lg:shadow-none border border-border lg:border-transparent">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-muted fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-brand fill-none transition-all duration-1000 ease-in-out"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-foreground">
                  {progressPercent}%
                </div>
              </div>
              <span className="hidden lg:block text-[10px] font-bold text-brand uppercase tracking-wider text-center px-1">Learning<br/>Progress</span>
            </div>

            <div className="hidden lg:block w-12 h-px bg-border/50"></div>

            <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setNotesOpen(true)}>
              <div className="w-12 h-12 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-card lg:bg-background border border-border group-hover:bg-brand/10 text-muted-foreground group-hover:text-brand transition-all shadow-glow lg:shadow-sm group-hover:shadow-glow">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="hidden lg:block text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-brand transition-colors">Notes</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function ContentActions({ nextTitle, onNext, isLast }) {
  if (isLast) {
    return (
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto">
          <button onClick={() => { window.dispatchEvent(new Event('course-completed')); onNext(); }} className="px-6 py-3 rounded-2xl border border-border w-full sm:w-auto bg-brand text-brand-foreground transition-colors flex items-center justify-center gap-2 font-bold hover:bg-brand/90 hover:shadow-glow">
            I'm Done <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!nextTitle) return null;

  return (
    <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <span className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1 block">Up Next</span>
        <h3 className="font-bold text-xl flex items-center gap-3">
          {nextTitle}
        </h3>
      </div>
      <div className="flex w-full sm:w-auto">
        <button onClick={onNext} className="px-6 py-3 rounded-2xl border border-border w-full sm:w-auto bg-background/50 hover:bg-background transition-colors flex items-center justify-center gap-2 font-bold hover:shadow-sm">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function QuickCheck({ questions }) {
  const [answers, setAnswers] = useState({});

  const handleSelect = (qIndex, optionIndex, isCorrect) => {
    if (answers[qIndex]?.isCorrect) return;
    
    setAnswers(prev => ({
      ...prev,
      [qIndex]: {
        selected: optionIndex,
        isCorrect: isCorrect,
        tried: [...(prev[qIndex]?.tried || []), optionIndex]
      }
    }));
  };

  return (
    <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
      <ClipboardList className="w-8 h-8 text-brand mb-3" />
      <h2 className="text-2xl font-bold mb-3">Quick Check</h2>
      <p className="text-muted-foreground mb-6 text-lg">Test your knowledge.</p>
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-background p-5 rounded-xl border border-border">
            <p className="font-bold mb-3">{qIndex + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, optIndex) => {
                const state = answers[qIndex];
                const isCorrect = opt.isCorrect;
                const hasTried = state?.tried?.includes(optIndex);
                
                let btnClass = "w-full text-left p-3 rounded-lg border transition-colors ";
                
                if (state?.isCorrect && isCorrect) {
                  btnClass += "border-green-500 bg-green-500/10 font-bold text-green-600";
                } else if (hasTried && !isCorrect) {
                  btnClass += "border-red-500 bg-red-500/5 text-red-500 opacity-70 cursor-not-allowed";
                } else {
                  btnClass += "border-border hover:bg-muted";
                }

                return (
                  <button 
                    key={optIndex} 
                    disabled={state?.isCorrect || (hasTried && !isCorrect)}
                    onClick={() => handleSelect(qIndex, optIndex, isCorrect)}
                    className={btnClass}
                  >
                    {opt.text} {state?.isCorrect && isCorrect && " ✓"} {hasTried && !isCorrect && " ✗"}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// === MODULE COMPONENTS ===

function Module1({ currentStep, onNext, nextTitle }) {
  const [pingStatus, setPingStatus] = useState('None');
  const [pingResult, setPingResult] = useState('Ready');

  const pingRobot = async () => {
    setPingStatus('PING_ROBOT');
    setPingResult('Checking...');
    await wait(700);
    setPingResult('Connected \u2705');
  };

  const q1 = [
    { question: "What is the primary 'brain' of the IoTrack kit?", options: [{text: "Servo Motors", isCorrect: false}, {text: "Color Sensor", isCorrect: false}, {text: "ESP32 Microcontroller", isCorrect: true}] },
    { question: "What type of action does the robotic arm perform?", options: [{text: "Physical Actuation", isCorrect: true}, {text: "Data Sensing", isCorrect: false}, {text: "Wireless Routing", isCorrect: false}] },
    { question: "What acts as the joints for the robotic arm?", options: [{text: "Sensors", isCorrect: false}, {text: "Servo Motors", isCorrect: true}, {text: "Breadboards", isCorrect: false}] },
    { question: "How does the kit communicate?", options: [{text: "Only through USB", isCorrect: false}, {text: "It does not communicate", isCorrect: false}, {text: "Via Wi-Fi and Bluetooth", isCorrect: true}] },
    { question: "What provides power to the kit?", options: [{text: "Solar Panels", isCorrect: false}, {text: "5V Power Supply", isCorrect: true}, {text: "AAA Batteries", isCorrect: false}] }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-glow relative overflow-hidden">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">MODULE 1 • {COURSE_MODULES.find(m => m.id === 1).items[currentStep]?.meta?.toUpperCase()}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">{COURSE_MODULES.find(m => m.id === 1).items[currentStep]?.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl relative z-10">Get to know the IoTrack robotic arm and the core ideas of IoT.</p>
        </div>
      </Reveal>

      {currentStep === 0 && (
        <Reveal delay={0.2}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-brand mb-3" />
            <h2 className="text-2xl font-bold mb-4">What is IoTrack?</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">IoTrack is a smart robotic arm designed to help you learn about the Internet of Things (IoT). It brings ideas to life by connecting web interfaces with real-world physical movements.</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-brand/5 rounded-xl p-5 border border-brand/10">
                <strong className="block mb-2 text-brand text-lg">Overview</strong>
                <p className="text-base text-foreground/80">A physical robotic arm paired with a learning website.</p>
              </div>
              <div className="bg-brand/5 rounded-xl p-5 border border-brand/10">
                <strong className="block mb-2 text-brand text-lg">Goal</strong>
                <p className="text-base text-foreground/80">Bridge theory and practice in robotics and automation.</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 1 && (
        <Reveal delay={0.1}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-brand mb-3" />
            <h2 className="text-2xl font-bold mb-4">What is IoT?</h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">The Internet of Things (IoT) connects devices to the internet so they can share data and perform tasks automatically.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-3"><Radar className="w-5 h-5 text-brand" /><strong className="text-lg text-foreground">Sensors</strong></div>
                <p className="text-base text-muted-foreground">Devices that detect the world around them, like an RGB sensor identifying colors.</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-3"><Cpu className="w-5 h-5 text-brand" /><strong className="text-lg text-foreground">Controllers</strong></div>
                <p className="text-base text-muted-foreground">The "brain" of the device (like the ESP32) that makes decisions based on data.</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-3"><Radio className="w-5 h-5 text-brand" /><strong className="text-lg text-foreground">Connectivity</strong></div>
                <p className="text-base text-muted-foreground">Using Wi-Fi or Bluetooth to communicate with other devices and web servers.</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-3"><Zap className="w-5 h-5 text-brand" /><strong className="text-lg text-foreground">Actuators</strong></div>
                <p className="text-base text-muted-foreground">Motors and moving parts that carry out physical actions, like the robot arm joints.</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 2 && (
        <Reveal delay={0.1}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-brand mb-3" />
            <h2 className="text-2xl font-bold mb-4">The Hardware</h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">Here are the main components that make up the IoTrack kit.</p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><Cog className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">Motors</strong><p className="text-base text-muted-foreground">Move the robot's joints and gripper.</p></div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><ScanLine className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">Color Sensor</strong><p className="text-base text-muted-foreground">Detects object colors for sorting.</p></div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><Cpu className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">ESP32 Chip</strong><p className="text-base text-muted-foreground">The main brain controlling the kit.</p></div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><Battery className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">Power</strong><p className="text-base text-muted-foreground">Safe 5V supply for reliable operation.</p></div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><CircuitBoard className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">Wiring</strong><p className="text-base text-muted-foreground">Connects all electronics together.</p></div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm"><Bot className="w-6 h-6 text-brand mb-3"/><strong className="block text-foreground text-lg mb-1">Frame</strong><p className="text-base text-muted-foreground">The mechanical structure of the arm.</p></div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 3 && (
        <Reveal delay={0.1}>
          <QuickCheck questions={q1} />
        </Reveal>
      )}

      {currentStep === 4 && (
        <Reveal delay={0.1}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-glow relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold shadow-soft mb-4 relative z-10"><Play className="w-5 h-5" fill="currentColor"/></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">Activity: Check the Robot</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 relative z-10">Before sending movement commands, we must ping the robot to verify it's connected and ready.</p>
            
            <MagneticButton onClick={pingRobot} className="w-full sm:w-auto px-8 mb-6 text-lg relative z-10 py-4 bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-glow">Check Robot Connection</MagneticButton>
            
            <div className="bg-background/80 backdrop-blur border border-border rounded-xl p-5 text-sm relative z-10">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground text-base">Command</span><span className="font-bold font-mono text-brand bg-brand/10 px-2 rounded">{pingStatus}</span>
              </div>
              <div className="flex justify-between py-2 pt-4">
                <span className="text-muted-foreground text-base">Robot response</span>
                <span className={`font-bold flex items-center gap-1 ${pingResult.includes('\u2705') ? 'text-green-500 text-base' : 'text-base'}`}>{pingResult}</span>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}

function Module2({ currentStep, onNext, nextTitle }) {
  const [cmd, setCmd] = useState('None');
  const [status, setStatus] = useState('Ready');
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [log, setLog] = useState(['Controller ready.', 'Waiting for a movement command...']);

  const q2 = [
    { question: "How is a servo motor different from a standard DC motor?", options: [{text: "It spins much faster", isCorrect: false}, {text: "It moves to precise angles rather than spinning endlessly", isCorrect: true}, {text: "It cannot be controlled by a microcontroller", isCorrect: false}] },
    { question: "What acts as the 'shoulder' for the arm?", options: [{text: "The Base and Elbow", isCorrect: true}, {text: "The Wrist", isCorrect: false}, {text: "The Gripper", isCorrect: false}] },
    { question: "Why do we ping the robot before sending movement commands?", options: [{text: "To wake it up from sleep mode", isCorrect: false}, {text: "To check its battery level", isCorrect: false}, {text: "To ensure it is connected and ready to receive commands", isCorrect: true}] },
    { question: "Which joint is responsible for grabbing objects?", options: [{text: "The Base", isCorrect: false}, {text: "The Elbow", isCorrect: false}, {text: "The Gripper", isCorrect: true}] },
    { question: "If you tell the servo to move to 90°, what happens?", options: [{text: "It spins 90 times per second", isCorrect: false}, {text: "It moves to the 90° position and holds it", isCorrect: true}, {text: "It powers off for 90 seconds", isCorrect: false}] }
  ];

  const moveRobot = (c) => {
    setCmd(c);
    if (c === 'STOP') {
      setStatus('STOPPED');
      setLog(prev => [...prev, '■ STOP command sent']);
      return;
    }
    setStatus('Moving...');
    let newX = pos.x;
    let newY = pos.y;
    if (c === 'LEFT') newX--;
    if (c === 'RIGHT') newX++;
    if (c === 'UP') newY++;
    if (c === 'DOWN') newY--;
    if (c === 'HOME') { newX = 0; newY = 0; }
    
    setPos({ x: newX, y: newY });
    setLog(prev => [...prev, `→ ${c} command sent`]);

    setTimeout(() => {
      setStatus('Ready');
      setLog(prev => [...prev, `✓ Robot acknowledged ${c}`]);
    }, 450);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-glow relative overflow-hidden">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">MODULE 2 • {COURSE_MODULES.find(m => m.id === 2).items[currentStep]?.meta?.toUpperCase()}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">{COURSE_MODULES.find(m => m.id === 2).items[currentStep]?.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl relative z-10">Learn how the robot's joints move and test its controls.</p>
        </div>
      </Reveal>

      {currentStep === 0 && (
        <Reveal delay={0.2}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-brand mb-3" />
            <h2 className="text-2xl font-bold mb-4">How the robotic arm works</h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">The robotic arm uses Servo Motors for its joints. Unlike standard motors that spin constantly, servo motors move to a specific angle and hold that exact position.</p>
            
            <div className="bg-brand/5 rounded-xl p-5 mb-6 border border-brand/10">
              <strong className="block mb-2 text-brand text-lg flex items-center gap-2"><Target className="w-5 h-5"/> Main Goal</strong>
              <p className="text-base text-foreground/80">Understand how different joints work together to position the arm.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <strong className="block text-brand text-lg mb-2">Base & Elbow</strong>
                <p className="text-base text-muted-foreground">The base rotates left and right, while the elbow reaches forward and back. Together, they aim the arm.</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <strong className="block text-brand text-lg mb-2">Wrist & Gripper</strong>
                <p className="text-base text-muted-foreground">The wrist tilts the claw up or down, and the gripper opens and closes to grab objects.</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 1 && (
        <Reveal delay={0.1}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-8 shadow-glow relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold shadow-soft mb-4 relative z-10"><Play className="w-5 h-5" fill="currentColor"/></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">Activity: Manual Controller</h2>
            
            <div className="grid md:grid-cols-2 gap-10 mt-6 relative z-10">
              <div className="bg-background rounded-3xl p-6 border border-border shadow-inner">
                <div className="grid grid-cols-3 grid-rows-3 gap-3 place-items-center max-w-[250px] mx-auto">
                  <div />
                  <button className="bg-primary text-primary-foreground w-16 h-16 rounded-2xl text-2xl font-bold hover:bg-primary/90 shadow-soft hover:scale-105 transition-all flex items-center justify-center" onClick={() => moveRobot('UP')}>
                    <ChevronUp className="w-8 h-8" />
                  </button>
                  <div />
                  <button className="bg-primary text-primary-foreground w-16 h-16 rounded-2xl text-2xl font-bold hover:bg-primary/90 shadow-soft hover:scale-105 transition-all flex items-center justify-center" onClick={() => moveRobot('LEFT')}>
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button className="bg-secondary text-secondary-foreground w-16 h-16 rounded-2xl text-xs font-bold hover:bg-secondary/80 shadow-soft hover:scale-105 transition-all flex items-center justify-center" onClick={() => moveRobot('HOME')}>HOME</button>
                  <button className="bg-primary text-primary-foreground w-16 h-16 rounded-2xl text-2xl font-bold hover:bg-primary/90 shadow-soft hover:scale-105 transition-all flex items-center justify-center" onClick={() => moveRobot('RIGHT')}>
                    <ChevronRight className="w-8 h-8" />
                  </button>
                  <div />
                  <button className="bg-primary text-primary-foreground w-16 h-16 rounded-2xl text-2xl font-bold hover:bg-primary/90 shadow-soft hover:scale-105 transition-all flex items-center justify-center" onClick={() => moveRobot('DOWN')}>
                    <ChevronDown className="w-8 h-8" />
                  </button>
                  <div />
                </div>
                <div className="flex gap-3 justify-center mt-6">
                  <MagneticButton onClick={() => moveRobot('GRAB')} className="flex-1 py-4">Grab</MagneticButton>
                  <MagneticButton onClick={() => moveRobot('RELEASE')} variant="ghost" className="flex-1 py-4 bg-muted border border-border text-foreground">Release</MagneticButton>
                </div>
                <button className="w-full bg-destructive/10 text-destructive font-bold py-4 rounded-xl mt-3 hover:bg-destructive/20 border border-destructive/20 transition-colors flex items-center justify-center gap-2" onClick={() => moveRobot('STOP')}>
                  <div className="w-4 h-4 bg-destructive rounded-sm"></div> Emergency Stop
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-background border border-border rounded-2xl p-6 text-sm shadow-sm flex-1">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-brand" /> Telemetry</h3>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground text-base">Robot status</span><span className={`font-bold text-base ${status === 'Ready' ? 'text-green-500' : status === 'STOPPED' ? 'text-red-500' : 'text-brand'}`}>{status}</span></div>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground text-base">Last command</span><span className="font-bold font-mono bg-muted px-2 py-0.5 rounded text-base text-foreground">{cmd}</span></div>
                  <div className="flex justify-between py-3"><span className="text-muted-foreground text-base">Position</span><span className="font-bold bg-brand/10 text-brand px-2 py-0.5 rounded border border-brand/20 text-base">{pos.x === 0 && pos.y === 0 ? 'Home' : `X: ${pos.x}, Y: ${pos.y}`}</span></div>
                </div>
                <div className="bg-[#0a0a0a] border border-border/50 text-green-400 p-5 rounded-2xl font-mono text-sm h-40 overflow-y-auto shadow-inner">
                  <div className="text-muted-foreground mb-2 opacity-50">Terminal Output //</div>
                  {log.map((l, i) => <div key={i} className="mb-1 opacity-90 hover:opacity-100">{l}</div>)}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 2 && (
        <Reveal delay={0.1}>
          <QuickCheck questions={q2} />
        </Reveal>
      )}

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}

function Module3({ currentStep, onNext, nextTitle }) {
  const [rgb, setRgb] = useState({ r: '—', g: '—', b: '—' });
  const [detected, setDetected] = useState('Waiting');
  const [status, setStatus] = useState('Ready');

  const q3 = [
    { question: "If the sensor returns R: 200, G: 50, B: 30, what will the controller interpret?", options: [{text: "Red", isCorrect: true}, {text: "Green", isCorrect: false}, {text: "Blue", isCorrect: false}] },
    { question: "What does an RGB color sensor do?", options: [{text: "Takes photographs of objects", isCorrect: false}, {text: "Measures the reflection of Red, Green, and Blue light", isCorrect: true}, {text: "Measures the weight of an object", isCorrect: false}] },
    { question: "What values does the color sensor output for each channel?", options: [{text: "0 to 100", isCorrect: false}, {text: "True or False", isCorrect: false}, {text: "0 to 255", isCorrect: true}] },
    { question: "How does the ESP32 determine the color of the object?", options: [{text: "By looking at the object", isCorrect: false}, {text: "By finding the lowest channel value", isCorrect: false}, {text: "By comparing the R, G, and B values to find the highest", isCorrect: true}] },
    { question: "What happens if an object reflects very little light overall?", options: [{text: "The readings will all be close to 0", isCorrect: true}, {text: "The readings will all be close to 255", isCorrect: false}, {text: "The sensor breaks", isCorrect: false}] }
  ];

  const readSensors = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setRgb({ r, g, b });
    let color = 'RED';
    if (g >= r && g >= b) color = 'GREEN';
    if (b >= r && b >= g) color = 'BLUE';
    setDetected(color);
    setStatus('Reading received ✓');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-soft relative overflow-hidden">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">MODULE 3 • {COURSE_MODULES.find(m => m.id === 3).items[currentStep]?.meta?.toUpperCase()}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">{COURSE_MODULES.find(m => m.id === 3).items[currentStep]?.title}</h1>
          <p className="text-lg text-muted-foreground relative z-10">Learn how sensors collect data and how the controller interprets it.</p>
        </div>
      </Reveal>

      {currentStep === 0 && (
        <Reveal delay={0.2}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-brand mb-3" />
            <h2 className="text-2xl font-bold mb-4">How the sensors work</h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">Sensors turn physical properties into digital numbers. Our kit uses a Color Sensor that bounces light off an object to measure how much Red, Green, and Blue light reflects back.</p>
            
            <div className="bg-brand/5 rounded-xl p-5 mb-6 border border-brand/10">
              <strong className="block mb-2 text-brand text-lg flex items-center gap-2"><Target className="w-5 h-5"/> Main Goal</strong>
              <p className="text-base text-foreground/80">Understand how a controller turns raw sensor data into meaningful decisions.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <strong className="block text-brand text-lg mb-2">Raw Data</strong>
                <p className="text-base text-muted-foreground">The sensor outputs numbers from 0 to 255 for R, G, and B. These are just raw numbers.</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border shadow-sm">
                <strong className="block text-brand text-lg mb-2">Logic Processing</strong>
                <p className="text-base text-muted-foreground">The ESP32 controller compares the three numbers to find the highest one, deciding what the real-world color is.</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 1 && (
        <Reveal delay={0.1}>
          <div className="glass border-t-4 border-t-brand border border-brand/30 rounded-2xl p-8 shadow-glow relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold shadow-soft mb-4 relative z-10"><Play className="w-5 h-5" fill="currentColor"/></div>
            <h2 className="text-2xl font-bold mb-4 relative z-10">Activity: Read Sensor Data</h2>
            
            <p className="text-muted-foreground mb-6 text-base md:text-lg">Click the button below to simulate reading data from the color sensor.</p>
            
            <button onClick={readSensors} className="w-full md:w-auto px-10 py-4 mb-8 text-lg bg-brand text-brand-foreground font-bold rounded-2xl hover:bg-brand/90 hover:shadow-glow transition-all">Poll Sensor Array</button>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-background border-t-4 border-t-red-500 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5"></div>
                <span className="text-muted-foreground text-sm block mb-2 font-bold uppercase tracking-wider relative z-10">Red Channel</span>
                <b className="text-5xl font-display text-red-500 relative z-10">{rgb.r}</b>
              </div>
              <div className="bg-background border-t-4 border-t-green-500 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5"></div>
                <span className="text-muted-foreground text-sm block mb-2 font-bold uppercase tracking-wider relative z-10">Green Channel</span>
                <b className="text-5xl font-display text-green-500 relative z-10">{rgb.g}</b>
              </div>
              <div className="bg-background border-t-4 border-t-blue-500 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5"></div>
                <span className="text-muted-foreground text-sm block mb-2 font-bold uppercase tracking-wider relative z-10">Blue Channel</span>
                <b className="text-5xl font-display text-blue-500 relative z-10">{rgb.b}</b>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 text-sm flex justify-between items-center">
              <div>
                 <div className="text-muted-foreground mb-1 uppercase tracking-wider text-xs font-bold">Interpreted Classification</div>
                 <div className={`text-2xl font-bold ${detected === 'RED' ? 'text-red-500' : detected === 'GREEN' ? 'text-green-500' : detected === 'BLUE' ? 'text-blue-500' : 'text-foreground'}`}>{detected}</div>
              </div>
              <div className="text-right">
                 <div className="text-muted-foreground mb-1 uppercase tracking-wider text-xs font-bold">System Status</div>
                 <div className="font-bold text-green-500 text-lg">{status}</div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 2 && (
        <Reveal delay={0.1}>
          <QuickCheck questions={q3} />
        </Reveal>
      )}

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}

function Module4({ currentStep, onNext, nextTitle }) {
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState('none');

  const q4 = [
    { question: "What is a closed-loop sequence?", options: [{text: "A loop that never ends", isCorrect: false}, {text: "A sequence that uses sensor feedback to make decisions", isCorrect: true}, {text: "A loop that only goes backwards", isCorrect: false}] },
    { question: "In color sorting, what does the robot do after picking up a block?", options: [{text: "It drops it immediately", isCorrect: false}, {text: "It reads the color sensor to decide where to place it", isCorrect: true}, {text: "It turns off", isCorrect: false}] },
    { question: "If the sensor reads 'Red', what happens next?", options: [{text: "The block goes to the Red bin", isCorrect: true}, {text: "The block goes to the Green bin", isCorrect: false}, {text: "The block is thrown away", isCorrect: false}] },
    { question: "Why is this better than an open-loop sequence?", options: [{text: "It can sort mixed blocks correctly by adapting to what it senses", isCorrect: true}, {text: "It is faster", isCorrect: false}, {text: "It uses less power", isCorrect: false}] },
    { question: "What happens if the color sensor is unplugged during sorting?", options: [{text: "It continues sorting perfectly", isCorrect: false}, {text: "It will fail to determine the color and won't know where to place the block", isCorrect: true}, {text: "It will explode", isCorrect: false}] }
  ];

  const runSorting = async () => {
    setRunning(true);
    setColor('scanning');
    await wait(1000);
    const colors = ['red', 'green', 'blue'];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    await wait(2000);
    setRunning(false);
    setColor('none');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-soft">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">MODULE 4 • {COURSE_MODULES.find(m => m.id === 4).items[currentStep]?.meta?.toUpperCase()}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">{COURSE_MODULES.find(m => m.id === 4).items[currentStep]?.title}</h1>
          <p className="text-lg text-muted-foreground">See how the robot uses sensor data to make decisions automatically.</p>
        </div>
      </Reveal>

      {currentStep === 0 && (
        <Reveal delay={0.2}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-10 shadow-soft text-center">
            <h2 className="text-2xl font-bold mb-4">Activity: Run Sorting</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base md:text-lg">Click below to simulate the robot picking a block, reading its color, and placing it in the correct bin based on what it senses.</p>
            
            <div className="bg-background border border-border p-8 rounded-3xl max-w-sm mx-auto shadow-inner relative">
              <div className={`w-32 h-32 mx-auto rounded-full border-8 mb-6 flex items-center justify-center shadow-inner transition-colors duration-500
                ${color === 'none' ? 'bg-muted border-border' : ''}
                ${color === 'scanning' ? 'bg-brand/20 border-brand animate-pulse' : ''}
                ${color === 'red' ? 'bg-red-500 border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : ''}
                ${color === 'green' ? 'bg-green-500 border-green-600 shadow-[0_0_30px_rgba(34,197,94,0.5)]' : ''}
                ${color === 'blue' ? 'bg-blue-500 border-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''}
              `}>
                {color === 'scanning' && <ScanLine className="w-12 h-12 text-brand animate-spin" />}
                {color !== 'scanning' && color !== 'none' && <CheckCircle2 className="w-12 h-12 text-white" />}
              </div>
              
              <button 
                onClick={runSorting} 
                className={`w-full py-4 text-lg font-bold bg-brand text-brand-foreground rounded-2xl transition-all ${running ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand/90 hover:shadow-glow'}`}
                disabled={running}
              >
                {running ? 'Running Sequence...' : 'Start Color Sort'}
              </button>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 1 && (
        <Reveal delay={0.1}>
          <QuickCheck questions={q4} />
        </Reveal>
      )}

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 rounded-xl border border-border bg-transparent text-foreground text-sm focus:ring-2 focus:ring-brand focus:border-brand transition-all shadow-sm outline-none cursor-pointer flex justify-between items-center select-none"
      >
        <span>{options.find(o => o.value === value)?.label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
          >
            {options.map((option) => (
              <div 
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm transition-colors ${value === option.value ? 'bg-brand/20 text-brand font-medium' : 'hover:bg-muted text-foreground'}`}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Module5({ currentStep, onNext, nextTitle }) {
  const [running, setRunning] = useState(false);
  const [blocks, setBlocks] = useState(0);
  const [location, setLocation] = useState('number1');
  const [count, setCount] = useState('3');
  const [robotIp, setRobotIp] = useState('192.168.x.x');

  const q5 = [
    { question: "What kind of sequence is stacking if it doesn't use the color sensor?", options: [{text: "Open-loop", isCorrect: true}, {text: "Closed-loop", isCorrect: false}, {text: "Random", isCorrect: false}] },
    { question: "What defines an open-loop sequence?", options: [{text: "It adapts to changes in the environment", isCorrect: false}, {text: "It executes pre-programmed steps without sensory feedback", isCorrect: true}, {text: "It requires a human to press a button for each step", isCorrect: false}] },
    { question: "Why is timing important in a stacking sequence?", options: [{text: "So the robot doesn't get bored", isCorrect: false}, {text: "To ensure each servo reaches its position before the next command", isCorrect: true}, {text: "Because the blocks will disappear if they aren't stacked fast enough", isCorrect: false}] },
    { question: "If a block falls over during stacking, will the robot know?", options: [{text: "Yes, it has eyes", isCorrect: false}, {text: "No, open-loop means it cannot verify success", isCorrect: true}, {text: "Yes, it will feel the block fall", isCorrect: false}] },
    { question: "How many blocks are stacked in the demonstration?", options: [{text: "1", isCorrect: false}, {text: "2", isCorrect: false}, {text: "3", isCorrect: true}] }
  ];

  const runStacking = async () => {
    setRunning(true);
    setBlocks(0);
    
    const cmd = `stack ${location} ${count}`;
    try {
      const response = await fetch(`http://${robotIp}/cmd?value=` + encodeURIComponent(cmd));
      if (!response.ok) throw new Error("Failed");
      
      const countNum = parseInt(count);
      for(let i=1; i<=countNum; i++) {
        await wait(800);
        setBlocks(i);
      }
    } catch (error) {
      // Ignore errors silently as requested
    }
    setRunning(false);
  };

  const locationOptions = [
    { value: 'number1', label: 'Position 1' },
    { value: 'number2', label: 'Position 2' },
    { value: 'number3', label: 'Position 3' },
    { value: 'number4', label: 'Position 4' },
    { value: 'number5', label: 'Position 5' }
  ];

  const countOptions = [
    { value: '1', label: '1 block' },
    { value: '2', label: '2 blocks' },
    { value: '3', label: '3 blocks' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-soft">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">MODULE 5 • {COURSE_MODULES.find(m => m.id === 5).items[currentStep]?.meta?.toUpperCase()}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">{COURSE_MODULES.find(m => m.id === 5).items[currentStep]?.title}</h1>
          <p className="text-lg text-muted-foreground">Learn how to program a multi-step movement sequence.</p>
        </div>
      </Reveal>

      {currentStep === 0 && (
        <Reveal delay={0.2}>
          <div className="glass border-t-4 border-t-brand rounded-2xl p-10 shadow-soft text-center">
            <h2 className="text-2xl font-bold mb-4">Activity: Run Stacking</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base md:text-lg">This triggers a pre-programmed sequence. The robot moves exactly where it's told, stacking blocks one by one.</p>
            
            <div className="bg-background border border-border p-8 rounded-3xl max-w-sm mx-auto shadow-inner flex flex-col h-auto">
              
              <div className="w-full flex flex-col justify-end items-center relative min-h-[12rem] mb-6 border-b-4 border-border pb-1">
                <AnimatePresence>
                  {blocks >= 1 && <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-20 h-16 bg-blue-500 rounded border-2 border-blue-600 shadow-sm relative z-10 -mb-1 mx-auto"></motion.div>}
                  {blocks >= 2 && <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-20 h-16 bg-green-500 rounded border-2 border-green-600 shadow-sm relative z-10 -mb-1 mx-auto"></motion.div>}
                  {blocks >= 3 && <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-20 h-16 bg-red-500 rounded border-2 border-red-600 shadow-sm relative z-10 mx-auto"></motion.div>}
                </AnimatePresence>
              </div>

              <div className="w-full flex flex-col gap-3 relative z-20 text-left">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wide">Robot IP Address</label>
                  <input 
                    type="text" 
                    value={robotIp} 
                    onChange={(e) => setRobotIp(e.target.value)} 
                    placeholder="e.g. 192.168.1.10"
                    className="w-full p-3 rounded-xl border border-border bg-transparent text-foreground text-sm focus:ring-2 focus:ring-brand focus:border-brand transition-all shadow-sm outline-none font-mono" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wide">Stack Location</label>
                  <CustomSelect value={location} onChange={setLocation} options={locationOptions} />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wide">Number of Blocks</label>
                  <CustomSelect value={count} onChange={setCount} options={countOptions} />
                </div>

                <button 
                  onClick={runStacking} 
                  className={`w-full py-4 mt-2 text-lg font-bold bg-brand text-brand-foreground rounded-2xl transition-all ${running ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand/90 hover:shadow-glow'}`}
                  disabled={running}
                >
                  {running ? 'Stacking...' : 'Stack'}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {currentStep === 1 && (
        <Reveal delay={0.1}>
          <QuickCheck questions={q5} />
        </Reveal>
      )}

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}


function CourseOverview({ onNext, nextTitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 md:p-12 shadow-glow relative overflow-hidden">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">WELCOME</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-display tracking-tight">IoTrack Learning Kit</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl relative z-10 leading-relaxed">
            Embark on an interactive journey to master the fundamentals of the Internet of Things (IoT), robotics, and sensor integration. 
          </p>

        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 border-t-4 border-t-brand shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center mb-4 shadow-soft"><CircuitBoard className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-2">Robotics</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Understand how servos work and how to control a robotic arm in 3D space.</p>
          </div>
          <div className="glass rounded-2xl p-6 border-t-4 border-t-brand shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center mb-4 shadow-soft"><ScanLine className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-2">Sensors</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Learn to read and interpret data from color sensors to make physical decisions.</p>
          </div>
          <div className="glass rounded-2xl p-6 border-t-4 border-t-brand shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center mb-4 shadow-soft"><Zap className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-2">Automation</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Combine hardware and software to create autonomous sorting and stacking routines.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="glass rounded-3xl p-8 border border-border shadow-soft">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen className="w-6 h-6 text-brand" /> Course Syllabus</h2>
          <div className="space-y-4">
            {[
              { num: 1, title: 'IoTrack Introduction', desc: 'The basics of IoT and the hardware components.' },
              { num: 2, title: 'Robot Arm Control', desc: 'Interactive manual controller and servo mechanics.' },
              { num: 3, title: 'Sensors & Data', desc: 'Polling and interpreting real-time color sensor values.' },
              { num: 4, title: 'Color Detection', desc: 'Automated sorting algorithms based on sensor input.' },
              { num: 5, title: 'Stacking', desc: 'Complex, multi-step programmed movement sequences.' }
            ].map((mod) => (
              <div key={mod.num} className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-border/50 hover:border-brand/30 transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-lg border border-brand/20">{mod.num}</div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">{mod.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}
function PreTest({ onNext, nextTitle }) {
  const [loading, setLoading] = useState(true);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-soft">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">ASSESSMENT</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">Pre-Test</h1>
          <p className="text-lg text-muted-foreground">Before we begin the learning session, please answer the Pre-Test.</p>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="glass rounded-2xl overflow-hidden shadow-glow w-full h-[800px] border border-brand/30 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mb-4"></div>
              <span className="text-muted-foreground font-bold animate-pulse">Loading Assessment...</span>
            </div>
          )}
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSewK3PuOnJkbbn0RfcmfOT1s31xrf0UsKDduKg-T1YBMs0Kdw/viewform?embedded=true" 
            onLoad={() => setLoading(false)}
            className="w-full h-full relative z-0"
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
          >Loading…</iframe>
        </div>
      </Reveal>
      <ContentActions nextTitle={nextTitle} onNext={onNext} />
    </motion.div>
  );
}

function PostTest({ onNext, nextTitle }) {
  const [loading, setLoading] = useState(true);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
      <Reveal delay={0.1}>
        <div className="hero bg-gradient-hero border border-border rounded-3xl p-8 shadow-soft">
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4 border border-brand/20">ASSESSMENT</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">Post-Test</h1>
          <p className="text-lg text-muted-foreground">You have completed the IoTrack Learning Session. Please answer the Post-Test.</p>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="glass rounded-2xl overflow-hidden shadow-glow w-full h-[800px] border border-brand/30 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mb-4"></div>
              <span className="text-muted-foreground font-bold animate-pulse">Loading Assessment...</span>
            </div>
          )}
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfHaS8EN1ZrSDR731TCY0IFGBCYk3FKqu5-91M0iKBPnCs07g/viewform?embedded=true" 
            onLoad={() => setLoading(false)}
            className="w-full h-full relative z-0"
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
          >Loading…</iframe>
        </div>
      </Reveal>
      <ContentActions nextTitle={nextTitle} onNext={onNext} isLast={true} />
    </motion.div>
  );
}

export default function Home() {
  const [currentModule, setCurrentModule] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [maxUnlockedAbsoluteStep, setMaxUnlockedAbsoluteStep] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const savedModule = localStorage.getItem('iotrack_currentModule');
    const savedStep = localStorage.getItem('iotrack_currentStep');
    const savedUnlocked = localStorage.getItem('iotrack_maxUnlockedAbsoluteStep');
    
    if (savedModule) {
      setCurrentModule(isNaN(Number(savedModule)) ? savedModule : Number(savedModule));
    }
    if (savedStep) setCurrentStep(parseInt(savedStep, 10));
    if (savedUnlocked) setMaxUnlockedAbsoluteStep(parseInt(savedUnlocked, 10));
    
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('iotrack_currentModule', currentModule);
      localStorage.setItem('iotrack_currentStep', currentStep.toString());
      localStorage.setItem('iotrack_maxUnlockedAbsoluteStep', maxUnlockedAbsoluteStep.toString());
    }
  }, [currentModule, currentStep, maxUnlockedAbsoluteStep, isLoaded]);

  React.useEffect(() => {
    const handleCompletion = () => setShowCompletion(true);
    window.addEventListener('course-completed', handleCompletion);
    
    let timer;
    const hasPlayed = sessionStorage.getItem('iotrack-intro-played');
    if (hasPlayed) {
      setShowIntro(false);
    } else {
      sessionStorage.setItem('iotrack-intro-played', 'true');
      timer = setTimeout(() => setShowIntro(false), 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('course-completed', handleCompletion);
    };
  }, []);

  const modIndex = COURSE_MODULES.findIndex(m => m.id === currentModule);
  let nextMod = null;
  let nextStep = 0;
  let nextTitle = null;

  if (modIndex !== -1) {
    const mod = COURSE_MODULES[modIndex];
    if (currentStep + 1 < mod.items.length) {
      nextMod = mod.id;
      nextStep = currentStep + 1;
      nextTitle = mod.items[nextStep].title;
    } else if (modIndex + 1 < COURSE_MODULES.length) {
      nextMod = COURSE_MODULES[modIndex + 1].id;
      nextStep = 0;
      nextTitle = COURSE_MODULES[modIndex + 1].title;
    }
  }

  const handleNext = () => {
    if (nextMod !== null) {
      // Calculate absolute step of the NEXT item being navigated to
      const absoluteTarget = getAbsoluteStep(nextMod, nextStep);
      if (absoluteTarget > maxUnlockedAbsoluteStep) {
        setMaxUnlockedAbsoluteStep(absoluteTarget);
      }
      
      setCurrentModule(nextMod);
      setCurrentStep(nextStep);
      document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If there's no next module (we just finished Post-Test), unlock everything fully
      const totalSteps = COURSE_MODULES.reduce((sum, mod) => sum + mod.items.length, 0);
      setMaxUnlockedAbsoluteStep(totalSteps + 1);
    }
  };

  return (
    <>
      <IntroAnimation show={showIntro} />
      <CourseCompletionAnimation show={showCompletion} onClose={() => setShowCompletion(false)} />
      
      <div className={`h-screen flex flex-col overflow-hidden bg-background text-foreground font-sans selection:bg-brand/20 ${showIntro ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}>
      <BlobsBackground />
      <FloatingParticles />
      
      <TopNav setMobileMenuOpen={setMobileMenuOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          currentModule={currentModule} 
          setCurrentModule={setCurrentModule} 
          currentStep={currentStep} 
          setCurrentStep={setCurrentStep} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          maxUnlockedAbsoluteStep={maxUnlockedAbsoluteStep}
        />

        <main id="main-content" className="flex-1 overflow-y-auto relative scrollbar-none">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <AnimatePresence mode="wait">
              {currentModule === 1 && <Module1 key={`m1-${currentStep}`} currentStep={currentStep} onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 2 && <Module2 key={`m2-${currentStep}`} currentStep={currentStep} onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 3 && <Module3 key={`m3-${currentStep}`} currentStep={currentStep} onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 4 && <Module4 key={`m4-${currentStep}`} currentStep={currentStep} onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 5 && <Module5 key={`m5-${currentStep}`} currentStep={currentStep} onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 'overview' && <CourseOverview key="overview" onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 'pretest' && <PreTest key="pre" onNext={handleNext} nextTitle={nextTitle} />}
              {currentModule === 'posttest' && <PostTest key="post" onNext={handleNext} nextTitle={nextTitle} />}
            </AnimatePresence>
          </div>
        </main>

        <RightSidebar maxUnlockedAbsoluteStep={maxUnlockedAbsoluteStep} />
      </div>
    </div>
    </>
  );
}
