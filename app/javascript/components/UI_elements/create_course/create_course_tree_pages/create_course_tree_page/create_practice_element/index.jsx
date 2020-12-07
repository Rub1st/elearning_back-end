import { Checkbox, IconButton, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from '../../../../../../main_redux/actions/questions'
import { postDataElement } from '../../../../../../main_redux/actions/server_connections'
import { createId } from '../../../../../utils/helpful_functions'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Delete } from '@material-ui/icons'
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';
import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  greate: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

let questionTypes = [{ id: 0, name: 'opened'}, { id: 1, name: 'closed'}]
let questionDifficult = [{ id: 0, name: 'easy'}, { id: 1, name: 'medium'}, { id: 2, name: 'hard'}]

const CreatePracticeElement = (props) => {
  const classes = useStyles();

  const [variantValue, setVariantValue] = useState(false)
  const [variantName, setVariantName] = useState('')

  const [title, setTitle] = useState('')
  const [difficult, setDifficult] = useState('easy')
  const [description, setDescription] = useState('')
  const [question, setQuestion] = useState('')
  const [questionType, setQuestionType] = useState('opened')
  const [variants, setVariants] = useState([])

  let newQuestion = {
    page_id: props.currentDraftPage.id,
    title: title,
    difficult: difficult === 'easy' ? 0 : difficult === 'medium' ? 1 : 2,
    description: description,
    question_text: question,
    question_type: questionType === 'closed' ? 0 : 1
  }

  return(
    <div>
      <div className='paper-item'>
        <TextField value={title} variant='outlined' onChange={(e) => setTitle(e.target.value)} label='title'/>
        <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questionType}
                variant='outlined'
                onChange={(e) => setQuestionType(e.target.value)}>
                {
                  questionTypes.map(el =>
                  <MenuItem value={el.name} key={el.id}>
                    {el.name}
                  </MenuItem>)
                }
        </Select>
        <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficult}
                variant='outlined'
                onChange={(e) => setDifficult(e.target.value)}>
                {
                  questionDifficult.map(el =>
                     <MenuItem value={el.name} key={el.id}>
                       {el.name}
                     </MenuItem>)
                }
        </Select>
      </div>
      <div className='paper-item'>
        <TextField multiline rows={1} variant='outlined' value={description} onChange={(e) => setDescription(e.target.value)} label='description'/>
        <TextField multiline rows={1} variant='outlined' value={question} onChange={(e) => setQuestion(e.target.value)} label='question'/>
        <IconButton disabled={!title.length || !question.length} onClick={() => props.post({ question: newQuestion }, 'questions', createQuestion)}>
            <CheckCircleOutlineIcon/>
          </IconButton>
      </div>
      <hr/>
      <div className='paper-item' style={{paddingRight: '20px'}}>
        <div >
          <p>Список вариантов ответа</p>
          <ol className='variants-list'>
            {
              variants.map(el =>
                <li key={el.id} style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between'}}>
                <span>{el.name}</span>
                <span>{`(${el.value ? 'верно' : 'неверно'})`}</span>
                <IconButton onClick={() => setVariants([...variants.filter(e => e.id !== el.id)])}>
                  <Delete/>
                </IconButton>
                </li>
              )
            }
          </ol>
        </div>
        <IconButton disabled={!title.length || !question.length || !variants.length} onClick={() => {
          variants.map((el, index) => props.post({
            question_id: props.currentQuestion.id,
            value: el.name,
            is_correct: el.value,
            order: index + 1,
          }, 'variants', createQuestion))
          setTitle('');
          setDifficult('easy');
          setDescription('');
          setQuestion('');
          setQuestionType('opened');
          setVariants([])}}>
          <CheckCircleOutlineIcon className={classes.large}/>
      </IconButton>
      </div>
      <div style={{marginTop: '-10px'}} className='paper-item'>
        <div>
          <Checkbox value={variantValue} onChange={(e) => setVariantValue(!variantValue)}/>
          <TextField value={variantName} variant='outlined' onChange={(e) => setVariantName(e.target.value)} placeholder='one of variants'/>
        </div>
        <div style={{marginRight: '20px'}}>
          <IconButton disabled={!variantName.length} onClick={() => {
              setVariants([...variants, { id: createId(variants), name: variantName, value: variantValue}]);
              setVariantName('');
              }}>
              <ControlPointIcon className={classes.large} />
            </IconButton>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    currentQuestion: state.questions.currentQuestion,
    currentDraftPage: state.pages.currentDraftPage,
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
  })
)(CreatePracticeElement)