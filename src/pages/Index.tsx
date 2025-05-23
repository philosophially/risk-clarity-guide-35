import React, { useState } from "react";
import ContractDocument from "@/components/ContractDocument";
import IssuesSidebar from "@/components/issues/IssuesSidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { issuesData } from "../data/issuesData";

const ContractReviewPage: React.FC = () => {
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);
  const [hoveredIssueId, setHoveredIssueId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("issues");

  const handleIssueClick = (issueId: string) => {
    setActiveIssueId(issueId);
  };

  const handleIssueHover = (issueId: string | null) => {
    setHoveredIssueId(issueId);
  };

  // Find the active issue data for the playbook
  const activeIssue = issuesData.find((issue) => issue.id === activeIssueId);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Contract Risk Analysis</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">John Smith</span>
            <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center text-sm">
              JS
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Master Services Agreement - ABC Corporation
          </h2>
          <p className="text-sm text-slate-500">Last updated: June 1, 2023</p>
        </div>

        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* Contract document - 60% width */}
          <div className="w-3/5">
            <ContractDocument
              activeIssueId={activeIssueId}
              hoveredIssueId={hoveredIssueId}
            />
          </div>

          {/* Issues sidebar - 40% width */}
          <div className="w-2/5">
            <div className="bg-slate-50 h-full overflow-hidden flex flex-col rounded-lg shadow-md">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <div className="bg-slate-800 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Contract Issues</h2>
                    <TabsList className="bg-slate-700">
                      <TabsTrigger
                        value="issues"
                        className="data-[state=active]:bg-blue-600"
                      >
                        Issues
                      </TabsTrigger>
                      <TabsTrigger
                        value="playbook"
                        className="data-[state=active]:bg-blue-600"
                      >
                        Playbook
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <p className="text-sm text-slate-300">
                    {issuesData.length} issues identified in this document
                  </p>
                </div>

                <TabsContent
                  value="issues"
                  className="flex-1 p-0 m-0 overflow-hidden"
                >
                  <IssuesSidebar
                    onIssueClick={handleIssueClick}
                    activeIssueId={activeIssueId}
                    onIssueHover={handleIssueHover}
                  />
                </TabsContent>

                <TabsContent
                  value="playbook"
                  className="flex-1 p-0 m-0 overflow-auto"
                >
                  <div className="p-6">
                    {/* Playbook collapsible sections by risk level */}
                    {["high", "medium", "low"].map((risk) => {
                      const riskIssues = issuesData.filter(
                        (issue) => issue.riskLevel === risk
                      );
                      if (riskIssues.length === 0) return null;
                      const riskLabel =
                        risk === "high"
                          ? "High Risk Recommended Actions"
                          : risk === "medium"
                          ? "Medium Risk Recommended Actions"
                          : "Low Risk Recommended Actions";
                      return (
                        <div key={risk} className="mb-6">
                          <details open>
                            <summary className="font-semibold text-base cursor-pointer mb-2">
                              {riskLabel} ({riskIssues.length})
                            </summary>
                            <div className="space-y-4">
                              {riskIssues.map((issue) => (
                                <div
                                  key={issue.id}
                                  className="bg-white rounded shadow p-4 border"
                                >
                                  <div className="flex items-center mb-1">
                                    <span
                                      className={`risk-badge-${issue.riskLevel} mr-2`}
                                    >
                                      {issue.riskLevel === "high"
                                        ? "High Risk"
                                        : issue.riskLevel === "medium"
                                        ? "Medium Risk"
                                        : "Low Risk"}
                                    </span>
                                    <span className="font-medium">
                                      {issue.title}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-500 mb-2">
                                    {issue.location}
                                  </div>
                                  <div className="mb-2">
                                    <span className="font-semibold text-sm">
                                      Playbook Position:
                                    </span>
                                    <div className="bg-blue-50 p-2 rounded border border-blue-100 text-sm mt-1">
                                      {issue.playbookPosition}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-sm">
                                      Recommended Action:
                                    </span>
                                    <div className="bg-green-50 p-2 rounded border border-green-100 text-sm mt-1">
                                      Request modification based on playbook
                                      position.
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractReviewPage;
