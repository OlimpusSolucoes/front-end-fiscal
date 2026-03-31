import { useState } from 'react'

const dailyData = [8, 12, 5, 18, 22, 9, 14, 7, 20, 16, 11, 25, 19, 13, 8, 21, 17, 10, 24, 15, 6, 18, 22, 11, 28, 16, 9, 20, 12, 24, 18]
const maxD = Math.max(...dailyData)

export default function Fechamento() {
  const [periodo, setPeriodo] = useState('03/2026')
  const [fechado, setFechado] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Gestão</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Fechamento Mensal</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
            className="px-4 py-2 bg-surface-container-lowest rounded-xl text-[13px] font-medium text-on-surface border-0 shadow-card focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="03/2026">Março 2026</option>
            <option value="02/2026">Fevereiro 2026</option>
            <option value="01/2026">Janeiro 2026</option>
            <option value="12/2025">Dezembro 2025</option>
          </select>
          {!fechado ? (
            <button
              onClick={() => setFechado(true)}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-xl text-[13px] font-semibold hover:bg-primary-dim transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
              Fechar Mês
            </button>
          ) : (
            <button
              onClick={() => setFechado(false)}
              className="flex items-center gap-2 px-5 py-2 bg-error-container text-error rounded-xl text-[13px] font-semibold hover:bg-error-container/70 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock_open</span>
              Desbloquear (Admin)
            </button>
          )}
        </div>
      </div>

      {/* Status + Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status Card — 2/3 */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${
                  fechado ? 'bg-primary-container text-primary' : 'bg-warning-container text-warning'
                }`}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: 14 }}>{fechado ? 'lock' : 'lock_open'}</span>
                  {fechado ? 'Fechado' : 'Aberto'}
                </span>
              </div>
              <h2 className="text-[17px] font-bold text-on-surface">{periodo}</h2>
              <p className="text-[12.5px] text-on-surface-variant">Competência de referência</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-bold text-on-surface tracking-tight">84%</p>
              <p className="text-[12px] text-on-surface-variant">Concluído</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-surface-container-high rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: fechado ? '100%' : '84%' }} />
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Faturado', value: 'R$ 72.350,00', icon: 'payments', iconBg: 'bg-primary-container', iconColor: '#006d47' },
              { label: 'Impostos Estimados', value: 'R$ 3.979,25', icon: 'account_balance', iconBg: 'bg-secondary-container', iconColor: '#4e6456' },
              { label: 'Pendências', value: fechado ? '0' : '4', icon: 'pending_actions', iconBg: fechado ? 'bg-primary-container' : 'bg-warning-container', iconColor: fechado ? '#006d47' : '#b45309' },
            ].map(m => (
              <div key={m.label} className="bg-surface-container-low rounded-xl p-4">
                <div className={`w-8 h-8 rounded-lg ${m.iconBg} flex items-center justify-center mb-2.5`}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: 17, color: m.iconColor }}>{m.icon}</span>
                </div>
                <p className="text-[10.5px] text-on-surface-variant font-medium mb-0.5">{m.label}</p>
                <p className="text-[15px] font-bold text-on-surface tracking-tight">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div>
            <p className="text-[11.5px] font-semibold text-on-surface-variant mb-3">Emissões diárias — {periodo}</p>
            <div className="overflow-x-auto -mx-1 px-1">
              <div className="flex items-end gap-0.5 h-20 min-w-[280px]">
                {dailyData.map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${i >= 28 && !fechado ? 'bg-outline-variant/30' : 'bg-secondary-container'}`}
                    style={{ height: `${Math.round((v / maxD) * 100)}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-on-surface-variant">1</span>
              <span className="text-[10px] text-on-surface-variant">31</span>
            </div>
          </div>
        </div>

        {/* Attention Panel — 1/3 */}
        <div className="space-y-4">
          {!fechado && (
            <div className="bg-error-container rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined filled text-error" style={{ fontSize: 18 }}>warning</span>
                <p className="text-[13px] font-semibold text-error">Atenção Necessária</p>
              </div>
              <ul className="space-y-2">
                {[
                  '4 notas ainda pendentes de transmissão',
                  '2 retransmissões necessárias (rejeitadas)',
                  'Verificar competência das NFS-e 046 e 048',
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined filled text-error flex-shrink-0" style={{ fontSize: 13, marginTop: 1 }}>error</span>
                    <span className="text-[12px] text-error leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          <div className="card p-5">
            <p className="text-[13px] font-semibold text-on-surface mb-4">Etapas do Fechamento</p>
            <div className="space-y-0">
              {[
                { label: 'Importação finalizada', done: true },
                { label: 'Notas transmitidas', done: true },
                { label: 'Retornos processados', done: true },
                { label: 'Pendências resolvidas', done: fechado },
                { label: 'Exportação legal gerada', done: fechado },
                { label: 'Mês fechado', done: fechado },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? 'bg-primary' : 'bg-surface-container-high'}`}>
                      {step.done
                        ? <span className="material-symbols-outlined filled text-on-primary" style={{ fontSize: 12 }}>check</span>
                        : <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                      }
                    </div>
                    {i < arr.length - 1 && <div className="w-0.5 h-5 bg-outline-variant/30 my-0.5" />}
                  </div>
                  <p className={`text-[12.5px] pb-3 ${step.done ? 'font-medium text-on-surface' : 'text-on-surface-variant'}`}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Export */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[15px] font-semibold text-on-surface">Exportação Legal do Mês</h2>
            <p className="text-[12.5px] text-on-surface-variant">Pacote completo para envio à contabilidade</p>
          </div>
          <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors ${
            fechado
              ? 'bg-primary text-on-primary hover:bg-primary-dim'
              : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
          }`} disabled={!fechado}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            Baixar Pacote Completo
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: 'code', label: 'Arquivos XML', desc: '28 arquivos · ~4.2 MB', color: 'bg-tertiary-container', iconColor: '#2d686b', available: fechado },
            { icon: 'picture_as_pdf', label: 'Arquivos PDF', desc: '28 arquivos · ~18.5 MB', color: 'bg-error-container', iconColor: '#a83836', available: fechado },
            { icon: 'table_chart', label: 'Planilha Excel', desc: 'Relação totalizada · ~320 KB', color: 'bg-secondary-container', iconColor: '#4e6456', available: fechado },
          ].map(d => (
            <div key={d.label} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${fechado ? 'bg-surface-container-low hover:bg-surface-container cursor-pointer' : 'bg-surface-container-low/50 opacity-60'}`}>
              <div className={`w-10 h-10 rounded-xl ${d.color} flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: d.iconColor }}>{d.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-on-surface">{d.label}</p>
                <p className="text-[11.5px] text-on-surface-variant">{d.desc}</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>
                {fechado ? 'download' : 'lock'}
              </span>
            </div>
          ))}
        </div>
        {!fechado && (
          <p className="mt-4 text-[12px] text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>info</span>
            Realize o fechamento do mês para liberar a exportação.
          </p>
        )}
      </div>

      {/* Support */}
      <div className="card p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[15px] font-semibold text-on-surface mb-1">Dúvidas com o fechamento?</p>
          <p className="text-[12.5px] text-on-surface-variant">Nossa equipe pode ajudar com o processo de fechamento mensal e exportação legal.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-secondary-container text-secondary rounded-xl text-[13px] font-semibold hover:bg-secondary-container/70 transition-colors flex-shrink-0">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>support_agent</span>
          Falar com Consultor
        </button>
      </div>
    </div>
  )
}
