import { useState } from "react";
import "./tabs.scss";

const Tabs = ({ tabs, defaultActiveTab }: any) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="tab-header">
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            className={`tab-pane ${activeTab === tab.id ? "active" : "hidden"}`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
