export interface Photo {
  id: string;
  album_ids?: string[];
  filename?: string;
  photo_time?: string;
  // file_path: string; // Deprecated/Excluded
  url: string;
  thumbnail_url: string;
  upload_time: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface UserInfo {
  nickname: string;
  avatarUrl: string;
}

export interface TimeMetrics {
  totalPhotos: number;
  accompanyDays: number;
  firstPhotoDate?: string;
  lastPhotoDate?: string;
  lateNightPhotoCount?: number;
  photoDates: string[];
}

export interface MemoryMetrics {
  categoryDistribution: { name: string; value: number }[];
  topPersonCount: number;
  topLocation: string;
  maxPhotoDay: string; // Date string
  maxPhotoDayCount: number;
  topFeature: string;
  topFeatureCount: number;
}

export interface CarouselGroup {
  id: string;
  locationName: string;
  photos: string[];
}

export interface EmotionMetrics {
  starredPhotos: number;
  backupPhotos: number;
  totalOpenTimes: number;
  totalVideoDuration: number; // 总视频播放时长（秒）
  starredPhotosList: string[]; // URLs
  sharedPhotosList: string[]; // URLs
  emotionCarouselGroups: CarouselGroup[]; // New field for carousel
}

export interface LocationMetrics {
  lightenProvinceNum: number; // 年度点亮省份数量（核心）
  lightenCityNum: number;      // 年度点亮地级市数量（核心）
  topCities: Array<{           // 年度打卡TOP3城市（含照片数）
    cityName: string;
    photoCount: number;
    provinceName: string;
  }>;
  locationPoints: Array<{      // 地域点位列表（地图可视化用，含经纬度）
    lng: number;               // 经度
    lat: number;               // 纬度
    name: string;              // 地点名称
    count: number;             // 该地点拍摄照片数
    coverUrl?: string;         // 城市封面图
  }>;
  farthestCity: string; // 年度最远打卡城市
  farthestDistance: number; // 年度最远打卡城市距离（公里）
  farthestCityPhotos: Photo[]; // 年度最远打卡城市照片URL列表
}

export interface SeasonData {
  seasonName: '春' | '夏' | '秋' | '冬'; // 季节名称
  photoCount: number; // 该季节照片数量
  topTag: string; // 该季节TOP1智能标签（如春→“嫩芽”、夏→“蝉鸣”）
  representativePhoto: string; // 该季节代表性照片URL（取首图/高赞图）
  highlight: string; // 该季节核心亮点（人物/场景，如“和好友的12次夏日露营”）
  shootMonth: string; // 该季节高频拍摄月份（如“3-5月”）
}

export interface SeasonMetrics {
  seasonList: SeasonData[]; // 春/夏/秋/冬四季节数据数组
}

export interface EasterEgg {
  bestPhotoUrl: string;
  bestPhotoDate: string;
  tags: {
    main: string;
    sub: string[];
  };
}

export interface AnnualReportData {
  year: number;
  user: UserInfo;
  time: TimeMetrics;
  memory: MemoryMetrics;
  emotion: EmotionMetrics;
  location: LocationMetrics;
  season: SeasonMetrics;
  easterEgg: EasterEgg;
}
