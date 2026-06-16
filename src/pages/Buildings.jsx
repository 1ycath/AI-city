import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createBuilding,
  deleteBuilding,
  fetchBuildings,
  updateBuilding,
} from '../services/buildings';
import './Buildings.css';

const STATUS_OPTIONS = [
  { value: 'normal', label: '正常' },
  { value: 'warning', label: '预警' },
  { value: 'alert', label: '告警' },
];

const EMPTY_FORM = {
  code: '',
  name: '',
  zone_name: '',
  location: '',
  latitude: '',
  longitude: '',
  population: '',
  description: '',
  model_url: '',
  status: 'normal',
  floors: '',
  area: '',
  built_year: '',
};

function toForm(building) {
  if (!building) return { ...EMPTY_FORM };
  return {
    code: building.code ?? '',
    name: building.name ?? '',
    zone_name: building.zone_name ?? '',
    location: building.location ?? '',
    latitude: String(building.latitude ?? ''),
    longitude: String(building.longitude ?? ''),
    population: String(building.population ?? ''),
    description: building.description ?? '',
    model_url: building.model_url ?? '',
    status: building.status ?? 'normal',
    floors: String(building.floors ?? ''),
    area: building.area ?? '',
    built_year: building.built_year != null ? String(building.built_year) : '',
  };
}

function parseForm(form) {
  const latitude = Number(form.latitude);
  const longitude = Number(form.longitude);
  const population = Number.parseInt(form.population, 10);
  const floors = Number.parseInt(form.floors, 10);
  const builtYear = form.built_year.trim()
    ? Number.parseInt(form.built_year, 10)
    : null;

  if (!form.name.trim()) throw new Error('请填写建筑名');
  if (!form.location.trim()) throw new Error('请填写位置信息');
  if (!form.model_url.trim()) throw new Error('请填写 3D 模型路径');
  if (Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('纬度需在 -90 到 90 之间');
  }
  if (Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('经度需在 -180 到 180 之间');
  }
  if (Number.isNaN(population) || population < 0) {
    throw new Error('人口需为非负整数');
  }
  if (Number.isNaN(floors) || floors < 0) {
    throw new Error('楼层需为非负整数');
  }
  if (builtYear != null && (Number.isNaN(builtYear) || builtYear < 1800)) {
    throw new Error('建成年份无效');
  }

  return {
    code: form.code.trim() || null,
    name: form.name.trim(),
    zone_name: form.zone_name.trim(),
    location: form.location.trim(),
    latitude,
    longitude,
    population,
    description: form.description.trim(),
    model_url: form.model_url.trim(),
    status: form.status,
    floors,
    area: form.area.trim(),
    built_year: builtYear,
  };
}

export default function Buildings() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadBuildings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchBuildings();
      setBuildings(data);
    } catch (err) {
      setError(err.message ?? '加载建筑数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuildings();
  }, [loadBuildings]);

  function openCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setModalOpen(true);
  }

  function openEdit(building, event) {
    event.stopPropagation();
    setEditingId(building.id);
    setForm(toForm(building));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function openDetail(building) {
    navigate(`/building/${building.id}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = parseForm(form);
      if (editingId) {
        await updateBuilding(editingId, payload);
      } else {
        await createBuilding(payload);
      }
      closeModal();
      await loadBuildings();
    } catch (err) {
      setError(err.message ?? '保存失败');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(building, event) {
    event.stopPropagation();
    const confirmed = window.confirm(`确定删除「${building.name}」吗？此操作不可撤销。`);
    if (!confirmed) return;

    setError('');
    try {
      await deleteBuilding(building.id);
      await loadBuildings();
    } catch (err) {
      setError(err.message ?? '删除失败');
    }
  }

  return (
    <div className="page buildings-page">
      <div className="buildings-header">
        <div>
          <h2 className="page-title">建筑信息管理</h2>
          <p className="page-subtitle">Supabase 实时数据库 · 点击行查看详情</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          添加建筑
        </button>
      </div>

      {error && <div className="buildings-error">{error}</div>}

      <div className="buildings-table-wrap">
        {loading ? (
          <div className="buildings-empty">加载中…</div>
        ) : buildings.length === 0 ? (
          <div className="buildings-empty">
            暂无建筑数据，点击「添加建筑」创建第一条记录。
          </div>
        ) : (
          <table className="buildings-table">
            <thead>
              <tr>
                <th>编号</th>
                <th>建筑名</th>
                <th>区域</th>
                <th>位置信息</th>
                <th>人口</th>
                <th>状态</th>
                <th>3D 模型</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => (
                <tr
                  key={building.id}
                  className="buildings-row-clickable"
                  onClick={() => openDetail(building)}
                >
                  <td className="cell-mono">{building.code || '—'}</td>
                  <td className="cell-name">{building.name}</td>
                  <td>{building.zone_name || '—'}</td>
                  <td className="cell-desc">{building.location}</td>
                  <td className="cell-mono">{building.population.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${building.status}`}>
                      {STATUS_OPTIONS.find((o) => o.value === building.status)?.label ??
                        building.status}
                    </span>
                  </td>
                  <td className="cell-mono cell-model">{building.model_url || '—'}</td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={(event) => openEdit(building, event)}
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(event) => handleDelete(building, event)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="buildings-modal-overlay" onClick={closeModal}>
          <div
            className="buildings-modal buildings-modal-wide"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="building-form-title"
          >
            <h3 id="building-form-title" className="buildings-modal-title">
              {editingId ? '编辑建筑' : '添加建筑'}
            </h3>
            <form className="buildings-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-field">
                  <span>区域编号</span>
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleFieldChange}
                    placeholder="例如：A-12"
                  />
                </label>
                <label className="form-field">
                  <span>区域名称</span>
                  <input
                    name="zone_name"
                    value={form.zone_name}
                    onChange={handleFieldChange}
                    placeholder="例如：东区"
                  />
                </label>
              </div>
              <label className="form-field">
                <span>建筑名</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFieldChange}
                  placeholder="例如：东域智慧大厦"
                  required
                />
              </label>
              <label className="form-field">
                <span>位置信息</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFieldChange}
                  placeholder="例如：智慧新城东区核心商务带"
                  required
                />
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span>纬度</span>
                  <input
                    name="latitude"
                    type="number"
                    step="any"
                    value={form.latitude}
                    onChange={handleFieldChange}
                    placeholder="39.9042"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>经度</span>
                  <input
                    name="longitude"
                    type="number"
                    step="any"
                    value={form.longitude}
                    onChange={handleFieldChange}
                    placeholder="116.4074"
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label className="form-field">
                  <span>人口</span>
                  <input
                    name="population"
                    type="number"
                    min="0"
                    step="1"
                    value={form.population}
                    onChange={handleFieldChange}
                    placeholder="1200"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>运行状态</span>
                  <select name="status" value={form.status} onChange={handleFieldChange}>
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label className="form-field">
                  <span>楼层</span>
                  <input
                    name="floors"
                    type="number"
                    min="0"
                    step="1"
                    value={form.floors}
                    onChange={handleFieldChange}
                    placeholder="32"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>建成年份</span>
                  <input
                    name="built_year"
                    type="number"
                    min="1800"
                    step="1"
                    value={form.built_year}
                    onChange={handleFieldChange}
                    placeholder="2019"
                  />
                </label>
              </div>
              <label className="form-field">
                <span>建筑面积</span>
                <input
                  name="area"
                  value={form.area}
                  onChange={handleFieldChange}
                  placeholder="例如：18,500 m²"
                />
              </label>
              <label className="form-field">
                <span>3D 模型路径 (modelUrl)</span>
                <input
                  name="model_url"
                  value={form.model_url}
                  onChange={handleFieldChange}
                  placeholder="/3Dmodels/part1.glb"
                  required
                />
              </label>
              <label className="form-field">
                <span>描述</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFieldChange}
                  rows={4}
                  placeholder="建筑用途、监测状态等补充说明"
                />
              </label>
              <div className="buildings-form-actions">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? '保存中…' : editingId ? '保存修改' : '确认添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
