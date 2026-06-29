export const SMART_REPORT_FEATURES = [
  {
    id: 'voice',
    path: '/smart-report/voice',
    icon: 'voice',
    title: '语音识别',
    description: '现场录音或上传语音材料，自动提取位置、问题类型和处置建议。',
    buttonText: '开始填报',
  },
  {
    id: 'image',
    path: '/smart-report/image',
    icon: 'image',
    title: '图像识别',
    description: '上传现场照片，识别积水、外墙损坏等问题并生成结构化记录。',
    buttonText: '进入功能',
  },
  {
    id: 'table',
    path: '/smart-report/table',
    icon: 'table',
    title: '智能表格',
    description: '通过评分、标签和备注快速完成城市体检检查表。',
    buttonText: '进入功能',
  },
];

export const SCORE_LABELS = {
  1: '严重问题',
  2: '较多问题',
  3: '基本合格',
  4: '状况良好',
  5: '状况优秀',
};

export const INSPECTION_ITEMS = [
  {
    id: 'structure',
    title: '房屋结构安全',
    description: '检查墙体、楼板、梁柱和沉降等结构安全隐患。',
    categories: [
      {
        name: '墙体问题',
        issues: ['墙体裂缝', '墙体倾斜', '墙体变形', '墙体渗水', '表面破损'],
      },
      { name: '楼板问题', issues: ['楼板裂缝', '楼板渗水', '楼板变形'] },
      {
        name: '梁柱问题',
        issues: ['梁体裂缝', '柱体裂缝', '混凝土剥落', '钢筋外露', '构件明显变形'],
      },
      { name: '地基与沉降', issues: ['地面沉降', '基础开裂', '门窗变形卡滞'] },
      { name: '其他结构问题', issues: ['疑似结构异常', '历史维修痕迹明显'] },
    ],
  },
  {
    id: 'facade',
    title: '建筑外墙安全',
    description: '检查外墙饰面、保温层、门窗和附属构件安全。',
    categories: [
      { name: '外墙饰面', issues: ['外墙空鼓', '饰面脱落', '外墙开裂'] },
      { name: '保温层', issues: ['保温层破损'] },
      { name: '门窗及附属构件', issues: ['门窗松动', '空调外机支架锈蚀'] },
      { name: '高空坠物风险', issues: ['广告牌或附属物松动'] },
    ],
  },
  {
    id: 'drainage',
    title: '排水与积水情况',
    description: '检查道路、庭院、雨水口和地下空间排水状况。',
    categories: [
      { name: '地面积水', issues: ['道路积水', '庭院积水'] },
      { name: '排水口堵塞', issues: ['雨水口堵塞', '排水速度较慢'] },
      { name: '管道问题', issues: ['管道破损'] },
      { name: '雨污混流', issues: ['污水外溢'] },
      { name: '地下空间渗漏', issues: ['地下室渗水'] },
    ],
  },
  {
    id: 'fire',
    title: '消防设施状态',
    description: '核查消防通道、消火栓、灭火器和疏散设施状态。',
    categories: [
      { name: '消防通道', issues: ['消防通道被占用'] },
      { name: '消火栓', issues: ['消火栓无法正常使用'] },
      { name: '灭火器', issues: ['灭火器缺失', '灭火器超过有效期'] },
      { name: '火灾报警设施', issues: ['报警设备损坏'] },
      { name: '疏散标识', issues: ['疏散指示灯损坏', '安全出口被遮挡'] },
    ],
  },
  {
    id: 'public',
    title: '公共空间环境',
    description: '检查道路铺装、照明、卫生、绿化和公共设施。',
    categories: [
      { name: '道路与铺装', issues: ['路面破损', '地砖松动', '井盖破损或缺失'] },
      { name: '照明设施', issues: ['路灯损坏'] },
      { name: '环境卫生', issues: ['垃圾堆积'] },
      { name: '绿化设施', issues: ['绿化缺失'] },
      { name: '公共设施', issues: ['座椅损坏', '健身设施损坏'] },
    ],
  },
  {
    id: 'accessibility',
    title: '无障碍设施',
    description: '检查通道、坡道、扶手、盲道和无障碍标识。',
    categories: [
      { name: '无障碍通道', issues: ['通道被占用'] },
      { name: '坡道', issues: ['坡道坡度不合理'] },
      { name: '扶手', issues: ['扶手缺失', '扶手损坏'] },
      { name: '盲道', issues: ['盲道中断', '盲道被占用'] },
      { name: '无障碍标识', issues: ['标识缺失', '无障碍入口无法正常使用'] },
    ],
  },
];

export function getScoreAdvice(score) {
  if (!score) return '尚未评分';
  if (score <= 2) return '建议立即处理';
  if (score === 3) return '建议持续观察';
  return '当前状况良好';
}

export function buildIssueAdvice(itemTitle, issues) {
  if (!issues.length) return '';
  return `${itemTitle}已选择${issues.length}项具体问题，建议建立复核任务并安排责任单位跟进。`;
}
