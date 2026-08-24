import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 95, suffix: '%', label: 'Avg. client retention lift' },
  { value: 20, suffix: 'M+', label: 'Views generated for clients' },
  { value: 40, suffix: '+', label: 'Creators managed' },
  { value: 3.2, suffix: 'x', label: 'Avg. CTR improvement' },
]

function Counter({ value, suffix, isDecimal }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {isDecimal ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="results" className="relative py-24 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block text-xs font-semibold uppercase tracking-widest text-volt text-center mb-14"
        >
          The numbers behind the algorithm
        </motion.span>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-4xl md:text-6xl text-gradient">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={!Number.isInteger(stat.value)}
                />
              </div>
              <p className="mt-3 text-xs md:text-sm text-ink-muted uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
