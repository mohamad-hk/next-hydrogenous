import Features from "./components/HomePage/Features";
import GetProducts from "./components/HomePage/GetProducts";
import GetSliders from "./components/HomePage/GetSliders";

export default function App() {
  return (
    <>
      <GetSliders />
      <Features />
      <GetProducts category={"ساشه"} />
      <GetProducts category={"پودر"} />
    </>
  );
}
