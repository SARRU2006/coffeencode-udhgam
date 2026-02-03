import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfileInput = () => {
    const { userProfile, updateProfile } = useUser();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userProfile.age || !userProfile.gender) return;
        navigate('/dashboard');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateProfile(name, type === 'checkbox' ? checked : value);
    };

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-1rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {t('slogan.profile')}
                </div>
                <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('profile.title')}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>{t('profile.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">{t('profile.name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={userProfile.name}
                                    onChange={handleChange}
                                    placeholder=""
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('profile.age')}</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-input"
                                    value={userProfile.age}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    max="120"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">{t('profile.gender')}</label>
                                <select
                                    name="gender"
                                    className="form-select"
                                    value={userProfile.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('profile.gender.select')}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('profile.caste')}</label>
                                <select
                                    name="caste"
                                    className="form-select"
                                    value={userProfile.caste}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('profile.caste.select')}</option>
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('profile.occupation')}</label>
                            <select
                                name="occupation"
                                className="form-select"
                                value={userProfile.occupation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">{t('profile.occupation.select')}</option>
                                <option value="Student">{t('profile.occupation.student')}</option>
                                <option value="Farmer">{t('profile.occupation.farmer')}</option>
                                <option value="Unemployed">{t('profile.occupation.unemployed')}</option>
                                <option value="Worker">{t('profile.occupation.worker')}</option>
                                <option value="Salaried">{t('profile.occupation.salaried')}</option>
                                <option value="Entrepreneur">{t('profile.occupation.entrepreneur')}</option>
                                <option value="Retired">{t('profile.occupation.retired')}</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">{t('profile.income')}</label>
                                <input
                                    type="number"
                                    name="income"
                                    className="form-input"
                                    value={userProfile.income}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. 100000"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">{t('profile.state')}</label>
                                <select
                                    name="state"
                                    className="form-select"
                                    value={userProfile.state}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('profile.state.select')}</option>
                                    <option value="All India">All India</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <input
                                type="checkbox"
                                name="disability"
                                id="disability"
                                checked={userProfile.disability}
                                onChange={handleChange}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <label htmlFor="disability" style={{ cursor: 'pointer' }}>{t('profile.pwd')}</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', marginTop: '1rem' }}>
                            {t('profile.submit')}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProfileInput;
