
declare module 'yt-search' {  

  export = yts;

  declare const yts: typeof search & { search: typeof search };

  declare function search(
    query: string | yts.Options,
    callback: (err: Error | string | null | undefined, data: yts.SearchResult) => void,
): void;
  declare function search(
    query: string | yts.Options
  ): Promise<yts.SearchResult>;

  declare function search(
    query: yts.VideoMetadataOptions,
    callback: (err: Error | string | null | undefined, data: yts.VideoMetadataResult) => void,
): void;
  declare function search(
    query: yts.VideoMetadataOptions
  ): Promise<yts.VideoMetadataResult>;

  declare function search(
    query: yts.PlaylistMetadataOptions,
    callback: (err: Error | string | null | undefined, data: yts.PlaylistMetadataResult) => void,
): void;
  declare function search(
    query: string | yts.PlaylistMetadataOptions
  ): Promise<yts.PlaylistMetadataResult>;
  
  declare namespace yts {
    export interface OptionsWithQuery {
      query?: string;
    }
    export interface OptionsWithSearch {
      search?: string;
    }
  
    export type Options = OptionsWithQuery | OptionsWithSearch;

    export interface VideoMetadataOptions {
      videoId?: string;
    }

    export interface PlaylistMetadataOptions {
      listId?: string;
    }

    export interface VideoSearchResult {
        type: 'video';
        videoId: string;
        url: string;
        title: string;
        description: string;
        image: string;
        thumbnail: string;
        seconds: number;
        timestamp: string;
        duration: Duration;
        ago: string;
        views: number;
        author: Author;
    }

    export interface PlaylistSearchResult {
        type: 'list';
        listId: string;
        url: string;
        title: string;
        image: string;
        thumbnail: string;
        videoCount: number;
        author: Author;
    }

    export interface SearchResult {
        all: Array<VideoSearchResult | PlaylistSearchResult>;
        videos: VideoSearchResult[];
        playlists: PlaylistSearchResult[];
        lists: PlaylistSearchResult[];
    }

    export interface VideoMetadataResult {
        title: string;
        description: string;
        url: string;
        videoId: string;
        seconds: number;
        timestamp: string;
        duration: Duration;
        views: number;
        genre: string;
        uploadDate: string;
        ago: string;
        image: string;
        thumbnail: string;
        author: Author;
    }

    export interface PlaylistItem {
        title: string;
        videoId: string;
        listId: string;
        thumbnail: string;
        author: Author;
        url: string;
    }

    export interface PlaylistMetadataResult {
        title: string;
        listId: string;
        url: string;
        views: number;
        date: string;
        image: string;
        thumbnail: string;
        videos: PlaylistItem[];
        author: Author;
    }

  }

}



