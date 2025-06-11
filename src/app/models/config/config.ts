export interface Config {
  playback: PlaybackConfig;
  track: TrackConfig;
  videoUrl: string;
  user: UserConfig;
  reload: number;
  passenger?: boolean;
  people?: boolean;
  realtime?: boolean;
}

interface PlaybackConfig {
  begin: number;
  end: number;
  subtitle: PlaybackSubtitleConfig;
}

interface PlaybackSubtitleConfig {
  begin: number;
  offset: number;
}

export interface TrackConfig {
  begin: number;
  duration: number;
  autoplay: boolean;
}
interface UserConfig {
  username: string;
  password: string;
}
