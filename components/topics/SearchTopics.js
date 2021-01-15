import React, {useState} from 'react';

//search topics by title, body
//sort by post number, date

const SearchTopics = ({topics, setTopics}) => {

  const [option, setOption] = useState('title');
  const [search_val, setVal] = useState('');

  const searchTopics = (e, option, search_val, groups) => {
    e.preventDefault();
    const filtered_groups = groups.filter((group) => {
      return group[option].includes(search_val)
    })
    setTopics(filtered_groups)
  }

  const resetTopics = (e, topics) => {
    e.preventDefault();
    setTopics(topics);
  }

  return (
    <>
    <form
      style={{gap: '.5em'}}
      className='purple_form two_col_fr center_cont'>
      <h2 className='span_two_col center_cont'>Filter Topics</h2>
      <div className='two_col_70_30 span_two_col'>
        <input
          value={search_val}
          onChange={(e) => setVal(e.target.value)}
          type='text' />
        <select value={option}
          onChange={(e) => setOption(e.target.value)}
          >
          <option value='title'>Title</option>
          <option value='body'>Body</option>
        </select>
      </div>
      <input className='span_two_col center_cont' type='submit' value="Search"
        onClick={(e) => searchTopics(e, option, search_val, topics)}
        />
      <input
        onClick={(e) => resetTopics(e, topics)}
        type='submit' value="Reset" className='span_two_col center_cont call_to' />
    </form>
    </>
  )
}

export default SearchTopics;
