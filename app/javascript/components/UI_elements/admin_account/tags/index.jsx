import React, { useState } from 'react'
import { connect } from 'react-redux'
import TagItem from './tag_item'
import { postDataElement, updateDataElement } from '../../../../main_redux/actions/server_connections'
import { createTag } from '../../../../main_redux/actions/tags'
import EntitiesList from '../entities_list'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import './style.css'
import AdminModeEmptyField from '../../../utils/empty_fields/admin_mode_emty_field'
import NoSearchResultsField from '../../../utils/empty_fields/no_search_results_field'

let tagsFilter = (tags, searchQuery) => tags
.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery.length)


const Tags = (props) => {

  const [tag, setTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  return(
    <div>
      <EntitiesList label={'Tags'} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className='create-tag'>
      <TextField style={{marginLeft: '10px'}} value={tag} label={'create new tag'} variant="outlined" onChange={(e) => setTag(e.target.value)}/>
        <IconButton style={{marginLeft: '10px'}} onClick={() => {props.post({ name: tag}, 'tags', createTag); setTag('')}}>
          <CreateOutlinedIcon/>
        </IconButton>
        <hr/>
    </div>
    <div>
      {
        tagsFilter(props.tags, searchQuery).length ?
        <ul className='tag-list'>
        {
          tagsFilter(props.tags, searchQuery).map(el => <li key={el.id} className='tag-list-item'>
            <TagItem el={el}/>
          </li>)
        }
        </ul> : !props.tags.length ?
        <AdminModeEmptyField label={'тегов'}/> :
        <NoSearchResultsField label={'тегов'}/>
      }
    </div>
    </EntitiesList>
    </div>

  )
}

export default connect(
  state => ({
    tags: state.tags.tags,
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    put: (obj, path, setter) => dispatch(updateDataElement(obj, path, setter)),
  })
)(Tags)