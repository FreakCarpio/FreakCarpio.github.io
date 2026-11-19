import type { Metric } from '../content/types';

/**
 * Large figures for measured results.
 *
 * A metric with value === null is PENDIENTE and is skipped. With no measured
 * values at all the component renders nothing, so an empty or estimated
 * number can never reach the page.
 */
export function Metrics({ metrics }: { metrics: Metric[] }) {
    const measured = metrics.filter((metric) => metric.value !== null);

    if (measured.length === 0) return null;

    return (
        <dl className="metrics">
            {measured.map((metric) => (
                <div className="metric" key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd className="metric-value">{metric.value}</dd>
                    {metric.source && <dd className="metric-source">{metric.source}</dd>}
                </div>
            ))}
        </dl>
    );
}
