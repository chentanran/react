import { axiosInstance } from './config'
// 推荐页
export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

// 歌手页
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

// 排行榜
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
}

// 歌曲详情
export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
}

// 歌手详情
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
}

// 获取歌词接口
export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
}

// 搜索
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get (`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get (`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get (`/search?keywords=${query}`);
}

export const getSongDetailRequest = id => {
  return axiosInstance.get (`/song/detail?ids=${id}`);
}