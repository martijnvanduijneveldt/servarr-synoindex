import { spawn } from 'child_process';
import { Sonarr, SonarrRequest } from './sonarr-models';
import { Radarr, RadarrRequest } from './radarr-models';
import { Lidarr, LidarrRequest } from './lidarr-models';

import { logger } from './logger';

function execSynoIndex(args: string[]) {
  const prc = spawn('synoindex', args);
  logger.info('synoindex ', args.join(' '));
  //noinspection JSUnresolvedFunction
  // prc.stdout.setEncoding('utf8');
  // prc.stdout.on('data', (data) => {
  //   const str = data.toString()
  //   const lines = str.split(/(\r?\n)/g);
  //   winston.info(lines.join(""));
  // });

  prc.on('close', (code) => {
    logger.info(`synoindex ${args.join(' ')} exit code ${code}`);
  });
}

class SynoIndex {
  // synoindex -a filename
  static AddFile(path: string) {
    execSynoIndex(['-a', path]);
  }

  // synoindex -N newfullpath oldfullpath
  static UpgradeFile(newPath: string, previousPath: string) {
    execSynoIndex(['-N', newPath, previousPath]);
  }

  // synoindex -D filename
  static RemoveFile(path: string) {
    execSynoIndex(['-d', path]);
  }
}

export function synoIndexCallSonarr(request: SonarrRequest) {
  if (Sonarr.isDownload(request)) {
    SynoIndex.AddFile(request.episodeFile.path)
  }
  if (Sonarr.isUpgrade(request)) {
    SynoIndex.AddFile(request.episodeFile.path)
    if (request.deletedFiles) {
      request.deletedFiles.forEach(element => {
        SynoIndex.RemoveFile(element.path);
      });
    }
  }
  if (Sonarr.isRename(request)) {
    request.renamedEpisodeFiles.forEach(element => {
      SynoIndex.UpgradeFile(element.path, element.previousPath)
    });
  }
}

export function synoIndexCallRadarr(request: RadarrRequest) {
  if (Radarr.onDownload(request)) {
    SynoIndex.AddFile(request.movie.filePath)
    if (request.deletedFiles) {
      request.deletedFiles.forEach(element => {
        SynoIndex.RemoveFile(element.path);
      });
    }
  }
  if (Radarr.onRename(request)) {
    SynoIndex.AddFile(request.movie.filePath)
  }
  if (Radarr.onDelete(request) && request.deletedFiles === true) {
    SynoIndex.RemoveFile(request.movie.filePath)
  }
  if (Radarr.onDeleteFile(request)) {
    SynoIndex.AddFile(request.movie.filePath)
  }
}

export function synoIndexCallLidarr(request: LidarrRequest) {
  if (Lidarr.isDownload(request)) {
    request.trackFiles.forEach(element => {
      SynoIndex.AddFile(element.path);
    });
  }
  if (Lidarr.isUpgrade(request)) {
    request.trackFiles.forEach(element => {
      SynoIndex.AddFile(element.path);
    });
    // oldFiles is not exposed on webhook yet, needs a pull request
    if (request.deletedFiles) {
      request.deletedFiles.forEach(element => {
        SynoIndex.RemoveFile(element.path);
      });
    }
  }
  if (Lidarr.isRename(request)) {
    SynoIndex.AddFile(request.artist.path)
  }
}



