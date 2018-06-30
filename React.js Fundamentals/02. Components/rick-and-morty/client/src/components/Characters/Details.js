import React from 'react';

export default class Details extends React.Component {
    
        render(){
            const isSelected = this.props.bio != null;
            let result;
            if(isSelected){
                 result = (<section id="bio">
                <div className="image">
                    <img src={this.props.url} alt="not found"/>
                </div>
                <div className="info">
                    <p>Name: <strong>{this.props.name}</strong></p>
                    <p>Bio:</p>
                    <p>{this.props.bio}</p>
                </div>
            </section>)
            }
            else{
                result = (<div>Select a character!</div>)
            }

            return result;
        }
}