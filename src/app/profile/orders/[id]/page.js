"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { usePathname } from "next/navigation";

const Showorder = () => {
  const pathname = usePathname();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [lproducts, setListProducts] = useState("");
  const [totalprice, SetTotalPrice] = useState("");
  const [pricedeliver, setPriceDeliver] = useState("");
  const [Method, setMethod] = useState("");
  const [statusorder, setStatusOrder] = useState("");
  const getInfo = async (input_params) => {
    try {
      const data = await fetch(`/api/Orders/GetOrderInvoice?${input_params}`);
      const response = await data.json();
      if (response) {
        setFirstName(response?.tbl_shipment.f_n_shipment);
        setLastName(response?.tbl_shipment.l_n_shipment);
        setPhone(response?.tbl_shipment.phone_shipment);
        setAddress(response?.tbl_shipment.address_shipment);
        setLandline(response?.tbl_shipment.landline_shipment);
        setState(response?.tbl_shipment.state_shipment);
        setCity(response?.tbl_shipment.city_shipment);
        setZipCode(response?.tbl_shipment.zip_code_shipment);
        setListProducts(response?.l_products);
        SetTotalPrice(response?.total_price);
        setPriceDeliver(response?.price_deliver);
        setMethod(response?.method_sending);
        setStatusOrder(response?.status_order);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };
  useEffect(() => {
    const order_code = pathname.split("/").pop();
    const input_params = new URLSearchParams({
      order_code: order_code,
    });
    getInfo(input_params);
  }, []);
  return (
    <>
      <div className="w-[80%] mx-auto"> 
        <div>
          <h2> فروشنده</h2>

          <p> فروشگاه اینترنتی هیدروژنوس </p>
          <div className="flex flex-row items-center">
            <p> آدرس</p>
            <p>
              اراک - پارک علم و فناوری استان مرکزی - شرکت اکسیر سازان نو اندیش
              پیشروفن
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="fw-bold">کد پستی </p>
            <p className="me-1"> </p>
            <p> 3836134054</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2> گیرنده</h2>
          <div className="flex flex-row items-center gap-2">
            <p>نام و نام خانوادگی</p>
            <p>{firstname + " " + lastname}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>شماره موبایل</p>
            <p>{phone}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>شماره تلفن</p>
            <p>{landline}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>استان</p>
            <p>{state}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>شهر</p>
            <p>{city}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>ادرس</p>
            <p>{Address}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p> کد پستی</p>
            <p>{zipcode}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>نام محصول</TableColumn>
              <TableColumn>تعداد</TableColumn>
              <TableColumn>قیمت</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <div className="flex flex-row items-center gap-2">
              <p>هزینه ارسال</p>
              <p>{pricedeliver}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>مجموع سفارش</p>
              <p>{totalprice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Showorder;
