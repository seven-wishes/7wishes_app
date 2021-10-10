import React from 'react';
import AccountAvatar from "./AccountAvatar";
import AccountGallery from "./AccountGallery";
import AccountNickname from "./AccountNickname";
import AccountCity from "./AccountCity";
import AccountDescription from "./AccountDescription";
import AccountHeight from "./AccountHeight";
import AccountWeight from "./AccountWeight";
import AccountHairs from "./AccountHairs";
import AccountEyes from "./AccountEyes";
import AccountGoal from "./AccountGoals";
import AccountAge from "./AccountAge";

const AccountBlock = (props) => {
    return (
        <div className={`tab account ${props.profile_tab ===  "account" ? "active" : ""}`} id="account">
            <h2 className="account__title">Мой профиль</h2>
            <AccountAvatar avatar_url={`http://7-wishes.ru${props.account.avatar_url}`} uploadPhoto={props.uploadPhoto} zoom_image={props.zoom_image} zoom={props.zoom} />
            {props.account.avatar_url ? <AccountGallery images={props.account.images} deleteGalleryItem={props.deleteGalleryItem} uploadGallery={props.uploadGallery} /> : null}

            <div className="account__section">
                <h3 className="account__section-title">Общая информация</h3>
                <div className="account__section-wrap">
                    <div className="account__section-row">
                        <div className="account__section-col">
                            <label htmlFor="" className="account__section-label">Мой пол</label>
                            <input className="account__section-input" disabled={true} type="text"
                                   value={props.account.gender_name}/>
                        </div>
                        <div className="account__section-col">
                            <AccountAge label="Дата рождения" update={props.updateAge}
                                             value={props.account.birth_date}/>
                        </div>
                    </div>
                    <div className="account__section-row">
                        <div className="account__section-col">
                            <AccountNickname label="Моё имя" update={props.updateNickname}
                                             value={props.account.nickname}/>
                        </div>
                        <div className="account__section-col">
                            <AccountCity cities={props.cities} city_id={props.account.city_id}
                                         city_title={props.account.city_title} update={props.updateCity}/>
                        </div>
                    </div>
                    <div className="account__section-row">
                        <div className="account__section-col account__section-col--fullwidth">
                            <AccountDescription label="Кратко обо мне" update={props.updateDescription}
                                                value={props.account.description}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__section">
                <h3 className="account__section-title">Дополнительно</h3>
                <div className="account__section-wrap">
                    <div className="account__section-row">
                        <div className="account__section-col">
                            <AccountHeight label="Мой рост" update={props.updateHeight} value={props.account.height}/>
                        </div>
                        <div className="account__section-col">
                            <AccountWeight label="Мой вес" update={props.updateWeight} value={props.account.weight}/>
                        </div>
                    </div>
                    <div className="account__section-row">
                        <div className="account__section-col">
                            <AccountHairs gender_id={props.account.gender_id} hair_colors={props.hair_colors} hair_color_id={props.account.hair_color_id}
                                          hair_color_title={props.account.gender_id === 0 ? props.account.hair_color_woman : props.account.hair_color_title}
                                          update={props.updateHairColor}/>
                        </div>
                        <div className="account__section-col">
                            <AccountEyes eye_colors={props.eye_colors} eye_color_id={props.account.eye_color_id}
                                         eye_color_title={props.account.eye_color_title} update={props.updateEyeColor}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__section">
                <h3 className="account__section-title">Цели знакомства</h3>
                <div className="account__section-wrap">
                    <div className="account__section-row">
                        <div className="account__section-col account__section-col--fullwidth">
                            <AccountGoal goals={props.goals}
                                         spouse={props.account.spouse}
                                         paramour={props.account.paramour}
                                         performer={props.account.performer}
                                         mlfa={props.account.mlfa}
                                         assistant={props.account.assistant}
                                         housemaid={props.account.housemaid}
                                         friend={props.account.friend}
                                         updateGoal={props.updateGoal}
                                         gender_id={props.account.gender_id}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__actions">
                <button className="account__save">Сохранить</button>
            </div>
        </div>
    );
};

export default AccountBlock;