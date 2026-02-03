import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, User, Home, ShieldAlert, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="brand">
                    <div className="logo-icon">AI</div>
                    <span className="brand-text">{t('nav.brand')}</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">{t('nav.home')}</Link>
                    <Link to="/explorer" className="nav-link">{t('nav.explorer')}</Link>
                    <Link to="/upload-pdf" className="nav-link">{t('nav.pdf')}</Link>
                    <Link to="/profile" className="nav-link">{t('nav.profile')}</Link>
                    <Link to="/safety" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldAlert size={16} /> {t('nav.safety')}
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Globe size={20} style={{ marginRight: '0.5rem', color: 'var(--text-secondary)' }} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{ border: 'none', background: 'transparent', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="te">తెలుగు</option>
                        </select>
                    </div>

                    <Link to="/profile" className="btn btn-primary">
                        {t('nav.checkEligibility')}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
