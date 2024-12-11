import moment from "moment";

import { FC } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import Tooltip from "@mui/material/Tooltip";
import { IconButton, Paper, styled } from "@mui/material";

const truncateText = (text: string) => {
  if (text.length < 300) {
    return text;
  }

  return text.substring(0, 300) + "...";
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export interface NoteItemsProps {
  id: number;
  parsedContent: string;
  createdAt: moment.Moment;
}

const NoteItems: FC<NoteItemsProps> = ({ parsedContent, id, createdAt }) => (
  <Item>
    <div data-test-element="note-item" data-test-id={id}>
      <p dangerouslySetInnerHTML={{ __html: truncateText(parsedContent) }} />
      <div>
        <span>{moment(createdAt).format("D MMMM YYYY")}</span>
        <Link to={`/notes/${id}`}>
          <Tooltip title="View Note">
            <IconButton id={`view-note-${id}`}>
              <MdRemoveRedEye className="text-slate-700" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  </Item>
);

export default NoteItems;
