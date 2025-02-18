"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
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
      <Button className="p-0 h-auto " variant="light" onPress={onOpen}>
        <div className="flex flex-row gap-1">
          <Badge
            color="danger"
            showOutline="false"
            content={<CounterBasket />}
            className="top-2 "
          ></Badge>
          <PiBasket className="text-2xl" />
        </div>
      </Button>
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
