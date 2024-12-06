export interface RAWGAPIVolumeInfo {
    title: string;
    authors: string[];
    released: string;
    parent_platforms: string[];
    floatRating: number;
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
}

export interface RAWGAPIGame {
    id: string;
    volumeInfo: RAWGAPIVolumeInfo;
}
