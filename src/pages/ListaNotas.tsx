import { useState } from 'react'
import StatusBadge, { type NoteStatus } from '../components/ui/StatusBadge'
import SlideOver from '../components/ui/SlideOver'
import { notas, type Nota } from '../data/mockData'

type FilterTab = 'todas' | NoteStatus

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'autorizada', label: 'Autorizadas' },
  { key: 'rejeitada', label: 'Rejeitadas' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'cancelada', label: 'Canceladas' },
]

export default function ListaNotas() {
  const [filter, setFilter] = useState<FilterTab>('todas')
  const [selected, setSelected] = useState<string[]>([])
  const [slideOver, setSlideOver] = useState<Nota | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState('resumo')

  const filtered = filter === 'todas' ? notas : notas.filter(n => n.status === filter)
  const allSelected = filtered.length > 0 && filtered.every(n => selected.includes(n.id))

  function toggleAll() {
    if (allSelected) setSelected([])
    else setSelected(filtered.map(n => n.id))
  }

  function toggleOne(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  }

  const totalValor = filtered.reduce((s, n) => s + n.valor, 0)
  const avgValor = filtered.length ? totalValor / filtered.length : 0

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Gestão</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Lista de Notas</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-xl text-[13px] font-medium text-on-surface-variant hover:bg-surface-container transition-colors border border-outline-variant/40">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-xl text-[13px] font-semibold text-on-primary hover:bg-primary-dim transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
            Emitir Selecionadas
          </button>
        </div>
      </div>

      {/* Sticky Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Notas', value: filtered.length, icon: 'receipt_long', iconColor: '#006d47', iconBg: 'bg-primary-container' },
          { label: 'Valor Total', value: `R$ ${totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: 'payments', iconColor: '#4e6456', iconBg: 'bg-secondary-container' },
          { label: 'Selecionadas', value: selected.length, icon: 'check_box', iconColor: '#2d686b', iconBg: 'bg-tertiary-container' },
          { label: 'Ticket Médio', value: `R$ ${avgValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: 'trending_up', iconColor: '#b45309', iconBg: 'bg-warning-container' },
        ].map((m) => (
          <div key={m.label} className="card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${m.iconBg} flex items-center justify-center flex-shrink-0`}>
              <span className="material-symbols-outlined filled" style={{ fontSize: 18, color: m.iconColor }}>{m.icon}</span>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant font-medium">{m.label}</p>
              <p className="text-[15px] font-bold text-on-surface tracking-tight">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="overflow-x-auto -mx-1 px-1 mb-4">
      <div className="flex items-center gap-1 bg-surface-container-low rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all ${
              filter === t.key
                ? 'bg-surface-container-lowest text-on-surface border border-outline-variant/30'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">

        {/* Mobile: card list */}
        <div className="divide-y divide-outline-variant/10 sm:hidden">
          {filtered.map((nota) => (
            <div
              key={nota.id}
              className={`flex items-center gap-3 px-4 py-3 ${selected.includes(nota.id) ? 'bg-primary-container/10' : ''}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(nota.id)}
                onChange={() => toggleOne(nota.id)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer flex-shrink-0"
              />
              <div className="flex-1 min-w-0" onClick={() => { setSlideOver(nota) }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                    nota.tipo === 'NFS-e' ? 'bg-tertiary-container text-tertiary' : 'bg-secondary-container text-secondary'
                  }`}>
                    {nota.tipo}
                  </span>
                  <span className="text-[13px] font-semibold text-on-surface">{nota.numero}</span>
                  <span className="text-[11px] text-on-surface-variant">{nota.rps}</span>
                </div>
                <p className="text-[12.5px] text-on-surface truncate">{nota.cliente}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-on-surface-variant">{nota.dataEmissao}</span>
                  <span className="text-[11px] text-on-surface-variant">·</span>
                  <span className="text-[12px] font-semibold text-on-surface">
                    {nota.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <StatusBadge status={nota.status} size="sm" />
                <button
                  onClick={() => setActiveMenu(activeMenu === nota.id ? null : nota.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                </button>
                {activeMenu === nota.id && (
                  <div className="absolute right-4 bg-surface-container-lowest rounded-xl shadow-ambient z-10 py-1 min-w-[180px]">
                    <button
                      onClick={() => { setSlideOver(nota); setActiveMenu(null) }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>visibility</span>
                      Visualizar detalhes
                    </button>
                    {nota.status === 'autorizada' && (
                      <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>picture_as_pdf</span>
                        Baixar PDF
                      </button>
                    )}
                    {nota.status === 'rejeitada' && (
                      <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>edit</span>
                        Editar e Retransmitir
                      </button>
                    )}
                    {(nota.status === 'pendente' || nota.status === 'rejeitada') && (
                      <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>send</span>
                        Retransmitir
                      </button>
                    )}
                    {nota.status === 'autorizada' && (
                      <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-error hover:bg-error-container/30">
                        <span className="material-symbols-outlined text-error" style={{ fontSize: 16 }}>cancel</span>
                        Solicitar Cancelamento
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                  />
                </th>
                {['Tipo', 'Número', 'RPS', 'Emissão', 'Competência', 'Cliente', 'Valor', 'Impostos', 'Status', ''].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((nota) => (
                <tr
                  key={nota.id}
                  className={`border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors group ${
                    selected.includes(nota.id) ? 'bg-primary-container/10' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(nota.id)}
                      onChange={() => toggleOne(nota.id)}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      nota.tipo === 'NFS-e' ? 'bg-tertiary-container text-tertiary' : 'bg-secondary-container text-secondary'
                    }`}>
                      {nota.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[13px] font-medium text-on-surface">{nota.numero}</td>
                  <td className="px-3 py-3 text-[12.5px] text-on-surface-variant">{nota.rps}</td>
                  <td className="px-3 py-3 text-[12.5px] text-on-surface-variant whitespace-nowrap">{nota.dataEmissao}</td>
                  <td className="px-3 py-3 text-[12.5px] text-on-surface-variant">{nota.dataCompetencia}</td>
                  <td className="px-3 py-3 text-[13px] text-on-surface max-w-[150px] truncate">{nota.cliente}</td>
                  <td className="px-3 py-3 text-[13px] font-semibold text-on-surface whitespace-nowrap">
                    {nota.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-3 py-3 text-[12.5px] text-on-surface-variant whitespace-nowrap">
                    {nota.impostos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={nota.status} size="sm" />
                  </td>
                  <td className="px-3 py-3 relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === nota.id ? null : nota.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                    </button>
                    {activeMenu === nota.id && (
                      <div className="absolute right-4 top-10 bg-surface-container-lowest rounded-xl shadow-ambient z-10 py-1 min-w-[180px]">
                        <button
                          onClick={() => { setSlideOver(nota); setActiveMenu(null) }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low"
                        >
                          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>visibility</span>
                          Visualizar detalhes
                        </button>
                        {nota.status === 'autorizada' && (
                          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>picture_as_pdf</span>
                            Baixar PDF
                          </button>
                        )}
                        {nota.status === 'rejeitada' && (
                          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>edit</span>
                            Editar e Retransmitir
                          </button>
                        )}
                        {(nota.status === 'pendente' || nota.status === 'rejeitada') && (
                          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low">
                            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>send</span>
                            Retransmitir
                          </button>
                        )}
                        {nota.status === 'autorizada' && (
                          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] text-error hover:bg-error-container/30">
                            <span className="material-symbols-outlined text-error" style={{ fontSize: 16 }}>cancel</span>
                            Solicitar Cancelamento
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t border-outline-variant/20">
          <p className="text-[12px] text-on-surface-variant">Exibindo {filtered.length} de {notas.length} registros</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40" disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-[12px] font-semibold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low text-[12px]">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over */}
      <SlideOver
        open={!!slideOver}
        onClose={() => setSlideOver(null)}
        title={slideOver ? `Nota ${slideOver.numero}` : ''}
      >
        {slideOver && (
          <div className="flex flex-col h-full">
            {/* Status bar */}
            <div className="px-6 py-3 flex items-center gap-2 bg-surface-container-low">
              <StatusBadge status={slideOver.status} />
              <span className="text-[12px] text-on-surface-variant">{slideOver.tipo} · {slideOver.dataEmissao}</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-0 px-6 border-b border-outline-variant/20">
              {['resumo', 'xml', 'historico', 'retornos'].map(t => (
                <button
                  key={t}
                  onClick={() => setDetailTab(t)}
                  className={`px-4 py-3 text-[12.5px] font-medium capitalize border-b-2 transition-colors ${
                    detailTab === t
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t === 'xml' ? 'Conteúdo XML' : t === 'historico' ? 'Histórico' : t === 'retornos' ? 'Retornos SEFAZ' : 'Resumo'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-5 overflow-y-auto">
              {detailTab === 'resumo' && (
                <div className="space-y-5">
                  {/* Bento grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Destinatário', value: slideOver.cliente, icon: 'person' },
                      { label: 'Data de Emissão', value: slideOver.dataEmissao, icon: 'calendar_today' },
                      { label: 'Competência', value: slideOver.dataCompetencia, icon: 'date_range' },
                      { label: 'Valor Total', value: slideOver.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), icon: 'payments' },
                    ].map(c => (
                      <div key={c.label} className="bg-surface-container-low rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 15 }}>{c.icon}</span>
                          <p className="text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider">{c.label}</p>
                        </div>
                        <p className="text-[13.5px] font-semibold text-on-surface">{c.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Fiscal info */}
                  <div className="bg-surface-container-low rounded-xl p-4 space-y-2.5">
                    <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Informações Fiscais</p>
                    {[
                      { label: 'Número', value: slideOver.numero },
                      { label: 'RPS', value: slideOver.rps },
                      { label: 'Tipo', value: slideOver.tipo },
                      { label: 'Impostos', value: slideOver.impostos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
                      ...(slideOver.protocolo ? [{ label: 'Protocolo', value: slideOver.protocolo }] : []),
                    ].map(f => (
                      <div key={f.label} className="flex items-center justify-between">
                        <span className="text-[12.5px] text-on-surface-variant">{f.label}</span>
                        <span className="text-[12.5px] font-medium text-on-surface">{f.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rejection reason */}
                  {slideOver.motivoRejeicao && (
                    <div className="bg-error-container rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined filled text-error" style={{ fontSize: 16 }}>error</span>
                        <p className="text-[12px] font-semibold text-error">Motivo da Rejeição</p>
                      </div>
                      <p className="text-[12.5px] text-error">{slideOver.motivoRejeicao}</p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Linha do Tempo</p>
                    <div className="space-y-0">
                      {[
                        { label: 'RPS Gerado', date: slideOver.dataEmissao, done: true },
                        { label: 'Transmitido ao SN', date: slideOver.dataEmissao, done: slideOver.status !== 'pendente' },
                        { label: 'Retorno do SN', date: slideOver.dataEmissao, done: slideOver.status === 'autorizada' || slideOver.status === 'rejeitada' },
                        { label: 'E-mail enviado ao cliente', date: slideOver.dataEmissao, done: slideOver.status === 'autorizada' },
                      ].map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? 'bg-primary' : 'bg-surface-container-high'}`}>
                              {step.done
                                ? <span className="material-symbols-outlined filled text-on-primary" style={{ fontSize: 12 }}>check</span>
                                : <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                              }
                            </div>
                            {i < 3 && <div className="w-0.5 h-6 bg-outline-variant/30 my-1" />}
                          </div>
                          <div className="pb-4">
                            <p className={`text-[12.5px] font-medium ${step.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.label}</p>
                            {step.done && <p className="text-[11px] text-on-surface-variant">{step.date}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {detailTab === 'xml' && (
                <div className="bg-surface-container-low rounded-xl p-4 font-mono text-[11.5px] text-on-surface-variant leading-relaxed">
                  <p className="text-primary">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</p>
                  <p className="text-on-surface-variant">&lt;NFSe xmlns="http://www.sped.fazenda.gov.br/NFSe"&gt;</p>
                  <p className="ml-4">&lt;infNFSe Id="{slideOver.numero}"&gt;</p>
                  <p className="ml-8">&lt;numero&gt;{slideOver.numero}&lt;/numero&gt;</p>
                  <p className="ml-8">&lt;competencia&gt;{slideOver.dataCompetencia}&lt;/competencia&gt;</p>
                  <p className="ml-8">&lt;valorServicos&gt;{slideOver.valor}&lt;/valorServicos&gt;</p>
                  <p className="ml-4">&lt;/infNFSe&gt;</p>
                  <p>&lt;/NFSe&gt;</p>
                </div>
              )}

              {detailTab === 'historico' && (
                <div className="space-y-3">
                  {[
                    { acao: 'Nota criada via importação', user: 'Sistema', data: slideOver.dataEmissao },
                    { acao: 'Transmitida ao SN', user: 'Sistema', data: slideOver.dataEmissao },
                    ...(slideOver.status === 'autorizada' ? [{ acao: 'Autorizada pelo SN', user: 'SEFAZ', data: slideOver.dataEmissao }] : []),
                    ...(slideOver.status === 'rejeitada' ? [{ acao: 'Rejeitada — ' + slideOver.motivoRejeicao, user: 'SEFAZ', data: slideOver.dataEmissao }] : []),
                  ].map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 14 }}>history</span>
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-on-surface">{h.acao}</p>
                        <p className="text-[11px] text-on-surface-variant">{h.user} · {h.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === 'retornos' && (
                <div className="bg-surface-container-low rounded-xl p-4 text-[12.5px] text-on-surface-variant space-y-2">
                  <p className="font-semibold text-on-surface">Último Retorno do SN</p>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>cStat:</span><span className="font-medium text-on-surface">{slideOver.status === 'autorizada' ? '100' : slideOver.status === 'rejeitada' ? '540' : '105'}</span></div>
                    <div className="flex justify-between"><span>xMotivo:</span><span className="font-medium text-on-surface">{slideOver.status === 'autorizada' ? 'Autorizado o uso da NFS-e' : slideOver.motivoRejeicao || 'Lote em processamento'}</span></div>
                    {slideOver.protocolo && <div className="flex justify-between"><span>nProt:</span><span className="font-medium text-on-surface">{slideOver.protocolo}</span></div>}
                    <div className="flex justify-between"><span>dhRecbto:</span><span className="font-medium text-on-surface">{slideOver.dataEmissao} 14:22:33</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest">
              <button className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-error hover:bg-error-container/30 rounded-lg transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>cancel</span>
                Cancelar Nota
              </button>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container rounded-lg transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mail</span>
                  Reenviar E-mail
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold text-on-primary bg-primary hover:bg-primary-dim rounded-lg transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>picture_as_pdf</span>
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </SlideOver>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)} />
      )}
    </div>
  )
}
