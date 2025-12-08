import React from 'react';
import s from './Footer.module.css';
import YandexMap from '../YandexMap/YandexMap';


import InstagramIcon from '../../assets/icons/ic-instagram.svg';
import WhatsAppIcon from '../../assets/icons/ic-whatsapp.svg';

const CONTACT_DATA = {
    phone: '+7 (499) 350-66-04',
    socials: [
        { id: 1, icon: InstagramIcon, label: 'Instagram', url: 'https://www.instagram.com/' }, 
        { id: 2, icon: WhatsAppIcon, label: 'Чат/WhatsApp', url: 'https://web.whatsapp.com/' } 
    ],
    address: 'Dubininskaya Ulitsa, 96, Moscow, Russia, 115093',
    hours: '24 hours a day',
};

const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                
                <div className={s.sectionHeader}>
                    <h2>Contact</h2>
                </div>
                
                <div className={s.infoGrid}>
                    
                    <div className={s.infoCard}>
                        <p className={s.cardTitle}>Phone</p>
                        <h3 className={s.cardContent}>{CONTACT_DATA.phone}</h3>
                    </div>

                    <div className={`${s.infoCard} ${s.cardLarge}`}>
                    <p className={s.cardTitle}>Socials</p>
                        <div className={s.socialIcons}>
                                {CONTACT_DATA.socials.map(social => (
                                    <a 
                                        key={social.id} 
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={s.socialIcon}
                                        title={social.label}
                                    >
                                        <img 
                                            src={social.icon} 
                                            alt={social.label} 
                                            className={s.socialImage} 
                                        />
                                    </a>
                                ))}
                            </div>
                    </div>
                    <div className={`${s.infoCard} ${s.cardLarge}`}>
                        <p className={s.cardTitle}>Address</p>
                        <h3 className={s.cardContent}>{CONTACT_DATA.address}</h3>
                    </div>

                    <div className={s.infoCard}>
                        <p className={s.cardTitle}>Working Hours</p>
                        <h3 className={s.cardContent}>{CONTACT_DATA.hours}</h3>
                    </div>
                </div>

                <div className={s.mapContainer}>
                    <YandexMap />
                    
                </div>
            </div>
            
            <div className={s.copyright}>
                <p>© {new Date().getFullYear()} Garden Store.</p>
            </div>
        </footer>
    );
};

export default Footer;