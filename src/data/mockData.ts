import type { NoteStatus } from '../components/ui/StatusBadge'

export interface Nota {
  id: string
  tipo: 'NFS-e' | 'NF-e'
  numero: string
  rps: string
  dataEmissao: string
  dataCompetencia: string
  cliente: string
  valor: number
  impostos: number
  status: NoteStatus
  protocolo?: string
  motivoRejeicao?: string
}

export const notas: Nota[] = [
  {
    id: '1',
    tipo: 'NFS-e',
    numero: '000045',
    rps: 'RPS-045',
    dataEmissao: '28/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Tech Solutions Ltda.',
    valor: 12500.00,
    impostos: 687.50,
    status: 'autorizada',
    protocolo: 'PROT-2026-045',
  },
  {
    id: '2',
    tipo: 'NF-e',
    numero: '000046',
    rps: 'RPS-046',
    dataEmissao: '27/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Educação Dinâmica S.A.',
    valor: 8750.00,
    impostos: 481.25,
    status: 'rejeitada',
    motivoRejeicao: 'E112 - CNPJ do destinatário inválido',
  },
  {
    id: '3',
    tipo: 'NFS-e',
    numero: '000047',
    rps: 'RPS-047',
    dataEmissao: '26/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Consultoria RH Brasil',
    valor: 4200.00,
    impostos: 231.00,
    status: 'pendente',
  },
  {
    id: '4',
    tipo: 'NFS-e',
    numero: '000048',
    rps: 'RPS-048',
    dataEmissao: '25/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Grupo Educacional Norte',
    valor: 6300.00,
    impostos: 346.50,
    status: 'cancelada',
  },
  {
    id: '5',
    tipo: 'NF-e',
    numero: '000049',
    rps: 'RPS-049',
    dataEmissao: '24/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Instituto Formação Pró',
    valor: 9800.00,
    impostos: 539.00,
    status: 'processando',
  },
  {
    id: '6',
    tipo: 'NFS-e',
    numero: '000050',
    rps: 'RPS-050',
    dataEmissao: '23/03/2026',
    dataCompetencia: '03/2026',
    cliente: 'Capacitar Treinamentos',
    valor: 3600.00,
    impostos: 198.00,
    status: 'autorizada',
    protocolo: 'PROT-2026-050',
  },
]

export const monthlyData = [
  { mes: 'Out', valor: 38000, qtd: 12 },
  { mes: 'Nov', valor: 52000, qtd: 18 },
  { mes: 'Dez', valor: 45000, qtd: 15 },
  { mes: 'Jan', valor: 61000, qtd: 22 },
  { mes: 'Fev', valor: 48000, qtd: 16 },
  { mes: 'Mar', valor: 72000, qtd: 28 },
]

export const importHistory = [
  { id: '1', arquivo: 'notas_marco_2026.xlsm', data: '28/03/2026 09:14', status: 'autorizada' as NoteStatus, registros: 28 },
  { id: '2', arquivo: 'notas_fevereiro_2026.xlsm', data: '01/03/2026 14:30', status: 'autorizada' as NoteStatus, registros: 16 },
  { id: '3', arquivo: 'ajuste_jan_2026.xlsm', data: '05/02/2026 11:00', status: 'rejeitada' as NoteStatus, registros: 3 },
  { id: '4', arquivo: 'notas_jan_2026.xlsm', data: '02/02/2026 08:45', status: 'autorizada' as NoteStatus, registros: 22 },
]
