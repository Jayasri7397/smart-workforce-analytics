import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_DEPARTMENT_STATS } from '../../data/mockData';
import { jsPDF } from 'jspdf';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [reportFormat, setReportFormat] = useState<'csv' | 'pdf'>('pdf');
  const [departmentScope, setDepartmentScope] = useState('All Departments');
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Top Header Banner
    doc.setFillColor(79, 70, 229); // Indigo 600
    doc.rect(0, 0, 210, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Smart Workforce Analytics Platform', 14, 17);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Report Generation Date: ${reportDate} | Scope: ${departmentScope}`, 14, 24);

    // Section 1: Executive Summary Title
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Workforce Analytics Executive Summary', 14, 40);

    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 44, 196, 44);

    // Core Metrics
    let y = 54;
    const metrics = [
      { label: 'Total Workforce:', value: '148 Active Employees' },
      { label: 'High Risk Employees:', value: '14 Staff (Urgent Action Required)' },
      { label: 'Medium Risk Employees:', value: '32 Staff (Requires Monitoring)' },
      { label: 'Low Risk Employees:', value: '102 Staff (Stable Retention Score)' },
      { label: 'Skill Gaps Identified:', value: '18 Critical Competency Gaps' },
    ];

    metrics.forEach((m) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(m.label, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(m.value, 72, y);
      y += 8;
    });

    // Section 2: Department Summary
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text('Department Summary', 14, y);
    y += 4;
    doc.line(14, y, 196, y);
    y += 8;

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('Department', 18, y + 5.5);
    doc.text('Headcount', 75, y + 5.5);
    doc.text('High Risk', 108, y + 5.5);
    doc.text('Med Risk', 138, y + 5.5);
    doc.text('Skill Gaps', 168, y + 5.5);
    y += 10;

    // Department Rows Data
    const deptData = departmentScope === 'All Departments'
      ? MOCK_DEPARTMENT_STATS
      : MOCK_DEPARTMENT_STATS.filter((d) => d.department === departmentScope);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);

    deptData.forEach((dept) => {
      doc.text(dept.department, 18, y + 5);
      doc.text(String(dept.totalEmployees), 75, y + 5);
      doc.text(String(dept.highRisk), 108, y + 5);
      doc.text(String(dept.mediumRisk), 138, y + 5);
      doc.text(`${dept.skillGapCount} Gaps`, 168, y + 5);
      y += 8;
      doc.setDrawColor(241, 245, 249);
      doc.line(14, y, 196, y);
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Smart Workforce Analytics Platform — Confidential HR Report', 14, 285);

    // Save with requested exact filename
    doc.save('workforce-analytics-report.pdf');
  };

  const generateCSV = () => {
    const deptData = departmentScope === 'All Departments'
      ? MOCK_DEPARTMENT_STATS
      : MOCK_DEPARTMENT_STATS.filter((d) => d.department === departmentScope);

    let csvContent = 'Department,Total Employees,High Risk,Medium Risk,Low Risk,Avg Satisfaction,Overtime Rate %,Skill Gaps\n';
    deptData.forEach((d) => {
      csvContent += `"${d.department}",${d.totalEmployees},${d.highRisk},${d.mediumRisk},${d.lowRisk},${d.avgSatisfaction},${d.avgOvertimeRate}%,${d.skillGapCount}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'workforce-analytics-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    setIsExporting(true);
    setIsSuccess(false);

    setTimeout(() => {
      if (reportFormat === 'pdf') {
        generatePDF();
      } else {
        generateCSV();
      }

      setIsExporting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Workforce Analytics Report"
      subtitle="Generate downloadable summaries for executive review and HR compliance"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Format Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setReportFormat('pdf')}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                reportFormat === 'pdf'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <FileText className="h-6 w-6 text-rose-500 shrink-0" />
              <div>
                <div className="font-bold text-xs">PDF Executive Summary</div>
                <div className="text-[10px] text-slate-500">Formatted visual graphs & tables</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReportFormat('csv')}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                reportFormat === 'csv'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <FileSpreadsheet className="h-6 w-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-xs">CSV Data Export</div>
                <div className="text-[10px] text-slate-500">Raw dataset for Excel/Python</div>
              </div>
            </button>
          </div>
        </div>

        {/* Scope Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Department Scope</label>
          <select
            value={departmentScope}
            onChange={(e) => setDepartmentScope(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All Departments">All Departments (Entire Organization)</option>
            <option value="Engineering">Engineering Department</option>
            <option value="Data Science">Data Science Department</option>
            <option value="Product">Product Department</option>
            <option value="Sales">Sales Department</option>
            <option value="Marketing">Marketing Department</option>
          </select>
        </div>

        {/* Feedback Alert */}
        {isSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Report successfully generated & downloaded!</span>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting || isSuccess}
            onClick={handleExport}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating Report...
              </span>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download {reportFormat.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
