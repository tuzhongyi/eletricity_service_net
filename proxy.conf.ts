const PROXY_CONFIG = [
  {
    context: [
      '/api/howell/ver10/subtitling_service/',
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/amap/',
      '/api/howell/ver10/businesshall_service/',
      '/api/howell/ver10/Medium/',
    ],
    target: 'http://192.168.21.151:80',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/ws/video/Subtitling'],
    target: 'http://192.168.21.151:80',
    changeOrigin: true,
    secure: false,
  },
  {
    context: [, '/video/wsplayer/'],
    target: 'http://192.168.21.241:8800',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
