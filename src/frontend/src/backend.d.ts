import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConsultationRequest {
    userName: string;
    userEmail: string;
    paid: boolean;
    role: string;
}
export interface JobRole {
    title: string;
    verificationScore: bigint;
    aiAdoptionPercent: bigint;
    salaryRange: string;
    requiredSkills: Array<string>;
}
export interface ProjectIdea {
    idea: string;
    components: Array<ProjectComponent>;
}
export interface ProjectComponent {
    aiRatio: bigint;
    humanIntelligenceRatio: bigint;
    name: string;
    recommendedTech: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}
export interface AnalysisResult {
    alignmentPercent: bigint;
    branch: string;
    suggestions: Array<string>;
    conflictPoints: Array<[string, string]>;
}
export interface backendInterface {
    addJobRole(role: JobRole): Promise<void>;
    getAllAnalyses(): Promise<Array<AnalysisResult>>;
    getConsultations(): Promise<Array<ConsultationRequest>>;
    getContacts(): Promise<Array<ContactSubmission>>;
    getJobRoles(): Promise<Array<JobRole>>;
    getProjects(): Promise<Array<ProjectIdea>>;
    requestConsultation(request: ConsultationRequest): Promise<void>;
    submitAnalysis(result: AnalysisResult): Promise<void>;
    submitContact(contact: ContactSubmission): Promise<void>;
    submitProject(idea: ProjectIdea): Promise<void>;
}
