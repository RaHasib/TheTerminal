import './Header.styles.css';

type Command = {
    readonly icon: string;
    readonly name: string;
};

interface HeaderProps {
    title: string;
    commands: ReadonlyArray<Command>;
}

export const Header = ({ title, commands }: HeaderProps) => (
    <div className="terminal-header">
        <p>{title}</p>
        <p> Available commands:</p>
        <div className="commands">
            {commands.map(({ icon, name }) => (
                <strong key={name}>
                    {icon} {name}
                </strong>
            ))}
        </div>
    </div>
); 