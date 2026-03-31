import { useState } from 'react'

type Tab = 'visao-geral' | 'nfse' | 'nfe' | 'api' | 'glossario'

export default function Documentacao() {
  const [activeTab, setActiveTab] = useState<Tab>('visao-geral')

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'visao-geral', label: 'Visão Geral', icon: 'home_storage' },
    { key: 'nfse', label: 'NFS-e', icon: 'receipt' },
    { key: 'nfe', label: 'NF-e', icon: 'receipt_long' },
    { key: 'api', label: 'Integração / API', icon: 'integration_instructions' },
    { key: 'glossario', label: 'Glossário', icon: 'book_2' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Suporte</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Documentação</h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-lowest shadow-card hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>download</span>
            Baixar PDF
          </a>
        </div>
      </div>

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
          {activeTab === 'visao-geral' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Sobre o Sistema</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                O Exordium Fiscal é uma plataforma de gestão de notas fiscais eletrônicas voltada para empresas prestadoras de serviços e de comércio. Suporta NFS-e e NF-e com integração direta às prefeituras e à SEFAZ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: 'receipt', label: 'NFS-e', desc: 'Nota Fiscal de Serviços Eletrônica — integração com prefeituras.', color: 'bg-primary-container', iconColor: '#006d47' },
                  { icon: 'receipt_long', label: 'NF-e', desc: 'Nota Fiscal Eletrônica — integração com SEFAZ estadual.', color: 'bg-secondary-container', iconColor: '#4e6456' },
                  { icon: 'integration_instructions', label: 'API REST', desc: 'Integre o sistema ao seu ERP ou plataforma via API.', color: 'bg-surface-container', iconColor: '#5c6560' },
                ].map((card, i) => (
                  <div key={i} className="p-4 bg-surface-container-low rounded-2xl flex flex-col gap-3">
                    <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center`}>
                      <span className="material-symbols-outlined filled" style={{ fontSize: 18, color: card.iconColor }}>{card.icon}</span>
                    </div>
                    <p className="text-[13px] font-semibold text-on-surface">{card.label}</p>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Estrutura do Sistema</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { modulo: 'Dashboard', desc: 'Painel com métricas, últimas notas e alertas.' },
                    { modulo: 'Lista de Notas', desc: 'Consulta, filtro, download e cancelamento de notas emitidas.' },
                    { modulo: 'Importação', desc: 'Upload de XMLs para vincular documentos de terceiros.' },
                    { modulo: 'Emissão Avulsa', desc: 'Emissão manual de NFS-e ou NF-e, nota a nota.' },
                    { modulo: 'Fechamento Mensal', desc: 'Consolidação fiscal do período com exportação para contabilidade.' },
                    { modulo: 'Configurações', desc: 'Dados do emitente, certificado digital, alíquotas e numeração.' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-surface-container-low rounded-xl">
                      <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: 15, marginTop: 1 }}>arrow_right</span>
                      <div>
                        <span className="text-[13px] font-semibold text-on-surface">{row.modulo} — </span>
                        <span className="text-[13px] text-on-surface-variant">{row.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nfse' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Nota Fiscal de Serviços Eletrônica (NFS-e)</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                A NFS-e é o documento eletrônico emitido por prestadores de serviços para registrar a prestação e recolher o ISS ao município. Cada prefeitura pode ter padrões próprios, mas o sistema Exordium abstrai essas diferenças.
              </p>

              <div className="pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Campos Obrigatórios</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { campo: 'Tomador', desc: 'Nome, CPF/CNPJ e endereço do tomador do serviço.' },
                    { campo: 'Código do Serviço', desc: 'Código LC 116/2003 referente à atividade prestada.' },
                    { campo: 'Valor do Serviço', desc: 'Valor bruto cobrado antes de deduções.' },
                    { campo: 'Alíquota ISS', desc: 'Percentual aplicado conforme legislação municipal.' },
                    { campo: 'Discriminação', desc: 'Descrição detalhada do serviço prestado.' },
                    { campo: 'Competência', desc: 'Mês/ano de referência da prestação.' },
                    { campo: 'IBS / CBS', desc: 'Obrigatório a partir de jan/2026, mesmo que alíquota zero.' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-surface-container-low rounded-xl">
                      <span className="material-symbols-outlined filled text-primary flex-shrink-0" style={{ fontSize: 15, marginTop: 1 }}>fiber_manual_record</span>
                      <div>
                        <span className="text-[13px] font-semibold text-on-surface">{row.campo}: </span>
                        <span className="text-[13px] text-on-surface-variant">{row.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-warning-container/30 rounded-xl flex items-start gap-2.5">
                <span className="material-symbols-outlined filled text-warning flex-shrink-0" style={{ fontSize: 18 }}>warning</span>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  A partir de janeiro de 2026 os campos IBS e CBS são obrigatórios em todas as NFS-e, mesmo que as alíquotas sejam zero. Configure em <strong>Configurações → Parâmetros Fiscais</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'nfe' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Nota Fiscal Eletrônica (NF-e)</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                A NF-e é o documento utilizado para operações de compra, venda ou transferência de mercadorias. É autorizada pela SEFAZ estadual e substitui a nota fiscal em papel (modelo 1 e 1-A).
              </p>

              <div className="pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Campos Obrigatórios</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { campo: 'Destinatário', desc: 'Razão social, CNPJ/CPF, IE e endereço completo.' },
                    { campo: 'Itens / Produtos', desc: 'Código, descrição, NCM, quantidade, unidade e valor unitário.' },
                    { campo: 'CFOP', desc: 'Código Fiscal de Operações e Prestações.' },
                    { campo: 'CST / CSOSN', desc: 'Situação tributária do ICMS para o produto.' },
                    { campo: 'Cálculo de Tributos', desc: 'ICMS, IPI, PIS e COFINS conforme regime tributário.' },
                    { campo: 'Transporte', desc: 'Modalidade de frete, transportadora e volumes.' },
                    { campo: 'Chave de Acesso', desc: 'Gerada automaticamente após autorização da SEFAZ (44 dígitos).' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-surface-container-low rounded-xl">
                      <span className="material-symbols-outlined filled text-primary flex-shrink-0" style={{ fontSize: 15, marginTop: 1 }}>fiber_manual_record</span>
                      <div>
                        <span className="text-[13px] font-semibold text-on-surface">{row.campo}: </span>
                        <span className="text-[13px] text-on-surface-variant">{row.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 16 }}>info</span>
                <p className="text-[12px] text-on-surface-variant">
                  O cancelamento de NF-e deve ser solicitado em até 24h após a autorização, quando não houver circulação de mercadoria.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Integração via API REST</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                O Exordium expõe uma API REST para integração com ERPs, plataformas de e-commerce e sistemas internos. Todas as requisições utilizam autenticação via Bearer Token.
              </p>

              <div className="pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Endpoints Principais</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { method: 'POST', path: '/v1/nfse/emitir', desc: 'Emite uma NFS-e e retorna o XML autorizado.' },
                    { method: 'POST', path: '/v1/nfe/emitir', desc: 'Emite uma NF-e e retorna o XML com chave de acesso.' },
                    { method: 'GET', path: '/v1/notas', desc: 'Lista as notas emitidas com filtros por período e status.' },
                    { method: 'GET', path: '/v1/notas/:id', desc: 'Retorna os dados completos de uma nota específica.' },
                    { method: 'POST', path: '/v1/notas/:id/cancelar', desc: 'Solicita o cancelamento de uma nota autorizada.' },
                    { method: 'GET', path: '/v1/notas/:id/pdf', desc: 'Gera e retorna o DANFE ou DANFS-e em PDF.' },
                  ].map((ep, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-surface-container-low rounded-xl font-mono">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${ep.method === 'GET' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'}`}>
                        {ep.method}
                      </span>
                      <div>
                        <p className="text-[12.5px] font-semibold text-on-surface">{ep.path}</p>
                        <p className="text-[12px] text-on-surface-variant font-sans mt-0.5">{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-tertiary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Autenticação</h2>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl space-y-2">
                  <p className="text-[12.5px] text-on-surface-variant leading-relaxed">Inclua o token em todas as requisições via header:</p>
                  <div className="px-4 py-3 bg-surface-container rounded-xl font-mono text-[12px] text-on-surface">
                    Authorization: Bearer &lt;seu_token&gt;
                  </div>
                  <p className="text-[12px] text-on-surface-variant">O token pode ser gerado em <strong>Configurações → Integrações</strong> (em breve).</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'glossario' && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Glossário de Termos Fiscais</h2>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Referência rápida dos termos mais utilizados na plataforma e na legislação fiscal brasileira.
              </p>
              <div className="space-y-2">
                {[
                  { termo: 'NFS-e', def: 'Nota Fiscal de Serviços Eletrônica. Documento eletrônico emitido por prestadores de serviços para recolhimento do ISS ao município.' },
                  { termo: 'NF-e', def: 'Nota Fiscal Eletrônica. Documento que substitui a NF em papel para operações de compra e venda de mercadorias, autorizado pela SEFAZ.' },
                  { termo: 'ISS', def: 'Imposto Sobre Serviços. Tributo municipal incidente sobre a prestação de serviços. Alíquota varia entre 2% e 5% conforme o município.' },
                  { termo: 'ICMS', def: 'Imposto sobre Circulação de Mercadorias e Serviços. Tributo estadual incidente sobre operações com mercadorias.' },
                  { termo: 'CFOP', def: 'Código Fiscal de Operações e Prestações. Identifica a natureza da operação (venda, devolução, transferência etc.) em NF-e.' },
                  { termo: 'CST / CSOSN', def: 'Código de Situação Tributária. Define a tributação do ICMS para cada item. CSOSN é exclusivo para empresas do Simples Nacional.' },
                  { termo: 'NCM', def: 'Nomenclatura Comum do Mercosul. Código de 8 dígitos que classifica produtos para fins fiscais e aduaneiros.' },
                  { termo: 'RPS', def: 'Recibo Provisório de Serviços. Documento emitido antes de transmitir a NFS-e. O sistema converte automaticamente em NFS-e ao transmitir.' },
                  { termo: 'DANFE', def: 'Documento Auxiliar da NF-e. Representação gráfica da NF-e para acompanhar o transporte de mercadorias.' },
                  { termo: 'IBS', def: 'Imposto sobre Bens e Serviços. Novo tributo da reforma tributária que substituirá ICMS e ISS. Obrigatório nas notas a partir de jan/2026.' },
                  { termo: 'CBS', def: 'Contribuição sobre Bens e Serviços. Substitui PIS e COFINS na reforma tributária. Obrigatório nas notas a partir de jan/2026.' },
                  { termo: 'Chave de Acesso', def: 'Código de 44 dígitos que identifica unicamente uma NF-e ou NFS-e. Gerado após autorização da SEFAZ ou prefeitura.' },
                  { termo: 'Certificado A1', def: 'Certificado digital em arquivo (.pfx/.p12) usado para assinar eletronicamente os documentos fiscais. Validade máxima de 1 ano.' },
                  { termo: 'SEFAZ', def: 'Secretaria da Fazenda Estadual. Órgão responsável por autorizar as NF-e e receber as declarações tributárias estaduais.' },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-3 bg-surface-container-low rounded-xl">
                    <span className="text-[13px] font-bold text-primary">{item.termo}</span>
                    <span className="text-[13px] text-on-surface-variant"> — {item.def}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
