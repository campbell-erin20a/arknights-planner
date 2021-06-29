
// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { Container, TextField, Button } from '@material-ui/core';
// import { css } from '@emotion/react';

// import { getUser, setUser } from '@@/store/user';


export default function Settings() {
  return <div>Settings!</div>;
}

// function Settings() {
//   const user_id = useSelector(getUser)?.id;
//   const [ state, setState ] = useState(user_id);
//   const onChange = (e) => setState(e.target.value);

//   const dispatch = useDispatch();
//   const onUpdate = () => dispatch(setUser.pending(user_id));
//   // TODO: Actual success feedback too
//   // TODO: Actual Error Checking for an invalid ID, l m a o

//   return <Container
//     component="main"
//     maxWidth="sm"
//     css={(t) => css `
//       margin: ${t.spacing(1, 'auto')};
//       ${t.breakpoints.up('sm')} {
//         margin: ${t.spacing(4, 'auto')};
//       }
//     `}
//   >
//     <div css={(t) => css `
//       display: flex;
//       justify-content: center;
//       align-items: baseline;

//       & > div:first-of-type {
//         margin-right: ${t.spacing(1)}px;
//       }
//     `}>
//       <TextField
//         id="user_id"
//         color="primary"
//         variant="outlined"
//         fullWidth
//         label="User ID"
//         helperText="Supply a User ID to synchronize data across devices."
//         value={ state }
//         onChange={ onChange } />
//       <Button color="primary" variant="contained" size="large" onClick={ onUpdate }>
//         Update
//       </Button>
//     </div>
//   </Container>;
// }

// export default {
//   title: 'Arknights Planner - Settings',
//   path: '/settings',
//   component: Settings,
// };
