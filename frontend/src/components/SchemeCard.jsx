import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SchemeCard = ({ scheme, status = 'unknown', reasons = [] }) => {
    const { t } = useLanguage();

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
                <span className="tag tag-info">{scheme.category}</span>
                {status === 'eligible' && <span className="tag tag-success">{t('dash.status_eligible')}</span>}
                {status === 'ineligible' && <span className="tag tag-warning">{t('dash.status_ineligible')}</span>}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{scheme.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                {scheme.description.substring(0, 100)}...
            </p>

            {status === 'ineligible' && reasons.length > 0 && (
                <div style={{ marginBottom: '1rem', fontSize: '0.75rem', color: '#dc2626', background: '#fef2f2', padding: '0.5rem', borderRadius: '0.375rem' }}>
                    <strong>{t('dash.why_not')}:</strong> {reasons[0]}
                </div>
            )}

            <div style={{ marginTop: 'auto' }}>
                <Link to={`/scheme/${scheme.id}`} className="btn" style={{ width: '100%', background: '#f3f4f6', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                    {t('dash.view_details')} <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default SchemeCard;
