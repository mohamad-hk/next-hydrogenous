import Orderinfo from "../components/Shipment/OrderInfo";
import ShowAddresses from "../components/Shipment/ShowAddresses";

const Shipment = async () => {
  const data = await fetch("https://hydrogenous.vercel.app/api/GetShipment");
  const shipments = await data.json();
  return (
    <>
      <div className="grid mx-auto grid-cols-[_minmax(800px,_1fr)_minmax(100px,_300px)] gap-x-10 p-10 ">
        <ShowAddresses data={shipments} />
        <Orderinfo href={"/payment"} button="تایید و تکمیل سفارش" />
      </div>
    </>
  );
};
export default Shipment;
