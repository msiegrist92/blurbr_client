import React, {useState} from 'react';

const SortOptions = ({topics, setShow}) => {

  const [option, setOption] = useState('')


  const sortTopics = (e, topics, option) => {
    e.preventDefault();
    if(option === 'date'){
      console.log('ok')
      let copy = [...topics]
      setShow(copy.reverse());
    }
    if(option === 'posts'){
      let copy = [...topics];
      copy.sort((a, b) => b.posts.length - a.posts.length);
      setShow(copy)
    }
  }


  return (
    <>
    <div>
      <h4>Sort Topics</h4>
      <select value={option}
        onChange={(e) => {
          setOption(e.target.value)
        }}>
        <option value=''>Select</option>
        <option value='date'>Most Recent</option>
        <option value='posts'>Most Posts</option>
      </select>
      <button onClick={(e) => {sortTopics(e, topics, option)}}>Sort</button>
    </div>
    </>
  )
}

export default SortOptions;
