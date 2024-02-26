import Gallery from "../components/carousel/bigCarousel";
import SmallCarousel from "../components/carousel/smallCarousel";
import styles from "./styles.module.css"

const GalleryPage = () => {
  return (
    <main className={styles.root}>
      <h1 style={{display: 'none'}}>Галлерея</h1>
      <Gallery />
      <SmallCarousel />
    </main>
  );
}

export default GalleryPage;