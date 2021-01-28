const ap = new APlayer({
  container: document.getElementById('aplayer'),
  autoplay: false, //自动播放
  listFolded: true, //播放列表默认折叠
  listMaxHeight: 90, //播放列表最大高度
  order: 'list', //音频循环顺序, 可选值: 'list', 'random'
  loop: 'all', //音频循环播放, 可选值: 'all', 'one', 'none'
  theme: '#e9e9e9', //切换音频时的主题色，优先级低于audio.theme
  preload: 'none', //音频预加载，可选值: 'none', 'metadata', 'auto'
  mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  lrcType: 3, //歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式）
  volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  // mini: true,
  // fixed: true, //吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
  audio: [{
      name: 'Let her go',
      artist: 'passenger',
      lrc: 'http://music.binjun.xyz/music/Let%20Her%20Go-Passenger.lrc',
      cover: 'https://p2.music.126.net/uYgsk7GFZ_C-dFPjN7V_Hg==/109951163450380228.jpg?param=130y130',
      url: 'https://music.163.com/song/media/outer/url?id=18161816.mp3'
  },
  {
      name: 'traveling light',
      artist: 'Joel Hanson,Sara Groves',
      lrc: 'http://music.binjun.xyz/misic/Traveling%20Light-Joel%20Hanson%2CSara%20Groves.lrc',
      cover: 'https://p1.music.126.net/zYqptzyHld2ylpb5FOoqDA==/1785606883508227.jpg?param=130y130',
      url: 'https://music.163.com/song/media/outer/url?id=1491585.mp3'
    }
  ]
});
//实现切换音频时，根据音频的封面图片自适应主题色
const colorThief = new ColorThief();
  const setTheme = (index) => {
  if (!ap.list.audios[index].theme) {
    colorThief.getColorAsync(ap.list.audios[index].cover, function(color) {
      ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
    });
  }
};
setTheme(ap.list.index);
ap.on('listswitch', (data) => {
  setTheme(data.index);
});