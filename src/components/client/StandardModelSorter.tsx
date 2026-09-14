'use client'

import React, { useState, useRef } from 'react'
import { motion, PanInfo, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/useAppStore'

// --- Types & Data ---
type ParticleType = 'quark' | 'lepton' | 'boson'
type JarType = ParticleType

interface Particle {
    id: string
    labels: Record<string, string>
    type: ParticleType
    icon: string
    color: string
    clues: Record<string, string>
}

const PARTICLES: Particle[] = [
    {
        id: 'up',
        type: 'quark',
        icon: 'u',
        color: '#ec4899',
        labels: {
            en: 'Up Quark',
            hi: 'अप क्वार्क',
            ms: 'Kuark Naik',
            fr: 'Quark Up',
            es: 'Quark Arriba'
        },
        clues: {
            en: 'I am found inside protons and neutrons. I feel the strong nuclear force.',
            hi: 'मैं प्रोटॉन और न्यूट्रॉन के अंदर पाया जाता हूं। मैं मजबूत परमाणु बल महसूस करता हूं।',
            ms: 'Saya ditemui di dalam proton dan neutron. Saya merasakan daya nukleus kuat.',
            fr: "Je me trouve à l'intérieur des protons et des neutrons. Je ressens la force nucléaire forte.",
            es: 'Me encuentro dentro de los protones y neutrones. Siento la fuerza nuclear fuerte.'
        }
    },
    {
        id: 'down',
        type: 'quark',
        icon: 'd',
        color: '#ec4899',
        labels: {
            en: 'Down Quark',
            hi: 'डाउन क्वार्क',
            ms: 'Kuark Turun',
            fr: 'Quark Down',
            es: 'Quark Abajo'
        },
        clues: {
            en: 'I am heavier than my "Up" sibling. I also feel the strong nuclear force.',
            hi: 'मैं अपने "अप" भाई से भारी हूं। मैं भी मजबूत परमाणु बल महसूस करता हूं।',
            ms: 'Saya lebih berat daripada pasangan "Naik" saya. Saya juga merasakan daya nukleus kuat.',
            fr: 'Je suis plus lourd que mon homologue "Up". Je ressens également la force nucléaire forte.',
            es: 'Soy más pesado que mi hermano "Arriba". También siento la fuerza nuclear fuerte.'
        }
    },
    {
        id: 'electron',
        type: 'lepton',
        icon: 'e⁻',
        color: '#06b6d4',
        labels: {
            en: 'Electron',
            hi: 'इलेक्ट्रॉन',
            ms: 'Elektron',
            fr: 'Électron',
            es: 'Electrón'
        },
        clues: {
            en: 'I orbit the atomic nucleus. The strong force completely ignores me.',
            hi: 'मैं परमाणु नाभिक की परिक्रमा करता हूं। मजबूत बल मुझे पूरी तरह से नजरअंदाज कर देता है।',
            ms: 'Saya mengorbit nukleus atom. Daya kuat mengabaikan saya sepenuhnya.',
            fr: "J'orbite autour du noyau atomique. La force forte m'ignore complètement.",
            es: 'Orbito alrededor del núcleo atómico. La fuerza fuerte me ignora por completo.'
        }
    },
    {
        id: 'muon',
        type: 'lepton',
        icon: 'μ',
        color: '#06b6d4',
        labels: {
            en: 'Muon',
            hi: 'म्यूऑन',
            ms: 'Muon',
            fr: 'Muon',
            es: 'Muón'
        },
        clues: {
            en: 'I am like a heavy electron from cosmic rays. The strong force heavily ignores me.',
            hi: 'मैं ब्रह्मांडीय किरणों से एक भारी इलेक्ट्रॉन की तरह हूं। मजबूत बल मुझे नजरअंदाज कर देता है।',
            ms: 'Saya seperti elektron berat daripada sinaran kosmik. Daya kuat mengabaikan saya.',
            fr: "Je suis comme un électron lourd issu des rayons cosmiques. La force forte m'ignore.",
            es: 'Soy como un electrón pesado proveniente de rayos cósmicos. La fuerza fuerte me ignora.'
        }
    },
    {
        id: 'photon',
        type: 'boson',
        icon: 'γ',
        color: '#eab308',
        labels: {
            en: 'Photon',
            hi: 'फोटॉन',
            ms: 'Foton',
            fr: 'Photon',
            es: 'Fotón'
        },
        clues: {
            en: 'I am a packet of pure light. My job is to carry the electromagnetic force.',
            hi: 'मैं शुद्ध प्रकाश का एक पैकेट हूं। मेरा काम विद्युत चुम्बकीय बल ले जाना है।',
            ms: 'Saya adalah paket cahaya tulen. Tugas saya adalah membawa daya elektromagnet.',
            fr: 'Je suis un paquet de lumière pure. Mon rôle est de transporter la force électromagnétique.',
            es: 'Soy un paquete de luz pura. Mi trabajo es transportar la fuerza electromagnética.'
        }
    },
    {
        id: 'gluon',
        type: 'boson',
        icon: 'g',
        color: '#eab308',
        labels: {
            en: 'Gluon',
            hi: 'ग्लूऑन',
            ms: 'Gluon',
            fr: 'Gluon',
            es: 'Gluón'
        },
        clues: {
            en: 'I am the "glue" that holds atomic nuclei together. I carry the strong force.',
            hi: 'मैं वह "गोंद" हूं जो परमाणु नाभिक को एक साथ रखता है। मैं मजबूत बल ले जाता हूँ।',
            ms: 'Saya adalah "pelekat" yang mengikat nukleus atom bersama. Saya membawa daya kuat.',
            fr: 'Je suis la "glu" qui maintient les noyaux atomiques ensemble. Je transporte la force forte.',
            es: 'Soy el "pegamento" que mantiene unidos los núcleos atómicos. Transporto la fuerza fuerte.'
        }
    },
]

const JARS: { id: JarType; rules: Record<string, string> }[] = [
    {
        id: 'quark',
        rules: {
            en: 'Rule: Must interact via the Strong Nuclear Force to build matter.',
            hi: 'नियम: पदार्थ बनाने के लिए मजबूत परमाणु बल के माध्यम से बातचीत करनी चाहिए।',
            ms: 'Peraturan: Mesti berinteraksi melalui Daya Nukleus Kuat untuk membina jirim.',
            fr: 'Règle : Doit interagir via la Force Nucléaire Forte pour former la matière.',
            es: 'Regla: Debe interactuar mediante la Fuerza Nuclear Fuerte para construir materia.'
        }
    },
    {
        id: 'lepton',
        rules: {
            en: 'Rule: Does NOT feel the Strong Nuclear Force.',
            hi: 'नियम: मजबूत परमाणु बल महसूस नहीं करता है।',
            ms: 'Peraturan: TIDAK merasakan Daya Nukleus Kuat.',
            fr: 'Règle : Ne ressent PAS la Force Nucléaire Forte.',
            es: 'Regla: NO siente la Fuerza Nuclear Fuerte.'
        }
    },
    {
        id: 'boson',
        rules: {
            en: 'Rule: Does not build matter; acts as a Force Carrier.',
            hi: 'नियम: पदार्थ का निर्माण नहीं करता; बल वाहक के रूप में कार्य करता है।',
            ms: 'Peraturan: Tidak membina jirim; bertindak sebagai Pembawa Daya.',
            fr: 'Règle : Ne forme pas la matière ; agit comme un Porteur de Force.',
            es: 'Regla: No construye materia; actúa como Portador de Fuerza.'
        }
    },
]

export function StandardModelSorter({ lang = 'en' }: { lang?: string }) {
    // --- State ---
    const [sorted, setSorted] = useState<Record<string, string>>({}) // particleId -> jarId
    const [activeJar, setActiveJar] = useState<string | null>(null) // For hover glow
    const [inspectedParticle, setInspectedParticle] = useState<Particle | null>(null)

    const jarRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const containerRef = useRef<HTMLDivElement>(null)
    const { incrementProgress } = useAppStore()

    // --- Randomization (To prevent color-matching and position-memorization) ---
    const [scrambledParticles, setScrambledParticles] = useState<Particle[]>([])

    // Run once on client mount to avoid Hydration mismatches
    React.useEffect(() => {
        const colors = [
            '#ef4444', '#f97316', '#eab308', '#84cc16',
            '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'
        ];

        // Fisher-Yates array shuffle
        const shuffleArray = <T,>(array: T[]): T[] => {
            const shuffled = [...array]
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }
            return shuffled
        }

        const shuffledColors = shuffleArray(colors)

        const randomized = shuffleArray(PARTICLES).map((p, index) => ({
            ...p,
            // Detach logical color from actual type, assigning a random fun color instead
            color: shuffledColors[index % shuffledColors.length]
        }))

        setScrambledParticles(randomized)
    }, [])

    // Localization Helpers
    const t = {
        title: lang === 'hi' ? 'विघटन पहेली' : lang === 'ms' ? 'Teka-teki Deduksi' : lang === 'fr' ? 'Énigme de Déduction' : lang === 'es' ? 'Rompecabezas de Deducción' : 'Deduction Puzzle',
        desc: lang === 'hi' ? 'सुराग प्रकट करने के लिए एक कण पर टैप करें। फिर इसे सही नियम से मिलाएं।' : lang === 'ms' ? 'Ketik zarah untuk mendedahkan petunjuk. Ketik dan seret untuk memadankannya dengan peraturan yang betul.' : lang === 'fr' ? "Touchez une particule pour révéler son indice. Glissez-la pour l'associer à la bonne règle." : lang === 'es' ? 'Toca una partícula para revelar su pista. Arrástrala para hacerla coincidir con la regla correcta.' : 'Tap a particle to reveal its clue. Tap and drag it to match the correct rule.',
        success: lang === 'hi' ? 'बहुत बढ़िया! आपने सभी कणों का सही ढंग से अनुमान लगाया।' : lang === 'ms' ? 'Cemerlang! Anda berjaya mendeduksi semua jenis zarah.' : lang === 'fr' ? 'Excellent ! Vous avez déduit avec succès tous les types de particules.' : lang === 'es' ? '¡Excelente! Has deducido con éxito todos los tipos de partículas.' : 'Excellent! You successfully deduced all particle types.',
        scanPrompt: lang === 'hi' ? 'सुराग (Clue) के लिए किसी कण पर टैप करें...' : lang === 'ms' ? 'Ketik zarah untuk petunjuk...' : lang === 'fr' ? 'Touchez une particule pour un indice...' : lang === 'es' ? 'Toca una partícula para ver una pista...' : 'Tap a particle for a clue...',
        scanLabel: lang === 'hi' ? 'स्कैन:' : lang === 'ms' ? 'IMBAS:' : lang === 'fr' ? 'SCAN :' : lang === 'es' ? 'ESCANEO:' : 'SCAN:',
        jars: {
            quark: lang === 'hi' ? 'क्वार्क' : lang === 'ms' ? 'Kuark' : lang === 'fr' ? 'Quarks' : lang === 'es' ? 'Quarks' : 'Quarks',
            lepton: lang === 'hi' ? 'लेप्टॉन' : lang === 'ms' ? 'Lepton' : lang === 'fr' ? 'Leptons' : lang === 'es' ? 'Leptones' : 'Leptons',
            boson: lang === 'hi' ? 'बोसॉन' : lang === 'ms' ? 'Boson' : lang === 'fr' ? 'Bosons' : lang === 'es' ? 'Bosones' : 'Bosons'
        }
    }

    // --- Logic ---
    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
        // info.point can be unreliable in nested framer motions or scrolled views.
        // It's safer to use the actual event clientX/clientY for drop detection.
        const clientX = 'clientX' in event ? event.clientX : event.touches?.[0]?.clientX
        const clientY = 'clientY' in event ? event.clientY : event.touches?.[0]?.clientY

        if (clientX === undefined || clientY === undefined) return

        let hoveringJarId: string | null = null

        Object.entries(jarRefs.current).forEach(([jarId, ref]) => {
            if (!ref) return
            const rect = ref.getBoundingClientRect()

            // Add a generous hit area padding
            const padding = 20

            if (
                clientX >= (rect.left - padding) &&
                clientX <= (rect.right + padding) &&
                clientY >= (rect.top - padding) &&
                clientY <= (rect.bottom + padding)
            ) {
                hoveringJarId = jarId
            }
        })

        if (hoveringJarId !== activeJar) {
            setActiveJar(hoveringJarId)
        }
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, particle: Particle) => {
        const clientX = 'clientX' in event ? event.clientX : event.touches?.[0]?.clientX
        const clientY = 'clientY' in event ? event.clientY : event.touches?.[0]?.clientY

        let finalJarId: string | null = null

        if (clientX !== undefined && clientY !== undefined) {
            Object.entries(jarRefs.current).forEach(([jarId, ref]) => {
                if (!ref) return
                const rect = ref.getBoundingClientRect()
                const padding = 20
                if (
                    clientX >= (rect.left - padding) &&
                    clientX <= (rect.right + padding) &&
                    clientY >= (rect.top - padding) &&
                    clientY <= (rect.bottom + padding)
                ) {
                    finalJarId = jarId
                }
            })
        }

        // Evaluate final drop unconditionally from React hover state to prevent race conditions
        if (finalJarId === particle.type) {
            // Correct - Snap it into place!
            setSorted(prev => ({ ...prev, [particle.id]: finalJarId as string }))
            incrementProgress('standard-model-sorter', 'no-math')

            if (inspectedParticle?.id === particle.id) {
                setInspectedParticle(null); // clear scanner on success
            }
        }

        // Reset the magnet glow regardless of success/failure
        setActiveJar(null)
    }

    return (
        <div className="glass-panel rounded-[2em] p-[2em] my-[3em] relative overflow-hidden ring-1 ring-white/10" ref={containerRef}>
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-900 to-space-950 rounded-[2em] -z-10" />

            <div className="text-center mb-[2em]">
                <h3 className="text-[2em] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-violet mb-[0.2em] drop-shadow-sm">{t.title}</h3>
                <p className="text-slate-400 text-[1.1em]">{t.desc}</p>
            </div>

            {/* Vertical Flow: Target Jars -> Clue Panel -> Particle Tray */}
            <div className="flex flex-col gap-[2em] items-stretch justify-between">

                {/* 1. Target Drop Zones (Jars) */}
                <div className="flex flex-col sm:flex-row gap-[1.5em] w-full justify-center">
                    {JARS.map((jar) => {
                        const isHovered = activeJar === jar.id
                        const sortedCount = Object.values(sorted).filter(id => id === jar.id).length
                        const isFull = sortedCount === PARTICLES.filter(p => p.type === jar.id).length

                        const slotBorder = isFull ? 'border-neon-cyan/80 border-solid' : isHovered ? 'border-neon-blue/80 border-dashed scale-[1.02]' : 'border-white/20 border-dashed'
                        const slotBg = isFull ? 'bg-neon-cyan/5' : isHovered ? 'bg-neon-blue/10' : 'bg-[#050810]/80'
                        const slotShadow = isFull ? 'shadow-[inset_0_0_3em_rgba(6,182,212,0.15)]' : isHovered ? 'shadow-[0_0_2em_rgba(59,130,246,0.2)]' : 'shadow-inner'

                        return (
                            <div
                                key={jar.id}
                                ref={el => { jarRefs.current[jar.id] = el }}
                                className={`flex-1 min-h-[14em] rounded-[1.5em] border-[0.2em] transition-all duration-300 ease-out relative flex flex-col items-center justify-start p-[1.5em] overflow-hidden ${slotBorder} ${slotBg} ${slotShadow}`}
                            >
                                <h4 className={`font-display font-bold tracking-wide text-[1.2em] z-10 transition-colors duration-300 ${isHovered || isFull ? 'text-white' : 'text-slate-400'}`}>
                                    {t.jars[jar.id as keyof typeof t.jars]}
                                </h4>
                                <div className="opacity-80 text-[0.85em] text-center mb-[1em] z-10 min-h-[3em] leading-relaxed text-slate-300 font-medium tracking-wide">
                                    {jar.rules[lang] || jar.rules['en']}
                                </div>

                                {/* Deposited Particles container */}
                                <div className="flex flex-wrap gap-[0.8em] justify-center z-10 mt-auto w-full px-[1em]">
                                    {/* We Map over the SCRAMBLED array so their specific colors are preserved in the sorted jar! */}
                                    {scrambledParticles.filter(p => sorted[p.id] === jar.id).map(p => (
                                        <motion.div
                                            key={`sorted-${p.id}`}
                                            initial={{ scale: 0, opacity: 0, y: -20 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            className="w-[3em] h-[3em] rounded-full flex flex-col items-center justify-center border-[0.15em] shrink-0 group relative cursor-help"
                                            style={{ backgroundColor: `${p.color}15`, border: `0.15em solid ${p.color}80`, boxShadow: `0 0 1em ${p.color}30` }}
                                        >
                                            <span className="text-[1.2em] font-bold text-white drop-shadow-md">{p.icon}</span>
                                            {/* Reveal label only on hover after being sorted */}
                                            <span className="absolute -bottom-8 bg-black/80 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                {p.labels[lang] || p.labels['en']}
                                            </span>
                                        </motion.div>
                                    ))}

                                    {Array.from({ length: Math.max(0, PARTICLES.filter(p => p.type === jar.id).length - sortedCount) }).map((_, i) => (
                                        <div key={`ghost-${jar.id}-${i}`} className="w-[3em] h-[3em] rounded-full border-[0.1em] border-dashed border-white/10 shrink-0 flex items-center justify-center">
                                            <div className="w-[1em] h-[1em] rounded-full bg-white/5" />
                                        </div>
                                    ))}
                                </div>

                                {isFull && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-neon-cyan/20 blur-2xl rounded-[1.5em] pointer-events-none"
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Clue Panel / Scanner Overlay */}
                <div className="w-full flex justify-center z-20 transition-all">
                    <div className="bg-[#0f172a] border border-neon-violet/40 min-h-[4em] w-full max-w-2xl rounded-2xl flex items-center justify-center p-4 shadow-[0_0_20px_rgba(139,92,246,0.1)] text-center">
                        <AnimatePresence mode="wait">
                            {inspectedParticle ? (
                                <motion.div
                                    key={inspectedParticle.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${inspectedParticle.color}30`, color: inspectedParticle.color, border: `1px solid ${inspectedParticle.color}` }}>
                                        {inspectedParticle.icon}
                                    </div>
                                    <p className="text-[1.05em] font-bold tracking-wide" style={{ color: inspectedParticle.color }}>
                                        <span className="text-slate-400 mr-2 uppercase text-xs">{t.scanLabel}</span>
                                        &quot;{inspectedParticle.clues[lang] || inspectedParticle.clues['en']}&quot;
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-slate-500 font-medium tracking-wide flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {t.scanPrompt}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. Unsorted Particles Tray */}
                <div className="relative w-full z-10">
                    <div className="absolute -inset-x-[1em] -bottom-[1em] top-[2em] bg-white/[0.02] border-t border-white/5 rounded-t-[2.5em] -z-10" />

                    <div className="flex flex-wrap justify-center gap-[1.5em] min-h-[10em] pt-[1em]">
                        {/* Map over SCRAMBLED particles instead of static array */}
                        {scrambledParticles.map((p) => {
                            if (sorted[p.id]) return null // Hide if successfully dropped

                            const isSelected = inspectedParticle?.id === p.id;

                            return (
                                <motion.div
                                    key={`dock-${p.id}`}
                                    drag
                                    dragConstraints={containerRef}
                                    dragElastic={0.15}
                                    dragSnapToOrigin={true}
                                    onDragStart={() => {
                                        setActiveJar(null)
                                        setInspectedParticle(p)
                                    }}
                                    onPointerDown={() => {
                                        setInspectedParticle(p)
                                    }}
                                    onDrag={handleDrag}
                                    onDragEnd={(e) => handleDragEnd(e, p)}
                                    whileHover={{ scale: 1.15, cursor: "grab" }}
                                    whileDrag={{ scale: 1.25, zIndex: 50, cursor: "grabbing", filter: `drop-shadow(0 20px 25px ${p.color}40)` }}
                                    className="flex flex-col items-center gap-[0.7em] relative z-10"
                                >
                                    <div
                                        className={`w-[5em] h-[5em] rounded-full flex flex-col items-center justify-center backdrop-blur-xl transition-all duration-300 ${isSelected ? 'ring-[0.3em] ring-offset-2 ring-offset-space-900 scale-110' : ''}`}
                                        style={{
                                            background: `linear-gradient(135deg, ${p.color}30 0%, ${p.color}10 100%)`,
                                            border: `0.15em solid ${p.color}`,
                                            boxShadow: `inset 0 0 1em ${p.color}50, 0 0.5em 1em rgba(0,0,0,0.5)`,
                                            // Apply ring color directly if selected
                                            '--tw-ring-color': p.color
                                        } as React.CSSProperties}
                                    >
                                        <span className="text-[1.8em] font-bold font-sans text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{p.icon}</span>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent w-full h-full pointer-events-none" />
                                    </div>
                                    {/* Removed explicitly giving away the label text here! Force the user to use clues! */}
                                </motion.div>
                            )
                        })}

                        {Object.keys(sorted).length === PARTICLES.length && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full flex justify-center items-center h-full pt-[1em]"
                            >
                                <div className="bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-[2em] py-[1em] rounded-full font-bold tracking-widest uppercase text-[1.1em] shadow-[0_0_2em_rgba(6,182,212,0.2)]">
                                    {t.success}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
