import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileEdit, CheckCircle, Download, Zap } from 'lucide-react';
import { DocumentCard } from '../components/DocumentCard';
import { documentsData } from '../data/documents';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/documents?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularDocs = documentsData.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-blob-extra" aria-hidden="true" />
        <div className="container">
          <div className="hero-badge">
            <Zap size={14} />
            {t('home.badge')}
          </div>
          <h1 className="hero-title">
            {t('home.title')} <span>{t('home.titleHighlight')}</span>.
          </h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          
          <form className="search-container" onSubmit={handleSearch} id="hero-search-form">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              className="search-input"
              placeholder={t('home.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search-input"
            />
          </form>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">11+</div>
              <div className="stat-label">{t('home.services')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">{t('home.freeToUse')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">{t('home.ads')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section" id="quick-actions">
        <div className="container">
          <h2 className="section-title">{t('home.whatToDo')}</h2>
          <div className="quick-actions-grid">
            <div className="action-card" onClick={() => navigate('/documents')} id="action-apply">
              <div className="action-icon-wrapper">
                <FileEdit size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.applyNew')}</h3>
                <p className="action-subtitle">{t('home.applyNewDesc')}</p>
              </div>
            </div>
            
            <div className="action-card" onClick={() => navigate('/status')} id="action-status">
              <div className="action-icon-wrapper">
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.checkStatus')}</h3>
                <p className="action-subtitle">{t('home.checkStatusDesc')}</p>
              </div>
            </div>
            
            <div className="action-card" onClick={() => navigate('/documents')} id="action-download">
              <div className="action-icon-wrapper">
                <Download size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.download')}</h3>
                <p className="action-subtitle">{t('home.downloadDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Documents */}
      <section className="popular-docs-section" id="popular-services">
        <div className="container">
          <h2 className="section-title">{t('home.mostRequested')}</h2>
          <div className="docs-grid">
            {popularDocs.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <button className="btn btn-outline" onClick={() => navigate('/documents')} id="view-all-btn">
              {t('home.viewAll')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
