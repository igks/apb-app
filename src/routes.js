import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Menu from "./pages/Menu";
import Anggaran from "./pages/Anggaran";
import Detail from "./pages/Detail";
import Catatan from "./pages/Catatan";
import PerTanggal from "./pages/PerTanggal";
import GraphHarian from "./pages/GraphHarian";

export const appRoutes = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Menu />}></Route>
      <Route path="/anggaran" element={<Anggaran />}></Route>
      <Route path="/detail" element={<Detail />}></Route>
      <Route path="/catatan" element={<Catatan />}></Route>
      <Route path="/pertanggal" element={<PerTanggal />}></Route>
      <Route path="/graph-harian" element={<GraphHarian />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
