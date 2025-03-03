import Cart from "../components/CartStore/ShowCart";
import Orderinfo from "../components/Shipment/OrderInfo";

const Basket = () => {
  return (
    <>
      <div className="grid max-w-[1200px] mx-auto grid-cols-[_minmax(800px,_1fr)_minmax(300px,_400px)] gap-x-10  p-10 min-h-[600px] ">
        <div className="shadow-lg rounded-xl p-3">
          <Cart />
        </div>
        <Orderinfo href={"/shipment"} button="ادامه خرید" />
      </div>
    </>
  );
};
export default Basket;
