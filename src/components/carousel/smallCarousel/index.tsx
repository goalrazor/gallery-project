import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { setActiveImageIndex } from "../actions";

interface IGalleryPreview {
  itemsToShow?: number;
}

const SmallCarousel: React.FC<IGalleryPreview> = ({ itemsToShow = 8 }) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(store => store.galleryReducer.images);
  const bigCarouselIndex = useAppSelector(store => store.carouselReducer.activeImageIndex);
  const [smallCarouselIndex, setSmallCarouselIndex] = useState(Math.min(bigCarouselIndex, images.length - itemsToShow));

  useEffect(() => {
    if (bigCarouselIndex < smallCarouselIndex) {
      setSmallCarouselIndex(Math.max(bigCarouselIndex, 0));
    }
    if (bigCarouselIndex >= smallCarouselIndex + itemsToShow) {
      setSmallCarouselIndex(Math.min(bigCarouselIndex, images.length - itemsToShow));
    }
  }, [bigCarouselIndex, images.length, itemsToShow]);

  const handleImageClick = (index: number) => {
    dispatch(
      setActiveImageIndex(index)
    );
  };

  const goToPrevSlide = () => {
    if (smallCarouselIndex - 1 < 0) {
      setSmallCarouselIndex(images.length - itemsToShow);
    } else {
      setSmallCarouselIndex(smallCarouselIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (smallCarouselIndex + 1 >= images.length - itemsToShow + 1) {
      setSmallCarouselIndex(0);
    } else {
      setSmallCarouselIndex(smallCarouselIndex + 1);
    }
  }

  return (
    <div className={styles.galleryPreviewWrapper}>
      <button className={styles.prev} onClick={goToPrevSlide}>
        &#10094;
      </button>
      <div className={styles.imagesList}>
        <>
        {images
          .map((image, index) => (
          <div key={index}
               className={`${(index >= smallCarouselIndex && index < smallCarouselIndex + itemsToShow) ? styles.activeSlide : styles.slide}
                ${index === bigCarouselIndex && styles.bigGalleryActiveImg}`}>
          <img src={image.url} alt="" onClick={() => handleImageClick(index)}/>
          </div>
        ))}
        </>
      </div>
      <button className={styles.next} onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );

};

export default SmallCarousel;