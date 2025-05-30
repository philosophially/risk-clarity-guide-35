
import React, { useState } from "react";
import ContractDocument from "@/components/ContractDocument";
import IssuesSidebar from "@/components/issues/IssuesSidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
                  <div className="p-4">
                    {activeIssue ? (
                      <div>
                        <button
                          className="text-blue-600 hover:underline mb-4 flex items-center text-xs"
                          onClick={() => setActiveIssueId(null)}
                        >
                          &lt; Back to all recommendations
                        </button>
                        <h2 className="text-sm font-bold text-slate-800 mb-2 text-left">
                          {activeIssue.title}
                        </h2>
                        <div className="mb-6">
                          <h3 className="text-xs font-semibold text-slate-700 mb-1 text-left">
                            Issue Summary
                          </h3>
                          <p className="text-slate-600 mb-2 text-xs text-left">
                            {activeIssue.summary}
                          </p>
                          <p className="text-xs text-slate-500 text-left">
                            {activeIssue.location}
                          </p>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-xs font-semibold text-slate-700 mb-2 text-left">
                            Playbook Position
                          </h3>
                          <div className="bg-blue-50 p-4 rounded border border-blue-100">
                            <p className="text-xs text-left">
                              {activeIssue.playbookPosition}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-slate-700 mb-2 text-left">
                            Recommended Action
                          </h3>
                          <div className="bg-green-50 p-4 rounded border border-green-100">
                            <p className="text-xs text-left">
                              Request modification based on playbook position.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Accordion type="multiple" defaultValue={["high", "medium", "low"]}>
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
                          const borderColor =
                            risk === "high"
                              ? "border-l-red-500"
                              : risk === "medium"
                              ? "border-l-orange-500"
                              : "border-l-green-500";
                          return (
                            <AccordionItem
                              value={risk}
                              key={risk}
                              className={`mb-2 border rounded border-l-4 ${borderColor}`}
                            >
                              <AccordionTrigger className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-left">
                                <span>
                                  {riskLabel} ({riskIssues.length})
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <div className="space-y-4">
                                  {riskIssues.map((issue) => (
                                    <div
                                      key={issue.id}
                                      className="bg-white rounded shadow p-4 border cursor-pointer hover:bg-blue-50"
                                      onClick={() => setActiveIssueId(issue.id)}
                                    >
                                      <div className="flex items-center mb-1">
                                        <span className="font-medium text-xs text-left">
                                          {issue.title}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-500 mb-2 text-left">
                                        {issue.location}
                                      </div>
                                      <div className="mb-2">
                                        <span className="font-semibold text-xs text-left">
                                          Playbook Position:
                                        </span>
                                        <div className="bg-blue-50 p-2 rounded border border-blue-100 text-xs mt-1 text-left">
                                          {issue.playbookPosition}
                                        </div>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-xs text-left">
                                          Recommended Action:
                                        </span>
                                        <div className="bg-green-50 p-2 rounded border border-green-100 text-xs mt-1 text-left">
                                          Request modification based on playbook
                                          position.
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    )}
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
