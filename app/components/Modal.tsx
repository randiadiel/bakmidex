"use client";

import { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import { motion } from "framer-motion";

type NoodleStatus = "Halal" | "Non-Halal";

interface NoodleShop {
  name: string;
  address: string;
  status: NoodleStatus;
  style: string;
  hours: string;
  mapLink: string;
  history: string;
  gallery: string[];
}

interface ModalProps {
  shop: NoodleShop;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};


const placeholderHistory = "This legendary noodle house has been serving the community for over 40 years. Starting from a small cart, it has become a local institution, renowned for its secret family recipe passed down through three generations. The noodles are still handmade daily, ensuring the perfect texture and flavor that regulars have come to love.";

export default function Modal({ shop, onClose }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const statusBadgeClass = shop.status === "Halal" ? "halal-badge" : "non-halal-badge";
  const hasGallery = shop.gallery && shop.gallery.length > 0;
  const hasHistory = shop.history && shop.history !== placeholderHistory;

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
      >
        {hasGallery && (
          <div className="modal-cinematic-header">
            <ImageCarousel images={shop.gallery} />
          </div>
        )}

        <button
          onClick={onClose}
          className={`modal-close-button-cinematic ${!hasGallery ? 'modal-close-button-no-header' : ''}`}
        >
          &times;
        </button>

        <div className="modal-body-cinematic">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{shop.name}</h2>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadgeClass}`}>{shop.status}</span>
          </div>
          <p className="text-amber-600 font-semibold text-sm mb-4">{shop.style}</p>

          {hasHistory && (
            <>
              <h3 className="text-xl font-bold mb-2">The Story</h3>
              <p className="text-gray-700 text-sm leading-relaxed text-justify">{shop.history}</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}