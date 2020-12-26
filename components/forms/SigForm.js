import React, {useState} from 'react';
import axios from 'axios';

import {animateToggle, animateToggleDisplayTimeOut} from '../../lib/utils/animationHandler';

const SigForm = (props) => {

  const [pressed, setPressed] = useState(false);

  return (
    <div id='sig_form'>
      <form onSubmit={(e) => {props.changeSig(e, props.sig)}}>
        <button
          disabled={pressed}
          className='clickable'
          onClick={(e) => {
            props.showForm(e, ['sig_input'],
            'off_left', 'absolute_sig', 1000, 'block')
            setPressed(true)}
          }
          >
          Change Your Signature</button>
        <div className='off_left' id="sig_input">
          <input
            required id='signature'
            onChange={(e) => props.updateSig(e.target.value)}

          />
          <input
            id='signature_sub'
            type='submit'
          />
        <p className='center_text'>{props.status}</p>
        </div>
      </form>
    </div>
  )
}

export default SigForm;
