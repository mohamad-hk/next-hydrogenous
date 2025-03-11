"use client";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Button,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import convertToPersianDate from "@/app/utils/ConvertToPersianDate";
import ShowPersianNumbers from "@/app/utils/ShowPersinaNumbers";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Showorder = () => {
  const invoiceRef = useRef(null);

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${order_code}_hydrogenous`);
  };
  const pathname = usePathname();
  const order_code = pathname.split("/").pop();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [lproducts, setListProducts] = useState([]);
  const [totalprice, SetTotalPrice] = useState("");
  const [pricedeliver, setPriceDeliver] = useState("");
  const [Method, setMethod] = useState("");
  const [statusorder, setStatusOrder] = useState("");
  const [orderdate, setOrderDate] = useState("");
  const getInfo = async (input_params) => {
    try {
      const data = await fetch(
        `/api/Profile/Orders/GetOrderInvoice?${input_params}`
      );
      const response = await data.json();
      console.log(response?.l_products);
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
        setOrderDate(response?.order_date);
      }
    } catch (error) {
      console.error("Error fetching shipments :", error);
    }
  };
  useEffect(() => {
    const input_params = new URLSearchParams({
      order_code: order_code,
    });
    getInfo(input_params);
  }, [order_code]);

  return (
    <>
      <div
        className="w-[90%] mx-auto border border-gray-400 rounded-md p-5 text-[16px] relative"
        ref={invoiceRef}
      >
        <div className="grid grid-cols-[1fr_240px] items-center mb-3">
          <div className="flex flex-row justify-center ">
            <Image
              src={"/images/statics/logo.png"}
              width={400}
              height={200}
              alt="image not found"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
              <p>شماره سفارش :</p>
              <p>{ShowPersianNumbers(order_code)}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>وضعیت سفارش :</p>
              <p>{statusorder}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>تاریخ سفارش :</p>
              <p>{convertToPersianDate(orderdate)}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>نحوه ارسال :</p>
              <p>{Method}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[80px_1fr]">
          <div className=" flex flex-col justify-center bg-slate-400 text-center rounded-r-md ">
            <p>فروشنده</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-400 border-r-0 rounded-md ps-3 py-3 rounded-tr-none rounded-br-none">
            <p> فروشگاه اینترنتی هیدروژنوس </p>
            <div className="flex flex-row items-center gap-2">
              <p> آدرس :</p>
              <p>
                اراک - پارک علم و فناوری استان مرکزی - شرکت اکسیر سازان نو اندیش
                پیشروفن
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="fw-bold">کد پستی : </p>
              <p className="me-1"> </p>
              <p> {ShowPersianNumbers(3836134054)} </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[80px_1fr]  my-2">
          <div className=" flex flex-col justify-center bg-slate-400 text-center rounded-r-md  ">
            <p>گیرنده</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-400 border-r-0 rounded-md ps-3 py-3 rounded-tr-none rounded-br-none">
            <div className="flex flex-row items-center gap-2">
              <p>نام و نام خانوادگی :</p>
              <p>{firstname + " " + lastname}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>شماره موبایل :</p>
              <p>{ShowPersianNumbers(phone)}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>شماره تلفن :</p>
              <p>{ShowPersianNumbers(landline)}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>استان :</p>
              <p>{state}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>شهر :</p>
              <p>{city}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>آدرس :</p>
              <p>{address}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p> کد پستی :</p>
              <p>{ShowPersianNumbers(zipcode)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Table
            removeWrapper
            className="border border-slate-400 rounded-md rounded-br-none"
          >
            <TableHeader>
              <TableColumn>نام محصول</TableColumn>
              <TableColumn>تعداد</TableColumn>
              <TableColumn>قیمت</TableColumn>
            </TableHeader>
            <TableBody>
              {lproducts.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex flex-col gap-3 items-end w-fit border border-slate-400 rounded-md border-t-0 rounded-tl-none rounded-tr-none ">
            <div className="flex flex-row items-center justify-center gap-2 px-3 pt-2 w-full">
              <p>هزینه ارسال :</p>
              <p>{PersianNumbers(pricedeliver)} تومان </p>
            </div>
            <Divider orientation="horzintal" />

            <div className="flex flex-row items-center justify-center gap-2 px-3 pb-2">
              <p>مجموع سفارش :</p>
              <p>{PersianNumbers(totalprice)} تومان </p>
            </div>
          </div>
        </div>
        <Button
          className="absolute left-0 -bottom-12"
          size="lg"
          color="primary"
          onPress={downloadInvoice}
        >
          دانلود فاکتور
        </Button>
      </div>
    </>
  );
};

export default Showorder;
