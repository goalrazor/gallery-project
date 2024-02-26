import BigCarousel from "../../components/carousel/bigCarousel";
import SmallCarousel from "../../components/carousel/smallCarousel";
import styles from "./styles.module.css"
import { useAppDispatch } from "../../services/hooks/hooks";
import { FC, useEffect } from "react";
import { getImages } from "./actions";
interface IGalleryPage {
  itemsToShow?: number;
}
const GalleryPage: FC<IGalleryPage> = ({itemsToShow = 8}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getImages(itemsToShow))
  }, [dispatch])

  return (
    <main className={styles.root}>
      <h1 style={{display: 'none'}}>Галлерея</h1>
      <BigCarousel />
      <SmallCarousel itemsToShow={itemsToShow}/>
    </main>
  );
}

export default GalleryPage;