import React, {useState} from 'react';

const SearchGroups = ({groups, setGroups}) => {

  const [option, setOption] = useState('name');
  const [search_val, setVal] = useState('');

  const searchGroups = (e, option, search_val, groups) => {
    e.preventDefault();
    const filtered_groups = groups.filter((group) => {
      return group[option].includes(search_val)
    })
    setGroups(filtered_groups)
  }

  const resetGroups = (e, groups) => {
    e.preventDefault();
    setGroups(groups);
  }


  return (
    <>
    <form
      style={{gap: '.5em'}}
      className='purple_form two_col_fr center_cont'>
      <h2 className='span_two_col center_cont'>Filter Groups</h2>
      <div className='two_col_70_30 span_two_col'>
        <input
          value={search_val}
          onChange={(e) => setVal(e.target.value)}
          type='text' />
        <select value={option}
          onChange={(e) => setOption(e.target.value)}
          >
          <option value='name'>Name</option>
          <option value='description'>Description</option>
        </select>
      </div>
      <input className='span_two_col center_cont' type='submit' value="Search"
        onClick={(e) => searchGroups(e, option, search_val, groups)}
        />
      <input
        onClick={(e) => resetGroups(e, groups)}
        type='submit' value="Reset" className='span_two_col center_cont call_to' />
    </form>
    </>
  )
}


export default SearchGroups;
