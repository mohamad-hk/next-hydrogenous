import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const DeleteAddress = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="danger" onPress={onOpen}>حذف آدرس</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                آیا از حذف آدرس اطمینان دارید؟
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
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
