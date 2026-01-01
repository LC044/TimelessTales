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

export async function getReportSummary(startTime: string, endTime: string): Promise<{user: UserInfo, time: TimeMetrics}> {
  const data = {
    user: {
      nickname: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    time: {
      totalPhotos: 100,
      accompanyDays: 365,
      photoDates: ['2023-01-01', '2023-12-31'],
      firstPhotoDate: '2023-01-01',
      lastPhotoDate: '2023-12-31',
      lateNightPhotoCount: 10
    },
  }
  return data
}

export async function getReportMemory(startTime: string, endTime: string): Promise<MemoryMetrics> {
  const data: MemoryMetrics = {
    categoryDistribution: [
        { name: '风景', value: 40 },
        { name: '人物', value: 30 },
        { name: '美食', value: 20 },
        { name: '其他', value: 10 }
    ],
    topPersonCount: 10,
    topLocation: '北京',
    maxPhotoDay: '2023-10-01',
    maxPhotoDayCount: 50,
    topFeature: '猫咪',
    topFeatureCount: 100
  }
  return data
}

export async function getReportLocation(startTime: string, endTime: string): Promise<LocationMetrics> {
  const data = {
    lightenProvinceNum: 5,
    lightenCityNum: 10,
    topCities: [
      { cityName: '北京', photoCount: 50, provinceName: '北京' },
      { cityName: '上海', photoCount: 30, provinceName: '上海' },
      { cityName: '广州', photoCount: 20, provinceName: '广东' },
    ],
    locationPoints: [
      { lng: 116.404, lat: 39.904, name: '北京', count: 50, coverUrl: 'https://example.com/cover.jpg' },
      { lng: 121.473, lat: 31.230, name: '上海', count: 30, coverUrl: 'https://example.com/cover.jpg' },
      { lng: 113.264, lat: 23.129, name: '广州', count: 20, coverUrl: 'https://example.com/cover.jpg' },
    ],
    farthestCity: '北京',
    farthestDistance: 1000,
    farthestCityPhotos: [
      { id: '1', url: 'https://example.com/photo.jpg', thumbnail_url: 'https://example.com/thumbnail.jpg', upload_time: '2023-01-01', size: 1024, width: 640, height: 480 },
      { id: '2', url: 'https://example.com/photo2.jpg', thumbnail_url: 'https://example.com/thumbnail2.jpg', upload_time: '2023-01-02', size: 2048, width: 1280, height: 960 },
  ],
  }
  return data
}

export async function getReportSeason(startTime: string, endTime: string): Promise<SeasonMetrics> {
  const data: SeasonMetrics = {
    seasonList: [
      { seasonName: '春', photoCount: 20, topTag: '嫩芽', representativePhoto: 'https://example.com/photo.jpg', highlight: '和好友的12次夏日露营', shootMonth: '3-5月' },
      { seasonName: '夏', photoCount: 30, topTag: '蝉鸣', representativePhoto: 'https://example.com/photo2.jpg', highlight: '和好友的10次夏日野餐', shootMonth: '6-8月' },
      { seasonName: '秋', photoCount: 25, topTag: '落叶', representativePhoto: 'https://example.com/photo3.jpg', highlight: '和好友的8次秋季登山', shootMonth: '9-11月' },
      { seasonName: '冬', photoCount: 15, topTag: '雪花', representativePhoto: 'https://example.com/photo4.jpg', highlight: '和好友的5次冬季骑行', shootMonth: '12-2月' },
    ],
  }
  return data
}

export async function getReportEmotion(startTime: string, endTime: string): Promise<EmotionMetrics> {
  const data: EmotionMetrics = {
    starredPhotos: 20,
    backupPhotos: 10,
    totalOpenTimes: 500,
    totalVideoDuration: 3600,
    starredPhotosList: [],
    sharedPhotosList: [],
    emotionCarouselGroups: []
  }
  return data
}

export async function getReportEasterEgg(startTime: string, endTime: string): Promise<EasterEgg> {
  const data: EasterEgg = {
    bestPhotoUrl: 'https://example.com/best.jpg',
    bestPhotoDate: '2023-05-20',
    tags: {
        main: 'Love',
        sub: ['Happy', 'Sweet']
    }
  }
  return data;
}

export async function getAnnualReportPhotos(startTime: string, endTime: string): Promise<Record<number, Photo[]>> {
  const data = {
    1: [
        { id: '1', url: 'https://example.com/photo.jpg', thumbnail_url: 'https://example.com/thumbnail.jpg', upload_time: '2023-01-01', size: 1024, width: 640, height: 480 }
    ]
  }
  return data
}
