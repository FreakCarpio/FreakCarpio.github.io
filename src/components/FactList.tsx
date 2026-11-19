import type { Fact } from '../content/types';

interface Props {
    facts: Fact[];
    /** technical: mono uppercase labels (project data) · editorial: plain labels */
    variant?: 'technical' | 'editorial';
    className?: string;
}

/** Label/value pairs. A label can have several values, stacked. */
export function FactList({ facts, variant = 'editorial', className = '' }: Props) {
    return (
        <dl className={`fact-list fact-list-${variant} ${className}`}>
            {facts.map((fact) => (
                <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    {fact.values.map((value) => (
                        <dd key={value}>{value}</dd>
                    ))}
                </div>
            ))}
        </dl>
    );
}
