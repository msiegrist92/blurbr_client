import React, {useState} from 'react';
import axios from 'axios';

const SigForm = (props) => {

  return (
    <div>
      <form onSubmit={(e) => {props.changeSig(e, props.sig)}}>
        <input required id='signature'
          onChange={(e) => props.updateSig(e.target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default SigForm;