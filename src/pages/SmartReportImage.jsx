import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnalysisLoader from '../components/smart-report/AnalysisLoader';
import ResultCard from '../components/smart-report/ResultCard';
import SuccessToast from '../components/smart-report/SuccessToast';
import './SmartReport.css';

const ANALYSIS_STEPS = [
  '正在识别场景',
  '正在定位问题区域',
  '正在匹配城市体检指标',
  '正在生成结构化记录',
];

const MARKERS = [
  { label: '积水点1', left: '22%', top: '68%' },
  { label: '积水点2', left: '48%', top: '72%' },
  { label: '积水点3', left: '66%', top: '62%' },
  { label: '外墙脱落点1', left: '74%', top: '30%' },
];

const RESULT_ITEMS = [
  { label: '问题类型', value: '地面积水' },
  { label: '识别数量', value: '3处' },
  { label: '可能位置', value: '建筑周边道路及排水口附近' },
  { label: '风险说明', value: '积水可能影响人员通行，并反映局部排水不畅' },
  { label: '建议处理', value: '检查雨水口堵塞情况，清理排水设施并记录积水消退时间' },
  { label: '问题类型', value: '外墙饰面脱落' },
  { label: '识别数量', value: '1处' },
  { label: '风险等级', value: '较高' },
  { label: '风险说明', value: '存在饰面继续脱落和高空坠物风险' },
  { label: '建议处理', value: '设置临时警戒区域，并安排专业人员检查外墙空鼓及脱落范围' },
];

export default function SmartReportImage() {
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function setFile(file) {
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus('ready');
    setSuccess('');
  }

  function handleFileChange(event) {
    setFile(event.target.files?.[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    setFile(event.dataTransfer.files?.[0]);
  }

  function startAnalysis() {
    clearTimers();
    setStatus('analyzing');
    setActiveStep(0);
    setSuccess('');
    ANALYSIS_STEPS.forEach((_, index) => {
      timers.current.push(setTimeout(() => setActiveStep(index), 620 * index));
    });
    timers.current.push(setTimeout(() => setStatus('done'), 2700));
  }

  function reset() {
    clearTimers();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    setFileName('');
    setStatus('idle');
    setActiveStep(0);
    setSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="page smart-report-page">
      <Link to="/smart-report" className="smart-back">← 返回智能填报</Link>
      <div className="smart-page-header">
        <div>
          <h2 className="page-title">图像识别填报</h2>
          <p className="page-subtitle">
            上传现场照片，识别积水、墙体损坏和其他城市体检问题，并生成结构化记录。
          </p>
        </div>
      </div>

      <div
        className={`image-upload-zone${dragging ? ' dragging' : ''}${previewUrl ? ' has-preview' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        {previewUrl ? (
          <div className="image-preview-wrap">
            <img src={previewUrl} alt="现场照片预览" />
            {status === 'analyzing' && <div className="image-scan-overlay" />}
            {status === 'done' &&
              MARKERS.map((marker, index) => (
                <span
                  className="image-marker"
                  style={{ left: marker.left, top: marker.top }}
                  key={marker.label}
                >
                  {index + 1}
                  <em>{marker.label}</em>
                </span>
              ))}
          </div>
        ) : (
          <div className="image-upload-empty">
            <strong>点击选择图片，或将图片拖入此区域</strong>
            <span>支持现场巡检照片，上传后可进行模拟 AI 识别。</span>
          </div>
        )}
      </div>

      {fileName && <div className="smart-file-name">已选择：{fileName}</div>}

      <div className="smart-actions">
        {previewUrl && status !== 'analyzing' && (
          <>
            {status === 'ready' && (
              <button type="button" className="btn btn-primary" onClick={startAnalysis}>
                开始AI识别
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={reset}>
              重新选择图片
            </button>
          </>
        )}
      </div>

      {status === 'analyzing' && (
        <AnalysisLoader
          title="AI正在分析图片……"
          steps={ANALYSIS_STEPS}
          activeStep={activeStep}
          variant="image"
        />
      )}

      {status === 'done' && (
        <>
          <ResultCard
            title="图像识别结果"
            summary="本次图像识别共发现4处问题，包括3处地面积水和1处外墙饰面脱落。"
            items={RESULT_ITEMS}
            notice="识别结果已自动生成现场问题记录，并传输至城市体检数据库，分别归入‘排水防涝’和‘建筑外墙安全’条目。"
            actions={(
              <>
                <button type="button" className="btn btn-ghost">查看问题详情</button>
                <button type="button" className="btn btn-ghost" onClick={reset}>重新上传</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSuccess('4条问题信息已保存，并进入待复核列表。')}
                >
                  确认入库
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
