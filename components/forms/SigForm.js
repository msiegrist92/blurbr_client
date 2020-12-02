import React, {useState} from 'react';
import axios from 'axios';

const SigForm = (props) => {

  return (
    <div id='sig_form'>
      <form onSubmit={(e) => {props.changeSig(e, props.sig)}}>
        <h2>Change Your Signature</h2>
        <input required id='signature'
          onChange={(e) => props.updateSig(e.target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default SigForm;
