function GlassCard({ children, className }) {
  return (
    <div className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}
