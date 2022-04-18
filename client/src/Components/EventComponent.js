import React from "react";

export default class EventComponent extends React.Component {

    constructor(props) {
        //let events = JSON.parse(sessionStorage.getItem('events'));
        super(props);
        // console.log("check");
        //console.log(props.Title);
        //console.log(props.TITLE);console.log("comp");

        this.state = {

            Title: props.TITLE,
            subtext: props.EVENT_SUBTEXT,
            category: props.EVENT_CATEGORY,
            image: props.EVENT_IMAGE_THUMB



        }
        

    }

    
    render() {
        return (
            <div>
                <h1>Title: {this.state.Title} </h1>
                <h3>Category: {this.state.category} </h3>

                
                <div >
                <img src={this.state.image}/>
                </div>
                <br />
                <p>Information: {this.state.subtext} </p>

                <br />
                <br />
            </div>


        );
    }
}