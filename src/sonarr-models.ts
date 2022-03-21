export enum EventType {
  Grab = 'Grab',
  Download = 'Download',
  Rename = 'Rename',
  Test = 'Test'
}

export enum SerieTypes {
  STANDARD = 'STANDARD',
  DAILY = 'DAILY',
  ANIME = 'ANIME',
}

export interface Series {
  id: number;
  title: string;
  path: string; // "C:\\Temp\\sonarr\\Gravity Falls"
  tvdbId: number; // 259972
  tvMazeId: number; // 43820
  imdbId: string; // "tt11875316"
  type: SerieTypes;
}

export interface Episode {
  id: number;
  episodeNumber: number, // 14
  seasonNumber: number; // 2,
  title: string; // "The Stanchurian Candidate",
  airDate: string; // "2015-08-24",
  airDateUtc: Date // "2015-08-25T01:30:00Z"
  quality?: string; // "HDTV-720p",
  qualityVersion?: number; // 1
}

export interface WebhookEpisodeFile {
  id: number, // 1181
  relativePath: string, // "Season 02\\Gravity Falls - s02e14.mkv"
  path: string, // "C:\\path\\to\\file\\GravityFalls - s02e14.mkv"
  quality: string,
  qualityVersion: number
  releaseGroup: string;
  sceneName: string;
  size: number;
}

export interface WebhookRenamedEpisodeFile extends WebhookEpisodeFile {
  previousRelativePath: string;
  previousPath: string;
}

export interface Release {
  quality: string; // "HDTV-720p"
  qualityVersion: number; // 1
  size: number;
}

export interface OnDownload {
  eventType: EventType.Download;
  series: Series;
  episodes: Episode[];
  episodeFile: WebhookEpisodeFile;
  isUpgrade: false;
}

export interface OnUpgrade {
  eventType: EventType.Download;
  series: Series;
  episodes: Episode[];
  episodeFile: WebhookEpisodeFile;
  isUpgrade: true;
  deletedFiles: WebhookEpisodeFile[];
}

export interface OnRename {
  eventType: EventType.Rename;
  series: Series;
  renamedEpisodeFiles: WebhookRenamedEpisodeFile[];
}

export interface OnTest {
  eventType: EventType.Test;
  series: Series;
  episodes: Episode[];
}

export type SonarrRequest = OnTest | OnRename |  OnDownload | OnUpgrade;

export class Sonarr {
  static isDownload(request: SonarrRequest): request is OnDownload {
    return request.eventType === EventType.Download && (request as OnDownload).isUpgrade === false;
  }

  static isUpgrade(request: SonarrRequest): request is OnUpgrade {
    return request.eventType === EventType.Download && (request as OnUpgrade).isUpgrade === true;
  }

  static isRename(request: SonarrRequest): request is OnRename {
    return request.eventType === EventType.Rename;
  }

}