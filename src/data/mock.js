export const APP_NAME = 'AI城市医生';

export const HIERARCHY_LEVELS = [
  { id: 'city', label: '城市' },
  { id: 'block', label: '街区' },
  { id: 'community', label: '社区' },
  { id: 'housing', label: '住房' },
];

export const cityStats = {
  population: {
    label: '城市人口',
    value: '2,847,392',
    unit: '人',
    trend: '+1.2%',
    trendUp: true,
    icon: 'population',
  },
  risk: {
    label: '综合风险指数',
    value: '23.4',
    unit: '/ 100',
    trend: '-4.1%',
    trendUp: false,
    icon: 'risk',
  },
  traffic: {
    label: '交通畅通率',
    value: '87.6',
    unit: '%',
    trend: '+2.8%',
    trendUp: true,
    icon: 'traffic',
  },
  health: {
    label: '城市健康指数',
    value: '86.2',
    unit: '分',
    trend: '+1.5%',
    trendUp: true,
    icon: 'health',
  },
};

export const chartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  series: [
    { name: '能耗 (MW)', values: [420, 380, 520, 680, 710, 640, 480] },
    { name: '流量 (k)', values: [12, 8, 45, 62, 58, 38, 15] },
  ],
};

export const hierarchyDashboard = {
  city: {
    id: 'city-01',
    name: '智慧新城',
    subtitle: '全市运行总览 · 四层级联动监测',
    stats: [
      { label: '管辖街区', value: '5', unit: '个', trend: '稳定', trendUp: true, icon: 'block' },
      { label: '覆盖社区', value: '28', unit: '个', trend: '+2', trendUp: true, icon: 'community' },
      { label: '住房单元', value: '12,640', unit: '户', trend: '+186', trendUp: true, icon: 'housing' },
      { label: '城市健康指数', value: '86.2', unit: '分', trend: '+1.5%', trendUp: true, icon: 'health' },
    ],
    projects: [
      { id: 1, name: '城市大脑 2.0 升级', category: '数字化', status: '进行中', progress: 72 },
      { id: 2, name: '全域管网数字化改造', category: '基础设施', status: '进行中', progress: 58 },
      { id: 3, name: '绿色建筑认证推广', category: '环保', status: '规划中', progress: 15 },
      { id: 4, name: '智慧交通信号优化', category: '交通', status: '进行中', progress: 81 },
      { id: 5, name: '社区养老服务中心扩建', category: '民生', status: '已完成', progress: 100 },
    ],
    operationChart: {
      title: '城市运行趋势 · 24h',
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      series: [
        { name: '能耗 (MW)', values: [420, 380, 520, 680, 710, 640, 480] },
        { name: '交通流量 (k)', values: [12, 8, 45, 62, 58, 38, 15] },
      ],
    },
    healthChart: {
      title: '四层级健康指数',
      items: [
        { label: '城市', value: 86, color: '#38bdf8' },
        { label: '街区', value: 82, color: '#818cf8' },
        { label: '社区', value: 88, color: '#34d399' },
        { label: '住房', value: 79, color: '#fbbf24' },
      ],
    },
    compositionChart: {
      title: '监测对象分布',
      items: [
        { label: '住房单元', value: 12640, color: '#38bdf8' },
        { label: '社区节点', value: 28, color: '#818cf8' },
        { label: '街区网格', value: 5, color: '#34d399' },
        { label: '重点建筑', value: 5, color: '#f472b6' },
      ],
    },
  },
  blocks: [
    {
      id: 'block-east',
      name: '东区街区',
      zoneId: 'A-12',
      subtitle: '商务与居住混合区 · 2 个社区',
      stats: [
        { label: '常住人口', value: '68,420', unit: '人', trend: '+0.8%', trendUp: true, icon: 'population' },
        { label: '管网压力', value: '0.42', unit: 'MPa', trend: '+6%', trendUp: false, icon: 'risk' },
        { label: '社区数量', value: '6', unit: '个', trend: '稳定', trendUp: true, icon: 'community' },
        { label: '街区健康', value: '78.5', unit: '分', trend: '-2.1%', trendUp: false, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '东区管网压力调控', category: '应急', status: '进行中', progress: 45 },
        { id: 2, name: '智慧路灯节能改造', category: '能源', status: '进行中', progress: 63 },
        { id: 3, name: '街区慢行系统完善', category: '交通', status: '规划中', progress: 20 },
      ],
      operationChart: {
        title: '东区运行趋势 · 24h',
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        series: [
          { name: '管网压力', values: [0.35, 0.34, 0.38, 0.42, 0.44, 0.41, 0.37] },
          { name: '用电负荷 (MW)', values: [28, 22, 45, 62, 58, 48, 30] },
        ],
      },
      healthChart: {
        title: '街区健康维度',
        items: [
          { label: '基础设施', value: 75, color: '#38bdf8' },
          { label: '环境卫生', value: 82, color: '#34d399' },
          { label: '公共安全', value: 88, color: '#818cf8' },
          { label: '居民满意度', value: 71, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'block-south',
      name: '南环街区',
      zoneId: 'B-07',
      subtitle: '交通枢纽核心区 · 1 个社区',
      stats: [
        { label: '日车流量', value: '128k', unit: '辆', trend: '+12%', trendUp: false, icon: 'traffic' },
        { label: '拥堵指数', value: '7.2', unit: '/ 10', trend: '+1.4', trendUp: false, icon: 'risk' },
        { label: '公交准点率', value: '91.3', unit: '%', trend: '-3%', trendUp: false, icon: 'traffic' },
        { label: '街区健康', value: '72.1', unit: '分', trend: '-4.5%', trendUp: false, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '南环拥堵疏导方案', category: '交通', status: '进行中', progress: 55 },
        { id: 2, name: '枢纽站安防升级', category: '安防', status: '进行中', progress: 70 },
        { id: 3, name: '换乘指引系统优化', category: '数字化', status: '已完成', progress: 100 },
      ],
      operationChart: {
        title: '南环交通趋势 · 24h',
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        series: [
          { name: '车流量 (k)', values: [8, 5, 42, 68, 72, 55, 18] },
          { name: '平均车速 (km/h)', values: [62, 68, 28, 18, 22, 35, 58] },
        ],
      },
      healthChart: {
        title: '街区健康维度',
        items: [
          { label: '交通运行', value: 65, color: '#f87171' },
          { label: '枢纽服务', value: 78, color: '#38bdf8' },
          { label: '环境卫生', value: 80, color: '#34d399' },
          { label: '应急能力', value: 74, color: '#818cf8' },
        ],
      },
    },
    {
      id: 'block-west',
      name: '西区街区',
      zoneId: 'C-03',
      subtitle: '科研教育片区 · 5 个社区',
      stats: [
        { label: '科研从业人员', value: '15,200', unit: '人', trend: '+3.2%', trendUp: true, icon: 'population' },
        { label: '空气质量 AQI', value: '42', unit: '', trend: '-8', trendUp: true, icon: 'health' },
        { label: '社区数量', value: '5', unit: '个', trend: '稳定', trendUp: true, icon: 'community' },
        { label: '街区健康', value: '91.4', unit: '分', trend: '+0.6%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '西区数据中心扩容', category: '数字化', status: '进行中', progress: 88 },
        { id: 2, name: '园区绿道连通工程', category: '民生', status: '进行中', progress: 52 },
        { id: 3, name: '空气质量监测站增设', category: '环保', status: '已完成', progress: 100 },
      ],
      operationChart: {
        title: '西区环境趋势 · 24h',
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        series: [
          { name: 'AQI', values: [38, 35, 42, 48, 45, 40, 36] },
          { name: '用电负荷 (MW)', values: [55, 48, 72, 85, 82, 70, 52] },
        ],
      },
      healthChart: {
        title: '街区健康维度',
        items: [
          { label: '生态环境', value: 94, color: '#34d399' },
          { label: '科研配套', value: 90, color: '#38bdf8' },
          { label: '社区服务', value: 88, color: '#818cf8' },
          { label: '住房品质', value: 86, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'block-north',
      name: '北区街区',
      zoneId: 'D-01',
      subtitle: '政务公共服务区 · 4 个社区',
      stats: [
        { label: '日均办事量', value: '3,280', unit: '件', trend: '+5%', trendUp: true, icon: 'population' },
        { label: '安防在线率', value: '99.2', unit: '%', trend: '稳定', trendUp: true, icon: 'risk' },
        { label: '消防巡检完成', value: '100', unit: '%', trend: '达标', trendUp: true, icon: 'health' },
        { label: '街区健康', value: '89.7', unit: '分', trend: '+0.3%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '政务大厅无纸化改造', category: '数字化', status: '进行中', progress: 76 },
        { id: 2, name: '北区消防演练月', category: '安防', status: '进行中', progress: 40 },
        { id: 3, name: '便民服务中心升级', category: '民生', status: '规划中', progress: 25 },
      ],
      operationChart: {
        title: '北区服务趋势 · 24h',
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        series: [
          { name: '办事量', values: [0, 0, 120, 280, 320, 180, 20] },
          { name: '安防告警', values: [2, 1, 3, 5, 4, 3, 2] },
        ],
      },
      healthChart: {
        title: '街区健康维度',
        items: [
          { label: '政务服务', value: 92, color: '#38bdf8' },
          { label: '消防安全', value: 95, color: '#34d399' },
          { label: '公共安全', value: 91, color: '#818cf8' },
          { label: '设施完好', value: 87, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'block-center',
      name: '中心街区',
      zoneId: 'E-09',
      subtitle: '城市运营中枢 · 3 个社区',
      stats: [
        { label: '数据接入源', value: '1,248', unit: '个', trend: '+42', trendUp: true, icon: 'population' },
        { label: '系统可用率', value: '99.97', unit: '%', trend: '稳定', trendUp: true, icon: 'health' },
        { label: '联动响应', value: '4.2', unit: 'min', trend: '-0.8', trendUp: true, icon: 'traffic' },
        { label: '街区健康', value: '94.1', unit: '分', trend: '+0.2%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '城市医生 AI 助手上线', category: '数字化', status: '进行中', progress: 90 },
        { id: 2, name: '多源数据融合平台', category: '基础设施', status: '进行中', progress: 67 },
        { id: 3, name: '应急指挥演练系统', category: '安防', status: '已完成', progress: 100 },
      ],
      operationChart: {
        title: '中枢运行趋势 · 24h',
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        series: [
          { name: 'API 调用 (k)', values: [8, 6, 22, 38, 42, 35, 12] },
          { name: '告警处置 (件)', values: [3, 2, 8, 12, 10, 7, 4] },
        ],
      },
      healthChart: {
        title: '街区健康维度',
        items: [
          { label: '系统稳定', value: 98, color: '#34d399' },
          { label: '数据质量', value: 93, color: '#38bdf8' },
          { label: '响应效率', value: 91, color: '#818cf8' },
          { label: '协同联动', value: 89, color: '#fbbf24' },
        ],
      },
    },
  ],
  communities: [
    {
      id: 'comm-sunshine',
      name: '阳光社区',
      blockId: 'block-east',
      subtitle: '东区 · 住宅 1,240 户',
      stats: [
        { label: '常住人口', value: '3,680', unit: '人', trend: '+1.1%', trendUp: true, icon: 'population' },
        { label: '物业满意度', value: '88', unit: '%', trend: '+2%', trendUp: true, icon: 'health' },
        { label: '住房单元', value: '1,240', unit: '户', trend: '稳定', trendUp: true, icon: 'housing' },
        { label: '社区健康', value: '85.6', unit: '分', trend: '+0.4%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '电梯物联网改造', category: '安防', status: '进行中', progress: 68 },
        { id: 2, name: '社区垃圾分类示范点', category: '环保', status: '进行中', progress: 82 },
      ],
      operationChart: {
        title: '社区能耗趋势 · 24h',
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
        series: [
          { name: '用电 (MWh)', values: [12, 18, 28, 32, 15] },
          { name: '用水 (m³)', values: [80, 120, 200, 180, 90] },
        ],
      },
      healthChart: {
        title: '社区健康维度',
        items: [
          { label: '居住环境', value: 86, color: '#34d399' },
          { label: '物业服务', value: 88, color: '#38bdf8' },
          { label: '邻里安全', value: 84, color: '#818cf8' },
          { label: '便民设施', value: 82, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'comm-green',
      name: '翠苑社区',
      blockId: 'block-west',
      subtitle: '西区 · 住宅 980 户',
      stats: [
        { label: '常住人口', value: '2,940', unit: '人', trend: '+0.5%', trendUp: true, icon: 'population' },
        { label: '绿化覆盖率', value: '42', unit: '%', trend: '+3%', trendUp: true, icon: 'health' },
        { label: '住房单元', value: '980', unit: '户', trend: '稳定', trendUp: true, icon: 'housing' },
        { label: '社区健康', value: '92.3', unit: '分', trend: '+0.8%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '屋顶花园改造', category: '环保', status: '进行中', progress: 55 },
        { id: 2, name: '社区书屋建设', category: '民生', status: '已完成', progress: 100 },
      ],
      operationChart: {
        title: '社区环境趋势 · 24h',
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
        series: [
          { name: 'AQI', values: [35, 38, 42, 40, 34] },
          { name: '噪音 (dB)', values: [42, 48, 52, 50, 43] },
        ],
      },
      healthChart: {
        title: '社区健康维度',
        items: [
          { label: '生态环境', value: 95, color: '#34d399' },
          { label: '居住舒适', value: 91, color: '#38bdf8' },
          { label: '文体活动', value: 88, color: '#818cf8' },
          { label: '老年关怀', value: 90, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'comm-hub',
      name: '枢纽社区',
      blockId: 'block-south',
      subtitle: '南环 · 住宅 860 户',
      stats: [
        { label: '常住人口', value: '2,150', unit: '人', trend: '-0.3%', trendUp: false, icon: 'population' },
        { label: '噪音投诉', value: '8', unit: '件/月', trend: '+2', trendUp: false, icon: 'risk' },
        { label: '住房单元', value: '860', unit: '户', trend: '稳定', trendUp: true, icon: 'housing' },
        { label: '社区健康', value: '74.8', unit: '分', trend: '-1.2%', trendUp: false, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '隔音屏障加装', category: '民生', status: '进行中', progress: 38 },
        { id: 2, name: '社区巴士接驳优化', category: '交通', status: '规划中', progress: 12 },
      ],
      operationChart: {
        title: '社区交通影响 · 24h',
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
        series: [
          { name: '噪音 (dB)', values: [45, 58, 62, 65, 48] },
          { name: '出行量', values: [20, 180, 320, 280, 40] },
        ],
      },
      healthChart: {
        title: '社区健康维度',
        items: [
          { label: '噪音控制', value: 62, color: '#f87171' },
          { label: '出行便利', value: 78, color: '#38bdf8' },
          { label: '环境卫生', value: 80, color: '#34d399' },
          { label: '商业配套', value: 76, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'comm-civic',
      name: '政务社区',
      blockId: 'block-north',
      subtitle: '北区 · 住宅 720 户',
      stats: [
        { label: '常住人口', value: '1,890', unit: '人', trend: '稳定', trendUp: true, icon: 'population' },
        { label: '适老化改造', value: '86', unit: '户', trend: '+12', trendUp: true, icon: 'housing' },
        { label: '住房单元', value: '720', unit: '户', trend: '稳定', trendUp: true, icon: 'housing' },
        { label: '社区健康', value: '90.1', unit: '分', trend: '+0.5%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '适老化扶手安装', category: '民生', status: '进行中', progress: 72 },
        { id: 2, name: '社区健康驿站', category: '医疗', status: '进行中', progress: 48 },
      ],
      operationChart: {
        title: '社区服务趋势 · 7d',
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '服务人次', values: [45, 52, 48, 60, 55, 28, 18] },
          { name: '健康咨询', values: [12, 15, 14, 18, 16, 8, 5] },
        ],
      },
      healthChart: {
        title: '社区健康维度',
        items: [
          { label: '养老服务', value: 92, color: '#34d399' },
          { label: '医疗可及', value: 88, color: '#38bdf8' },
          { label: '无障碍设施', value: 90, color: '#818cf8' },
          { label: '社区自治', value: 86, color: '#fbbf24' },
        ],
      },
    },
  ],
  housings: [
    {
      id: 'house-1201',
      name: '阳光社区 3栋 1201',
      communityId: 'comm-sunshine',
      subtitle: '住宅单元 · 89m² · 3人户',
      stats: [
        { label: '室内空气质量', value: '优', unit: '', trend: '稳定', trendUp: true, icon: 'health' },
        { label: '日均用电', value: '8.6', unit: 'kWh', trend: '-5%', trendUp: true, icon: 'traffic' },
        { label: '设备在线', value: '12', unit: '台', trend: '全部正常', trendUp: true, icon: 'housing' },
        { label: '住房健康', value: '91.2', unit: '分', trend: '+0.3%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '智能门锁升级', category: '安防', status: '已完成', progress: 100 },
        { id: 2, name: '漏水传感器安装', category: '基础设施', status: '进行中', progress: 60 },
      ],
      operationChart: {
        title: '住房能耗趋势 · 7d',
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '用电 (kWh)', values: [9.2, 8.8, 8.5, 8.6, 9.0, 7.2, 6.8] },
          { name: '用水 (L)', values: [180, 165, 170, 160, 175, 140, 130] },
        ],
      },
      healthChart: {
        title: '住房健康维度',
        items: [
          { label: '室内环境', value: 93, color: '#34d399' },
          { label: '能耗效率', value: 88, color: '#38bdf8' },
          { label: '设备安全', value: 92, color: '#818cf8' },
          { label: '居住舒适', value: 90, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'house-805',
      name: '翠苑社区 8栋 805',
      communityId: 'comm-green',
      subtitle: '住宅单元 · 105m² · 4人户',
      stats: [
        { label: '室内空气质量', value: '优', unit: '', trend: '稳定', trendUp: true, icon: 'health' },
        { label: '日均用电', value: '11.2', unit: 'kWh', trend: '+2%', trendUp: false, icon: 'traffic' },
        { label: '太阳能发电', value: '3.8', unit: 'kWh', trend: '+8%', trendUp: true, icon: 'health' },
        { label: '住房健康', value: '94.5', unit: '分', trend: '+0.6%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '阳台光伏板维护', category: '能源', status: '进行中', progress: 80 },
        { id: 2, name: '新风系统滤芯更换', category: '环保', status: '规划中', progress: 10 },
      ],
      operationChart: {
        title: '住房能源趋势 · 7d',
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '用电 (kWh)', values: [11, 10.8, 11.5, 11.2, 10.9, 9.5, 9.2] },
          { name: '发电 (kWh)', values: [3.2, 3.5, 4.1, 3.8, 3.6, 4.2, 4.0] },
        ],
      },
      healthChart: {
        title: '住房健康维度',
        items: [
          { label: '绿色能源', value: 96, color: '#34d399' },
          { label: '室内环境', value: 94, color: '#38bdf8' },
          { label: '智能设备', value: 91, color: '#818cf8' },
          { label: '空间利用', value: 89, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'house-502',
      name: '枢纽社区 5栋 502',
      communityId: 'comm-hub',
      subtitle: '住宅单元 · 72m² · 2人户',
      stats: [
        { label: '噪音监测', value: '58', unit: 'dB', trend: '+4dB', trendUp: false, icon: 'risk' },
        { label: '日均用电', value: '6.4', unit: 'kWh', trend: '稳定', trendUp: true, icon: 'traffic' },
        { label: '窗户隔音等级', value: '三级', unit: '', trend: '待升级', trendUp: false, icon: 'housing' },
        { label: '住房健康', value: '71.8', unit: '分', trend: '-1.5%', trendUp: false, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '隔音窗改造补贴申请', category: '民生', status: '进行中', progress: 35 },
        { id: 2, name: '室内降噪窗帘安装', category: '民生', status: '规划中', progress: 0 },
      ],
      operationChart: {
        title: '住房噪音趋势 · 24h',
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
        series: [
          { name: '室内噪音 (dB)', values: [42, 55, 62, 60, 45] },
          { name: '室外噪音 (dB)', values: [48, 62, 68, 70, 52] },
        ],
      },
      healthChart: {
        title: '住房健康维度',
        items: [
          { label: '噪音控制', value: 58, color: '#f87171' },
          { label: '室内环境', value: 78, color: '#38bdf8' },
          { label: '能耗效率', value: 82, color: '#34d399' },
          { label: '居住舒适', value: 68, color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'house-201',
      name: '政务社区 2栋 201',
      communityId: 'comm-civic',
      subtitle: '住宅单元 · 95m² · 2人户 · 适老化',
      stats: [
        { label: '跌倒监测', value: '正常', unit: '', trend: '无异常', trendUp: true, icon: 'health' },
        { label: '日均用电', value: '5.8', unit: 'kWh', trend: '-3%', trendUp: true, icon: 'traffic' },
        { label: '适老设备', value: '6', unit: '台', trend: '全部在线', trendUp: true, icon: 'housing' },
        { label: '住房健康', value: '93.6', unit: '分', trend: '+0.4%', trendUp: true, icon: 'health' },
      ],
      projects: [
        { id: 1, name: '卫生间扶手加装', category: '民生', status: '已完成', progress: 100 },
        { id: 2, name: '紧急呼叫按钮联网', category: '医疗', status: '进行中', progress: 85 },
      ],
      operationChart: {
        title: '适老设备监测 · 7d',
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '活动指数', values: [65, 72, 68, 70, 75, 80, 78] },
          { name: '设备告警', values: [0, 0, 1, 0, 0, 0, 0] },
        ],
      },
      healthChart: {
        title: '住房健康维度',
        items: [
          { label: '老年安全', value: 96, color: '#34d399' },
          { label: '无障碍', value: 94, color: '#38bdf8' },
          { label: '健康监测', value: 92, color: '#818cf8' },
          { label: '生活便利', value: 90, color: '#fbbf24' },
        ],
      },
    },
  ],
};

export function getDashboardData(level, entityId) {
  if (level === 'city') return hierarchyDashboard.city;
  if (level === 'block') {
    return hierarchyDashboard.blocks.find((b) => b.id === entityId) ?? hierarchyDashboard.blocks[0];
  }
  if (level === 'community') {
    return hierarchyDashboard.communities.find((c) => c.id === entityId) ?? hierarchyDashboard.communities[0];
  }
  return hierarchyDashboard.housings.find((h) => h.id === entityId) ?? hierarchyDashboard.housings[0];
}

export function getEntitiesForLevel(level) {
  if (level === 'city') return [{ id: hierarchyDashboard.city.id, name: hierarchyDashboard.city.name }];
  if (level === 'block') return hierarchyDashboard.blocks.map(({ id, name }) => ({ id, name }));
  if (level === 'community') return hierarchyDashboard.communities.map(({ id, name }) => ({ id, name }));
  return hierarchyDashboard.housings.map(({ id, name }) => ({ id, name }));
}

export const alerts = [
  { id: 1, level: 'high', title: '东区管网压力异常', time: '2 分钟前', zone: 'A-12', hierarchy: '街区 · 东区' },
  { id: 2, level: 'medium', title: '南环路段拥堵预警', time: '15 分钟前', zone: 'B-07', hierarchy: '街区 · 南环' },
  { id: 3, level: 'low', title: '翠苑社区空气质量优良', time: '1 小时前', zone: 'C-03', hierarchy: '社区 · 翠苑' },
  { id: 4, level: 'medium', title: '枢纽社区 502 噪音超标', time: '3 小时前', zone: 'B-07', hierarchy: '住房 · 5栋502' },
  { id: 5, level: 'low', title: '全市健康指数周报已生成', time: '5 小时前', zone: 'E-09', hierarchy: '城市' },
];

export const mapConfig = {
  center: [116.397428, 39.90923],
  zoom: 12,
};

export const STATUS_LABELS = {
  normal: '正常',
  warning: '预警',
  alert: '告警',
};

export const ZONE_MODELS = {
  'A-12': '/3Dmodels/part1.glb',
  'B-07': '/3Dmodels/part2.glb',
  'C-03': '/3Dmodels/part3.glb',
  'D-01': '/3Dmodels/part4.glb',
  'E-09': '/3Dmodels/part5.glb',
};

export const mapZones = [
  {
    id: 'A-12',
    name: '东区',
    lng: 116.45,
    lat: 39.92,
    status: 'warning',
    hierarchy: { block: 'block-east', community: 'comm-sunshine' },
    building: {
      name: '东域智慧大厦',
      description: '东区核心商务楼宇，集成 IoT 传感与能耗监测，当前管网压力略高需关注。',
      modelUrl: ZONE_MODELS['A-12'],
      floors: 32,
      area: '18,500 m²',
      builtYear: 2019,
    },
  },
  {
    id: 'B-07',
    name: '南环',
    lng: 116.38,
    lat: 39.88,
    status: 'alert',
    hierarchy: { block: 'block-south', community: 'comm-hub' },
    building: {
      name: '南环交通枢纽站',
      description: '城市南环综合交通枢纽，实时车流监测，当前路段拥堵指数偏高。',
      modelUrl: ZONE_MODELS['B-07'],
      floors: 4,
      area: '12,200 m²',
      builtYear: 2016,
    },
  },
  {
    id: 'C-03',
    name: '西区',
    lng: 116.35,
    lat: 39.91,
    status: 'normal',
    hierarchy: { block: 'block-west', community: 'comm-green' },
    building: {
      name: '西区科研中心',
      description: '西区研发与数据中心园区，环境传感器运行正常，空气质量优良。',
      modelUrl: ZONE_MODELS['C-03'],
      floors: 18,
      area: '22,800 m²',
      builtYear: 2021,
    },
  },
  {
    id: 'D-01',
    name: '北区',
    lng: 116.4,
    lat: 39.95,
    status: 'normal',
    hierarchy: { block: 'block-north', community: 'comm-civic' },
    building: {
      name: '北区行政综合楼',
      description: '北区政务与公共服务综合体，智慧安防与消防系统全在线。',
      modelUrl: ZONE_MODELS['D-01'],
      floors: 24,
      area: '15,600 m²',
      builtYear: 2018,
    },
  },
  {
    id: 'E-09',
    name: '中心',
    lng: 116.397428,
    lat: 39.90923,
    status: 'normal',
    hierarchy: { block: 'block-center' },
    building: {
      name: '城市运营指挥中心',
      description: '全市智慧城市运营中枢，汇聚交通、能源、安防等多源数据。',
      modelUrl: ZONE_MODELS['E-09'],
      floors: 28,
      area: '31,000 m²',
      builtYear: 2020,
    },
  },
];

export function getBuildingById(id) {
  return mapZones.find((zone) => zone.id === id) ?? null;
}

export const navItems = [
  { path: '/dashboard', label: '总览看板', icon: 'dashboard' },
  { path: '/map', label: '城市地图', icon: 'map' },
  { path: '/chat', label: '城市医生', icon: 'chat' },
  { path: '/alerts', label: '告警中心', icon: 'alerts' },
  { path: '/smart-report', label: '智能填报', icon: 'report' },
  { path: '/buildings', label: '建筑信息', icon: 'buildings' },
  { path: '/settings', label: '系统设置', icon: 'settings' },
];
