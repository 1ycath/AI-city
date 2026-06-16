import './Settings.css';

const settingsMock = [
  {
    title: '通知设置',
    items: [
      { label: '实时告警推送', on: true },
      { label: '邮件摘要', on: false },
      { label: '声音提醒', on: true },
    ],
  },
  {
    title: '显示设置',
    items: [
      { label: '深色模式', on: true },
      { label: '数据动画', on: true },
      { label: '紧凑布局', on: false },
    ],
  },
];

export default function Settings() {
  return (
    <div className="page">
      <h2 className="page-title">系统设置</h2>
      <p className="page-subtitle">个性化与系统偏好配置</p>
      <div className="settings-grid">
        {settingsMock.map((section) => (
          <div key={section.title} className="settings-card">
            <h4>{section.title}</h4>
            {section.items.map((item) => (
              <div key={item.label} className="setting-row">
                <span>{item.label}</span>
                <div className={`setting-toggle${item.on ? '' : ' off'}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
