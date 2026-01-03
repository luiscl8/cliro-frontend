import React from 'react';

export interface Opportunity {
  id: string;
  title: string;
  type: 'Clinical Rotation' | 'Research' | 'Volunteering';
  location: string;
  institution: string;
  description: string;
  imageUrl: string;
  spotsLeft: number;
  duration: string;
  rating: number;
  skills: string[];
  matchScore?: number; // 0-100 score indicating fit for the current user
  mentor?: {
    name: string;
    role: string;
    avatarUrl: string;
    bio?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSIONAL = 'PROFESSIONAL'
}

export interface AIFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export enum ApplicationStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  INTERVIEW = 'Interview',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface Application {
  id: string;
  opportunity: Opportunity;
  status: ApplicationStatus;
  submittedDate?: string;
  lastUpdated: string;
  matchScore: number;
}