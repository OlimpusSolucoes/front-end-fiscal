export type NoteStatus = 'autorizada' | 'rejeitada' | 'pendente' | 'cancelada' | 'processando'

const config: Record<NoteStatus, { label: string; icon: string; bg: string; text: string }> = {
  autorizada: { label: 'Autorizada', icon: 'check_circle', bg: 'bg-primary-container', text: 'text-primary' },
  rejeitada: { label: 'Rejeitada', icon: 'cancel', bg: 'bg-error-container', text: 'text-error' },
  pendente: { label: 'Pendente', icon: 'pending', bg: 'bg-warning-container', text: 'text-warning' },
  cancelada: { label: 'Cancelada', icon: 'block', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' },
  processando: { label: 'Processando', icon: 'sync', bg: 'bg-tertiary-container', text: 'text-tertiary' },
}

interface StatusBadgeProps {
  status: NoteStatus
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { label, icon, bg, text } = config[status]
  const iconSize = size === 'sm' ? 14 : 15

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold ${bg} ${text}`}>
      <span className="material-symbols-outlined filled" style={{ fontSize: iconSize }}>{icon}</span>
      {label}
    </span>
  )
}
