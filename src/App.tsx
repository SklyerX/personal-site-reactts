import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import {
  Banner,
  Footer,
  Navbar,
  Blog,
  Blogs,
  Home,
  Projects,
  Repos,
} from "./utils/exports/routes";

function App() {
  const trailer: HTMLDivElement = document.querySelector("#trailer")!;

  window.onmousemove = (e) => {
    const x = e.clientX - trailer.offsetWidth / 2,
      y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
      transform: `translate(${x}px, ${y}px)`,
    };

    trailer.animate(keyframes, {
      duration: 800,
      fill: "forwards",
    });
  };
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <>
{/*               <Banner /> */}
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
{/*               <Banner /> */}
              <Navbar />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/p/:id"
          element={
            <>
{/*               <Banner /> */}
              <Navbar />
              <Blog />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
{/*               <Banner /> */}
              <Navbar />
              <Projects />
              <Footer />
            </>
          }
        />
        <Route
          path="/repos"
          element={
            <>
{/*               <Banner /> */}
              <Navbar />
              <Repos />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
