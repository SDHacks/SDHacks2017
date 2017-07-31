import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import fields from './Fields';

export default class FileField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    accept: PropTypes.string,
    multiple: PropTypes.bool
  };

  /**
   * Event handler for dropping or clicking a new file into the zone.
   */
  handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
    let eventOrValue = e;
    let {input: {onChange, onBlur}} = this.props;
    if (e.type === 'drop') {
      if (acceptedFiles.length) {
        // FileList or [File]
        eventOrValue =
          (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
      } else {
        eventOrValue = null;
      }
    }
    onBlur(eventOrValue); // update touched
    onChange(eventOrValue); // update value
  }


  render() {
    let {input, meta: {touched, error}} = this.props;
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick
    };

    return (
      <div>
        <input type='hidden' disabled {...input} />
        {selectedFile? <span>{selectedFile.name}</span> : null}
        <Dropzone {...dropzoneProps}>
          <div className="sd-form__dropzone text-center">
            <div className={'sd-form__dropzone--icon d-flex ' +
              'flex-column justify-content-end'}>
              <i className="fa fa-cloud-upload"></i>
            </div>
            <div className="sd-form__dropzone--text">
              Drop Your Resume
            </div>
          </div>
        </Dropzone>
        {touched && error && fields.createError(error)}
      </div>
    );
  }
};
