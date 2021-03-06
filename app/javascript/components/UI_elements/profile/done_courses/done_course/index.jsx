import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import image from "../../../../../photos/ruby.jpg";
import { connect } from "react-redux";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import DoneButtonShow from "./done_button_show";
import { DateFormat } from "../../../../utils/helpful_functions";
import { Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  collapse: {
    maxHeight: 250,
    overflowY: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const DoneCourse = (props) => {
  let { el } = props;
  //let course = props.courses.find(e => e.id === el.course.id);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { t, i18n } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {el.course.author.login[0]}
          </Avatar>
        }
        action={<div>{el.course.mark === null ? "no" : el.course.mark}</div>}
        title={el.course.label}
        subheader={DateFormat(el.course.created_at)}
      />
      <CardMedia
        className={classes.media}
        image={el.course.image_url}
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          className="for_course_text_field"
          component="p"
        >
          <p>author</p>
          <p>{el.course.author.login}</p>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="for_course_text_field"
          component="p"
        >
          <p>correct</p>
          <p>{el.correct}</p>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="for_course_text_field"
          component="p"
        >
          <p>my mark</p>
          <p>{el.mark === null ? "no" : el.mark}</p>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="for_course_text_field"
          component="p"
        >
          <p>start</p>
          <p>{DateFormat(el.created_at)}</p>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="for_course_text_field"
          component="p"
        >
          <p>finish</p>
          <p>{DateFormat(el.updated_at)}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={t("Tooltip.3")}>
          <DoneButtonShow el={el}>
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
          </DoneButtonShow>
        </Tooltip>
        <Tooltip title={t("Tooltip.2")}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse
        in={expanded}
        timeout="auto"
        className={classes.collapse}
        unmountOnExit
      >
        <CardContent>
          <Typography paragraph>Why learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {el.course.why_content}
          </Typography>
          <Typography paragraph>Will learn:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {el.course.will_content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default connect(
  (state) => ({
    courses: state.courses.courses,
    pages: state.pages.pages,
  }),
  (dispatch) => ({})
)(DoneCourse);
