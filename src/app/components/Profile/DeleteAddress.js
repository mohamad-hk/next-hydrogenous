import { AuthContext } from "@/app/context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

const DeleteAddress = ({ sh_id}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const input_params = new URLSearchParams({
    ship_id: sh_id,
  });
  const { user } = useContext(AuthContext);
  const removeAddress = async (input_params) => {
    try {
      const response = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Shipments/DeleteShipment?${input_params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("آدرس با موفقیت حذف شد");
        mutate(
          `https://hydrogenous.vercel.app/api/Profile/Shipments/GetShipment?cust_id=${user.customer_id}`
        );
      }
    } catch (error) {
      toast.error("مشکلی پیش اومده");
    }
    onOpenChange(false);
  };
  const deleteData = () => {
    removeAddress(input_params);
  };
  return (
    <>
      <Button color="danger" onPress={onOpen}>
        حذف آدرس
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                آیا از حذف آدرس اطمینان دارید؟
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose;
                    deleteData();
                  }}
                >
                  بله
                </Button>
                <Button color="primary" onPress={onClose}>
                  خیر
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteAddress;
