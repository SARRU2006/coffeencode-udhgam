import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShieldCheck, Search, FileText, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div style={{ background: 'var(--bg-color)', minHeight: '100vh' }}>
            <Navbar />

            {/* Slogan Banner - Professional Top Strip */}
            <div style={{
                background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
                color: '#fef3c7',
                textAlign: 'center',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginTop: '4.5rem' // Offset for fixed navbar
            }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" style={{ height: '16px', filter: 'invert(1) sepia(100%) saturate(1000%) hue-rotate(0deg) brightness(120%)' }} />
                    {t('slogan.home')}
                </span>
            </div>

            <main className="container">
                <section className="hero-section animate-fade-in" style={{ padding: '6rem 0 4rem' }}>

                    {/* Decorative Element */}
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        background: 'rgba(67, 56, 202, 0.1)',
                        color: 'var(--primary)',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(67, 56, 202, 0.2)'
                    }}>
                        {t('home.badge')}
                    </div>

                    <h1 className="hero-title" style={{ fontSize: '3.5rem', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                        {t('home.title')}
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', lineHeight: '1.75', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
                        {t('home.subtitle')}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/profile" className="btn btn-primary btn-large" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 25px -5px rgba(67, 56, 202, 0.4)' }}>
                            {t('home.cta_primary')}
                        </Link>
                        <Link to="/explorer" className="btn btn-large" style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            {t('home.cta_secondary')}
                        </Link>
                    </div>
                </section>

                <section style={{ padding: '2rem 0 6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        icon={<ShieldCheck size={32} color="white" />}
                        iconBg="linear-gradient(135deg, #4f46e5, #4338ca)"
                        title={t('home.feat1_title')}
                        desc={t('home.feat1_desc')}
                    />
                    <FeatureCard
                        icon={<Search size={32} color="white" />}
                        iconBg="linear-gradient(135deg, #0ea5e9, #0284c7)"
                        title={t('home.feat2_title')}
                        desc={t('home.feat2_desc')}
                    />
                    <FeatureCard
                        icon={<ShieldAlert size={32} color="white" />}
                        iconBg="linear-gradient(135deg, #f43f5e, #e11d48)"
                        title={t('home.feat3_title')}
                        desc={t('home.feat3_desc')}
                    />
                </section>
            </main>
        </div>
    );
};

const FeatureCard = ({ icon, iconBg, title, desc }) => (
    <div className="card feature-card" style={{
        padding: '2.5rem',
        border: '1px solid rgba(255,255,255,0.6)',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
        <div style={{
            width: '64px',
            height: '64px',
            background: iconBg,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: '800', color: 'var(--text-main)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

export default Home;
