import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { Employee } from '../../types';
import { UserPlus, Plus, Trash2 } from 'lucide-react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (newEmp: Employee) => void;
  departments: string[];
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
  departments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(departments[0] || 'Engineering');
  const [jobRole, setJobRole] = useState('');
  const [experience, setExperience] = useState(3);
  const [jobSatisfaction, setJobSatisfaction] = useState(4);
  const [overtime, setOvertime] = useState<'Yes' | 'No'>('No');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !jobRole) return;

    const newEmp: Employee = {
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=150&auto=format&fit=crop&q=80`,
      email,
      department,
      jobRole,
      experience: Number(experience),
      jobSatisfaction: Number(jobSatisfaction),
      overtime,
      currentRiskLevel: 'Low',
      attritionProbability: Math.floor(10 + Math.random() * 20),
      skills,
      lastPromotionYears: 1,
      salaryTier: 'Competitive',
      workLifeBalance: 4,
      projectCount: 3,
      primaryRiskFactors: ['Newly Onboarded'],
      mitigationStrategy: 'Standard onboarding check-in schedule.',
      performanceRating: 'Meets',
    };

    onAddEmployee(newEmp);
    onClose();
    // Reset form
    setName('');
    setEmail('');
    setJobRole('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Workforce Member"
      subtitle="Register a new employee record into the analytics platform"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rachel Adams"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. rachel.adams@enterprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Backend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Yrs)</label>
            <input
              type="number"
              min="0"
              max="40"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Satisfaction</label>
            <select
              value={jobSatisfaction}
              onChange={(e) => setJobSatisfaction(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="5">5 - Very Satisfied</option>
              <option value="4">4 - Satisfied</option>
              <option value="3">3 - Neutral</option>
              <option value="2">2 - Dissatisfied</option>
              <option value="1">1 - Highly Dissatisfied</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Frequent Overtime</label>
            <select
              value={overtime}
              onChange={(e) => setOvertime(e.target.value as 'Yes' | 'No')}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        {/* Skills Tag Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Skills Inventory</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add skill tag (e.g. Python, AWS)..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition-colors flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[36px] rounded-lg border border-slate-100 bg-slate-50 p-2">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-xs font-medium text-slate-800 border border-slate-200 shadow-2xs"
              >
                {s}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Employee Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
