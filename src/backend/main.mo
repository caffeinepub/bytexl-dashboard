import Map "mo:core/Map";
import List "mo:core/List";



actor {
  // Job Roles Data
  type JobRole = {
    title : Text;
    salaryRange : Text;
    verificationScore : Nat; // 0-100
    requiredSkills : [Text];
    aiAdoptionPercent : Nat;
  };

  // Curriculum Analysis Results
  type AnalysisResult = {
    branch : Text;
    alignmentPercent : Nat;
    conflictPoints : [(Text, Text)];
    suggestions : [Text];
  };

  // Contact Form Submissions
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Chat/Consultation Requests
  type ConsultationRequest = {
    role : Text;
    userName : Text;
    userEmail : Text;
    paid : Bool;
  };

  // Project Idea Analysis
  type ProjectComponent = {
    name : Text;
    recommendedTech : Text;
    aiRatio : Nat;
    humanIntelligenceRatio : Nat;
  };

  type ProjectIdea = {
    idea : Text;
    components : [ProjectComponent];
  };

  // Storage
  let jobRoles = Map.empty<Text, JobRole>();
  let analyses = List.empty<AnalysisResult>();
  let contacts = List.empty<ContactSubmission>();
  let consultations = List.empty<ConsultationRequest>();
  let projects = List.empty<ProjectIdea>();

  // Job Roles
  public shared ({ caller }) func addJobRole(role : JobRole) : async () {
    jobRoles.add(role.title, role);
  };

  public query ({ caller }) func getJobRoles() : async [JobRole] {
    jobRoles.values().toArray();
  };

  // Curriculum Analysis
  public shared ({ caller }) func submitAnalysis(result : AnalysisResult) : async () {
    analyses.add(result);
  };

  public query ({ caller }) func getAllAnalyses() : async [AnalysisResult] {
    analyses.toArray();
  };

  // Contact Form
  public shared ({ caller }) func submitContact(contact : ContactSubmission) : async () {
    contacts.add(contact);
  };

  public query ({ caller }) func getContacts() : async [ContactSubmission] {
    contacts.toArray();
  };

  // Consultation Requests
  public shared ({ caller }) func requestConsultation(request : ConsultationRequest) : async () {
    consultations.add(request);
  };

  public query ({ caller }) func getConsultations() : async [ConsultationRequest] {
    consultations.toArray();
  };

  // Project Ideas
  public shared ({ caller }) func submitProject(idea : ProjectIdea) : async () {
    projects.add(idea);
  };

  public query ({ caller }) func getProjects() : async [ProjectIdea] {
    projects.toArray();
  };
};
