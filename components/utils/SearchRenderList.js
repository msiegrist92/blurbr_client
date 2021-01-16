import React, {useState} from 'react';

const SearchRenderList = ({to_search, setList, default_option, title, options}) => {

  const [option, setOption] = useState(default_option)
  const [search_val, setVal] = useState('');

  const searchList = (e, option, search_val, to_search) => {
    e.preventDefault();
    const filtered_list = to_search.filter((item) => {
      return item[option].includes(search_val)
    })
    setList(filtered_list);
  }

  const resetList = (e, to_search) => {
    e.preventDefault();
    setList(to_search);
  }

  const options_list = options.map((option, i) => {
    return <option key={i} value={option.value}>{option.title}</option>
  })

  return (
    <>
    <form
      style={{gap: '.5em'}}
      className='purple_form two_col_fr center_cont'>
      <h2 className='span_two_col center_cont'>{title}</h2>
      <div className='two_col_70_30 span_two_col'>
        <input
          value={search_val}
          onChange={(e) => setVal(e.target.value)}
          type='text' />
        <select value={option}
          onChange={(e) => setOption(e.target.value)}
          >
          {options_list}
        </select>
      </div>
      <input className='span_two_col center_cont' type='submit' value="Search"
        onClick={(e) => searchList(e, option, search_val, to_search)}
        />
      <input
        onClick={(e) => resetList(e, to_search)}
        type='submit' value="Reset" className='span_two_col center_cont call_to' />
    </form>
    </>
  )

}

export default SearchRenderList;
