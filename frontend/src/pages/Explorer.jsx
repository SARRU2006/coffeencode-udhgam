import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { governanceData } from '../data/schemes';
import SchemeCard from '../components/SchemeCard';
import { Search } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { checkEligibility } from '../utils/eligibility';
import { useLanguage } from '../context/LanguageContext';

const Explorer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const { userProfile } = useUser();
    const { t } = useLanguage();

    const categories = ['All', ...new Set(governanceData.map(s => s.category))];

    const filteredSchemes = governanceData.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || scheme.category === categoryFilter;
        return matchesSearch && matchesCategory;
    }).map(scheme => {
        // Calculate eligibility if profile exists
        if (userProfile.age) {
            const check = checkEligibility(userProfile, scheme);
            return { ...scheme, status: check.eligible ? 'eligible' : 'ineligible', reasons: check.reasons };
        }
        return scheme;
    });

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-1rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {t('slogan.explorer')}
                </div>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('explorer.title')}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t('explorer.subtitle')}</p>
                </div>

                <div className="card" style={{ padding: '1.5rem', marginBottom: '3rem' }}>
                    <div className="explorer-search-grid">
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                placeholder={t('explorer.search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="form-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            {categories.map(c => <option key={c} value={c}>{c === 'All' ? t('explorer.all') : c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3">
                    {filteredSchemes.map(scheme => (
                        <SchemeCard
                            key={scheme.id}
                            scheme={scheme}
                            status={scheme.status}
                            reasons={scheme.reasons}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Explorer;
