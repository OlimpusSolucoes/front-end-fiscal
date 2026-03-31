interface MetricCardProps {
  icon: string
  label: string
  value: string
  trend?: string
  trendUp?: boolean
  iconBg?: string
  iconColor?: string
}

export default function MetricCard({
  icon, label, value, trend, trendUp,
  iconBg = 'bg-primary-container',
  iconColor = '#006d47',
}: MetricCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <span className="material-symbols-outlined filled" style={{ fontSize: 20, color: iconColor }}>
            {icon}
          </span>
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            trendUp ? 'bg-primary-container text-primary' : 'bg-error-container text-error'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[12px] font-medium text-on-surface-variant mb-0.5">{label}</p>
      <p className="text-[22px] font-bold text-on-surface tracking-tight leading-tight">{value}</p>
    </div>
  )
}
