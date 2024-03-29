import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Periode from "pages/Periode";
import Anggaran from "./pages/Anggaran";
import Catatan from "./pages/Catatan";
import Detail from "./pages/Detail";
import GraphHarian from "./pages/GraphHarian";
import Menu from "./pages/Menu";
import PerTanggal from "./pages/PerTanggal";

export const appRoutes = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Menu />}></Route>

      <Route path="/periode" element={<Periode />}></Route>
      <Route path="/anggaran" element={<Anggaran />}></Route>
      <Route path="/detail" element={<Detail />}></Route>
      <Route path="/catatan" element={<Catatan />}></Route>
      <Route path="/pertanggal" element={<PerTanggal />}></Route>
      <Route path="/graph-harian" element={<GraphHarian />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
