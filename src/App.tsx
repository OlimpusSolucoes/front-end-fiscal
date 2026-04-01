import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import ListaNotas from './pages/ListaNotas'
import Importacao from './pages/Importacao'
import EmissaoAvulsa from './pages/EmissaoAvulsa'
import Fechamento from './pages/Fechamento'
import Configuracoes from './pages/Configuracoes'
import CentralAjuda from './pages/CentralAjuda'
import Documentacao from './pages/Documentacao'
import ModeloEmail from './pages/ModeloEmail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notas" element={<ListaNotas />} />
          <Route path="/importacao" element={<Importacao />} />
          <Route path="/emissao-avulsa" element={<EmissaoAvulsa />} />
          <Route path="/fechamento" element={<Fechamento />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/ajuda" element={<CentralAjuda />} />
          <Route path="/documentacao" element={<Documentacao />} />
          <Route path="/modelo-email" element={<ModeloEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
