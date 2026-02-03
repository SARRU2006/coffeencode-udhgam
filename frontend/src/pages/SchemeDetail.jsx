import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { governanceData } from '../data/schemes';
import { useUser } from '../context/UserContext';
import { checkEligibility } from '../utils/eligibility';
import { CheckCircle2, FileText, AlertCircle, ExternalLink, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SchemeDetail = () => {
    const { id } = useParams();
    const { userProfile } = useUser();
    const { t } = useLanguage();

    const scheme = governanceData.find(s => s.id === id);

    const eligibilityResult = useMemo(() => {
        if (!scheme || !userProfile.age) return null;
        return checkEligibility(userProfile, scheme);
    }, [scheme, userProfile]);

    if (!scheme) return <div>Scheme not found</div>;

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={16} /> {t('detail.back')}
                </Link>

                {/* Scam Alert Banner */}
                <div style={{ marginBottom: '2rem', padding: '1rem', background: '#fff7ed', borderLeft: '4px solid #f97316', display: 'flex', gap: '1rem', borderRadius: '0.25rem' }}>
                    <ShieldAlert color="#f97316" size={24} style={{ flexShrink: 0 }} />
                    <p style={{ color: '#9a3412', fontSize: '0.95rem' }}>
                        <strong>Scan Protection:</strong> {t('detail.scam_alert')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Main Content */}
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <span className="tag tag-info">{scheme.category}</span>
                            <span className="tag" style={{ background: '#f3f4f6' }}>{scheme.ministry}</span>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 1rem' }}>{scheme.name}</h1>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{scheme.description}</p>
                        </div>

                        <div className="card" style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                {t('detail.benefits')}
                            </h2>
                            <ul style={{ listStyle: 'none' }}>
                                {scheme.benefits.map((benefit, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <CheckCircle2 color="var(--success, #16a34a)" size={24} />
                                        <span style={{ fontSize: '1.1rem' }}>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                {t('detail.documents')}
                            </h2>
                            <div className="grid grid-cols-2">
                                {scheme.documents.map((doc, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                                        <FileText color="var(--primary)" size={24} />
                                        <span>{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ borderColor: eligibilityResult?.eligible ? '#86efac' : '#fca5a5', borderWidth: '2px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('detail.status')}</h3>

                            {eligibilityResult ? (
                                eligibilityResult.eligible ? (
                                    <div style={{ color: '#15803d', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            <CheckCircle2 /> {t('detail.eligible_yes')}
                                        </div>
                                        <p style={{ fontSize: '0.9rem' }}>{t('detail.eligible_desc')}</p>
                                    </div>
                                ) : (
                                    <div style={{ color: '#b91c1c', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            <AlertCircle /> {t('detail.eligible_no')}
                                        </div>
                                        <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
                                            {eligibilityResult.reasons.map((r, i) => (
                                                <li key={i} style={{ marginBottom: '0.25rem' }}>{r}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ) : (
                                <p>Complete your profile to check eligibility.</p>
                            )}
                        </div>

                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('detail.facts')}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('detail.income_limit')}</span>
                                    <span style={{ fontSize: '1.1rem' }}>₹{scheme.eligibility.incomeLimit.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('detail.age_group')}</span>
                                    <span style={{ fontSize: '1.1rem' }}>{scheme.eligibility.minAge} - {scheme.eligibility.maxAge} years</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('detail.target')}</span>
                                    <span style={{ fontSize: '1.1rem' }}>{scheme.eligibility.occupation.join(", ")}</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href={scheme.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-large"
                            style={{ textAlign: 'center', justifyContent: 'center' }}
                        >
                            {t('detail.apply')} <ExternalLink size={20} style={{ marginLeft: '0.5rem' }} />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SchemeDetail;
