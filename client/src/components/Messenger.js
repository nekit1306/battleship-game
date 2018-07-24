/**
 * Created by Kasutaja on 15.04.2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Messenger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpened: false
        };
    }

    handleChatClick = () => {
        this.setState({
            dialogOpened: !this.state.dialogOpened
        })
    };

    render() {
        const {readyForBattle} = this.props;

        return (
            <div className={"chat-block " + (this.state.dialogOpened ? 'chat-opened' : '')}>
                <div className="chat-icon-send" onClick={() => this.handleChatClick()}>
                    <span className={"fas " + (this.state.dialogOpened ? 'fa-paper-plane' : 'fa-envelope')}></span>
                </div>
                <div className="chat-inner-window">
                    <div className="chat-header">
                        { !readyForBattle &&
                        <div className="">Opponent is not connected
                            <i className="fas fa-times float-right"></i>
                        </div>
                        }
                        { readyForBattle &&
                        <div className="">Opponent is connected
                        </div>
                        }
                    </div>
                    <div className="chat-history">
                        <div className="chat-history-messages">
                            <div className="message-block clearfix">
                                <div className="message-bubble bubble-left">Lorem ipsum</div>
                            </div>
                            <div className="message-block clearfix">
                                <div className="message-bubble bubble-right">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-message">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Type your message..."/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Messenger;