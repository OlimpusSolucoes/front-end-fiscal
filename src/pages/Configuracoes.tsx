import { useState } from 'react'

type Tab = 'geral' | 'certificado' | 'parametros' | 'numeracao'

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<Tab>('geral')
  const [ambiente, setAmbiente] = useState<'homologacao' | 'producao'>('producao')
  const [isDragging, setIsDragging] = useState(false)
  const [certFile, setCertFile] = useState<string | null>(null)

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'geral', label: 'Geral', icon: 'tune' },
    { key: 'certificado', label: 'Certificado Digital', icon: 'verified_user' },
    { key: 'parametros', label: 'Parâmetros Fiscais', icon: 'percent' },
    { key: 'numeracao', label: 'Numeração', icon: 'tag' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Sistema</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Configurações</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Ambiente toggle */}
          <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 shadow-card gap-1">
            <button
              onClick={() => setAmbiente('homologacao')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                ambiente === 'homologacao'
                  ? 'bg-warning-container text-warning'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Homologação
            </button>
            <button
              onClick={() => setAmbiente('producao')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                ambiente === 'producao'
                  ? 'bg-surface-container-lowest text-on-surface border border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Produção
            </button>
          </div>
        </div>
      </div>

      {/* Environment indicator */}
      {ambiente === 'homologacao' && (
        <div className="flex items-center gap-2 p-3.5 bg-warning-container rounded-xl mb-6">
          <span className="material-symbols-outlined filled text-warning" style={{ fontSize: 18 }}>science</span>
          <p className="text-[13px] font-medium text-warning">Ambiente de Homologação — as notas emitidas aqui não têm validade fiscal.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="card p-2 flex flex-row lg:flex-col gap-0.5 overflow-x-auto lg:overflow-visible">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                  activeTab === t.key
                    ? 'bg-surface-container-lowest text-on-surface border border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: 18,
                  fontVariationSettings: activeTab === t.key ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"
                }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'geral' && (
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Dados do Emitente</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">CNPJ *</label>
                  <input type="text" defaultValue="00.000.000/0001-00" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Razão Social *</label>
                  <input type="text" defaultValue="Exordium Cursos e Treinamentos Ltda." className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Inscrição Municipal</label>
                  <input type="text" placeholder="Número de inscrição municipal" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Inscrição Estadual</label>
                  <input type="text" placeholder="Se aplicável" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Endereço Completo</label>
                  <input type="text" defaultValue="Av. Paulista, 1234, Sala 501 — São Paulo, SP — 01310-100" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">E-mail do Emitente</label>
                  <input type="email" defaultValue="fiscal@exordium.com.br" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Telefone</label>
                  <input type="tel" defaultValue="(11) 4000-0000" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>

              {/* Observation fields */}
              <div className="pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Campos de Observação da NF</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Observação Padrão (NFS-e)</label>
                    <textarea rows={3} defaultValue="Nota emitida conforme contrato de prestação de serviços. CNPJ: 00.000.000/0001-00. ISS retido na fonte conforme legislação municipal." className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Observação Padrão (NF-e)</label>
                    <textarea rows={2} placeholder="Observações para notas de mercadoria..." className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors resize-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button className="px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container">Descartar</button>
                <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">Salvar Alterações</button>
              </div>
            </div>
          )}

          {activeTab === 'certificado' && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Certificado Digital A1</h2>
              </div>

              {/* Current cert info */}
              <div className="flex items-center gap-4 p-4 bg-primary-container/20 rounded-xl mb-6">
                <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 20 }}>verified_user</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-on-surface">EXORDIUM CURSOS E TREINAMENTOS LTDA.</p>
                  <p className="text-[12px] text-on-surface-variant">Válido até: <span className="font-semibold text-primary">15/08/2026</span></p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-primary text-[11px] font-semibold">
                  <span className="material-symbols-outlined filled" style={{ fontSize: 12 }}>check_circle</span>
                  Ativo
                </span>
              </div>

              {/* Upload zone */}
              <p className="text-[13px] font-semibold text-on-surface mb-3">Atualizar Certificado</p>
              <div
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition-colors mb-4 ${
                  isDragging ? 'border-primary bg-primary-container/10' : 'border-outline-variant/40 hover:border-primary/50'
                }`}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); setCertFile('certificado_novo.pfx') }}
              >
                <span className="material-symbols-outlined text-on-surface-variant mb-3" style={{ fontSize: 36 }}>upload_file</span>
                <p className="text-[13.5px] font-medium text-on-surface mb-1">Arraste o arquivo .pfx / .p12</p>
                <p className="text-[12px] text-on-surface-variant mb-4">ou clique para selecionar</p>
                <button className="px-4 py-2 bg-surface-container text-on-surface-variant rounded-xl text-[13px] font-medium hover:bg-surface-container-high">
                  Selecionar Arquivo
                </button>
                {certFile && (
                  <p className="mt-3 text-[12px] font-semibold text-primary">{certFile} selecionado</p>
                )}
              </div>

              <div>
                <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Senha do Certificado</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors max-w-xs" />
              </div>

              <div className="mt-4 p-3.5 bg-surface-container-low rounded-xl">
                <p className="text-[11.5px] text-on-surface-variant flex items-center gap-1.5">
                  <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 15 }}>lock</span>
                  O certificado é armazenado de forma criptografada e com acesso restrito.
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">Instalar Certificado</button>
              </div>
            </div>
          )}

          {activeTab === 'parametros' && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Taxas e Variáveis de Cálculo</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Alíquota ISS (%)', value: '5.5' },
                  { label: 'Alíquota PIS (%)', value: '0.65' },
                  { label: 'Alíquota COFINS (%)', value: '3.0' },
                  { label: 'Alíquota CSLL (%)', value: '1.0' },
                  { label: 'Alíquota IR (%)', value: '1.5' },
                  { label: 'Alíquota INSS Retido (%)', value: '0' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input type="number" defaultValue={f.value} step="0.01" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-tertiary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Códigos Fiscais</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Código do Serviço Padrão', value: '17.06' },
                    { label: 'CNAE Principal', value: '8599-6/04' },
                    { label: 'Natureza da Operação', value: 'Prestação de Serviços' },
                    { label: 'Regime Tributário', value: 'Simples Nacional' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type="text" defaultValue={f.value} className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* IBS/CBS */}
              <div className="pt-5 border-t border-outline-variant/20 mt-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Campos IBS/CBS (Jan/26)</h2>
                </div>
                <div className="p-4 bg-warning-container/30 rounded-xl mb-4 flex items-start gap-2.5">
                  <span className="material-symbols-outlined filled text-warning flex-shrink-0" style={{ fontSize: 18 }}>warning</span>
                  <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                    Os campos IBS e CBS são obrigatórios nas NFS-e a partir de janeiro de 2026, mesmo que não tributados ainda. Certifique-se de configurar as alíquotas corretas.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Alíquota IBS (%)', value: '0' },
                    { label: 'Alíquota CBS (%)', value: '0' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type="number" defaultValue={f.value} step="0.01" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button className="px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-low hover:bg-surface-container">Descartar</button>
                <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">Salvar Parâmetros</button>
              </div>
            </div>
          )}

          {activeTab === 'numeracao' && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Controle de Numeração</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant mb-6 leading-relaxed">
                Configure a numeração inicial com base no "último emitido" no sistema anterior. O sistema controlará automaticamente a sequência a partir deste ponto.
              </p>

              <div className="space-y-5">
                {[
                  { tipo: 'NFS-e', icon: 'receipt', proxNum: '000050', proxRps: 'RPS-050', cor: 'bg-primary-container', iconColor: '#006d47' },
                  { tipo: 'NF-e', icon: 'receipt_long', proxNum: '000012', proxRps: 'LOTE-12', cor: 'bg-secondary-container', iconColor: '#4e6456' },
                ].map(n => (
                  <div key={n.tipo} className="p-5 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-xl ${n.cor} flex items-center justify-center`}>
                        <span className="material-symbols-outlined filled" style={{ fontSize: 18, color: n.iconColor }}>{n.icon}</span>
                      </div>
                      <p className="text-[14px] font-semibold text-on-surface">{n.tipo}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Próximo Número</label>
                        <input type="text" defaultValue={n.proxNum} className="w-full px-3 py-2.5 bg-surface-container-lowest rounded-xl text-[13px] font-mono font-bold text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Próximo RPS/Lote</label>
                        <input type="text" defaultValue={n.proxRps} className="w-full px-3 py-2.5 bg-surface-container-lowest rounded-xl text-[13px] font-mono font-bold text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3.5 bg-error-container/30 rounded-xl">
                <p className="text-[12px] text-error flex items-center gap-1.5">
                  <span className="material-symbols-outlined filled" style={{ fontSize: 15 }}>warning</span>
                  Alterar a numeração pode causar inconsistências. Faça isso somente na configuração inicial ou quando orientado.
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">Salvar Numeração</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
