import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const DeleteAddress = ({ sh_id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const input_params = new URLSearchParams({
    ship_id: sh_id,
  });

  const removeAddress = async (input_params) => {
    try {
      const response = await fetch(
        `https://hydrogenous.vercel.app/api/Shipments/DeleteShipment?${input_params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("done", result);
      } else {
        console.error("Failed to delete shipment:", result.error);
      }
    } catch (error) {
      console.error("Error deleting shipments:", error);
    }
  };
  const deleteData = () => {
    console.log(1);
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
