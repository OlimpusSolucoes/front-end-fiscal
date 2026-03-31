import { useState, useRef } from 'react'
import StatusBadge from '../components/ui/StatusBadge'
import { importHistory } from '../data/mockData'

const steps = [
  { label: 'Upload', desc: 'Selecione o arquivo' },
  { label: 'Mapeamento', desc: 'Verifique as colunas' },
  { label: 'Validação', desc: 'Confira os dados' },
  { label: 'Confirmação', desc: 'Envie para emissão' },
]

export default function Importacao() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File) {
    setFile(f)
    setTimeout(() => setCurrentStep(1), 600)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Automação</p>
        <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Importação de Planilha</h1>
      </div>

      {/* Stepper */}
      <div className="bg-surface-container-lowest rounded-2xl px-4 py-4 sm:px-6 sm:py-5 shadow-card mb-6">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center min-w-0">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-[13px] transition-all flex-shrink-0 ${
                  i < currentStep
                    ? 'bg-[#dde6e1] text-primary'
                    : i === currentStep
                    ? 'bg-[#dde6e1] text-primary ring-2 ring-primary/30'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {i < currentStep
                    ? <span className="material-symbols-outlined filled text-on-primary" style={{ fontSize: 16 }}>check</span>
                    : i + 1
                  }
                </div>
                <p className={`text-[11px] sm:text-[12px] font-semibold mt-1.5 text-center leading-tight ${i === currentStep ? 'text-primary' : i < currentStep ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {step.label}
                </p>
                <p className="hidden sm:block text-[10.5px] text-on-surface-variant text-center leading-tight">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 sm:mx-3 mb-5 sm:mb-8 ${i < currentStep ? 'bg-primary' : 'bg-outline-variant/30'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Main area */}
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <div
              className={`card border-2 border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer py-10 sm:py-16 px-4 text-center ${
                isDragging
                  ? 'border-primary bg-primary-container/10'
                  : 'border-outline-variant/40 hover:border-primary/50 hover:bg-surface-container-low/50'
              }`}
              onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xlsm,.xlsx,.xls"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
              />
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 ${isDragging ? 'bg-[#dde6e1]' : 'bg-[#dde6e1]'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: isDragging ? '#ffffff' : '#006d47' }}>
                  cloud_upload
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] font-semibold text-on-surface mb-1.5">
                {isDragging ? 'Solte o arquivo aqui' : 'Clique para selecionar'}
              </p>
              <p className="hidden sm:block text-[12.5px] text-on-surface-variant mb-1">ou arraste o arquivo até aqui</p>
              <p className="text-[12px] text-on-surface-variant mb-5">.xlsm, .xlsx · Máx. 25 MB</p>
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-[13px] font-semibold hover:bg-primary-dim transition-colors"
                onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>folder_open</span>
                Selecionar Arquivo
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="card p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-5 p-3 bg-primary-container/30 rounded-xl">
                <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 20 }}>description</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-on-surface truncate">{file?.name || 'arquivo.xlsm'}</p>
                  <p className="text-[11px] text-on-surface-variant">{file ? `${(file.size / 1024).toFixed(1)} KB` : '--'} · Pronto para mapeamento</p>
                </div>
                <span className="material-symbols-outlined filled text-primary flex-shrink-0" style={{ fontSize: 18 }}>check_circle</span>
              </div>
              <p className="text-[13.5px] font-semibold text-on-surface mb-4">Mapeamento de Colunas</p>
              <div className="space-y-2.5">
                {[
                  { campo: 'Nome do Cliente', coluna: 'Coluna A' },
                  { campo: 'CNPJ / CPF', coluna: 'Coluna B' },
                  { campo: 'Valor do Serviço', coluna: 'Coluna C' },
                  { campo: 'Data de Competência', coluna: 'Coluna D' },
                  { campo: 'Descrição do Serviço', coluna: 'Coluna E' },
                  { campo: 'Alíquota ISS', coluna: 'Coluna F' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl gap-2">
                    <span className="text-[12.5px] text-on-surface-variant min-w-0 truncate">{m.campo}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[12.5px] font-medium text-on-surface">{m.coluna}</span>
                      <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 16 }}>check_circle</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setCurrentStep(0)} className="px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container">
                  Voltar
                </button>
                <button onClick={() => setCurrentStep(2)} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">
                  Confirmar
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="card p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 p-3 bg-primary-container/30 rounded-xl">
                <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 18 }}>verified</span>
                <p className="text-[13px] font-semibold text-on-surface">28 registros válidos · 0 erros</p>
              </div>
              <p className="text-[13.5px] font-semibold text-on-surface mb-4">Prévia dos Dados</p>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full text-[12px] min-w-[480px]">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      {['#', 'Cliente', 'CNPJ', 'Valor', 'Competência', 'Status'].map(h => (
                        <th key={h} className="px-2 py-2 text-left text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { n: 1, cliente: 'Tech Solutions Ltda.', cnpj: '12.345.678/0001-90', valor: 'R$ 12.500,00', comp: '03/2026' },
                      { n: 2, cliente: 'Educação Dinâmica S.A.', cnpj: '98.765.432/0001-10', valor: 'R$ 8.750,00', comp: '03/2026' },
                      { n: 3, cliente: 'Consultoria RH Brasil', cnpj: '11.222.333/0001-44', valor: 'R$ 4.200,00', comp: '03/2026' },
                    ].map(r => (
                      <tr key={r.n} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                        <td className="px-2 py-2.5 text-on-surface-variant">{r.n}</td>
                        <td className="px-2 py-2.5 text-on-surface font-medium">{r.cliente}</td>
                        <td className="px-2 py-2.5 text-on-surface-variant">{r.cnpj}</td>
                        <td className="px-2 py-2.5 text-on-surface font-semibold">{r.valor}</td>
                        <td className="px-2 py-2.5 text-on-surface-variant">{r.comp}</td>
                        <td className="px-2 py-2.5">
                          <span className="flex items-center gap-1 text-primary text-[11px] font-semibold">
                            <span className="material-symbols-outlined filled" style={{ fontSize: 13 }}>check_circle</span>
                            Válido
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11.5px] text-on-surface-variant mt-2">... e mais 25 registros</p>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setCurrentStep(1)} className="px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container">
                  Voltar
                </button>
                <button onClick={() => setCurrentStep(3)} className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">
                  Prosseguir
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 32 }}>task_alt</span>
              </div>
              <h2 className="text-[18px] font-bold text-on-surface mb-2">Pronto para Transmissão</h2>
              <p className="text-[13px] text-on-surface-variant mb-6">28 notas prontas. Deseja emitir em lote ou salvar para revisão?</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <button className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container">
                  Salvar Rascunho
                </button>
                <button className="px-6 py-2.5 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                  Emitir em Lote (28)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tips */}
          <div className="card p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 18 }}>tips_and_updates</span>
              <p className="text-[13px] font-semibold text-on-surface">Recomendações</p>
            </div>
            <ul className="space-y-2">
              {[
                'Use o modelo oficial de planilha disponível no sistema',
                'Macros não são executadas — apenas os dados são lidos',
                'Certifique-se que o CNPJ dos clientes está correto',
                'Limite de 500 registros por importação',
                'Campos IBS/CBS obrigatórios a partir de Jan/26',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined filled text-primary flex-shrink-0" style={{ fontSize: 14, marginTop: 1 }}>radio_button_checked</span>
                  <span className="text-[12px] text-on-surface-variant leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent files */}
          <div className="card p-4 sm:p-5">
            <p className="text-[13px] font-semibold text-on-surface mb-3">Arquivos Recentes</p>
            <div className="space-y-2.5">
              {importHistory.slice(0, 3).map(h => (
                <div key={h.id} className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0" style={{ fontSize: 18 }}>description</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-on-surface truncate">{h.arquivo}</p>
                    <p className="text-[10.5px] text-on-surface-variant">{h.registros} registros</p>
                  </div>
                  <StatusBadge status={h.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card">
        <div className="px-4 sm:px-6 py-4 border-b border-outline-variant/20">
          <p className="text-[14px] font-semibold text-on-surface">Histórico de Importações</p>
        </div>

        {/* Mobile: card list */}
        <div className="divide-y divide-outline-variant/10 sm:hidden">
          {importHistory.map(h => (
            <div key={h.id} className="px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0" style={{ fontSize: 20 }}>description</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-on-surface truncate">{h.arquivo}</p>
                <p className="text-[11px] text-on-surface-variant">{h.data} · {h.registros} notas</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={h.status} size="sm" />
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10">
                {['Arquivo', 'Data / Hora', 'Registros', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {importHistory.map(h => (
                <tr key={h.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 18 }}>description</span>
                      <span className="text-[13px] font-medium text-on-surface">{h.arquivo}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[12.5px] text-on-surface-variant">{h.data}</td>
                  <td className="px-5 py-3 text-[12.5px] font-semibold text-on-surface">{h.registros} notas</td>
                  <td className="px-5 py-3"><StatusBadge status={h.status} size="sm" /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>visibility</span>
                        Ver Notas
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
