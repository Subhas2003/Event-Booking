export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'bg-surface3/60 text-text-secondary border border-white/10',
    hot: 'bg-secondary/20 text-secondary-bright border border-secondary/40',
    'selling-fast': 'bg-tertiary/20 text-tertiary-bright border border-tertiary/40',
    limited: 'bg-primary/20 text-primary border border-primary/40',
    family: 'bg-tertiary/15 text-tertiary-bright border border-tertiary/30',
    fast: 'bg-secondary/20 text-secondary-bright border border-secondary/40',
    beverage: 'bg-primary/15 text-primary border border-primary/30',
    discount: 'bg-secondary/20 text-secondary-bright border border-secondary/40',
    free: 'bg-tertiary/15 text-tertiary-bright border border-tertiary/30',
    live: 'bg-tertiary/20 text-tertiary-bright border border-tertiary/40',
    vip: 'text-white',
  }
  const vipStyle =
    tone === 'vip'
      ? { background: 'linear-gradient(135deg, #EC4899, #D946EF)' }
      : undefined
  return (
    <span
      style={vipStyle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-display font-bold uppercase tracking-wider ${tones[tone] || tones.default} ${className}`}
    >
      {children}
    </span>
  )
}
