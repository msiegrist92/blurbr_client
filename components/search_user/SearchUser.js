import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ResultsList from './ResultsList';

const SearchUser = ({groups, default_term}) => {

  const [option, setOption] = useState('Username');
  const [term, setTerm] = useState(default_term);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState('')

  const searchUsers = (e, term, option) => {
    e.preventDefault();

    axios.get(process.env.NEXT_PUBLIC_DEV_API + `/users/searchby/${option.toLowerCase()}/${term}`,
      {
        headers : {
          'Authorization': sessionStorage.token
        }
      }
    ).then((res) => {
      setResults(res.data);
    }).catch((err) => {
      setErr(err.response.data);
    })
  }


  return (
    <>
      <form
        onSubmit={(e) => searchUsers(e, term, option)}
        className='purple_form search_form center_cont'>
        <p>We recommend searching by email as users can have duplicate usernames.</p>
          <select
            className='center_cont'
            value={option} onChange={(e) => setOption(event.target.value)}>
            <option value='Username'>Username</option>
            <option value='Email'>Email</option>
          </select>
        <input className='text_focus'
          value={term}
          required
          onChange={(e) => setTerm(e.target.value)}
          type='text' placeholder={option} />
        <input className='center_cont' type='submit' />
        <h3 className='center_cont'>{err}</h3>
      </form>

      <ResultsList
        groups={groups}
        results={results} />
    </>
  )
}

export default SearchUser;
