import { useNavigate } from 'react-router-dom'
import MetricCard from '../components/ui/MetricCard'
import StatusBadge from '../components/ui/StatusBadge'
import { notas, monthlyData } from '../data/mockData'

const maxVal = Math.max(...monthlyData.map(d => d.valor))

export default function Dashboard() {
  const navigate = useNavigate()

  const autorizadas = notas.filter(n => n.status === 'autorizada').length
  const rejeitadas = notas.filter(n => n.status === 'rejeitada').length
  const pendentes = notas.filter(n => n.status === 'pendente').length
  const totalValor = notas.filter(n => n.status === 'autorizada').reduce((s, n) => s + n.valor, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Março 2026</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-xl text-[13px] font-medium text-on-surface-variant hover:bg-surface-container transition-colors border border-outline-variant/40">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_month</span>
            Jan – Mar 2026
          </button>
        </div>
      </div>

      {/* Bento Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: 'upload_file', label: 'Importar Planilha', sub: 'Excel / XLSM', path: '/importacao', bg: 'bg-primary', text: 'text-on-primary', iconColor: '#ffffff' },
          { icon: 'add_circle', label: 'Emissão Avulsa', sub: 'Nota individual', path: '/emissao-avulsa', bg: 'bg-surface-container-lowest', text: 'text-on-surface', iconColor: '#006d47', bordered: true },
          { icon: 'lock_clock', label: 'Fechamento Mensal', sub: 'Exportar / Fechar', path: '/fechamento', bg: 'bg-surface-container-lowest', text: 'text-on-surface', iconColor: '#2d686b', bordered: true },
        ].map((a) => (
          <button
            key={a.path}
            onClick={() => navigate(a.path)}
            className={`${a.bg} ${a.text} rounded-2xl p-4 text-left hover:opacity-90 active:scale-[0.98] transition-all flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 ${'bordered' in a && a.bordered ? 'border border-outline-variant/40' : ''}`}
          >
            <span className="material-symbols-outlined sm:mb-3" style={{ fontSize: 22, color: a.iconColor, flexShrink: 0 }}>{a.icon}</span>
            <div>
              <p className="text-[13.5px] font-semibold leading-tight">{a.label}</p>
              <p className="text-[11.5px] opacity-70 mt-0.5">{a.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon="check_circle" label="NFs Autorizadas" value={String(autorizadas)} trend="+12%" trendUp iconBg="bg-primary-container" iconColor="#006d47" />
        <MetricCard icon="payments" label="Valor Total" value={`R$ ${totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} iconBg="bg-secondary-container" iconColor="#4e6456" />
        <MetricCard icon="pending" label="Pendentes" value={String(pendentes)} iconBg="bg-warning-container" iconColor="#b45309" />
        <MetricCard icon="cancel" label="Rejeitadas" value={String(rejeitadas)} iconBg="bg-error-container" iconColor="#a83836" />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[14px] font-semibold text-on-surface">Volume Mensal</h2>
              <p className="text-[12px] text-on-surface-variant">Últimos 6 meses</p>
            </div>
            <span className="text-[11px] font-semibold text-primary bg-primary-container px-2.5 py-1 rounded-full">R$ 316k total</span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d) => {
              const height = Math.round((d.valor / maxVal) * 100)
              const isLast = d.mes === 'Mar'
              return (
                <div key={d.mes} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-on-surface-variant">{d.qtd}</span>
                  <div className="w-full flex flex-col justify-end" style={{ height: 120 }}>
                    <div
                      className={`w-full rounded-t-lg transition-all ${isLast ? 'bg-primary' : 'bg-secondary-container'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{d.mes}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent notes */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-on-surface">Recentes</h2>
            <button onClick={() => navigate('/notas')} className="text-[12px] font-medium text-primary hover:text-primary-dim">
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {notas.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium text-on-surface truncate">{n.cliente}</p>
                  <p className="text-[11px] text-on-surface-variant">{n.tipo} · {n.dataEmissao}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12.5px] font-semibold text-on-surface">
                    {n.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <StatusBadge status={n.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fiscal Timeline */}
      <div className="card p-6">
        <h2 className="text-[14px] font-semibold text-on-surface mb-5">Obrigações Fiscais — T1 2026</h2>
        <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-center gap-0 min-w-[480px]">
          {[
            { label: 'Entrega DCTF', date: '15/01', done: true },
            { label: 'Venc. ISS Jan', date: '20/01', done: true },
            { label: 'Fechamento Jan', date: '31/01', done: true },
            { label: 'Venc. ISS Fev', date: '20/02', done: true },
            { label: 'Fechamento Fev', date: '28/02', done: true },
            { label: 'Venc. ISS Mar', date: '20/03', done: false },
            { label: 'Fechamento Mar', date: '31/03', done: false },
          ].map((item, i, arr) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-primary' : 'bg-surface-container-high'}`}>
                  {item.done
                    ? <span className="material-symbols-outlined filled text-on-primary" style={{ fontSize: 13 }}>check</span>
                    : <div className="w-2 h-2 rounded-full bg-outline-variant" />
                  }
                </div>
                <p className="text-[9.5px] font-semibold text-on-surface mt-1.5 text-center leading-tight whitespace-nowrap">{item.label}</p>
                <p className="text-[9px] text-on-surface-variant">{item.date}</p>
              </div>
              {i < arr.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 ${item.done ? 'bg-primary' : 'bg-outline-variant/40'}`} />
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
