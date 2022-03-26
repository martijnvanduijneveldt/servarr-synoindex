export enum RadarrEventType {
  Test = 'Test',
  Grab = 'Grab',
  Download = 'Download',
  Rename = 'Rename',
  MovieDelete = 'MovieDelete',
  MovieFileDelete = 'MovieFileDelete',
  Health = 'Health',
}

export enum DeleteMediaFileReason {
  MissingFromDisk = 'MissingFromDisk',
  Manual = 'Manual',
  Upgrade = 'Upgrade',
  NoLinkedEpisodes = 'NoLinkedEpisodes',
  ManualOverride = 'ManualOverride',
}

export interface WebhookMovie {
  id: number;
  title: string;
  year: number;
  filePath: string;
  releaseDate: string;
  folderPath: string;
  tmdbId: number;
  imdbId: string;
}

export interface WebhookMovieFile {
  id: number;
  relativePath: string;
  path: string;
  quality: string;
  qualityVersion: number;
  releaseGroup: string;
  sceneName: string;
  indexerFlags: string;
  size: number;
}

export interface WebhookRemoteMovie {
  tmdbId: number;
  imdbId: string;
  title: string;
  year: number;
}

export interface WebhookImportPayload {
  eventType: RadarrEventType.Download;
  movie: WebhookMovie;
  remoteMovie: WebhookRemoteMovie;
  movieFile: WebhookMovieFile;
  isUpgrade: boolean;
  downloadClient: string;
  downloadId: string;
  deletedFiles?: WebhookMovieFile[];
}

export interface WebhookMovieFileDeletePayload {
  eventType: RadarrEventType.MovieFileDelete;
  movie: WebhookMovie;
  movieFile: WebhookMovieFile;
  deleteReason: DeleteMediaFileReason;
}

export interface WebhookRenamePayload {
  eventType: RadarrEventType.Rename;
  movie: WebhookMovie;
}

export interface WebhookMovieDeletePayload {
  eventType: RadarrEventType.MovieDelete,
  movie: WebhookMovie;
  deletedFiles: boolean;
}

export type RadarrRequest = WebhookImportPayload | WebhookMovieFileDeletePayload
| WebhookRenamePayload | WebhookMovieDeletePayload;

export class Radarr {
  static onDownload(request: RadarrRequest): request is WebhookImportPayload {
    return request.eventType === RadarrEventType.Download;
  }

  static onDelete(request: RadarrRequest): request is WebhookMovieDeletePayload {
    return request.eventType === RadarrEventType.MovieDelete;
  }

  static onRename(request: RadarrRequest): request is WebhookRenamePayload {
    return request.eventType === RadarrEventType.MovieFileDelete;
  }

  static onDeleteFile(request: RadarrRequest): request is WebhookMovieFileDeletePayload {
    return request.eventType === RadarrEventType.MovieFileDelete;
  }
}
