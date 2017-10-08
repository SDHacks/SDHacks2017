import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import RSVPConfirm from './RSVPConfirm';

export default class BussingModal extends React.Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,

    availableBus: PropTypes.string,
    onChooseBus: PropTypes.func.isRequired
  };

  render() {
    let {toggle, isOpen, availableBus} = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="rsvp-modal">
        <ModalHeader>Available Bus</ModalHeader>
        <ModalBody className="text-center">
          <div className="rsvp-modal__bussing row">
            <div className="col-md-4">
              <i className="fa fa-bus rsvp-modal__bus" aria-hidden="true"></i>
            </div>
            <div className="col-md-8">
              We are sending a bus to your school.
              <h4 className="rsvp-modal__bus-name">{availableBus}</h4>
              Would you like to take this bus?
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="row no-gutters w-100">
            <div className="col-12 text-center mb-2">
              <Button className="rounded-button rounded-button--full" onClick={toggle}>Yes
              </Button>
            </div>
            <div className="col-12">
              <Button className="rounded-button rounded-button--secondary rounded-button--full"
                onClick={toggle}>No thanks, I'll find my own way</Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
