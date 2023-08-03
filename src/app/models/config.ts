export interface Config {
  playback: PlaybackConfig;
  track: TrackConfig;
  videoUrl: string;
  user: UserConfig;
}

interface PlaybackConfig {
  begin: number;
  end: number;
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
