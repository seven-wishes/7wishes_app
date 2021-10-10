import React from 'react';
import {NavLink} from "react-router-dom";

const About = (props) => {
    return (
        <div className="about">
            <div className="wrap">
                <div className="about__wrap">
                    <div className="about__content">
                        <div className="about__content-wrap">
                            <div className="about__content-pre">ОТВЕТЬ НА ВОПРОС</div>
                            <div className="about__content-title">Пойми, <span className="hl">кого или чего</span> на самом деле <span className="hl">хочешь ты</span></div>
                            <div className="about__content-text">Мы все ищем друг друга, но часто боимся себе признаться.</div>
                            <div className="about__content-tags">
                                <div className="about__content-tag">ЖЕНА</div>
                                <div className="about__content-tag">ЛЮБОВНИЦА</div>
                                <div className="about__content-tag">ПОМОЩНИЦА ПО БИЗНЕСУ</div>
                                <div className="about__content-tag">ИСПОЛНИТЕЛЬНИЦА ФАНТАЗИЙ</div>
                                <div className="about__content-tag">ОПЫТНАЯ ЖЕНЩИНА</div>
                                <div className="about__content-tag">ДОМРАБОТНИЦА</div>
                                <div className="about__content-tag">ДРУГ</div>
                            </div>
                            <div className="about__content-actions">
                                <NavLink to="/users" className="about__content-action">Список анкет</NavLink>
                            </div>
                            <div className="about__content-comment">Мы категорически против предложения эскорт-услуг или проституции, на нашем сайте запрещено предлагать подобные услуги за любые формы вознаграждения.</div>
                        </div>
                    </div>
                    <div className="about__partners">
                        <div className="about__partners-content">
                            <div className="about__partners-title">Наши партнеры</div>
                            <div className="partners__list">
                                <div className="partners__item">
                                    <div className="partners__item-title">Лечебный массаж</div>
                                    <div className="partners__item-text">Оздоровительные сеансы массажа от врача с высшим мед. образованием помогут снять хроническую усталость, устранить проблемы со спиной и позвоночником.</div>
                                    <div className="partners__item-actions">
                                        <div className="partners__item-action">Подробнее</div>
                                    </div>
                                </div>
                            </div>
                            <div className="partners__block">
                                <div className="partners__block-title">У вас есть что предложить?</div>
                                <div className="partners__block-text">Напишите нам об этом</div>
                                <div className="partners__block-actions">
                                    <a href="mailto:info@7wishes.club" className="partners__block-action">Стать партнером</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;