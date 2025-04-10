"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Badge,
} from "@heroui/react";
import Cart from "./ShowCart";
import { PiBasket } from "react-icons/pi";
import CounterBasket from "@/app/utils/CountBasket";
export default function ShowBasket() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div
        className="cursor-pointer hover:text-warning transition-all duration-500 ease-in-out text-white"
        onClick={onOpen}
      >
        <div className="flex flex-row gap-1">
          <Badge
            showOutline="false"
            content={<CounterBasket />}
            className="top-2 text-danger dark:text-warning md:text-warning bg-transparent "
          ></Badge>
          <PiBasket className="text-2xl text-black dark:text-white lg:text-white" />
        </div>
      </div>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className=" text-2xl">سبد خرید</DrawerHeader>
              <DrawerBody>
                <Cart close={onClose} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
