export type Status = 'todo' | 'progress' | 'complete';

export type Phase =
  | 'premed'
  | 'mcat'
  | 'medschool'
  | 'residency'
  | 'surgery';

export interface Task {
  id: string;
  title: string;
  description: string;
  phase: Phase;
  status: Status;
  requirements: string[];
  nextTasks: string[];
  parallelTasks: string[];
  createdAt: string;
  updatedAt: string;
}

export const PHASES: Record<Phase, { label: string; color: string; bg: string; border: string }> = {
  premed:    { label: 'Pre-med',    color: '#0F6E56', bg: '#E1F5EE', border: '#9FE1CB' },
  mcat:      { label: 'MCAT',       color: '#185FA5', bg: '#E6F1FB', border: '#B5D4F4' },
  medschool: { label: 'Med school', color: '#534AB7', bg: '#EEEDFE', border: '#CECBF6' },
  residency: { label: 'Residency',  color: '#993C1D', bg: '#FAECE7', border: '#F5C4B3' },
  surgery:   { label: 'Surgery',    color: '#3C3489', bg: '#EEEDFE', border: '#CECBF6' },
};