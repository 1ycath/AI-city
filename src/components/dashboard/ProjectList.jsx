import './ProjectList.css';

const STATUS_CLASS = {
  进行中: 'running',
  规划中: 'planned',
  已完成: 'done',
};

export default function ProjectList({ projects }) {
  return (
    <section className="project-list">
      <h3 className="project-list-title">治理项目</h3>
      <ul className="project-items">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <div className="project-item-header">
              <span className="project-name">{project.name}</span>
              <span className={`project-status ${STATUS_CLASS[project.status] ?? ''}`}>
                {project.status}
              </span>
            </div>
            <div className="project-meta">
              <span className="project-category">{project.category}</span>
              <span className="project-progress-text">{project.progress}%</span>
            </div>
            <div className="project-progress-track">
              <div
                className="project-progress-fill"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
