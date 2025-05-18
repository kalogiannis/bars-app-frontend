
const TABS = ['description', 'hours', 'photos', 'location', 'reviews'] as const;
type Tab = typeof TABS[number];

type TabsProps ={
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Tabs = ({ activeTab, onTabChange } : TabsProps) => (
  <nav className="flex space-x-8 border-b border-gray-700 overflow-x-auto">
    {TABS.map(tab => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`pb-2 text-lg font-medium ${
          activeTab === tab
            ? 'border-b-2 border-white'
            : 'border-b-2 border-transparent hover:border-gray-600'
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </nav>
);

export type { Tab };
export default Tabs;