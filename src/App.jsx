// App.jsx
import { YearProvider } from "./context/YearContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Overview from "./sections/Overview";
import Revenue from "./sections/Revenue";
import Expenses from "./sections/Expenses";
import StudentGovernment from "./sections/StudentGovernment";
import Trends from "./sections/Trends";
import Events from "./sections/Events";

function App() {
  return (
    <YearProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Overview />
        <Revenue />
        <Expenses />
        <StudentGovernment />
        <Trends />
        <Events />
      </main>
      <Footer />
    </YearProvider>
  );
}

export default App;
