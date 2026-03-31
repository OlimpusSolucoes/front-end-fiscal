import { useState } from 'react'

type Tab = 'primeiros-passos' | 'faq' | 'guias' | 'contato'

export default function CentralAjuda() {
  const [activeTab, setActiveTab] = useState<Tab>('primeiros-passos')

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'primeiros-passos', label: 'Primeiros Passos', icon: 'rocket_launch' },
    { key: 'faq', label: 'Perguntas Frequentes', icon: 'help' },
    { key: 'guias', label: 'Guias e Tutoriais', icon: 'menu_book' },
    { key: 'contato', label: 'Contato e Suporte', icon: 'support_agent' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Suporte</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Central de Ajuda</h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-on-surface-variant bg-surface-container-lowest shadow-card hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>open_in_new</span>
            Documentação Completa
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
          {activeTab === 'primeiros-passos' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Bem-vindo ao Exordium Fiscal</h2>
              </div>

              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Siga os passos abaixo para configurar o sistema e começar a emitir notas fiscais com segurança.
              </p>

              <div className="space-y-3">
                {[
                  { step: '01', title: 'Configure os dados do emitente', desc: 'Acesse Configurações → Geral e preencha os dados da empresa, CNPJ e endereço.', done: true },
                  { step: '02', title: 'Instale o certificado digital A1', desc: 'Faça upload do arquivo .pfx em Configurações → Certificado Digital e insira a senha.', done: true },
                  { step: '03', title: 'Defina os parâmetros fiscais', desc: 'Configure alíquotas de ISS, PIS, COFINS e demais tributos em Parâmetros Fiscais.', done: false },
                  { step: '04', title: 'Ajuste a numeração inicial', desc: 'Se veio de outro sistema, informe o último número emitido em Configurações → Numeração.', done: false },
                  { step: '05', title: 'Emita sua primeira nota', desc: 'Use Emissão Avulsa para emitir uma NFS-e de teste em ambiente de homologação.', done: false },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-4 p-4 bg-surface-container-low rounded-2xl">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-primary-container' : 'bg-surface-container'}`}>
                      {item.done
                        ? <span className="material-symbols-outlined filled text-primary" style={{ fontSize: 17 }}>check_circle</span>
                        : <span className="text-[12px] font-bold text-on-surface-variant">{item.step}</span>
                      }
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-on-surface mb-0.5">{item.title}</p>
                      <p className="text-[12px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Perguntas Frequentes</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: 'Qual a diferença entre NFS-e e NF-e?',
                    a: 'A NFS-e (Nota Fiscal de Serviços Eletrônica) é emitida por prestadores de serviços e recolhe ISS. Já a NF-e é utilizada para operações de compra e venda de mercadorias e incide ICMS.',
                  },
                  {
                    q: 'O que é o ambiente de homologação?',
                    a: 'É um ambiente de testes fornecido pela prefeitura ou SEFAZ. As notas emitidas nele não têm validade fiscal e servem apenas para validar a integração e os dados do emitente.',
                  },
                  {
                    q: 'Como funciona o fechamento mensal?',
                    a: 'O fechamento consolida todas as notas emitidas no período, gera os totais de tributos e permite exportar relatórios para a contabilidade ou para pagamento de guias.',
                  },
                  {
                    q: 'Posso importar notas de outro sistema?',
                    a: 'Sim. Acesse a tela de Importação e faça upload de arquivos XML no padrão nacional. O sistema valida e vincula automaticamente os documentos.',
                  },
                  {
                    q: 'O que são os campos IBS e CBS?',
                    a: 'IBS (Imposto sobre Bens e Serviços) e CBS (Contribuição sobre Bens e Serviços) são os novos tributos da reforma tributária. Passaram a ser obrigatórios nas NFS-e a partir de janeiro de 2026.',
                  },
                ].map((item, i) => (
                  <details key={i} className="group p-4 bg-surface-container-low rounded-2xl">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="text-[13px] font-semibold text-on-surface">{item.q}</span>
                      <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0 ml-3 group-open:rotate-180 transition-transform" style={{ fontSize: 18 }}>expand_more</span>
                    </summary>
                    <p className="mt-3 text-[12.5px] text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guias' && (
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Guias e Tutoriais</h2>
              </div>

              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Artigos detalhados para ajudá-lo em cada funcionalidade do sistema. Conteúdo em breve.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: 'receipt', title: 'Como emitir uma NFS-e', tag: 'Emissão', color: 'bg-primary-container', iconColor: '#006d47' },
                  { icon: 'receipt_long', title: 'Como emitir uma NF-e', tag: 'Emissão', color: 'bg-primary-container', iconColor: '#006d47' },
                  { icon: 'upload_file', title: 'Importação em lote via XML', tag: 'Importação', color: 'bg-secondary-container', iconColor: '#4e6456' },
                  { icon: 'lock_clock', title: 'Realizando o fechamento mensal', tag: 'Fechamento', color: 'bg-tertiary-container', iconColor: '#3b5942' },
                  { icon: 'verified_user', title: 'Instalando o certificado A1', tag: 'Configuração', color: 'bg-surface-container', iconColor: '#5c6560' },
                  { icon: 'download', title: 'Exportando relatórios contábeis', tag: 'Relatórios', color: 'bg-surface-container', iconColor: '#5c6560' },
                ].map((guide, i) => (
                  <button
                    key={i}
                    className="flex items-start gap-3 p-4 bg-surface-container-low rounded-2xl text-left hover:bg-surface-container transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="material-symbols-outlined filled" style={{ fontSize: 18, color: guide.iconColor }}>{guide.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-on-surface group-hover:text-primary transition-colors">{guide.title}</p>
                      <span className="inline-block mt-1 text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider">{guide.tag}</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 16 }}>arrow_forward</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl mt-2">
                <span className="material-symbols-outlined filled text-on-surface-variant" style={{ fontSize: 22 }}>construction</span>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  Os artigos completos estão sendo preparados pela equipe. Em breve disponíveis nesta seção.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contato' && (
            <div className="card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-[15px] font-semibold text-on-surface">Contato e Suporte</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: 'chat', title: 'Chat ao vivo', desc: 'Fale com nossa equipe em tempo real.', action: 'Iniciar chat', color: 'bg-primary-container', iconColor: '#006d47' },
                  { icon: 'mail', title: 'E-mail', desc: 'suporte@exordium.com.br', action: 'Enviar e-mail', color: 'bg-secondary-container', iconColor: '#4e6456' },
                  { icon: 'phone', title: 'Telefone', desc: '(11) 4000-0000 — Seg a Sex, 9h–18h', action: 'Ligar agora', color: 'bg-surface-container', iconColor: '#5c6560' },
                  { icon: 'forum', title: 'Comunidade', desc: 'Fórum de usuários e dicas de uso.', action: 'Acessar fórum', color: 'bg-surface-container', iconColor: '#5c6560' },
                ].map((channel, i) => (
                  <div key={i} className="p-4 bg-surface-container-low rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${channel.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="material-symbols-outlined filled" style={{ fontSize: 18, color: channel.iconColor }}>{channel.icon}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-on-surface">{channel.title}</p>
                        <p className="text-[11.5px] text-on-surface-variant">{channel.desc}</p>
                      </div>
                    </div>
                    <button className="w-full px-3 py-2 rounded-xl text-[12.5px] font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-all">
                      {channel.action}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-secondary rounded-full" />
                  <h2 className="text-[15px] font-semibold text-on-surface">Enviar Mensagem</h2>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Nome</label>
                      <input type="text" placeholder="Seu nome" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">E-mail</label>
                      <input type="email" placeholder="seu@email.com" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Assunto</label>
                    <input type="text" placeholder="Descreva brevemente o problema" className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Mensagem</label>
                    <textarea rows={4} placeholder="Detalhe sua dúvida ou problema..." className="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-on-surface-variant/50 border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none transition-colors resize-none" />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-on-primary bg-primary hover:bg-primary-dim">Enviar Mensagem</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
