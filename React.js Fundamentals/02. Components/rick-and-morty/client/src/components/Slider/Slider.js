import React from 'react';
import fetcher from '../../fetcher';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			url: null,
			id: null
		}

		this.getPreviousEp = this.getPreviousEp.bind(this);
		this.getNextEp = this.getNextEp.bind(this);
	}

	componentDidMount(){
		this.fetchEpisode(0);
	}

	fetchEpisode(id){		
		fetcher.get(IMAGE_URL + id, data => this.setState(data));
	}

	getPreviousEp(){
		this.fetchEpisode(this.state.id - 1);
	}

	getNextEp(){
		this.fetchEpisode(this.state.id + 1);
	}

    render = () => (
            <section id="slider">
                <img 
                	className="button" 
                	src="/left.png" 
                	title="previous" 
                	alt="nav" 
                	onClick={this.getPreviousEp}/>
                <div className="image-container">
                    <img src={this.state.url} alt="episode" />
                </div>
                <img 
                className="button" 
                src="/right.png" 
                title="next" 
                alt="nav" 
                onClick={this.getNextEp}/>
            </section>
        );
}