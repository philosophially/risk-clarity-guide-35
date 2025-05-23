import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { issuesData } from "../../data/issuesData";

type IssueType = (typeof issuesData)[0];

interface IssueCardProps {
  issue: IssueType;
  onClick: (issueId: string) => void;
  activeIssueId: string | null;
  onResolve: (issueId: string, resolved: boolean) => void;
  isResolved: boolean;
  onMouseEnter: (issueId: string) => void;
  onMouseLeave: () => void;
}

const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  onClick,
  activeIssueId,
  onResolve,
  isResolved,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [thumbsUpActive, setThumbsUpActive] = useState(false);
  const [thumbsDownActive, setThumbsDownActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isResolved);

  const handleResolve = () => {
    onResolve(issue.id, true);
    setIsExpanded(false);
  };

  const handleThumbsUp = () => {
    setThumbsUpActive(true);
    setThumbsDownActive(false);
  };

  const handleThumbsDown = () => {
    setThumbsDownActive(true);
    setThumbsUpActive(false);
  };

  const handleIssueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(issue.id);
  };

  return (
    <Card
      className={`mb-3 overflow-hidden border-l-4 ${
        activeIssueId === issue.id ? "ring-2 ring-blue-400" : ""
      } ${
        issue.riskLevel === "high"
          ? "border-l-red-500"
          : issue.riskLevel === "medium"
          ? "border-l-orange-500"
          : "border-l-green-500"
      }`}
      onMouseEnter={() => onMouseEnter(issue.id)}
      onMouseLeave={onMouseLeave}
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-start mb-2 cursor-pointer">
              <div>
                <h3
                  className="font-medium text-sm hover:text-blue-600"
                  onClick={handleIssueClick}
                >
                  {issue.title}
                </h3>
                <p className="text-xs text-slate-500">{issue.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`risk-badge-${issue.riskLevel}`}>
                  {issue.riskLevel === "high"
                    ? "High Risk"
                    : issue.riskLevel === "medium"
                    ? "Medium Risk"
                    : "Low Risk"}
                </span>
                {isResolved && <Check size={16} className="text-green-600" />}
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <p className="text-sm text-slate-700 mb-3">{issue.summary}</p>

            {isResolved ? (
              <div className="bg-green-50 border border-green-200 p-2 rounded text-sm text-green-800 flex items-center">
                <Check size={16} className="mr-2" />
                Issue resolved by John Smith
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-1 h-8 w-8 ${
                        thumbsUpActive ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={handleThumbsUp}
                    >
                      <ThumbsUp size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-1 h-8 w-8 ${
                        thumbsDownActive ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={handleThumbsDown}
                    >
                      <ThumbsDown size={16} />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={handleResolve}
                  >
                    Resolve
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="playbook" className="border-0">
                    <AccordionTrigger className="py-1 text-xs text-blue-600 hover:text-blue-800 hover:no-underline">
                      Playbook position
                    </AccordionTrigger>
                    <AccordionContent className="text-xs bg-blue-50 p-2 rounded border border-blue-100">
                      {issue.playbookPosition}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </Card>
  );
};

export default IssueCard;
