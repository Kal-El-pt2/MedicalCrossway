type Country = {
  code: string
  name: string
  flag: string
  description: string
  available: boolean
}

export default function CountryCard({ country }: { country: Country }) {
  console.log(country)
  return (
    <div
      className={`
        group relative rounded-2xl p-5 transition-all duration-300
        border border-white/10
        bg-[rgba(255,255,255,0.04)]
        backdrop-blur-xl

        hover:-translate-y-1
        hover:bg-[rgba(255,255,255,0.06)]
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        hover:border-[rgba(108,99,255,0.6)]

        ${!country.available ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xl">{country.flag}</span>
        <span className="text-xs text-gray-400 font-semibold uppercase">
          {country.code}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-1">
        {country.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
        {country.description}
      </p>

      {/* CTA */}
      {country.available ? (
        <span className="text-sm text-[var(--accent-primary)] group-hover:underline">
          Start journey →
        </span>
      ) : (
        <span className="text-xs text-[var(--text-tertiary)]">
          Coming soon
        </span>
      )}
    </div>
  )
}