import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { FileText, CheckCircle2, AlertCircle, Loader2, UploadCloud, ChevronRight } from 'lucide-react';
import { governanceData } from '../data/schemes';

const PDFUploader = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1); // 1: Upload, 1.5: Select Scheme (if unknown), 2: Details, 3: Result
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [parsedScheme, setParsedScheme] = useState(null);
    const [matchPercentage, setMatchPercentage] = useState(0);
    const [matchBreakdown, setMatchBreakdown] = useState({});

    // Local state for immediate checking without affecting global profile
    const [localProfile, setLocalProfile] = useState({
        age: '',
        gender: '',
        occupation: '',
        income: ''
    });

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setIsAnalyzing(true);

            // Simulate AI parsing
            setTimeout(() => {
                setIsAnalyzing(false);
                const filename = file.name.toLowerCase();

                // Match filename keywords
                let matchedScheme = governanceData.find(s =>
                    filename.includes(s.id) ||
                    filename.includes(s.name.toLowerCase().split(' ')[0]) ||
                    filename.includes(s.category.toLowerCase())
                );

                // Extra fallback keywords
                if (!matchedScheme && filename.includes('kisan')) matchedScheme = governanceData.find(s => s.id === 'pm-kisan');
                if (!matchedScheme && (filename.includes('housing') || filename.includes('home') || filename.includes('awas'))) matchedScheme = governanceData.find(s => s.id === 'pmay-urban');
                if (!matchedScheme && filename.includes('pension')) matchedScheme = governanceData.find(s => s.id === 'atal-pension');
                if (!matchedScheme && filename.includes('student')) matchedScheme = governanceData.find(s => s.id === 'post-matric-sc');

                if (matchedScheme) {
                    setParsedScheme(matchedScheme);
                    setStep(2);
                } else {
                    setStep(1.5);
                }
            }, 2000);
        }
    }, []);

    const handleManualSelection = (schemeId) => {
        const matchedScheme = governanceData.find(s => s.id === schemeId);
        if (matchedScheme) {
            setParsedScheme(matchedScheme);
            setStep(2);
        }
    };

    const handleCheckEligibility = (e) => {
        e.preventDefault();

        let score = 0;
        let totalChecks = 3;
        let breakdown = { age: false, income: false, occupation: false };

        // 1. Age Check (STRICT)
        const age = parseInt(localProfile.age);
        if (!isNaN(age) && age >= parsedScheme.eligibility.minAge && age <= parsedScheme.eligibility.maxAge) {
            score++;
            breakdown.age = true;
        }

        // 2. Income Check (STRICT)
        const income = parseInt(localProfile.income.toString().replace(/,/g, ''));
        if (!isNaN(income) && income <= parsedScheme.eligibility.incomeLimit) {
            score++;
            breakdown.income = true;
        }

        // 3. Occupation Check 
        const schemeOccs = parsedScheme.eligibility.occupation || parsedScheme.eligibility.occupations || [];

        if (schemeOccs.length > 0) {
            const userOcc = localProfile.occupation.trim().toLowerCase();
            const isMatch = schemeOccs.some(occ => {
                const schemeOccLower = occ.toLowerCase();
                return schemeOccLower === userOcc ||
                    schemeOccLower.includes(userOcc) ||
                    userOcc.includes(schemeOccLower);
            });

            if (isMatch) {
                score++;
                breakdown.occupation = true;
            }
        } else {
            score++;
            breakdown.occupation = true;
        }

        // Calculation: If Age OR Income fails, force 0% match (Strict Mode)
        let percentage = Math.round((score / totalChecks) * 100);
        if (breakdown.age === false || breakdown.income === false) {
            percentage = 0; // Disqualify if basic criteria not met
        }

        setMatchPercentage(percentage);
        setMatchBreakdown(breakdown);
        setStep(3);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const getSchemeName = (scheme) => {
        if (!scheme) return "";
        const key = `scheme.${scheme.id}.name`;
        const translated = t(key);
        return translated !== key ? translated : scheme.name;
    };

    const getSchemeDesc = (scheme) => {
        if (!scheme) return "";
        const key = `scheme.${scheme.id}.desc`;
        const translated = t(key);
        return translated !== key ? translated : scheme.description;
    };

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-2rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {t('slogan.pdf')}
                </div>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t('pdf.title')}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t('pdf.subtitle')}</p>
                </div>

                {step === 1 && (
                    <div
                        {...getRootProps()}
                        className={`card animate-fade-in ${isDragActive ? 'drag-active' : ''}`}
                        style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            border: '2px dashed var(--primary)',
                            cursor: 'pointer',
                            background: isDragActive ? 'var(--blue-50)' : 'white'
                        }}
                    >
                        <input {...getInputProps()} />
                        {isAnalyzing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                                <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>{t('pdf.analyzing')}</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', background: '#eff6ff',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <UploadCloud size={40} color="var(--primary)" />
                                </div>
                                <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>
                                    {isDragActive ? "Drop it here!" : t('pdf.drop')}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {step === 1.5 && (
                    <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ margin: '0 auto 1rem', width: '60px', height: '60px', borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AlertCircle size={32} color="#ea580c" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{t('pdf.identify')}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{t('pdf.identify_desc')}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                            {governanceData.map(scheme => (
                                <button
                                    key={scheme.id}
                                    onClick={() => handleManualSelection(scheme.id)}
                                    className="btn"
                                    style={{
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        background: 'white',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-main)',
                                        padding: '1rem'
                                    }}
                                >
                                    {getSchemeName(scheme)}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(1)} className="btn" style={{ width: '100%', marginTop: '1.5rem', background: '#f3f4f6', color: 'var(--text-secondary)' }}>
                            {t('pdf.manual_cancel')}
                        </button>
                    </div>
                )}

                {step === 2 && parsedScheme && (
                    <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <span className="tag tag-info">{t('pdf.parsed')}</span>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{getSchemeName(parsedScheme)}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{t('pdf.enter_details')}</p>
                        </div>

                        <form onSubmit={handleCheckEligibility} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">{t('profile.age')}</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    required
                                    value={localProfile.age}
                                    onChange={(e) => setLocalProfile({ ...localProfile, age: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">{t('profile.occupation')}</label>
                                <select
                                    className="form-select"
                                    required
                                    value={localProfile.occupation}
                                    onChange={(e) => setLocalProfile({ ...localProfile, occupation: e.target.value })}
                                >
                                    <option value="">{t('profile.occupation.select')}</option>
                                    <option value="Student">{t('profile.occupation.student')}</option>
                                    <option value="Unemployed">{t('profile.occupation.unemployed')}</option>
                                    <option value="Farmer">{t('profile.occupation.farmer')}</option>
                                    <option value="Worker">{t('profile.occupation.worker')}</option>
                                    <option value="Entrepreneur">{t('profile.occupation.entrepreneur')}</option>
                                    <option value="Retired">{t('profile.occupation.retired')}</option>
                                </select>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">{t('profile.income')}</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    required
                                    value={localProfile.income}
                                    onChange={(e) => setLocalProfile({ ...localProfile, income: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                                {t('pdf.check_match')} <ChevronRight size={20} />
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && parsedScheme && (
                    <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                        <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{t('pdf.result_title')}</h2>
                            <button onClick={() => { setStep(1); setMatchPercentage(0); }} className="btn" style={{ fontSize: '0.875rem', background: '#f3f4f6' }}>{t('pdf.upload_another')}</button>
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
                            {/* Visual Percentage */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: matchPercentage > 50 ? '#f0fdf4' : '#fff1f2', borderRadius: '1rem', border: matchPercentage > 50 ? '1px solid #bbf7d0' : '1px solid #fecaca' }}>
                                <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke={matchPercentage > 50 ? "#dcfce7" : "#fee2e2"}
                                            strokeWidth="3.5"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke={matchPercentage > 50 ? "#16a34a" : "#dc2626"}
                                            strokeWidth="3.5"
                                            strokeDasharray={`${matchPercentage}, 100`}
                                        />
                                    </svg>

                                    <div style={{ position: 'absolute', fontSize: '2.5rem', fontWeight: 'bold', color: matchPercentage > 50 ? '#15803d' : '#b91c1c' }}>
                                        {matchPercentage}%
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: matchPercentage > 50 ? '#15803d' : '#b91c1c' }}>
                                    {matchPercentage > 70 ? t('pdf.match_strong') : (matchPercentage > 40 ? t('pdf.match_partial') : t('pdf.match_low'))}
                                </h3>

                                <div style={{ marginTop: '1rem', fontSize: '0.875rem', textAlign: 'left', width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span>{t('pdf.match.age')}:</span>
                                        <span style={{ color: matchBreakdown.age ? 'green' : 'red', fontWeight: 'bold' }}>{matchBreakdown.age ? '✅' : '❌'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span>{t('pdf.match.income')}:</span>
                                        <span style={{ color: matchBreakdown.income ? 'green' : 'red', fontWeight: 'bold' }}>{matchBreakdown.income ? '✅' : '❌'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{t('pdf.match.job')}:</span>
                                        <span style={{ color: matchBreakdown.occupation ? 'green' : 'red', fontWeight: 'bold' }}>{matchBreakdown.occupation ? '✅' : '❌'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{getSchemeName(parsedScheme)}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{getSchemeDesc(parsedScheme)}</p>

                                <h4 style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--primary)' }}>{t('pdf.key_req')}</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{t('pdf.age_range')}</span>
                                        <span style={{ fontWeight: '600' }}>{parsedScheme.eligibility.minAge} - {parsedScheme.eligibility.maxAge} years</span>
                                    </li>
                                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{t('pdf.income_limit')}</span>
                                        <span style={{ fontWeight: '600' }}>₹{parsedScheme.eligibility.incomeLimit.toLocaleString()}</span>
                                    </li>
                                    <li style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{t('pdf.target')}</span>
                                        <span style={{ fontWeight: '600' }}>
                                            {parsedScheme.eligibility.occupation ? parsedScheme.eligibility.occupation.join(", ") :
                                                (parsedScheme.eligibility.occupations ? parsedScheme.eligibility.occupations.join(", ") : "All")}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PDFUploader;
