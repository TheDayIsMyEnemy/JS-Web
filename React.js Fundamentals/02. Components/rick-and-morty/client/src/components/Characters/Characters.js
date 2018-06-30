import React from 'react';

import Roster from './Roster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROOSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			images: [],
			details: {
				name: null,
				id: null,
				url: null,
				bio: null
			}
		}
	}

	componentDidMount(){
		this.fetchRooster();
	}

	fetchRooster(){
		fetcher.get(ROOSTER_ENPOINT, data => {
			var mappedData = data.map(i=> ({
				id: i.id,
				url: i.url
			}));
			this.setState({images: mappedData});
		});

	}

	fetchDetails = (id) => fetcher.get(DETAILS_ENDPOINT + id, data => this.setState({details:data}));

	selectCharacter = (id) => this.fetchDetails(id); 

    render = () => (
            <div>
                <Roster images={this.state.images} selectCharacter={this.fetchDetails}/>
                <Details {...this.state.details}/>
            </div>
        )
}