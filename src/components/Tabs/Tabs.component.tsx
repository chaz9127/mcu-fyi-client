import './Tabs.component.scss';
type TabsType = {
    title: string,
    value: string,
    active: boolean,
    setTab: () => void,
}
type TabsProps = {
    tabs: Array<TabsType>,
}

export const Tabs = (props: TabsProps) => {
    const { tabs } = props;

    const displayTabs = () => {
        return tabs.map((tab, idx) => {
            let className = 'tab';
            if (tab.active) className += ' active';

            return <div className={className} onClick={tab.setTab} key={idx}>{tab.title}</div>
        })
    }

    return (                 
        <div className="tabs-container">
            {displayTabs()}
        </div>
    )
}

