import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ShieldAlert, CheckCircle2, XCircle, Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FraudProtection = () => {
    const { t } = useLanguage();
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);

    const checkUrl = () => {
        if (!url) return;
        const lowerUrl = url.toLowerCase();

        // Simple heuristic for demo
        const isSafe = lowerUrl.includes('.gov.in') || lowerUrl.includes('.nic.in') || lowerUrl.includes('pmjay.gov.in');

        setResult(isSafe ? 'safe' : 'suspicious');
    };

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-1rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {t('slogan.safety')}
                </div>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <ShieldAlert size={64} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('safety.title')}</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        {t('safety.subtitle')}
                    </p>
                </div>

                <div className="card" style={{ maxWidth: '800px', margin: '0 auto 3rem', padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('safety.checker_title')}</h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>{t('safety.checker_desc')}</p>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder={t('safety.placeholder')}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={checkUrl}>{t('safety.btn_check')}</button>
                        </div>

                        {result === 'safe' && (
                            <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 /> Looks like an official government domain.
                            </div>
                        )}

                        {result === 'suspicious' && (
                            <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <XCircle /> <strong>Caution:</strong> This URL does not follow standard government patterns (.gov.in / .nic.in). Proceed with care.
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    <div className="card" style={{ background: '#eff6ff', border: 'none' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Official Domains</h3>
                        <p>{t('safety.tip1')}</p>
                    </div>
                    <div className="card" style={{ background: '#fff1f2', border: 'none' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>No OTPs</h3>
                        <p>{t('safety.tip2')}</p>
                    </div>
                    <div className="card" style={{ background: '#fefce8', border: 'none' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>No Bribes</h3>
                        <p>{t('safety.tip3')}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FraudProtection;
