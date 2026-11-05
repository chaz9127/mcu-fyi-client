import './Tabs.component.scss';
type TabsType = {
    title: string,
    value: string,
    active: boolean,
    setTab: () => void,
}
type TabsProps = {
    tabs: Array<TabsType>,
    label?: string,
}

export const Tabs = (props: TabsProps) => {
    const { tabs, label } = props;

    const displayTabs = () => {
        return tabs.map((tab, idx) => {
            let className = 'tab';
            if (tab.active) className += ' active';

            return <button type="button" aria-pressed={tab.active} className={className} onClick={tab.setTab} key={idx}>{tab.title}</button>
        })
    }

    return (                 
        <div className="tabs-container" role="group" aria-label={label}>
            {displayTabs()}
        </div>
    )
}

