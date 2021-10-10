import React from 'react';

const AccountGoal = (props) => {
    const isMan = props.gender_id === 1;
    return (
        <div className="account__goals">
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_spouse" type="checkbox" defaultChecked={props.spouse} />
                <label className="account__goal-label" htmlFor="account_goal_spouse" onClick={() => {props.updateGoal('spouse', !props.spouse)}}>{isMan ? "Ищу жену" : "Ищу мужа"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_paramour" type="checkbox" defaultChecked={props.paramour} />
                <label className="account__goal-label" htmlFor="account_goal_paramour" onClick={() => {props.updateGoal('paramour', !props.paramour)}}>{isMan ? "Ищу любовницу" : "Ищу любовника"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_performer" type="checkbox" defaultChecked={props.performer} />
                <label className="account__goal-label" htmlFor="account_goal_performer" onClick={() => {props.updateGoal('performer', !props.performer)}}>{isMan ? "Ищу приключения" : "Ищу приключения"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_mlfa" type="checkbox" defaultChecked={props.mlfa} />
                <label className="account__goal-label" htmlFor="account_goal_mlfa" onClick={() => {props.updateGoal('mlfa', !props.mlfa)}}>{isMan ? "Ищу опытную женщину" : "Ищу спонсора"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_assistant" type="checkbox" defaultChecked={props.assistant} />
                <label className="account__goal-label" htmlFor="account_goal_assistant" onClick={() => {props.updateGoal('assistant', !props.assistant)}}>{isMan ? "Ищу помощницу" : "Ищу работу личного секретаря"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_housemaid" type="checkbox" defaultChecked={props.housemaid} />
                <label className="account__goal-label" htmlFor="account_goal_housemaid" onClick={() => {props.updateGoal('housemaid', !props.housemaid)}}>{isMan ? "Ищу домработницу" : "Ищу работу домработницы"}</label>
            </div>
            <div className="account__goal">
                <input className="account__goal-input" id="account_goal_friend" type="checkbox" defaultChecked={props.friend} />
                <label className="account__goal-label" htmlFor="account_goal_friend" onClick={() => {props.updateGoal('friend', !props.friend)}}>{isMan ? "Ищу подругу" : "Ищу друга"}</label>
            </div>
        </div>
    );
};

export default AccountGoal;