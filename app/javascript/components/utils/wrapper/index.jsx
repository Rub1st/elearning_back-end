import React, { useState } from 'react'
import LeftBar from './left_bar'
import ProfileBar from './profile_bar'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './wrapper.css'
import { connect } from 'react-redux';
import { getCourses, updateInput } from '../../../main_redux/actions/courses';
import '../style/utils.css'
import { getData, logout, searchData } from '../../../main_redux/actions/server_connections';
import { setImpersonationUser } from '../../../main_redux/actions/users';
import { BackspaceOutlined, DirectionsRunOutlined } from '@material-ui/icons';
import UpdateImpersonationButton from './impersonation_button'
import { IconButton } from '@material-ui/core';
import { withRouter } from "react-router";
import { getUserCourses } from '../../../main_redux/actions/user_courses';
import { getOrganizations } from '../../../main_redux/actions/organizations';
import { getCertificates } from '../../../main_redux/actions/certificates';
import LanguageIcon from '@material-ui/icons/Language';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 10,
    marginRight: 30,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Wrapper = (props) => {
  const classes = useStyles();

  const [search, setSearch] = useState('')

  const { t, i18n } = useTranslation();

  let path = window.location.pathname

  let user_id = props.currentUser.id


  let {request_path, setter} = path === '/' ||
                               path === `/user_id=${user_id}/my_courses` ||
                               path === `/user_id=${user_id}/recomended_courses` ?
                               { request_path: 'courses', setter: getCourses} :
                               path ===  `/user_id=${user_id}/organizations` ?
                               { request_path: 'organizations', setter: getOrganizations} :
                               path === `/user_id=${user_id}/certificates` ?
                               { request_path: 'certificates', setter: getCertificates} :
                               path === `/user_id=${user_id}/home` ||
                               path === `/user_id=${user_id}/settings` ?
                               { request_path: 'none', setter: null} :
                               { request_path: 'user_courses', setter: getUserCourses }

  const enter_listener = event => {
    if (event.key === 'Enter') {
      props.search(search , request_path, setter)
    }
  }

  const changeLang = () =>  i18n.language === 'en' ? i18n.changeLanguage('ru') : i18n.changeLanguage('en');

  return(
    <div className={classes.root}>
    <AppBar style={{backgroundColor: 'rgb(61, 61, 202)'}} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          E-learning
          <IconButton onClick={changeLang}>
            <LanguageIcon/>
          </IconButton>
        </Typography>
        <LeftBar/>
        {
          request_path !== 'none' ?
          (
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder={t("Search.1")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={enter_listener}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          ) : null
        }
          <div>
              <AccountCircle />
          </div>
         <ProfileBar/>
         {
           props.impersonation ?
           <UpdateImpersonationButton el={props.impersonationUser}>
              <BackspaceOutlined/>
           </UpdateImpersonationButton> :
           <IconButton onClick={() => props.logout()}>
             <DirectionsRunOutlined/>
           </IconButton>
         }
      </Toolbar>
    </AppBar>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    {props.children}
  </div>
  )
}

export default connect(
  state => ({
      searchInput: state.courses.searchInput,
      currentUser: state.users.currentUser,
      impersonation: state.users.impersonation,
      impersonationUser: state.users.impersonationUser,
  }),
  dispatch => ({
    updateInput: (newValue) => dispatch(updateInput(newValue)),
    set: (path, setter) => dispatch(getData(path, setter)),
    setImpersonationUser: (user) => dispatch(setImpersonationUser(user)),
    logout: () => dispatch(logout()),
    search: (obj, path, setter) => dispatch(searchData(obj, path, setter)),
  })
)(withRouter(Wrapper))
