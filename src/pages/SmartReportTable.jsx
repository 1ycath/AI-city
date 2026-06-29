import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueSelector from '../components/smart-report/IssueSelector';
import RatingControl from '../components/smart-report/RatingControl';
import SuccessToast from '../components/smart-report/SuccessToast';
import {
  INSPECTION_ITEMS,
  SCORE_LABELS,
  buildIssueAdvice,
  getScoreAdvice,
} from '../data/smartReport';
import './SmartReport.css';

function createInitialState() {
  return INSPECTION_ITEMS.reduce((acc, item) => {
    acc[item.id] = { score: 0, issues: [], remark: '' };
    return acc;
  }, {});
}

export default function SmartReportTable() {
  const [form, setForm] = useState(createInitialState);
  const [selectorItem, setSelectorItem] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const stats = useMemo(() => {
    const entries = Object.entries(form);
    const scored = entries.filter(([, value]) => value.score > 0);
    const issueCount = entries.reduce((sum, [, value]) => sum + value.issues.length, 0);
    const severeCount = scored.filter(([, value]) => value.score <= 2).length;
    const average = scored.length
      ? (scored.reduce((sum, [, value]) => sum + value.score, 0) / scored.length).toFixed(1)
      : '0.0';
    return { completed: scored.length, issueCount, severeCount, average };
  }, [form]);

  function updateItem(id, patch) {
    setForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
    setSuccess('');
  }

  function toggleIssue(itemId, issue) {
    setForm((prev) => {
      const current = prev[itemId].issues;
      const next = current.includes(issue)
        ? current.filter((entry) => entry !== issue)
        : [...current, issue];
      return {
        ...prev,
        [itemId]: { ...prev[itemId], issues: next },
      };
    });
  }

  function removeIssue(itemId, issue) {
    setForm((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        issues: prev[itemId].issues.filter((entry) => entry !== issue),
      },
    }));
  }

  function generateSummary() {
    const missing = INSPECTION_ITEMS.filter((item) => !form[item.id].score);
    if (missing.length) {
      setError(`还有 ${missing.length} 项未完成评分：${missing.map((item) => item.title).join('、')}`);
      setSummaryOpen(false);
      return;
    }
    setError('');
    setSuccess('');
    setSummaryOpen(true);
  }

  const selectedDetails = INSPECTION_ITEMS.flatMap((item) =>
    form[item.id].issues.map((issue) => `${item.title}：${issue}`),
  );
  const generatedAdvice = INSPECTION_ITEMS
    .map((item) => buildIssueAdvice(item.title, form[item.id].issues))
    .filter(Boolean);

  return (
    <div className="page smart-report-page smart-table-page">
      <Link to="/smart-report" className="smart-back">← 返回智能填报</Link>
      <div className="smart-page-header">
        <div>
          <h2 className="page-title">智能表格</h2>
          <p className="page-subtitle">
            通过评分、按钮和层级选项快速完成检查，系统会自动汇总结果并生成问题记录。
          </p>
        </div>
        <div className="table-progress">
          <span>已完成 {stats.completed} / {INSPECTION_ITEMS.length} 项</span>
          <div>
            <i style={{ width: `${(stats.completed / INSPECTION_ITEMS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {error && <div className="smart-error">{error}</div>}
      <SuccessToast message={success} />

      <div className="inspection-grid">
        {INSPECTION_ITEMS.map((item) => {
          const value = form[item.id];
          const advice = getScoreAdvice(value.score);
          return (
            <section className="inspection-card" key={item.id}>
              <div className="inspection-card-header">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={`inspection-advice score-${value.score || 0}`}>
                  {advice}
                </span>
              </div>

              <RatingControl
                value={value.score}
                onChange={(score) => updateItem(item.id, { score })}
              />

              <div className="current-score">
                当前状态：<strong>{value.score ? SCORE_LABELS[value.score] : '请先评分'}</strong>
              </div>

              <div className="selected-issues">
                {value.issues.length ? (
                  value.issues.map((issue) => (
                    <button
                      type="button"
                      className="issue-tag"
                      key={issue}
                      onClick={() => removeIssue(item.id, issue)}
                    >
                      {issue} ×
                    </button>
                  ))
                ) : (
                  <span className="empty-tags">暂未选择具体问题</span>
                )}
              </div>

              {value.issues.length > 0 && (
                <div className="auto-advice">{buildIssueAdvice(item.title, value.issues)}</div>
              )}

              <button
                type="button"
                className="btn btn-ghost choose-issue-btn"
                onClick={() => setSelectorItem(item)}
              >
                选择具体问题
              </button>

              <label className="form-field inspection-remark">
                <span>现场备注</span>
                <textarea
                  value={value.remark}
                  onChange={(event) => updateItem(item.id, { remark: event.target.value })}
                  placeholder="可记录位置、数量、影响范围或责任单位"
                  rows={3}
                />
              </label>
            </section>
          );
        })}
      </div>

      <div className="table-submit-bar">
        <div>
          <strong>智能表格填报</strong>
          <span>完成全部评分后生成汇总结果</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={generateSummary}>
          生成填报结果
        </button>
      </div>

      {summaryOpen && (
        <section className="summary-panel">
          <div className="summary-header">
            <div>
              <h3>填报结果汇总</h3>
              <p>系统已根据评分和具体问题生成检查记录。</p>
            </div>
          </div>
          <div className="summary-stats">
            <div><span>已检查项目数量</span><strong>{stats.completed}</strong></div>
            <div><span>平均评分</span><strong>{stats.average}</strong></div>
            <div><span>发现问题数量</span><strong>{stats.issueCount}</strong></div>
            <div><span>严重问题数量</span><strong>{stats.severeCount}</strong></div>
          </div>

          <div className="summary-section">
            <h4>已选择的具体问题</h4>
            {selectedDetails.length ? (
              <div className="summary-tags">
                {selectedDetails.map((entry) => <span key={entry}>{entry}</span>)}
              </div>
            ) : (
              <p>本次未选择具体问题。</p>
            )}
          </div>

          <div className="summary-section">
            <h4>系统生成的处理建议</h4>
            {generatedAdvice.length ? (
              generatedAdvice.map((entry) => <p key={entry}>{entry}</p>)
            ) : (
              <p>整体状况良好，建议按常规频次继续巡检。</p>
            )}
          </div>

          <div className="smart-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setSuccess('草稿已保存，可稍后继续完善。')}
            >
              保存草稿
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setSummaryOpen(false)}>
              返回修改
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setSuccess('智能表格已提交，检查结果已保存至城市体检数据库。')}
            >
              确认提交
            </button>
          </div>
        </section>
      )}

      {selectorItem && (
        <IssueSelector
          item={selectorItem}
          selected={form[selectorItem.id].issues}
          onToggle={(issue) => toggleIssue(selectorItem.id, issue)}
          onClose={() => setSelectorItem(null)}
        />
      )}
    </div>
  );
}
