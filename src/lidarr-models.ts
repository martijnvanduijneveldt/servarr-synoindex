export enum EventType {
  Test = 'Test',
  Download = 'Download',
  Rename = 'Rename',
  Health = 'Health',
  Retag = 'Retag',
}

export enum HealthCheckResult {
  Ok = 'Ok',
  Notice = 'Notice',
  Warning = 'Warning',
  Error = 'Error',
}

export interface WebhookPayload {
  eventType: EventType;
}

export interface WebhookArtist {
  id: number;
  name: string;
  path: string;
  mBId: string;
}

export interface WebhookAlbum {
  id: number;
  title: string
  releaseDate: Date;

  quality: string
  qualityVersion: number;
  releaseGroup: string
  sceneName: string
}

export interface WebhookTrack {
  id: number
  title: string
  trackNumber: string

  quality: string
  qualityVersion: number
  releaseGroup: string
}

export interface WebhookTrackFile {
  id: number
  path: string
  quality: string
  qualityVersion: number
  releaseGroup: string
  sceneName: string
  size: number
}

export interface WebhookRelease {
  quality: string
  qualityVersion: number
  releaseGroup: string
  releaseTitle: string
  indexer: string
  size: number
}

export interface WebhookHealthPayload extends WebhookPayload {
  eventType: EventType.Health;

  Level: HealthCheckResult;
  Message: string;
  Type: string;
  WikiUrl: string;
}

export interface WebhookRetagPayload extends WebhookPayload {
  eventType: EventType.Retag;

  artist: WebhookArtist;
}

export interface WebhookImportPayload extends WebhookPayload {
  eventType: EventType.Download;

  artist: WebhookArtist
  tracks: WebhookTrack[]
  trackFiles: WebhookTrackFile[]
  isUpgrade: boolean
  downloadClient: string
  downloadId: string

  deletedFiles: WebhookTrackFile[];
}

export interface WebhookTestPayload extends WebhookPayload {
  eventType: EventType.Test;

  artist: WebhookArtist
  albums: WebhookAlbum[]
}

export interface WebhookRenamePayload extends WebhookPayload {
  eventType: EventType.Rename;

  artist: WebhookArtist;
}

export type LidarrRequest = WebhookTestPayload | WebhookHealthPayload | WebhookRetagPayload | WebhookImportPayload | WebhookRenamePayload;

export class Lidarr {
  static isDownload(request: LidarrRequest): request is WebhookImportPayload {
    return request.eventType === EventType.Download && (request as WebhookImportPayload).isUpgrade === false;
  }

  static isUpgrade(request: LidarrRequest): request is WebhookImportPayload {
    return request.eventType === EventType.Download && (request as WebhookImportPayload).isUpgrade === true;
  }

  static isRename(request: LidarrRequest): request is WebhookRenamePayload {
    return request.eventType === EventType.Rename;
  }

  static isTest(request: LidarrRequest): request is WebhookTestPayload {
    return request.eventType === EventType.Test;
  }

  static isHealth(request: LidarrRequest): request is WebhookHealthPayload {
    return request.eventType === EventType.Health;
  }
}
