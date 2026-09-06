import { useState, useMemo } from 'react';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { EmployeeManagement } from './pages/EmployeeManagement';
import { RetentionAnalytics } from './pages/RetentionAnalytics';
import { SkillMapping } from './pages/SkillMapping';
import { Reports } from './pages/Reports';
import { EmployeeDetailModal } from './components/modals/EmployeeDetailModal';
import { AddEmployeeModal } from './components/modals/AddEmployeeModal';
import { ExportModal } from './components/modals/ExportModal';
import { MOCK_EMPLOYEES } from './data/mockData';
import type { Employee } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Dynamic employee state (allows testing additions/updates live)
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);

  // Modal States
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Derive unique departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    employees.forEach((e) => set.add(e.department));
    return Array.from(set);
  }, [employees]);

  // Modal Trigger Handlers
  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsDetailModalOpen(true);
  };

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 antialiased font-sans">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Header activeTab={activeTab} />

        {/* Dynamic Page Router */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'overview' && (
              <OverviewDashboard
                employees={employees}
                onSelectEmployee={handleSelectEmployee}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === 'employees' && (
              <EmployeeManagement
                employees={employees}
                onSelectEmployee={handleSelectEmployee}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                departments={departments}
              />
            )}

            {activeTab === 'retention' && (
              <RetentionAnalytics
                employees={employees}
                onSelectEmployee={handleSelectEmployee}
              />
            )}

            {activeTab === 'skills' && <SkillMapping employees={employees} />}

            {activeTab === 'reports' && (
              <Reports onOpenExportModal={() => setIsExportModalOpen(true)} />
            )}
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEmployee={handleAddEmployee}
        departments={departments}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

export default App;
