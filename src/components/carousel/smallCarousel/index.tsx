import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { setActiveImageIndex } from "../actions";
import { getImages } from "../../../pages/galleryPage/actions";

interface ISmallCarousel {
  itemsToShow?: number;
}

const SmallCarousel: React.FC<ISmallCarousel> = ({ itemsToShow = 8 }) => {
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
    if (smallCarouselIndex > 0) {
      setSmallCarouselIndex(smallCarouselIndex - 1);
    }
  };

  const goToNextSlide = async () => {
    if (smallCarouselIndex >= images.length - itemsToShow) {
      await dispatch(getImages());
      setSmallCarouselIndex(smallCarouselIndex + 1);
    } else {
      setSmallCarouselIndex(smallCarouselIndex + 1);
    }
  }

  return (
    <div className={styles.galleryPreviewWrapper}>
      <button className={`${styles.prev} ${smallCarouselIndex === 0 && styles.disabledButton}`} onClick={goToPrevSlide} disabled={smallCarouselIndex === 0}>
        &#10094;
      </button>
      <ul className={styles.imagesList}>
        {images
          .map((image, index) => (
          <li key={index}
               className={`${(index >= smallCarouselIndex && index < smallCarouselIndex + itemsToShow) ? styles.activeSlide : styles.slide}
                ${index === bigCarouselIndex && styles.bigGalleryActiveImg}`}>
          <img src={image.url} alt="" onClick={() => handleImageClick(index)}/>
          </li>
        ))}
      </ul>
      <button className={styles.next} onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );

};

export default SmallCarousel;