import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";

module {
  // Previous actor type with persistent variables to remove.
  type OldActor = {
    courses : Map.Map<Text, { title : Text; description : Text; category : Text; durationMinutes : Nat; difficulty : Text; isCompleted : Bool; progressPercent : Nat }>;
    gigs : Map.Map<Text, { id : Text; title : Text; description : Text; skills : [Text]; budgetUsd : Nat; deadline : Int; source : Text; claimed : Bool; claimedBy : ?Principal; isCompleted : Bool }>;
    placements : Map.Map<Text, { companyName : Text; studentsPlaced : Nat; month : Text; year : Nat; college : Text }>;
    students : Map.Map<Principal, { name : Text; college : Text; bytexlScore : Nat; coursesCompleted : Nat; dayStreak : Nat; collegeRank : Nat }>;
    wallets : Map.Map<Principal, { totalEarnings : Nat; pendingPayments : Nat; transactions : [{ amountUsdCents : Nat; timestamp : Int; gigId : Text; isCompleted : Bool }] }>;
  };

  // New actor type with only new fields
  type JobRole = {
    title : Text;
    salaryRange : Text;
    verificationScore : Nat;
    requiredSkills : [Text];
    aiAdoptionPercent : Nat;
  };

  type AnalysisResult = {
    branch : Text;
    alignmentPercent : Nat;
    conflictPoints : [(Text, Text)];
    suggestions : [Text];
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  type ConsultationRequest = {
    role : Text;
    userName : Text;
    userEmail : Text;
    paid : Bool;
  };

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

  type NewActor = {
    jobRoles : Map.Map<Text, JobRole>;
    analyses : List.List<AnalysisResult>;
    contacts : List.List<ContactSubmission>;
    consultations : List.List<ConsultationRequest>;
    projects : List.List<ProjectIdea>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      jobRoles = Map.empty<Text, JobRole>();
      analyses = List.empty<AnalysisResult>();
      contacts = List.empty<ContactSubmission>();
      consultations = List.empty<ConsultationRequest>();
      projects = List.empty<ProjectIdea>();
    };
  };
};
