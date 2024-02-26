import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import styles from "./styles.module.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { setActiveImageIndex } from "../actions";

const BigCarousel = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(store => store.galleryReducer.images);
  const activeImageIndex = useAppSelector(store => store.carouselReducer.activeImageIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (src: string, event: SyntheticEvent) => {
    event.stopPropagation();
    setSelectedImage(src);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setActiveIndex(activeImageIndex)
  }, [activeImageIndex])

  const goToNextSlide = () => {
    let index = activeIndex;
    let imagesLength = images.length;
    index = ((index < imagesLength - 1) ? index + 1 : 0);
    setActiveIndex(index);
    dispatch(setActiveImageIndex(index))
  };

  const goToPrevSlide = () => {
    let index = activeIndex;
    let imagesLength = images.length;
    index = ((index > 0) ? index - 1 : imagesLength - 1);
    setActiveIndex(index);
    dispatch(setActiveImageIndex(index))
  };

  return (
    <div className={styles.slider} onClick={() => setShowModal(false)}>
      <div className={styles.sliderButton} onClick={goToPrevSlide}>
      </div>
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div key={index} className={index === activeIndex ? `${styles.activeSlide}` : `${styles.slide}`}>
            <img
              className={styles.image}
              src={image.url}
              alt=""
              onClick={(event) => openModal(image.url, event)}
            />
          </div>
        ))}
      </div>
      <div className={styles.sliderButton} onClick={goToNextSlide}>
      </div>
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <div
              className={styles.modalBackground}
              style={{
                backgroundImage: `url(${selectedImage})`,
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