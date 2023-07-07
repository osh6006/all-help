"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  onClose: () => void;
  isOpen: boolean;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, isOpen, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image alt="Image" className="object-cover" src={src} fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
