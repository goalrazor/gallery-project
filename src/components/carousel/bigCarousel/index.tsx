import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import styles from "./styles.module.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { setActiveImageIndex } from "../actions";
import { getImages } from "../../../pages/galleryPage/actions";

const BigCarousel = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(store => store.galleryReducer.images);
  const activeImageIndex = useAppSelector(store => store.carouselReducer.activeImageIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (src: string, event: SyntheticEvent) => {
    event.stopPropagation();
    setSelectedImage(src);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setActiveIndex(activeImageIndex);
  }, [activeImageIndex]);

  const goToNextSlide = async () => {
    if (activeIndex === images.length - 1) {
      await dispatch(getImages());
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(activeIndex + 1);
    }
    dispatch(setActiveImageIndex(activeIndex + 1));
  };

  const goToPrevSlide = () => {
    if (activeIndex > 0) {
      dispatch(setActiveImageIndex(activeIndex - 1));
    }
  };

  return (
    <div className={styles.slider} onClick={() => setShowModal(false)}>
      <div className={`${styles.sliderButton} ${activeIndex === 0 && styles.disabledButton}`} onClick={goToPrevSlide}>
      </div>
      <ul className={styles.imageContainer}>
        {images.map((image, index) => (
          <li key={index} className={index === activeIndex ? `${styles.activeSlide}` : `${styles.slide}`}>
            <img
              className={styles.image}
              src={image.url}
              alt=""
              onClick={(event) => openModal(image.url, event)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.sliderButton} onClick={goToNextSlide}>
      </div>
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <div
              className={styles.modalBackground}
              style={{
                backgroundImage: `url(${selectedImage})`
              }}
            />
            <img className={styles.modalImage} src={selectedImage} alt="" />
          </div>
        </div>
      )}

    </div>
  );
};

export default BigCarousel;