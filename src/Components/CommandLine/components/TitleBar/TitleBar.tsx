import './TitleBar.styles.css';

interface TitleBarProps {
    title: string;
}

export const TitleBar = ({ title }: TitleBarProps) => (
    <>
        <div className="terminal-controls" />
        <div className="terminal-title">{title}</div>
    </>
); 