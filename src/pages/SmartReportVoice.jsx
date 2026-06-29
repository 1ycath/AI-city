import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnalysisLoader from '../components/smart-report/AnalysisLoader';
import ResultCard from '../components/smart-report/ResultCard';
import SuccessToast from '../components/smart-report/SuccessToast';
import './SmartReport.css';

const ANALYSIS_STEPS = ['正在提取位置信息', '正在识别问题类型', '正在匹配体检指标'];
const VOICE_TEXT =
  '13号楼3层楼梯间墙体发现一条裂缝，裂缝宽度约1毫米，建议进一步检查结构安全情况。';

const STRUCTURED_RESULT = [
  { label: '检查对象', value: '13号楼' },
  { label: '发现位置', value: '3层楼梯间' },
  { label: '问题类型', value: '墙体裂缝' },
  { label: '裂缝宽度', value: '约1毫米' },
  { label: '风险分类', value: '结构安全' },
  { label: '建议等级', value: '需关注' },
  {
    label: '处理建议',
    value: '安排专业人员复核裂缝性质，记录裂缝长度和变化情况，并纳入后续巡检。',
  },
];

function formatSeconds(value) {
  const minutes = String(Math.floor(value / 60)).padStart(2, '0');
  const seconds = String(value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function SmartReportVoice() {
  const [status, setStatus] = useState('idle');
  const [seconds, setSeconds] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [fileName, setFileName] = useState('');
  const [success, setSuccess] = useState('');
  const timers = useRef([]);

  useEffect(() => {
    if (status !== 'recording') return undefined;
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function runAnalysis() {
    clearTimers();
    setStatus('analyzing');
    setActiveStep(0);
    setSuccess('');
    ANALYSIS_STEPS.forEach((_, index) => {
      timers.current.push(setTimeout(() => setActiveStep(index), 700 * index));
    });
    timers.current.push(setTimeout(() => setStatus('done'), 2600));
  }

  function handleRecord() {
    if (status === 'recording') {
      runAnalysis();
      return;
    }
    setSeconds(0);
    setFileName('');
    setSuccess('');
    setStatus('recording');
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSeconds(0);
    runAnalysis();
  }

  function reset() {
    clearTimers();
    setStatus('idle');
    setSeconds(0);
    setActiveStep(0);
    setFileName('');
    setSuccess('');
  }

  return (
    <div className="page smart-report-page">
      <Link to="/smart-report" className="smart-back">← 返回智能填报</Link>
      <div className="smart-page-header">
        <div>
          <h2 className="page-title">语音识别填报</h2>
          <p className="page-subtitle">
            通过现场录音或上传语音材料，快速记录建筑问题、位置和检查结果。
          </p>
        </div>
      </div>

      <div className={`voice-panel ${status === 'recording' ? 'recording' : ''}`}>
        <div className="voice-meter">
          <div className="voice-timer">{formatSeconds(seconds)}</div>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.06}s` }} />
            ))}
          </div>
          <p>
            {status === 'recording'
              ? '正在录音，请描述现场发现的问题'
              : '点击开始录音，或上传本地音频文件进行模拟识别'}
          </p>
        </div>
        <div className="smart-actions">
          <button
            type="button"
            className={`btn ${status === 'recording' ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleRecord}
            disabled={status === 'analyzing'}
          >
            {status === 'recording' ? '停止录音' : '开始录音'}
          </button>
          <label className={`btn btn-ghost smart-file-button ${status === 'analyzing' ? 'disabled' : ''}`}>
            上传音频
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={status === 'analyzing'}
            />
          </label>
        </div>
        {fileName && <div className="smart-file-name">已选择：{fileName}</div>}
      </div>

      {status === 'analyzing' && (
        <AnalysisLoader title="AI正在分析语音内容……" steps={ANALYSIS_STEPS} activeStep={activeStep} />
      )}

      {status === 'done' && (
        <>
          <ResultCard
            title="语音识别结果"
            summary={`原始识别文本：“${VOICE_TEXT}”`}
            items={STRUCTURED_RESULT}
            notice="AI已识别现场描述，并自动填入‘房屋安全—结构安全—墙体裂缝’检查条目。"
            actions={(
              <>
                <button type="button" className="btn btn-ghost">查看填报结果</button>
                <button type="button" className="btn btn-ghost" onClick={reset}>重新录音</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSuccess('填报结果已保存，相关问题已加入结构安全检查记录。')}
                >
                  确认并提交
                </button>
              </>
            )}
          />
          <SuccessToast message={success} />
        </>
      )}
    </div>
  );
}
