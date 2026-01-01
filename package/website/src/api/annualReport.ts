import type {
  Photo,
  UserInfo,
  TimeMetrics,
  MemoryMetrics,
  LocationMetrics,
  SeasonMetrics,
  EmotionMetrics,
  EasterEgg
} from '@/types/annualReport';
import axios from 'axios'

const API_BASE_URL = ''
const api = axios.create({ baseURL: API_BASE_URL })

// 辅助函数：生成随机整数
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// 辅助函数：生成随机图片URL
const getRandomImage = (width: number, height: number, id?: number) => `https://picsum.photos/${width}/${height}?random=${id || getRandomInt(1, 1000)}`;

export async function getReportSummary(startTime: string, endTime: string): Promise<{user: UserInfo, time: TimeMetrics}> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const data = {
    "user": {
        "nickname": "时光旅人",
        "avatarUrl": "/avatar.png"
    },
    "time": {
        "totalPhotos": 9471,
        "accompanyDays": 324,
        "firstPhotoDate": "2025-01-01",
        "lastPhotoDate": "2025-12-07",
        "lateNightPhotoCount": 387,
        "photoDates": [
            "2025-06-24",
            "2025-08-19",
            "2025-07-01",
            "2025-02-23",
            "2025-05-08",
            "2025-10-09",
            "2025-05-31",
            "2025-09-12",
            "2025-02-15",
            "2025-03-12",
            "2025-01-11",
            "2025-08-14",
            "2025-08-17",
            "2025-11-13",
            "2025-04-23",
            "2025-07-02",
            "2025-11-17",
            "2025-09-21",
            "2025-06-15",
            "2025-02-26",
            "2025-06-16",
            "2025-01-23",
            "2025-07-20",
            "2025-01-15",
            "2025-01-07",
            "2025-10-11",
            "2025-10-16",
            "2025-11-04",
            "2025-08-15",
            "2025-04-13",
            "2025-04-24",
            "2025-09-09",
            "2025-07-06",
            "2025-02-12",
            "2025-09-15",
            "2025-03-25",
            "2025-11-27",
            "2025-01-27",
            "2025-03-30",
            "2025-05-05",
            "2025-10-25",
            "2025-07-23",
            "2025-10-13",
            "2025-10-17",
            "2025-01-12",
            "2025-08-20",
            "2025-08-05",
            "2025-08-23",
            "2025-11-06",
            "2025-10-26",
            "2025-05-01",
            "2025-05-03",
            "2025-01-10",
            "2025-08-22",
            "2025-04-12",
            "2025-05-15",
            "2025-06-12",
            "2025-04-19",
            "2025-01-01",
            "2025-09-05",
            "2025-07-14",
            "2025-06-13",
            "2025-12-04",
            "2025-06-10",
            "2025-11-05",
            "2025-08-26",
            "2025-10-14",
            "2025-11-16",
            "2025-08-29",
            "2025-01-28",
            "2025-02-08",
            "2025-09-08",
            "2025-10-20",
            "2025-03-14",
            "2025-11-30",
            "2025-07-12",
            "2025-02-11",
            "2025-10-03",
            "2025-08-18",
            "2025-03-28",
            "2025-03-06",
            "2025-07-21",
            "2025-06-14",
            "2025-01-29",
            "2025-03-31",
            "2025-01-18",
            "2025-05-18",
            "2025-04-17",
            "2025-02-17",
            "2025-06-30",
            "2025-10-12",
            "2025-07-04",
            "2025-04-09",
            "2025-06-19",
            "2025-02-19",
            "2025-07-26",
            "2025-05-21",
            "2025-03-13",
            "2025-04-16",
            "2025-09-28",
            "2025-05-13",
            "2025-07-05",
            "2025-04-10",
            "2025-04-18",
            "2025-08-06",
            "2025-01-21",
            "2025-11-10",
            "2025-06-29",
            "2025-05-11",
            "2025-04-22",
            "2025-06-11",
            "2025-02-02",
            "2025-11-23",
            "2025-07-16",
            "2025-10-30",
            "2025-10-22",
            "2025-04-20",
            "2025-10-06",
            "2025-10-28",
            "2025-05-26",
            "2025-06-08",
            "2025-01-09",
            "2025-09-19",
            "2025-03-27",
            "2025-06-04",
            "2025-08-13",
            "2025-04-28",
            "2025-08-10",
            "2025-06-06",
            "2025-10-31",
            "2025-05-10",
            "2025-01-20",
            "2025-06-27",
            "2025-02-04",
            "2025-01-30",
            "2025-06-02",
            "2025-07-15",
            "2025-04-03",
            "2025-09-01",
            "2025-04-30",
            "2025-09-30",
            "2025-02-13",
            "2025-11-07",
            "2025-11-18",
            "2025-10-01",
            "2025-06-22",
            "2025-01-08",
            "2025-11-08",
            "2025-09-10",
            "2025-05-29",
            "2025-02-27",
            "2025-06-09",
            "2025-03-29",
            "2025-05-12",
            "2025-05-20",
            "2025-09-29",
            "2025-07-28",
            "2025-05-30",
            "2025-02-25",
            "2025-11-25",
            "2025-08-21",
            "2025-09-16",
            "2025-02-28",
            "2025-01-19",
            "2025-06-18",
            "2025-05-19",
            "2025-07-13",
            "2025-10-15",
            "2025-04-11",
            "2025-05-02",
            "2025-09-24",
            "2025-03-08",
            "2025-11-02",
            "2025-05-25",
            "2025-07-03",
            "2025-06-26",
            "2025-05-14",
            "2025-07-30",
            "2025-03-23",
            "2025-07-31",
            "2025-03-01",
            "2025-01-26",
            "2025-08-30",
            "2025-07-18",
            "2025-01-05",
            "2025-09-27",
            "2025-06-07",
            "2025-12-03",
            "2025-03-07",
            "2025-05-09",
            "2025-01-13",
            "2025-07-08",
            "2025-05-28",
            "2025-07-24",
            "2025-10-08",
            "2025-11-24",
            "2025-05-22",
            "2025-08-12",
            "2025-11-12",
            "2025-08-16",
            "2025-02-24",
            "2025-07-09",
            "2025-08-28",
            "2025-10-19",
            "2025-09-06",
            "2025-05-07",
            "2025-10-21",
            "2025-04-05",
            "2025-03-18",
            "2025-10-07",
            "2025-07-11",
            "2025-04-06",
            "2025-11-01",
            "2025-03-09",
            "2025-01-03",
            "2025-11-19",
            "2025-07-27",
            "2025-10-04",
            "2025-08-25",
            "2025-06-20",
            "2025-02-16",
            "2025-12-07",
            "2025-07-07",
            "2025-03-17",
            "2025-02-05",
            "2025-09-03",
            "2025-03-21",
            "2025-04-07",
            "2025-04-26",
            "2025-09-20",
            "2025-01-31",
            "2025-06-25",
            "2025-08-08",
            "2025-10-29",
            "2025-10-27",
            "2025-09-11",
            "2025-11-14",
            "2025-03-03",
            "2025-03-04",
            "2025-01-02",
            "2025-10-05",
            "2025-11-15",
            "2025-09-18",
            "2025-04-29",
            "2025-02-07",
            "2025-02-01",
            "2025-12-05",
            "2025-07-19",
            "2025-05-06",
            "2025-04-15",
            "2025-03-16",
            "2025-02-10",
            "2025-07-10",
            "2025-05-04",
            "2025-06-05",
            "2025-03-20",
            "2025-11-28",
            "2025-09-07",
            "2025-04-14",
            "2025-11-11",
            "2025-03-19",
            "2025-09-04",
            "2025-04-02",
            "2025-12-02",
            "2025-03-26",
            "2025-08-31",
            "2025-09-22",
            "2025-05-27",
            "2025-09-17",
            "2025-02-14",
            "2025-01-24",
            "2025-01-22",
            "2025-06-23",
            "2025-01-16",
            "2025-02-21",
            "2025-01-17",
            "2025-03-24",
            "2025-01-14",
            "2025-08-09",
            "2025-04-25",
            "2025-01-04",
            "2025-03-11",
            "2025-05-17",
            "2025-08-11",
            "2025-08-07",
            "2025-12-01",
            "2025-06-21",
            "2025-10-24",
            "2025-07-29",
            "2025-10-10",
            "2025-08-24",
            "2025-11-03",
            "2025-05-24",
            "2025-11-09",
            "2025-08-27",
            "2025-07-25",
            "2025-02-20",
            "2025-11-26",
            "2025-08-02",
            "2025-10-23",
            "2025-05-23",
            "2025-04-21",
            "2025-11-21",
            "2025-04-27",
            "2025-03-05",
            "2025-09-02",
            "2025-06-03",
            "2025-03-02",
            "2025-06-17",
            "2025-03-22",
            "2025-02-22",
            "2025-02-06",
            "2025-03-10",
            "2025-11-22",
            "2025-06-01",
            "2025-10-02",
            "2025-07-17",
            "2025-02-09",
            "2025-03-15",
            "2025-04-04",
            "2025-04-08",
            "2025-09-23",
            "2025-01-06",
            "2025-02-18"
        ]
    }
  }
  return data
}

export async function getReportMemory(startTime: string, endTime: string): Promise<MemoryMetrics> {
  await new Promise(resolve => setTimeout(resolve, 600));

  const data: MemoryMetrics = {
    categoryDistribution: [
        { name: '风景', value: 450 },
        { name: '人像', value: 320 },
        { name: '美食', value: 210 },
        { name: '建筑', value: 150 },
        { name: '宠物', value: 156 }
    ],
    topPersonCount: 128,
    topLocation: '杭州',
    maxPhotoDay: '2024-05-20',
    maxPhotoDayCount: 88,
    topFeature: '笑容',
    topFeatureCount: 365
  }
  return data
}

export async function getReportLocation(startTime: string, endTime: string): Promise<LocationMetrics> {
  await new Promise(resolve => setTimeout(resolve, 700));

  const data: LocationMetrics = {
    lightenProvinceNum: 8,
    lightenCityNum: 15,
    topCities: [
      { cityName: '杭州', photoCount: 320, provinceName: '浙江' },
      { cityName: '成都', photoCount: 180, provinceName: '四川' },
      { cityName: '大理', photoCount: 120, provinceName: '云南' },
    ],
    locationPoints: [
      { lng: 120.15507, lat: 30.274084, name: '浙江省', count: 320, coverUrl: getRandomImage(400, 300, 1) },
      { lng: 104.066541, lat: 30.572269, name: '四川省', count: 180, coverUrl: getRandomImage(400, 300, 2) },
      { lng: 100.267638, lat: 25.606486, name: '云南省', count: 120, coverUrl: getRandomImage(400, 300, 3) },
      { lng: 116.407526, lat: 39.90403, name: '北京市', count: 80, coverUrl: getRandomImage(400, 300, 4) },
      { lng: 121.473701, lat: 31.230416, name: '上海市', count: 60, coverUrl: getRandomImage(400, 300, 5) },
      { lng: 118.796877, lat: 32.060255, name: '江苏省', count: 45, coverUrl: getRandomImage(400, 300, 6) },
      { lng: 113.264385, lat: 23.129112, name: '广东省', count: 40, coverUrl: getRandomImage(400, 300, 7) },
      { lng: 114.305393, lat: 30.593099, name: '湖北省', count: 35, coverUrl: getRandomImage(400, 300, 8) },
      { lng: 108.93977, lat: 34.341574, name: '陕西省', count: 30, coverUrl: getRandomImage(400, 300, 9) },
      { lng: 106.551556, lat: 29.56301, name: '重庆市', count: 25, coverUrl: getRandomImage(400, 300, 10) },
    ],
    farthestCity: '拉萨',
    farthestDistance: 2800,
    farthestCityPhotos: [
      { id: '1', url: getRandomImage(800, 600, 11), thumbnail_url: getRandomImage(200, 150, 11), upload_time: '2024-07-15', size: 2048, width: 800, height: 600 },
      { id: '2', url: getRandomImage(800, 600, 12), thumbnail_url: getRandomImage(200, 150, 12), upload_time: '2024-07-16', size: 2048, width: 800, height: 600 },
      { id: '3', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '4', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '5', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '6', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '7', url: getRandomImage(800, 600, 11), thumbnail_url: getRandomImage(200, 150, 11), upload_time: '2024-07-15', size: 2048, width: 800, height: 600 },
      { id: '8', url: getRandomImage(800, 600, 12), thumbnail_url: getRandomImage(200, 150, 12), upload_time: '2024-07-16', size: 2048, width: 800, height: 600 },
      { id: '9', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '10', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '11', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '12', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '13', url: getRandomImage(800, 600, 11), thumbnail_url: getRandomImage(200, 150, 11), upload_time: '2024-07-15', size: 2048, width: 800, height: 600 },
      { id: '14', url: getRandomImage(800, 600, 12), thumbnail_url: getRandomImage(200, 150, 12), upload_time: '2024-07-16', size: 2048, width: 800, height: 600 },
      { id: '15', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '16', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
      { id: '17', url: getRandomImage(800, 600, 13), thumbnail_url: getRandomImage(200, 150, 13), upload_time: '2024-07-17', size: 2048, width: 800, height: 600 },
    ],
  }
  return data
}

export async function getReportSeason(startTime: string, endTime: string): Promise<SeasonMetrics> {
  await new Promise(resolve => setTimeout(resolve, 650));

  const data: SeasonMetrics = {
    seasonList: [
      { seasonName: '春', photoCount: 320, topTag: '樱花', representativePhoto: getRandomImage(800, 600, 21), highlight: '在太子湾公园的郁金香花海', shootMonth: '3-5月' },
      { seasonName: '夏', photoCount: 450, topTag: '海浪', representativePhoto: getRandomImage(800, 600, 22), highlight: '去海边追逐落日橘子海', shootMonth: '6-8月' },
      { seasonName: '秋', photoCount: 380, topTag: '枫叶', representativePhoto: getRandomImage(800, 600, 23), highlight: '满觉陇的桂花雨', shootMonth: '9-11月' },
      { seasonName: '冬', photoCount: 136, topTag: '初雪', representativePhoto: getRandomImage(800, 600, 24), highlight: '围炉煮茶的温暖时刻', shootMonth: '12-2月' },
    ],
  }
  return data
}

export async function getReportEmotion(startTime: string, endTime: string): Promise<EmotionMetrics> {
  await new Promise(resolve => setTimeout(resolve, 550));

  const data: EmotionMetrics = {
    starredPhotos: 52,
    backupPhotos: 1286,
    totalOpenTimes: 3650,
    totalVideoDuration: 12800,
    starredPhotosList: [
        getRandomImage(800, 600, 31),
        getRandomImage(800, 600, 32),
        getRandomImage(800, 600, 33),
        getRandomImage(800, 600, 34),
    ],
    sharedPhotosList: [
        getRandomImage(800, 600, 41),
        getRandomImage(800, 600, 42),
    ],
    emotionCarouselGroups: [
        {
            id: '1',
            locationName: '快乐瞬间',
            photos: [getRandomImage(800, 600, 51), getRandomImage(800, 600, 52), getRandomImage(800, 600, 53)]
        },
        {
            id: '2',
            locationName: '感动时刻',
            photos: [getRandomImage(800, 600, 61), getRandomImage(800, 600, 62)]
        }
    ]
  }
  return data
}

export async function getReportEasterEgg(startTime: string, endTime: string): Promise<EasterEgg> {
  await new Promise(resolve => setTimeout(resolve, 800));

  const data: EasterEgg = {
    bestPhotoUrl: getRandomImage(800, 1000, 99), // 竖图
    bestPhotoDate: '2024-10-01',
    tags: {
        main: '热爱',
        sub: ['自由', '探索', '记录']
    }
  }
  return data;
}

export async function getAnnualReportPhotos(startTime: string, endTime: string): Promise<Record<number, Photo[]>> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 生成12个月的随机照片
  const data: Record<number, Photo[]> = {};
  for (let month = 1; month <= 12; month++) {
      const count = getRandomInt(3, 8);
      data[month] = Array.from({ length: count }).map((_, idx) => ({
          id: `${month}-${idx}`,
          url: getRandomImage(800, 600, month * 100 + idx),
          thumbnail_url: getRandomImage(200, 150, month * 100 + idx),
          upload_time: `2024-${month.toString().padStart(2, '0')}-15`,
          size: 1024 * getRandomInt(500, 5000),
          width: 800,
          height: 600
      }));
  }
  return data
}
