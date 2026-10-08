import Layout from "./components/Layout";
import Home from "./pages/Home";
import ReportOverview from "./pages/report-overview";
import Revenue from "./pages/revenue";
import Expenses from "./pages/expenses";
import BudgetTrends from "./pages/budget-trends";
import AboutUs from "./pages/about-us";

const pages = {
  "/": Home,
  "/report-overview": ReportOverview,
  "/revenue": Revenue,
  "/expenses": Expenses,
  "/budget-trends": BudgetTrends,
  "/about-us": AboutUs,
};

function App() {
  const Page = pages[window.location.pathname] || Home;

  return (
    <Layout>
      <main>
        <Page />
      </main>
    </Layout>
  );
}

export default App;