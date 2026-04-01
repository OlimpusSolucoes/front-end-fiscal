import { Link } from 'react-router-dom'

const destaques = [
  {
    icon: 'verified_user',
    title: 'Documento oficial',
    description: 'Emitido e disponibilizado no mesmo padrão do envio transacional para o cliente.',
  },
  {
    icon: 'schedule',
    title: 'Disponível 24/7',
    description: 'O destinatário pode acessar o PDF e o XML sempre que precisar.',
  },
  {
    icon: 'support_agent',
    title: 'Canal de suporte',
    description: 'Links rápidos para ajuda, termos e preferências no rodapé do email.',
  },
]

const linksRodape = ['Centro de Ajuda', 'Termos de Uso', 'Manage Preferences']

export default function ModeloEmail() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Templates</p>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-on-surface tracking-tight">Modelo de E-mail</h1>
          <p className="text-[13px] text-on-surface-variant mt-1">
            Prévia do email de envio de nota fiscal com visual inspirado na referência aprovada.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-[13px] font-medium text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Voltar ao dashboard
        </Link>
      </div>

      <div className="rounded-[28px] border border-white/60 bg-[#f7f8f6] px-4 py-6 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[880px]">
          <header className="mb-10 flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-[#1f2723]">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-ambient">
                <span className="material-symbols-outlined filled text-white" style={{ fontSize: 20 }}>receipt_long</span>
              </div>
              <span className="text-[18px] font-extrabold tracking-tight uppercase">Exordium</span>
            </div>

            <div className="flex items-center gap-3 text-secondary">
              <div className="w-10 h-10 rounded-full border border-outline-variant/30 bg-white flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>help</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-outline-variant/30 bg-white flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>account_circle</span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[760px]">
            <div className="overflow-hidden rounded-[28px] border border-[#e9edeb] bg-white shadow-ambient">
              <section className="px-5 py-8 text-center sm:px-10 sm:py-12">
                <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-on-surface">
                  Sua Nota Fiscal chegou
                </h2>
                <p className="mt-3 text-[15px] sm:text-[16px] text-secondary">
                  Referente aos serviços de consultoria tributária prestados.
                </p>

                <div className="mt-8 rounded-[20px] bg-[#f1f4f2] px-5 py-8 sm:px-10 sm:py-10">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-secondary">
                    Valor total da nota
                  </p>
                  <p className="mt-4 text-[42px] sm:text-[56px] font-extrabold tracking-tight text-primary">
                    R$ 1.450,80
                  </p>

                  <div className="mt-6 flex flex-col items-center justify-center gap-3 text-[14px] font-medium text-secondary sm:flex-row sm:gap-8">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>receipt</span>
                      NF-e #000.412.981
                    </div>
                    <div className="hidden h-4 w-px bg-outline-variant/40 sm:block" />
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
                      Emissão: 14 Out 2023
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-t border-[#eef1ef] px-5 py-8 sm:px-10">
                <h3 className="text-[15px] font-bold uppercase tracking-wide text-on-surface">Dados do Tomador</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-secondary">Nome / Razão Social</p>
                    <p className="mt-2 text-[18px] text-on-surface">TechInnovate Solutions LTDA</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-secondary">CNPJ / CPF</p>
                    <p className="mt-2 text-[18px] text-on-surface">12.345.678/0001-90</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-secondary">Endereço</p>
                  <p className="mt-2 text-[18px] text-on-surface">
                    Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-3 rounded-[16px] bg-primary px-6 py-5 text-[17px] font-bold text-on-primary transition-colors hover:bg-primary-dim"
                  >
                    <span className="material-symbols-outlined filled" style={{ fontSize: 20 }}>picture_as_pdf</span>
                    Visualizar PDF
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-3 rounded-[16px] border-2 border-primary bg-white px-6 py-5 text-[17px] font-bold text-primary transition-colors hover:bg-primary/5"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>code</span>
                    Baixar XML
                  </button>
                </div>
              </section>

              <section className="border-t border-[#eef1ef] bg-[#fbfcfb] px-5 py-5 sm:px-10">
                <div className="flex items-start gap-3 rounded-[18px] border border-[#edf1ee] bg-white px-4 py-4">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                    <span className="material-symbols-outlined filled" style={{ fontSize: 16 }}>info</span>
                  </div>
                  <p className="text-[14px] leading-7 text-secondary">
                    Esta é uma nota fiscal eletrônica oficial. Você também pode acessar este documento a qualquer momento através do seu painel administrativo no TaxAtrium.
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-8 flex items-center gap-4 px-4 text-outline-variant">
              <div className="h-px flex-1 bg-outline-variant/40" />
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-center">
                Documento processado digitalmente
              </p>
              <div className="h-px flex-1 bg-outline-variant/40" />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {destaques.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/70 bg-white/90 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-container text-primary">
                    <span className="material-symbols-outlined filled" style={{ fontSize: 20 }}>{item.icon}</span>
                  </div>
                  <h4 className="mt-4 text-[15px] font-semibold text-on-surface">{item.title}</h4>
                  <p className="mt-2 text-[13px] leading-6 text-on-surface-variant">{item.description}</p>
                </div>
              ))}
            </div>

            <footer className="px-4 pb-2 pt-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.12em] text-secondary">
                {linksRodape.map((link) => (
                  <button key={link} type="button" className="transition-colors hover:text-primary">
                    {link}
                  </button>
                ))}
              </div>

              <p className="mt-8 text-[13px] text-secondary">
                © 2024 TAXATRIUM. ALL RIGHTS RESERVED.
              </p>

              <div className="mt-10 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-outline-variant">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>receipt_long</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
