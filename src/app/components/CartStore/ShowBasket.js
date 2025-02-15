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
      <Button variant="light" onPress={onOpen}>
        <Badge color="primary" content={<CounterBasket />}>
          <PiBasket className="text-2xl" />
        </Badge>
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className=" text-2xl">سبد خرید</DrawerHeader>
              <DrawerBody>
                <Cart />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
