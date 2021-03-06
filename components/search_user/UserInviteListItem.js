import React, {useState} from 'react';
import axios from 'axios';
import Modal from '../utils/Modal.js';

const UserInviteListItem = ({user, groups}) => {


  const [group, setGroup] = useState(groups[0]._id);
  const [modal, setModal] = useState(false);
  const [invite_message, setMsg] = useState('');

  const toggleModal = (e, modal) => {
    e.preventDefault();
    if(modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const group_options = groups.map((group) => {
    return (
      <option value={group._id} key={group._id}>{group.name}</option>
    )
  })

  const sendInvite = (e, group, user_email) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_DEV_API + `/groupmgmt/inviteuser/${sessionStorage.token}`, {
      token: sessionStorage.token,
      group,
      user_email
    }).then((res) => {
      setMsg('User invite sent!')
      toggleModal(e, modal)
      //pop up modal on invite sent
    }).catch((err) => {
      setMsg('User is already a member of your group');
      toggleModal(e, modal);
    })
  }

  return (
    <>
    <li>
      <form onSubmit={(e) => sendInvite(e, group, user.email)}>
      <h2>{user.username}</h2>
      <h3>{user.email}</h3>
      <h3>Posts - {user.posts}</h3>
      <h3>Groups - {user.groups.length}</h3>
      <select value={group} onChange={(e) => {setGroup(e.target.value)}}>
        {group_options}
      </select>
      <input type='submit' className='big_button call_to' value='Invite' />
      </form>
    </li>
    <Modal
      show={modal} toggle={toggleModal}
      >
      <h2 className='center_text rowSpan'>{invite_message}</h2>
    </Modal>
    <hr></hr>
    </>
  )
}

export default UserInviteListItem;
