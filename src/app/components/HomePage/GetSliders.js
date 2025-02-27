import HomeSlider from "./HomeSlider";

const GetSliders = async() => {
    const data = await fetch("https://hydrogenous.vercel.app/api/GetSlider");
    const Response = await data.json();
    return ( 
        <>
        <HomeSlider data={Response}/>
        </>
     );
}
 
export default GetSliders;