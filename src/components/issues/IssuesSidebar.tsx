
import React, { useState } from "react";
import { issuesData } from "../../data/issuesData";
import IssuesList from "./IssuesList";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

  const riskSections = [
    { level: "high" as const, label: "High Risk Issues", borderColor: "border-l-red-500" },
    { level: "medium" as const, label: "Medium Risk Issues", borderColor: "border-l-orange-500" },
    { level: "low" as const, label: "Low Risk Issues", borderColor: "border-l-green-500" },
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="p-4">
        <Accordion type="multiple" defaultValue={["high", "medium", "low"]}>
          {riskSections.map(({ level, label, borderColor }) => {
            const filtered = issuesData.filter(
              (issue) => issue.riskLevel === level
            );
            if (filtered.length === 0) return null;
            return (
              <AccordionItem
                value={level}
                key={level}
                className={`mb-2 border rounded border-l-4 ${borderColor}`}
              >
                <AccordionTrigger className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-left">
                  <span>
                    {label} ({filtered.length})
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <IssuesList
                    issues={filtered}
                    title=""
                    onIssueClick={onIssueClick}
                    activeIssueId={activeIssueId}
                    resolvedIssues={resolvedIssues}
                    onResolve={handleResolveIssue}
                    onIssueHover={onIssueHover}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default IssuesSidebar;
