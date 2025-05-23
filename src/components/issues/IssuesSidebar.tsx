import React, { useState } from "react";
import { issuesData } from "../../data/issuesData";
import IssuesList from "./IssuesList";

interface IssuesSidebarProps {
  onIssueClick: (issueId: string) => void;
  activeIssueId: string | null;
  onIssueHover: (issueId: string | null) => void;
}

const IssuesSidebar: React.FC<IssuesSidebarProps> = ({
  onIssueClick,
  activeIssueId,
  onIssueHover,
}) => {
  const [resolvedIssues, setResolvedIssues] = useState<string[]>([]);

  const handleResolveIssue = (issueId: string, resolved: boolean) => {
    if (resolved) {
      setResolvedIssues((prev) => [...prev, issueId]);
    } else {
      setResolvedIssues((prev) => prev.filter((id) => id !== issueId));
    }
  };

  const highRiskIssues = issuesData.filter(
    (issue) => issue.riskLevel === "high"
  );
  const mediumRiskIssues = issuesData.filter(
    (issue) => issue.riskLevel === "medium"
  );
  const lowRiskIssues = issuesData.filter((issue) => issue.riskLevel === "low");

  return (
    <div className="h-full overflow-auto">
      <div className="p-4">
        <IssuesList
          issues={highRiskIssues}
          title={`High Risk Issues (${highRiskIssues.length})`}
          onIssueClick={onIssueClick}
          activeIssueId={activeIssueId}
          resolvedIssues={resolvedIssues}
          onResolve={handleResolveIssue}
          onIssueHover={onIssueHover}
        />

        <IssuesList
          issues={mediumRiskIssues}
          title={`Medium Risk Issues (${mediumRiskIssues.length})`}
          onIssueClick={onIssueClick}
          activeIssueId={activeIssueId}
          resolvedIssues={resolvedIssues}
          onResolve={handleResolveIssue}
          onIssueHover={onIssueHover}
        />

        <IssuesList
          issues={lowRiskIssues}
          title={`Low Risk Issues (${lowRiskIssues.length})`}
          onIssueClick={onIssueClick}
          activeIssueId={activeIssueId}
          resolvedIssues={resolvedIssues}
          onResolve={handleResolveIssue}
          onIssueHover={onIssueHover}
        />
      </div>
    </div>
  );
};

export default IssuesSidebar;
