export interface Image {
  id: string;
  url: string;
}

export interface GalleryState {
  images: Image[];
}

export type RawImage = {
  readonly height: number,
  readonly width: number
  readonly id: string,
  readonly url: string,
}
