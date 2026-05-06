import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: 1,
    category: "Лендинг",
    title: "Архитектурное бюро Forma",
    description: "Лаконичный сайт для архитектурного бюро с акцентом на визуальный storytelling и портфолио проектов.",
    tags: ["UX/UI", "Лендинг", "Брендинг"],
    accent: "bg-sage/20",
    number: "01",
  },
  {
    id: 2,
    category: "Интернет-магазин",
    title: "Baren — магазин керамики",
    description: "Премиальный онлайн-магазин авторской керамики. Минималистичный дизайн подчёркивает ценность каждого изделия.",
    tags: ["E-commerce", "UX/UI", "Дизайн-система"],
    accent: "bg-terracotta/15",
    number: "02",
  },
  {
    id: 3,
    category: "Корпоративный сайт",
    title: "Meridian Legal Group",
    description: "Строгий и доверительный сайт для юридической компании. Конверсия выросла на 40% за первые 3 месяца.",
    tags: ["Корпоративный", "UX Research", "Редизайн"],
    accent: "bg-stone/20",
    number: "03",
  },
  {
    id: 4,
    category: "Продуктовый дизайн",
    title: "Sora — приложение для медитаций",
    description: "Дизайн мобильного приложения в стиле japonesque. Спокойные анимации и интуитивный онбординг.",
    tags: ["Mobile UI", "Дизайн-система", "Анимации"],
    accent: "bg-sand/60",
    number: "04",
  },
]

export function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("Все")
  const sectionRef = useRef<HTMLElement>(null)

  const filters = ["Все", "Лендинг", "E-commerce", "Корпоративный", "Mobile UI"]

  const filtered = activeFilter === "Все"
    ? projects
    : projects.filter((p) => p.tags.some((t) => t === activeFilter || p.category === activeFilter))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <p
              className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Наши работы
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Портфолио
            </h2>
          </div>

          {/* Filters */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === filter
                    ? "border-sage bg-sage text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 120}ms` }}
            >
              {/* Placeholder visual */}
              <div className={`relative h-64 ${project.accent} flex items-center justify-center overflow-hidden`}>
                <span className="font-serif text-8xl text-foreground/10 group-hover:text-foreground/20 transition-all duration-700 group-hover:scale-110">
                  {project.number}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <p className="text-xs tracking-[0.25em] uppercase text-terracotta mb-3">{project.category}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-sage transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs tracking-wider uppercase text-muted-foreground border border-border px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-sm mb-6">Хотите увидеть больше работ?</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-sm tracking-widest uppercase text-foreground hover:border-sage hover:text-sage transition-all duration-500"
          >
            Запросить полное портфолио
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
