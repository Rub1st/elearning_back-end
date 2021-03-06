import React from "react";
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: "30px",
  },
}));

const NoSearchResultsField = ({ label }) => {
  const classes = useStyles();
  return (
    <div className="admin_empty_field">
      <h3 className="admin_empty_content">We cannot find any {label}</h3>
      <SearchOutlined className={classes.large} />
    </div>
  );
};

export default NoSearchResultsField;
