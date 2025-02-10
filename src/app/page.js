import Features from "./components/HomePage/Features";
import GetProducts from "./components/HomePage/GetProducts";
import HomeSlider from "./components/HomePage/HomeSlider";

export default function App() {
  return (
    <>
      <HomeSlider />
      <Features />
      <GetProducts category={"ساشه"} />
      <GetProducts category={"پودر"}/>
    </>
  );
}
