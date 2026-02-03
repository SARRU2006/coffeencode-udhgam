import React, { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { governanceData } from '../data/schemes';
import { checkEligibility } from '../utils/eligibility';
import SchemeCard from '../components/SchemeCard';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
    const { userProfile } = useUser();
    const { t } = useLanguage();

    const results = useMemo(() => {
        return governanceData.map(scheme => {
            const { eligible, reasons } = checkEligibility(userProfile, scheme);
            return { ...scheme, eligible, reasons };
        });
    }, [userProfile]);

    const eligibleSchemes = results.filter(r => r.eligible);
    const ineligibleSchemes = results.filter(r => !r.eligible);

    if (!userProfile.age) {
        return (
            <div>
                <Navbar />
                <main className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Profile Found</h2>
                    <p style={{ marginBottom: '2rem' }}>Please complete your profile to see eligible schemes.</p>
                    <Link to="/profile" className="btn btn-primary">{t('nav.checkEligibility')}</Link>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {t('dash.hello')}, {userProfile.name}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {t('dash.eligible_msg')} <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{eligibleSchemes.length}</span> {t('dash.schemes')}.
                    </p>
                </header>

                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ✅ {t('dash.title_eligible')}
                    </h2>
                    {eligibleSchemes.length > 0 ? (
                        <div className="grid grid-cols-3">
                            {eligibleSchemes.map(scheme => (
                                <SchemeCard key={scheme.id} scheme={scheme} status="eligible" />
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <p>{t('dash.no_match')}</p>
                        </div>
                    )}
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                        {t('dash.title_ineligible')}
                    </h2>
                    <div className="grid grid-cols-3" style={{ opacity: 0.8 }}>
                        {ineligibleSchemes.map(scheme => (
                            <SchemeCard key={scheme.id} scheme={scheme} status="ineligible" reasons={scheme.reasons} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
