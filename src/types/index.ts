export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  department: string;
  jobRole: string;
  experience: number; // in years
  jobSatisfaction: number; // 1 to 5
  overtime: 'Yes' | 'No';
  currentRiskLevel: RiskLevel;
  attritionProbability: number; // percentage e.g. 84 for High Risk (DEMO DATA)
  skills: string[];
  lastPromotionYears: number;
  salaryTier: 'Below Avg' | 'Competitive' | 'Above Avg';
  workLifeBalance: number; // 1 to 5
  projectCount: number;
  primaryRiskFactors: string[];
  mitigationStrategy?: string;
  performanceRating: 'Exceeds' | 'Meets' | 'Needs Improvement';
}

export interface JobRoleRequirement {
  id: string;
  roleTitle: string;
  department: string;
  requiredSkills: string[];
  description: string;
  minExperienceYears: number;
}

export interface DepartmentStat {
  department: string;
  totalEmployees: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  avgSatisfaction: number;
  avgOvertimeRate: number; // percentage
  skillGapCount: number;
}

export interface SkillGapStat {
  skillName: string;
  category: string;
  missingCount: number;
  priority: 'Critical' | 'Moderate' | 'Low';
  affectedDepartments: string[];
}

export interface FilterState {
  searchQuery: string;
  department: string;
  jobRole: string;
  riskLevel: string;
}
