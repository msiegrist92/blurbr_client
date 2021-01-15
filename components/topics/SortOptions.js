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
    if(option === 'replies'){
      console.log('replies')
      let copy = [...topics];
      copy.sort((a, b) => {

        let date_a;
        let date_b;

        if(!a.posts[a.posts.length - 1]){
          date_a = new Date(0)
        } else {
          date_a = new Date(a.posts[a.posts.length - 1].date_created)
        }

        if(!b.posts[b.posts.length - 1]){
          date_b = new Date(0)
        } else {
          date_b = new Date(b.posts[b.posts.length - 1].date_created)
        }
        return date_b - date_a;
    })
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
        <option value='date'>Recent Topics</option>
        <option value='posts'>Most Posts</option>
        <option value='replies'>Recent Replies</option>
      </select>
      <button onClick={(e) => {sortTopics(e, topics, option)}}>Sort</button>
    </div>
    </>
  )
}

export default SortOptions;
