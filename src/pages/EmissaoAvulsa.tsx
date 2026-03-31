import { useState } from 'react'

export default function EmissaoAvulsa() {
  const [tipo, setTipo] = useState('NFS-e')
  const [principal, setPrincipal] = useState('0')
  const [multa, setMulta] = useState('0')
  const [desconto, setDesconto] = useState('0')

  const valorPrincipal = parseFloat(principal.replace(',', '.')) || 0
  const valorMulta = parseFloat(multa.replace(',', '.')) || 0
  const valorDesconto = parseFloat(desconto.replace(',', '.')) || 0
  const total = valorPrincipal + valorMulta - valorDesconto
  const iss = total * 0.055

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Manual</p>
        <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Emissão Avulsa</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form — 2/3 */}
        <div className="lg:col-span-2 space-y-5">
          {/* Identificação do Contribuinte */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-[14px] font-semibold text-on-surface">Identificação do Contribuinte</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">CPF / CNPJ *</label>
                <input
                  type="text"
                  placeholder="00.000.000/0001-00"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Razão Social / Nome *</label>
                <input
                  type="text"
                  placeholder="Nome do tomador"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Endereço</label>
                <input
                  type="text"
                  placeholder="Rua, número, complemento, cidade — UF"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">E-mail do Cliente</label>
                <input
                  type="email"
                  placeholder="cliente@email.com"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Inscrição Municipal</label>
                <input
                  type="text"
                  placeholder="Opcional"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Informações do Tributo */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-secondary rounded-full" />
              <h2 className="text-[14px] font-semibold text-on-surface">Informações do Tributo</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Tipo de Nota *</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors appearance-none"
                >
                  <option>NFS-e</option>
                  <option>NF-e</option>
                </select>
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Competência *</label>
                <input
                  type="month"
                  defaultValue="2026-03"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Vencimento</label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Descrição do Serviço *</label>
                <textarea
                  rows={3}
                  placeholder="Descreva o serviço prestado..."
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Código do Serviço</label>
                <input
                  type="text"
                  placeholder="ex: 17.06"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Alíquota ISS (%)</label>
                <input
                  type="number"
                  defaultValue="5.5"
                  step="0.1"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">CNAE</label>
                <input
                  type="text"
                  placeholder="ex: 8599-6/04"
                  className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Composição de Valores */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-tertiary rounded-full" />
              <h2 className="text-[14px] font-semibold text-on-surface">Composição de Valores</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  {['Descrição', 'Valor (R$)'].map(h => (
                    <th key={h} className="pb-3 text-left text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Valor Principal', value: principal, setter: setPrincipal, color: 'text-on-surface' },
                  { label: 'Multas / Juros', value: multa, setter: setMulta, color: 'text-on-surface' },
                  { label: 'Descontos', value: desconto, setter: setDesconto, color: 'text-error' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10">
                    <td className="py-3 text-[13px] text-on-surface-variant">{row.label}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] text-on-surface-variant">R$</span>
                        <input
                          type="number"
                          value={row.value}
                          onChange={e => row.setter(e.target.value)}
                          className="w-32 px-2 py-1.5 bg-surface-container-low rounded-lg text-[13px] font-medium text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none text-right"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-3 text-[13px] font-semibold text-on-surface">ISS Estimado (5,5%)</td>
                  <td className="pt-3 text-[13px] font-semibold text-primary">{fmt(iss)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card — 1/3 */}
        <div className="space-y-4">
          <div className="card p-6 lg:sticky lg:top-8">
            <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Resumo</p>
            <p className="text-[36px] font-bold text-on-surface tracking-tight leading-none mb-1">{fmt(total)}</p>
            <p className="text-[12px] text-on-surface-variant mb-6">Valor total da nota</p>

            <div className="space-y-2 mb-6 pb-5 border-b border-outline-variant/20">
              {[
                { label: 'Principal', val: fmt(valorPrincipal) },
                { label: 'Multas / Juros', val: fmt(valorMulta) },
                { label: 'Descontos', val: `- ${fmt(valorDesconto)}`, cls: 'text-error' },
                { label: 'ISS (5,5%)', val: fmt(iss), cls: 'text-primary' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-[12.5px] text-on-surface-variant">{r.label}</span>
                  <span className={`text-[12.5px] font-medium ${r.cls || 'text-on-surface'}`}>{r.val}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-on-primary rounded-xl text-[13px] font-semibold hover:bg-primary-dim transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>receipt</span>
                Gerar Documento
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-xl text-[13px] font-medium hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>draft</span>
                Salvar Rascunho
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-error rounded-xl text-[13px] font-medium hover:bg-error-container/30 transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>cancel</span>
                Cancelar
              </button>
            </div>

            {/* Info box */}
            <div className="mt-5 p-3.5 bg-secondary-container/40 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="material-symbols-outlined filled text-secondary" style={{ fontSize: 15 }}>auto_awesome</span>
                <p className="text-[11.5px] font-semibold text-secondary">Suporte Inteligente</p>
              </div>
              <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                Com base no CNAE informado, pode haver incentivo fiscal. Verifique na legislação municipal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
