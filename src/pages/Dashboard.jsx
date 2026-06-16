import { useState, useMemo } from 'react';
import StatCard from '../components/dashboard/StatCard';
import MockChart from '../components/dashboard/MockChart';
import HierarchyTabs from '../components/dashboard/HierarchyTabs';
import EntityPicker from '../components/dashboard/EntityPicker';
import HealthBarChart from '../components/dashboard/HealthBarChart';
import ProjectList from '../components/dashboard/ProjectList';
import CompositionChart from '../components/dashboard/CompositionChart';
import {
  HIERARCHY_LEVELS,
  getDashboardData,
  getEntitiesForLevel,
} from '../data/mock';
import './Dashboard.css';

export default function Dashboard() {
  const [activeLevel, setActiveLevel] = useState('city');
  const entities = useMemo(() => getEntitiesForLevel(activeLevel), [activeLevel]);
  const [activeEntityId, setActiveEntityId] = useState(entities[0]?.id);

  const currentEntityId = entities.some((e) => e.id === activeEntityId)
    ? activeEntityId
    : entities[0]?.id;

  const data = getDashboardData(activeLevel, currentEntityId);

  const handleLevelChange = (level) => {
    setActiveLevel(level);
    const nextEntities = getEntitiesForLevel(level);
    setActiveEntityId(nextEntities[0]?.id);
  };

  return (
    <div className="page dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">{data.name}</h2>
          <p className="page-subtitle">{data.subtitle}</p>
        </div>
        <div className="dashboard-hierarchy-hint">
          城市 → 街区 → 社区 → 住房
        </div>
      </div>

      <HierarchyTabs
        levels={HIERARCHY_LEVELS}
        activeLevel={activeLevel}
        onChange={handleLevelChange}
      />

      <EntityPicker
        entities={entities}
        activeId={currentEntityId}
        onChange={setActiveEntityId}
      />

      <div className="dashboard-stats">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="dashboard-charts-row">
        <div className="dashboard-chart-main">
          <MockChart
            title={data.operationChart.title}
            labels={data.operationChart.labels}
            series={data.operationChart.series}
          />
        </div>
        <div className="dashboard-chart-side">
          <HealthBarChart
            title={data.healthChart.title}
            items={data.healthChart.items}
          />
        </div>
      </div>

      <div className="dashboard-bottom-row">
        <div className="dashboard-projects">
          <ProjectList projects={data.projects} />
        </div>
        {activeLevel === 'city' && data.compositionChart && (
          <div className="dashboard-composition">
            <CompositionChart
              title={data.compositionChart.title}
              items={data.compositionChart.items}
            />
          </div>
        )}
        {activeLevel !== 'city' && (
          <div className="dashboard-composition">
            <HealthBarChart
              title="层级关联"
              items={[
                { label: '上级联动', value: 92, color: '#38bdf8' },
                { label: '数据同步', value: 88, color: '#818cf8' },
                { label: '告警传导', value: 85, color: '#34d399' },
                { label: '处置闭环', value: 79, color: '#fbbf24' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
